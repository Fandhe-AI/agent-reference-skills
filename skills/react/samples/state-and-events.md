---
source: https://react.dev/learn/state-a-components-memory#complete-the-gallery
---

# State and Events

Add state with `useState` and update it from event handlers so the component re-renders with new data.

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let hasPrev = index > 0;
  let hasNext = index < sculptureList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button
        onClick={handlePrevClick}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        onClick={handleNextClick}
        disabled={!hasNext}
      >
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
- Guard `index` with `hasPrev` / `hasNext` in both the handlers and the `disabled` props; otherwise clicking past the last item makes `sculptureList[index]` undefined and rendering throws.
- Hooks can only be called at the top level of a component or of a custom Hook, not inside conditions, loops, or nested functions.
- `./data.js` (`src/data.js` in the source) exports a `sculptureList` array of `{ name, artist, description, url, alt }` objects; see the source page for its content.
