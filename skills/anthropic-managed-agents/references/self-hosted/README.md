# Self-hosted Claude Managed Agents

サービス全体を自前インフラで運用する self-hosted Claude Managed Agents（サーバー + サンドボックス）。Anthropic がサービスを運用しワーカーのみ自前で動かす self-hosted sandboxes（`self_hosted` environment）は environments カテゴリを参照。

| Name | Description | Path |
|------|-------------|------|
| Agent identity and credentials | How a self-hosted server lets outside systems trust an agent (short-lived signed JWT) and where it keeps credentials. | [agent-identity.md](./agent-identity.md) |
| Call the API on a self-hosted server | Point the official SDK, cURL, or the `ant` CLI at your self-hosted server, start a session, and read the reply. | [call-the-api.md](./call-the-api.md) |
| Self-hosted configuration reference | Every server setting with its environment variable, default, and purpose (YAML file plus environment credentials). | [configuration-reference.md](./configuration-reference.md) |
| Use the console on your server | The web console served at the same address as the API: agents, sessions, environments, vaults, memory stores, skills. | [console.md](./console.md) |
| Data and access in self-hosted Claude Managed Agents | What leaves your network, where logs / traces / metrics go, data retention, access, and tenant separation. | [data-and-access.md](./data-and-access.md) |
| Differences from the hosted service | Features only self-hosted has, hosted features it lacks, behavior differences, and settings required first. | [differences.md](./differences.md) |
| Inference provider | Send model calls to Amazon Bedrock, Claude Models on Google Cloud, Microsoft Foundry, or your own model gateway. | [inference-provider.md](./inference-provider.md) |
| Deploy on Kubernetes | Install the server and its sandboxes with the two Helm charts, then run a first session in a sandbox pod. | [kubernetes.md](./kubernetes.md) |
| Self-hosted Claude Managed Agents | Run the whole Managed Agents service and its sandboxes on your own infrastructure; who hosts each part and where to start. | [overview.md](./overview.md) |
| Get started with self-hosted Claude Managed Agents | Start the server on one machine with Docker Compose and chat with an agent from your terminal. | [quickstart.md](./quickstart.md) |
| Single sign-on | Authenticate callers with OpenID Connect tokens; the server maps token groups to roles. | [single-sign-on.md](./single-sign-on.md) |
| Upgrade self-hosted Claude Managed Agents | Upgrade on Kubernetes or Docker Compose, back up and restore the database, and roll back. | [upgrade.md](./upgrade.md) |
