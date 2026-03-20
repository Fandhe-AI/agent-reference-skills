# Pino — API

| Name | Description | Path |
|------|-------------|------|
| `pino()` | エクスポート関数 `pino([options], [destination]) => logger` の概要 | [./pino-function.md](./pino-function.md) |
| `options` | `pino()` に渡す全オプションプロパティ（name, level, transport, serializers 等） | [./options.md](./options.md) |
| `destination` | `pino()` の第2引数 destination パラメータと metadata | [./destination.md](./destination.md) |
| Logging Method Parameters | ログメソッドのパラメータ仕様（mergingObject, message, interpolationValues, Errors） | [./logging-method-parameters.md](./logging-method-parameters.md) |
| Logger Instance | Logger インスタンスのログメソッド（trace, debug, info, warn, error, fatal, silent） | [./logger-instance.md](./logger-instance.md) |
| `logger.child()` | 子ロガーの作成（bindings, options） | [./logger-child.md](./logger-child.md) |
| Logger Methods | bindings, setBindings, flush, level, isLevelEnabled, levels 等のメソッド・プロパティ | [./logger-methods.md](./logger-methods.md) |
| Statics | pino.destination, pino.transport, pino.multistream, stdSerializers 等の静的メソッド | [./statics.md](./statics.md) |
| Interfaces & Types | MultiStreamRes, StreamEntry, DestinationStream, Level, TypeScript 型定義 | [./interfaces-and-types.md](./interfaces-and-types.md) |
