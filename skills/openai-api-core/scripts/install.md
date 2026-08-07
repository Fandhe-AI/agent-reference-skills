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
  <version>4.50.0</version>
</dependency>
```

## Go SDK のインストール

```bash
go get github.com/openai/openai-go/v3
```

`go.mod` に依存が追加される。使う際は以下のように import する。

```go
import (
	"github.com/openai/openai-go/v3"
)
```
