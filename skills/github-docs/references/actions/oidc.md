# GitHub Actions -- OpenID Connect (OIDC)

OIDC により、長期クレデンシャルを GitHub secret に保存せず、クラウドプロバイダーから短命のアクセストークンを直接取得するためのリファレンス。

公式ドキュメント:
- https://docs.github.com/en/actions/reference/security/oidc
- https://docs.github.com/en/actions/concepts/security/openid-connect
- https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-cloud-providers
- https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-with-reusable-workflows

---

## 概要

メリット:
- クラウドの認証情報を長期 GitHub secret として複製する必要がない
- クラウド側の authN / authZ ツールでワークフローごとにきめ細かく制御できる
- 長期クレデンシャルを保存せず、クラウドが発行する短命のアクセストークンを使う

流れ:
1. クラウドプロバイダーに OIDC 信頼関係を設定し、特定のワークフローがクラウドロール用トークンを要求できるようにする
2. ジョブ実行ごとに GitHub の OIDC プロバイダーが OIDC トークン（JWT）を自動生成する
3. ワークフローのステップ / アクションがトークンを要求し、クラウドに提示する
4. クラウドがクレームを検証し、短命のアクセストークンを発行する

クラウドのアクセストークンの既定の有効期限はクラウドごとに異なり、クラウド側で設定できる場合がある。トークンの有効期限・失効はクラウドプロバイダー側のセッション設定に従い、ジョブの終了・キャンセルで自動的に失効するとは限らない。必要に応じてクラウド側でセッション時間を短く設定する（出典: oidc-in-cloud-providers）。

---

## 必須パーミッション

```yaml
permissions:
  id-token: write # This is required for requesting the JWT
  contents: read # This is required for actions/checkout
```

- `id-token: write` が無いと OIDC JWT を要求できない。これは OIDC トークンの取得 / 設定のみを許可し、他リソースへの書き込み権限は付与しない。
- ワークフロー全体またはジョブ単位で設定できる。
- 環境（environment）を OIDC ポリシーで使う場合は、environment に protection rule を追加することを推奨。
- 呼び出し元と同一ユーザー / org / enterprise 所有の reusable workflow では、reusable workflow 内で生成された OIDC トークンを呼び出し側コンテキストから利用できる。外部の reusable workflow では、呼び出し側のワークフローまたはジョブで `id-token: write` を明示する。

---

## トークンの要求方法

公式の cloud login アクションがあればそれを使い、OIDC トークンとアクセストークンを交換する。無い場合は Actions core toolkit（推奨）か環境変数で取得する。

| Variable | Description |
|---|---|
| `ACTIONS_ID_TOKEN_REQUEST_URL` | GitHub の OIDC プロバイダーの URL |
| `ACTIONS_ID_TOKEN_REQUEST_TOKEN` | OIDC プロバイダーへのリクエスト用 Bearer トークン |

レスポンスには OIDC JWT（`.value`）が含まれる。Actions のステップでは標準出力へ出さずに変数で受け、`::add-mask::` で登録してから使う:

```bash
IDTOKEN=$(curl -sS -H "Authorization: bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" "$ACTIONS_ID_TOKEN_REQUEST_URL&audience=api://AzureADTokenExchange" | jq -r '.value')
echo "::add-mask::$IDTOKEN"
```

推奨: `core.getIDToken()`（取得したトークンを自動でマスクする）。`actions/github-script` は同梱の `@actions/core` を使うため、`npm install` は不要（インストールしても反映されない）。使用例:

```yaml
jobs:
  job:
    environment: Production
    runs-on: ubuntu-latest
    steps:
    - name: Get Id Token
      uses: actions/github-script@v8
      id: idtoken
      with:
        script: |
          let id_token = await core.getIDToken()
          core.setOutput('id_token', id_token)
```

カスタム audience は `core.getIDToken(audience)` で指定できる。アクションが対応していれば `with` で `aud` を渡せる（Azure Login アクションの既定 `aud` は `api://AzureADTokenExchange`）。

---

## トークンのクレーム

サポートされるクレームは https://token.actions.githubusercontent.com/.well-known/openid-configuration の `claims_supported` で確認できる。

### 標準クレーム

| Claim | Description |
|---|---|
| `aud` | 既定はリポジトリ所有者（org 等）の URL |
| `iss` | `https://token.actions.githubusercontent.com` |
| `sub` | クラウド側で検証される subject。後述の形式 |
| `exp` / `iat` / `jti` / `nbf` | 有効期限 / 発行時刻 / トークン識別子 / 有効開始時刻 |

JOSE ヘッダー: `alg`（アルゴリズム）、`kid`（鍵 ID）、`typ`（JWT）。

### GitHub カスタムクレーム

