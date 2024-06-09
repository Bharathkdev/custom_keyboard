import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  View,
  StyleSheet,
  StyleProp,
} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';

import {commonTheme} from '../theme/index';
import {colors} from '../theme/colors';
import Utility from '../Utilities/Utility';

type StylePropTypes = {
  keyText: TextStyle;
  key: ViewStyle;
  specialKeyIcon: ImageStyle;
};

const styles = ScaledSheet.create<StylePropTypes>({
  key: {
    flex: 1,
    height: ms(36),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ms(3),
    backgroundColor: colors.light,
    borderWidth: ms(1),
    borderRadius: ms(7),
    borderColor: colors.transparent,
    paddingTop: Utility.isIOS ? 0 : ms(2),
    elevation: ms(5),
    shadowColor: colors.dark,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  keyText: {
    fontSize: commonTheme.fontSizes.xl20,
    fontFamily: commonTheme.fonts.regular,
    color: colors.dark,
  },
  specialKeyIcon: {
    width: ms(18),
    height: ms(18),
  },
});

type KeyButtonPropTypes = {
  onPress: () => void;
  onLongPress?: () => void;
  onLongPressRelease?: () => void;
  text?: string;
  imageSource?: ImageSourcePropType;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  width?: number;
  defaultViewStyle?: boolean;
  defaultTextStyle?: boolean;
  defaultIconStyle?: boolean;
};

const KeyButton: React.FC<KeyButtonPropTypes> = ({
  onPress,
  onLongPress,
  onLongPressRelease,
  text,
  imageSource,
  textStyle,
  imageStyle,
  viewStyle,
  width,
  defaultViewStyle = true,
  defaultTextStyle = true,
  defaultIconStyle = true,
}) => {
  const mergedViewStyle = StyleSheet.flatten([
    defaultViewStyle && styles.key,
    viewStyle,
  ]);

  const mergedTextStyle = StyleSheet.flatten([
    defaultTextStyle && styles.keyText,
    textStyle,
  ]);

  const mergedImageStyle = StyleSheet.flatten([
    defaultIconStyle && styles.specialKeyIcon,
    imageStyle,
  ]);

  const keyButton = (
    <TouchableOpacity
      activeOpacity={0.7}
      style={mergedViewStyle}
      onLongPress={onLongPress}
      onPressOut={onLongPressRelease}
      onPress={onPress}>
      {text && <Text style={mergedTextStyle}>{text}</Text>}
      {imageSource && <Image style={mergedImageStyle} source={imageSource} />}
    </TouchableOpacity>
  );

  if (width) {
    return <View style={{width: `${width}%`}}>{keyButton}</View>;
  }

  return keyButton;
};

export default React.memo(KeyButton);
