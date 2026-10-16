# samples

| Name | Description | Path |
|------|-------------|------|
| Tune Code Review with REVIEW.md and parse its check run | A repository-root `REVIEW.md` that recalibrates severity and caps nit volume for automated PR reviews, plus a `gh api` command that parses the machine-readable severity summary from the check run. | [code-review-automation.md](./code-review-automation.md) |
| Run the code-review plugin with claude-code-action | A GitHub Actions workflow that installs the `code-review` plugin and runs its skill on every pull request, posting findings as inline comments. | [code-review-plugin-workflow.md](./code-review-plugin-workflow.md) |
| Install Claude Code in a dev container | `.devcontainer/devcontainer.json` using the Claude Code Dev Container Feature, plus persisting authentication across rebuilds with a named volume. | [devcontainer.md](./devcontainer.md) |
| Route GitHub Actions through Amazon Bedrock or Vertex | `claude-code-action` workflows that authenticate to Amazon Bedrock or Google Cloud's Agent Platform (Vertex) via OIDC instead of a static `ANTHROPIC_API_KEY`, using a custom GitHub App token. | [github-actions-bedrock-vertex.md](./github-actions-bedrock-vertex.md) |
| Respond to @claude mentions in GitHub Actions | Minimal `claude-code-action` workflow that runs Claude in interactive mode whenever someone mentions `@claude` in an issue or PR comment. | [github-actions-workflow.md](./github-actions-workflow.md) |
| Run Claude Code in GitLab CI/CD | Minimal `.gitlab-ci.yml` job that installs Claude Code and runs it against the Claude API, triggered from a web pipeline or a merge request event. | [gitlab-ci.md](./gitlab-ci.md) |
| Run a self-hosted runner with Docker Compose | Compose service that restarts the runner on exit, reading the environment secret from a Compose secret file. | [self-hosted-runner-docker-compose.md](./self-hosted-runner-docker-compose.md) |
| Build a self-hosted runner image | Minimal Dockerfile that installs the `claude` binary and configures git identity for a self-hosted runner container. | [self-hosted-runner-image.md](./self-hosted-runner-image.md) |
| Run a self-hosted runner fleet on Kubernetes | Deployment that mounts the environment secret from a Kubernetes Secret and wires liveness/readiness probes to the runner's health endpoint. | [self-hosted-runner-kubernetes.md](./self-hosted-runner-kubernetes.md) |
| Start a self-hosted runner and route a session to it | Minimal manual setup for a single self-hosted runner: save the environment secret, start the runner, then send it a follow-up from the CLI. | [self-hosted-runner-quickstart.md](./self-hosted-runner-quickstart.md) |
| Run claude ultrareview non-interactively in CI | Start a cloud ultrareview from a script, wait for the findings on stdout, and branch on the exit code. | [ultrareview-ci.md](./ultrareview-ci.md) |
