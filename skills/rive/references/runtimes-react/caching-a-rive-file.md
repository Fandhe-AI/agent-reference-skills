# Caching a Rive File

Loads a `.riv` file once via `useRiveFile` and reuses it across multiple `useRive` component instances, avoiding redundant fetches.

## Signature / Usage

```tsx
import React, { useState } from 'react';
import { useRiveFile, useRive } from '@rive-app/react-canvas';

// Custom wrapper component to display the Rive animation
const RiveAnimation = ({ riveFile }) => {
  const { RiveComponent } = useRive({
    riveFile: riveFile,
    autoplay: true,
  });

  return <RiveComponent />;
};

function App() {
  const { riveFile, status } = useRiveFile({
    src: 'https://cdn.rive.app/animations/myrivefile.riv',
  });

  const [instanceCount] = useState(5); // Number of RiveAnimation components to render

  if (status === 'idle') {
    return <div>Idle...</div>;
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load Rive file.</div>;
  }

  // Each RiveAnimation component uses the RiveFile loaded above, so it is only fetched and initialized once
  return (
    <div className="App">
      <header className="App-header">Rive Instances</header>
      <div className="rive-list">
        {Array.from({ length: instanceCount }, (_, index) => (
          <RiveAnimation key={`rive-instance-${index}`} riveFile={riveFile} />
        ))}
      </div>
    </div>
  );
}

export default App;
```

## Notes

- Caching is useful when reusing the same `.riv` file in multiple parts of an application, or multiple times on the same screen.
- `.riv` files typically load quickly without manual caching; `useRiveFile` is an optimization for repeated use, not a requirement.
- Working examples: [web](https://codesandbox.io/p/sandbox/rive-js-caching-a-rive-file-g675my), [React](https://codesandbox.io/p/sandbox/rive-react-caching-a-rive-file-53gmdf).

## Related

- [useRive](./use-rive.md)
- [Best Practices](./best-practices.md)
