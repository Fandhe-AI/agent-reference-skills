# @event

Modifier tag that classifies a reflection into the "Events" group. Equivalent to specifying `@group Events`.

## Signature / Usage

```
/** @event */
```

`@event` marks a class property or method as an event-related member and automatically places it in the "Events" group of the generated documentation. It acts as a shorthand for `@group Events`.

Used in event-driven classes (especially those extending `EventEmitter`) to clearly classify event-related members in the documentation.

```typescript
export class App extends EventEmitter {
    /**
     * Event fired when a request is received.
     * @event
     */
    static ON_REQUEST = "request";
}
```

```typescript
import { EventEmitter } from "events";

export class Server extends EventEmitter {
    /**
     * Event fired when the server starts.
     * @event
     */
    static STARTED = "started";

    /**
     * Event fired on connection.
     * @event
     */
    static CONNECTION = "connection";

    /**
     * Event fired on error.
     * @event
     */
    static ERROR = "error";
}
```

## Notes

- Equivalent shorthand for `@group Events`
- Automatically groups the member under the "Events" section in the documentation

## Related

- [@eventProperty](./eventProperty.md)
- [@group](../tags-block/group.md)
