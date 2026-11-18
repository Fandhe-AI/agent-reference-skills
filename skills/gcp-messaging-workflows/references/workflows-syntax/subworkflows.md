---
source: https://docs.cloud.google.com/workflows/docs/reference/syntax/subworkflows
---

# Workflows subworkflows

Subworkflows define a piece of logic or a set of steps that you can call multiple times, like a function or routine in a programming language. They can accept parameters and return values.

## Signature / Usage

### Main block

If a workflow has a subworkflow, the main workflow must be placed in a `main` block. Subworkflows are always defined after the main body of the workflow definition.

```text
  main:
      steps:
          - STEP_NAME:
              ...
          ...

  SUBWORKFLOW_NAME:
      params: [PARAMETER_1,PARAMETER_2...]
      steps:
          - SUBWORKFLOW_STEP_NAME:
          ...
```

If you don't need to pass parameters, delete the `params` block. Parameters must be enclosed in square brackets, for example `params: [Street, ZipCode, Country]`.

### Default parameters

The default value is used only if a parameter isn't provided in the subworkflow call.

```text
  SUBWORKFLOW_NAME:
      params: [PARAMETER_1, PARAMETER_2: DEFAULT_VALUE2...]
      steps:
          - SUBWORKFLOW_STEP_NAME:
          ...
```

This subworkflow can be called with or without `Country`; it defaults to "United States".

```yaml
build_address:
    params: [Street, ZipCode, Country: "United States"]
    steps:
        - concatenate:
            return: ${Street + ", " + ZipCode + ", " + Country}
```

### Call a subworkflow

```text
   main:
       steps:
           - STEP_NAME:
               call: SUBWORKFLOW_NAME
               args:
                   ARG_1: VALUE_1
                   ARG_2: VALUE_2
                   ...
               result: OUTPUT_VARIABLE
   SUBWORKFLOW_NAME:
        params: [PARAMETER_1,PARAMETER_2...]
        steps:
            - step_1:
            ...
```

```yaml
main:
    steps:
        - call_subworkflow:
            call: name_message
            args:
                first_name: "Ada"
                last_name: "Lovelace"
            result: output
        - call_subworkflow2:
            call: name_message
            args:
                first_name: "Sherlock"
                last_name: "Holmes"
            result: output2
        - return_message:
            return: ${output + " " + output2}

name_message:
    params: [first_name, last_name, country: "England"]
    steps:
        - prepareMessage:
            return: ${"Hello " + first_name + " " + last_name + " from " + country + "."}
```

The main workflow returns `Hello Ada Lovelace from England. Hello Sherlock Holmes from England.`

### Call a subworkflow in an expression

Same result, but the call is made from an expression.

```yaml
main:
    steps:
        - call_subworkflow:
            assign:
              - output: ${name_message("Ada","Lovelace")}
        - call_subworkflow2:
            assign:
              - output2: ${name_message("Sherlock","Holmes")}
        - return_message:
            return: ${output + " " + output2}

name_message:
    params: [first_name, last_name, country: "England"]
    steps:
        - prepareMessage:
            return: ${"Hello " + first_name + " " + last_name + " from " + country + "."}
```

### Simple subworkflow

```yaml
main:
  steps:
    - first:
        call: hello
        args:
          input: "Kristof"
        result: some_output
    - second:
        return: ${some_output}

hello:
  params: [input]
  steps:
    - first:
        return: ${"Hello "+input}
```

## Options / Props

| Field | Description |
|-------|-------------|
| `main` | Required block for the main workflow when the definition has a subworkflow |
| `SUBWORKFLOW_NAME` | Name of the subworkflow, defined after `main` |
| `params` | Optional list of parameters in square brackets; `NAME: DEFAULT` sets a default |
| `steps` | Required inside a subworkflow block |
| `call` / `args` / `result` | In the calling step: subworkflow name, argument values by parameter name, variable receiving the returned data |

### Step types allowed in a subworkflow's `steps`

| Type | Syntax page |
|------|-------------|
| `assign` | https://docs.cloud.google.com/workflows/docs/reference/syntax/variables#assign-step |
| `call` | [calls.md](./calls.md) |
| `for` | [iteration.md](./iteration.md) |
| `parallel` | https://docs.cloud.google.com/workflows/docs/reference/syntax/parallel-steps |
| `raise` | https://docs.cloud.google.com/workflows/docs/reference/syntax/raising-errors |
| `return` | https://docs.cloud.google.com/workflows/docs/reference/syntax/completing#using-return |
| `steps` | [steps.md](./steps.md) |
| `switch` | [conditions.md](./conditions.md) |
| `try` | https://docs.cloud.google.com/workflows/docs/reference/syntax/catching-errors |

## Notes

- Expressions cannot contain calls to subworkflows with blocking steps (see blocking calls in [expressions.md](./expressions.md)).
- Step names only need to be unique within one subworkflow (see [steps.md](./steps.md)).
- The source also shows JSON forms of every sample; they are omitted. Its JSON syntax templates for `params` are not usable as written (`"params": "[PARAMETER_1,PARAMETER_2: DEFAULT_VALUE2...]"` is a string, and `"params": ["PARAMETER_1,PARAMETER_2"...]` is not valid JSON); its concrete JSON samples write `params` as an array with an object for each default (for example `{"Country": "United States"}`).
- Source: https://docs.cloud.google.com/workflows/docs/reference/syntax/subworkflows (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [calls.md](./calls.md)
- [steps.md](./steps.md)
- [expressions.md](./expressions.md)
