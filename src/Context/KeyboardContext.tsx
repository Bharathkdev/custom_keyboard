import React, {
  createContext,
  useState,
  useContext,
  FC,
  SetStateAction,
  Dispatch,
} from 'react';

import {ChildrenType} from '../types/commonTypes';

type KeyboardContextPropTypes = {
  keyboardVisible: boolean;
  setKeyboardVisible: Dispatch<SetStateAction<boolean>>;
  keyboardHeight: number;
  setKeyboardHeight: Dispatch<SetStateAction<number>>;
};

const KeyboardContext = createContext<KeyboardContextPropTypes>({
  keyboardVisible: false,
  setKeyboardVisible: () => {},
  keyboardHeight: 0,
  setKeyboardHeight: () => {},
});

export const useKeyboardContext = () => useContext(KeyboardContext);

export const KeyboardProvider: FC<ChildrenType> = ({children}) => {
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  return (
    <KeyboardContext.Provider
      value={{
        keyboardVisible,
        setKeyboardVisible,
        keyboardHeight,
        setKeyboardHeight,
      }}>
      {children}
    </KeyboardContext.Provider>
  );
};
