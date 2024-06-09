export type ChildrenType = {
  children: React.ReactNode;
};

type AlphabeticalType = string[][];
type NumericalType = string[][];
type SpecialType = string[][];
type PredefinedKeys = 'Smileys' | 'Animals' | 'Food' | 'Activities' | 'Travel';
/**
 * Record<K, T>: Useful when you want to create a dictionary or map-like type of same data type.
 * Create a record of emoji types with type String[].
 */
type EmojisType = Record<string, string[]> & Record<PredefinedKeys, string[]>;

export type ConstantTypes = {
  alphabetical: AlphabeticalType;
  numerical: NumericalType;
  special: SpecialType;
  emojis: EmojisType;
};
