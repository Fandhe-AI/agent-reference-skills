---
source: https://react.dev/reference/react/ViewTransition
---

# `<ViewTransition>`

`<ViewTransition>` lets you animate a component tree with Transitions and Suspense.

## Signature / Usage

```js
import {ViewTransition} from 'react';

<ViewTransition>
  <div>...</div>
</ViewTransition>
```

```js
<ViewTransition
  default="none"
  enter="slide-up"
  exit="slide-down"
/>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| name | string or object (optional) | Name of the View Transition used for shared element transitions. If not provided, React uses a unique name for each View Transition to prevent unexpected animations. |
| enter | `"auto"`, `"none"`, string, or object (optional) | View Transition Class for the enter trigger. |
| exit | `"auto"`, `"none"`, string, or object (optional) | View Transition Class for the exit trigger. |
| update | `"auto"`, `"none"`, string, or object (optional) | View Transition Class for the update trigger. |
| share | `"auto"`, `"none"`, string, or object (optional) | View Transition Class for the share trigger. |
| default | `"auto"`, `"none"`, string, or object (optional) | Fallback class. If `"none"`, all other triggers are turned off unless explicitly listed. |
| onEnter | function (optional) | Called when an "enter" animation is triggered. |
| onExit | function (optional) | Called when an "exit" animation is triggered. |
| onShare | function (optional) | Called when a "share" animation is triggered. |
| onUpdate | function (optional) | Called when an "update" animation is triggered. |

### Animation triggers

- `enter`: a `ViewTransition` is the first component inserted in this Transition.
- `exit`: a `ViewTransition` is the first component deleted in this Transition.
- `update`: a `ViewTransition` has DOM mutations inside it that React is doing, or the boundary itself changes size or position due to an immediate sibling. With nested `ViewTransition`, the mutation applies to them and not the parent.
- `share`: a named `ViewTransition` inside a deleted subtree and another with the same name in an inserted subtree in the same Transition form a Shared Element Transition.

By default `<ViewTransition>` animates with the browser default cross-fade.

### View Transition Class values

- `auto`: the default; uses the browser default animation.
- `none`: disable animations for this type.
- `<classname>`: a custom CSS class name React applies when the ViewTransition activates.
- Object values: `{[type]: value}` applies `value` if the animation matches the Transition Type (see `addTransitionType`); `{default: value}` applies if no Transition Type matches.

```js
<ViewTransition
  /* turn off any animation not defined below */
  default="none"
  enter={{
    /* apply slide-in for Transition Type `forward` */
    "forward": 'slide-in',
    /* otherwise use the browser default animation */
    "default": 'auto'
  }}
  /* use the browser default for exit animations*/
  exit="auto"
  /* apply a custom `cross-fade` class for updates */
  update="cross-fade"
>
```

```css
::view-transition-group(.slide-in) {
}
::view-transition-old(.slide-in) {
}
::view-transition-new(.slide-in) {
}
```

### View Transition Event arguments

Each event receives `(instance, types)`:

- `instance`: `old` (`::view-transition-old`), `new` (`::view-transition-new`), `name` (the `view-transition-name` string), `group` (`::view-transition-group`), `imagePair` (`::view-transition-image-pair`).
- `types`: an `Array<string>` of Transition Types included in the animation; empty if none specified.

```js
<ViewTransition
  onEnter={(instance, types) => {
    const anim = instance.new.animate([{opacity: 0}, {opacity: 1}], {
      duration: 500,
    });
    return () => anim.cancel();
  }}>
  <div>...</div>
</ViewTransition>
```

## Notes

- Only use `name` for shared element transitions. For all other animations React generates a unique name.
- By default `setState` updates immediately and does not activate `<ViewTransition>`; only updates wrapped in a Transition (`useTransition` / `startTransition`), `<Suspense>`, or `useDeferredValue` activate it.
- `<ViewTransition>` creates an image that can be moved, scaled and cross-faded; unlike Layout Animations (React Native or Motion), not every element inside animates its position. You may need to add more `<ViewTransition>` boundaries manually.
- Currently `<ViewTransition>` only works in the DOM.
- Only one event fires per `<ViewTransition>` per Transition; `onShare` takes precedence over `onEnter` and `onExit`. Each event should return a cleanup function, called when the View Transition finishes.
- `<ViewTransition>` only activates if it is placed before any DOM node (a `<ViewTransition>` nested inside a `<div>` in the same component does not activate).
- Two `<ViewTransition>` with the same `name` mounted at the same time is an error ("There are two `<ViewTransition name=%s>` components with the same name mounted at the same time."); make `name` unique, e.g. add an item id.
- React calls `startViewTransition` itself; you should never do that yourself, and React interrupts other running ViewTransitions on the page. If a `flushSync` happens in the middle of the sequence, React skips the Transition.
- `useEffect` is invoked after the finished Promise of `startViewTransition` resolves; `useInsertionEffect`, `useLayoutEffect`, refs and lifecycle methods run inside the update callback.
- Always check `prefers-reduced-motion`: React does not automatically disable animations; use the `@media (prefers-reduced-motion)` media query.
- Prefer a View Transition Class over `view-transition-name` plus `::view-transition-...(my-name)` selectors for styling.
- An `<Activity>` inside a ViewTransition that becomes visible/hidden via `startTransition` activates `enter` / `exit`.
- Building routers: React waits for any pending Navigation; if blocked on React, unblock in `useLayoutEffect` (not `useEffect`). Animations from legacy popstate (back navigation) are skipped; upgrade the router to the Navigation API.
- The React 19.3 release blog lists View Transitions as a new feature.
- Distinct from Motion (motion skill) layout animations / `AnimateView`; this is the React built-in component built on the browser View Transition API.

## Related

- [Suspense](./Suspense.md)
- [Activity](./Activity.md)
- [overview](./overview.md)
