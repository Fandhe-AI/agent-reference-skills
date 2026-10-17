---
source: https://reactnative.dev/docs/0.87/text-nodes
---

# Text nodes

Text nodes represent raw text content on the tree (similar to Text nodes on Web). They are not directly accessible via `refs`, but can be accessed using methods like `childNodes` on element refs.

## Signature / Usage

```js
import {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const TextWithRefs = () => {
  const ref = useRef(null);
  const [viewInfo, setViewInfo] = useState('');

  useEffect(() => {
    // `textElement` is an object implementing the interface described here.
    const textElement = ref.current;
    const textNode = textElement.childNodes[0];
    setViewInfo(
      `Text content is: ${textNode.nodeValue}`,
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text ref={ref}>
        Hello world!
      </Text>
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

export default TextWithRefs;
```

## Options / Props

Web-compatible API.

From `CharacterData`:

| Name | Kind |
| --- | --- |
| `data` | property |
| `length` | property |
| `nextElementSibling` | property |
| `previousElementSibling` | property |
| `substringData()` | method |

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

## Notes

- Text nodes are not provided via refs directly; reach them through `childNodes` of an element ref.
- The official example imports `SafeAreaView` from `react-native`, which is deprecated (warns on access); in new code use `SafeAreaView` from react-native-safe-area-context (as in the View/Image Style Props examples).
- Node objects here are React Native's DOM-like refs, not react-dom DOM nodes.

## Related

- [Nodes from refs](./nodes.md)
- [Element nodes](./element-nodes.md)
- [Document nodes](./document-nodes.md)
