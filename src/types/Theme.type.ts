type FontSizeName =
  | 'xxs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xl20'
  | 'xl22'
  | 'xxl'
  | 'xxxl'
  | 'xxxl34'
  | 'xxxxl'
  | 'xl5';

// Record<K, T>: Useful when you want to create a dictionary or map-like type of same data type.
type FontSizeTypes = Record<FontSizeName, number>;

type FontName = 'light' | 'regular' | 'medium' | 'bold';

type FontTypes = Record<FontName, string>;

export type CommonThemeTypes = {
  fonts: FontTypes;
  fontSizes: FontSizeTypes;
};
