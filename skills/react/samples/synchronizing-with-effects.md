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
- In development React remounts every component once right after its initial mount, so without the cleanup `"✅ Connecting..."` is logged twice. That surfaces the missing disconnect.
- React calls the cleanup function before the Effect runs again and one final time when the component unmounts.
