# SKEmitterNode

A node that automatically creates and renders many small particle sprites for visual effects such as fire, smoke, sparks, and rain.

## Signature / Usage

```swift
// Load a .sks particle file created in Xcode's particle editor
if let emitter = SKEmitterNode(fileNamed: "Smoke.sks") {
    emitter.position = CGPoint(x: frame.midX, y: frame.midY)
    addChild(emitter)
}
```

## Options / Props

### Birth & Lifetime

| Name | Type | Description |
|------|------|-------------|
| `particleBirthRate` | `CGFloat` | Particles created per second |
| `particleLifetime` | `CGFloat` | Average particle lifetime in seconds |
| `particleLifetimeRange` | `CGFloat` | Random variance added to `particleLifetime` |
| `numParticlesToEmit` | `Int` | Total particles emitted before stopping (0 = infinite) |

### Position & Motion

| Name | Type | Description |
|------|------|-------------|
| `particlePosition` | `CGPoint` | Average starting position in emitter coordinates |
| `particlePositionRange` | `CGVector` | Random variance in starting position |
| `emissionAngle` | `CGFloat` | Average launch direction in radians |
| `emissionAngleRange` | `CGFloat` | Random variance in launch direction |
| `particleSpeed` | `CGFloat` | Average initial speed in points/second |
| `particleSpeedRange` | `CGFloat` | Random variance in speed |
| `xAcceleration` | `CGFloat` | Horizontal acceleration applied over lifetime |
| `yAcceleration` | `CGFloat` | Vertical acceleration applied over lifetime |

### Appearance

| Name | Type | Description |
|------|------|-------------|
| `particleTexture` | `SKTexture?` | Texture image used for each particle |
| `particleSize` | `CGSize` | Initial particle size in points |
| `particleColor` | `UIColor` | Average starting color |
| `particleColorSequence` | `SKKeyframeSequence?` | Color keyframes over particle lifetime |
| `particleAlpha` | `CGFloat` | Average starting opacity |
| `particleAlphaRange` | `CGFloat` | Random variance in starting opacity |
| `particleAlphaSpeed` | `CGFloat` | Rate of alpha change per second |
| `particleAlphaSequence` | `SKKeyframeSequence?` | Alpha keyframes over particle lifetime |
| `particleScale` | `CGFloat` | Starting scale factor |
| `particleScaleRange` | `CGFloat` | Random variance in scale |
| `particleScaleSpeed` | `CGFloat` | Rate of scale change per second |
| `particleScaleSequence` | `SKKeyframeSequence?` | Scale keyframes over particle lifetime |
| `particleRotation` | `CGFloat` | Initial rotation in radians |
| `particleRotationSpeed` | `CGFloat` | Rate of rotation change per second |
| `particleBlendMode` | `SKBlendMode` | Compositing mode (often `.add` for glowing effects) |
| `particleColorBlendFactor` | `CGFloat` | Blend ratio between `particleColor` and texture |

### Advanced

| Name | Type | Description |
|------|------|-------------|
| `particleAction` | `SKAction?` | Action run by every newly created particle |
| `targetNode` | `SKNode?` | Node that receives emitted particles (detaches particles from emitter's transform) |
| `fieldBitMask` | `UInt32` | Which field node categories affect particles |
| `shader` | `SKShader?` | Custom fragment shader for particle rendering |
| `particleRenderOrder` | `SKParticleRenderOrder` | Draw ordering of particles within the emitter |

## Notes

- Available: iOS 7+, macOS 10.9+, tvOS 9+, visionOS 1+, watchOS 10+.
- Particles are not individual objects; their properties are averaged with random variance from emitter configuration.
- Use Xcode's built-in particle editor to configure emitters visually and export `.sks` files.
- Set `targetNode` to the scene when the emitter moves (e.g., a rocket exhaust) so particles trail correctly.

### Key Methods

```swift
func advanceSimulationTime(_ sec: TimeInterval)  // Pre-warm the emitter
func resetSimulation()                            // Remove all particles and restart
```

## Related

- [SKNode](./sknode.md)
- [SKTexture](./sktexture.md)
- [SKFieldNode](./skfieldnode.md)
- [SKAction](./skaction.md)
