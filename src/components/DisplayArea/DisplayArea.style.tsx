import {ScaledSheet, ms} from 'react-native-size-matters';

import {colors} from '../theme/colors';
import {commonTheme} from '../theme';
import {StylePropTypes} from '../../types/DisplayArea.type';

export const styles = ScaledSheet.create<StylePropTypes>({
  container: {
    flex: 1,
    marginBottom: ms(10),
    marginTop: ms(2),
    borderColor: colors.baseLight,
    backgroundColor: colors.dark,
    borderWidth: ms(2),
    padding: ms(15),
    borderBottomRightRadius: ms(20),
    borderBottomLeftRadius: ms(20),
  },
  displayAreaContainer: {
    flex: 1,
    alignItems: 'center',
  },
  caret: {
    fontSize: commonTheme.fontSizes.xl20,
    height: ms(27),
    color: colors.glow,
  },
  caretCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: ms(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  text: {
    color: colors.light,
    fontSize: commonTheme.fontSizes.xl,
    lineHeight: ms(27),
    fontFamily: commonTheme.fonts.regular,
    letterSpacing: 1,
  },
});
