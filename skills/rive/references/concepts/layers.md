# Layers

Independent parallel animation tracks within a single State Machine. Each layer runs its own graph of states and transitions, allowing multiple animations to play simultaneously on the same artboard.

## Signature / Usage

Layers appear as tabs in the Layers panel of the State Machine editor. Each layer has its own Entry, Exit, and Any states.

```text
State Machine
├── Layer 1 (leftmost) — lower priority
│   └── [states & transitions]
├── Layer 2
│   └── [states & transitions]
└── Layer N (rightmost) — highest priority
```

## Notes

- Each layer plays **one animation at a time**, but multiple layers run concurrently, enabling animation blending.
- When layers control the same object properties, the **rightmost layer takes priority**.
- Use layers to separate concerns: e.g., a background animation in Layer 1, character interaction logic in Layer 2.
- **Managing layers:**
  - Add: click `+` in the Layers tab
  - Reorder: drag and drop
  - Right-click options: Delete, Duplicate, Disable/Enable
- The Exit State in a layer stops only that layer; other layers continue running.

## Related

- [State Machine](./state-machine.md)
- [States](./states.md)
