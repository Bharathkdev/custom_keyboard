import React from 'react';
import {StatusBar, SafeAreaView, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import {colors} from '../theme/colors';
import {ChildrenType} from '../../types/commonTypes';
import Utility from '../Utilities/Utility';

type StylePropTypes = {
  topSafeAreaStyle: ViewStyle;
  bottomSafeAreaStyle: ViewStyle;
};

const styles = ScaledSheet.create<StylePropTypes>({
  topSafeAreaStyle: {
    flex: 0,
    backgroundColor: colors.base,
  },
  bottomSafeAreaStyle: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

const SafeArea: React.FC<ChildrenType> = ({children}) => {
  return (
    <>
      {Utility.isIOS ? (
        <>
          <SafeAreaView style={styles.topSafeAreaStyle} />
          <SafeAreaView style={styles.bottomSafeAreaStyle}>
            {children}
          </SafeAreaView>
        </>
      ) : (
        <>
          <StatusBar barStyle={'default'} backgroundColor={colors.base} />
          {children}
        </>
      )}
    </>
  );
};

export default React.memo(SafeArea);
