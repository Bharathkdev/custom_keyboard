<div align="center">
    <img width="250" alt="Screenshot 2024-06-09 at 1 12 30 PM" src="https://github.com/Bharathkdev/custom_keyboard/assets/46343966/0e087639-651b-4b71-be76-a3d6d202e752">
    <img width="242" alt="Screenshot 2024-06-09 at 1 13 48 PM" src="https://github.com/Bharathkdev/custom_keyboard/assets/46343966/2978cee4-3715-4d03-9899-45bcdb060e06">
</div>

<h3 align="center">React Native Custom Keyboard App</h3>

## Overview

This React Native project presents a custom keyboard screen that features a display area where entered characters are shown. It allows users to type text using a custom keyboard and includes caret functionality for visual indication. This README describes the layout, features, and key functionalities of the screen.

## Screen Layout

The screen is structured into different sections:

- **Header**: Contains the app's logo and title.

- **Display Area**: This is an editable component where keystrokes from the custom keyboard are displayed. It indicates the current caret position, letting users see where they can insert or delete characters. Additionally, an animated glowing border highlights the display area when the keyboard is active.

- **Keyboard Area**: The custom keyboard, which includes all alphabetical characters (A-Z), numerical characters (0-9), and special characters (=\\<), has multiple functionalities such as mode toggle, caps lock, delete characters, and close keyboard. There's also a switch key for emoji view.

## Custom Keyboard Functionalities

The custom keyboard comes with these key functionalities:

- **Default Mode**:
    - **Mode Toggle Key**: Switches between alphabetical, numerical, and special character modes.
    - **Caps Lock Toggle**: When caps lock is on, alphabetical characters are uppercase; otherwise, they are lowercase.
    - **Delete Key**: Deletes the characters from any index. And if the caret is at the first index it has no effect. On long press, it deletes multiple characters at once.
    - **Done Key**: Closes the keyboard.
    - **Emoji View Switch Key**: Switches to an emoji view.

- **Emoji Mode**:
    - Contains a colorful view of emojis in various categories.
    - Each category has a title with a list of scrollable emojis.
    - **Footer**: Allows users to switch between different categories or return to the default mode.
    - **ABC Key**: Switches back to the default mode.
    - **Delete Key**: Similar functionality to the default mode, deletes the characters from any index. And if the caret is at the first index it has no effect. On long press, it deletes multiple characters at once.

- **Key Press**:
    - When a key is pressed, its character is appended to the display area at the current caret position.
    - The caret position is updated accordingly.

## Display Area Functionalities

The display area has several features related to the caret and text management:

- **Display Area**: 
   - An interactive field that activates the keyboard when tapped, showing keypresses from a custom keyboard.
   - It highlights the current caret location, helping users know where the next character will appear or where they can remove existing characters.
   - Users can add or remove characters at any position within the field.

- **Dynamic sized Display Area**:
   - The display area adjusts its size dynamically based on whether the keyboard is open or closed, ensuring a seamless user experience.
   - When the keyboard is open, the display area contracts to accommodate available space with a beautiful glowing animated border.
   - When the keyboard is closed, the display area expands, allowing for a more readable view.

- **Scrollable View**:   
   - The display area becomes scrollable when the content exceeds the maximum height, allowing users to navigate through large amounts of text.
   - As users enter more characters, the view automatically scrolls to keep the most recent input in focus, enhancing user experience.
   - This feature ensures that users can continue entering text smoothly without losing sight of their current position.

- **Caret Display**:
  - A blinking cursor visually indicates the current caret position within the text. 

- **Caret Positioning**:
   - Users can change the caret's position by tapping on a specific location within the text.
   - If the tap occurs inside the display area but outside the text boundaries:
      - **Left or Right Taps**: The caret moves to the nearest valid position within the text.
      - **Top or Bottom Taps**: If tapped top-left or top-right, caret will be positioned at the first or last index of first visible line(since its a scroll view) respectively and below, or anywhere without text, the caret will move to the last index.
      - This feature allows users to insert or delete characters at the caret's current position.
      - Handled the caret position during user scrolling and tapping outside text boundaries in the scroll view. This is managed through complex layout calculations to position the caret involving **onLayout, onTouchEnd, onScroll, scrollEventThrottle and onContentSizeChange properties**.

## State Management with Context API and useState:

- **Utilized Context API and useState for state management**:
   - **Context API** for global state management, allowing to update and access global states from any part of the application. This helps maintain consistency across components and also avoids unwanted props passing and state management within components.
   - **useState** for component specific state management.

## Bonus features:

- Added customized app icon and splash screen for the app.
- Editable display area that lets users insert and delete characters at any position for enhanced flexibility.
- Dynamic display area that adjusts its size based on the keyboard's open/close status, ensuring optimal use of screen space.
- Glowing border highlighting the display area when the keyboard is active.
- Multiple characters deletion at once on delete key long press.
- The caret position adjusts based on user scrolling and tapping outside of text boundaries in the scroll view(dynamic caret positioning).
- Developed a keyboard that includes all the alphabetical, numerical, and special characters for comprehensive input.
- Added a dedicated emojis view within the keyboard, featuring different categories of emojis for varied expression.
- Incorporated custom fonts to improve the user interface.

## Performance optimisations:

- Utilized Pure components, useCallback, and useMemo to prevent unnecessary component re-renders and memoization.

## Testing:
   
- Conducted thorough testing on both iOS and Android devices.
- Tested the app's functionality, user interface, and responsiveness.

## Bug Fixes and Improvements:

- Addressed any issues identified during testing and fixed bugs.
- Fine-tuned the user interface and overall user experience.

## Coding standards:

- Adhered to proper naming conventions and folder structure.
- Added comments wherever necessary.
- Implemented reusable components and common utilities.
- Implemented typescript in all the screens and reused the common types to ensure type safety and code reusability.
- Regularly committed and pushed changes following conventional and atomic commits.
