---
source: https://docs.cloud.google.com/application-integration/docs/data-mapping-overview
---

# Data mapping overview

Data mapping extracts and standardizes data from multiple sources and relates it to target fields in the destination. Application Integration offers two tasks for it: the Data Transformer task (Jsonnet template engine plus a visual Diagram mode) and the Data Mapping task (a no-code / low-code visual editor with predefined mapping functions).

## Signature / Usage

### Data Transformer task

Template-engine-based data mapping that uses Google's Jsonnet language to define mappings between source and target integration variables. It has two modes:

- **Diagram mode**: a visual canvas with **Input** (variables or constants), **Output** (target variables, usable as inputs in later rows) and a **Canvas** to map them. Predefined transformation operations can be applied; a parameter holds a literal value or a variable, and several operations on one input form a mapping transform expression. The end data type of an input is the return type of its transform expression.
- **Script mode**: the **Data Transformer Script editor** lets you write custom mapping logic, assign variables, and add or modify integration variables using the supported Data Transformer functions.

### Data Mapping task

A visual **Data Mapping editor** to assign and map variables (single or nested) and to transform them between data types, including nested mapping functions. Layout:

- **Variables** pane: **Inputs**, **Outputs** and **Local Variables** (variables scoped to the integration).
- **Input** column: the source of each mapping row — a literal value, a base function, or an input variable, with mapping functions applied.
- **Output** column: the target variable of each row; target variables can be used in subsequent input rows.

A transform expression is several mapping functions chained in series or nested. The editor shows a validation error under a row when the return type of the input source does not match the type of the output target variable, and next to the function or parameter that makes an expression invalid.

### Mapping order

Mappings specified in the **Data Mapping editor** run in sequence from top to bottom, so an output of an earlier row is available for mapping in the later rows.

### Mapping function example

A mapping function applied to a variable, as shown on the Data Mapping task page (it converts the JSON-typed variable `dbIntegers` to an integer array):

```text
dbIntegers.TO_INT_ARRAY()
```

## Notes

- Quotas and limits: https://docs.cloud.google.com/application-integration/docs/quotas.
- Snippet taken from https://docs.cloud.google.com/application-integration/docs/configure-data-mapping-task
- Source: https://docs.cloud.google.com/application-integration/docs/configure-data-mapping-task (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/application-integration/docs/data-mapping-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-data-mapping-task.md](./configure-data-mapping-task.md)
- [data-mapping-functions-reference.md](./data-mapping-functions-reference.md)
- [configure-data-transformer-script-task.md](./configure-data-transformer-script-task.md)
- [data-transformer-functions-reference.md](./data-transformer-functions-reference.md)
