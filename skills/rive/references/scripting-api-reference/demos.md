# Scripting Demos

Community/example gallery demonstrating scripting features: particle systems, complete games, path effects, converters, and layout scripts.

## Signature / Usage

```lua
-- Example pattern shared by most demos: a Util-protocol script
-- exposing a pure function, unit-tested from another script.
function rgbToHex(r: number, g: number, b: number): string
  return string.format('#%02X%02X%02X', r, g, b)
end
```

## Notes

- Featured demos: Particle Emitter, Scripting Lists, Plinko (Layout + Node + Path Effect scripts), Slot Machine, Snake, Boiling Path Effect, Text Path Effect, Drawing with Scripting, Custom Converter, Masonry Layout, Render Image with Scripting, Unit Testing (`rgbToHex`/`hexToRgb`), Multi-touch tracking, Nested Pointer Events.
- Each demo links to the Rive community editor file and/or platform-specific source (Web, React, Flutter, React Native, Android, Apple, Unity).

## Related

- [protocol-overview.md](./protocol-overview.md)
- [getting-started.md](./getting-started.md)
