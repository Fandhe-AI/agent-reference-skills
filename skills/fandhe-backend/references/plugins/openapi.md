# openapi

OpenAPI ドキュメント生成プラグイン（TASK-3.1、REQ-3【Must】）。実装本体（`crates/routes` 等）から独立した「ドキュメント専用の薄い関数」に `#[utoipa::path(...)]` を付与し `ApiDoc` に集約する。

- feature 名: `openapi`
- crate 名: `fandhe-backend-plugin-openapi`（crates/plugin-openapi）
- 配線パターン: 非該当（拡張点不使用）。ビルド時生成でランタイム拡張点を使わない。実行時経路は `try_intercept` のパスインターセプト型の静的サービング変種として配線される（`.await` を挟まない同期分岐）

## Signature / Usage

`crates/core` の `openapi` feature 有効時、`Server::openapi()`（フレームワーク固定スキーマ配信）または `Server::openapi_with(doc)`（利用者独自スキーマ、`OpenApiDoc` を渡す）を登録する。両メソッドは排他ではなく後勝ち（最後に呼んだ方が残る）。

```rust,ignore
let doc = OpenApiDoc::from_json(json_bytes)?.with_yaml(yaml_bytes)?;
// Server::openapi_with(doc) へ渡す
```

```rust,ignore
pub const OPENAPI_JSON: &str; // include_str! によるコンパイル時埋め込み
pub const OPENAPI_YAML: &str;

impl OpenApiDoc {
    pub fn from_json(json: impl Into<Vec<u8>>) -> Result<Self, OpenApiDocError>;
    pub fn with_yaml(mut self, yaml: impl Into<Vec<u8>>) -> Result<Self, OpenApiDocError>;
    pub fn json(&self) -> &[u8];
    pub fn yaml(&self) -> Option<&[u8]>;
}
```

## Options / Props

`OpenApiDoc`（利用者独自スキーマ用。`OpenApiDoc::from_json` 経由でのみ構築、検証済み型。型は `OpenApiDoc` のフィールド `json: Vec<u8>` / `yaml: Option<Vec<u8>>` に対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `from_json(json)` | `Vec<u8>`（`impl Into<Vec<u8>>` 引数） | —（必須） | JSON バイト列。構文妥当性 + トップレベルオブジェクトであることを検証（`OpenApiDocError::InvalidJson` / `NotAnObject`） |
| `with_yaml(yaml)` | `Option<Vec<u8>>`（`impl Into<Vec<u8>>` 引数） | `None`（未呼び出し） | YAML バイト列（任意）。非空 + UTF-8 のみ検証（`OpenApiDocError::InvalidYaml`）。意味的検証はしない |

コア側の登録状態は非公開 enum `OpenApiRegistration`（`Disabled`（既定）/ `Embedded` / `Custom(OpenApiDoc)`）で管理される。

## Notes

- `GET /openapi.json` / `GET /openapi.yaml` は既定 `Disabled`（フォールスルー）。明示登録なしに API 構造を公開しない設計判断
- `OpenApiDoc::from_json` の検証は構築時（起動シーケンス内）に一度だけ行い、リクエスト処理経路では再検証しない（fail-closed、実行時コストゼロ）
- 本クレートは独立クレート = プラグイン境界。core / http / routes / 他プラグインのどこからも参照されない限り `utoipa` 系依存は外に現れない
- `from_json(json)` は `OpenApiDoc` 構築時の必須引数であり既定値を持たない（未指定では構築できない）

## Related

- [graphql](./graphql.md)
- [static](./static.md)
