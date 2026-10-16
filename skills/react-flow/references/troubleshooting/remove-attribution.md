# Remove Attribution

React Flow shows a "React Flow" attribution at the bottom-right of the pane by default. This guide describes how to hide it via the `proOptions` prop.

## Signature / Usage

Pass `hideAttribution: true` through the `proOptions` prop.

```tsx
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Please only hide the attribution if you are subscribed to React Flow Pro
// https://reactflow.dev/pro
const proOptions = { hideAttribution: true };

function Flow({ defaultNodes, defaultEdges }) {
  return (
    <ReactFlow
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      proOptions={proOptions}
    />
  );
}
```

## Notes

- React Flow is MIT-licensed, but the maintainers fund the library through Pro subscriptions. Hide the attribution only if you subscribe to React Flow Pro (https://reactflow.dev/pro). Organizations earning revenue with React Flow should consider a Pro subscription; if you start commercial use later, re-add the attribution or subscribe.
- Define the `proOptions` object outside the component or memoize it (do not recreate it on every render).
- Removal for personal / non-commercial projects is not stated in the current official documentation.
- The old URL https://reactflow.dev/learn/troubleshooting/remove-attribution now returns the same content as https://reactflow.dev/remove-attribution (the Pro attribution policy page).
- Current official policy wording (ProOptions page, llms-full.txt): "attribution visible, no subscription needed; no attribution, please subscribe." The /remove-attribution page says "Subscribing to React Flow Pro permits you to remove the attribution from your flows".
- Since @xyflow/react 12.11.4 ([xyflow/xyflow#5962](https://github.com/xyflow/xyflow/pull/5962), "Show log if user hides attribution in development"), hiding the attribution when `NODE_ENV === 'development'` triggers one `console.warn` after about 1 s. Template from [`packages/system/src/utils/attribution.ts`](https://github.com/xyflow/xyflow/blob/%40xyflow/react%4012.12.0/packages/system/src/utils/attribution.ts) (@xyflow/react@12.12.0): `${framework}: It seems like you are hiding the attribution. Please only do this when you are subscribed to ${framework} Pro: https://${library}flow.dev/remove-attr`, followed by `You can ignore this warning if you are subscribed.` Since 12.11.6 ([xyflow/xyflow#5997](https://github.com/xyflow/xyflow/pull/5997)) the warning is also suppressed when the pane is not rendered ("Prevent attribution warning when pane is not rendered either", [CHANGELOG @xyflow/react@12.12.0](https://github.com/xyflow/xyflow/blob/%40xyflow/react%4012.12.0/packages/react/CHANGELOG.md)).
- The code comment in the Attribution component points to https://reactflow.dev/remove-attribution.

## Related

- [./common-errors.md](./common-errors.md)
- [../types/ProOptions.md](../types/ProOptions.md)
