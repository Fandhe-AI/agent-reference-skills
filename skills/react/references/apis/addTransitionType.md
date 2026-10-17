---
source: https://react.dev/reference/react/addTransitionType
---

# addTransitionType

`addTransitionType` lets you specify the cause of a transition.

## Signature / Usage

```js
import { startTransition, addTransitionType } from 'react';

function Submit({action}) {
  function handleClick() {
    startTransition(() => {
      addTransitionType('submit-click');
      action();
    });
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

Returns: `addTransitionType` does not return anything.

Customize animations based on type, using a View Transition Class:

```js
<ViewTransition enter={{
  'navigation-back': 'enter-right',
  'navigation-forward': 'enter-left',
}}
exit={{
  'navigation-back': 'exit-right',
  'navigation-forward': 'exit-left',
}}>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `type` | string | The type of transition to add. This can be any string. |

## Notes

- If multiple transitions are combined, all Transition Types are collected. You can also add more than one type to a Transition.
- Transition Types are reset after each commit. This means a `<Suspense>` fallback will associate the types after a `startTransition`, but revealing the content does not.
- Three ways to use Transition Types: browser view transition types (React adds all Transition Types as browser view transition types to the element, scoped in CSS with `:root:active-view-transition-type(my-transition-type)`), the View Transition Class (pass an object to `enter` / `exit` / `update` / `layout` / `share`), and `ViewTransition` events such as `onUpdate={(inst, types) => ...}`.
- With the View Transition Class object: if multiple types match, then they're joined together. If no types match then the special "default" entry is used instead. If any type has the value "none" then that wins and the ViewTransition is disabled (not assigned a name).
- Code snippet: fixed a typo in the source (`{action)` → `{action}`).
- In the future, more use cases for using the cause of a transition are planned.
- This page is the React built-in API. The 19.3 release post (react-19-3) announces View Transitions as stable in 19.3.
- Distinct from the motion skill's animation APIs (AnimateView / layout animation); this is React's built-in `<ViewTransition>` mechanism.

## Related

- [startTransition](./startTransition.md)
- [ViewTransition](../components/ViewTransition.md)
- React 19.3
