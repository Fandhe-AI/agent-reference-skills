# vercel comments

Review and manage existing Vercel Toolbar comment threads from the terminal: list, inspect, reply, resolve, reopen, open, update, and delete. New threads are created with the Vercel Toolbar. Available on all plans.

## Signature / Usage

```bash
vercel comments [subcommand]
vercel comments
vercel comments --all-branches --status all
vercel comments --scope my-team --project my-project --git-branch main
vercel comments inspect <thread> --context
vercel comments reply <thread> --message 'Fixed in **main**.'
vercel comments resolve <thread> --message 'Fixed in the latest deployment.'
vercel comments reopen <thread-1> <thread-2> --yes
vercel comments update <thread> <message-id> --message 'Updated wording'
vercel comments delete <thread> <message-id> --yes
vercel comments --json | jq '.threads[].id'
```

Without a subcommand, `vercel comments` runs `list`.

## Options / Props

Common options (all subcommands):

| Name | Type | Description |
|------|------|-------------|
| `-p, --project <NAME_OR_ID>` | String | Select project and team context by project name or ID |
| `--json` | Boolean | Output JSON. Every subcommand except `open` |

`list` (default subcommand; lists unresolved comments by default):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--git-branch <BRANCH>` | String | Current branch when inferred | Filter by Git branch; repeatable |
| `--all-branches` | Boolean | `false` | Include every branch; cannot combine with `--git-branch` |
| `--status <STATUS>` | String | `unresolved` | `unresolved`, `resolved`, or `all` |
| `--page-path <PATH>` | String | None | Filter by recorded page path or glob; repeatable. Rewrites can make the recorded path differ from the browser URL |
| `--author <USER>` | String | None | User ID or `me`; repeatable. `me` requires user authentication; usernames are not supported |
| `--content <CONTENT>` | String | None | Filter by CMS content ID; repeatable |
| `-q, --query <TEXT>` | String | None | Search comment content |
| `-n, --limit <NUMBER>` | Number | `20` | 1 to 100 threads per page |
| `--next <CURSOR>` | String | None | Next page using the cursor from the previous output |

`reply` (and `update`, which takes `--message` / `--file` only):

| Name | Type | Description |
|------|------|-------------|
| `--message <TEXT>` | String | Markdown message content |
| `--file <PATH>` | String | Read Markdown from a file; `-` for stdin. Cannot combine with `--message` |
| `--attach <URL>` | String | Attach a file by HTTPS URL; repeat for up to 10 files (`reply`). Local file uploads are not supported |

`resolve` / `reopen`:

| Name | Type | Applies to | Description |
|------|------|------------|-------------|
| `--message <TEXT>` | String | `resolve` | Closing reply before resolving one thread; not supported for multiple threads |
| `-y, --yes` | Boolean | Both | Skip the confirmation prompt for multiple threads |

JSON output shapes:

| Command | Output |
|---------|--------|
| `list` | Object with `scope`, `filters`, `pagination`, `threads` |
| `inspect` | Thread object with full `messages` array |
| `reply`, `update` | Created or updated message object |
| `resolve` / `reopen` (one thread) | Object with `thread` and `replied` |
| `resolve` / `reopen` (multiple) | Object with a `results` array |
| `delete` | Object containing the deleted message `id` |

## Notes

- `list` uses the linked project and filters by the current Git branch when it can infer one; branch inference applies only when `--project` matches the current checkout. Use `--git-branch` or `--all-branches` to set the branch scope explicitly.
- Thread-level commands accept a thread ID or a full `vercel.com` comment URL; the URL's team is used unless `--scope` or `--project` is passed.
- `inspect` shows every message and its message ID, which `update` and `delete` require. Omitting `[thread]` in an interactive terminal prompts a choice from unresolved comments. `--context` adds framework and device details.
- Pass `--yes` in non-interactive or JSON mode for multi-thread `resolve` / `reopen` and for `delete`. Deletion cannot be undone.
- Bulk operations continue after an individual failure and exit nonzero if any operation fails.
- JSON mode never prompts; errors return an `error` object with `code` and `message` and a nonzero exit status.
- When another page is available, JSON output returns the cursor as `pagination.next`.
- Renamed or not confirmed in the current official page: the earlier flags `-F, --format json`, `--branch`, `--page`, `--content-id`, `--search`, `--limit` long-only form without `-n`, `-N` for `--next`, `-m` for `--message`, the `edit` subcommand (now `update`), and the `ls` alias are not mentioned on the current page; the "Beta" label is also not confirmed.
- Source: https://vercel.com/docs/cli/comments (fetched 2026-11-14)

## Related

- [api.md](./api.md)
- [alerts.md](./alerts.md)
- [list.md](./list.md)
- [logs.md](./logs.md)
- [global-options.md](./global-options.md)
