# REST API Call with curl and gh CLI

GitHub REST API を curl または gh CLI で呼び出す基本パターン。

```bash
# Fine-grained PAT で認証して Issue を取得
curl -L \
  -H "Authorization: Bearer github_pat_xxxx" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/OWNER/REPO/issues

# Issue を作成
curl -L -X POST \
  -H "Authorization: Bearer github_pat_xxxx" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/OWNER/REPO/issues \
  -d '{"title":"Bug: login fails","body":"Steps to reproduce...","labels":["bug"]}'

# PR を作成
curl -L -X POST \
  -H "Authorization: Bearer github_pat_xxxx" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/OWNER/REPO/pulls \
  -d '{"title":"New feature","body":"Description","head":"feature-branch","base":"main"}'

# gh CLI を使う場合（認証済み前提）
gh api repos/OWNER/REPO/issues --method POST \
  -f title="Bug: login fails" \
  -f body="Steps to reproduce..." \
  -f "labels[]=bug"

# ページネーション（gh CLI）
gh api --paginate repos/OWNER/REPO/issues --jq '.[].title'
```

## Notes

- `X-GitHub-Api-Version: 2022-11-28` ヘッダーで API バージョンを固定することが推奨される
- プライベートリソースへのアクセス権がない場合は `403` ではなく `404` が返る（リソース存在の秘匿）
- Fine-grained PAT が推奨。Classic PAT は非推奨（リポジトリ単位の権限制御ができない）
- レート制限: 認証済み 5,000 req/時間、`GITHUB_TOKEN` は 1,000 req/時間
