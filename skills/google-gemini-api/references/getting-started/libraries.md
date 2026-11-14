---
source: https://ai.google.dev/gemini-api/docs/libraries
---

# Gemini API libraries (Google GenAI SDK)

The official, production-ready Google GenAI SDK is recommended for building with the Gemini API in Python, JavaScript/TypeScript, Go, Java, and C#.

## Signature / Usage

```bash
pip install google-genai
npm install @google/genai
go get google.golang.org/genai
dotnet add package Google.GenAI
```

Java (Maven), as printed on the page:

```xml
<dependencies>
  <dependency>
    <groupId>com.google.genai</groupId>
    <artifactId>google-genai</artifactId>
    <version>1.0.0</version>
  </dependency>
</dependencies>
```

## Options / Props

| Language | Library | GitHub Repository | Installation |
|----------|---------|-------------------|--------------|
| Python | `google-genai` | googleapis/python-genai | `pip install google-genai` |
| JavaScript | `@google/genai` | googleapis/js-genai | `npm install @google/genai` |
| Go | `google.golang.org/genai` | googleapis/go-genai | `go get google.golang.org/genai` |
| Java | `google-genai` | googleapis/java-genai | Maven dependency (above) |
| C# | `Google.GenAI` | googleapis/dotnet-genai | `dotnet add package Google.GenAI` |

Legacy libraries (deprecated as of November 30th, 2025):

| Language | Legacy library | Support status | Recommended library |
|----------|----------------|----------------|---------------------|
| Python | `https://github.com/google-gemini/deprecated-generative-ai-python` | Not actively maintained | `https://github.com/googleapis/python-genai` |
| JavaScript/TypeScript | `https://github.com/google-gemini/generative-ai-js` | Not actively maintained | `https://github.com/googleapis/js-genai` |
| Go | `https://github.com/google/generative-ai-go` | Not actively maintained | `https://github.com/googleapis/go-genai` |
| Dart and Flutter | `https://pub.dev/packages/google_generative_ai/install` | Not actively maintained | Genkit Dart or Firebase AI Logic |
| Swift | `https://github.com/google/generative-ai-swift` | Not actively maintained | Firebase AI Logic |
| Android | `https://github.com/google-gemini/generative-ai-android` | Not actively maintained | Firebase AI Logic |

## Notes

- As of May 2025 the Google GenAI SDK reached General Availability across all supported platforms.
- The legacy libraries do not provide access to recent features such as Live API and Veo.
- No legacy Google-provided Java SDK existed, so no migration is needed for Java.
- The Maven example `<version>1.0.0</version>` is verbatim from the page and is not the current version. SDK versions measured 2026-11-14: `google-genai` 3.3.0 (PyPI), `@google/genai` 3.3.0 (npm latest), `google.golang.org/genai` v1.77.0, `com.google.genai:google-genai` 2.3.0 (Maven Central), `Google.GenAI` 2.1.0 (NuGet). The 2026-10-16 baseline was Python 2.31.0 / JS 2.30.0 / Go v1.75.0 / Maven 1.57.0 / NuGet 1.26.1. The Interactions API requires `google-genai` / `@google/genai` from 2.3.0 onwards (see interactions-overview).
- Migration (SDK 2.x to 3.x): Python `google-genai` 3.0.0 and JS `@google/genai` 3.0.0 (2026-11-05 / 2026-11-06) default the Gemini Developer API version to `v1` (was `v1beta`; see `references/migration/api-versions.md`), and `CodeExecutionResultStep.result` in the Interactions API is now a union (`CodeExecutionResultStepResult`; text-only JSON unchanged). Python also switches its default HTTP client to `httpx2` (`httpx` is no longer installed by default; restore with `pip install "google-genai[httpx]"` plus `GOOGLE_GENAI_HTTP_CLIENT=httpx`). JS requires Node.js >=22 (was 20). Source: https://github.com/googleapis/python-genai/releases/tag/v3.0.0 and https://github.com/googleapis/js-genai/releases/tag/v3.0.0 (fetched 2026-11-14).
- Later 3.x releases (Python / JS 3.1.0 to 3.3.0, 2026-11-10 to 2026-11-12) add the `xhigh` thinking level, the `gemini-4-carbon` / `gemini-4-hydrogen` / `gemini-omni-1.2-flash` model enums, and (3.2.0) the Decisions API `client.decisions.create`. Source: the GitHub release notes of `googleapis/python-genai` and `googleapis/js-genai` for `v3.1.0` to `v3.3.0` (fetched 2026-11-14).
- Docs fetched 2026-10-16 (page text re-checked 2026-11-14 against https://aistudio.google.com/docs/libraries; unchanged).
- Out of scope: Gemini CLI (a separate product, not covered by any skill in this repository) and Firebase AI Logic (Android / Swift), which is distinct from the `android-*` and `apple-*` skills.

## Related

- [get-started](./get-started.md)
- [interactions-overview](./interactions-overview.md)
- [coding-agents](./coding-agents.md)
