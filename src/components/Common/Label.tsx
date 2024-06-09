import React from 'react';
import {
  Text,
  TextStyle,
  RegisteredStyle,
  LayoutChangeEvent,
} from 'react-native';
import {ScaledSheet, NamedStyles} from 'react-native-size-matters';

import {commonTheme} from '../theme/index';
import {colors} from '../theme/colors';

type LabelPropTypes = {
  title: string;
  labelStyle?:
    | TextStyle
    | RegisteredStyle<TextStyle>
    | Array<TextStyle | RegisteredStyle<TextStyle>>;
  onLayout?: (event: LayoutChangeEvent) => void;
};

type StylePropTypes = {
  labelStyle: TextStyle;
};

const styles = ScaledSheet.create<NamedStyles<StylePropTypes>>({
  labelStyle: {
    fontSize: commonTheme.fontSizes.m,
    color: colors.dark,
  },
});

const Label: React.FC<LabelPropTypes> = ({title, labelStyle, onLayout}) => {
  return (
    <Text
      onLayout={onLayout}
      style={[styles.labelStyle as TextStyle, labelStyle]}>
      {title}
    </Text>
  );
};

export default React.memo(Label);
