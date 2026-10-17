# vercel comments

Review and manage existing Vercel Toolbar comment threads from the terminal: list, inspect, reply, resolve, reopen, open, edit, and delete. New threads are created with the Vercel Toolbar. Beta, available on all plans.

## Signature / Usage

```bash
vercel comments [subcommand]
vercel comments
vercel comments --all-branches --status all
vercel comments --scope my-team --project my-project --branch main
vercel comments inspect <thread> --context
vercel comments reply <thread> -m 'Fixed in **main**.'
vercel comments resolve <thread> -m 'Fixed in the latest deployment.'
vercel comments reopen <thread-1> <thread-2> --yes
vercel comments edit <thread> <message-id> -m 'Updated wording'
vercel comments delete <thread> <message-id> --yes
vercel comments --json | jq '.threads[].id'
```

Without a subcommand, `vercel comments` runs `list`.

## Options / Props

Common options (all subcommands):

| Name | Type | Description |
|------|------|-------------|
| `-p, --project <NAME_OR_ID>` | String | Select project and team context by project name or ID |
| `-F, --format <FORMAT>` | String | Set output format to `json`. Every subcommand except `open` |
| `--json` | Boolean | Output JSON. Every subcommand except `open` |

`list` (alias `ls`, default subcommand; lists unresolved comments by default):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--branch <BRANCH>` | String | Current branch when inferred | Filter by Git branch; repeatable |
| `--all-branches` | Boolean | `false` | Include every branch; cannot combine with `--branch` |
| `--status <STATUS>` | String | `unresolved` | `unresolved`, `resolved`, or `all` |
| `--page <PATH>` | String | None | Filter by recorded page path or glob; repeatable. Rewrites can make the recorded path differ from the browser URL |
| `--author <USER>` | String | None | User ID or `me`; repeatable. `me` requires user authentication; usernames are not supported |
| `--content-id <ID>` | String | None | Filter by CMS content ID; repeatable |
| `--search <TEXT>` | String | None | Search comment content |
| `--limit <NUMBER>` | Number | `20` | 1 to 100 threads per page |
| `-N, --next <CURSOR>` | String | None | Next page using the cursor from the previous output |

`reply` (and `edit`, which takes `--message` / `--file` only):

| Name | Type | Description |
|------|------|-------------|
| `-m, --message <TEXT>` | String | Markdown message content |
| `--file <PATH>` | String | Read Markdown from a file; `-` for stdin. Cannot combine with `--message` |
| `--attach <URL>` | String | Attach a file by HTTPS URL; repeat for up to 10 files (`reply`). Local file uploads are not supported |

`resolve` / `reopen`:

| Name | Type | Applies to | Description |
|------|------|------------|-------------|
| `-m, --message <TEXT>` | String | `resolve` | Closing reply before resolving one thread; not supported for multiple threads |
| `-y, --yes` | Boolean | Both | Skip the confirmation prompt for multiple threads |

JSON output shapes:

| Command | Output |
|---------|--------|
| `list` | Object with `scope`, `filters`, `pagination`, `threads` |
| `inspect` | Thread object with full `messages` array |
| `reply`, `edit` | Created or updated message object |
| `resolve` / `reopen` (one thread) | Object with `thread` and `replied` |
| `resolve` / `reopen` (multiple) | Object with a `results` array |
| `delete` | Object containing the deleted message `id` |

## Notes

- `list` uses the linked project and filters by the current Git branch when it can infer one; branch inference applies only when `--project` matches the current checkout.
- Thread-level commands accept a thread ID or a full `vercel.com` comment URL; the URL's team is used unless `--scope` or `--project` is passed.
- `inspect` shows every message and its message ID, which `edit` and `delete` require. Omitting `[thread]` in an interactive terminal prompts a choice from unresolved comments.
- Pass `--yes` in non-interactive or JSON mode for multi-thread `resolve` / `reopen` and for `delete`. Deletion cannot be undone.
- Bulk operations continue after an individual failure and exit nonzero if any operation fails.
- JSON mode never prompts; errors return an `error` object with `code` and `message` and a nonzero exit status.
- When another page is available, JSON output returns the cursor as `pagination.nextCursor`.
- Source: https://vercel.com/docs/cli/comments

## Related

- [api.md](./api.md)
- [alerts.md](./alerts.md)
- [list.md](./list.md)
- [logs.md](./logs.md)
- [global-options.md](./global-options.md)
