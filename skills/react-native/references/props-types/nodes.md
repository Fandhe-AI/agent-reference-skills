---
source: https://reactnative.dev/docs/0.87/nodes
---

# Nodes from refs

React Native apps render a native view tree that represents the UI, similar to how React DOM does on Web (the DOM tree). React Native provides imperative access to this tree via refs, which are returned by all native components (including those rendered by built-in components like `View`).

## Signature / Usage

The three node types, verbatim from the page:

```text
- Elements: element nodes represent native components in the native view tree (similar to Element nodes on Web). They are provided by all native components via refs.
- Text: text nodes represent raw text content on the tree (similar to Text nodes on Web). They are not directly accessible via refs, but can be accessed using methods like childNodes on element refs.
- Documents: document nodes represent a complete native view tree (similar to Document nodes on Web). Like text nodes, they can only be accessed through other nodes, using properties like ownerDocument.
```

## Notes

- As on Web, these nodes can be used to traverse the rendered UI tree, access layout information or execute imperative operations like `focus`.
- Unlike on Web, these nodes do not allow mutation (e.g. `node.appendChild`), as the tree contents are fully managed by the React renderer.
- Refs here are React refs on React Native native components (imported from `react-native`), returning RN node objects rather than react-dom DOM elements.

## Related

- [Element nodes](./element-nodes.md)
- [Text nodes](./text-nodes.md)
- [Document nodes](./document-nodes.md)
