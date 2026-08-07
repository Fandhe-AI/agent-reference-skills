# Artboards

Select which artboard to render at runtime via the `artboard` prop or `useRive` parameter.

## Signature / Usage

```tsx
// With the <Rive> component
export const Simple = () => (
  <Rive src="https://cdn.rive.app/animations/vehicles.riv" artboard="Truck" />
);

// With the useRive hook
export default function Simple() {
  const { RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    artboard: 'Truck',
    autoplay: true,
  });

  return <RiveComponent />;
}
```

## Notes

- If no `artboard` is given, the [default artboard](https://rive.app/docs/editor/fundamentals/artboards#default-state-machine) set in the Rive editor is used; if no default exists, the first artboard loads.
- Only one artboard can be rendered at a time.

## Related

- [useRive](./use-rive.md)
- [Overview](./overview.md)
