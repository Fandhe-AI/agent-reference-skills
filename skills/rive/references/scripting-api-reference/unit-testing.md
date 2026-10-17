# Unit Testing (Scripting)

Test scripts let you write unit tests for helper (Util / Blank) scripts and run them directly in the Rive editor. Use them to verify math helpers, string utilities, or any other pure logic.

## Signature / Usage

A Test script exposes a single `setup(test: Tester)` function.

```lua
-- Load the script that you want to create tests for
local MyUtil = require('MyUtil')

function setup(test: Tester)
  local case = test.case
  local group = test.group

  -- Create a single case with multiple tests
  case('Addition', function(expect)
    local result = MyUtil.add(2, 3)
    expect(result).is(5)
    expect(result).greaterThanOrEqual(5)
  end)

  -- Organize your tests with groups
  group('Math', function()
    case('Subtraction', function(expect)
      local result = MyUtil.subtract(2, 3)
      expect(result).is(-1)
    end)

    group('Trigonometry', function()
      case('Degrees to Radians', function(expect)
        local result = MyUtil.deg2rad(180)
        expect(result).is(math.pi)
      end)
    end)
  end)
end
```

Inverting a matcher with `never`:

```lua
case('never examples', function(expect)
  -- This passes because 2 + 2 is NOT 3
  expect(2 + 2).never.is(3)
  -- This passes because 4 is NOT >= 6
  expect(4).never.greaterThanOrEqual(6)
end)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `test.case(name, fn)` | function | Define a single test case |
| `test.group(name, fn)` | function | Group related tests; groups can be nested |
| `expect(value)` | function | Create an expectation object to assert on a value; passed as the argument to a case callback |
| `is` / `greaterThan` / `greaterThanOrEqual` / `lessThan` / `lessThanOrEqual` | matchers | Matcher methods on the expectation |
| `.never` | modifier | Passes only if the matcher would normally fail |

## Notes

- Create a script and select **Test** as the type.
- Run tests: in the Assets panel, right-click the Test script and select Run Tests. Passing and failing cases are listed under the script in the Assets Panel and highlighted in the script editor.
- Use descriptive names for groups and cases; they appear in the test results panel.
- Tests also serve as precise instructions for the editor's AI Agent.
- For the complete matcher list, see the Tester / Expectation page in the API reference.

## Related

- [testing.md](./testing.md)
- [protocol-test-scripts.md](./protocol-test-scripts.md)
- [protocol-util-scripts.md](./protocol-util-scripts.md)
- [debugging.md](./debugging.md)

Source: https://rive.app/docs/scripting/debugging/unit-testing (fetched 2026-10)
