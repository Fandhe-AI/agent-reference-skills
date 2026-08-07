# Input\<T\> (interfaces.Input)

Generic type wrapper for a typed input value declared on a script's data type, exposed to the editor's Inputs panel.

## Signature / Usage

```lua
type MyNode = {
  speed: Input<number>,
  title: Input<string>,
  enabled: Input<boolean>,
  onReset: Input<Trigger>,
}

return function(): Node<MyNode>
  return {
    speed = 1,
    title = 'Rive so coooool!',
    enabled = false,
    onReset = function() end,
  }
end
```

## Notes

- `Input<T>` accepts primitive types (`number`, `string`, `boolean`), `Color`, `Trigger`, `Data.<ViewModelName>`, and `Artboard<Data.<ViewModelName>>` — see [script-inputs.md](./script-inputs.md) for the full pattern including `late()`.

## Related

- [script-inputs.md](./script-inputs.md)
- [interface-trigger.md](./interface-trigger.md)
