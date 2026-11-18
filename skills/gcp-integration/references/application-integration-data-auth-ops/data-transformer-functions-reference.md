---
source: https://docs.cloud.google.com/application-integration/docs/data-transformer-functions-reference
---

# Data Transformer functions reference

The predefined Jsonnet functions available to the Data Transformer Script task. Import the `functions` library in the script to use both the standard Jsonnet functions and the predefined Data Transformer functions. Application Integration supports Jsonnet functions library v0.20.0.

## Signature / Usage

Importing the `functions` library and calling its `extVar` function, as shown on the Data Transformer task page:

```jsonnet
local f = import "functions"; // Import predefined Data Transformer function library

local str1 = f.extVar("inputVar1"); // Access integration input variable "Inputstr1" with value "Hello"
local str2 = f.extVar("inputVar2"); // Access integration input variable "Inputstr2" with value "World"
{
  OutputVar: str1 + " " + str2 + "!", // Write to Jsonnet output variable "OutputVar"
  "output-str-var": str1 + " Integration " + str2 + "!", // Write to Jsonnet output variable "output-str-var"
}
```

## Options / Props

| Function group | Description |
|---|---|
| Array functions | Functions that operate on arrays. |
| Aggregate functions | Functions that operate on multiple values. |
| Hash functions | Functions that compute hash values. |
| JSON functions | Functions that operate on JSON values. |
| Mathematical functions | Functions that perform mathematical operations. |
| String functions | Functions that operate on string values. |
| Timestamp functions | Functions that operate on timestamp values. |
| Utility functions | Functions that perform utility operations. |
| XML functions | Functions that perform XML operations. |
| Miscellaneous functions | Functions that perform miscellaneous operations. |

## Notes

- The source lists only the ten function groups; each group has its own page under `https://docs.cloud.google.com/application-integration/docs/reference/data-transformer-reference/` (for example `array-functions-reference`), not covered here.
- Standard Jsonnet functions are documented at https://jsonnet.org/ref/stdlib.html.
- Jsonnet is purely functional; programs are composed of expressions (https://jsonnet.org/ref/language.html#expressions).
- The snippet is kept verbatim, including its comments, which name "Inputstr1" while the variable is `inputVar1`. The source tags it `json`; it is a Jsonnet program and is tagged `jsonnet` here.
- Snippet taken from https://docs.cloud.google.com/application-integration/docs/configure-data-transformer-script-task
- Source: https://docs.cloud.google.com/application-integration/docs/configure-data-transformer-script-task (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/application-integration/docs/data-transformer-functions-reference (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-data-transformer-script-task.md](./configure-data-transformer-script-task.md)
- [data-mapping-overview.md](./data-mapping-overview.md)
- [data-mapping-functions-reference.md](./data-mapping-functions-reference.md)
