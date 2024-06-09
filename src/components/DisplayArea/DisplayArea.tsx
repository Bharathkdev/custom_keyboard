/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import {styles} from './DisplayArea.style';
import Utility from '../Utilities/Utility';
import {strings} from '../Constants/strings';
import Label from '../Common/Label';
import {
  CursorTypes,
  DisplayAreaRef,
  DisplayHeightTypes,
} from '../../types/DisplayArea.type';
import {useKeyboardContext} from '../../Context/KeyboardContext';
import GlowingBorder from './GlowingBorder';
import {colors} from '../theme/colors';

const {width} = Utility.getWindowDimensions();

// Render caret (cursor) label
const createCursorLabel = (additionalStyles: CursorTypes = {}) => {
  const baseStyle: CursorTypes = styles.caret;

  const combinedStyle: any = [baseStyle, additionalStyles];

  return (
    <Label
      title={strings.DisplayArea.cursor}
      labelStyle={[styles.text, ...combinedStyle]}
    />
  );
};

const DisplayArea = forwardRef<DisplayAreaRef>((props, ref) => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [cursorIndex, setCursorIndex] = useState<number>(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [displayHeight, setDisplayHeight] = useState<DisplayHeightTypes>({
    keyboard: 0,
    displayArea: 0,
  });

  const {keyboardVisible, setKeyboardVisible, keyboardHeight} =
    useKeyboardContext();
  const displayRef = useRef<ScrollView>(null);
  const deleteIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contentChangeCountRef = useRef<number>(-1);
  const contentChangeHeightRef = useRef<number>(0);
  const firstLineOnScrollRef = useRef<number>(0);
  const lineIndexes = useRef<Array<{start: number; end: number}>>([
    {start: 0, end: characters?.length},
  ]);

  const adjustedDisplayArea =
    displayHeight.displayArea - displayHeight.keyboard;
  const containerWidth = Utility.isIOS ? width : width - 5;
  const lineHeight = 27;

  // Scrolls to the end when characters reached bottom of the display area
  useEffect(() => {
    if (displayRef.current && characters.length === cursorIndex) {
      displayRef.current.scrollToEnd({animated: true});
    }
  }, [characters, cursorIndex]);

  /**
   * Animates the display area when the keyboard is shown or hidden
   * */
  useEffect(() => {
    setDisplayHeight(prev => ({...prev, keyboard: keyboardHeight}));
  }, [keyboardHeight]);

  // Make the cursor blink every 500 ms
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(visible => !visible);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Expose methods through useImperativeHandle to parent
  useImperativeHandle(ref, () => ({
    handleKeyPress,
    handleDeletePress,
    handleLongPress,
    handleLongPressRelease,
  }));

  const handleKeyPress = useCallback(
    (key: string) => {
      setCharacters(prevCharacters => [
        ...prevCharacters.slice(0, cursorIndex),
        key,
        ...prevCharacters.slice(cursorIndex),
      ]);
      setCursorIndex(cursorIndex + 1);
    },
    [cursorIndex],
  );

  const handleLongPress = () => {
    if (deleteIntervalRef.current) {
      return;
    }

    deleteIntervalRef.current = setInterval(() => {
      if (cursorIndex === characters.length) {
        setCharacters(prevCharacters =>
          prevCharacters.slice(0, prevCharacters.length - 1),
        );
        setCursorIndex(prevIndex => {
          // Ensure the cursor index doesn't go below 0
          return Math.max(prevIndex - 1, 0);
        });
      }
    }, 100);
  };

  const handleLongPressRelease = () => {
    if (deleteIntervalRef.current) {
      clearInterval(deleteIntervalRef.current);
      deleteIntervalRef.current = null;
    }
  };

  const handleDeletePress = useCallback(() => {
    if (cursorIndex > 0) {
      setCharacters(prevCharacters => [
        ...prevCharacters.slice(0, cursorIndex - 1),
        ...prevCharacters.slice(cursorIndex),
      ]);
      setCursorIndex(prevIndex => {
        // Ensure the cursor index doesn't go below 0
        return Math.max(prevIndex - 1, 0);
      });
    }
  }, [cursorIndex]);

  const handleTextPress = useCallback(
    (index: number) => {
      setKeyboardVisible(true);
      setCursorIndex(index + 1);
    },
    [setKeyboardVisible],
  );

  /** Memoizes the return value until one of the
   * dependencies has changed.
   * */
  const renderTextWithCaret = useMemo(() => {
    // Caret at the start when no characters
    if (Utility.checkIsTrue(characters?.length, 0) && cursorVisible) {
      return createCursorLabel();
    }

    return (
      <>
        {/* Show caret at the start when cursorIndex is 0
        and characters are available */}
        {Utility.checkIsTrue(cursorIndex, 0) &&
          cursorVisible &&
          createCursorLabel({
            position: 'absolute',
            top: -2,
            left: -2,
          })}
        {characters.map((text, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            onPress={() => handleTextPress(index)}>
            <View style={styles.caretCenter}>
              <Label title={text} labelStyle={styles.text} />
              {/* Caret is displayed if it's between characters or at the end */}
              {Utility.checkIsTrue(index + 1, cursorIndex) &&
                cursorVisible &&
                createCursorLabel({
                  position: 'absolute',
                  right: -5,
                })}
            </View>
          </TouchableOpacity>
        ))}
      </>
    );
  }, [characters, cursorIndex, cursorVisible, handleTextPress]);

  const mapCursorPosition = useCallback(
    (locationY: number, area: string) => {
      /**
       * Calculate the line where the cursor is likely to be placed based
       * on the Y-coordinate of the tap.
       */
      const positions = Math.floor(locationY / lineHeight);
      const cursorLine = positions + firstLineOnScrollRef.current;
      const index = cursorLine - 1;

      // If the calculated position is above the display area
      if (positions === 0) {
        /**
         * If the tap is on the top-left side of the display area,
         * set the cursor to the first index.
         */
        if (Utility.checkIsTrue(area, 'left')) {
          if (Utility.checkIsTrue(cursorLine, 0)) {
            setCursorIndex(1);
            return;
          }
          setCursorIndex(lineIndexes.current[cursorLine]?.start + 1);
          return;
        } else {
          /**
           * If there's no character in the text area and user
           * tap on the right side, set the cursor to the first index.
           */
          if (characters?.length < 0) {
            setCursorIndex(0);
            return;
          }
          /**
           * Or else set the cursor to the end of the characters.
           */
          setCursorIndex(lineIndexes.current[cursorLine]?.end);
          return;
        }
      }

      /**
       * Set the cursor to the first index when the tap is on the left
       * and there are no characters typed.
       */
      if (
        cursorLine < 1 &&
        Utility.checkIsTrue(area, 'left') &&
        Utility.checkIsTrue(characters?.length, 0)
      ) {
        setCursorIndex(0);
        return;
      }

      if (
        Utility.checkIsTrue(cursorLine, 0) &&
        Utility.checkIsTrue(contentChangeCountRef.current, 0)
      ) {
        /**
         * Place the cursor at the last index when tapping on
         * the right and the characters ends in first line
         */
        if (Utility.checkIsTrue(area, 'right')) {
          setCursorIndex(characters?.length);
        }
      } else if (cursorLine - 1 < contentChangeCountRef.current) {
        /**
         * If the tapped line is not the last line, set the cursor
         * at the calculated position and area.
         */
        Utility.checkIsTrue(area, 'left')
          ? setCursorIndex(lineIndexes.current[index]?.start + 1)
          : setCursorIndex(lineIndexes.current[index]?.end);
      } else {
        /**
         * If the user taps on the left of last line, set the cursor
         * index to the calculated position.
         */
        if (
          Utility.checkIsTrue(area, 'left') &&
          Utility.checkIsTrue(cursorLine - 1, contentChangeCountRef.current)
        ) {
          setCursorIndex(lineIndexes.current[index]?.start + 1);
          return;
        }
        /**
         * Otherwise, if on the right, set the cursor to the last index
         */
        setCursorIndex(characters?.length);
      }
    },
    [characters?.length],
  );

  const handleTapOutsideDisplayArea = useCallback(
    (event: GestureResponderEvent) => {
      const tapX = event.nativeEvent.locationX;
      const tapY = event.nativeEvent.locationY;

      // Calculate text boundaries
      const textStartX = 15; // Left padding
      const textEndX = 15; // Right padding

      // Handle tap on the left side (before first character of a line)
      if (tapX < textStartX) {
        mapCursorPosition(tapY, 'left');
      } else if (tapX - textEndX > 5) {
        /**
         * Handle tap on the right side (after last character of a line
         * or at the last character of the last line)
         */
        mapCursorPosition(tapY, 'right');
      }
    },
    [mapCursorPosition],
  );

  // Function to handle ScrollView content size change
  const handleScrollViewContentSizeChange = useCallback(
    (contentHeight: number) => {
      if (contentChangeCountRef.current === -1) {
        contentChangeCountRef.current += 1;
      }

      const roundedContentChangeHeightRef = Math.floor(
        contentChangeHeightRef.current,
      );
      const roundedContentHeight = Math.floor(contentHeight);

      if (
        roundedContentChangeHeightRef < roundedContentHeight &&
        keyboardVisible
      ) {
        // Content height increased, add new line indexes
        lineIndexes.current[contentChangeCountRef.current].end =
          cursorIndex - 2;
        lineIndexes.current.push({
          start: cursorIndex - 1,
          end: characters?.length - 1,
        });
        contentChangeCountRef.current += 1;
      } else if (contentChangeHeightRef.current > contentHeight) {
        // Content height decreased, remove last line index
        if (contentChangeCountRef.current > 0) {
          lineIndexes.current.pop();
          contentChangeCountRef.current -= 1;
        }
      }
      contentChangeHeightRef.current = contentHeight;
    },
    [characters?.length, cursorIndex, keyboardVisible],
  );

  // Handles display area calculation when keyboard is open or closed
  const onDisplayAreaLayout = useCallback(
    (event: {nativeEvent: {layout: {height: number}}}) => {
      const {height} = event.nativeEvent.layout;
      if (!keyboardVisible) {
        setDisplayHeight(prev => ({...prev, displayArea: height}));
      }
    },
    [keyboardVisible],
  );

  const onScrollViewScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const scrollOffsetY = event.nativeEvent.contentOffset.y;
    const linesScrolled = Math.floor(scrollOffsetY / lineHeight);
    firstLineOnScrollRef.current = linesScrolled;
  };

  const renderItem = useMemo(() => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.displayAreaContainer}
        onLayout={onDisplayAreaLayout}
        onPress={() => setKeyboardVisible(true)}>
        <View
          style={[
            styles.container,
            {
              flex: keyboardVisible ? 0 : 1,
              height: adjustedDisplayArea - 20,
              width: containerWidth,
              borderColor: keyboardVisible
                ? colors.transparent
                : colors.baseLight,
            },
          ]}
          onTouchEnd={handleTapOutsideDisplayArea}>
          <ScrollView
            ref={displayRef}
            bounces={false}
            removeClippedSubviews={true}
            onScroll={event => {
              onScrollViewScroll(event);
            }}
            scrollEventThrottle={16}
            onTouchEnd={event => {
              // Prevent the touch event propagating from parent components
              event.stopPropagation();
            }}
            contentContainerStyle={styles.contentContainer}
            onContentSizeChange={(contentWidth, contentHeight) => {
              handleScrollViewContentSizeChange(contentHeight);
            }}
            showsVerticalScrollIndicator={true}>
            {renderTextWithCaret}
          </ScrollView>
        </View>
      </TouchableOpacity>
    );
  }, [
    adjustedDisplayArea,
    containerWidth,
    handleScrollViewContentSizeChange,
    handleTapOutsideDisplayArea,
    keyboardVisible,
    onDisplayAreaLayout,
    renderTextWithCaret,
    setKeyboardVisible,
  ]);

  return (
    <>
      {keyboardVisible ? (
        <GlowingBorder width={containerWidth} height={adjustedDisplayArea}>
          {renderItem}
        </GlowingBorder>
      ) : (
        renderItem
      )}
    </>
  );
});

export default DisplayArea;
