import {Dimensions} from 'react-native';
import Utility from '../src/components/Utilities/Utility';

describe('Utility Functions', () => {
  describe('checkIsTrue', () => {
    test('should return true when both values are equal', () => {
      expect(Utility.checkIsTrue(1, 1)).toBe(true);
      expect(Utility.checkIsTrue('test', 'test')).toBe(true);
      expect(Utility.checkIsTrue(true, true)).toBe(true);
    });

    test('should return false when both values are not equal', () => {
      expect(Utility.checkIsTrue(1, 2)).toBe(false);
      expect(Utility.checkIsTrue('test', 'fail')).toBe(false);
      expect(Utility.checkIsTrue(true, false)).toBe(false);
    });
  });

  describe('getWindowDimensions', () => {
    beforeAll(() => {
      // Mock Dimensions.get to return a specific width and height
      Dimensions.get = jest.fn().mockImplementation(() => ({
        width: 300,
        height: 600,
      }));
    });

    test('should return correct window dimensions', () => {
      const dimensions = Utility.getWindowDimensions();
      expect(dimensions.width).toBe(300);
      expect(dimensions.height).toBe(600);
    });
  });
});
