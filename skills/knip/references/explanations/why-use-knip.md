# Why use Knip?

Source: https://knip.dev/explanations/why-use-knip

## Overview

Knip identifies and fixes unused dependencies, exports, and files. It performs deep analysis from fine-grained entry points based on actual frameworks and tooling in (mono)repos.

## Less is More

- **Maintenance**: Easier when there's less code
- **Performance**: Unused code impacts startup, build, and bundle size. Tree-shaking is not a complete solution
- **Onboarding**: New team members benefit from clean codebases
- **Regression Prevention**: Like TypeScript/ESLint/Prettier, prevents dead code from being reintroduced
- **Code Readability**: Dead code creates confusion

Related principle: YAGNI (You Aren't Gonna Need It)

## Automation

Knip automates finding clutter that would be tedious manually. Use alongside ESLint or Biome — after removing unused variables, Knip may find even more unused code.

## Comprehensive Coverage

Plugin-based dependency finding identifies additional entry/config files. Analyzing more files reveals unused exports and dependency usage patterns. This effect multiplies in monorepo environments.

## Greenfield or Legacy

- **New projects**: Maintain cleanliness from inception
- **Legacy projects**: May require configuration and produce false positives initially
- **Recommendation**: Use Knip in CI to prevent future regressions

## Unobtrusive Design

Knip requires no proprietary syntax. Uses standardized JSDoc annotations like `@lintignore` instead of `// knip-ignore` comments.
