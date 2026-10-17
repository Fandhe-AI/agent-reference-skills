# Drawable / DrawableProperty / DrawablePropertyKind / PropertyKey

A `Drawable` carries custom properties and is handed to the visitor of `artboard:draw(renderer, visitor)`. It is only valid inside that visitor call.

## Signature / Usage

```lua
number(key: PropertyKey) -> number?
boolean(key: PropertyKey) -> boolean?
color(key: PropertyKey) -> Color?
string(key: PropertyKey) -> string?
properties() -> {DrawableProperty}
draw(renderer: Renderer) -> ()
```

## Options / Props

Drawable methods:

| Name | Signature | Description |
|------|-----------|-------------|
| `number` | `number(key: PropertyKey) -> number?` | Custom number property of this key, nil when there is none |
| `boolean` | `boolean(key: PropertyKey) -> boolean?` | Custom boolean property of this key, nil when there is none |
| `color` | `color(key: PropertyKey) -> Color?` | Custom color property of this key, nil when there is none |
| `string` | `string(key: PropertyKey) -> string?` | Custom string property of this key, nil when there is none |
| `properties` | `properties() -> {DrawableProperty}` | Every custom property on the drawable |
| `draw` | `draw(renderer: Renderer) -> ()` | Draws the drawable under the renderer's current state |

Related types:

| Type | Description |
|------|-------------|
| `DrawableProperty` | One custom property as `drawable:properties()` lists them; fields `name` and `kind` |
| `DrawablePropertyKind` | The kind of a custom property on a Drawable |
| `PropertyKey` | What a custom property is read by. Get one from `artboard:propertyKey` |

## Notes

- `properties()` is for tooling and debugging: the editor and rive-cli have it, a shipping runtime does not, so do not call it from a script you ship.
- Get a `PropertyKey` from `artboard:propertyKey` once, in `init`, and keep it: resolving a name scans the file's name table, reading by key does not.
- The source pages list no member values for `DrawablePropertyKind` and no descriptions for `DrawableProperty` fields.

## Related

- [artboard-artboard.md](./artboard-artboard.md)
- [renderer.md](./renderer.md)
- [color.md](./color.md)

Source: https://rive.app/docs/scripting/api-reference/artboards/drawable, https://rive.app/docs/scripting/api-reference/artboards/drawable-property, https://rive.app/docs/scripting/api-reference/artboards/drawable-property-kind (fetched 2026-10)
