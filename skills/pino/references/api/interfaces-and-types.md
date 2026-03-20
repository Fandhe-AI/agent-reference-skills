# Interfaces and Types

TypeScript interfaces, types, and module augmentation capabilities provided by Pino.

## Interfaces

### `MultiStreamRes`

Properties:

- **`write(data)`**
  - `data`: Object | string
  - Returns: void
  - Write `data` onto the streams held by the current instance.

- **`add(dest)`**
  - `dest`: StreamEntry | DestinationStream
  - Returns: MultiStreamRes
  - Add `dest` stream to the array of streams of the current instance.

- **`flushSync()`**
  - Returns: `undefined`
  - Call `flushSync` on each stream held by the current instance.

- **`lastId`**
  - number
  - The ID assigned to the last stream assigned to the current instance.

- **`minLevel`**
  - number
  - The minimum level amongst all the streams held by the current instance.

- **`remove(id)`**
  - `id`: number
  - Removes a stream from the array of streams of the current instance using its assigned ID.

- **`streams`**
  - Returns: StreamEntry[]
  - The array of streams currently held by the current instance.

- **`clone(level)`**
  - `level`: Level
  - Returns: MultiStreamRes
  - Returns a cloned object of the current instance but with the provided `level`.

### `StreamEntry`

Properties:

- **`stream`**: DestinationStream
- **`level`**: Optional, Level

### `DestinationStream`

Properties:

- **`write(msg)`**
  - `msg`: string

## Types

### `Level`

```typescript
type Level = "fatal" | "error" | "warn" | "info" | "debug" | "trace"
```

## TypeScript

### Module Augmentation

Pino supports TypeScript module augmentation to extend its type definitions. This allows customizing the logging behavior to fit application-specific requirements.

### `LogFnFields` Interface

The `LogFnFields` interface can be augmented to control what fields are allowed in logging method objects. This is useful for:

- Preventing certain fields from being logged (for security or compliance reasons)
- Enforcing specific field types across the application
- Enforcing consistent structured logging

#### Banning Fields

Ban specific fields by setting them to `never`. This prevents users from unintentionally overriding fields already set in the logger's `base` option.

```typescript
declare module "pino" {
  interface LogFnFields {
    service?: never;
    version?: never;
  }
}

// These will now cause TypeScript errors
logger.info({ service: 'other-api', message: 'success' })   // Error
logger.info({ message: 'success' })     // OK
```

#### Enforcing Field Types

Enforce specific types for certain fields:

```typescript
declare module "pino" {
  interface LogFnFields {
    userId?: string;
    requestId?: string;
  }
}

// These will cause TypeScript errors
logger.info({ userId: 123 })           // Error: userId must be string
logger.info({ requestId: null })       // Error: requestId must be string

// This works fine
logger.info({ userId: '123' })     // OK
```

#### Enforcing Structured Logging

Required fields (non-optional) enforce consistent structured logging by requiring specific fields in all log objects:

```typescript
declare module "pino" {
  interface LogFnFields {
    userId: string
  }
}

logger.info({ userId: '123' }) // OK
logger.info({}) // Error: Property 'userId' is missing in type '{}'
```

**Note**: Required fields will cause TypeScript errors when logging certain types like `Error` objects that don't contain the required properties:

```typescript
logger.error(new Error('test')) // Error: Property 'userId' is missing in type 'Error'
```

This ensures that all log entries include required context fields, promoting consistent logging practices.

## Notes

- `MultiStreamRes` is the return type of `pino.multistream()`.
- `StreamEntry` is used in the array passed to `pino.multistream()`.
- `DestinationStream` is the minimal interface a destination must implement (just a `write(msg)` method).
- `LogFnFields` augmentation applies to all log method calls across the application.
- Required (non-optional) fields in `LogFnFields` will conflict with `Error` objects passed directly to log methods.

## Related

- [statics - pino.multistream()](./statics.md)
- [destination](./destination.md)
- [options](./options.md)
