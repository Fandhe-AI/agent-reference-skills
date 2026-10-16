# ProOptions

Configuration options for React Flow Pro subscription settings, primarily controlling the attribution badge display.

## Signature / Usage

```tsx
type ProOptions = {
  account?: string;
  /** If you hide the attribution, please support our work with a subscription. */
  hideAttribution: boolean;
};

<ReactFlow
  nodes={nodes}
  edges={edges}
  proOptions={{ hideAttribution: true }}
/>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `account` | `string` | — | Account identifier for Pro subscribers |
| `hideAttribution` | `boolean` (required) | — | If you hide the attribution, please support our work with a subscription. |

## Notes

- By default the React Flow attribution badge (a link to the project) is shown in a corner of the flow.
- Official policy: "We can't legally require you to keep the attribution — React Flow is MIT-licensed — but to keep the library MIT, we need your support. Our policy is simple: attribution visible, no subscription needed; no attribution, please subscribe."
- Since @xyflow/react 12.11.4 (#5962), a one-time `console.warn` is shown in development (`NODE_ENV === 'development'`) when the attribution is hidden (text in `packages/system/src/utils/attribution.ts`).
- Review the [attribution policy](https://reactflow.dev/remove-attribution) before hiding the attribution.

## Related

- [Remove Attribution](../troubleshooting/remove-attribution.md)
