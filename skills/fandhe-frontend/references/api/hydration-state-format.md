# ハイドレーション状態フォーマット

`fandhe-frontend-wasm-full` のハイドレーション状態注入フォーマット。DOM 属性エンコード方式を規定する（REQ-11 対応）。

## Signature / Usage

```rust
fn read_hydration_attrs(root: &web_sys::Element) -> Vec<(String, String)>
fn restore_state<C: Hydrate>(attrs: &[(String, String)]) -> Result<C, HydrateError>
```

`restore_state` は DOM に依存しない純粋関数で、`C::from_hydration_attrs(attrs)` へ委譲する。パース失敗時は `HydrateError::InvalidValue` を返す。

## 属性フォーマット

| 型 | 属性値表現 | エンコード | デコード |
| --- | --- | --- | --- |
| 数値（i64相当） | 10進文字列 | `i64::to_string()` | `str::parse::<i64>()` |
| 文字列 | そのまま格納 | 変換不要 | 変換不要 |
| 文字列配列 | Unit Separator（U+001F）前置区切り＋バックスラッシュエスケープ | `codec::encode_list` | `codec::decode_list` |

## Notes

- 属性命名規約はプレフィックス `data-hydrate-`（`fandhe_frontend_interactive::HYDRATE_ATTR_PREFIX` を単一の真実として利用）。形式は `data-hydrate-<field>`、`<field>` は ASCII 小文字英数字とハイフンのみ
- codec エスケープ規約: 各項目前に Unit Separator（U+001F）を前置。`\ → \\`、`\u{1f} → \u` にエスケープ。空リスト（`""`）と空文字列1件（`"\u{1f}"` のみ）は区別可能
- 対象型は「単純な値」に制約される（REQ-11 受け入れ基準）
- `unwrap()` 使用は禁止で、`Result` ベースのエラーハンドリングを行う
- U+001F は HTML 属性内で素通し（ブラウザはそのまま保持する）
- 属性値は改ざん可能な信頼できないクライアント入力として扱う
- `HydrateError` 発生時は初期状態への CSR 再描画へフォールバックする
- 巨大属性値の上限（DoS 耐性）: `fandhe-frontend-wasm-full` 0.7.1 で `hydration::MAX_ATTR_VALUE_LEN: usize = 65_536`（64 KiB）として実装済み。上限超過の属性値は `filter_hydration_attrs` により欠損扱いとしてフィルタされ、`restore_state` は当該フィールド欠損として扱われる（panic ではなく CSR 再描画へのフォールバックに合流する）
- JSON 等の追加依存は導入しない。エラーメッセージは英語で内部情報を含めない
- 公式設計書（`docs/api/hydration-state-format.md`）は対象型を数値・文字列・文字列配列の 3 種に限り、ネスト構造等の一般化をイシュー #163 へ引き継いでいた。`fandhe-frontend-interactive` 0.2.7 では `codec::Value`（`Str` / `Int` / `Bool` / `List` / `Map`）と `encode_value` / `decode_value`（ネスト深さ上限 `MAX_VALUE_DEPTH` = 32、`ValueDecodeError`）が提供されている（[状態管理 API](./interactive-api.md) 参照）。上記の表は 3 種の基本フォーマットを指す
- `fandhe-frontend-wasm-full` 0.46.0 の `src/hydration.rs` と突合済み: `pub const MAX_ATTR_VALUE_LEN: usize = 64 * 1024`、`read_hydration_attrs(root: &Element) -> Vec<(String, String)>`(`web_sys` 依存側)、`restore_state<C: Hydrate>(attrs: &[(String, String)]) -> Result<C, HydrateError>`(`C::from_hydration_attrs` へ委譲)。`HYDRATE_ATTR_PREFIX` で始まり値長が `MAX_ATTR_VALUE_LEN` 以下の属性のみが `filter_hydration_attrs` を通過し、超過分は列挙結果から除外される(ログには属性名のみ)

## Related

- [hydrate() API](./hydration-api.md)
- [状態管理 API](./interactive-api.md)
- [ルーター パスマッチング](./router-path-matching.md)
