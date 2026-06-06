# PropertyBinding

Holds a reference to an animated property in the scene graph and provides getter/setter pairs for reading and writing it. Used internally by the animation system; rarely instantiated directly.

## Constructor

```js
new PropertyBinding(rootNode, path, parsedPath)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| rootNode | Object3D \| Skeleton | The root of the scene graph |
| path | string | Dot-separated path to the animated property |
| parsedPath | Object | Pre-parsed path object (optional) |

## Properties

| Name | Type | Description |
|------|------|-------------|
| node | Object | The object owning the animated property |
| parsedPath | Object | Parsed representation of the property path |
| path | string | Raw path string to the animated property |
| rootNode | Object3D \| Skeleton | The root node |

## Methods

| Method | Description |
|--------|-------------|
| bind() | Creates getter/setter pair for the target property |
| unbind() | Releases the getter/setter pair |

## Static Methods

| Method | Returns | Description |
|--------|---------|-------------|
| PropertyBinding.create(root, path, parsedPath?) | PropertyBinding \| Composite | Factory; returns Composite when path targets multiple objects |
| PropertyBinding.findNode(root, nodeName) | Object \| null | Searches the hierarchy for a node by name |
| PropertyBinding.parseTrackName(trackName) | Object | Parses a track name string into path components |
| PropertyBinding.sanitizeNodeName(name) | string | Replaces spaces with underscores and removes unsupported characters |

## Notes

- Track name formats supported by `parseTrackName`:
  - `nodeName.property`
  - `nodeName.property[index]`
  - `nodeName.subObject.property[index]`
  - `uuid.property[index]`
  - `parentName/nodeName.property`
  - `.bone[Armature.DEF_cog].position`

## Related

- [PropertyMixer](./PropertyMixer.md)
- [KeyframeTrack](./KeyframeTrack.md)
