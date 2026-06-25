# SCNScene

A container for the node hierarchy and global properties that together form a displayable 3D scene.

## Signature / Usage

```swift
// Load from a bundled file
let scene = SCNScene(named: "art.scnassets/scene.scn")!
scnView.scene = scene

// Load from URL with options
let scene = try SCNScene(url: url, options: nil)

// Create empty scene
let scene = SCNScene()
scene.rootNode.addChildNode(myNode)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `rootNode` | `SCNNode` | Root of the scene graph; defines world coordinate space |
| `background` | `SCNMaterialProperty` | Background rendered before the rest of the scene |
| `lightingEnvironment` | `SCNMaterialProperty` | Cube map for image-based lighting |
| `physicsWorld` | `SCNPhysicsWorld` | Physics simulation for the scene |
| `isPaused` | `Bool` | Suspends actions, animations, particles, and physics |
| `fogStartDistance` | `CGFloat` | Distance at which fog begins (animatable) |
| `fogEndDistance` | `CGFloat` | Distance at which scene is fully obscured by fog (animatable) |
| `fogDensityExponent` | `CGFloat` | Fog intensity transition curve (animatable) |
| `fogColor` | `Any` | Color of the fog effect (animatable) |

## Notes

- Available on iOS 8.0+, macOS 10.8+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+. Deprecated in version 26.0.
- Place `.scn` files inside a `.scnassets` folder for build-time optimization.
- Export scenes with `write(to:options:delegate:progressHandler:)`.
- Conforms to `NSCoding`, `NSSecureCoding`.

## Related

- [SCNNode](./scnnode.md)
- [SCNView](./scnview.md)
- [SCNPhysicsWorld](./scnphysicsworld.md)
- [SCNSceneSource](./scnscenesource.md)
