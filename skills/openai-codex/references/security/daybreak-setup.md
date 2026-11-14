# Set up Daybreak Defense Factory

Daybreak Defense Factory (Preview plugin) scans code in a connected GitHub repository and shares findings with your team. Start with one repository or folder, then monitor new commits or set a schedule.

## Signature / Usage

1. Open **Plugins** (web or desktop app) in a ChatGPT workspace with Daybreak access, search **Daybreak Defense Factory (Preview)**, install and enable it.
2. Open **Daybreak** in the sidebar, select **Run an agentic scan**, and if prompted **Connect GitHub**.
3. On **Configure your scan** pick a repository, then **Full repository** (default branch) or **Specific folder or files** (one path per line, relative to the repository root), and select **Start Scan**. Select **View scan** when **First scan queued** appears.

Example path entry for a folder-scoped scan:

```text
src/
```

## Options / Props

| Scan method | When to use it |
| --- | --- |
| Repository scan | Check current code once, including bugs that span several commits. |
| Continuous monitoring | Check new commits on the default branch; choose how far back to start to also review recent history. |
| Scheduled scan | Repeat a repository scan on a schedule for regular review of the default branch. |

Local scan (desktop app): **New scan** > **Local** > **Codebase** (optionally one folder) or **Changes** (uncommitted work); **Deep scan** runs multiple passes and costs more time and tokens.

## Notes

- Cloud scans run in Codex cloud. Choose **Cloud** in **New scan** and check the cloud environment Daybreak will use. Each person who starts a scan needs a personal GitHub connection; workspace connections are not supported. If a repository is missing, check **Configure access** for the GitHub app and ask your GitHub administrator.
- Check what a failed or early-stopped scan covered before interpreting results.
- Change or pause monitoring under **Repositories** > repository > **Continuous scanning settings**; the owner, people with edit access, and Daybreak Defense Factory administrators can change them for the whole team.
- Local findings appear in **Overview** on that device. A local scan can send relevant code and prompts to the configured model provider. Local scans with Daybreak Blue require trusted access (**Apply for Daybreak**).
- Relation to Codex Security: the sources do not state a rename. Daybreak Defense Factory follows the same flow as the Codex Security Cloud plugin (cloud-setup.md in this category: GitHub connection per person, Codex cloud environment, repository scan / continuous monitoring, threat model, PR reviews), but with different names (plugin **Daybreak Defense Factory (Preview)**, **Run an agentic scan**, **Repository scan** / **Scheduled scan**, **Continuous scanning settings**) and extra pieces (scanner imports, notifications, Daybreak Blue trusted access). See cloud-setup.md for the older Codex Security Cloud wording; the two pages are not identical.
- Source: https://learn.chatgpt.com/docs/security/setup (retrieved 2026-11-14).

## Related

- [Codex Security cloud setup](./cloud-setup.md)
- [Daybreak FAQ](./daybreak-faq.md)
- [Review findings and fixes in Daybreak](./daybreak-findings-and-fixes.md)
- [Daybreak notifications](./daybreak-notifications.md)
- [Import scanner findings into Daybreak](./daybreak-scanner-imports.md)
- [Improve the Cloud threat model](./threat-model.md)
- [Security review](./security-review.md)
