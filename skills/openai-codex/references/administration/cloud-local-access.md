# Local computer access for Work Cloud and dots

Lets Work and dots use permitted files and tools on a connected computer while OpenAI's cloud coordinates the task; enabled separately for each feature.

## Signature / Usage

Local requirements precedence (highest to lowest):

```text
macOS MDM requirements → legacy managed_config.toml fields interpreted as requirements → Agent Security cloud-managed requirements → system requirements.toml
```

Enable (workspace owner, **Admin Console** > **Permissions**):

- **Work:** enable **Work Cloud** for the intended users, then under **Work Cloud** turn on **Allow local computer access** (confirm the modal; optionally open **Agent Security** first). **Use Codex locally on the ChatGPT desktop app** is not a prerequisite.
- **Dots:** enable dots for intended users (subject to eligibility), then under **Use dots** turn on **Allow local computer access**.
- Users need ChatGPT desktop app 26.929 or higher.
- Verify: a member selects **Cloud** in the desktop composer (Work) or connects a computer (dots), starts a task, and confirms access to an approved local file or tool while the computer is connected.

## Options / Props

### Where execution happens

| Part | Behavior |
| --- | --- |
| Task coordination | OpenAI's cloud; enforces supported Global requirements from Agent Security (e.g. approvals, allowed web-search modes) when managed policy is enabled |
| Local execution | Connected computer enforces supported local-execution requirements and device policies (MDM where supported); only fields the local executor supports apply |
| Cloud execution | Work cloud containers and dots' cloud computers use separate controls; local filesystem/network restrictions don't automatically apply |

### Before you enable (current setup to action)

| Current setup | Action |
| --- | --- |
| Existing cloud policies | Compare the migrated Global baseline with required controls; test allowed and restricted actions |
| Policies only via MDM | Configure supported local-execution requirements in Agent Security; MDM and legacy managed-device requirements still rank above it locally |
| Terraform / scripts | Policy API manages Global settings; Local or Codex Cloud settings need the Agent Security UI |

### Eligibility and data handling

| Item | Detail |
| --- | --- |
| Work | Residency applies only to eligible content/workloads; Work isn't supported with UAE inference residency |
| Dots | Enterprise beta: no data or inference residency support; unavailable for FedRAMP, EKM, and AE (UAE) inference residency workspaces; HIPAA workspaces can participate |
| `enforce_residency` | If any cloud policy enables it, **Allow local computer access** is unavailable for both Work and dots |
| Retention | Neither experience provides strict zero data retention |

## Notes

- Orchestrator controls (approvals, web search) stay in Global; environments can't override them. Across policies, a higher-priority policy wins even if a lower one is more specific.
- Hooks: compare required hooks with the hooks supported with cloud orchestration; keep local-command or plugin-hook workflows local-only. A failed `PreToolUse` hook can let the tool run; hooks don't cover every internal subagent path.
- Network: managed HTTP/SOCKS listener ports and non-loopback proxy listeners are unsupported by the cloud runtime.
- Telemetry: local executors can still export supported execution events to an OTel collector, but cloud orchestration events don't reach it. Use the Compliance API (Work) and the Analytics API (usage, dots) for cloud records.
- Members must sign in with ChatGPT to the intended workspace; API keys and Codex access tokens can't enable Work local access. Disabling local access interrupts running Work turns but not necessarily running dots tasks.
- Dots end users: open the dot's details, choose Computers, select **Allow** and confirm; offline keeps the grant, **Revoke access** removes it; a running local task isn't migrated to the cloud.
- Source: https://learn.chatgpt.com/docs/enterprise/cloud-local-access (retrieved 2026-11-14).

## Related

- [Agent security](./agent-security.md)
- [Managed configuration](./managed-configuration.md)
- [Compliance API](./compliance-api.md)
- [Analytics API](./analytics-api.md)
- [Work admin FAQ](./work-admin-faq.md)
