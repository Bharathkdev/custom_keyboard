import React, {memo, useCallback, useState} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import Modal from 'react-native-modal';

import DefaultView from './DefaultView';
import EmojiView from './EmojiView';
import Utility from '../Utilities/Utility';
import {CustomKeyboardPropTypes} from '../../types/Customkeyboard.type';
import {useKeyboardContext} from '../../Context/KeyboardContext';
import {styles} from './CustomKeyboard.style';

const CustomKeyboard: React.FC<CustomKeyboardPropTypes> = ({
  onKeyPress,
  onLongPress,
  onLongPressRelease,
}) => {
  const [keyboardMode, setKeyboardMode] = useState<string>('default');
  const {setKeyboardHeight, keyboardVisible, setKeyboardVisible} =
    useKeyboardContext();

  const handleKeyboardMode = useCallback((mode: string) => {
    setKeyboardMode(mode);
  }, []);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      setKeyboardHeight(height);
    },
    [setKeyboardHeight],
  );

  const CurrentView = memo(
    Utility.checkIsTrue(keyboardMode, 'default') ? DefaultView : EmojiView,
  );

  return (
    <Modal
      isVisible={keyboardVisible}
      coverScreen={false}
      hasBackdrop={false}
      testID="CustomKeyboard"
      onBackButtonPress={() => setKeyboardVisible(false)}
      style={styles.modal}>
      <View onLayout={onLayout} style={styles.modalContainer}>
        <View style={styles.keyboard}>
          <CurrentView
            onKeyPress={onKeyPress}
            onPress={handleKeyboardMode}
            onLongPress={onLongPress}
            onLongPressRelease={onLongPressRelease}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomKeyboard;
