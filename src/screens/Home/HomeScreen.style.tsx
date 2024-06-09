import {StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';

import {colors} from '../../components/theme/colors';
import {commonTheme} from '../../components/theme';
import Utility from '../../components/Utilities/Utility';
import {StylePropTypes} from '../../types/HomeScreen.type';

export const styles = StyleSheet.create<StylePropTypes>({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  titleBarContainer: {
    paddingTop: Utility.isIOS ? ms(10) : ms(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(80),
    backgroundColor: colors.base,
    justifyContent: 'center',
  },
  titleBarImage: {
    width: ms(45),
    height: ms(45),
  },
  titleBarText: {
    fontSize: commonTheme.fontSizes.xl22,
    textAlign: 'center',
    paddingVertical: ms(10),
    paddingLeft: ms(10),
    color: colors.light,
    fontFamily: commonTheme.fonts.regular,
  },
});
