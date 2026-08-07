# Protocols (Overview)

Protocols are the structured categories of scripts that tell the Editor what you're trying to build. Selecting a protocol generates a typed scaffold defining the surface area you're allowed to operate on (paths, shapes, view models, artboards, state machines, timelines) through the lens of that protocol.

## Options / Props

| Protocol | Purpose |
| --- | --- |
| [Node](./protocol-node-scripts.md) | Render shapes, images, text, artboards; custom drawing |
| [Layout](./protocol-layout-scripts.md) | Programmatic control over Layout component measurement/sizing |
| [Converter](./protocol-converter-scripts.md) | Custom data-binding value converters |
| [Path Effect](./protocol-path-effect-scripts.md) | Custom path geometry effects |
| [Transition Condition](./protocol-transition-condition-scripts.md) | Custom state machine transition conditions |
| [Listener Action](./protocol-listener-action-scripts.md) | Custom side effects when a state machine listener fires |
| [Test](./protocol-test-scripts.md) | Unit test Util Scripts |
| [Util](./protocol-util-scripts.md) | Reusable helper modules shared across scripts |

## Notes

- More protocols are planned; this list reflects what ships today.

## Related

- [creating-scripts.md](./creating-scripts.md)
