# Rate Limits & Access

Who can use the Figma MCP server and how often, by plan and seat. Per-minute limits apply in addition to daily or monthly limits.

## Signature / Usage

```
# Check which account, plans, and seats the agent is using
whoami
```

## Options / Props

| Seat | Starter | Professional | Organization | Enterprise |
|------|---------|--------------|--------------|------------|
| View, Collab | Up to 20 per month | Up to 20 per month | Up to 20 per month | Up to 20 per month |
| Full, Dev | — | Up to 200 per day, 10 per minute | Up to 200 per day, 15 per minute | Up to 600 per day, 20 per minute |

Education plans have the same limits as Full and Dev seats on the Professional plan: up to 200 tool calls per day and 10 per minute.

## Notes

- Rate limits apply to tools that read data from Figma. Exempt tools include those that write to Figma files: `add_code_connect_map`, `create_new_file`, `generate_figma_design`, `whoami`.
- Actions that use Figma AI credits (generating images, sending prompts to Figma Make) don't count toward MCP rate limits.
- Figma may change rate limits at any time.
- To get higher limits: Starter (20 per month) upgrade to Professional / Organization / Enterprise with a Full or Dev seat; View or Collab seat upgrade to Full or Dev; Full or Dev on Professional / Education / Organization (200 per day) upgrade to Enterprise for up to 600 per day.
- Figma AI credits: most tools use none. `generate_image` uses credits per image (cost depends on image model); `send_prompt` uses credits when the Figma Make agent creates or changes code. Importing a project with `send_code_to_figma` is free for the first upload; prompting and later changes use credits.
- Figma Weave tools use Weave credits instead of Figma AI credits.
- Enterprise-managed authorization is supported for Claude through Okta Cross App Access (XAA): members sign in once through Okta and Claude can use the Figma MCP server without a separate Figma sign-in.
- Permission errors: the MCP server only works with Figma files the account already has access to. Check the link is a Figma Design, FigJam, or Figma Make file; run `whoami` to see the signed-in email, plans, and seats; make sure the account belongs to the plan that owns the file.
- Source: https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/ (fetched 2026-10-17)

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Tools and Prompts](./tools-and-prompts.md)
- [Weave Tools](./weave-tools.md)
