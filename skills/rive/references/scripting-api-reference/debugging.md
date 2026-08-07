# Debugging (Debug Panel / Unit Testing)

The Debug Panel inspects script console output and lists pre-run problems. Test scripts add unit-testing on top of that for [Util Scripts](./protocol-util-scripts.md).

## Signature / Usage

```lua
print("Rive is so cool!")
print("Elapsed time:", seconds)
```

Test script (see [Test Scripts](./protocol-test-scripts.md) protocol):

```lua
local MyUtil = require('MyUtil')

function setup(test: Tester)
  local case = test.case
  local group = test.group

  case('Addition', function(expect)
    local result = MyUtil.add(2, 3)
    expect(result).is(5)
    expect(result).greaterThanOrEqual(5)
  end)

  group('Math', function()
    case('Subtraction', function(expect)
      expect(MyUtil.subtract(2, 3)).is(-1)
    end)
  end)
end
```

## Options / Props

| Feature | Description |
| --- | --- |
| Console tab | Log output and runtime errors during playback (`print()`) |
| Problems tab | Pre-run issues: type mismatches, syntax errors, missing data bindings; badge shows count, click jumps to the line |
| `test.case(name, fn)` | Defines a single test case |
| `test.group(name, fn)` | Groups related tests; groups can nest |
| `expect(value).is/greaterThan/greaterThanOrEqual/lessThan/lessThanOrEqual` | Matcher assertions |
| `expect(value).never.<matcher>` | Inverts a matcher |

## Notes

- Run tests: right-click a Test script in the Assets panel → Run Tests. Results appear both in the Assets Panel (pass/fail per case) and inline in the script editor.

## Related

- [protocol-test-scripts.md](./protocol-test-scripts.md)
- [protocol-util-scripts.md](./protocol-util-scripts.md)
