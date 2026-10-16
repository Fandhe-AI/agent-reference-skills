<!-- source: https://code.claude.com/docs/en/code-review-setup.md / last verified: 2026-10-17 -->

# Set up Code Review

Turn on Code Review for your Claude organization: connect GitHub, install the Claude GitHub App, choose repositories, and set when reviews run. Reviews run on Anthropic infrastructure, so no workflow files are added to repositories.

## Signature / Usage

Owner steps in **Admin settings > Claude Code** (`https://claude.ai/admin-settings/claude-code#code-review`):

1. Click the **Allow code review** switch.
2. Click **Connect** in the **Connect GitHub** dialog (select your instance first on GitHub Enterprise Server).
3. Click **Install GitHub App** if repositories are not listed in **Add a repository**.
4. Select repositories, then **Continue**.
5. Click **Finish** in the **Code review is set up** dialog.
6. Verify with a non-draft test PR; a **Claude Code Review** check run appears within a few minutes. In **Manual (@claude review)** repositories, comment `@claude review`.

```text
@claude review
```

## Options / Props

Access needed:

| Access | Needed for |
|--------|------------|
| Owner role in your Claude organization | Every step on the admin page |
| Owner of the GitHub organization | Installing the Claude GitHub App and linking it to your Claude organization |
| Write access to each repository you add, from the connected GitHub account | Adding the repository |

Review level (organization default, overridable per repository via **Edit** on the repository row):

| Level | What it trades |
|-------|----------------|
| Quick | A lighter pass. The fastest level, at the lowest cost |
| Standard | Balanced depth, speed, and cost. The default level |
| Deep | The most thorough pass. Takes the longest and costs the most |

Review runs (per repository):

| Option | Behavior |
|--------|----------|
| Once after PR creation | A review runs when a PR is opened, reopened, or marked ready for review |
| After every push | A review runs on pushes to the PR branch; auto-resolves threads when flagged issues are fixed |
| Manual (@claude review) | Opening or pushing doesn't start a review; comment `@claude review` (or `@claude review always` to subscribe to later pushes) |
| Off | Organization rows only (see below) |

## Notes

- Each newly added repository starts at **After every push**, which runs the most reviews. If its GitHub organization is covered as a whole, it takes that organization row's setting instead.
- A new level applies to reviews that start after the change. Level saves immediately on selection.
- Automatic reviews skip draft PRs and PRs from forks regardless of the setting.
- **Show tips on pull requests** is on by default; Claude posts a tip comment when no review starts (repository set to Manual, PR from a fork, a bot or non-write user comments `@claude review`, or the GitHub organization isn't linked to the Claude organization).
- Developers without the Owner role can: request a review with `@claude review` (needs write access; works on drafts and fork PRs), subscribe one PR with `@claude review always` (not on drafts or forks), and commit `REVIEW.md` / `CLAUDE.md` files. Developer-requested reviews are billed to the organization.
- Cover a whole GitHub organization: set **Review runs** on the organization's row. Requires the connected account to be an owner of that GitHub organization, the organization on github.com (GitHub Enterprise Server instances and personal accounts aren't eligible), and a monthly spend limit set for the Claude organization or for Code Review. It applies to every repository the app can access, including later ones, and overrides individually set repositories (repositories turned off on their own rows stay off). A repository later set differently is marked **Custom**. An organization row has no review level of its own. This can raise spend significantly.
- Turn off: **Edit** a repository row and turn off **Code review** (stays listed as Off); **Remove repository** (stops reviews and lets another Claude organization set it up; not possible while its GitHub organization is covered as a whole); select **Off** on an organization row; or turn off **Allow code review** to stop all new reviews while keeping the repository list.
- If **Allow code review** turns on with no dialog, the organization already has the Claude GitHub App linked or repositories added. The app's permission set is broader than a review uses and is shared by other Claude features such as GitHub Actions.

## Related

- [Code Review](./code-review.md)
- [Code Review costs and usage](./code-review-costs.md)
- [Read and request reviews on a pull request](./code-review-pull-requests.md)
- [Customize Code Review](./code-review-customize.md)
- [Troubleshoot Code Review](./code-review-troubleshooting.md)
- [GitHub Enterprise Server](./github-enterprise-server.md)
