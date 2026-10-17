---
source: https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed
---

# Synchronizing with Effects

Connect to an external system in `useEffect` and return a cleanup function that disconnects.

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>Welcome to the chat!</h1>;
}
```

`src/chat.js`:

```js
export function createConnection() {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting...');
    },
    disconnect() {
      console.log('❌ Disconnected.');
    }
  };
}
```

## Notes

- An empty dependency array `[]` runs the Effect only on mount; omitting the array re-runs it after every render.
- In development with Strict Mode on, React remounts each component once right after its initial mount (state and DOM are preserved), running an extra setup → cleanup → setup of the Effect. Without the cleanup, `"✅ Connecting..."` is logged twice, which surfaces the missing disconnect. This does not happen in production or with Strict Mode off.
- React calls the cleanup function before the Effect runs again and one final time when the component unmounts.
