<!-- source: https://platform.claude.com/docs/en/get-started / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/get-api-key / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/cli/quickstart.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/java.md / last verified: 2026-08-07 -->

# setup

API key configuration, official SDK installation, `ant` CLI setup, and a first connectivity check.

## API key の設定（macOS / Linux）

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

Claude Console (Settings → API keys → **Create key**) で発行したキー（`sk-ant-` で始まる）を設定する。クライアント SDK・`ant` CLI はこの環境変数を自動で読む。直接 HTTP リクエストする場合は `x-api-key` ヘッダーに載せる。

## Python SDK のインストール

```bash
pip install anthropic
```

```python
import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY automatically
```

## TypeScript / Node.js SDK のインストール

```bash
npm install @anthropic-ai/sdk
```

## C# SDK のインストール

```bash
dotnet add package Anthropic
```

## Go SDK のインストール

```bash
go get github.com/anthropics/anthropic-sdk-go
```

## Java SDK の依存追加（Gradle）

JDK 8 以上が必要（コード例は JDK 25 の compact source files 形式で記載）。

```kotlin
implementation("com.anthropic:anthropic-java:2.52.0")
```

## Java SDK の依存追加（Maven）

```xml
<dependency>
    <groupId>com.anthropic</groupId>
    <artifactId>anthropic-java</artifactId>
    <version>2.52.0</version>
</dependency>
```

## PHP SDK のインストール

```bash
composer require anthropic-ai/sdk guzzlehttp/guzzle:^7
```

## Ruby SDK のインストール

```bash
bundle add anthropic
```

## ant CLI のインストール（Homebrew / macOS）

```bash
brew install anthropics/tap/ant
```

## ant CLI のインストール（curl / Linux・WSL）

```bash
VERSION=1.21.0
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
case $(uname -m) in
  x86_64) ARCH=amd64 ;;
  aarch64) ARCH=arm64 ;;
esac
curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${VERSION}/ant_${VERSION}_${OS}_${ARCH}.tar.gz" \
  | sudo tar -xz -C /usr/local/bin ant
```

## ant CLI のインストール（Go / ソースから）

Go 1.22 以上が必要。

```bash
go install github.com/anthropics/anthropic-cli/cmd/ant@latest
export PATH="$PATH:$(go env GOPATH)/bin"
```

## ant CLI のバージョン確認

```bash
ant --version
```

## ant CLI の認証（ブラウザ OAuth）

```bash
ant auth login
```

`ANTHROPIC_API_KEY` が設定されている場合はそちらが優先される。

## ant CLI からの疎通確認

```bash
ant messages create \
  --model claude-opus-5 \
  --max-tokens 1024 \
  --message '{role: user, content: "Hello, Claude"}'
```

## 疎通確認（curl / Messages API）

```bash
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 1000,
    "messages": [
      {"role": "user", "content": "What should I search for to find the latest developments in renewable energy?"}
    ]
  }'
```

## 疎通確認（Python SDK）

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-opus-5",
    max_tokens=1000,
    messages=[{"role": "user", "content": "What should I search for to find the latest developments in renewable energy?"}],
)

for block in message.content:
    if block.type == "text":
        print(block.text)
```
