---
source: https://reactnative.dev/docs/0.87/text
---

# Text

A React component for displaying text. Supports nesting, styling, and touch handling.

## Signature / Usage

The nested title and body text inherit the `fontFamily` from `styles.baseText`, but the title provides its own additional styles. The title and body stack on top of each other on account of the literal newlines:

```tsx
import {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TextInANest = () => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = 'This is not really a bird nest.';

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText} onPress={onPressTitle}>
            {titleText}
            {'\n'}
            {'\n'}
          </Text>
          <Text numberOfLines={5}>{bodyText}</Text>
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TextInANest;
```

### Nested text

Both Android and iOS allow formatted text by annotating ranges of a string (`NSAttributedString` on iOS, `SpannableString` on Android). React Native uses the web paradigm instead: nest text to achieve the same effect.

```tsx
const BoldAndBeautiful = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.baseText}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
      </Text>
    </SafeAreaView>
  </SafeAreaProvider>
);
```

Behind the scenes, React Native converts this to a flat `NSAttributedString` or `SpannableString` that contains the following information:

```
"I am bold and red"
0-9: bold
9-17: bold, red
```

### Containers

The `<Text>` element is unique relative to layout: everything inside is no longer using the Flexbox layout but using text layout. Elements inside of a `<Text>` are no longer rectangles, but wrap when they see the end of the line.

```tsx
<Text>
  <Text>First part and </Text>
  <Text>second part</Text>
</Text>
// Text container: the text will be inline, if the space allows it
// |First part and second part|

// otherwise, the text will flow as if it was one
// |First part |
// |and second |
// |part       |

<View>
  <Text>First part and </Text>
  <Text>second part</Text>
</View>
// View container: each text is its own block
// |First part and|
// |second part   |

// otherwise, the text will flow in its own block
// |First part |
// |and        |
// |second part|
```

### Limited Style Inheritance

You must wrap all the text nodes inside of a `<Text>` component. You cannot have a text node directly under a `<View>`.

```tsx
// BAD: will raise exception, can't have a text node as child of a <View>
<View>
  Some text
</View>

// GOOD
<View>
  <Text>
    Some text
  </Text>
</View>
```

You also lose the ability to set up a default font for an entire subtree, and `fontFamily` only accepts a single font name (unlike CSS `font-family`). The recommended way to use consistent fonts and sizes across your application is to create a component `MyAppText` that includes them and use it across your app (and e.g. `MyAppHeaderText` for other kinds of text).

```tsx
const MyAppHeaderText = ({children}) => {
  return (
    <MyAppText>
      <Text style={{fontSize: 20}}>{children}</Text>
    </MyAppText>
  );
};
```

React Native still has the concept of style inheritance, but limited to text subtrees. In this case, the second part will be both bold and red:

```tsx
<Text style={{fontWeight: 'bold'}}>
  I am bold
  <Text style={{color: 'red'}}>and red</Text>
</Text>
```

Rationale given: (Developer) components are designed with strong isolation in mind, and text properties that could inherit from outside of the props would break this isolation. (Implementor) there is no need for a `fontFamily` field on every element or tree traversal to the root per text node; style inheritance is encoded only inside the native Text component.

