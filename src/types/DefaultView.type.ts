import {TextStyle, ViewStyle} from 'react-native';

export type ModePropType = 'alphabetical' | 'numerical' | 'special';

export type DefaultViewPropTypes = {
  onKeyPress: (key: string) => void;
  onPress: (key: string) => void;
  onLongPress: () => void;
  onLongPressRelease: () => void;
};

export type StylePropTypes = {
  row: ViewStyle;
  lastRow: ViewStyle;
  specialKey: ViewStyle;
  emojiKey: TextStyle;
  specialKeyText: TextStyle;
  specialKeyTextColor: TextStyle;
  lastRowText: TextStyle;
};
