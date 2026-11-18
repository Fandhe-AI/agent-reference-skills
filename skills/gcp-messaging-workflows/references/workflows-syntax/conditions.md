---
source: https://docs.cloud.google.com/workflows/docs/reference/syntax/conditions
---

# Workflows conditions (switch)

A `switch` block lets the value of an expression control the flow of a workflow's execution. If a condition matches, that condition's statement is executed. Each `switch` block can include a maximum of 50 conditions, and each expression must evaluate to true or false.

## Signature / Usage

### Conditional jumps

Evaluation is in order and the first match is executed. The optional default condition `- condition: true` should be the last condition.

```yaml
- STEP_NAME_A:
    switch:
        - condition: ${EXPRESSION_A}
          next: STEP_NAME_B
        - condition: ${EXPRESSION_B}
          next: STEP_NAME_C
        - condition: true
          next: STEP_NAME_C
    next: STEP_NAME_D
```

### Nested steps in a condition

The `steps` block is optional.

```text
  - STEP_NAME_A:
      switch:
          - condition: ${EXPRESSION}
            steps:
                - STEP_NAME_B:
                    ...
                - STEP_NAME_C:
                    ...
      next: STEP_NAME_D
```

### Jump based on a call result

```yaml
- first_step:
    call: http.get
    args:
      url: https://www.example.com/callA
    result: first_result
- where_to_jump:
    switch:
      - condition: ${first_result.body.SomeField < 10}
        next: small
      - condition: ${first_result.body.SomeField < 100}
        next: medium
    next: large
- small:
    call: http.get
    args:
      url: https://www.example.com/SmallFunc
    next: end
- medium:
    call: http.get
    args:
      url: https://www.example.com/MediumFunc
    next: end
- large:
    call: http.get
    args:
      url: https://www.example.com/LargeFunc
    next: end
```

```yaml
- getCurrentTime:
    call: http.get
    args:
      url: https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam
    result: currentTime
- conditionalSwitch:
    switch:
      - condition: ${currentTime.body.dayOfWeek == "Friday"}
        next: friday
      - condition: ${currentTime.body.dayOfWeek == "Saturday" or currentTime.body.dayOfWeek == "Sunday"}
        next: weekend
    next: workWeek
- friday:
    return: "It's Friday! Almost the weekend!"
- weekend:
    return: "It's the weekend!"
- workWeek:
    return: "It's the work week."
```

### Switch structure with embedded steps

Steps run directly when a condition is met, without jumping, which reduces the number of steps in the definition.

```yaml
- step1:
    assign:
      - a: 1
- step2:
    switch:
      - condition: ${a==1}
        steps:
          - stepA:
              assign:
                - a: ${a+7}
          - stepB:
              return: ${"increase a to:"+string(a)}
- step3:
    return: ${"default a="+string(a)}
```

## Options / Props

| Field | Description |
|-------|-------------|
| `switch` | List of conditions evaluated in order; maximum of 50 conditions per `switch` block |
| `condition` | Expression that must evaluate to true or false; `condition: true` is the optional default and should be last |
| `next` | Step to jump to when the condition matches (or, on the step itself, when no condition matches) |
| `steps` | Optional nested steps run when the condition matches |

### Step types allowed inside a condition's `steps` block

| Type | Syntax page |
|------|-------------|
| `assign` | https://docs.cloud.google.com/workflows/docs/reference/syntax/variables#assign-step |
| `call` | [calls.md](./calls.md) |
| `for` | [iteration.md](./iteration.md) |
| `parallel` | https://docs.cloud.google.com/workflows/docs/reference/syntax/parallel-steps |
| `raise` | https://docs.cloud.google.com/workflows/docs/reference/syntax/raising-errors |
| `return` | https://docs.cloud.google.com/workflows/docs/reference/syntax/completing#using-return |
| `steps` | [steps.md](./steps.md) |
| `switch` | this page |
| `try` | https://docs.cloud.google.com/workflows/docs/reference/syntax/catching-errors |

## Notes

- If no condition matches and there is no default condition, the workflow continues with the step that immediately follows.
- The source shows every sample in YAML and JSON; the JSON forms are omitted (they have the same structure). The source's JSON sample for the first block omits a comma between the second and third condition, which is another reason to start from the YAML.
- See also jumps (https://docs.cloud.google.com/workflows/docs/reference/syntax/jumps) and https://docs.cloud.google.com/workflows/docs/controlling-execution-order.
- Source: https://docs.cloud.google.com/workflows/docs/reference/syntax/conditions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [steps.md](./steps.md)
- [expressions.md](./expressions.md)
- [iteration.md](./iteration.md)
