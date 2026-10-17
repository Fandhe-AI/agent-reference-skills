---
source: https://react.dev/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax
---

# Updating Objects and Arrays in State

Treat state as read-only: pass a new object or array to the setter, copying existing data with spread syntax.

Object (from https://react.dev/learn/updating-objects-in-state):

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

Array (from https://react.dev/learn/updating-arrays-in-state#adding-to-an-array):

```js
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

## Notes

- Avoid mutating methods on arrays in state (`push`, `unshift`, `pop`, `shift`, `splice`, `reverse`, `sort`, `arr[i] = ...`); prefer `concat` / `[...arr]`, `filter`, `slice`, `map`, or copy first.
- `slice` copies an array (or part of it); `splice` mutates it.
- Spread copies only one level deep; nested objects need their own copy at each level.
- Immer is mentioned on both source pages as an alternative that allows mutating-style update code.
