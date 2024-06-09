import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type EmojiViewPropTypes = {
  onKeyPress: (key: string) => void;
  onPress: (key: string) => void;
  onLongPress: () => void;
  onLongPressRelease: () => void;
};

export type EmojiFooterPropTypes = {
  onSelectCategory: (category: string) => void;
};

export type ItemType = string;

export type StylePropTypes = {
  container: ViewStyle;
  list: ViewStyle;
  headerText: TextStyle;
  footer: ViewStyle;
  categoryButton: ViewStyle;
  itemContainer: ViewStyle;
  itemText: TextStyle;
  deleteIcon: ImageStyle;
  emojiFooterIcon: TextStyle;
};