| Claim | Description |
|---|---|
| `actor` / `actor_id` | 実行を開始した個人アカウントとその ID |
| `base_ref` / `head_ref` | PR のターゲット / ソースブランチ |
| `check_run_id` | 現在のジョブの check run ID |
| `environment` | ジョブが使う environment 名。claim を含める場合（`include_claim_keys` 経由も）は environment が必須 |
| `event_name` | トリガーイベント名。Dependabot update ジョブ用トークンは `dynamic` |
| `job_workflow_ref` | reusable workflow を使うジョブでは reusable workflow の ref パス |
| `job_workflow_sha` | reusable workflow ファイルのコミット SHA |
| `ref` / `ref_type` | トリガーした git ref とその種別（例: branch） |
| `repository` / `repository_id` | ワークフロー実行元リポジトリとその ID |
| `repository_owner` / `repository_owner_id` | リポジトリを保持する org とその ID |
| `repository_visibility` | `internal` / `private` / `public` |
| `repo_property_*` | org / enterprise が選択したリポジトリ custom property |
| `run_id` / `run_number` / `run_attempt` | 実行 ID / 実行番号 / 再試行回数 |
| `runner_environment` | `github-hosted` / `self-hosted` |
| `workflow` / `workflow_ref` / `workflow_sha` | ワークフロー名 / ref パス / ファイルの SHA |

---

## 信頼条件（trust conditions）

クラウドロールのアクセスを絞るため、audience と subject を組み合わせて条件を設定する。クラウドがアクセストークンを発行する条件は少なくとも 1 つ定義する必要がある（未信頼リポジトリがトークンを要求できないようにするため）。

### subject の形式

| 条件 | Syntax | Example |
|---|---|---|
| environment | `repo:ORG-NAME/REPO-NAME:environment:ENVIRONMENT-NAME` | `repo:octo-org/octo-repo:environment:Production` |
| `pull_request`（environment 未参照時） | `repo:ORG-NAME/REPO-NAME:pull_request` | `repo:octo-org/octo-repo:pull_request` |
| ブランチ（environment 未参照かつ PR 以外） | `repo:ORG-NAME/REPO-NAME:ref:refs/heads/BRANCH-NAME` | `repo:octo-org/octo-repo:ref:refs/heads/demo-branch` |
| タグ（environment 未参照かつ PR 以外） | `repo:ORG-NAME/REPO-NAME:ref:refs/tags/TAG-NAME` | `repo:octo-org/octo-repo:ref:refs/tags/demo-tag` |

メタデータ値内の `:` は subject 内で `%3A` に置換される（例: `Production:V1` は `environment:Production%3AV1`）。

### immutable subject claims

リポジトリ作成日が 2026-07-15 より後のリポジトリは、owner ID と repository ID を含む immutable な既定 subject 形式を使う（GitHub Enterprise Server には未提供）。

- Syntax: `repo:OWNER@OWNER-ID/REPO@REPO-ID:ref:refs/heads/BRANCH`
- 旧形式の例: `repo:octo-org/octo-repo:ref:refs/heads/main`
- immutable 形式の例: `repo:octo-org@123456/octo-repo@456789:ref:refs/heads/main`

2026-07-15 より前に作成されたリポジトリは、org またはリポジトリレベルで OIDC 設定 UI / REST API からオプトインしない限り旧形式のまま。2026-07-15 以降のリポジトリの rename / transfer も immutable 形式へ移行する。trust policy は使用中の形式に合わせて更新する。

### クラウド別の設定例（subject `repo:octo-org/octo-repo:ref:refs/heads/demo-branch`）

| Cloud provider | Example |
|---|---|
| Amazon Web Services | `"token.actions.githubusercontent.com:sub": "repo:octo-org/octo-repo:ref:refs/heads/demo-branch"` |
| Azure | `repo:octo-org/octo-repo:ref:refs/heads/demo-branch` |
| Google Cloud Platform | `(assertion.sub=='repo:octo-org/octo-repo:ref:refs/heads/demo-branch')` |
| HashiCorp Vault | `bound_subject="repo:octo-org/octo-repo:ref:refs/heads/demo-branch"` |

---

## クレームのカスタマイズ

REST API（`/en/rest/actions/oidc`）で `sub` クレームのテンプレートを設定する。クラウド側の matching 条件を先に作成してから API で設定すること（未同期だとトークンが拒否される場合がある）。

- `sub` では `repository` ではなく短縮形 `repo` を使う。context 値内の `:` は `%3A` に置換される。
- immutable subject を使うリポジトリでは、`include_claim_keys` で customize しても `repo` セグメントの `owner_id` / `repo_id` は常に含まれ、削除できない。
- org テンプレートは、リポジトリがオプトインするまで既存の OIDC ワークフローに影響しない。リポジトリ所有者はリポジトリ REST API で `use_default` を `false` にしてオプトインする。

```json
{
   "include_claim_keys": [
       "repo",
       "context",
       "job_workflow_ref"
   ]
}
```

