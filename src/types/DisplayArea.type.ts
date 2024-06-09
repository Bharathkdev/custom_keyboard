import {TextStyle, ViewStyle} from 'react-native';
import {StyleProp} from 'react-native';

export type DisplayHeightTypes = {
  keyboard: number;
  displayArea: number;
};

export type CursorTypes = StyleProp<TextStyle>;

export type StylePropTypes = {
  container: ViewStyle;
  contentContainer: ViewStyle;
  displayAreaContainer: ViewStyle;
  text: TextStyle;
  caretCenter: ViewStyle;
  caret: TextStyle;
};

export type DisplayAreaRef = {
  handleKeyPress: (key: string) => void;
  handleDeletePress: () => void;
  handleLongPress: () => void;
  handleLongPressRelease: () => void;
};
