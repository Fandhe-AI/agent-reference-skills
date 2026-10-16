# scripts

| Name | Description | Path |
| --- | --- | --- |
| admin-api | `curl` calls and SDK snippets for the Administration API (organization/project management, spend limits, service accounts, usage, costs, and Private Safety Processing external storage). All calls require an Admin API key. See `openai-api-core`'s `scripts/auth.md` for how to export `OPENAI_API_KEY`; `OPENAI_ADMIN_KEY` is set separately below. | [admin-api.md](./admin-api.md) |
| moderation | `curl` calls for the free-to-use `/v1/moderations` endpoint (classifies text/image input without generating a model response). Uses a regular `OPENAI_API_KEY`, not an admin key. | [moderation.md](./moderation.md) |
| safety | `curl` calls for the Safety APIs (project safety alerts and organization safety cases). These use a normal **restricted API key** (`OPENAI_API_KEY`) with a safety read permission, not an Admin API key (`OPENAI_ADMIN_KEY`). | [safety.md](./safety.md) |
| terraform | Setup and basic operations for the official [OpenAI Terraform provider](https://github.com/openai/terraform-provider-openai) (`openai/openai`), which manages organization resources through the Administration API. | [terraform.md](./terraform.md) |
