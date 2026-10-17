# compiler

| Name | Description | Path |
|------|-------------|------|
| compilationMode | The `compilationMode` option controls how the React Compiler selects which functions to compile. | [compilationMode.md](./compilationMode.md) |
| Compiling Libraries | Guide for library authors on using React Compiler to ship optimized library code. | [compiling-libraries.md](./compiling-libraries.md) |
| Configuration | All configuration options available in React Compiler. | [configuration.md](./configuration.md) |
| Debugging and Troubleshooting | How to identify and fix issues when using React Compiler: compiler errors vs runtime issues, common breaking patterns, and a debugging workflow. | [debugging.md](./debugging.md) |
| Directives | React Compiler directives are special string literals that control whether specific functions are compiled. | [directives.md](./directives.md) |
| gating | The `gating` option enables conditional compilation, allowing you to control when optimized code is used at runtime. | [gating.md](./gating.md) |
| Incremental Adoption | React Compiler can be adopted incrementally, trying it on specific parts of a codebase first. | [incremental-adoption.md](./incremental-adoption.md) |
| Installation | How to install and configure React Compiler in a React application, per build tool. | [installation.md](./installation.md) |
| Introduction | React Compiler is a new build-time tool that automatically optimizes your React app. | [introduction.md](./introduction.md) |
| logger | The `logger` option provides custom logging for React Compiler events during compilation. | [logger.md](./logger.md) |
| panicThreshold | The `panicThreshold` option controls how the React Compiler handles errors during compilation: whether they fail the build or skip optimization. | [panicThreshold.md](./panicThreshold.md) |
| target | The `target` option specifies which React version the compiler should generate code for. | [target.md](./target.md) |
| use memo | `"use memo"` marks a function for React Compiler optimization. | [use-memo.md](./use-memo.md) |
| use no memo | `"use no memo"` prevents a function from being optimized by React Compiler. | [use-no-memo.md](./use-no-memo.md) |
