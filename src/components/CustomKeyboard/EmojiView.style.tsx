import {ms, ScaledSheet} from 'react-native-size-matters';

import {commonTheme} from '../theme';
import {colors} from '../theme/colors';
import {StylePropTypes} from '../../types/EmojiView.type';

export const styles = ScaledSheet.create<StylePropTypes>({
  container: {
    paddingHorizontal: ms(15),
    height: ms(145),
  },
  list: {
    paddingBottom: ms(5),
  },
  headerText: {
    fontFamily: commonTheme.fonts.medium,
    paddingBottom: ms(5),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: ms(1),
    borderTopColor: colors.light,
    padding: ms(10),
  },
  categoryButton: {
    padding: ms(5),
    borderRadius: ms(5),
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ms(5),
  },
  itemText: {
    fontSize: commonTheme.fontSizes.xl20,
    color: colors.dark,
  },
  deleteIcon: {
    width: ms(20),
    height: ms(20),
  },
  emojiFooterIcon: {
    color: colors.dark,
  },
});
