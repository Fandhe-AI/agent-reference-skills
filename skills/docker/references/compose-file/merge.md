---
source: https://docs.docker.com/reference/compose-file/merge/
---

# Merge Compose files

Compose lets you define a Compose application model through multiple Compose files, following specific merge rules.

## Signature / Usage

Mapping merge: add missing entries and merge conflicting ones. Merging

```yaml
services:
  foo:
    key1: value1
    key2: value2
```

with

```yaml
services:
  foo:
    key2: VALUE
    key3: value3
```

results in

```yaml
services:
  foo:
    key1: value1
    key2: VALUE
    key3: value3
```

## Notes

- Sequence: merged by appending values from the overriding file to the previous one (`DNS: [1.1.1.1]` + `DNS: [8.8.8.8]` gives `[1.1.1.1, 8.8.8.8]`).
- Shell commands: for `command`, `entrypoint` and `healthcheck: test`, the value is overridden by the latest file, not appended.

```yaml
services:
  foo:
    command: ["echo", "bar"]
```

- Unique resources: `ports`, `volumes`, `secrets` and `configs` are sequences with uniqueness requirements. Compose appends new entries that do not violate a uniqueness constraint and merges entries that share a unique key.

| Attribute | Unique key |
| --- | --- |
| volumes | target |
| secrets | target |
| configs | target |
| ports | {ip, target, published, protocol} |

Merging `volumes: [foo:/work]` with `volumes: [bar:/work]` results in `volumes: [bar:/work]`.

### Reset value (`!reset`)

An override file can remove elements using the custom YAML tag `!reset`. A valid value must be provided but is ignored; the target attribute is set to the type's default value or `null`. Recommended: `!reset null` or `!reset []` for readability.

Base `compose.yaml`:

```yaml
services:
  app:
    image: myapp
    ports:
      - "8080:80" 
    environment:
      FOO: BAR           
```

`compose.override.yaml`:

```yaml
services:
  app:
    image: myapp
    ports: !reset []
    environment:
      FOO: !reset null
```

Result:

```yaml
services:
  app:
    image: myapp
```

### Replace value (`!override`)

`!override` fully replaces an attribute, bypassing the standard merge rules (typically to replace a resource definition with a distinct model of the same name).

```yaml
services:
  app:
    ports: !override
      - "8443:443" 
```

With a base of `ports: ["8080:80"]`, the result is `ports: ["8443:443"]`. Without `!override`, both `8080:80` and `8443:443` would be exposed by the sequence rule.

### Other notes

- For composing multiple files in practice, see the "Working with multiple Compose files" how-to on docs.docker.com.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Use include to modularize Compose files](./include.md)
- [Interpolation](./interpolation.md)
- [Fragments](./fragments.md)
