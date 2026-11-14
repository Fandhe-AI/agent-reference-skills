# Jobset Commands

The `jobset` subcommand runs predefined jobsets defined in `.kicad_jobset` files.

## Commands

| Command | Purpose | Main Options |
|---------|---------|--------------|
| `jobset run` | Execute a predefined jobset | `--file`, `--output`, `--stop-on-error` |

---

## jobset run

Runs a predefined jobset, executing each job in sequence.

### Signature / Usage

```
kicad-cli jobset run [options] INPUT_FILE
```

**INPUT_FILE**: Project file (`.kicad_pro`) to use with the jobset.

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--file <jobset file>` | `-f` | The jobset file (`.kicad_jobset`) to run |
| `--output <destination>` | | The jobset destination to generate; if omitted, all destinations are generated |
| `--stop-on-error` | | Stop running after a job fails; if omitted, execution continues after failures |

### Notes

- The `--output` value can be specified either by **description** or by **ID**.
- The description must be unique within the jobset; if multiple destinations share the same description, none will run.
- The ID for each destination is printed by `jobset run` when `--output` is not used; it can also be found in the `.kicad_jobset` file under the destination's `id` key.

## Related

- [Introduction](./01-introduction.md)
