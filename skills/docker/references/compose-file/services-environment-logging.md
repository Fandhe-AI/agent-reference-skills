---
source: https://docs.docker.com/reference/compose-file/services/#environment
---

# services: env_file / environment / logging

Environment variables passed to service containers, and the logging configuration.

## Signature / Usage

```yml
env_file:
  - ./a.env
  - ./b.env
environment:
  RACK_ENV: development
  SHOW: "true"
  USER_INPUT:
logging:
  driver: syslog
  options:
    syslog-address: "tcp://192.168.0.42:123"
```

## Notes

### `env_file`

Specifies one or more files that contain environment variables to be passed to the containers.

```yml
env_file: .env
```

- Relative paths are resolved from the Compose file's parent folder. Absolute paths prevent the Compose file from being portable, so Compose warns when one is used.
- Variables declared in `environment` override these values, even if those values are empty or undefined.
- As a list, files are processed from the top down; for the same variable in two files, the value from the last file stands.
- List elements can also be mappings that set additional attributes.

`required` defaults to `true`. When `false` and the `.env` file is missing, Compose silently ignores the entry.

```yml
env_file:
  - path: ./default.env
    required: true # default
  - path: ./override.env
    required: false
```

`format` selects an alternative file format. When not set, the file is parsed with the Compose rules below. `raw` lets you use key=value items without any attempt from Compose to parse the value for interpolation; values are passed as-is, including quotes and `$` signs.

```yml
env_file:
  - path: ./default.env
    format: raw
```

`Env_file` format: each line must be in `VAR[=[VAL]]` format.

- Lines beginning with `#` are comments; blank lines are ignored.
- Unquoted and double-quoted (`"`) values have interpolation applied.
- Delimiter between key and value can be `=` or `:`. Spaces before and after the value are ignored (`VAR = VAL  ` -> `VAL`).
- Inline comments for unquoted values must be preceded with a space (`VAR=VAL # comment` -> `VAL`; `VAR=VAL# not a comment` -> `VAL# not a comment`). For quoted values they must follow the closing quote (`VAR="VAL # not a comment"` -> `VAL # not a comment`).
- Single-quoted (`'`) values are used literally (`VAR='$OTHER'` -> `$OTHER`).
- Quotes can be escaped with `\` (`VAR='Let\'s go!'` -> `Let's go!`).
- Shell escape sequences `\n`, `\r`, `\t`, `\\` are supported in double-quoted values only.
- `VAL` may be omitted (empty string); `=VAL` may be omitted (variable is unset).

```bash
# Set Rails/Rack environment
RACK_ENV=development
VAR="quoted"
```

### `environment`

Defines environment variables set in the container, as an array or a map. Boolean values (true, false, yes, no) should be enclosed in quotes so the YAML parser does not convert them. A single key without a value means Compose relies on you to resolve the value; if unresolved, the variable is unset and removed from the container environment.

Map syntax:

```yml
environment:
  RACK_ENV: development
  SHOW: "true"
  USER_INPUT:
```

Array syntax:

```yml
environment:
  - RACK_ENV=development
  - SHOW=true
  - USER_INPUT
```

When both `env_file` and `environment` are set, values set by `environment` have precedence.

### `logging`

Defines the logging configuration for the service.

```yml
logging:
  driver: syslog
  options:
    syslog-address: "tcp://192.168.0.42:123"
```

The `driver` name specifies a logging driver for the service's containers. The default and available values are platform specific. Driver specific options are set with `options` as key-value pairs.

### Other notes

- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Interpolation](./interpolation.md)
- [services: image / build / command / identity attributes](./services-image-command.md)
