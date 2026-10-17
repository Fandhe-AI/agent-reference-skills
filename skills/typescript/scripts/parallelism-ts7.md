---
source: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
---

# Parallelism (TypeScript 7)

Flags that control parallelism in TypeScript 7.0. `--checkers` and `--builders` are experimental.

## Set the number of type-checking workers

```sh
tsc --checkers 8
```

The default is 4. Lower it in CPU- or memory-constrained environments such as CI; `--checkers 1` makes type checking single-threaded. Results can occasionally depend on ordering, so the official guidance is to pin the value across environments.

## Set the number of project-reference builders

```sh
tsc --build --builders 4
```

Controls how many project-reference builders run in parallel with `--build`. It multiplies with `--checkers`: `--checkers 4 --builders 4` can run up to 16 type checkers at once (example from the blog).

## Single-threaded mode

```sh
tsc --singleThreaded
```

Limits type-checking workers to 1 and makes parsing and emit single-threaded too. Intended for debugging, comparing 6 and 7 performance, external parallel orchestration, and resource-limited environments.
