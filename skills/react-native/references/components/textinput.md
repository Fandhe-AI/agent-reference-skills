---
source: https://reactnative.dev/docs/0.87/textinput
---

# TextInput

A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.

## Signature / Usage

The most basic use case is to place a `TextInput` and subscribe to the `onChangeText` events to read the user input. Other events such as `onSubmitEditing` and `onFocus` can also be subscribed to.

```tsx
import {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TextInputExample = () => {
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TextInputExample;
```

Two methods exposed via the native element are `.focus()` and `.blur()`, which focus or blur the TextInput programmatically. Some props are only available with `multiline={true/false}`:

```tsx
const MultilineTextInputExample = () => {
  const [value, onChangeText] = useState('Useless Multiline Placeholder');

  // If you type something in the text box that is a color,
  // the background will change to that color.
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: value.toLowerCase(),
        }}>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={text => onChangeText(text)}
          value={value}
          style={styles.textInput}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
```

## Options / Props

Inherits [View Props](./view.md#options--props).

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| allowFontScaling | bool | `true` | | Whether fonts scale to respect Text Size accessibility settings. |
| autoCapitalize | enum('none', 'sentences', 'words', 'characters') | `sentences` | | Automatically capitalize certain characters: `characters` all characters; `words` first letter of each word; `sentences` first letter of each sentence; `none` nothing. Not supported by some keyboard types such as `name-phone-pad`. |
| autoComplete | enum (see below) | | | Autocomplete hints so the system can provide autofill. On Android, the system always attempts to offer autofill using heuristics; set `off` to disable. |
| autoCorrect | bool | `true` | | If `false`, disables auto-correct. |
| autoFocus | bool | `false` | | If `true`, focuses the input. |
| blurOnSubmit | bool | true (single-line), false (multiline) | | Deprecated. `submitBehavior` takes its place and overrides it. If `true`, the field blurs when submitted; for multiline fields, `true` means pressing return blurs the field and triggers `onSubmitEditing` instead of inserting a newline. |
| caretHidden | bool | `false` | | If `true`, caret is hidden. |
| clearButtonMode | enum('never', 'while-editing', 'unless-editing', 'always') | `never` | iOS | When the clear button appears on the right side. Only for single-line TextInput. |
| clearTextOnFocus | bool | | iOS | If `true`, clears the text field automatically when editing begins. |
| contextMenuHidden | bool | `false` | | If `true`, context menu is hidden. |
| dataDetectorTypes | enum or array of enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all') | none | iOS | Types of data converted to clickable URLs. Only valid if `multiline={true}` and `editable={false}`. |
| defaultValue | string | | | Initial value that changes when the user starts typing. Useful when you do not want to listen to events and update `value` to keep controlled state in sync. |
| disableKeyboardShortcuts | bool | `false` | iOS | If `true`, the keyboard shortcuts (undo/redo and copy buttons) are disabled. |
| cursorColor | color | | Android | Sets the color of the cursor (caret), independently of the text selection box color. |
| disableFullscreenUI | bool | `false` | Android | When `false`, the OS may choose a full screen text input mode when little space is available (e.g. landscape on a phone). When `true`, users always edit directly inside the text input. |
| editable | bool | `true` | | If `false`, text is not editable. |
| enablesReturnKeyAutomatically | bool | `false` | iOS | The keyboard disables the return key when there is no text and enables it when there is text. |
| enterKeyHint | enum('enter', 'done', 'next', 'previous', 'search', 'send', 'go') | | | Text shown on the return key. Has precedence over `returnKeyType`. Cross-platform: `done`, `next`, `search`, `send`, `go`. Android only: `previous`. iOS only: `enter`. |
| importantForAutofill | enum('auto', 'no', 'noExcludeDescendants', 'yes', 'yesExcludeDescendants') | `auto` | Android | Whether the field is included in a view structure for autofill (API Level 26+). `auto`: heuristics; `no`: not important; `noExcludeDescendants`: this view and its children not important; `yes`: important; `yesExcludeDescendants`: important but its children aren't. |
| inlineImageLeft | string | | Android | Image resource rendered on the left; must be inside `/android/app/src/main/res/drawable`, e.g. `<TextInput inlineImageLeft='search_icon' />`. |
| inlineImagePadding | number | | Android | Padding between the inline image, if any, and the text input itself. |
| inputAccessoryViewID | string | | iOS | Identifier linking a custom InputAccessoryView to this text input; it is rendered above the keyboard when focused. |
| inputAccessoryViewButtonLabel | string | | iOS | Label that overrides the default InputAccessoryView button label (the default is not localized). |
| inputMode | enum('decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url') | | | Works like the HTML `inputmode` attribute; determines which keyboard to open. Has precedence over `keyboardType`. |
| keyboardAppearance | enum('default', 'light', 'dark') | | iOS | Color of the keyboard. |
| keyboardType | enum (see below) | `default` | | Which keyboard to open, e.g. `numeric`. |
| lineBreakStrategyIOS | enum('none', 'standard', 'hangul-word', 'push-out') | `'none'` | iOS | Line break strategy on iOS 14+. |
| lineBreakModeIOS | enum('wordWrapping', 'char', 'clip', 'head', 'middle', 'tail') | `'wordWrapping'` | iOS | Line break mode on iOS. |
| maxFontSizeMultiplier | number | `null/undefined` | | Largest scale a font can reach when `allowFontScaling` is enabled. `null/undefined`: inherit from parent or the global default (0); `0`: no max; `>= 1`: sets this node's value. |
| maxLength | number | | | Limits the maximum number of characters. Use this instead of JS logic to avoid flicker. |
| multiline | bool | `false` | | If `true`, the text input can be multiple lines. |
| numberOfLines | number | | | Maximum number of lines. Use with multiline `true`. On iOS, only available on the New Architecture. |
| onBlur | `({nativeEvent: TargetEvent}) => void` | | | Called when the text input is blurred. |
| onChange | `({nativeEvent: {eventCount, target, text}}) => void` | | | Called when the text changes. |
| onChangeText | function | | | Called when the text changes; the changed text is passed as a single string argument. |
| onContentSizeChange | `({nativeEvent: {contentSize: {width, height}}}) => void` | | | Called when the content size changes. Only for multiline text inputs. |
| onEndEditing | function | | | Called when text input ends. |
| onPressIn | `({nativeEvent: PressEvent}) => void` | | | Called when a touch is engaged. |
| onPressOut | `({nativeEvent: PressEvent}) => void` | | | Called when a touch is released. |
| onFocus | `({nativeEvent: TargetEvent}) => void` | | | Called when the text input is focused. |
| onKeyPress | `({nativeEvent: {key: keyValue}}) => void` | | | Called when a key is pressed; `keyValue` is `'Enter'` or `'Backspace'` for those keys and the typed-in character otherwise (including `' '`). Fires before `onChange`. On Android only soft keyboard input is handled. |
| onLayout | `({nativeEvent: LayoutEvent}) => void` | | | Invoked on mount and on layout changes. |
| onScroll | `({nativeEvent: {contentOffset: {x, y}}}) => void` | | | Invoked on content scroll. On Android `contentSize` is not provided for performance reasons. |
| onSelectionChange | `({nativeEvent: {selection: {start, end}}}) => void` | | | Called when the selection is changed. |
| onSubmitEditing | `({nativeEvent: {text, eventCount, target}}) => void` | | | Called when the submit button is pressed. On iOS not called with `keyboardType="phone-pad"`. |
| placeholder | string | | | The string rendered before text input has been entered. |
| placeholderTextColor | color | | | The text color of the placeholder string. |
| readOnly | bool | `false` | | If `true`, text is not editable. |
| returnKeyLabel | string | | Android | Sets the return key to the label. Use instead of `returnKeyType`. |
| returnKeyType | enum (see below) | | | How the return key looks. On Android you can also use `returnKeyLabel`. |
| rejectResponderTermination | bool | `true` | iOS | If `true`, allows TextInput to pass touch events to the parent component (e.g. so SwipeableListView can be swiped from the TextInput). If `false`, TextInput always asks to handle the input (except when disabled). |
| rows | number | | Android | Sets the number of lines. Use with multiline `true`. |
| scrollEnabled | bool | `true` | iOS | If `false`, scrolling of the text view is disabled. Only works with `multiline={true}`. |
| secureTextEntry | bool | `false` | | Obscures the text entered. Does not work with `multiline={true}`. |
| selection | object: `{start: number, end: number}` | | | Start and end of the selection. Set both to the same value to position the cursor. |
| selectionColor | color | | | The highlight, selection handle and cursor color. |
| selectionHandleColor | color | | Android | Color of the selection handle, independent of `selectionColor`. |
| selectTextOnFocus | bool | | | If `true`, all text is selected on focus. |
| showSoftInputOnFocus | bool | `true` | | When `false`, prevents the soft keyboard from showing when focused. |
| smartInsertDelete | bool | `true` | iOS | If `false`, iOS does not insert an extra space after a paste or delete one or two spaces after a cut/delete. |
| spellCheck | bool | inherited from `autoCorrect` | iOS | If `false`, disables spell-check style (red underlines). |
| submitBehavior | enum('submit', 'blurAndSubmit', 'newline') | | | What happens when return is pressed. Single line: `'newline'` and `undefined` default to `'blurAndSubmit'`. Multiline: `'newline'` adds a newline; `undefined` defaults to `'newline'`. Both: `'submit'` sends a submit event and does not blur; `'blurAndSubmit'` blurs and sends a submit event. |
| textAlign | enum('left', 'center', 'right') | | | Align the input text. |
| textContentType | enum (see below) | | iOS | Gives the keyboard and system information about the expected semantic meaning of the content. |
| passwordRules | string | | iOS | With `textContentType` `newPassword`, lets the OS know the minimum requirements of the password so it can generate one that satisfies them. |
| style | Text style | | | Not all Text styles are supported; an incomplete list of unsupported ones: `borderLeftWidth`, `borderTopWidth`, `borderRightWidth`, `borderBottomWidth`, `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomRightRadius`, `borderBottomLeftRadius`. |
| textBreakStrategy | enum('simple', 'highQuality', 'balanced') | `highQuality` | Android | Text break strategy on Android API Level 23+. |
| underlineColorAndroid | color | | Android | The color of the `TextInput` underline. |
| value | string | | | The value to show. `TextInput` is a controlled component: the native value is forced to match this prop if provided. To prevent edits without flicker, set `editable={false}` or set/update `maxLength`. |

`autoComplete` values working across platforms: `additional-name`, `address-line1`, `address-line2`, `birthdate-day` (iOS 17+), `birthdate-full` (iOS 17+), `birthdate-month` (iOS 17+), `birthdate-year` (iOS 17+), `cc-csc` (iOS 17+), `cc-exp` (iOS 17+), `cc-exp-day` (iOS 17+), `cc-exp-month` (iOS 17+), `cc-exp-year` (iOS 17+), `cc-number`, `country`, `current-password`, `email`, `family-name`, `given-name`, `honorific-prefix`, `honorific-suffix`, `name`, `new-password`, `off`, `one-time-code`, `postal-code`, `street-address`, `tel`, `username`.

iOS only: `cc-family-name` (iOS 17+), `cc-given-name` (iOS 17+), `cc-middle-name` (iOS 17+), `cc-name` (iOS 17+), `cc-type` (iOS 17+), `nickname`, `organization`, `organization-title`, `url`.

Android only: `gender`, `name-family`, `name-given`, `name-middle`, `name-middle-initial`, `name-prefix`, `name-suffix`, `password`, `password-new`, `postal-address`, `postal-address-country`, `postal-address-extended`, `postal-address-extended-postal-code`, `postal-address-locality`, `postal-address-region`, `sms-otp`, `tel-country-code`, `tel-device`, `tel-national`, `username-new`.

`keyboardType` values: cross-platform `default`, `number-pad`, `decimal-pad`, `numeric`, `email-address`, `phone-pad`, `url`; iOS only `ascii-capable`, `numbers-and-punctuation`, `name-phone-pad`, `twitter`, `web-search`; Android only `visible-password`.

`returnKeyType` values: cross-platform `done`, `go`, `next`, `search`, `send`; Android only `none`, `previous`; iOS only `default`, `emergency-call`, `google`, `join`, `route`, `yahoo`.

`textContentType` values: `none`, `addressCity`, `addressCityAndState`, `addressState`, `birthdate` (iOS 17+), `birthdateDay` (iOS 17+), `birthdateMonth` (iOS 17+), `birthdateYear` (iOS 17+), `countryName`, `creditCardExpiration` (iOS 17+), `creditCardExpirationMonth` (iOS 17+), `creditCardExpirationYear` (iOS 17+), `creditCardFamilyName` (iOS 17+), `creditCardGivenName` (iOS 17+), `creditCardMiddleName` (iOS 17+), `creditCardName` (iOS 17+), `creditCardNumber`, `creditCardSecurityCode` (iOS 17+), `creditCardType` (iOS 17+), `emailAddress`, `familyName`, `fullStreetAddress`, `givenName`, `jobTitle`, `location`, `middleName`, `name`, `namePrefix`, `nameSuffix`, `newPassword`, `nickname`, `oneTimeCode`, `organizationName`, `password`, `postalCode`, `streetAddressLine1`, `streetAddressLine2`, `sublocality`, `telephoneNumber`, `URL`, `username`. Set `username` or `password` to enable autofill of login details from the device keychain; `newPassword` for a new password the user may want to save; `oneTimeCode` for codes arriving by SMS; `none` to disable autofill.

### Methods

```tsx
focus();
blur();
clear();
isFocused(): boolean;
```

| Method | Description |
| --- | --- |
| focus() | Makes the native input request focus. |
| blur() | Makes the native input lose focus. |
| clear() | Removes all text from the `TextInput`. |
| isFocused() | Returns `true` if the input is currently focused; `false` otherwise. |

## Notes

- `TextInput` has a border at the bottom of its view by default (Android). Its padding is set by the background image provided by the system and cannot be changed. Avoid it by not setting height explicitly, or by setting `underlineColorAndroid` to transparent.
- On Android, performing text selection in an input can change the activity `windowSoftInputMode` param to `adjustResize`, which may cause issues with components that have `position: 'absolute'` while the keyboard is active. Specify `windowSoftInputMode` in AndroidManifest.xml or control it programmatically with native code.
- `multiline` aligns the text to the top on iOS and centers it on Android. Use with `textAlignVertical` set to `top` for the same behavior on both platforms.
- `onBlur`: the `text` value from `nativeEvent` can be `undefined`. To find the last value of the TextInput, use the `onEndEditing` event.
- `textContentType` and `autoComplete` provide the same functionality (`autoComplete` is available on all platforms). Avoid using both; for backwards compatibility `textContentType` takes precedence when both are set.
- If the iOS password generation dialog doesn't appear, make sure AutoFill Passwords is enabled (Settings, Passwords & Accounts) and iCloud Keychain is used.
- Known issues: react-native#19096 (doesn't support Android's `onKeyPreIme`); react-native#19366 (calling `.focus()` after closing Android's keyboard via back button doesn't bring the keyboard up again); react-native#26799 (doesn't support Android's `secureTextEntry` when `keyboardType="email-address"` or `"phone-pad"`).
- 0.88: `fontVariationSettings` is now supported on both `<Text>` and `<TextInput>`, on Android and iOS (see the Text Style Props page) ([0.88 release blog](https://reactnative.dev/blog/2026/10/19/react-native-0.88)).
- This is the React Native core `TextInput` (imported from `react-native`, rendered as a native view). It is distinct from same-named parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [Text](./text.md)
- [InputAccessoryView](./inputaccessoryview.md)
- [KeyboardAvoidingView](./keyboardavoidingview.md)
- [PressEvent](../props-types/pressevent.md)
- [TargetEvent](../props-types/targetevent.md)
- [LayoutEvent](../props-types/layoutevent.md)
