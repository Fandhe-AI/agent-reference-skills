---
source: https://r3f.docs.pmnd.rs/tutorials/events-and-interaction
---

# Events and Interaction

Attach pointer handlers to a mesh and scale it on click.

```jsx
<mesh
  onClick={(e) => console.log('click')}
  onContextMenu={(e) => console.log('context menu')}
  onDoubleClick={(e) => console.log('double click')}
  onWheel={(e) => console.log('wheel spins')}
  onPointerUp={(e) => console.log('up')}
  onPointerDown={(e) => console.log('down')}
  onPointerOver={(e) => console.log('over')}
  onPointerOut={(e) => console.log('out')}
  onPointerEnter={(e) => console.log('enter')}
  onPointerLeave={(e) => console.log('leave')}
  onPointerMove={(e) => console.log('move')}
  onPointerMissed={() => console.log('missed')}
  onUpdate={(self) => console.log('props have been updated')}
/>
```

```jsx
const [active, setActive] = useState(false)
```

```jsx
<mesh scale={active ? 1.5 : 1} onClick={() => setActive(!active)}>
  <boxGeometry />
  <meshPhongMaterial color="royalblue" />
</mesh>
```

## Notes

- Any Object3D that has a `raycast` method can receive these events.
- Handlers use the same names as DOM events (`onClick`, `onPointerOver`, ...); `onUpdate` fires after props have been applied.
- Exercise from the tutorial: use `onPointerOver` / `onPointerOut` to change props on hover.
