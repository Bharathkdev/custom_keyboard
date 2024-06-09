import {ViewStyle} from 'react-native';

export type CustomKeyboardPropTypes = {
  onKeyPress: (key: string) => void;
  onLongPress: () => void;
  onLongPressRelease: () => void;
};

export type StylePropTypes = {
  modalContainer: ViewStyle;
  modal: ViewStyle;
  keyboard: ViewStyle;
};
