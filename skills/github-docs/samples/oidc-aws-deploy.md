# OIDC AWS Deploy

OIDC で長期 AWS 認証情報を GitHub secrets に保存せず、S3 へファイルをアップロードするワークフロー。

```yaml
# .github/workflows/aws-oidc.yml
name: AWS example workflow

on:
  push:

env:
  BUCKET_NAME: "example-bucket"
  AWS_REGION: "us-east-1"

# job レベルでも指定可
permissions:
  id-token: write   # OIDC JWT の要求に必須
  contents: read    # actions/checkout に必須

jobs:
  S3PackageUpload:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0

      - name: configure aws credentials
        uses: aws-actions/configure-aws-credentials@e3dd6a429d7300a6a4c196c26e071d42e0343502  # v4.0.2
        with:
          role-to-assume: arn:aws:iam::1234567890:role/example-role
          role-session-name: samplerolesession
          aws-region: ${{ env.AWS_REGION }}

      - name: Copy index.html to s3
        shell: bash
        run: |
          set -euo pipefail
          aws s3 cp ./index.html "s3://${BUCKET_NAME}/"
```

## Notes

- `example-bucket` / `us-east-1` / `arn:aws:iam::1234567890:role/example-role` は例示値。実環境の S3 バケット名・リージョン・IAM ロール ARN に置き換える
- `id-token: write` は OIDC トークンの取得・利用のみを許可し、リソースへの書き込み権限は与えない
- AWS 側の IAM ロール信頼ポリシーに `token.actions.githubusercontent.com:sub` 条件を必ず定義する（プロバイダー URL は `https://token.actions.githubusercontent.com`、Audience は `sts.amazonaws.com`）
- environment を使うワークフローでは `sub` が `repo:ORG-NAME/REPO-NAME:environment:ENVIRONMENT-NAME` 形式になる。2026-07-15 以降作成のリポジトリ等は owner / repository ID を含む `sub` 形式になり得るため、信頼ポリシーを実際の形式に合わせる
- Source: https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws
