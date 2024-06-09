import {ms} from 'react-native-size-matters';

import {CommonThemeTypes} from '../../types/Theme.type';

// Common theme object with font families and font sizes
export const commonTheme: CommonThemeTypes = {
  fonts: {
    light: 'Poppins-Light',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    bold: 'Poppins-Bold',
  },
  fontSizes: {
    xxs: ms(8),
    xs: ms(11),
    s: ms(12),
    m: ms(14),
    l: ms(16),
    xl: ms(18),
    xl20: ms(20),
    xl22: ms(22),
    xxl: ms(24),
    xxxl: ms(30),
    xxxl34: ms(34),
    xxxxl: ms(40),
    xl5: ms(50),
  },
};
