# Object3D

Base class for most Three.js scene objects. Provides position, rotation, scale, hierarchy management, traversal, and raycasting hooks. Extends `EventDispatcher`.

## Signature / Usage

```js
const obj = new THREE.Object3D();
obj.position.set(1, 2, 3);
obj.rotation.y = Math.PI / 4;
obj.scale.set(2, 2, 2);
scene.add(obj);

// Hierarchy
const child = new THREE.Object3D();
obj.add(child);

// Traverse all descendants
obj.traverse((node) => console.log(node.name));
```

## Constructor

```js
new Object3D()
```

## Options / Props

### Transform

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `position` | Vector3 | `(0,0,0)` | Local position |
| `rotation` | Euler | `(0,0,0)` | Local rotation in radians |
| `quaternion` | Quaternion | — | Local rotation as quaternion (synced with `rotation`) |
| `scale` | Vector3 | `(1,1,1)` | Local scale |
| `up` | Vector3 | `(0,1,0)` | Up direction for `lookAt()` |
| `pivot` | Vector3 \| null | `null` | Pivot point for rotation/scale |

### Matrices

| Name | Type | Description |
|------|------|-------------|
| `matrix` | Matrix4 | Local transform matrix |
| `matrixWorld` | Matrix4 | World transform matrix |
| `modelViewMatrix` | Matrix4 | Model-view matrix (set by renderer) |
| `normalMatrix` | Matrix3 | Normal matrix (set by renderer) |
| `matrixAutoUpdate` | boolean | Auto-recompute local matrix. Default: `true` |
| `matrixWorldAutoUpdate` | boolean | Auto-recompute world matrix. Default: `true` |
| `matrixWorldNeedsUpdate` | boolean | Force world matrix update next frame |

### Hierarchy

| Name | Type | Description |
|------|------|-------------|
| `parent` | Object3D \| null | Parent in the scene graph |
| `children` | Object3D[] | Array of child objects |

### Rendering

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | boolean | `true` | Render this object |
| `castShadow` | boolean | `false` | Contribute to shadow maps |
| `receiveShadow` | boolean | `false` | Receive shadows |
| `renderOrder` | number | `0` | Override draw order |
| `frustumCulled` | boolean | `true` | Skip if outside view frustum |
| `layers` | Layers | layer 0 | Layer membership |
| `static` | boolean | `false` | Mark as static for optimization (WebGPURenderer) |

### Metadata

| Name | Type | Description |
|------|------|-------------|
| `id` | number (readonly) | Unique numeric ID |
| `uuid` | string (readonly) | UUID |
| `name` | string | Human-readable name |
| `type` | string (readonly) | Type string for serialization |
| `isObject3D` | boolean (readonly) | Type flag |
| `animations` | AnimationClip[] | Attached animation clips |
| `userData` | Object | Custom data storage |

### Static Defaults

| Name | Type | Default |
|------|------|---------|
| `Object3D.DEFAULT_UP` | Vector3 | `(0,1,0)` |
| `Object3D.DEFAULT_MATRIX_AUTO_UPDATE` | boolean | `true` |
| `Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE` | boolean | `true` |

## Methods

### Hierarchy

```js
add(...objects)          // Add child(ren)
remove(...objects)       // Remove child(ren)
attach(object)           // Attach while preserving world transform
removeFromParent()       // Remove self from parent
clear()                  // Remove all children
```

### Position / Rotation / Scale

```js
lookAt(x, y, z)                       // or lookAt(vector3)
translateX/Y/Z(distance)
translateOnAxis(axis, distance)
rotateX/Y/Z(angle)
rotateOnAxis(axis, angle)             // local axis
rotateOnWorldAxis(axis, angle)
setRotationFromEuler(euler)
setRotationFromQuaternion(q)
setRotationFromAxisAngle(axis, angle)
setRotationFromMatrix(m)
applyMatrix4(matrix)
applyQuaternion(q)
```

### World Space

```js
getWorldPosition(target: Vector3): Vector3
getWorldQuaternion(target: Quaternion): Quaternion
getWorldScale(target: Vector3): Vector3
getWorldDirection(target: Vector3): Vector3
localToWorld(vector: Vector3): Vector3
worldToLocal(vector: Vector3): Vector3
```

### Matrix Updates

```js
updateMatrix()
updateMatrixWorld(force?)
updateWorldMatrix(updateParents, updateChildren)
```

### Search

```js
getObjectById(id): Object3D | undefined
getObjectByName(name): Object3D | undefined
getObjectByProperty(property, value): Object3D | undefined
getObjectsByProperty(property, value, result?): Object3D[]
```

### Traversal

```js
traverse(callback)         // All descendants
traverseVisible(callback)  // Visible descendants only
traverseAncestors(callback)
```

### Clone / Copy / Serialize

```js
clone(recursive?: boolean): Object3D
copy(source, recursive?: boolean): this
toJSON(meta?): Object
```

### Render Callbacks

```js
onBeforeRender(renderer, scene, camera, geometry, material, group)
onAfterRender(renderer, scene, camera, geometry, material, group)
onBeforeShadow(renderer, scene, camera, shadowCamera, geometry, depthMaterial, group)
onAfterShadow(renderer, scene, camera, shadowCamera, geometry, depthMaterial, group)
```

## Events

| Event | Fires when |
|-------|-----------|
| `added` | Object is added to a parent |
| `removed` | Object is removed from parent |
| `childadded` | A child is added |
| `childremoved` | A child is removed |

## Notes

- `rotation` and `quaternion` are kept in sync automatically.
- Use `Object3D.rotation`/`position`/`scale` for real-time transforms instead of `BufferGeometry.rotateX` etc., which bake transforms into vertex data.
- Setting `matrixAutoUpdate = false` and calling `updateMatrix()` manually improves performance for static objects.

## Related

- [EventDispatcher](./EventDispatcher.md)
- [Layers](./Layers.md)
- [Raycaster](./Raycaster.md)
