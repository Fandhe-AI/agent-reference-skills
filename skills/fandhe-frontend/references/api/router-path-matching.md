# ルーター パスマッチング

`fandhe_frontend_app::router::Router` が実装する v1 パスマッチング仕様。SSR・SSG・CSR で共有される（REQ-7 対応）。

## マッチング仕様

| 項目 | 挙動 |
| --- | --- |
| パターン開始 | `/` から始まる必要がある。違反時は `RouterError::MissingLeadingSlash` |
| セグメント一致 | セグメント単位の完全一致 |
| パスパラメータ | `:name` は空でない1セグメントを捕捉し `Params` へ格納 |
| 優先度規則 | 登録順の先勝ち。同一パターン重複時は最初が有効 |
| クエリ文字列 | `?` 以降は照合前に切り落とす |
| 末尾スラッシュ | 正規化しない厳格一致（`/items/1/` と `/items/1` は別物） |
| 連続スラッシュ | 空セグメントとして扱われ、一致しない |
| パラメータ値 | URL デコードしない生文字列で保持 |

## エラー

| エラー | 発生条件 |
| --- | --- |
| `RouterError::EmptySegment` | 連続スラッシュ検出 |
| `RouterError::EmptyParamName` | コロン直後が空 |
| `RouterError::DuplicateParamName` | パラメータ名重複 |

## Notes

- v1 スコープ外: ワイルドカード、パーセントデコード、HTTP メソッド別ディスパッチ、ネストレイアウト、優先度規則の高度化
- セキュリティ不変条件: パストラバーサル耐性、DoS 耐性、panic 非発生。エスケープ処理はルーター非経由（呼び出し元の責務）

## Related

- [ハイドレーション状態フォーマット](./hydration-state-format.md)
- [fandhe-frontend-headless-ui API](./headless-ui-api.md)
