# TypeDoc — Programmatic API

TypeDoc をプログラマティックに使用するための主要クラス・インターフェース。

| Name | Description | Path |
|------|-------------|------|
| `Application` | メインクラス（convert, generateDocs, generateJson, bootstrap） | [./application.md](./application.md) |
| `Converter` | TypeScript → Reflection 変換（イベント, シンボル解決） | [./converter.md](./converter.md) |
| `Renderer` | Reflection → HTML 出力（テーマ, ルーター, hooks） | [./renderer.md](./renderer.md) |
| `Reflections` | Reflection 階層（Project, Declaration, Signature, Parameter, TypeParameter） | [./reflections.md](./reflections.md) |
| `Types` | Type 階層（18種: Reference, Union, Intersection, Literal 等） | [./types.md](./types.md) |
| `Options API` | Options クラス・プログラマティックなオプション操作 | [./options-api.md](./options-api.md) |
| `Events` | Event システム（EventDispatcher, Converter/Renderer/Serializer イベント） | [./events.md](./events.md) |
| `Serialization` | Serializer / Deserializer / JSONOutput インターフェース | [./serialization.md](./serialization.md) |
