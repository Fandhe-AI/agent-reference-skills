---
source: https://react.dev/learn/state-a-components-memory#giving-a-component-multiple-state-variables
---

# State and Events

Add state with `useState` and update it from event handlers so the component re-renders with new data.

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    </>
  );
}
```

## Notes

- `useState` returns exactly two items: the state variable and its setter. Local variables neither persist between renders nor trigger a re-render, which is why `let index = 0` does not work.
- Hooks can only be called at the top level of a component or of a custom Hook, not inside conditions, loops, or nested functions.
- `./data.js` (`src/data.js` in the source) exports a `sculptureList` array of `{ name, artist, description, url, alt }` objects; see the source page for its content.
- Unrelated state belongs in separate state variables; for related fields, see "Choosing the State Structure" on react.dev.
