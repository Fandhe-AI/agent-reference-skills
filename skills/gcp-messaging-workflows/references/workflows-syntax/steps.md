---
source: https://docs.cloud.google.com/workflows/docs/reference/syntax/steps
---

# Workflows steps

A workflow is defined as a list of steps and their order of execution. Every workflow must have at least one step. By default, Workflows treats steps as an ordered list and executes them one at a time until all steps have run. A `steps` block can also nest a series of steps.

## Signature / Usage

### Step list

```text
  - STEP_NAME_A:
      ...
  - STEP_NAME_B:
      ...
```

### Step names are unique per subworkflow

A step named `init` is allowed in both the `main` block and a subworkflow.

```yaml
main:
    params: [input]
    steps:
    - init:
        call: sub
sub:
    steps:
    - init:
        assign:
          - a: 0
```

### Implicit step ordering

Steps run in the order they appear in the definition.

```yaml
- first_step:
    call: http.get
    args:
      url: https://www.example.com/callA
- second_step:
    call: http.get
    args:
      url: https://www.example.com/callB
- third_step:
    call: http.get
    args:
      url: https://www.example.com/callC
```

### Nested steps

Adapted (not in the official docs): `steps:` and everything under it are indented one more level, so that they are the value of `STEP_NAME`.

```text
  - STEP_NAME:
      steps:
        - STEP_NAME_1:
            steps:
                - STEP_NAME_A:
                    ...
                - STEP_NAME_B:
                    ...
        - STEP_NAME_2:
            steps:
                - STEP_NAME_C:
                    ...
```

Variables declared in a `steps` block have workflow-level scope and can be accessed outside of the block. Any step type can be nested inside a `steps` block, including `assign`, `call` and `switch`.

```yaml
main:
    steps:
    - series_one:
        steps:
            - step_a:
                call: http.get
                args:
                    url: https://host.com/api1
                result: api_response1
            - step_b:
                assign:
                    - varA: "Monday"
                    - varB: "Tuesday"
    - series_two:
        steps:
            - step_c:
                call: http.get
                args:
                    url: https://host.com/api2
                result: api_response2
            - step_d:
                assign:
                    - varC: "Wednesday"
                    - varD: "Thursday"
```

## Options / Props

### Step types

| Step type | Syntax page |
|-----------|-------------|
| Assign a variable | https://docs.cloud.google.com/workflows/docs/reference/syntax/variables |
| Apply conditions | [conditions.md](./conditions.md) |
| Invoke an HTTP endpoint | https://docs.cloud.google.com/workflows/docs/http-requests |
| Execute workflow steps in parallel | https://docs.cloud.google.com/workflows/docs/execute-parallel-steps |
| Return a value | [calls.md](./calls.md) |
| Pause a workflow | https://docs.cloud.google.com/workflows/docs/sleeping |

## Notes

- Corrected from the official docs: in the nested-steps template, `steps:` was at the same indentation as `STEP_NAME`, which makes `STEP_NAME` null and `steps` a separate key of the same list item. A step is a map from its name to its definition, so `steps:` is indented under `STEP_NAME`, as in the nested-steps sample that follows.
- Google Cloud Workflows — not Cloudflare Workflows (`cloudflare-stateful`) or Inngest functions (`inngest`).
- Step names must be unique at the subworkflow level. Workflows doesn't enforce a naming convention; the source recommends consistent names that only include alphanumeric characters and underscores.
- In some cases `steps` is required, for example when defining a subworkflow or a `for` loop.
- The source also shows each definition in JSON form (same structure as the YAML, as a JSON array of single-key objects); it is omitted here.
- Source: https://docs.cloud.google.com/workflows/docs/reference/syntax/steps (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [conditions.md](./conditions.md)
- [iteration.md](./iteration.md)
- [subworkflows.md](./subworkflows.md)
- [calls.md](./calls.md)
- [expressions.md](./expressions.md)
