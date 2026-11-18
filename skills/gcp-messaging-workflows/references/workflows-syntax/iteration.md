---
source: https://docs.cloud.google.com/workflows/docs/reference/syntax/iteration
---

# Workflows iteration (for loops)

A `for` loop iterates over a list or map (item-based iteration with `in`) or over a numeric range (range-based iteration with `range`). `next: break` and `next: continue` change the flow of a loop.

## Signature / Usage

### for loop over a list

```text
  - FOR_LOOP_STEP_NAME:
      for:
          value: LOOP_VARIABLE_NAME
          index: INDEX_VARIABLE_NAME
          in: ${LIST_EXPRESSION}      # or simply in: LIST_DEFINITION

          steps:
              - STEP_NAME_A:
                ...
```

### Loop variable scope

Loop variables are cleared after the loop; accessing them outside the loop raises an error when deploying the workflow.

```yaml
- init:
    assign:
      - workflowScope: foo
- outerLoop:
    for:
      value: outerLoopValue  # outerLoopValue does not exist outside of outerLoop step
      in: [1, 2, 3, 4]
      steps:
        - outerLoopAssign:
            assign:
              - outerLoopScope: ${workflowScope}  # outerLoopScope is a new variable and does not exist outside of outerLoop step
        - innerLoop:
            for:
              value: innerLoopValue  # innerLoopValue does not exist outside of innerLoop step
              in: [5, 6, 7, 8]
              steps:
                - innerLoopAssign:
                    assign:
                      - workflowScope: ${innerLoopValue}
                      - innerLoopScope: ${outerLoopScope}  # innerLoopScope is a new variable and does not exist outside of innerLoop step
- final:
    return:
      - ${workflowScope}  # allowed
      # - ${outerLoopScope}  # not allowed
      # - ${innerLoopScope}  # not allowed
      # - ${outerLoopValue}  # not allowed
```

### List iteration

```yaml
- assignStep:
    assign:
      - list: [1, 2, 3, 4, 5]
      - sum: 0
- loopStep:
    for:
      value: v                          # required, v = 1, 2, ..., 5
      in: ${list}
      steps:
        - getStep:
            assign:
              - sum: ${sum + v}
- returnStep:
    return: ${sum}                      # sum is 15
```

### Map iteration

```yaml
- assignStep:
    assign:
      - map:
          1: 10
          2: 20
          3: 30
      - sum: 0
- loopStep:
    for:
      value: key                        # key = 1, 2, 3
      in: ${keys(map)}                  # [1, 2, 3]
      steps:
        - sumStep:
            assign:
              - sum: ${sum + map[key]}
- returnStep:
    return: ${sum}                      # sum is 60
```

### for loop over a number range

```text
  - FOR_LOOP_STEP_NAME:
      for:
          value: LOOP_VARIABLE_NAME
          range: ${[BEGIN_EXPRESSION, END_EXPRESSION]}
          steps:
              - STEP_NAME_A:
                ...
```

```yaml
- assignStep:
    assign:
      - sum: 0
- loopStep:
    for:
      value: v                    # required, v = 1, 2, ..., 9
      range: [1, 9]               # inclusive beginning and ending values
      steps:
        - sumStep:
            assign:
              - sum: ${sum + v}   # v = 1, 2, ... 9
- returnStep:
    return: ${sum}                # sum is 45
```

### Jump within a loop

```text
  - FOR_LOOP_STEP_NAME:
      for:
          value: LOOP_VARIABLE_NAME
          in: ${LIST_EXPRESSION_A}    # or simply in: LIST_DEFINITION
          steps:
              - STEP_NAME_A:
                  next: STEP_NAME_C
              - STEP_NAME_B:
                  next: STEP_NAME_C
              - STEP_NAME_C:
                  ...
```

### break and continue

```yaml
- FOR_LOOP_STEP_NAME_A:
    for:
        value: LOOP_VARIABLE_NAME_A
        in: ${LIST_EXPRESSION_A}    # or simply in: LIST_DEFINITION
        steps:
            - STEP_NAME_A:
                next: continue
- FOR_LOOP_STEP_NAME_B:
    for:
        value: LOOP_VARIABLE_NAME_B
        range: ${[BEGIN_EXPRESSION, END_EXPRESSION]}
        steps:
            - STEP_NAME_B:
                next: break
```

### Iterate with conditional jumps and `len()`

```yaml
- define:
    assign:
      - array: ["foo", "ba", "r"]
      - result: ""
      - i: 0
- check_condition:
    switch:
      - condition: ${len(array) > i}
        next: iterate
    next: exit_loop
- iterate:
    assign:
      - result: ${result + array[i]}
      - i: ${i+1}
    next: check_condition
- exit_loop:
    return:
      concat_result: ${result}
```

## Options / Props

### List loop (`in`)

| Field | Required | Description |
|-------|----------|-------------|
| `for` | yes | Top-level element indicating the beginning of a for loop |
| `value` | yes | Variable holding the currently iterated element; must not be used outside the loop; the same name can be reused in multiple loops if they are not nested |
| `index` | no | Variable holding the current offset; always starts at 0 and goes to `len(${LIST_EXPRESSION}) - 1`; same naming rules as `value` |
| `in` | yes | Expression that evaluates into a list, or a list definition |
| `steps` | yes | Steps executed on each iteration |

### Range loop (`range`)

| Field | Required | Description |
|-------|----------|-------------|
| `for` | yes | Top-level element indicating the beginning of a for loop |
| `value` | yes | Variable holding the currently iterated value; same naming rules as above |
| `range` | yes | List of two expressions: beginning and end, both inclusive; they must evaluate to incrementable values (integer or double) |
| `steps` | yes | Steps executed on each iteration |

### Range behavior

| Case | Result |
|------|--------|
| Negative values | Allowed; `range: [-10, -1]` gives 10 iterations |
| Floating point values | Allowed and not rounded; `range: [-1.1, -1]` gives 1 iteration starting at -1.1 |
| `END_EXPRESSION` smaller than `BEGIN_EXPRESSION` | 0 iterations |
| Increment | 1 per iteration, or 1.0 for doubles; `range: [1.1, 2.8]` gives two iterations |

## Notes

- The 4-space indentation before `value`, `index`, `in`, `range` and `steps` is required; their ordering does not matter.
- Do not assign new values inside the loop to variables used in the loop expression (undefined behavior).
- When iterating over maps, `${keys(map)}` returns the keys; `keys()` always returns a sorted list.
- Loop variables, including any variable not assigned outside the loop, have loop-level scope and are cleared after the loop.
- Known issue: placing `for` directly after `try` causes an error; see https://docs.cloud.google.com/workflows/docs/issues for the workaround.
- Do not write a range as multiple expressions inside a list, such as `[${rangeStart}, ${rangeEnd}]`; see https://docs.cloud.google.com/workflows/docs/troubleshooting#expressions-in-list.
- Jumping is only allowed between named steps of the same for loop; jumping in or out of a for loop, or between two different for loops, is not allowed.
- `break` and `continue` are reserved jump targets defined implicitly within a loop. Named steps called `break` or `continue` inside a for loop are not allowed (they are allowed outside of a loop).
- The source also shows JSON forms of every sample and a Google Translate loop sample (`googleapis.translate.v2.translations.translate` with `next: continue`); both are omitted here, as are the samples that loop over HTTP requests with `try` / `except` and over a floating-point `range` with `next: break`.
- Source: https://docs.cloud.google.com/workflows/docs/reference/syntax/iteration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [steps.md](./steps.md)
- [conditions.md](./conditions.md)
- [expressions.md](./expressions.md)
