---
source: https://modelcontextprotocol.io/registry/quickstart
---

# mcp-publisher

MCP Registry へサーバーを公開する `mcp-publisher` CLI のインストール・認証・公開コマンド。

## mcp-publisher のインストール（macOS / Linux）

> **警告**: リリースバイナリをダウンロードして展開し、`sudo` で `/usr/local/bin/` へ移動する。実行前に内容を確認し、使い捨て環境または信頼できる環境で実行する。

```bash
curl -L "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_$(uname -s | tr '[:upper:]' '[:lower:]')_$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/').tar.gz" | tar xz mcp-publisher && sudo mv mcp-publisher /usr/local/bin/
```

## mcp-publisher のインストール（Windows）

> **警告**: リリースバイナリをダウンロードして展開し、アーカイブを削除する。実行前に内容を確認する。

```powershell
$arch = if ([System.Runtime.InteropServices.RuntimeInformation]::ProcessArchitecture -eq "Arm64") { "arm64" } else { "amd64" }; Invoke-WebRequest -Uri "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_windows_$arch.tar.gz" -OutFile "mcp-publisher.tar.gz"; tar xf mcp-publisher.tar.gz mcp-publisher.exe; rm mcp-publisher.tar.gz
# Move mcp-publisher.exe to a directory in your PATH
```

## mcp-publisher のインストール（Homebrew）

```bash
brew install mcp-publisher
```

## インストール確認

```bash
mcp-publisher --help
```

原文の出力例では `init`（server.json テンプレート作成）・`login`（認証）・`logout`（保存済み認証の削除）・`publish`（server.json の公開）が表示される。

## server.json テンプレートの作成

```bash
mcp-publisher init
```

サーバープロジェクトのディレクトリで実行する。生成後、`server.json` の `name` は `package.json` の `mcpName` と一致させる。

## GitHub 認証

```bash
mcp-publisher login github
```

GitHub 認証では `server.json` の `name` が `io.github.username/*`（または `io.github.orgname/*`）形式である必要がある。device code フローで `https://github.com/login/device` にコードを入力する。

## DNS 認証（Ed25519）

> **警告**: 秘密鍵（`key.pem`）を生成し、秘密鍵の値をコマンド引数に渡す。鍵はコミットせず、シェル履歴・ログへの流出に注意する。

```bash
MY_DOMAIN="example.com"

# Generate public/private key pair using Ed25519
openssl genpkey -algorithm Ed25519 -out key.pem

# Generate TXT record
PUBLIC_KEY="$(openssl pkey -in key.pem -pubout -outform DER | tail -c 32 | base64)"
echo "${MY_DOMAIN}. IN TXT \"v=MCPv1; k=ed25519; p=${PUBLIC_KEY}\""
```

TXT レコードを DNS プロバイダーに追加し、反映後にログインする（反映に数分かかる場合がある）。

```bash
MY_DOMAIN="example.com"

PRIVATE_KEY="$(openssl pkey -in key.pem -noout -text | grep -A3 "priv:" | tail -n +2 | tr -d ' :\n')"
mcp-publisher login dns --domain "${MY_DOMAIN}" --private-key "${PRIVATE_KEY}"
```

## HTTP 認証（Ed25519）

> **警告**: 秘密鍵（`key.pem`）を生成し、秘密鍵の値をコマンド引数に渡す。鍵はコミットしない。

```bash
# Generate public/private key pair using Ed25519
openssl genpkey -algorithm Ed25519 -out key.pem

# Generate mcp-registry-auth file
PUBLIC_KEY="$(openssl pkey -in key.pem -pubout -outform DER | tail -c 32 | base64)"
echo "v=MCPv1; k=ed25519; p=${PUBLIC_KEY}" > mcp-registry-auth
```

生成した `mcp-registry-auth` を `/.well-known/mcp-registry-auth` としてドメイン上に配置した後にログインする。

```bash
MY_DOMAIN="example.com"
PRIVATE_KEY="$(openssl pkey -in key.pem -noout -text | grep -A3 "priv:" | tail -n +2 | tr -d ' :\n')"
mcp-publisher login http --domain "${MY_DOMAIN}" --private-key "${PRIVATE_KEY}"
```

## MCP Registry への公開

> **警告**: 公開は MCP Registry（本番、プレビュー段階）へのメタデータ登録で、取り消しが容易でない可能性がある。`server.json` の内容と版を確認してから実行する。

```bash
mcp-publisher publish
```

認証済みで、`server.json` のあるサーバープロジェクトのディレクトリで実行する。

## 公開結果の確認

```bash
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.my-username/weather"
```

`io.github.my-username/weather` は原文の例。自分のサーバー名に置き換える。

## Notes

- Source: `registry/quickstart.mdx` / `registry/authentication.mdx`（tag `2026-07-28` raw）、サイトの非版付きパス `registry/` の取得日 2026-10-16。
- `curl ... | tar xz ... && sudo mv ...` の行は原文のまま転記。ダウンロード先 URL と `sudo` による `/usr/local/bin/` への移動を確認してから実行する。
- MCP Registry はプレビュー段階で、GA 前に破壊的変更やデータリセットが起こりうる（原文）。
- Google KMS / Azure Key Vault 経由の DNS / HTTP 認証（`gcloud` / `az` 併用）は長いため未収録。出典の `registry/authentication.mdx` を参照。
- npm へのパッケージ公開（`npm adduser` / `npm publish --access public`）は npm の手順で、`mcp-publisher` の前提として原文に記載。
- GitHub Actions による自動公開は [registry-publish-github-actions.md](../samples/registry-publish-github-actions.md) を参照（出典 `registry/github-actions.mdx`）。
