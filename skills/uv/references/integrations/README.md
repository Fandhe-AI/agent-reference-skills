# integrations

| Name | Description | Path |
|------|-------------|------|
| Alternative registries (Azure, Google, AWS, JFrog) | Installing from and publishing to private package registries: Azure Artifacts, Google Artifact Registry, AWS CodeArtifact, and JFrog Artifactory. | [alternative-registries.md](./alternative-registries.md) |
| AWS Lambda | Using uv with AWS Lambda to manage dependencies and build deployment packages as Docker container images or zip archives (including Lambda layers). | [aws-lambda.md](./aws-lambda.md) |
| Bazel | Using uv credentials with Bazel fetches via a Bazel credential helper that invokes `uv auth helper`. | [bazel.md](./bazel.md) |
| Renovate and Dependabot | Keeping uv-managed dependencies up to date with the Renovate and Dependabot dependency bots, including `uv.lock` handling, inline script metadata, and dependency cooldown. | [dependency-bots.md](./dependency-bots.md) |
| Docker | Using uv in Docker: official images, installing uv and projects, development mounts, and build optimizations (bytecode, cache mounts, intermediate layers, non-editable installs). | [docker.md](./docker.md) |
| GitHub Actions | Using uv in GitHub Actions with the official `astral-sh/setup-uv` action: installation, Python setup, matrix builds, syncing, caching, private repos, and trusted publishing to PyPI. | [github-actions.md](./github-actions.md) |
| GitLab CI/CD | Using uv in GitLab CI/CD: the uv Docker image, cache persistence, and the `uv pip` interface. | [gitlab-ci.md](./gitlab-ci.md) |
| Jupyter | Using Jupyter with uv: within a project, with a dedicated kernel, as a standalone tool, with a non-project environment, and from VS Code. | [jupyter.md](./jupyter.md) |
| Pre-commit | The official pre-commit hooks from `astral-sh/uv-pre-commit` keep `uv.lock` up to date, export requirements, and compile requirements files. | [pre-commit.md](./pre-commit.md) |
| PyTorch | Using uv with PyTorch: configuring per-platform and per-accelerator wheel indexes, Astral GPU indexes, the `uv pip` interface, and `--torch-backend`. | [pytorch.md](./pytorch.md) |
