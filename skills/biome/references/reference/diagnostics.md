# Diagnostics

## 重大度レベル（Diagnostic severity）

重大度は報告方法と CLI の挙動を決める（Error は非 0 終了）。

| レベル | 色 | 説明 |
|-------|-----|------|
| Fatal | 赤 | Biome 内部での予期しないエラー。Error と違い fatal タグが付く |
| Error | 赤 | 対処すべき。発生すると CLI は失敗して終了 |
| Warning | 黄 | 対処推奨。既定では CLI を失敗させない（`--error-on-warnings` で失敗） |
| Information | 緑 | 有用な情報提供。CLI を失敗させない |

### Fatal
赤字。Biome 内部の予期しないエラーを示す。fatal タグを含む。

### Error
赤字。通常は対処が必要。発生時に CLI は失敗して終了する。

### Warning
黄字。通常は対処が必要だが、既定では CLI は失敗しない。

### Information
緑字。有用な文脈を提供する。CLI は失敗しない。

## 診断タグ（Diagnostic tags）

タグは診断に付くメタデータで、クライアントの表示・扱いを変えうる。

| タグ | 説明 |
|------|------|
| Verbose | 既定では非表示。CLI で `--verbose` を渡すと表示 |
| Internal | Biome 内部の予期しないエラー。GitHub にバグ報告推奨 |
| Fixable | 修正が利用可能（lint の code action 等で多用） |
| Deprecated | 廃止されたコード・設定を示す |

### Verbose
既定では非表示。`--verbose` で表示される。

### Internal
Biome 内部の予期しないエラー。遭遇したら GitHub issue で報告する。

### Fixable
修正が利用可能。ユーザーが確認して適用できる code action を伴う lint 診断で一般的。

### Deprecated
旧式で今後使うべきでないコード・設定を示す。

## 診断カテゴリ

- シンプル: `check`
- リンク付き: `lint/a11y/noAccessKey`（ウェブページリンク付き）

## ロケーション情報

- ファイルパス（左上）
- ソースコード（関連行の表示）
- 行・列番号（IDE クリックで該当位置へ）

## アドバイス

診断に付与される追加メッセージ:
- エラー/警告/情報ログ
- コマンドフレーム
- グループ化メッセージ
- コード差分表示
- コードフレーム表示
