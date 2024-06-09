import React, {useRef} from 'react';
import {View, Image} from 'react-native';

import CustomKeyboard from '../../components/CustomKeyboard/Customkeyboard';
import DisplayArea from '../../components/DisplayArea/DisplayArea';
import Utility from '../../components/Utilities/Utility';
import Label from '../../components/Common/Label';
import {strings} from '../../components/Constants/strings';
import {styles} from './HomeScreen.style';
import {DisplayAreaRef} from '../../types/DisplayArea.type';

const HomeScreen = () => {
  const displayAreaRef = useRef<DisplayAreaRef | null>(null);

  const handleKeyPress = (key: string) => {
    const isDeleteKey = Utility.checkIsTrue(key, 'delete');
    if (isDeleteKey) {
      displayAreaRef.current?.handleDeletePress();
    } else {
      displayAreaRef.current?.handleKeyPress(key);
    }
  };

  return (
    <View testID="Home" style={styles.container}>
      <View style={styles.titleBarContainer}>
        <Image
          style={styles.titleBarImage}
          source={require('../../../assets/images/keyboard.png')}
        />
        <Label title={strings.Home.title} labelStyle={styles.titleBarText} />
      </View>
      <DisplayArea ref={displayAreaRef} />
      <CustomKeyboard
        onKeyPress={handleKeyPress}
        onLongPress={() => displayAreaRef.current?.handleLongPress()}
        onLongPressRelease={() =>
          displayAreaRef.current?.handleLongPressRelease()
        }
      />
    </View>
  );
};

export default HomeScreen;
