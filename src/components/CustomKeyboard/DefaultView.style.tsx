import {ms, ScaledSheet} from 'react-native-size-matters';

import {colors} from '../theme/colors';
import {commonTheme} from '../theme';
import {StylePropTypes} from '../../types/DefaultView.type';

export const styles = ScaledSheet.create<StylePropTypes>({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: ms(10),
    marginHorizontal: ms(5),
  },
  lastRow: {
    height: ms(35),
    flexDirection: 'row',
    marginBottom: ms(20),
    marginHorizontal: ms(5),
  },
  specialKey: {
    backgroundColor: colors.base,
  },
  emojiKey: {
    fontSize: ms(15),
  },
  specialKeyText: {
    fontSize: commonTheme.fontSizes.xs,
  },
  specialKeyTextColor: {
    color: colors.light,
  },
  lastRowText: {
    fontSize: commonTheme.fontSizes.m,
  },
});
