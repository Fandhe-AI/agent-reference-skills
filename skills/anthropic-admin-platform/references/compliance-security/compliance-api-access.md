<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-api-access / last verified: 2026-08-07 -->

# Set up the Compliance API

Enable the Compliance API for your organization, then create a Compliance Access Key (with scoped permissions) or an Admin API key. Required role: organization admin (Claude Console), or primary owner/organization owner (claude.ai).

## Signature / Usage

```bash
# After creating a Compliance Access Key in claude.ai
export ANTHROPIC_COMPLIANCE_ACCESS_KEY=sk-ant-api01-...

# After creating an Admin API key in Claude Console
export ANTHROPIC_ADMIN_KEY=sk-ant-admin01-...
```

## Options / Props

| Key type | Created in | Used for | Works with Compliance API? |
| --- | --- | --- | --- |
| Compliance Access Key (`sk-ant-api01-...`) | claude.ai > Organization settings > API | Activity Feed, chats, files, projects, Cowork remote sessions, users, org metadata, org settings | Yes (all endpoints) |
| Admin API key (`sk-ant-admin01-...`) | Claude Console > Settings > Admin keys | Admin API and Compliance API Activity Feed | Activity Feed only |
| Analytics API key | claude.ai > Organization settings > API | Claude Enterprise Analytics API | No |
| Claude API key (`sk-ant-api03-...`) | Claude Console > Settings > API keys | Calling Claude models through Claude API | No |

Compliance Access Key scopes (select when creating the key):

| Scope | Grants |
| --- | --- |
| `read:compliance_activities` | Read the Activity Feed |
| `read:compliance_user_data` | Read user chats, messages, files, projects, Cowork remote sessions/transcripts, org users, group members |
| `delete:compliance_user_data` | Delete user chats, files, and projects |
| `read:compliance_org_data` | Read organization metadata and effective settings (user/group listings need `read:compliance_user_data`) |

## Notes

- Claude Enterprise parent organizations do not appear in Claude Console; create Compliance Access Keys in claude.ai Organization settings, not Claude Console.
- Compliance Access Key scopes are immutable after creation. To change scopes, create a new key and delete the old one.
- Turning the Compliance API off stops activity recording (and Access Transparency delivery); previously recorded activity is not deleted. Turning it back on resumes recording from that point.
- Admin API keys carry `read:compliance_activities` only if the Compliance API was enabled for the organization at the time the key was created.
- Deleting a key takes effect on the next request; there is no grace period. Pagination cursors remain valid across key rotation (cursors are scoped to the organization, not the key).
- Use the smallest scope set needed; use two keys with separate scopes when a workflow both reads and deletes.

## Related

- [compliance-api.md](./compliance-api.md)
- [compliance-activity-feed.md](./compliance-activity-feed.md)
- [compliance-content-data.md](./compliance-content-data.md)
- [compliance-errors.md](./compliance-errors.md)
