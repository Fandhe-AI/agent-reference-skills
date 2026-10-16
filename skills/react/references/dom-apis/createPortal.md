---
source: https://react.dev/reference/react-dom/createPortal
---

# createPortal

`createPortal` lets you render some children into a different part of the DOM.

## Signature / Usage

```js
import { createPortal } from 'react-dom';

// ...

<div>
  <p>This child is placed in the parent div.</p>
  {createPortal(
    <p>This child is placed in the document body.</p>,
    document.body
  )}
</div>
```

`createPortal(children, domNode, key?)`. Returns a React node that can be included into JSX or returned from a React component. If React encounters it in the render output, it will place the provided `children` inside the provided `domNode`.

Rendering a modal dialog with a portal:

```js
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent.js';

export default function PortalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `children` | React node | Anything that can be rendered with React, such as a piece of JSX (e.g. `<div />` or `<SomeComponent />`), a Fragment (`<>...</>`), a string or a number, or an array of these. |
| `domNode` | DOM node | Some DOM node, such as those returned by `document.getElementById()`. The node must already exist. Passing a different DOM node during an update will cause the portal content to be recreated. |
| `key` (optional) | string or number | A unique string or number to be used as the portal's key. |

## Notes

- A portal only changes the physical placement of the DOM node. In every other way, the JSX you render into a portal acts as a child node of the React component that renders it. For example, the child can access the context provided by the parent tree, and events bubble up from children to parents according to the React tree.
- Events from portals propagate according to the React tree rather than the DOM tree. If you click inside a portal wrapped in `<div onClick>`, that `onClick` handler will fire. If this causes issues, either stop the event propagation from inside the portal, or move the portal itself up in the React tree.
- Make sure your app is accessible when using portals. For instance, you may need to manage keyboard focus so that the user can move the focus in and out of the portal in a natural way. Follow the WAI-ARIA Modal Authoring Practices when creating modals.
- Portals are useful if your React root is only part of a static or server-rendered page that isn't built with React, and for managing the content of a DOM node that is managed outside of React (e.g. a map widget popup).
- To render a piece of JSX in a different part of the DOM tree that isn't a child of your component, use `createPortal` instead of a new `createRoot`.
- This is React's built-in `react-dom` API; distinct from the `Portal` components of the ark-ui, chakra-ui and fandhe-frontend skills.

## Related

- [createRoot](./createRoot.md)
- [React DOM APIs](./overview.md)
