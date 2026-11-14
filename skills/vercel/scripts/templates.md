# Templates

Vercel テンプレートの検索・要件確認・デプロイ（GitHub リポジトリ作成 + プロジェクト作成）・中断後の再開

ローカルにサンプルプロジェクトを作るだけなら `vercel init`（[setup.md](./setup.md) 参照）。`vercel templates` は GitHub に新しいリポジトリを作り、テンプレートのプロジェクトをデプロイする。検索結果にはファイアウォールやルーティングのルールなど CLI でデプロイできない種別も含まれる（`inspect` で可否と理由を確認する）。

## Signature / Usage

### テンプレートの検索

名前・説明で検索し、`--framework` / `--type` で絞り込む。結果はスラッグ・名前・フレームワーク・デプロイ可否の表で、標準出力が端末でない場合はタブ区切り（ヘッダー行付き）になる。`--limit` はデフォルト 20（100 を超える値は 100 に丸められる）。

```sh
vercel templates search "AI chatbot" --framework next.js --limit 10
```

### 要件の確認

テンプレートのスラッグまたはテンプレート ID を渡し、デプロイ前に必要な環境変数・Marketplace リソース・Blob ストア・接続を確認する。`--json` は README（`overview`）と各プロジェクトのビルド・インストールコマンドも含む。

```sh
vercel templates inspect nextjs-boilerplate --json
```

### テンプレートのデプロイ

事前に GitHub アカウントを Vercel に接続し、デプロイ先アカウントに Vercel GitHub App をインストールしておく。`acme` を GitHub のアカウントまたは組織、`your-team` を Vercel のチームスラッグに置き換える。デフォルトで private リポジトリを作成し（`--public` で公開）、新しいプロジェクトの初回デプロイは production に行われる。

```sh
vercel templates deploy nextjs-boilerplate --repo acme/my-site --scope your-team
```

対話形式でデプロイ先リポジトリや接続（Vercel Connect を必要とするテンプレートなど）を選ぶ。

```sh
vercel templates deploy eve-memory-agent
```

### 設定ファイルによる入力

`--config` に JSON ファイルを渡し、プロジェクト名・リソース選択・環境変数の参照を指定する。キー名は `vercel templates inspect <template-slug> --json` の出力に合わせる。次の `template-inputs.json` は、`starter` プロジェクトと `products-0` の Marketplace リソースを持つテンプレートを前提にした例（キーと環境変数名はテンプレートに合わせて調整する）。

```json
{
  "projects": {
    "starter": { "name": "my-site" }
  },
  "env": {
    "API_KEY": { "env": "MY_TEMPLATE_API_KEY" },
    "SIGNING_KEY": { "file": "./secrets/signing-key" },
    "DATABASE_URL": { "resource": "products-0" }
  },
  "resources": {
    "products-0": {
      "integration": "neon",
      "product": "neon",
      "installationId": "icfg_example",
      "plan": "your-plan-id",
      "metadata": { "region": "your-region" },
      "projects": ["starter"]
    }
  }
}
```

シークレットはコマンド引数に書かず、環境変数またはファイルから読ませる。

### 非対話実行

必要な入力をすべて渡し、`--yes` で作成を確定する（`--yes` はプロバイダーの認可や法的条件への同意の代わりにはならない）。`eve-inputs.json` で認可済みコネクタと private Blob ストアを指定した例。

```sh
vercel templates deploy eve-memory-agent \
  --repo acme/my-eve-agent \
  --scope your-team \
  --config eve-inputs.json \
  --prod --yes --non-interactive --json
```

終了コードは `0` が成功、`1` が運用上の失敗・不正な設定・必要なセットアップ（`reason` / `message` / `data` は標準エラー出力の JSON）、`2` が引数不正・必須入力の欠落、`130` がプロンプトのキャンセル。

### 中断後の再開

デプロイが途中で止まった場合、CLI が実行 ID・チーム・設定のパスを含む再開コマンドを表示する（JSON エラーでは `next`）。表示されたセットアップ手順を完了してから実行する。

```sh
vercel templates deploy eve-memory-agent \
  --resume <run-id> \
  --scope your-team --config eve-inputs.json --yes
```

リクエストが受領確認なしでタイムアウトした場合は、保留中の操作を確認したうえで元の設定に `reconcile` エントリを追加して再開する（`project:eve-memory-agent` は例。確認済みのリソース ID を `receipt` に入れる）。

```json
{
  "reconcile": {
    "operation": "project:eve-memory-agent",
    "receipt": { "id": "prj_your_project_id" }
  }
}
```

## Notes

- Source: https://vercel.com/docs/cli/templates (fetched 2026-11-14)
- 不確実な作成操作を新しい実行として再試行しない。再開は同じ実行 ID を使う。
