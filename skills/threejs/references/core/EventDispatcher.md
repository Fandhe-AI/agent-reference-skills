# EventDispatcher

Provides a standard event system for custom JavaScript classes. Most Three.js classes (including `Object3D`) extend `EventDispatcher`.

## Signature / Usage

```js
class Car extends THREE.EventDispatcher {
  start() {
    this.dispatchEvent({ type: 'start', message: 'vroom!' });
  }
}

const car = new Car();
car.addEventListener('start', (event) => {
  console.log(event.message);
});
car.start();
```

## Constructor

```js
new EventDispatcher()
```

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `addEventListener` | `(type: string, listener: Function): void` | Register a listener for an event type |
| `removeEventListener` | `(type: string, listener: Function): void` | Remove a registered listener |
| `hasEventListener` | `(type: string, listener: Function): boolean` | Check if a listener is registered |
| `dispatchEvent` | `(event: Object): void` | Fire an event; `event.type` must be set |

## Notes

- `event` passed to `dispatchEvent` must have a `type` string property. Any additional properties are forwarded to listeners.
- Use `extends EventDispatcher` pattern; do not instantiate directly unless building a standalone event emitter.
