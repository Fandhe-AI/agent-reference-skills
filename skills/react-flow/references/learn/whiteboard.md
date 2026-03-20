# Whiteboard

React Flow is primarily designed for node-based UIs, but it can be extended with common whiteboard capabilities such as freehand drawing, lasso selection, erasing, and rectangle drawing.

## 詳細説明

### Available Whiteboard Features

| Feature | Description | Notes |
|---------|-------------|-------|
| **Freehand Draw** | Smooth curve drawing; converts paths to custom nodes | Pro feature (subscription required) |
| **Lasso Selection** | Freeform selection of multiple elements | Supports partial selection |
| **Eraser** | Remove elements by collision-based erasing | Uses custom node/edge types |
| **Rectangle Draw** | Click-and-drag rectangle creation for grouping | Produces background container nodes |

### For Complete Whiteboard Applications

If you need a full whiteboard product (shapes, collaboration, export), consider dedicated libraries such as **tldraw** or **Excalidraw** instead of building on top of React Flow.

## コード例

### Lasso selection — core pattern

```tsx
import { useState, useRef, useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import getStroke from 'perfect-freehand';
import { getSvgPathFromStroke } from './utils';

function LassoSelector() {
  const [partial, setPartial] = useState(false);
  const [isLassoActive, setIsLassoActive] = useState(true);
  const points = useRef<[number, number][]>([]);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isLassoActive) return;
      points.current.push([e.clientX, e.clientY]);

      const nextPoints = getStroke(points.current);
      // Collision detection using Canvas Path2D
      const path = new Path2D(getSvgPathFromStroke(nextPoints));

      // Check if point is inside the lasso path
      // ctx.current.isPointInPath(path, x, y)
    },
    [isLassoActive],
  );

  return (
    <div onPointerMove={handlePointerMove as any}>
      {/* ReactFlow canvas */}
    </div>
  );
}
```

### Eraser — custom node type pattern

```tsx
import { type NodeProps } from '@xyflow/react';

// Define erasable node type
function ErasableNode({ id, data }: NodeProps) {
  return (
    <div data-erasable-node-id={id}>
      {data.label}
    </div>
  );
}

// In nodeTypes:
const nodeTypes = {
  'erasable-node': ErasableNode,
};

// Track pointer position and delete nodes within eraser radius
const handlePointerMove = (e: PointerEvent) => {
  // Detect collision between eraser circle and erasable nodes
  // Call deleteElements() on matches
};
```

### Rectangle draw — state pattern

```tsx
import { useState, useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

function RectangleDrawer() {
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const { screenToFlowPosition, addNodes } = useReactFlow();

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      setStartPoint(screenToFlowPosition({ x: e.clientX, y: e.clientY }));
    },
    [screenToFlowPosition],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!startPoint) return;
      const endPoint = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      addNodes({
        id: String(Date.now()),
        type: 'rectangle',
        position: startPoint,
        style: {
          width: Math.abs(endPoint.x - startPoint.x),
          height: Math.abs(endPoint.y - startPoint.y),
          backgroundColor: 'rgba(0,0,255,0.1)',
        },
        data: {},
      });
      setStartPoint(null);
    },
    [startPoint, addNodes, screenToFlowPosition],
  );

  return <div onPointerDown={onPointerDown} onPointerUp={onPointerUp} />;
}
```

## 注意点

- **Freehand Draw is a Pro feature** and requires a React Flow Pro subscription
- Lasso selection uses `Path2D` and `CanvasRenderingContext2D.isPointInPath()` for collision detection — "partial" selection includes nodes where any corner falls within the path; full selection requires all corners inside
- The eraser uses custom node/edge types (`erasable-node`, `erasable-edge`) to identify deletable elements via pointer collision
- For full-featured whiteboard products (shapes, export, extensive drawing tools), use **tldraw** or **Excalidraw** rather than building these capabilities from scratch

## 関連

- [multiplayer.md](./multiplayer.md)
- [layouting.md](./layouting.md)
