# Set Up Example NemoClaw Agents

Deploy four ready-to-run NemoClaw sandbox applications: daily news digest, software development agent, deck reviewer, and calendar negotiator.

## Signature / Usage

```bash
nemoclaw list
nemoclaw status
nemoclaw policy-add --from-file <policy.yaml>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Daily Personal News Digest | agent | scheduled news summary delivered to Telegram/web UI |
| Software Development Agent | agent | reads project dir, implements changes, self-reviews, no public internet egress |
| Deck Reviewer | agent | red-teams presentations/documents for inconsistencies |
| Calendar Negotiator | agent | negotiates meeting times respecting focus blocks and timezones |

## Notes

- Requires a completed NemoClaw install with active OpenShell gateway and working sandbox
- Filesystem mounts use `tar` streams over `nemoclaw exec --stdin` (the flag forwards the archive from the host into the sandbox); hard read-only walls require `filesystem_policy` rebuild
- Dev agent has no outbound network access beyond local inference
- Cleanup via `nemoclaw policy-remove`
- Source: https://github.com/NVIDIA/dgx-spark-playbooks/blob/3088315/nvidia/playbook-nemoclaw-applications/README.md (commit 3088315, 2026-10-23)

## Related

- [Run NemoClaw with a Local LLM](./nemoclaw.md)
