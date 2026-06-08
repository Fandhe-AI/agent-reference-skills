# React Three Fiber Integration

Animate R3F scene objects with @theatre/r3f's editable wrapper and SheetProvider.

```typescript
import { createRoot } from 'react-dom/client'
import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SheetProvider, editable as e, PerspectiveCamera } from '@theatre/r3f'
import { getProject } from '@theatre/core'
import demoProjectState from './state.json'

// Initialize Studio with the R3F extension
studio.initialize()
studio.extend(extension)

// Create project with saved state
const sheet = getProject('Demo Project', { state: demoProjectState }).sheet('Demo Sheet')

const App = () => {
  useEffect(() => {
    sheet.project.ready.then(() =>
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 1] })
    )
  }, [])

  return (
    <Canvas>
      <SheetProvider sheet={sheet}>
        {/* Camera controlled by Theatre.js */}
        <PerspectiveCamera theatreKey="Camera" makeDefault position={[5, 5, -5]} fov={75} />

        <ambientLight />

        {/* Wrap R3F primitives with editable() */}
        <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
        <e.mesh theatreKey="Cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </e.mesh>
      </SheetProvider>
    </Canvas>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
```

## Notes

- `studio.extend(extension)` adds the R3F viewport overlay to Studio for in-scene editing
- The `editable as e` prefix wraps any R3F primitive (e.g., `e.mesh`, `e.pointLight`) to make it animatable
- `theatreKey` is required and must be unique within the sheet; it links the R3F element to its Theatre.js object
- `SheetProvider` scopes all `editable` children to the given sheet
- Export animation from Studio to `state.json`, then pass it to `getProject` for production builds