## Options / Props

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| accessibilityHint | string | | | Helps users understand what will happen when they perform an action when that result is not clear from the label. |
| accessibilityLanguage | string | | iOS | Language used by the screen reader. Should follow the BCP 47 specification. |
| accessibilityLabel | string | | | Overrides the text read by the screen reader. By default, constructed by accumulating all child `Text` nodes separated by space. |
| accessibilityRole | AccessibilityRole | | | Tells the screen reader to treat the focused element as having a specific role. On iOS, roles map to Accessibility Traits; on Android they have similar functionality on TalkBack. |
| accessibilityState | AccessibilityState | | | Tells the screen reader to treat the element as being in a specific state, passed as an object, e.g. `{selected: true, disabled: true}`. |
| accessibilityActions | array | | | List of action objects (each with name and label) an assistive technology can invoke. |
| onAccessibilityAction | function | | | Invoked when the user performs the accessibility actions. |
| accessible | boolean | `true` | | When set to `true`, indicates that the view is an accessibility element. |
| adjustsFontSizeToFit | boolean | `false` | | Whether fonts should be scaled down automatically to fit given style constraints. |
| allowFontScaling | boolean | `true` | | Whether fonts should scale to respect Text Size accessibility settings. |
| android_hyphenationFrequency | enum(`'none'`, `'normal'`, `'full'`) | `'none'` | Android | Frequency of automatic hyphenation when determining word breaks on Android API Level 23+. |
| aria-busy | boolean | false | | Element is being modified. |
| aria-checked | boolean, 'mixed' | false | | State of a checkable element. |
| aria-disabled | boolean | false | | Element is perceivable but disabled. |
| aria-expanded | boolean | false | | Whether an expandable element is expanded or collapsed. |
| aria-label | string | | | String value that labels an interactive element. |
| aria-selected | boolean | | | Whether a selectable element is selected. |
| dataDetectorType | enum(`'phoneNumber'`, `'link'`, `'email'`, `'none'`, `'all'`) | `'none'` | Android | Types of data converted to clickable URLs in the text element. Only one type can be provided. |
| disabled | bool | `false` | Android | Disabled state of the text view for testing purposes. |
| dynamicTypeRamp | enum(`'caption2'`, `'caption1'`, `'footnote'`, `'subheadline'`, `'callout'`, `'body'`, `'headline'`, `'title3'`, `'title2'`, `'title1'`, `'largeTitle'`) | `'body'` | iOS | The Dynamic Type ramp to apply to this element on iOS. |
| ellipsizeMode | enum(`'head'`, `'middle'`, `'tail'`, `'clip'`) | `tail` | | How text is truncated when `numberOfLines` is set (must be set in conjunction). `head`: "...wxyz"; `middle`: "ab...yz"; `tail`: "abcd..."; `clip`: lines are not drawn past the edge of the text container. |
| id | string | | | Used to locate this view from native code. Has precedence over `nativeID`. |
| maxFontSizeMultiplier | number | `undefined` | | Largest possible scale a font can reach when `allowFontScaling` is enabled. `null/undefined`: inherit from the parent node or the global default (0); `0`: no max; `>= 1`: sets this node's value. |
| minimumFontScale | number | | | Smallest possible scale a font can reach when `adjustsFontSizeToFit` is enabled (values 0.01-1.0). |
| nativeID | string | | | Used to locate this view from native code. |
| numberOfLines | number | `0` | | Truncates the text with an ellipsis after computing the text layout, such that the total number of lines does not exceed this number. `0` unsets the restriction. Commonly used with `ellipsizeMode`. |
| onLayout | `({nativeEvent: LayoutEvent}) => void` | | | Invoked on mount and on layout changes. |
| onLongPress | `({nativeEvent: PressEvent}) => void` | | | Called on long press. |
| onMoveShouldSetResponder | `({nativeEvent: PressEvent}) => boolean` | | | Does this view want to "claim" touch responsiveness? |
| onPress | `({nativeEvent: PressEvent}) => void` | | | Called on user press, triggered after `onPressOut`. |
| onPressIn | `({nativeEvent: PressEvent}) => void` | | | Called immediately when a touch is engaged, before `onPressOut` and `onPress`. |
| onPressOut | `({nativeEvent: PressEvent}) => void` | | | Called when a touch is released. |
| onResponderGrant | `({nativeEvent: PressEvent}) => void or boolean` | | | The View is now responding to touch events. On Android, return true to prevent other native components from becoming responder until this responder terminates. |
| onResponderMove | `({nativeEvent: PressEvent}) => void` | | | The user is moving their finger. |
| onResponderRelease | `({nativeEvent: PressEvent}) => void` | | | Fired at the end of the touch. |
| onResponderTerminate | `({nativeEvent: PressEvent}) => void` | | | The responder has been taken from the `View`. |
| onResponderTerminationRequest | `({nativeEvent: PressEvent}) => boolean` | | | Some other `View` wants to become a responder; returning `true` allows its release. |
| onStartShouldSetResponderCapture | `({nativeEvent: PressEvent}) => boolean` | | | A parent `View` can prevent a child from becoming a responder on a touch start by returning `true`. |
| onTextLayout | `(TextLayoutEvent) => mixed` | | | Invoked on Text layout change. |
| pressRetentionOffset | Rect, number | | | When the scroll view is disabled, how far your touch may move off of the button before deactivating it. Pass in a constant to reduce memory allocations. |
| ref | ref setter | | | A ref setter that will be assigned an element node when mounted. |
| role | Role | | | Purpose of a component to assistive technology. Has precedence over `accessibilityRole`. |
| selectable | boolean | `false` | | Lets the user select text, to use the native copy and paste functionality. |
| selectionColor | color | | Android | The highlight color of the text. |
| style | Text Style, View Style Props | | | Text style. |
| suppressHighlighting | boolean | `false` | iOS | When `true`, no visual change is made when text is pressed down. By default, a gray oval highlights the text on press down. |
| testID | string | | | Used to locate this view in end-to-end tests. |
| textBreakStrategy | enum(`'simple'`, `'highQuality'`, `'balanced'`) | `highQuality` | Android | Text break strategy on Android API Level 23+. |
| lineBreakStrategyIOS | enum(`'none'`, `'standard'`, `'hangul-word'`, `'push-out'`) | `'none'` | iOS | Line break strategy on iOS 14+. |

