# Codex Security Cloud setup

Run a first scan of a connected GitHub repository with Codex Security Cloud, then review its findings; afterward you can enable monitoring for new commits. Codex Security Cloud runs scans in Codex cloud; for scans of a local repository in the desktop app or CLI use the separate Codex Security plugin.

## Signature / Usage

Before you start: a workspace with Codex Security Cloud access and Codex cloud set up, and permission to connect the GitHub repository you want to scan (you can create its cloud environment during setup). If the plugin is unavailable, check access with your workspace administrator. If a repository is missing, use **Configure access** in the repository picker to check the GitHub app's organization and repository access, or ask your GitHub administrator to add the repository.

1. **Install and open the plugin** — open **Plugins** in ChatGPT on the web or in the desktop app, search the plugin marketplace for **Codex Security Cloud**, install and enable it, then open **Security Cloud** from your installed plugins or sidebar.
2. **Connect GitHub** — confirm Codex cloud is set up, select **Scan**, and if prompted **Connect GitHub** with your own GitHub account (each person who starts scans needs their own connection and repository access). Codex Security Cloud doesn't support workspace connections.
3. **Start a repository scan** — in **New Scan** choose the repository; review the environment (**Auto** creates one when you start; **Customize** chooses an existing environment); under **Scan Method** select **One-Time Scan**; select **Create**. Open the scan in **Scans** to follow progress; wait for it to finish, check the reported status and target before interpreting findings, and read output from a failed or canceled scan as an incomplete review.
4. **Review findings and available fixes** — open **Findings**; **Open findings** shows **New**, **Triaged**, or **In Progress** statuses; search or use **Filters**; the **Severity and status** chart summarizes the matching findings. Open a finding to check its affected code and revision, the attacker path, validation evidence, and unresolved assumptions (a scan with no findings doesn't establish there are no vulnerabilities). **Fix with Codex** on a repository finding starts a Codex conversation to check the finding against current code, implement a fix, and run relevant tests; findings from commit monitoring can instead offer a suggested patch to review before **Create draft pull request**.
5. **Monitor new commits** — select **Scan**, choose the repository and review the environment; under **Scan Method** select **Continuous Scanning** (scans the default branch); choose **Scan commit history from** (longer windows give more context but a longer initial scan); optionally add threat model scoping guidance; select **Create**.

## Notes

- Monitoring settings: open **Repositories**, select the repository, open **Monitoring settings** to change the Cloud environment, the days of history to review, and pause or enable monitoring; select **Save**. The scan owner, people granted edit access, and Codex Security administrators can change them; changes (including pausing) apply to the repository's shared workspace configuration, not just to the person making them. Review the generated threat model there and update it with deployment or security context the code doesn't establish (see threat-model.md).
- For questions about builds, validation, or result interpretation see cloud-faq.md; to review GitHub pull requests use security-review.md.
- Earlier revisions of this page used `chatgpt.com/codex/security/scans/new` and `chatgpt.com/codex/settings/environments` with a history-window wizard and **Recommended Findings** / **All Findings** views; the current official page uses the plugin-based flow above.

## Related

- [Codex Security](./overview.md)
- [Codex Security cloud FAQ](./cloud-faq.md)
- [Improve the Cloud threat model](./threat-model.md)
