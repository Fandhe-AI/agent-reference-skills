# Improve the Cloud threat model

Update a monitored repository's threat model when the generated version misses security assumptions or deployment context. This guide applies to Codex Security Cloud; for local plugin policy see "Configure the scan" in scans.md.

## Signature / Usage

A threat model is a short security summary of how your repository works. Codex Security creates the first draft from the code and uses it to guide future commit scans and prioritize findings. It describes:

- entry points and who can supply input to them
- trust boundaries and authentication or authorization assumptions
- sensitive data and privileged actions
- areas that need particular attention

Example:

> The public account API accepts authenticated users' JSON requests and file uploads. Users may change only accounts in their own tenant. The identity service authenticates the caller, but each handler must check tenant access. Billing changes go through a privileged internal service. Prioritize missing tenant checks and upload paths that can reach that service.

Edit the threat model: open the Codex Security Cloud plugin (see cloud-setup.md if you haven't installed it or configured commit monitoring), open **Repositories** and select the monitored repository, open **Monitoring settings**, edit **Threat model**, then select **Save**.

## Notes

- Changes apply to future scans only.
- Identify uncertain assumptions (e.g. don't describe an endpoint as internal-only unless that is true of the deployment you want assessed). Revisit the model after changes to authentication, tenant boundaries, or exposed services, and keep facts about the deployment separate from priorities for the scan.
- Earlier revisions of this page described editing at `chatgpt.com/codex/security/scans` → open repository → **Edit**; the current official page uses **Repositories** > **Monitoring settings**.

## Related

- [Codex Security cloud setup](./cloud-setup.md)
- [Codex Security](./overview.md)
- [Codex Security cloud FAQ](./cloud-faq.md)
