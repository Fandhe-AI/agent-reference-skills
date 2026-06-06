# Group

A container object that groups multiple 3D objects so they can be transformed as a single unit. Functionally identical to Object3D; its purpose is purely organizational.

Inherits from: EventDispatcher → Object3D → Group

## Signature / Usage

```js
const group = new THREE.Group();
group.add(mesh1, mesh2);
group.position.set(0, 5, 0);
group.rotation.y = Math.PI / 4;
scene.add(group);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isGroup` | boolean (readonly) | Always `true`; used for type testing |
| `type` | string (readonly) | Always `'Group'` |

All other properties and methods are inherited from Object3D.

## Notes

- Group itself renders nothing; only its children are rendered.
- Transformations on the group propagate to all children.
- Groups can be nested to create complex hierarchies.
- Use `group.add(object)` and `group.remove(object)` to manage children.

## Related

- [ClippingGroup.md](./ClippingGroup.md)
