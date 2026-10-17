# Referencing Functions

`referenceFunction` creates a reference to an Inngest function for use with `step.invoke()`, to call functions in other apps or to avoid importing a function's dependencies within the same app.

## Signature / Usage

```ts
import { referenceFunction } from "inngest";
import { z } from "zod";
import { type computePi } from "@/inngest/computePi";

// Local reference without importing dependencies
export const computePiRef = referenceFunction<typeof computePi>({
  functionId: "compute-pi",
});

// Reference to a function in another application
export const computeSquare = referenceFunction({
  appId: "my-python-app",
  functionId: "compute-square",
  schemas: {
    data: z.object({ number: z.number() }),
    return: z.object({ result: z.number() }),
  },
});

const square = await step.invoke("compute-square-value", {
  function: computeSquare,
  data: { number: 4 },
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| functionId | string | ID of the function to reference. If `appId` is not provided it is assumed to be a local function ID (the calling app's ID is used). |
| appId | string | App ID the function belongs to. Only required for a function in another app. |
| schemas | object | Optional. `data` and `return` Standard Schemas that type the input and the return value of the invocation. |

## Notes

- The simplest reference has only `functionId`; input and output types are then `unknown`.
- If `schemas` is not provided and no local function type is passed as a generic, schemas are inferred as `unknown`.
- Schemas only provide typing for now; validation of input and output is planned for the future.
- Within the same app, use `referenceFunction<typeof fn>()` with a type-only import to avoid pulling one function's dependencies into another (useful for Next.js, where edge and serverless logic can be colocated).
- Source: https://www.inngest.com/docs-markdown/reference/typescript/v4/functions/references (fetched 2026-10).

## Related

- [Create Function](./create-function.md)
- [Trigger Helpers](./trigger-helpers.md)
