# Script Inputs

Scripted Inputs bridge scripts and the Rive editor: fields declared on a script's type appear as configurable properties (numbers, colors, booleans, artboards, view models) in the editor's Inputs panel.

## Signature / Usage

```lua
type MyNode = {
  myNumber: Input<number>,
  myColor: Input<Color>,
  -- Expects a View Model instance of type Points
  myViewModel: Input<Data.Points>,
  -- Expects an Artboard whose View Model is Points
  myArtboard: Input<Artboard<Data.Points>>,
  -- Available on self but not shown in the inputs panel
  myString: string,
}

function init(self: MyNode): boolean
  print(self.myNumber, self.myColor)
  return true
end

return function(): Node<MyNode>
  return {
    init = init,
    myString = "Rive for president!",
    myNumber = 0,
    myColor = Color.rgba(255, 255, 0, 255),
    -- late() marks the input as assigned at runtime by the editor
    myViewModel = late(),
    myArtboard = late(),
  }
end
```

## Options / Props

| Concept | Description |
| --- | --- |
| `Input<T>` | Field type wrapper exposing a property to the editor's Inputs panel |
| `late()` | Marks an input as unset in code; the editor or runtime supplies the value |
| `update(self)` | Lifecycle function invoked whenever any input changes |
| `<field>:addListener(fn)` | Registers a callback fired when a specific input field changes |
| Data Binding Inputs | Right-click an input in the sidebar → Data Bind → select a property to drive it at runtime |

## Notes

- Inputs can control scripts, but scripts cannot write back to their own input values; to write to a View Model, use `context:viewModel()` (see [data-binding.md](./data-binding.md)) or a View Model Input.
- A View Model Input's type name is `Data.<ViewModelName>` (e.g. `Data.Character`); nested properties are read as `self.<input>.<propertyName>.value`.

## Related

- [data-binding.md](./data-binding.md)
- [protocol-node-scripts.md](./protocol-node-scripts.md)
- [protocol-layout-scripts.md](./protocol-layout-scripts.md)
