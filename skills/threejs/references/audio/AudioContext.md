# AudioContext

Manages the global audio context in the engine.

## Signature / Usage

```js
AudioContext.getContext() : Window.AudioContext
AudioContext.setContext( value : Window.AudioContext )
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `AudioContext.getContext()` | Window.AudioContext | Returns the global native audio context |
| `AudioContext.setContext( value )` | — | Allows to set the global native audio context from outside; `value` is the native context to set |

## Notes

- Static methods only.
- Source: `src/audio/AudioContext.js`.

## Related

- [AudioListener](./AudioListener.md)
- [Audio](./Audio.md)
