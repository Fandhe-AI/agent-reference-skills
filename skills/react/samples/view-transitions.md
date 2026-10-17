---
source: https://react.dev/reference/react/ViewTransition#animating-an-element-on-enter-exit
---

# View Transitions

Animate a component entering and exiting by wrapping it in `<ViewTransition>` and updating state inside `startTransition`.

`src/App.js` (the hidden `Video` component and `data` of the source are omitted, see Notes):

```js
import {ViewTransition, useState, startTransition} from 'react';
import {Video} from './Video';
import videos from './data';

function Item() {
  return (
    <ViewTransition enter="auto" exit="auto" default="none">
      <Video video={videos[0]} />
    </ViewTransition>
  );
}

export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setShowItem((prev) => !prev);
          });
        }}>
        {showItem ? '➖' : '➕'}
      </button>

      {showItem ? <Item /> : null}
    </>
  );
}
```

## Notes

- `<ViewTransition>` became stable in React 19.3 (the 19.3 release post says it was an experimental API before). The source sandbox pins `19.3.0-canary-f1f7ed2a-20260904`.
- Updates must be marked as Transitions (for example `startTransition`) to animate; updates outside a Transition do not trigger animations.
- Enter/exit only activate when `<ViewTransition>` is placed before any DOM node in its subtree; a `<div>` above it breaks exit/enter.
- `./Video` and `./data` are hidden helper files in the source sandbox (`Video` renders a thumbnail with `video.title` and `video.description`; `data` default-exports an array of videos); the page also provides the CSS used by the sample.
- This is React's built-in browser View Transition integration; Motion's animation APIs are covered by the motion skill.
