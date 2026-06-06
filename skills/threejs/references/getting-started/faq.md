# FAQ

Frequently asked questions about three.js.

## Which 3D model format is best supported?

**glTF** (GL Transmission Format, `.gltf` or `.glb`) is recommended. It is optimized for runtime delivery—compact, fast, and covers meshes, materials, textures, skins, animations, lights, and cameras. three.js also provides loaders for FBX, COLLADA, OBJ, and others, but establish a glTF workflow first.

## Why are there meta viewport tags in examples?

```html
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
```

Mobile browsers may render content at a different size than the visible viewport. This tag ensures consistent size and prevents user scaling.

## How can scene scale be preserved on window resize?

To keep objects the same apparent size regardless of distance when the window is resized, adjust the camera's **field of view** rather than its position:

```js
// Visible height at a given distance
const visible_height = 2 * Math.tan((Math.PI / 180) * camera.fov / 2) * distance_from_camera;
```

If the window height increases by X%, increase `camera.fov` so that `visible_height` increases by X% as well.

## Why is part of my object invisible?

Likely **face culling**. Faces have a front/back orientation and the backside is culled by default. Debug by setting:

```js
material.side = THREE.DoubleSide;
```

## Why does three.js return strange results for invalid inputs?

For performance, three.js skips input validation in most cases. Your application is responsible for providing valid inputs.

## Can I use three.js in Node.js?

three.js depends on browser and DOM APIs. Node.js support is partial; shims like [headless-gl](https://github.com/stackgl/headless-gl) and [jsdom-global](https://github.com/rstacruz/jsdom-global) can help. Simple pull requests improving Node.js support are welcome—open an issue first to discuss.

## Related

- [Loading 3D Models](./loading-3d-models.md)
- [WebGL Compatibility Check](./webgl-compatibility-check.md)
- [Useful Links](./useful-links.md)
