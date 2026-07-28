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
- 巨大属性値の上限（DoS 耐性）は別タスクで検討中
- JSON 等の追加依存は導入しない。エラーメッセージは英語で内部情報を含めない
- ネスト構造等の複雑な状態一般化はイシュー #163 でスコープ外

## Related

- [hydrate() API](./hydration-api.md)
- [状態管理 API](./interactive-api.md)
- [ルーター パスマッチング](./router-path-matching.md)
