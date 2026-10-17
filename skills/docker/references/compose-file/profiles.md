---
source: https://docs.docker.com/reference/compose-file/profiles/
---

# Learn how to use profiles in Docker Compose

Profiles let you define a set of active profiles so your Compose application model is adjusted for various usages and environments. The `services` element supports a `profiles` attribute listing named profiles.

## Signature / Usage

```yaml
services:
  web:
    image: web_image

  test_lib:
    image: test_lib_image
    profiles:
      - test

  coverage_lib:
    image: coverage_lib_image
    depends_on:
      - test_lib
    profiles:
      - test

  debug_lib:
    image: debug_lib_image
    depends_on:
      - test_lib
    profiles:
      - debug
```

Outcomes for the example:

- No profile enabled: only `web`.
- `test` enabled: `test_lib`, `coverage_lib`, and `web` (always enabled).
- `debug` enabled: `web` and `debug_lib`, but not `test_lib` / `coverage_lib`; the model is invalid regarding the `depends_on` constraint of `debug_lib`.
- `debug` and `test` enabled: all four services.
- Explicitly running `test_lib`: `test_lib` and the `test` profile are active even if not enabled.
- Explicitly running `coverage_lib`: `coverage_lib` and profile `test` are active, and `test_lib` is pulled in by `depends_on`.
- Explicitly running `debug_lib`: the model is invalid, since `debug_lib` and `test_lib` have no common `profiles`.
- Explicitly running `debug_lib` with profile `test` enabled: profile `debug` is automatically enabled and `test_lib` is pulled in, starting both.

## Notes

- Services without a `profiles` attribute are always enabled.
- A service is ignored when none of its `profiles` match the active ones, unless explicitly targeted by a command; then its profile is added to the active set.
- All other top-level elements are not affected by `profiles` and are always active.
- References to other services (by `links`, `extends`, or `service:xxx`) do not automatically enable a component otherwise ignored by active profiles; Compose returns an error instead.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [services: image / build / command / identity attributes](./services-image-command.md)
- [services: depends_on / healthcheck / restart / lifecycle hooks](./services-lifecycle.md)
