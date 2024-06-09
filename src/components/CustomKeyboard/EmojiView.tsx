import React, {memo, useCallback, useRef, useState} from 'react';
import {View, FlatList} from 'react-native';

import {constants} from '../Constants/constants';
import {colors} from '../theme/colors';
import {styles} from './EmojiView.style';
import KeyButton from '../Common/KeyButton';
import Utility from '../Utilities/Utility';
import Label from '../Common/Label';
import {
  EmojiFooterPropTypes,
  EmojiViewPropTypes,
  ItemType,
} from '../../types/EmojiView.type';

const emojis = constants.emojis;
const {width} = Utility.getWindowDimensions();

const EmojiHeader = memo(({selectedCategory}: {selectedCategory: string}) => {
  return <Label title={selectedCategory} labelStyle={styles.headerText} />;
});

const EmojiScreen: React.FC<EmojiViewPropTypes> = ({
  onKeyPress,
  onPress,
  onLongPress,
  onLongPressRelease,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(emojis)[0],
  );
  const emojiListRef = useRef<FlatList<ItemType> | null>(null);

  const containerHorizontalPadding = 30;
  const containerWidth = width - containerHorizontalPadding;
  const numColumns = 7;
  const itemWidth = containerWidth / numColumns;

  const handleKeyPress = useCallback(
    (key: string) => {
      onKeyPress(key);
    },
    [onKeyPress],
  );

  const EmojiFooter: React.FC<EmojiFooterPropTypes> = useCallback(
    ({onSelectCategory}) => {
      // Create a list of category titles, including a default 'ABC' category
      const emojisTitles = ['ABC', ...Object.keys(emojis)];

      return (
        <View style={styles.footer}>
          {emojisTitles.map((category: string) => {
            const isDefaultView = Utility.checkIsTrue(category, 'ABC');
            return (
              <KeyButton
                key={category}
                onPress={() => {
                  if (isDefaultView) {
                    onPress('default');
                    return;
                  }
                  onSelectCategory(category);
                  emojiListRef.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                }}
                text={isDefaultView ? category : emojis[category][0]}
                viewStyle={[
                  styles.categoryButton,
                  {
                    backgroundColor: Utility.checkIsTrue(
                      selectedCategory,
                      category,
                    )
                      ? colors.base
                      : colors.transparent,
                  },
                ]}
                textStyle={styles.emojiFooterIcon}
                defaultTextStyle={false}
                defaultViewStyle={false}
              />
            );
          })}
          <KeyButton
            onPress={() => onKeyPress('delete')}
            onLongPress={onLongPress}
            onLongPressRelease={onLongPressRelease}
            imageSource={require('../../../assets/images/delete.png')}
            imageStyle={styles.deleteIcon}
            defaultIconStyle={false}
            defaultViewStyle={false}
          />
        </View>
      );
    },
    [onKeyPress, onLongPress, onLongPressRelease, onPress, selectedCategory],
  );

  const renderEmojiItem = useCallback(
    ({item}: {item: string}) => {
      return (
        <KeyButton
          onPress={() => handleKeyPress(item)}
          text={item}
          viewStyle={[styles.itemContainer, {width: itemWidth}]}
          textStyle={styles.itemText}
          defaultTextStyle={false}
          defaultViewStyle={false}
        />
      );
    },
    [itemWidth, handleKeyPress],
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ref={emojiListRef}
          data={emojis[selectedCategory]}
          renderItem={renderEmojiItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: ItemType) => item}
          numColumns={numColumns}
          ListHeaderComponent={
            <EmojiHeader selectedCategory={selectedCategory} />
          }
        />
      </View>
      <EmojiFooter onSelectCategory={setSelectedCategory} />
    </>
  );
};

export default EmojiScreen;
