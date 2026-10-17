---
source: https://docs.expo.dev/eas/workflows/custom-functions/
---

# Custom functions in EAS Workflows

Custom functions define reusable step sequences for custom jobs and hooks, called with a relative path through `uses`.

## Signature / Usage

Adapted (not in the official docs): the official example interpolates `${{ inputs.who }}` and `${{ steps.greet.outputs.message }}` directly into `run`, which is only safe for fixed literal values. Here the value is passed through `env` (inherited by every step in the function, per the documented scoping) and referenced as a quoted shell variable.

`.eas/functions/greet/function.yml` (one input, one output, one step):

```yaml
name: Greet
inputs:
  - name: who
    default_value: world
outputs:
  message:
    value: '${{ steps.make.outputs.message }}'
runs:
  steps:
    - id: make
      run: set-output message "Hello, ${WHO:-world}!"
```

Call it from a workflow (Adapted: the output is exposed through `jobs.<job_id>.outputs` and displayed by a later job via `env`):

```yaml
name: Hello
jobs:
  greet:
    outputs:
      message: ${{ steps.greet.outputs.message }}
    steps:
      - id: greet
        uses: ./.eas/functions/greet
        with:
          who: Expo
        env:
          WHO: Expo
  show:
    needs: [greet]
    env:
      MESSAGE: ${{ needs.greet.outputs.message }}
    steps:
      - run: printf '%s\n' "${MESSAGE}"
```

Call it from a hook:

```yaml
jobs:
  build_ios:
    type: build
    params:
      platform: ios
    hooks:
      before_install_node_modules:
        - uses: ./.eas/functions/setup
```

## Notes

- Layout: a directory containing `function.yml` (or `function.yaml`), for example `.eas/functions/<name>/function.yml` next to `.eas/workflows/`. The `uses` value must start with `./` or `../` and is resolved relative to the EAS project directory; a `../` path may point outside the project directory but must remain within the repository. The `function.yml` schema is in the Custom functions section of the workflow syntax reference.
- Steps live under `runs.steps` and use the same format as custom job steps. A relative `working_directory` on a step inside the function resolves from the job's default working directory, not the directory containing `function.yml`.
- Usable in custom job `steps`, build job `steps`, job `hooks`, and `defaults.hooks`.
- Inputs are passed with `with:` and read as `${{ inputs.<name> }}`. Outputs are defined with `outputs` in `function.yml`, exposed as strings, and read as `${{ steps.<call_id>.outputs.<name> }}` using the `id` of the call step; the caller cannot reference the function's internal step identifiers. Do not interpolate `${{ inputs.* }}` or `${{ steps.*.outputs.* }}` directly into `run`; pass them via `env` and reference quoted shell variables.
- Scopes: `steps.*` inside the function resolve against its own steps; the call step's `with`, `env`, and `if` are evaluated in the caller's scope; every step inherits the call step's `env` (inner values override outer on nested calls); input defaults and expressions inside the function use the function's scope; the call step's `if` gates the whole function.
- Nesting: custom functions can call other custom functions and built-in `eas/*` functions. Currently they cannot call `eas/build` or `eas/maestro_test`. Nested paths resolve relative to the EAS project directory. Up to 10 levels deep; a function cannot call itself directly or indirectly.
- Distinct from GitHub Actions: these are EAS Workflows custom functions (`function.yml`), not GitHub Actions composite actions. See github-docs for GitHub Actions.
- Source modificationDate: August 10, 2026 (fetched 2026-10-17).

## Related

- [Syntax for EAS Workflows](./workflows-syntax.md)
- [EAS Workflows limitations](./workflows-limitations.md)
- [Pre-packaged jobs in EAS Workflows](./workflows-pre-packaged-jobs.md)
