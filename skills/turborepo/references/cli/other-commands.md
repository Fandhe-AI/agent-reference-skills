# その他のコマンド

## turbo ls

```bash
turbo ls [package(s)] [flags]
```

| オプション | 説明 |
|---|---|
| `--affected` | 影響を受けるパッケージのみ |
| `--output` | `pretty` または `json` |

## turbo scan

> **非推奨**: `turbo scan` は将来のメジャーバージョンで削除予定。実行すると非推奨警告が表示される。

パフォーマンス最適化を設定するインタラクティブコマンド。Git FS Monitor、Remote Caching、バージョンチェック等を設定。

## turbo info

デバッグ情報を表示（バージョン、パス、デーモン状態、パッケージマネージャー、プラットフォーム詳細）。

## turbo devtools

パッケージグラフをブラウザで可視化。

| オプション | デフォルト | 説明 |
|---|---|---|
| `--port` | `9876` | サーバーポート |
| `--no-open` | — | ブラウザ自動起動を無効化 |

## turbo login / logout / link / unlink

```bash
turbo login          # Vercel 認証（デフォルトプロバイダー）
turbo login --manual # マニュアルトークン入力
turbo login --api=https://acme.com/api    # カスタム API エンドポイント
turbo login --sso-team=slug              # SSO チームでログイン
turbo logout         # Remote Cache プロバイダーからログアウト
turbo link           # リモートキャッシュにリンク
turbo link --yes     # 確認プロンプトをスキップ
turbo link --scope=your-team  # スコープ（Vercel ではチームスラッグ）
turbo unlink         # リンク解除
```

## create-turbo

```bash
npx create-turbo@latest [options]
```

| フラグ | 説明 |
|---|---|
| `-m, --package-manager` | パッケージマネージャーを指定 |
| `-e, --example` | テンプレートまたは GitHub URL |
| `--skip-install` | 依存関係のインストールをスキップ |
| `--turbo-version` | 特定の turbo バージョンをインストール |

## eslint-config-turbo / eslint-plugin-turbo

`turbo.json` のハッシュ設定に宣言されていない環境変数をコード内で検出する。

ルール: `turbo/no-undeclared-env-vars`

```json
{
  "rules": {
    "turbo/no-undeclared-env-vars": ["error", { "allowList": ["^ENV_[A-Z]+$"] }]
  }
}
```

## turbo telemetry

匿名使用データの収集を管理する。

```bash
turbo telemetry status   # 現在のテレメトリ設定を確認
turbo telemetry enable   # テレメトリを有効化
turbo telemetry disable  # テレメトリを無効化
```

## turbo bin

`turbo` 実行バイナリのファイルシステムパスを取得する。グローバルインストールかローカルインストールかの確認に使用。

```bash
turbo bin
```

## turbo docs

ターミナルから Turborepo ドキュメントを検索する（最低バージョン: 2.7.5）。

```bash
turbo docs "caching"                              # キーワード検索
turbo docs "task dependencies" --docs-version 2.8.0  # 特定バージョンのドキュメントを検索
```

## @turbo/codemod

```bash
npx @turbo/codemod migrate
```

非推奨機能の自動移行。`--dry` でプレビュー可能。

## turbo-ignore（非推奨）

> **非推奨**: `turbo-ignore` は更新を終了。代わりに `turbo query affected` を使用する。`turbo query affected` はタスクレベルの変更検知で精度が高い。
