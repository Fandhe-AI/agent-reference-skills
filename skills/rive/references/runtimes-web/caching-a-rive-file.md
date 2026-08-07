# Caching a Rive File

Load a `.riv` file once and reuse it across multiple `Rive` instances instead of re-fetching per instance.

## Signature / Usage

```javascript
const file = new rive.RiveFile({
  src: 'https://cdn.rive.app/animations/vehicles.riv',
  onLoad: () => {
    const r1 = new rive.Rive({
      riveFile: file,
      canvas: document.getElementById('canvas1'),
      stateMachines: 'Machine',
      autoplay: true,
    });
    const r2 = new rive.Rive({
      riveFile: file,
      canvas: document.getElementById('canvas2'),
      stateMachines: 'Machine',
      autoplay: true,
    });
  },
});
file.init();
```

## Notes

- Advantageous when the same `.riv` file is used in multiple places or multiple times on the same screen.
- Specify the correct state machine or animation name for each instance created from the shared file.
- Call `resizeDrawingSurfaceToCanvas()` on each instance to keep rendering crisp across pixel ratios, and add resize listeners per instance for responsive layouts.

## Related

- [rive-file.md](./rive-file.md)
- [rive-constructor.md](./rive-constructor.md)
