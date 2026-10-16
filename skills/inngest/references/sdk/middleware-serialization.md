# Custom Serialization Middleware

Preserves non-JSON types (`Date`, `Map`, `Set`, custom classes) across step output, function output and event data by converting them to a JSON-safe format on the way out and restoring them on the way in.

## Signature / Usage

```ts
import { Middleware } from "inngest";
import type { Jsonify } from "inngest/types";

const MARKER = "__date__";
type Serialized = { [MARKER]: true; value: string };

class DateSerializerMiddleware extends BaseSerializerMiddleware<Serialized> {
  readonly id = "date-serializer";

  // Tell TypeScript that Date objects are preserved in step/function output
  declare stepOutputTransform: PreserveDate;
  declare functionOutputTransform: PreserveDate;

  protected needsSerialize(value: unknown): boolean {
    return value instanceof Date;
  }
  protected serialize(value: unknown): Serialized {
    return { [MARKER]: true, value: (value as Date).toISOString() };
  }
  protected isSerialized(value: unknown): value is Serialized {
    return isRecord(value) && MARKER in value;
  }
  protected deserialize(value: Serialized): Date {
    return new Date(value.value);
  }
}

// Higher-kinded type used to transform step / function return types
interface PreserveDate extends Middleware.StaticTransform {
  Out: _PreserveDate<this["In"]>;
}

const inngest = new Inngest({ id: "my-app", middleware: [DateSerializerMiddleware] });
```

`BaseSerializerMiddleware`, `isRecord` and `_PreserveDate` are not SDK exports; copy them from the official page (source below).

## Options / Props

| Name (lifecycle hook used by a serializer middleware) | Description |
|------|-------------|
| wrapStepHandler / wrapFunctionHandler | Serialize output before it is sent to Inngest. |
| wrapStep | Deserialize memoized step data returned to your function. |
| transformFunctionInput | Deserialize event data before the handler runs. |
| transformSendEvent | Serialize event data before it is sent to Inngest. |
| transformStepInput | Serialize `step.invoke` input before it is sent to the server. |

Methods to implement in a `BaseSerializerMiddleware` subclass: `serialize`, `deserialize`, `needsSerialize`, `isSerialized`. Set `recursive = false` to serialize top-level values only.

## Notes

- Inngest sends step output, function output and event data as JSON; non-JSON types are otherwise lost. `Jsonify` is the default type-level transform for that boundary.
- `BaseSerializerMiddleware` will eventually become a first-class SDK part; for now it is a pattern to copy into your codebase (abstract class that recursively walks records and arrays and calls the four methods, implementing the hooks above).
- Register at client level (`middleware: [...]` on `new Inngest`) for all functions, or at function level (`middleware: [...]` in `createFunction` options) for specific functions.
- Multiple serializers can be registered together; each uses a unique marker key so they do not conflict. The official page shows a `Set` serializer following the same pattern (`__set__` marker).

## Related

- [Middleware](./middleware.md)
- [Inngest Client](./inngest-client.md)
- [TypeScript Types](./typescript-types.md)
