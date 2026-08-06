# install

Official OpenAI SDK installation commands per language.

## Python SDK のインストール

```bash
pip install openai
```

## Node.js / TypeScript SDK のインストール

```bash
npm install openai
```

## .NET SDK のインストール

```bash
dotnet add package OpenAI
```

## Ruby SDK のインストール

`Gemfile` に追記する。

```ruby
gem "openai"
```

## Java SDK の依存追加

Maven の `pom.xml` に追記する。

```xml
<dependency>
  <groupId>com.openai</groupId>
  <artifactId>openai-java</artifactId>
  <version>4.0.0</version>
</dependency>
```

## Go SDK の利用

Go は `go.mod` への import で解決する（`go get` は明示的にドキュメント記載なし）。

```go
import (
	"github.com/openai/openai-go/v3"
)
```
