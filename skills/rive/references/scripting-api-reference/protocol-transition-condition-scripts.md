# Transition Condition Scripts

Custom conditions for state machine transitions when built-in comparisons aren't enough — e.g. logic depending on multiple view model properties evaluated together.

## Signature / Usage

```lua
type MyTransitionCondition = {
  context: Context,
}

-- Called once when the script initializes.
function init(self: MyTransitionCondition, context: Context): boolean
  self.context = context
  return true
end

-- Fired every frame while the transition is active.
-- Returning false prevents a transition, true allows it.
function evaluate(self: MyTransitionCondition): boolean
  return false
end

return function(): TransitionCondition<MyTransitionCondition>
  return { init = init, evaluate = evaluate, context = late() }
end
```

## Options / Props

| Lifecycle function | Description |
| --- | --- |
| `init(self, context)` | Runs once on initialization; `context` gives access to the main view model and other data |
| `evaluate(self)` | Runs every frame while the transition is active; should be fast and side-effect free |

## Notes

- Attach: select a Transition → click `+` to add a Condition → select the script.
- Inputs can control the script, but the script cannot write its own inputs; write view model properties via the main view model through `context`, or via View Model Inputs.

## Related

- [interface-transition-condition.md](./interface-transition-condition.md)
