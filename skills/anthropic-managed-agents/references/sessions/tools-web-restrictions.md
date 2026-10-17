<!-- source: https://platform.claude.com/docs/en/managed-agents/tools-web-restrictions / last verified: 2026-10-17 -->

# Restrict web search and web fetch domains

Control which sites an agent's `web_search` and `web_fetch` tools can reach, cap fetched content, and localize search results. Beta header: `managed-agents-2026-04-01`.

## Signature / Usage

```json
{
  "type": "agent_toolset_20260401",
  "configs": [
    {
      "type": "web_search",
      "name": "web_search",
      "allowed_domains": ["docs.example.com", "arxiv.org"],
      "user_location": { "type": "approximate", "country": "US", "timezone": "America/Los_Angeles" }
    },
    {
      "type": "web_fetch",
      "name": "web_fetch",
      "blocked_domains": ["ads.example.com"],
      "max_content_tokens": 50000
    }
  ]
}
```

Sent in the `tools` array of `POST /v1/agents` (also accepted when creating or updating a session that supplies `tools`).

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `allowed_domains` | string[] (web_search, web_fetch) | The only hosts the tool can reach |
| `blocked_domains` | string[] (web_search, web_fetch) | Hosts the tool cannot reach |
| `max_content_tokens` | positive integer (web_fetch) | Caps fetched page content included in the context |
| `user_location` | object (web_search) | Localizes search results; same fields as the Messages API `user_location` parameter |

## Notes

- Each tool carries its own list, so `web_search` and `web_fetch` can differ. Set either `allowed_domains` or `blocked_domains` on an entry, not both.
- List size 1 to 64 domains, each 1 to 255 characters. No empty lists (omit the field or send `null`). No duplicates; `www.example.com` and `example.com` are different domains.
- A listed domain matches that host and all its subdomains (`example.com` covers `docs.example.com`, not vice versa). Comparison is case-insensitive.
- Domain format: plain ASCII hostname. Not accepted: scheme, port, wildcard (`*.example.com`), path on a `web_fetch` domain, IP address in any form, bare TLD / registry suffix (`com`, `co.uk`), single-label name, non-ASCII (use `xn--` Punycode), credentials, whitespace, labels starting or ending with a hyphen, `localhost` and hosts ending in `.localhost`, `.local`, `.internal`, `.localdomain`, `.invalid`.
- A `web_search` domain may carry a path suffix (e.g. `example.com/blog`) without spaces, `?`, `#`, or `$ , | ^ !`; plain hostnames are preferred because the search provider matches path suffixes as URL patterns.
- `web_search` omits results that its list does not permit. `web_fetch` for a non-permitted URL returns an `agent.tool_result` event with `is_error: true` and error code `url_not_allowed`.
- These tools run on Anthropic's servers, not in the sandbox. In a cloud environment with `limited` networking, the environment's `allowed_hosts` also applies. Session create (or update) fails with 400 if an enabled web tool's `allowed_domains` entry is not within `allowed_hosts`. Matching differs: a tool entry covers its subdomains, but an `allowed_hosts` entry matches one exact host unless it starts with `*.` (tool entry `docs.example.com` is within `["docs.example.com"]` or `["*.example.com"]`, not `["example.com"]`). `unrestricted` networking and self-hosted environments do not limit them.
- Organization-level web search / web fetch settings in the Claude Console apply to the Messages API, not to Managed Agents sessions.
- Validation (400 `invalid_request_error`): `Only one of allowed_domains or blocked_domains may be set.`; `allowed_domains: Empty list of domains is ambiguous. Provide at least one domain or null.`; format violations name the list and zero-based position (e.g. `allowed_domains.0: IP addresses are not supported; provide a plain hostname like "example.com"`). Also rejected: an `allowed_domains` entry Anthropic's crawler may not access, an unsupported `user_location.country`, an invalid IANA `user_location.timezone`.
- If a previously accepted setting becomes invalid when the tool first initializes, the session emits `session.error` and returns to `idle` without retrying. Fix by updating the session's tools, update the agent too, then send a new `user.message`.
- Multiagent sessions: every applicable list is enforced at once (the listed agent's own lists, those of any agent that called it, and the session agent's current lists). `allowed_domains` must be covered by every list; `blocked_domains` add together; `max_content_tokens` and `user_location` are not combined (own value, else caller's, else session agent's). A listed agent can narrow but never widen. A `{"type": "self"}` entry follows the session agent's settings. If combined allowed lists share no domain, every call fails with `url_not_allowed`.
- The grader in outcome-driven sessions runs without `web_search` and `web_fetch`.
- Lists on an idle session can be changed by updating its tools; they apply for the rest of the session (every thread from its next turn). A listed agent's own lists are not changed by that update.
- Differences from Messages API server tools: 64-domain cap, no path on `web_fetch` domains, ASCII only, and `max_uses`, `citations`, `cache_control` are not available on the toolset.
- In the Claude Console, set domains in the `web_search` / `web_fetch` rows of the Built-in tools card; set `max_content_tokens` and `user_location` in the Raw view.

## Related

- [Tools](./tools.md)
- [Permission policies](./permission-policies.md)
- [Session operations](./session-operations.md)
