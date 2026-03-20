# Testing

Testing React Flow requires special setup because the library relies on DOM measurement APIs to render edges correctly.

## 詳細説明

React Flow needs to measure DOM elements (via `ResizeObserver`, `DOMMatrixReadOnly`, `offsetHeight`, `offsetWidth`, `getBBox`) that do not exist in Node.js-based test environments.

### Recommended Approach

**Cypress or Playwright** — no additional setup required, as these tools run against a real browser environment.

**Jest** — requires manual mocking of browser APIs that React Flow depends on.

## コード例

### Jest mock setup (`mockReactFlow` utility)

```typescript
class ResizeObserver {
  callback: globalThis.ResizeObserverCallback;

  constructor(callback: globalThis.ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback([{ target } as globalThis.ResizeObserverEntry], this);
  }

  unobserve() {}
  disconnect() {}
}

class DOMMatrixReadOnly {
  m22: number;
  constructor(transform: string) {
    const scale = transform?.match(/scale\(([1-9.])\)/)?.[1];
    this.m22 = scale !== undefined ? +scale : 1;
  }
}

let init = false;

export const mockReactFlow = () => {
  if (init) return;
  init = true;

  global.ResizeObserver = ResizeObserver;
  global.DOMMatrixReadOnly = DOMMatrixReadOnly;

  Object.defineProperties(global.HTMLElement.prototype, {
    offsetHeight: {
      get() {
        return parseFloat(this.style.height) || 1;
      },
    },
    offsetWidth: {
      get() {
        return parseFloat(this.style.width) || 1;
      },
    },
  });

  (global.SVGElement as any).prototype.getBBox = () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
};
```

Call `mockReactFlow()` in a `setupTests` file or within `beforeEach` blocks.

### Disabling drag for mouse event tests

When testing mouse interactions inside custom nodes, disable d3-drag to prevent conflicts:

```tsx
<ReactFlow nodesDraggable={false} panOnDrag={false} {...rest} />
```

## 注意点

- Cypress and Playwright require no additional setup for React Flow
- For Jest, all four browser APIs must be mocked: `ResizeObserver`, `DOMMatrixReadOnly`, `offsetHeight`/`offsetWidth`, `SVGElement.getBBox`
- The `init` guard in `mockReactFlow` prevents double-initialization
- d3-drag does not function correctly outside browser environments; disable it when testing pointer events in custom nodes

## 関連

- [typescript.md](./typescript.md)
- [performance.md](./performance.md)
