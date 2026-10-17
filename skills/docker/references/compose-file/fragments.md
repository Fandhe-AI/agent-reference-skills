---
source: https://docs.docker.com/reference/compose-file/fragments/
---

# Fragments

Built-in YAML anchors and aliases let you create reusable blocks in a Compose file.

## Signature / Usage

```yml
volumes:
  db-data: &default-volume
    driver: default
  metrics: *default-volume
```

Anchors are created with `&` followed by an alias name; reference the value later with `*`. There must be no space between `&` / `*` and the alias name. You can use more than one anchor and alias in a single file. Here a `default-volume` anchor is created from `db-data` and reused by `*default-volume` to define `metrics`.

Reuse across services:

```yml
services:
  first:
    image: my-image:latest
    environment: &env
      - CONFIG_KEY
      - EXAMPLE_KEY
      - DEMO_VAR
  second:
    image: another-image:latest
    environment: *env
```

Partial override following the YAML merge type:

```yml
services:
  backend:
    image: example/database
    volumes:
      - db-data:/var/lib/data
      - metrics:/var/lib/metrics
volumes:
  db-data: &default-volume
    driver: default
    name: "data"
  metrics:
    <<: *default-volume
    name: "metrics"
```

Extending an anchor with additional values:

```yml
services:
  first:
    image: my-image:latest
    environment: &env
      FOO: BAR
      ZOT: QUIX
  second:
    image: another-image:latest
    environment:
      <<: *env
      YET_ANOTHER: VARIABLE
```

## Notes

- The official Example 3 lists `db-data` / `metrics` without a container path, which Compose would treat as relative anonymous-volume targets; container paths are added here.

- Anchor resolution takes place before variable interpolation, so variables can't be used to set anchors or aliases.
- YAML merge (`<<`) only applies to mappings and can't be used with sequences. When fragments are involved, declare environment variables with the `FOO: BAR` mapping syntax; the sequence syntax `- FOO=BAR` is only valid when no fragments are involved.
- For an anchor used in more than one service, combine it with an extension to make the file easier to maintain.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Extensions](./extension.md)
- [Interpolation](./interpolation.md)
- [Merge Compose files](./merge.md)
