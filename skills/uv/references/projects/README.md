# projects

| Name | Description | Path |
|------|-------------|------|
| Build, editable and virtual dependencies | Build dependencies (`build-system.requires`), editable installs, and virtual (non-packaged) dependencies. | [build-editable-virtual-dependencies.md](./build-editable-virtual-dependencies.md) |
| Build isolation | By default uv builds packages in isolated virtual environments alongside their declared build dependencies (PEP 517); two settings adjust this for incompatible packages. | [build-isolation.md](./build-isolation.md) |
| Building distributions | `uv build` builds source distributions (sdists) and wheels into `dist/`; uv acts as a build frontend and the backend decides the contents. | [build.md](./build.md) |
| Configuring projects | Project configuration in `pyproject.toml`: Python version requirement, entry points, build systems, packaging, environment path, editable mode. | [config.md](./config.md) |
| Conflicting dependencies and environments | uv resolves all project dependencies, extras and dependency groups together; `conflicts`, `environments` and `required-environments` declare exceptions and constrain the resolution. | [conflicts-environments.md](./conflicts-environments.md) |
| Managing dependencies | Project dependencies live in `project.dependencies`, `project.optional-dependencies`, `dependency-groups` and `tool.uv.sources`; manage them with `uv add` / `uv remove`. | [dependencies.md](./dependencies.md) |
| Development dependencies and dependency groups | Development dependencies are local-only and declared in `[dependency-groups]` (PEP 735); they are not included in published project requirements. | [dependency-groups.md](./dependency-groups.md) |
| Dependency sources | The `tool.uv.sources` table extends the standard dependency tables with alternative sources used during development (editable installs, relative paths, Git, URL, index, workspace). | [dependency-sources.md](./dependency-sources.md) |
| Exporting lockfiles | `uv export` converts `uv.lock` to `requirements.txt`, `pylock.toml` (PEP 751) or a CycloneDX SBOM. | [export.md](./export.md) |
| Creating projects | `uv init` creates a project from one of two templates: applications (default) or libraries (`--lib`). | [init.md](./init.md) |
| Structure and files | A uv project is identified by a `pyproject.toml`; uv manages a `.venv` project environment and a `uv.lock` lockfile next to it. | [layout.md](./layout.md) |
| Locking and syncing | Locking resolves project dependencies into a lockfile; syncing installs a subset of lockfile packages into the project environment. Both are automatic in uv. | [lock-sync.md](./lock-sync.md) |
| Optional dependencies | Published optional dependencies ("extras") live in `[project.optional-dependencies]`; extras are requested with `package[<extra>]` syntax. | [optional-dependencies.md](./optional-dependencies.md) |
| Running commands | `uv run` runs a command in the project environment, ensuring the environment is up-to-date first. | [run.md](./run.md) |
| Scripts (PEP 723 inline metadata) | Run standalone Python scripts with uv; dependencies and the Python version can be declared in the script itself using PEP 723 inline script metadata. | [scripts.md](./scripts.md) |
| Workspace metadata | `uv workspace metadata` exports the information uv has about a workspace or PEP 723 script as JSON for other tools. | [workspace-metadata.md](./workspace-metadata.md) |
| Using workspaces | A workspace is a collection of one or more packages (workspace members) managed together, sharing a single lockfile; defined by a `tool.uv.workspace` table. | [workspaces.md](./workspaces.md) |
</content>