この場合 `sub` は `repo:ORG-NAME/REPO-NAME:environment:ENVIRONMENT-NAME:job_workflow_ref:REUSABLE-WORKFLOW-PATH` 形式になる（`context` は既定 `sub` でリポジトリ以降の部分）。

### テンプレート例

| 目的 | `include_claim_keys` | クラウド側の `sub` 例 |
|---|---|---|
| 可視性と owner で許可 | `repository_owner`, `repository_visibility` | `repository_owner:monalisa:repository_visibility:private` |
| 特定 owner の全リポジトリ | `repository_owner` | `repository_owner:monalisa` |
| reusable workflow を必須化 | `job_workflow_ref` | `job_workflow_ref:octo-org/octo-automation/.github/workflows/oidc.yml@refs/heads/main` |
| 特定リポジトリの全ワークフロー | `repo` | （`repo` クレームに一致する値） |
| rename に強い GUID | `repository_id` または `repository_owner_id` | （各 ID に一致する値） |
| `:` を含む context | `environment`, `repository_owner` | `environment:production%3Aeastus:repository_owner:octo-org` |
| custom property | `repo_property_workspace_id` | `repo_property_workspace_id:ws-abc123` |
| org テンプレートのリセット | `repo`, `context` | — |

リポジトリを既定の `sub` 形式に戻す / org テンプレートを使う設定（`PUT /repos/{owner}/{repo}/actions/oidc/customization/sub`）:

```json
{
   "use_default": true
}
```

`use_default: false` で org テンプレートを使用する。

### リポジトリ custom property をクレームに含める

org / enterprise 管理者が custom property を選択すると、値が設定されたリポジトリのトークンに `repo_property_` 接頭辞付きで自動的に含まれる（ABAC ポリシー用）。前提: property が org / enterprise レベルで定義済みで、org / enterprise 管理者であること。

- UI: org / enterprise の Actions OIDC 設定
- REST: `POST /orgs/{org}/actions/oidc/customization/properties/repo`、`POST /enterprises/{enterprise}/actions/oidc/customization/properties/repo`

| Property type | トークン上の表現 |
|---|---|
| String | 文字列のまま（例: `"repo_property_team": "platform-eng"`） |
| Single select | 選択肢を文字列で（例: `"repo_property_env_tier": "production"`） |
| Multi select | カンマ区切り 1 文字列（例: `"repo_property_regions": "us-east-1,eu-west-1"`） |
| True/false | 文字列 `"true"` / `"false"` |

multi select は trust policy で文字列一致または contains で評価する。

---

## reusable workflow との併用

reusable workflow 内のジョブのトークンは、呼び出し元の標準クレーム（`workflow` / `ref` 等）に加え、呼び出された側を示す `job_workflow_ref` を含む。`job_workflow_ref` のカスタムクレームに対応したクラウド（GCP / HashiCorp Vault）では直接条件にでき、標準クレーム（`aud` / `sub`）のみのクラウドでは API で `sub` に `job_workflow_ref` を含める。

org 内の任意のリポジトリから特定 reusable workflow のみ許可する例:

- Subject: `repo:octo-org/*`
- Custom claim（特定ワークフロー・ref）: `job_workflow_ref:octo-org/octo-automation/.github/workflows/deployment.yml@10040c56a8c0253d69db7c1f26a0d227275512e2`
- Custom claim（リポジトリ内の任意の reusable workflow）: `job_workflow_ref:octo-org/octo-automation@*`

---

## デバッグ

`github/actions-oidc-debugger` アクションで、クラウド連携前に送信されるクレームを確認できる。

---

## Notes

- 「トークンの要求方法」のマスク付き curl 例は、原本の curl 行と `::add-mask::`（workflow-commands ページ）から構成したもの。原本の例そのものではない。
- Dependabot の update ジョブ用トークンは `event_name` が `dynamic`。GitHub Actions ワークフローのみを許可したい trust policy では、期待するイベント名だけを許可する。
- Dependabot は AWS CodeArtifact / Azure DevOps Artifacts / JFrog Artifactory 上の、`username` / `password` 認証を使うレジストリに対して OIDC で認証できる。
- 実際の `job_workflow_ref` クレーム値は `ORG/REPO/.github/workflows/FILE@ref` 形式（原本の例: `octo-org/octo-automation/.github/workflows/oidc.yml@refs/heads/main`）。`job_workflow_ref:octo-org/octo-automation@*` は原本の Syntax / Example の転記で、ワイルドカードが一致するかはクラウドプロバイダーの条件評価に依存する。trust policy へ転記する前に実際のクレーム値で確認する。
- 原本の `deployment.yml@ 10040c56...` の例は `@` の後に空白を含む誤記で、本ページでは空白を除去した。
- immutable subject claims は GitHub Enterprise Server では利用不可。

## Related

- [permissions.md](./permissions.md)
- [reusable-workflows.md](./reusable-workflows.md)
- [secrets.md](./secrets.md)
- [contexts.md](./contexts.md)
