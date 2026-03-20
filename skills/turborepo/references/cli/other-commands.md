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

パフォーマンス最適化を設定するインタラクティブコマンド。Git FS Monitor、Remote Caching、バージョンチェック等を設定。

## turbo info

デバッグ情報を表示（バージョン、パス、デーモン状態、パッケージマネージャー、プラットフォーム詳細）。

## turbo devtools

パッケージグラフをブラウザで可視化。

| オプション | デフォルト | 説明 |
|---|---|---|
| `--port` | `9876` | サーバーポート |
| `--no-open` | — | ブラウザ自動起動を無効化 |

## turbo login / link / unlink

```bash
turbo login          # Vercel 認証
turbo login --manual # マニュアル認証
turbo link           # リモートキャッシュにリンク
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

## @turbo/codemod

```bash
npx @turbo/codemod migrate
```

非推奨機能の自動移行。`--dry` でプレビュー可能。
