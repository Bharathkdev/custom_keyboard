import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';

import {ChildrenType} from '../../types/commonTypes';
import {colors} from '../theme/colors';

type GlowingBorderPropTypes = {
  width: number;
  height: number;
} & ChildrenType;

const GlowingBorder: React.FC<GlowingBorderPropTypes> = ({
  width,
  height,
  children,
}) => {
  const glowAnimation = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    const glow = Animated.loop(
      Animated.timing(glowAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    glow.start();
    return () => glow.stop();
  }, [glowAnimation]);

  const glowStyle = {
    borderColor: glowAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [colors.dark, colors.glow, colors.dark],
    }),
  };

  return (
    <View style={styles.centerBox}>
      <Animated.View
        style={[
          styles.animatedBorderBoxGlow,
          glowStyle,
          {
            width: width,
            height: height - 20,
          },
        ]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = ScaledSheet.create({
  centerBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.dark,
    marginTop: ms(2),
  },
  animatedBorderBoxGlow: {
    borderRadius: ms(12),
    borderWidth: ms(2),
    borderColor: colors.transparent,
    overflow: 'hidden',
  },
});

export default React.memo(GlowingBorder);
