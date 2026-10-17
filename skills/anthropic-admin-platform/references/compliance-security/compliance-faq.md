<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-faq / last verified: 2026-10-16 -->

# Compliance API FAQ

Answers to common questions about Compliance API access, scopes, data coverage, retention, and integration patterns.

## Notes

- **Access/scopes**: Primary owner (Claude Enterprise) or org admin (standalone Claude Console) enables the Compliance API. Turning it off stops new recording but does not delete captured events; the toggle change itself is logged. A Claude Enterprise parent organization never appears in Claude Console — create Compliance Access Keys in claude.ai instead. Regular Claude API keys (`sk-ant-api03-...`) cannot authenticate Compliance API calls.
- **Data coverage/retention**: Activity Feed retains 6 years and records resource events, not prompt/response text. Chat/message/file bodies require `read:compliance_user_data` on chat/file endpoints. Sessions are covered via the session endpoints (see `compliance-sessions.md`): local sessions (on users' machines, captured while users are signed in with their Claude Enterprise account) for Cowork, Claude Code, Claude Science, Claude for Microsoft 365, Claude in Chrome, and the Google Docs / Sheets / Slides add-ins, and remote sessions (Cowork sessions started on claude.ai web or mobile, running in the cloud). Endpoints are stable for Cowork, Claude Code, and Claude for Microsoft 365; Claude Science, Claude in Chrome, and the Google add-ins are in beta. Not captured: Claude Code sessions authenticated with a Claude Console API key or run through Amazon Bedrock / Google Cloud / Microsoft Foundry, and Claude Code cloud sessions (including routines), which are not remote sessions. HIPAA-readiness organizations get local Cowork and Claude Code sessions only, stored 30 days; ZDR sessions are excluded. Transcripts include prompts, responses, tool calls/results, file contents (via tool calls), artifacts, and skills, but not images or token usage/cost/latency (use OpenTelemetry logging for that). Deleted content via the Compliance API is not recoverable; claude.ai soft-deletes remain visible with `deleted_at` until hard-deleted or retention expires.
- **Integration/pagination**: Correlate with SIEM on `actor.user_id`, `actor.email_address`, `actor.ip_address`, `created_at`. Activities are newest-first; walk `before_id` until `has_more` is `false` to catch up to real time. A sandbox for full-endpoint testing requires a Claude Enterprise organization linked to a Claude Console organization under a shared parent (via Merge Organizations); Activity-Feed-only testing works on an eligible standalone Claude Console organization with an Admin API key.

## Related

- [compliance-api.md](./compliance-api.md)
- [compliance-api-access.md](./compliance-api-access.md)
- [compliance-integration-patterns.md](./compliance-integration-patterns.md)
- [compliance-errors.md](./compliance-errors.md)
