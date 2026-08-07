<!-- source: https://code.claude.com/docs/en/github-actions-cloud-providers.md / last verified: 2026-08-07 -->

# Route GitHub Actions through Amazon Bedrock or Vertex

`claude-code-action` workflows that authenticate to Amazon Bedrock or Google Cloud's Agent Platform (Vertex) via OIDC instead of a static `ANTHROPIC_API_KEY`, using a custom GitHub App token.

```yaml Amazon Bedrock
name: Claude PR Action

permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened]

jobs:
  claude-pr:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'issues' && (contains(github.event.issue.body, '@claude') || contains(github.event.issue.title, '@claude')))
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Generate GitHub App token
        id: app-token
        uses: actions/create-github-app-token@v2
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}

      - name: Configure AWS Credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
          aws-region: us-west-2

      - uses: anthropics/claude-code-action@v1
        with:
          github_token: ${{ steps.app-token.outputs.token }}
          use_bedrock: "true"
          claude_args: '--model us.anthropic.claude-sonnet-4-6'
```

```yaml Google Cloud's Agent Platform (Vertex)
name: Claude PR Action

permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened]

jobs:
  claude-pr:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'issues' && (contains(github.event.issue.body, '@claude') || contains(github.event.issue.title, '@claude')))
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Generate GitHub App token
        id: app-token
        uses: actions/create-github-app-token@v2
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}

      - name: Authenticate to Google Cloud
        id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.GCP_WORKLOAD_IDENTITY_PROVIDER }}
          service_account: ${{ secrets.GCP_SERVICE_ACCOUNT }}

      - uses: anthropics/claude-code-action@v1
        with:
          github_token: ${{ steps.app-token.outputs.token }}
          use_vertex: "true"
          claude_args: '--model claude-sonnet-5'
        env:
          ANTHROPIC_VERTEX_PROJECT_ID: ${{ steps.auth.outputs.project_id }}
          CLOUD_ML_REGION: us-east5
```

## Notes

- Required repository secrets: Bedrock needs `AWS_ROLE_TO_ASSUME`; Vertex needs `GCP_WORKLOAD_IDENTITY_PROVIDER` and `GCP_SERVICE_ACCOUNT`. Both examples also need `APP_ID` / `APP_PRIVATE_KEY` for the custom GitHub App used instead of the official Claude GitHub App.
- `id-token: write` is required so GitHub issues the OIDC token that AWS/GCP exchange for short-lived credentials; no long-lived cloud credential is stored in the repository.
- Bedrock model IDs carry a cross-region inference profile prefix (`us.`); use the prefix for the region group where model access was granted.
- If using the official Claude GitHub App instead of a custom one, delete the "Generate GitHub App token" step and the `github_token` line; if using GitHub's automatic token, change `github_token` to `${{ secrets.GITHUB_TOKEN }}`.
- On public repositories, any commenter's trigger phrase starts this workflow before the write-access check runs, which consumes Actions minutes and leaves cloud audit-log entries even for unauthorized users; add a write-access check before the credential steps to avoid this.
