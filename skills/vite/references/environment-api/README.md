# environment-api

| Name | Description | Path |
|------|-------------|------|
| Application-Plugin Communication | `environment.hot` lets plugins communicate with applicat… | [application-plugin-communication.md](./application-plugin-communication.md) |
| Custom Environment Instances / Backward Compatibility | Runtime providers can supply environments with proper defaults fo… | [custom-environment-instances.md](./custom-environment-instances.md) |
| DevEnvironment class | During dev, each environment in a Vite server is an instance of `D… | [dev-environment-class.md](./dev-environment-class.md) |
| Environment Agnostic Code | Most code receives the current `environment` instance through its … | [environment-agnostic-code.md](./environment-agnostic-code.md) |
| Environment API Overview | Vite 6 formalizes Environments: instead of the two implicit ones (… | [environment-api-overview.md](./environment-api-overview.md) |
| Environment in Build Hooks / Shared Plugins During Build | During build, plugin hooks receive the environment instance (replac… | [environment-build-hooks.md](./environment-build-hooks.md) |
| Environment Factories | Environment factories are implemented by runtime providers (not end… | [environment-factories.md](./environment-factories.md) |
| Environments Configuration | Configure multiple environments explicitly with the `environments` c… | [environments-configuration.md](./environments-configuration.md) |
| Environments During Build (buildApp / createBuilder) | When the `builder` option is set, `vite build` builds the entire app… | [environments-during-build.md](./environments-during-build.md) |
| FetchResult | `environment.fetchModule` returns a `FetchResult` consumed by the m… | [fetch-result.md](./fetch-result.md) |
| FetchableDevEnvironment | A `DevEnvironment` that communicates with its runtime via the Fetch A… | [fetchable-dev-environment.md](./fetchable-dev-environment.md) |
| hotUpdate Hook | Lets plugins perform custom HMR update handling for a given environm… | [hot-update-hook.md](./hot-update-hook.md) |
| ModuleEvaluator | The interface a `ModuleRunner` uses to execute code that Vite trans… | [module-evaluator.md](./module-evaluator.md) |
| Separate Module Graphs (EnvironmentModuleNode) | Each environment has an isolated module graph with the same signatur… | [module-graphs.md](./module-graphs.md) |
| ModuleRunner | A module runner is instantiated in the target runtime and executes … | [module-runner.md](./module-runner.md) |
| ModuleRunnerOptions | Options passed as the first argument to `new ModuleRunner(...)`. | [module-runner-options.md](./module-runner-options.md) |
| ModuleRunnerTransport | The object a module runner uses to talk to its environment, via RPC… | [module-runner-transport.md](./module-runner-transport.md) |
| Per-environment Hooks / configEnvironment | Plugin hooks are either global (called once for the whole server) or p… | [per-environment-hooks.md](./per-environment-hooks.md) |
| Per-environment State / applyToEnvironment | Because one plugin instance serves several environments, plugin state… | [per-environment-state-plugins.md](./per-environment-state-plugins.md) |
| raw DevEnvironment | When an environment implements neither `RunnableDevEnvironment` nor `… | [raw-dev-environment.md](./raw-dev-environment.md) |
| RunnableDevEnvironment | A `DevEnvironment` that can communicate arbitrary JavaScript values… | [runnable-dev-environment.md](./runnable-dev-environment.md) |
