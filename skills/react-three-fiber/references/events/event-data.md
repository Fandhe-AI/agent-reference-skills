---
source: https://r3f.docs.pmnd.rs/api/events#event-data
---

# Event data

Shape of the object passed to every event handler.

## Signature / Usage

```jsx
({
  ...DomEvent                   // All the original event data
  ...Intersection                 // All of Three's intersection data - see note 2
  intersections: Intersection[]    // The first intersection of each intersected object
  object: Object3D              // The object that was actually hit
  eventObject: Object3D         // The object that registered the event
  unprojectedPoint: Vector3     // Camera-unprojected point
  ray: Ray                      // The ray that was used to strike the object
  camera: Camera                // The camera that was used in the raycaster
  sourceEvent: DomEvent         // A reference to the host event
  delta: number                 // Distance between mouse down and mouse up event in pixels
}) => ...
```

## Notes

- Some events (such as `pointerout`) happen when there is no intersection between `eventObject` and the ray. When this happens, the event will contain intersection data from a previous event with this object.
- `Intersection`, `Object3D`, `Vector3`, `Ray` and `Camera` are three.js types; see the threejs skill.

## Related

- [Event handlers](./event-handlers.md)
- [Event propagation](./event-propagation.md)
