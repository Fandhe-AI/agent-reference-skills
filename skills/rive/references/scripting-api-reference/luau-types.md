# Luau Built-in Types (vector, DateTypeArg, DateTypeResult)

Built-in Luau standard-library types available inside Rive scripts, distinct from Rive's own scripting API classes.

## Options / Props

| Type | Fields | Description |
| --- | --- | --- |
| `vector` | `x`, `y`, `z` | Luau's built-in vector type |
| `DateTypeArg` | `year`, `month`, `day`, `hour`, `min`, `sec`, `isdst` | Input table shape for Luau date/time construction |
| `DateTypeResult` | `year`, `month`, `wday`, `yday`, `day`, `hour`, `min`, `sec`, `isdst` | Result table shape from Luau date/time functions |

## Notes

- The built-in Luau `vector` type (this page) is distinct from Rive's own `Vector` class documented in [vector.md](./vector.md) (`vector/vector.md` in the source docs) — the latter has explicit constructors (`Vector.xy`, `Vector.xyz`) and static helper functions used throughout the drawing/geometry API.

## Related

- [vector.md](./vector.md)
