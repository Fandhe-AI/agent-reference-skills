# Node Scripts

Node scripts render shapes, images, text, artboards, and other content within Rive scenes. They are added to the scene as a scene-tree Node.

## Signature / Usage

```lua
type MyNode = {}

function init(self: MyNode): boolean
  return true
end

function advance(self: MyNode, seconds: number): boolean
  return false
end

function update(self: MyNode) end

function draw(self: MyNode, renderer: Renderer) end

return function(): Node<MyNode>
  return {
    init = init,
    advance = advance,
    update = update,
    draw = draw,
  }
end
```

Instantiating a component (Artboard) at runtime uses `instance()` on an `Input<Artboard<...>>`:

```lua
type Enemy = { artboard: Artboard<Data.Enemy>, position: Vector }

export type MyGame = {
  enemy: Input<Artboard<Data.Enemy>>,
  enemies: { Enemy },
}

function createEnemy(self: MyGame)
  local enemy = self.enemy:instance()
  table.insert(self.enemies, { artboard = enemy, position = Vector.xy(0, 0) })
end

function init(self: MyGame)
  createEnemy(self)
  return true
end

function advance(self: MyGame, seconds: number)
  for _, enemy in self.enemies do
    enemy.artboard:advance(seconds)
  end
  return true
end

function draw(self: MyGame, renderer: Renderer)
  for _, enemy in self.enemies do
    renderer:save()
    enemy.artboard:draw(renderer)
    renderer:restore()
  end
end

return function(): Node<MyGame>
  return { init = init, advance = advance, draw = draw, enemy = late(), enemies = {} }
end
```

## Options / Props

| Lifecycle function | Description |
| --- | --- |
| `init(self)` | Called once when the script initializes; returns a boolean |
| `advance(self, seconds)` | Called every frame to advance the simulation with elapsed time |
| `update(self)` | Called when any input value changes |
| `draw(self, renderer)` | Called every frame (after advance) to render content |
| `pointerDown` / `pointerMove` / `pointerUp` / `pointerExit` | Optional pointer event handlers, see [pointer-events.md](./pointer-events.md) |

## Notes

- Fixed-Step Advancement: process simulation updates in uniform time increments (not frame-dependent) to keep movement consistent across varying frame rates.
- Instantiating components requires understanding Data Binding, Components, and Script Inputs together.

## Related

- [path.md](./path.md)
- [renderer.md](./renderer.md)
- [pointer-events.md](./pointer-events.md)
- [protocol-layout-scripts.md](./protocol-layout-scripts.md)
