---
source: https://docs.cloud.google.com/application-integration/docs/configure-data-transformer-script-task
---

# Data Transformer task

The Data Transformer task transforms data in two modes: Diagram (visual mapping canvas, the Data Transformer editor) and Script (write, edit and evaluate custom Jsonnet templates). Use Script mode for complex transformations and Jsonnet functions.

## Signature / Usage

### Add the task

In the integration editor click **Tasks**, place the **Data Transformer** element, select it, and click **Open Data Transformer editor**. **Diagram** mode opens by default; click **Script** for Jsonnet. Script mode shows a default commented Jsonnet template; changes are autosaved.

### Diagram mode

- **+ Add input**: pick existing variables (or **+ Add New Variable**) on the **Variable** tab, or add a constant on the **Constant** tab (identifier, data type String / Boolean / Number, value). Constants are visible only inside the Data Transformer task where they are created, and are not accessible to other tasks or triggers.
- **+ Add Output**: pick or create the output variable.
- Map input variables or subfields to output variables. To add a transformation, hover over the mapping line and click, or use **Add transformation**, then **+ Add Operation**; search an operation or choose **Function expression** for a custom operation. Several operations can be chained, and the **Previous Operation Result** variable feeds one operation into the next.
- Several input variables can map to one transformation, but only one mapping can be added for each output variable from a transformation function.

### Script mode

The **Data Transformer Script editor** provides syntax highlighting, indentation, line numbering, a minimap and click-to-copy. It imports the predefined custom library `functions` by default. Read an existing integration variable with the `extVar` function of that library:

```jsonnet
local f = import "functions"; // Import predefined Data Transformer function library

local str1 = f.extVar("inputVar1"); // Access integration input variable "Inputstr1" with value "Hello"
local str2 = f.extVar("inputVar2"); // Access integration input variable "Inputstr2" with value "World"
{
  OutputVar: str1 + " " + str2 + "!", // Write to Jsonnet output variable "OutputVar"
  "output-str-var": str1 + " Integration " + str2 + "!", // Write to Jsonnet output variable "output-str-var"
}
```

## Notes

- Jsonnet does not allow a hyphen (`-`) in an identifier (variable or function name); a name containing a hyphen must be declared in double quotes, as `"output-str-var"` above.
- In the official example the comments refer to "Inputstr1" / "Inputstr2" while the `extVar` names are `inputVar1` / `inputVar2`; the code is kept verbatim.
- The source tags this block `json`, but it is a Jsonnet program (with comments), so it is tagged `jsonnet` here.
- Jsonnet is purely functional; programs are expressions (see https://jsonnet.org/ref/language.html#expressions).
- When creating an integration, the service-account option appears only if integration governance is enabled for the selected region; the Regions list shows only provisioned regions.
- An error handling strategy for the task specifies the action to take if the task fails due to a temporary error (https://docs.cloud.google.com/application-integration/docs/error-handling-strategy). Usage limits for the task: https://docs.cloud.google.com/application-integration/docs/quotas#usage-limits.
- Omitted: the legacy-ticket-system example (Diagram-mode screenshots only) and the Console click-paths, which are summarized above.
- Source: https://docs.cloud.google.com/application-integration/docs/configure-data-transformer-script-task (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [data-mapping-overview.md](./data-mapping-overview.md)
- [data-transformer-functions-reference.md](./data-transformer-functions-reference.md)
- [configure-data-mapping-task.md](./configure-data-mapping-task.md)
