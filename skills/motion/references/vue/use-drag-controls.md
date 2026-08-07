# useDragControls

Manually initiates drag gestures from any pointer event, rather than only from direct interaction with a draggable component.

## Signature / Usage

```javascript
import { useDragControls, motion } from "motion-v"

const controls = useDragControls()
```

```vue
<motion.div drag :drag-controls="controls" />
<div @pointerdown="(event) => controls.start(event)" />
```

## Options / Props

| Feature | Implementation |
|---------|-----------------|
| Snap to cursor | Pass `{ snapToCursor: true }` to `start()` |
| Touch support | Apply `style="touch-action: none"` to the trigger element |
| Disable auto-drag | Set `:drag-listener="false"` on the motion component |

## Notes

- By default, drag gestures apply only positional changes, not absolute positioning.

## Related

- [motion](./motion.md)
- [gestures](./gestures.md)
