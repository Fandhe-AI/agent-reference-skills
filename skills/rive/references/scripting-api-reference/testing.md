# Tester / Expectation / Tests

`Tests` is a function that defines a collection of test cases and receives a `Tester`. `Tester` declares cases and groups; `Expectation` performs assertions on a value.

## Signature / Usage

```lua
case(name: string, test: (expect:(value: any) -> Expectation) ->()) -> ()
errors(name: string, test: (expect:(value: any) -> Expectation) ->(), message: string?) -> ()
group(name: string, test: () ->()) -> ()
blob(name: string) -> Blob?
```

```lua
group("Math utilities", function()
  case("adds numbers", function(expect)
    expect(2 + 2).is(4)
  end)
end)

errors("rejects a negative size", function(expect)
  buffer.create(-1)
end, "invalid argument")
```

## Options / Props

Tester methods:

| Name | Signature | Description |
|------|-----------|-------------|
| `case` | `case(name, test)` | Defines a named test case; the callback receives an `expect` function |
| `errors` | `errors(name, test, message?)` | Passes only when the callback raises an error; with `message`, the error must also contain it |
| `group` | `group(name, test)` | Groups related cases under a common name; nested groups supported |
| `blob` | `blob(name: string) -> Blob?` | Looks up a blob asset in the file by name, or nil when missing |

Expectation:

| Name | Signature | Description |
|------|-----------|-------------|
| `never` (field) | `Expectation` | Negates the subsequent assertion |
| `is` | `is(any) -> ()` | Value equals the expected value |
| `greaterThan` | `greaterThan(any) -> ()` | Value is greater than the expected value |
| `lessThan` | `lessThan(any) -> ()` | Value is less than the expected value |
| `greaterThanOrEqual` | `greaterThanOrEqual(any) -> ()` | Value is greater than or equal to the expected value |
| `lessThanOrEqual` | `lessThanOrEqual(any) -> ()` | Value is less than or equal to the expected value |

```lua
expect(5).never.is(3)
expect(5).never.greaterThan(10)
expect(6).greaterThanOrEqual(5)
```

## Notes

- Source example calls `test.blob("fixtures")` on the `Tester` argument of `setup`.

## Related

- [unit-testing.md](./unit-testing.md)
- [protocol-test-scripts.md](./protocol-test-scripts.md)
