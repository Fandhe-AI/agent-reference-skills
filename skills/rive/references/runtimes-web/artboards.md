# Artboards (Web)

Selecting which artboard to render at runtime.

## Signature / Usage

```javascript
new rive.Rive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    canvas: document.getElementById('canvas'),
    artboard: 'Truck',
    autoplay: true
});
```

## Notes

- If no `artboard` is given, the default artboard set in the Rive editor is used; if no default is set, the first artboard is used.
- Only one artboard can be rendered at a time via the high-level API. Use the low-level API to render multiple artboards on one canvas.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [low-level-api-usage.md](./low-level-api-usage.md)
