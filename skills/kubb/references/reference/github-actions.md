# GitHub Action (inputs / outputs)

`kubb-labs/action@v0` は生成を実行し Studio snapshot を公開する action。inputs / outputs / ランタイム選択 / snapshot コメントの仕様。

## Signature / Usage

ワークフロー全体は integrations の GitHub Actions ページを参照（公式: Publish snapshots from CI）。入力の最小イメージ:

```yaml
- uses: kubb-labs/action@v0
  with:
    token: ${{ secrets.KUBB_STUDIO_TOKEN }}
```

## Options / Props

### Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `token` | string | — | Organization CI API key。必須 |
| `github-token` | string | `${{ github.token }}` | init pull request を開き snapshot コメントを書くトークン |
| `working-directory` | string | `.` | Kubb config と package があるディレクトリ |
| `config` | string | `kubb.config.ts` | `working-directory` 相対の config ファイルパス |

### Outputs

| Name | Description |
|------|-------------|
| `snapshot-id` | Studio が snapshot を保存した ID |
| `package-name` | 生成 package の名前 |
| `package-version` | 生成 package のバージョン |
| `tarball-url` | 生成 tarball の URL |
| `integrity` | tarball の SHA-512 integrity |
| `agent-url` | snapshot を保持する CI agent の Studio URL |
| `files-added`, `files-changed`, `files-removed` | pull request 上の直前 snapshot からの追加・変更・削除ファイル |

### Environment variables

| Name | Default | Description |
|------|---------|-------------|
| `KUBB_STUDIO_URL` | `https://kubb.studio` | self-hosted デプロイ用の Studio URL |

### Snapshot comment

install コマンドの下に変更された生成ファイルを一覧する:

| Section | Compared with |
|---------|---------------|
| Changes against `main` | `push` トリガーによる base ブランチの最新 snapshot |
| Changes since `abc1234` | 同じ pull request 上の直前の snapshot |

snapshot が失敗するとエラーがコメントに表示される。

## Notes

- action は `kubb studio snapshot` を、リポジトリにインストール済みの Kubb バージョンで実行する。ローカルインストールは Kubb 5.6.2 以降が必要。なければ最新の Kubb 5 release を使う
- 各 pull request は 1 つの CI agent と 1 つのコメントを再利用する。各ブランチは 1 つの CI agent を再利用しコメントはつかない
- fork からの pull request はスキップ（GitHub が secrets を隠すため）。pull request のクローズ時にその CI agent を削除する。config ファイルが無い場合は `kubb/init-*` pull request を開いて停止する
- 出典: Kubb docs 5.x（kubb@5.11.0 pin）。`secrets.KUBB_STUDIO_TOKEN` は説明用のシークレット名で、原文の値ではない

## Related

- [github-actions (integrations)](../integrations/github-actions.md)
- [studio](../integrations/studio.md)
- [ci](../integrations/ci.md)
