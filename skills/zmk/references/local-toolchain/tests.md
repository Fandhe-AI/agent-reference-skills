# Tests

Run the ZMK automated test suite using the native POSIX board target. Tests must be executed from the `/zmk/app` directory.

## Signature / Usage

### Run all tests

```bash
west test
```

### Run a specific test

```bash
west test tests/toggle-layer/normal
```

## Test File Structure

Each test set lives under `app/tests/<behavior>/<scenario>/` and contains:

| File | Purpose |
|------|---------|
| `behavior_keymap.dtsi` | Behavior and keymap configuration |
| `native_posix_64.keymap` | Simulated key-press scenarios (marks the folder as a test) |
| `events.patterns` | sed patterns for log collection |
| `keycode_events.snapshot` | Expected output snapshot |

To add a new test set: copy an existing similar test, rename the directory, update the four files above, and add additional scenario folders as needed.

## Notes

- Native POSIX support is required; see [Native POSIX Board Target](./posix-board.md)
- Only folders containing `native_posix_64.keymap` are recognized as test cases
- Multiple test cases (scenario folders) can exist within a single test set

## Related

- [Native POSIX Board Target](./posix-board.md)
- [IDE Integration](./ide-integration.md)
- [Build and Flash](./build-flash.md)
