# Util Scripts

Reusable, focused modules that organize shared logic across multiple scripts — mathematical helpers, geometry utilities, color functions, etc.

## Signature / Usage

```lua
local function add(a: number, b: number): number
  return a + b
end

return {
  add = add,
}
```

Import from another script with `require('MyUtil')`.

## Notes

- Select **Util** as the script type when creating a new script.
- Custom types defined in a Util script automatically become available (with type annotations) to any parent script that `require`s it.

## Related

- [protocol-test-scripts.md](./protocol-test-scripts.md)
