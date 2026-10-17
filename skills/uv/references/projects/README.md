# projects

| Name | Description | Path |
|------|-------------|------|
| Build, editable and virtual dependencies | Build dependencies (`build-system.requires`), editable installs, and… | [build-editable-virtual-dependencies.md](./build-editable-virtual-dependencies.md) |
| Build isolation | By default uv builds packages in isolated virtual environments alo… | [build-isolation.md](./build-isolation.md) |
| Building distributions | `uv build` builds source distributions (sdists) and wheels into `d… | [build.md](./build.md) |
| Configuring projects | Project configuration in `pyproject.toml`: Python version requirem… | [config.md](./config.md) |
| Conflicting dependencies and environments | uv resolves all project dependencies, extras and dependency groups… | [conflicts-environments.md](./conflicts-environments.md) |
| Managing dependencies | Project dependencies live in `project.dependencies`, `project.opti… | [dependencies.md](./dependencies.md) |
| Development dependencies and dependency groups | Development dependencies are local-only and declared in `[dependenc… | [dependency-groups.md](./dependency-groups.md) |
| Dependency sources | The `tool.uv.sources` table extends the standard dependency tables… | [dependency-sources.md](./dependency-sources.md) |
| Exporting lockfiles | `uv export` converts `uv.lock` to `requirements.txt`, `pylock.toml… | [export.md](./export.md) |
| Creating projects | `uv init` creates a project from one of two templates: applications… | [init.md](./init.md) |
| Structure and files | A uv project is identified by a `pyproject.toml`; uv manages a `.ve… | [layout.md](./layout.md) |
| Locking and syncing | Locking resolves project dependencies into a lockfile; syncing inst… | [lock-sync.md](./lock-sync.md) |
| Optional dependencies | Published optional dependencies ("extras") live in `[project.option… | [optional-dependencies.md](./optional-dependencies.md) |
| Running commands | `uv run` runs a command in the project environment, ensuring the e… | [run.md](./run.md) |
| Scripts (PEP 723 inline metadata) | Run standalone Python scripts with uv; dependencies and the Python… | [scripts.md](./scripts.md) |
| Workspace metadata | `uv workspace metadata` exports the information uv has about a wor… | [workspace-metadata.md](./workspace-metadata.md) |
| Using workspaces | A workspace is a collection of one or more packages (workspace memb… | [workspaces.md](./workspaces.md) |
