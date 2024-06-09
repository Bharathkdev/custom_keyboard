import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {ms} from 'react-native-size-matters';

import {constants} from '../Constants/constants';
import KeyButton from '../Common/KeyButton';
import {styles} from './DefaultView.style';
import Utility from '../Utilities/Utility';
import {strings} from '../Constants/strings';
import {DefaultViewPropTypes, ModePropType} from '../../types/DefaultView.type';
import {useKeyboardContext} from '../../Context/KeyboardContext';

const DefaultView: React.FC<DefaultViewPropTypes> = ({
  onKeyPress,
  onPress,
  onLongPress,
  onLongPressRelease,
}) => {
  const [mode, setMode] = useState<ModePropType>('alphabetical');
  const [capsLock, setCapsLock] = useState<boolean>(false);
  const {setKeyboardVisible} = useKeyboardContext();

  const isAlphabeticalMode = Utility.checkIsTrue(mode, 'alphabetical');
  const isSpecialCharacterMode = Utility.checkIsTrue(mode, 'special');
  const commaOrLessThan = isSpecialCharacterMode ? '<' : ',';
  const dotOrGreaterThan = isSpecialCharacterMode ? '>' : '.';
  const specialKeysButton = isSpecialCharacterMode ? '123' : '=\\<';
  const currentCharacterSet = constants[mode];

  const toggleKeyboardMode = (currentMode: ModePropType) => {
    setMode(currentMode);
  };

  const toggleCapsLock = () => {
    setCapsLock(prevValue => !prevValue);
  };

  const handleKeyPress = useCallback(
    (key: string) => {
      onKeyPress(key);
    },
    [onKeyPress],
  );

  const handleCapsLock = useCallback(
    (char: string) => {
      return capsLock ? char.toUpperCase() : char;
    },
    [capsLock],
  );

  const renderKeys = useCallback(
    (row: string[]) => {
      return row.map(char => (
        <KeyButton
          key={char}
          onPress={() => handleKeyPress(handleCapsLock(char))}
          text={handleCapsLock(char)}
        />
      ));
    },
    [handleCapsLock, handleKeyPress],
  );

  return (
    <>
      {currentCharacterSet.map((row: string[], rowIndex: number) => (
        <View
          key={rowIndex}
          style={[
            styles.row,
            Utility.checkIsTrue(rowIndex, 1) &&
              isAlphabeticalMode && {marginHorizontal: ms(20)},
          ]}>
          {Utility.checkIsTrue(rowIndex, 2) ? (
            <>
              {/* Caps Lock or Mode Change Button */}
              <KeyButton
                onPress={
                  isAlphabeticalMode
                    ? toggleCapsLock
                    : () =>
                        toggleKeyboardMode(
                          isSpecialCharacterMode ? 'numerical' : 'special',
                        )
                }
                imageSource={
                  isAlphabeticalMode
                    ? capsLock
                      ? require('../../../assets/images/caps-on.png')
                      : require('../../../assets/images/caps-off.png')
                    : undefined
                }
                text={isAlphabeticalMode ? undefined : specialKeysButton}
                viewStyle={styles.specialKey}
                textStyle={[
                  isAlphabeticalMode ? undefined : styles.specialKeyText,
                  styles.specialKeyTextColor,
                ]}
                width={14}
              />
              {renderKeys(row)}
              {/* Delete Key */}
              <KeyButton
                onPress={() => handleKeyPress('delete')}
                onLongPress={onLongPress}
                onLongPressRelease={onLongPressRelease}
                imageSource={require('../../../assets/images/delete.png')}
                viewStyle={styles.specialKey}
                width={14}
              />
            </>
          ) : (
            // If not the special row, render the keys as usual
            renderKeys(row)
          )}
        </View>
      ))}
      <View style={styles.lastRow}>
        <KeyButton
          onPress={() =>
            toggleKeyboardMode(
              isAlphabeticalMode ? 'numerical' : 'alphabetical',
            )
          }
          text={isAlphabeticalMode ? '?123' : 'ABC'}
          viewStyle={styles.specialKey}
          textStyle={[styles.lastRowText, styles.specialKeyTextColor]}
          width={15}
        />
        <KeyButton
          onPress={() => onPress('emoji')}
          text={strings.DefaultView.emojiView}
          viewStyle={styles.specialKey}
          textStyle={styles.emojiKey}
          width={12}
        />
        <KeyButton
          onPress={() => handleKeyPress(commaOrLessThan)}
          text={commaOrLessThan}
          textStyle={styles.specialKeyTextColor}
          viewStyle={styles.specialKey}
          width={10}
        />
        <KeyButton
          onPress={() => handleKeyPress(' ')}
          text={strings.DefaultView.spacebar}
          textStyle={styles.lastRowText}
          width={38}
        />
        <KeyButton
          onPress={() => handleKeyPress(dotOrGreaterThan)}
          text={dotOrGreaterThan}
          textStyle={styles.specialKeyTextColor}
          viewStyle={styles.specialKey}
          width={10}
        />
        <KeyButton
          onPress={() => setKeyboardVisible(false)}
          text={strings.DefaultView.done}
          viewStyle={styles.specialKey}
          textStyle={[styles.lastRowText, styles.specialKeyTextColor]}
          width={15}
        />
      </View>
    </>
  );
};

export default DefaultView;
