# API

| Name | Description | Path |
|------|-------------|------|
| Destination | The `destination` parameter is the second optional argument to `pino()`. It controls where log output is written, supporting file descriptors, file paths, streams, and SonicBoom instances. | [destination.md](./destination.md) |
| Interfaces and Types | TypeScript interfaces, types, and module augmentation capabilities provided by Pino. | [interfaces-and-types.md](./interfaces-and-types.md) |
| logger.child() | The `logger.child` method creates stateful child loggers where key-value pairs are pinned to the logger and output on every log line. | [logger-child.md](./logger-child.md) |
| Logger Instance | The logger instance is the object returned by the main exported `pino()` function. Its primary purpose is to provide logging methods. | [logger-instance.md](./logger-instance.md) |
| Logger Methods and Properties | Additional methods and properties available on the logger instance beyond the core logging methods. | [logger-methods.md](./logger-methods.md) |
| Logging Method Parameters | Each logging method (`trace`, `debug`, `info`, `warn`, `error`, `fatal`) shares the same signature and parameter behavior. | [logging-method-parameters.md](./logging-method-parameters.md) |
| Options | The `options` object is the first optional parameter to the `pino()` function. It controls all aspects of logger behavior including log levels, formatting, serialization, redaction, and more. | [options.md](./options.md) |
| pino() Function | The exported `pino` function is the main entry point for creating a Pino logger instance. It accepts two optional parameters and returns a logger. | [pino-function.md](./pino-function.md) |
| Statics | Static methods and properties available on the exported `pino` function itself (not on logger instances). | [statics.md](./statics.md) |
