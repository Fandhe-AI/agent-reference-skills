# Trigger (interfaces.Trigger)

A function-typed input that triggers an action when invoked.

## Signature / Usage

```lua
type MyNode = {
  onReset: Input<Trigger>,
}

return function(): Node<MyNode>
  return {
    onReset = function() end,
  }
end
```

## Notes

- This is the `Input<Trigger>` script-input function type. Distinct from `PropertyTrigger` (see [property.md](./property.md)), the view-model trigger property fired via `:fire()`.

## Related

- [interface-input.md](./interface-input.md)
- [property.md](./property.md)
