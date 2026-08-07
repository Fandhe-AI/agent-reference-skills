# @eventProperty

Modifier tag that classifies a reflection into the "Events" group. Equivalent to specifying `@group Events`. Conforms to the TSDoc specification.

## Signature / Usage

```
/** @eventProperty */
```

Like `@event`, `@eventProperty` places the documented member into the "Events" group. It is a tag defined by the TSDoc specification and acts as a shorthand for `@group Events`.

It is functionally equivalent to `@event`, but projects that follow the TSDoc standard may prefer this tag.

```typescript
export class App extends EventEmitter {
    /**
     * Event fired when a request is received.
     * @eventProperty
     */
    static ON_REQUEST = "request";
}
```

```typescript
import { EventEmitter } from "events";

export class WebSocket extends EventEmitter {
    /**
     * Message received event.
     * @eventProperty
     */
    static MESSAGE = "message";

    /**
     * Connection closed event.
     * @eventProperty
     */
    static CLOSE = "close";
}
```

## Notes

- A tag defined by the TSDoc specification
- Functionally equivalent to `@event`
- Acts as a shorthand for `@group Events`

## Related

- [@event](./event.md)
- [@group](../tags-block/group.md)
