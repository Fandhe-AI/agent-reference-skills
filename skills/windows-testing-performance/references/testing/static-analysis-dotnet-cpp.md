# Static Analysis for .NET and C++

Static analysis tools catch bugs, security issues, and code quality problems before runtime. .NET projects use built-in Roslyn analyzers; C++ Windows App SDK and Win32 projects use the `/analyze` compiler flag and the C++ Core Guidelines Checker.

## Signature / Usage

```xml
<!-- .NET: enable all recommended Roslyn analyzer rules -->
<PropertyGroup>
  <AnalysisLevel>latest-recommended</AnalysisLevel>
  <EnforceCodeStyleInBuild>true</EnforceCodeStyleInBuild>
</PropertyGroup>
```

```xml
<!-- C++: enable /analyze and the C++ Core Guidelines ruleset -->
<PropertyGroup>
  <EnableMicrosoftCodeAnalysis>true</EnableMicrosoftCodeAnalysis>
  <CodeAnalysisRuleSet>CppCoreCheckRules.ruleset</CodeAnalysisRuleSet>
</PropertyGroup>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AnalysisLevel` | MSBuild property | Roslyn analyzer strictness; `latest-recommended` enables the current recommended rule set |
| `EnforceCodeStyleInBuild` | MSBuild property | Fails the build on `.editorconfig` code-style violations, not just analyzer warnings |
| `EnableMicrosoftCodeAnalysis` | MSBuild property (C++) | Turns on `/analyze` static analysis for the C++ project |
| `CodeAnalysisRuleSet` | MSBuild property (C++) | Ruleset file selecting which `/analyze` checks run, e.g. `CppCoreCheckRules.ruleset` |
| C++ Core Guidelines Checker | tool | Enforces modern C++ best practices on top of `/analyze` |
| SAL annotations | annotation | Source Annotation Language annotations that let `/analyze` catch lifetime, buffer, and concurrency issues in Win32 API usage |

## Notes

- .NET rule severities can be tuned per-project in `.editorconfig`, or suppressed with `<NoWarn>` in the project file, instead of failing the build outright.
- For Win32 API usage patterns specifically, combine `/analyze` with SAL annotations to catch common lifetime, buffer, and concurrency issues.
- To run these same checks in CI (GitHub Actions / Azure Pipelines), see the CI reference — it wraps the same `AnalysisLevel`/`EnableMicrosoftCodeAnalysis` properties as command-line build arguments rather than project-file settings.

## Related

- [Running Windows App Tests in CI](./ci-testing.md)
- [Unit Testing WinUI 3 Apps](./unit-testing-winui3.md)
- [Unit Testing Non-WinUI Code (MSTest / xUnit / NUnit)](./unit-testing-non-winui.md)
