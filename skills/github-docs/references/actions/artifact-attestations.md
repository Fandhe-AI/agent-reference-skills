# GitHub Actions -- アーティファクト証明 (artifact attestations)

`actions/attest` によるビルド provenance / SBOM 証明の生成と、`gh attestation verify` による検証のリファレンス。

公式ドキュメント:
- https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations
- https://docs.github.com/en/actions/concepts/security/artifact-attestations

---

## 概要

アーティファクト証明は、ビルドの provenance と整合性について改ざん不能な保証を作る。暗号署名されたクレームには以下が含まれる:

- アーティファクトに関連付けられたワークフローへのリンク
- リポジトリ・組織・environment・コミット SHA・トリガーイベント
- provenance 確立に使われた OIDC トークンの情報

SBOM を関連付けた証明も生成できる。

- SLSA: 証明単体で SLSA v1.0 Build Level 2。組織内で共有する reusable workflow でビルドすると、ビルドと呼び出し側ワークフローを分離でき SLSA v1.0 Build Level 3 を満たせる。
- 生成: Sigstore を使用。**public リポジトリ**は Sigstore Public Good Instance を使い、生成された Sigstore bundle のコピーが GitHub に保存され、公開読み取り可能な不変の透明性ログにも書かれる。**private リポジトリ**は GitHub の Sigstore インスタンス（同一コードベースだが透明性ログなし、GitHub Actions とのみ federate）を使う。

---

## バイナリの build provenance

```yaml
permissions:
  id-token: write
  contents: read
  attestations: write
```

ビルドステップの後に追加:

```yaml
- name: Generate artifact attestation
  uses: actions/attest@v4
  with:
    subject-path: 'PATH/TO/ARTIFACT'
```

## コンテナイメージの build provenance

```yaml
permissions:
  id-token: write
  contents: read
  attestations: write
  packages: write
```

```yaml
- name: Generate artifact attestation
  uses: actions/attest@v4
  with:
    subject-name: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
    subject-digest: 'sha256:fedcba0...'
    push-to-registry: true
```

## SBOM 証明

SBOM を事前に作成し（例: `anchore-sbom-action`）、`sbom-path` を指定する。`attest` アクションは現在 SPDX または CycloneDX の SBOM predicate に対応。

```yaml
- name: Generate SBOM attestation
  uses: actions/attest@v4
  with:
    subject-path: 'PATH/TO/ARTIFACT'
    sbom-path: 'PATH/TO/SBOM'
```

コンテナイメージの場合は `subject-name` / `subject-digest` / `sbom-path: 'sbom.json'` / `push-to-registry: true` を指定し、`permissions` に `packages: write` を加える。

## 入力パラメータ

| Input | Description |
|---|---|
| `subject-path` | 証明するバイナリ等のパス（SBOM 証明では SBOM が記述するバイナリのパス） |
| `subject-name` | イメージの完全修飾名（例: `ghcr.io/user/app`、`acme.azurecr.io/user/app`）。タグは含めない |
| `subject-digest` | 証明対象の SHA256 ダイジェスト（`sha256:HEX_DIGEST` 形式）。`docker/build-push-action` を使うなら、そのステップの `digest` 出力を使える |
| `sbom-path` | 証明する JSON 形式 SBOM ファイルのパス |
| `push-to-registry` | `true` でレジストリに証明を push |

## linked artifacts ページ

証明したアセットは組織の linked artifacts ページへのアップロードが推奨される（ビルド履歴・デプロイ記録・ストレージ情報を表示）。`attest` は、次の両方を満たすとストレージレコードを自動作成する:

- `push-to-registry` が `true`
- ワークフローに `artifact-metadata: write` 権限がある

---

## 検証（GitHub CLI）

バイナリ:

```bash
gh attestation verify PATH/TO/YOUR/BUILD/ARTIFACT-BINARY -R ORGANIZATION_NAME/REPOSITORY_NAME
```

コンテナイメージ（バイナリのパスの代わりに `oci://` 付きの FQDN）:

```bash
docker login ghcr.io

gh attestation verify oci://ghcr.io/ORGANIZATION_NAME/IMAGE_NAME:test -R ORGANIZATION_NAME/REPOSITORY_NAME
```

SBOM（非既定の predicate を `--predicate-type` で指定。SPDX の例）:

```bash
gh attestation verify PATH/TO/YOUR/BUILD/ARTIFACT-BINARY \
  -R ORGANIZATION_NAME/REPOSITORY_NAME \
  --predicate-type https://spdx.dev/Document/v2.3
```

詳細確認には `--format json` を使う:

```bash
gh attestation verify PATH/TO/YOUR/BUILD/ARTIFACT-BINARY \
  -R ORGANIZATION_NAME/REPOSITORY_NAME \
  --predicate-type https://spdx.dev/Document/v2.3 \
  --format json \
  --jq '.[].verificationResult.statement.predicate'
```

---

## Notes

- 証明を生成するだけではセキュリティ上の利点はなく、検証して初めて効果が出る。
- 署名すべきもの: リリース物で利用者が `gh attestation verify ...` を実行すると想定されるもの、利用者が実行するバイナリ・ダウンロードするパッケージ、詳細な内容のハッシュを含む manifest。署名すべきでないもの: 自動テスト目的の頻繁なビルド、ソースコード・ドキュメント・埋め込み画像などの個別ファイル。
- 証明はアーティファクトが安全である保証ではない。ソースコードとビルド手順へのリンクを提供するだけで、ポリシー基準の定義・評価・リスク判断は利用者の責務。
- 上記の検証コマンドはオンライン環境前提。オフライン / エアギャップ環境では公式の「Verifying attestations offline」を参照。
- 不要になった証明の削除は公式の「Managing the lifecycle of artifact attestations」を参照。

## Related

- [oidc.md](./oidc.md)
- [permissions.md](./permissions.md)
- [reusable-workflows.md](./reusable-workflows.md)
- [artifacts.md](./artifacts.md)
- [lockfiles.md](./lockfiles.md)
