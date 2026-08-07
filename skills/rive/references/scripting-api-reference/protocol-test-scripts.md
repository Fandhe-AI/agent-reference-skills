# Test Scripts

Write and run unit tests for [Util Scripts](./protocol-util-scripts.md) directly in the Rive editor.

## Signature / Usage

```lua
local MyUtil = require('MyUtil')

function setup(test: Tester)
  local case = test.case
  local group = test.group

  case('Addition', function(expect)
    expect(MyUtil.add(2, 3)).is(5)
  end)
end
```

See [debugging.md](./debugging.md) for the full `setup(test)` / `case` / `group` / `expect` matcher reference and how to run tests.

## Notes

- Select **Test** as the script type when creating a new script.

## Related

- [protocol-util-scripts.md](./protocol-util-scripts.md)
- [debugging.md](./debugging.md)
