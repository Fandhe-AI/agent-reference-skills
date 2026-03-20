# Accessibility

React Flow provides built-in keyboard navigation and screen reader support to help meet WCAG 2.1 AA accessibility standards.

## 詳細説明

### Key Configuration Props

| Prop | Default | Description |
|------|---------|-------------|
| `nodesFocusable` | `true` | Enables keyboard focus on nodes |
| `edgesFocusable` | `true` | Enables keyboard focus on edges |
| `disableKeyboardA11y` | `false` | Disables keyboard navigation and arrow-key movement |

### Built-in Keyboard Behavior

- **Tab**: Move focus through focusable nodes and edges (receive `tabIndex={0}` and `role="group"`)
- **Enter / Space**: Select the focused element
- **Escape**: Clear selection
- **Arrow keys**: Move selected nodes (when `nodesDraggable` and `nodesFocusable` are both `true`; hold Shift for faster movement)
- **Auto-pan**: Canvas automatically pans to bring focused nodes into view (controlled via `autoPanOnNodeFocus`)

### WCAG 2.1 AA Coverage

- Keyboard operability via Tab, Enter/Space, and arrow-key movement
- Screen reader support via semantic ARIA roles, labels, and role descriptions
- ARIA live regions that announce dynamic updates (e.g., node movements)
- Focus management with contextual keyboard instructions

## コード例

### Custom ARIA role on a node

```tsx
const nodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    ariaRole: 'button',
  },
];

<ReactFlow nodes={nodes} edges={[]} />;
```

### Custom DOM attributes via `domAttributes`

```tsx
const nodes = [
  {
    id: '2',
    data: { label: 'Accessible Node' },
    domAttributes: {
      'aria-roledescription': 'collapsible node',
      tabIndex: 0,
      'data-test-id': 'node-2',
    },
  },
];
```

### Localizing accessibility messages via `ariaLabelConfig`

```tsx
const ariaLabels = {
  'node.a11yDescription.default': 'Press [Enter] to select this node',
  'node.a11yDescription.keyboardDisabled': 'Keyboard navigation is disabled',
};

<ReactFlow nodes={nodes} edges={edges} ariaLabelConfig={ariaLabels}>
  <MiniMap />
  <Controls />
</ReactFlow>;
```

### Available `ariaLabelConfig` keys

- `node.a11yDescription.default`
- `node.a11yDescription.keyboardDisabled`
- `node.a11yDescription.ariaLiveMessage`
- `edge.a11yDescription.default`
- `controls.ariaLabel`
- `controls.zoomIn.ariaLabel`
- `controls.zoomOut.ariaLabel`
- `controls.fitView.ariaLabel`
- `controls.interactive.ariaLabel`
- `minimap.ariaLabel`
- `handle.ariaLabel`

## 注意点

- For full keyboard accessibility, ensure both `nodesFocusable` and `edgesFocusable` are `true`
- Do not set `ariaRole: 'button'` on custom nodes that contain interactive elements; apply ARIA roles directly to the interactive elements inside instead
- Screen readers announce messages in the language provided via `ariaLabelConfig`

## 関連

- [typescript.md](./typescript.md)
- [testing.md](./testing.md)
