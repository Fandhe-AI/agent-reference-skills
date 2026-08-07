# Best Practices

Performance and usage considerations for Rive in React.

## Signature / Usage

```jsx
function RiveAnimation() {
  const { RiveComponent } = useRive({
    src: '/animation.riv',
    stateMachines: 'State Machine 1',
  });

  return <RiveComponent />;
}
```

## Notes

- Keep the `useRive` hook and its returned `<RiveComponent />` together in a dedicated wrapper component.
- Rive creates an instance when the component mounts, and that instance is tied to the underlying `<canvas>` element; if React repeatedly unmounts or recreates that canvas, the animation may restart, disappear, or fail to display as expected.
- Collocating the hook with its returned component in a single wrapper prevents unnecessary canvas recreation caused by parent re-renders.

## Related

- [useRive](./use-rive.md)
- [Overview](./overview.md)
