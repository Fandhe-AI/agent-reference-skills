# useStateMachineInput

Hook to retrieve a named input from an active state machine, enabling boolean, number, and trigger interactions from React code.

> **Deprecated** — For new projects, prefer [Data Binding](./data-binding.md) with `useViewModelInstance*` hooks.

## Signature / Usage

```ts
useStateMachineInput(
  rive: Rive | null,
  stateMachineName?: string,
  inputName?: string,
  initialValue?: number | boolean
): StateMachineInput | null
```

```tsx
import { useRive, useStateMachineInput } from '@rive-app/react-webgl2';

export default function Example() {
  const { rive, RiveComponent } = useRive({
    src: 'my-animation.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  });

  const hoverInput = useStateMachineInput(rive, 'State Machine 1', 'isHovered');
  const clickTrigger = useStateMachineInput(rive, 'State Machine 1', 'onClick');

  return (
    <RiveComponent
      onMouseEnter={() => hoverInput && (hoverInput.value = true)}
      onMouseLeave={() => hoverInput && (hoverInput.value = false)}
      onClick={() => clickTrigger && clickTrigger.fire()}
    />
  );
}
```

## Options / Props

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `rive` | `Rive \| null` | The `rive` instance returned from `useRive` |
| `stateMachineName` | `string` | Name of the state machine containing the input |
| `inputName` | `string` | Name of the input as defined in the Rive editor |
| `initialValue` | `number \| boolean` | Optional initial value to set on the input |

### StateMachineInput (return value)

| Member | Type | Description |
| --- | --- | --- |
| `name` | `string` (getter) | The input's identifier |
| `value` | `number \| boolean` (getter/setter) | Read or write the current input value |
| `fire()` | `() => void` | Fire a trigger input |

## Notes

- Returns `null` until the `rive` instance is loaded and the state machine is active.
- Use `fire()` for trigger-type inputs; set `value` for boolean or number inputs.
- `useStateMachineInput` is deprecated — new projects should use Data Binding hooks (`useViewModelInstanceBoolean`, `useViewModelInstanceNumber`, `useViewModelInstanceTrigger`, etc.).

## Related

- [useRive](./use-rive.md)
- [Data Binding](./data-binding.md)
