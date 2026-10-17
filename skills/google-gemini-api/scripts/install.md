---
source: https://ai.google.dev/gemini-api/docs/libraries
---

# Install the Google GenAI SDK

Install commands for the official Google GenAI SDK in Python, JavaScript, Go, Java, and C#.

## Python

```sh
pip install google-genai
```

PyPI package `google-genai`. Repository: `googleapis/python-genai`.

## JavaScript

```sh
npm install @google/genai
```

npm package `@google/genai`. Repository: `googleapis/js-genai`.

## Go

```sh
go get google.golang.org/genai
```

Go module `google.golang.org/genai`. Repository: `googleapis/go-genai`.

## Java (Maven)

```xml
<dependencies>
  <dependency>
    <groupId>com.google.genai</groupId>
    <artifactId>google-genai</artifactId>
    <version>1.0.0</version>
  </dependency>
</dependencies>
```

Add to the `pom.xml` dependencies. The `<version>1.0.0</version>` is copied as written in the official page. Repository: `googleapis/java-genai`.

## C# (.NET)

```sh
dotnet add package Google.GenAI
```

NuGet package `Google.GenAI`. Repository: `googleapis/dotnet-genai`.

## Notes

- Versions measured on 2026-10-16 (registry lookups, not from the docs page): `google-genai` 2.31.0 (PyPI), `@google/genai` 2.30.0 (npm `latest`), `google.golang.org/genai` v1.75.0, `com.google.genai:google-genai` 1.57.0 (Maven Central), `Google.GenAI` 1.26.1 (NuGet). The Maven `1.0.0` above is the docs example, not the current version.
- The legacy libraries (for example `google-generativeai`, `@google/generative-ai`) were deprecated as of November 30th, 2025; do not install them for new projects. See `references/migration/migrate-genai-sdk.md`.
- Install commands modify the current Python / Node / Go / .NET environment. Run them inside a virtual environment or project directory.
