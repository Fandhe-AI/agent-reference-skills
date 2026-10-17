---
source: https://reactnative.dev/docs/0.87/document-nodes
---

# Document nodes

Document nodes represent a complete native view tree. Apps using native navigation would provide a separate document node for each screen. Apps not using native navigation would generally provide a single document for the whole app (similar to single-page apps on Web).

## Signature / Usage

```js
import {useEffect, useRef} from 'react';
import {Text, TextInput, View} from 'react-native';

function MyComponent(props) {
  return (
    <View ref={props.ref}>
      <Text>Start typing below</Text>
      <TextInput id="main-text-input" />
    </View>
  )
}

export default function AccessingDocument() {
  const ref = useRef(null);

  useEffect(() => {
    // Get the main text input in the screen and focus it after initial load.
    const element = ref.current;
    const doc = element.ownerDocument;
    const textInput = doc.getElementById('main-text-input');
    textInput?.focus();
  }, []);

  return (
    <MyComponent ref={ref} />
  );
}
```

## Options / Props

Web-compatible API.

From `Document`:

| Name | Kind |
| --- | --- |
| `childElementCount` | property |
| `children` | property |
| `documentElement` | property |
| `firstElementChild` | property |
| `lastElementChild` | property |
| `getElementById()` | method |

From `Node`:

| Name | Kind |
| --- | --- |
| `childNodes` | property |
| `firstChild` | property |
| `isConnected` | property |
| `lastChild` | property |
| `nextSibling` | property |
| `nodeName` | property |
| `nodeType` | property |
| `nodeValue` | property |
| `ownerDocument` | property |
| `parentElement` | property |
| `parentNode` | property |
| `previousSibling` | property |
| `textContent` | property |
| `compareDocumentPosition()` | method |
| `contains()` | method |
| `getRootNode()` | method |
| `hasChildNodes()` | method |

## Notes

- Document nodes can only be accessed through other nodes, using properties like `ownerDocument`.
- Node objects here are React Native's DOM-like refs, not react-dom `document`.

## Related

- [Nodes from refs](./nodes.md)
- [Element nodes](./element-nodes.md)
- [Text nodes](./text-nodes.md)
