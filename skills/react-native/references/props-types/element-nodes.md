---
source: https://reactnative.dev/docs/0.87/element-nodes
---

# Element nodes

Element nodes represent native components in the native view tree (similar to Element nodes on Web). They are provided by all native components, and by many built-in components, via refs.

## Signature / Usage

```js
import {useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';

const ViewWithRefs = () => {
  const ref = useRef(null);
  const [viewInfo, setViewInfo] = useState('');

  useEffect(() => {
    // `element` is an object implementing the interface described here.
    const element = ref.current;
    const rect = JSON.stringify(element.getBoundingClientRect());
    setViewInfo(
      `Bounding rect is: ${rect}.\nText content is: ${element.textContent}`,
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View ref={ref} style={styles.content}>
        <Text>Hello world!</Text>
      </View>
      <Text>{viewInfo}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
    backgroundColor: 'gray',
  },
});

export default ViewWithRefs;
```

## Options / Props

Web-compatible API (names link to MDN on the source page).

From `HTMLElement`:

| Name | Kind | Notes |
| --- | --- | --- |
| `offsetHeight` | property | |
| `offsetLeft` | property | |
| `offsetParent` | property | |
| `offsetTop` | property | |
| `offsetWidth` | property | |
| `blur()` | method | |
| `focus()` | method | The `options` parameter is not supported. |

From `Element`:

| Name | Kind | Notes |
| --- | --- | --- |
| `childElementCount` | property | |
| `children` | property | |
| `clientHeight` | property | |
| `clientLeft` | property | |
| `clientTop` | property | |
| `clientWidth` | property | |
| `firstElementChild` | property | |
| `id` | property | Returns the value of the `id` or `nativeID` props. |
| `lastElementChild` | property | |
| `nextElementSibling` | property | |
| `nodeName` | property | |
| `nodeType` | property | |
| `nodeValue` | property | |
| `previousElementSibling` | property | |
| `scrollHeight` | property | |
| `scrollLeft` | property | For built-in components, only `ScrollView` instances can return a value other than zero. |
| `scrollTop` | property | For built-in components, only `ScrollView` instances can return a value other than zero. |
| `scrollWidth` | property | |
| `tagName` | property | Returns a normalized native component name prefixed with `RN:`, like `RN:View`. |
| `textContent` | property | |
| `getBoundingClientRect()` | method | |
| `hasPointerCapture()` | method | |
| `setPointerCapture()` | method | |
| `releasePointerCapture()` | method | |

From `Node`:

| Name | Kind | Notes |
| --- | --- | --- |
| `childNodes` | property | |
| `firstChild` | property | |
| `isConnected` | property | |
| `lastChild` | property | |
| `nextSibling` | property | |
| `nodeName` | property | |
| `nodeType` | property | |
| `nodeValue` | property | |
| `ownerDocument` | property | Will return the document node where this component was rendered. |
| `parentElement` | property | |
| `parentNode` | property | |
| `previousSibling` | property | |
| `textContent` | property | |
| `compareDocumentPosition()` | method | |
| `contains()` | method | |
| `getRootNode()` | method | Will return a reference to itself if the component is not mounted. |
| `hasChildNodes()` | method | |

Legacy API: `measure()`, `measureInWindow()`, `measureLayout()`, `setNativeProps()` (documented in the legacy direct manipulation page).

## Notes

- Some built-in components are only a container for other components (including native components). For example, `ScrollView` internally renders a native scroll view and a native view, which are accessible through the ref it provides using methods like `getNativeScrollRef()` and `getInnerViewRef()`.
- The official example imports `SafeAreaView` from `react-native`, which is deprecated (warns on access); in new code use `SafeAreaView` from react-native-safe-area-context (as in the View/Image Style Props examples).
- Node objects here are React Native's DOM-like refs, not react-dom DOM elements.

## Related

- [Nodes from refs](./nodes.md)
- [Text nodes](./text-nodes.md)
- [Document nodes](./document-nodes.md)