### Type Definitions

#### TextLayout

Part of `TextLayoutEvent`; contains the measurement data for a `Text` line.

```js
{
    capHeight: 10.496,
    ascender: 14.624,
    descender: 4,
    width: 28.224,
    height: 18.624,
    xHeight: 6.048,
    x: 0,
    y: 0
}
```

| Name | Type | Optional | Description |
| --- | --- | --- | --- |
| ascender | number | No | The line ascender height after the text layout changes. |
| capHeight | number | No | Height of capital letter above the baseline. |
| descender | number | No | The line descender height after the text layout changes. |
| height | number | No | Height of the line after the text layout changes. |
| width | number | No | Width of the line after the text layout changes. |
| x | number | No | Line X coordinate inside the Text component. |
| xHeight | number | No | Distance between the baseline and median of the line (corpus size). |
| y | number | No | Line Y coordinate inside the Text component. |

#### TextLayoutEvent

Returned in the callback as a result of a component layout change. Contains `lines`, an array of `TextLayout` objects for every rendered text line.

```js
{
  lines: [
    TextLayout,
    TextLayout,
    // ...
  ];
  target: 1127;
}
```

| Name | Type | Optional | Description |
| --- | --- | --- | --- |
| lines | array of TextLayout | No | Provides the TextLayout data for every rendered line. |
| target | number | No | The node id of the element. |

## Notes

- On Android, when `numberOfLines` is set to a value higher than `1`, only the `tail` value of `ellipsizeMode` will work correctly.
- `Text` components don't provide text nodes, the same way paragraph elements (`<p>`) on Web are element nodes instead of text nodes. Text nodes can be found as their child nodes instead.
- 0.88: `fontVariationSettings` is now supported on both `<Text>` and `<TextInput>`, on Android and iOS, in both CSS string form and object form (see the Text Style Props page) ([0.88 release blog](https://reactnative.dev/blog/2026/10/19/react-native-0.88)).
- This is the React Native core `Text` (imported from `react-native`, rendered as a native view). It is distinct from same-named parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [View](./view.md)
- [TextInput](./textinput.md)
- [Text Style Props](../props-types/text-style-props.md)
- [PressEvent](../props-types/pressevent.md)
- [Text Nodes](../props-types/text-nodes.md)
