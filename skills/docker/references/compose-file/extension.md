---
source: https://docs.docker.com/reference/compose-file/extension/
---

# Extensions

Use the prefix `x-` as a top-level element to modularize configurations you want to reuse. Compose ignores any field that starts with `x-`; this is the sole exception where Compose silently ignores unrecognized fields.

## Signature / Usage

```yml
x-env: &env
  environment:
    - CONFIG_KEY
    - EXAMPLE_KEY
 
services:
  first:
    <<: *env
    image: my-image:latest
  second:
    <<: *env
    image: another-image:latest
```

The environment variables belong to neither service; they are lifted into the `x-env` extension field. The `&env` YAML anchor lets both services reference the extension value as `*env`.

Extensions can also be used within any structure where user-defined keys are not expected:

```yml
x-custom:
  foo:
    - bar
    - zot

services:
  webapp:
    image: example/webapp
    x-foo: bar
```

```yml
services:
  backend:
    deploy:
      placement:
        x-aws-role: "arn:aws:iam::XXXXXXXXXXXX:role/foo"
        x-aws-region: "eu-west-3"
        x-azure-region: "france-central"
```

Multiple extensions with YAML merge:

```yml
x-environment: &default-environment
  FOO: BAR
  ZOT: QUIX
x-keys: &keys
  KEY: VALUE
services:
  frontend:
    image: example/webapp
    environment: 
      << : [*default-environment, *keys]
      YET_ANOTHER: VARIABLE
```

## Notes

- The official example uses the top-level key `service:`; corrected to `services:`.

- Compose uses such keys to enable experimental features, the way browsers add support for custom CSS features.
- YAML merge only applies to mappings and can't be used with sequences; the sequence syntax `- FOO=BAR` is only valid when no fragments are involved.
- Historical (informative): known prefixes are `docker` (Docker) and `kubernetes` (Kubernetes).
- Specifying byte values: `{amount}{byte unit}` string with units `b`, `k` or `kb`, `m` or `mb`, `g` or `gb`. Examples: `2b`, `1024kb`, `2048k`, `300m`, `1gb`.
- Specifying durations: `{value}{unit}` string with units `us`, `ms`, `s`, `m`, `h`; values can combine without separator. Examples: `10ms`, `40s`, `1m30s`, `1h5m30s20ms`.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Fragments](./fragments.md)
- [services: cpu / memory / blkio / devices / gpus](./services-resources.md)
