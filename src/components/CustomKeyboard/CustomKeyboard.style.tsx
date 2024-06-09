import {ms, ScaledSheet} from 'react-native-size-matters';

import {StylePropTypes} from '../../types/Customkeyboard.type';
import {colors} from '../theme/colors';

export const styles = ScaledSheet.create<StylePropTypes>({
  modalContainer: {
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  modal: {
    margin: 0, //exclude margin provided by react-native-modal
  },
  keyboard: {
    backgroundColor: colors.primary,
    paddingTop: ms(20),
  },
});
