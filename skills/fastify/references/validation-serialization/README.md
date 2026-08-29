# validation-serialization

対象 Fastify v5.12.1。

Fastify の validation / serialization は JSON Schema + Ajv / fast-json-stringify が標準。`zod` はスキーマライブラリ本体（Fastify では type provider 経由で接続）、`react-hook-form` はフォーム側、`kubb` はコード生成側で別物。

| Name | Description | Path |
| --- | --- | --- |
| Schema Basics | body / querystring / params / headers スキーマの基本、content-type 別 body 検証 | [schema-basics.md](./schema-basics.md) |
| Ajv Configuration | Ajv baseline 設定・customOptions・plugins・per-httpPart インスタンス | [ajv-configuration.md](./ajv-configuration.md) |
| Shared Schemas and $ref | addSchema・$ref 解決パターン・getSchemas/getSchema・encapsulation | [schema-refs-shared.md](./schema-refs-shared.md) |
| Response Serialization | response スキーマの status code 別定義・2xx/default・content-type 別 | [response-serialization.md](./response-serialization.md) |
| Validator and Serializer Compilers | setValidatorCompiler/setSerializerCompiler・joi/yup 統合 | [validator-serializer-compiler.md](./validator-serializer-compiler.md) |
| Schema Error Handling | 400 エラー形式・attachValidation・schemaErrorFormatter・ajv-errors/ajv-i18n | [schema-error-handling.md](./schema-error-handling.md) |
| Type Providers | TypeBox / json-schema-to-ts / Zod による型推論、withTypeProvider | [type-providers.md](./type-providers.md) |
| Write Your Own Type Provider | カスタム Type Provider 実装時の型分散の注意点 | [write-type-provider.md](./write-type-provider.md) |
| Fluent Schema | fluent-json-schema によるスキーマ構築・再利用 | [fluent-schema.md](./fluent-schema.md) |
