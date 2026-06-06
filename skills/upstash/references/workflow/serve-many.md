# serveMany() / createWorkflow()

Exposes multiple workflows under a single catch-all route, enabling type-safe workflow invocation via `context.invoke()` without hardcoded URLs.

## Signature / Usage

```typescript
// Next.js: app/serve-many/[...any]/route.ts
import { createWorkflow, serveMany } from "@upstash/workflow/nextjs"

const childWorkflow = createWorkflow<string, string>(async (context) => {
  return await context.run("child-step", () => processData(context.requestPayload))
})

const parentWorkflow = createWorkflow<string>(async (context) => {
  const { body, isFailed } = await context.invoke("invoke-child", {
    workflow: childWorkflow,
    body: context.requestPayload,
  })
  if (isFailed) throw new Error("Child failed")
})

export const { POST } = serveMany({
  "parent-route": parentWorkflow,
  "child-route":  childWorkflow,
})
```

Workflows are accessible at:
- `https://your-app.com/serve-many/parent-route`
- `https://your-app.com/serve-many/child-route`

## Options / Props

### createWorkflow

| Name | Type | Description |
|------|------|-------------|
| `TPayload` | generic | Type of `context.requestPayload` |
| `TReturn` | generic | Return type of the workflow function |
| `routeFunction` | `async (context) => TReturn` | Workflow logic |

### serveMany

| Name | Type | Description |
|------|------|-------------|
| Route map | `Record<string, WorkflowObject>` | Maps URL route segments to workflow objects created with `createWorkflow()` |

## Notes

- `createWorkflow()` defines a workflow object without exposing it as an HTTP endpoint directly; use it when the workflow will be included in a `serveMany` call
- If one workflow needs to invoke another, both must be registered in the same `serveMany` definition
- `context.invoke()` accepts the workflow object directly — no URL needed, ensuring type-safe invocation
- Other frameworks have example implementations in the [workflow-js repository](https://github.com/upstash/workflow-js/tree/main/examples)

## Related

- [context.invoke](./context-invoke.md)
- [serve](./serve.md)
