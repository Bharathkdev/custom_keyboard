import {Dimensions, Platform} from 'react-native';

const checkIsTrue = (
  firstValue: string | number | boolean,
  secondValue: string | number | boolean,
): boolean => firstValue === secondValue;

const getWindowDimensions = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return {width, height};
};

const isIOS = Platform.OS === 'ios';

export default {
  checkIsTrue,
  getWindowDimensions,
  isIOS,
};
