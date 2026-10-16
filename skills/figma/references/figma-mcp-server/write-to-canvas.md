# Write to Canvas

Enables AI agents to create and modify native Figma content (frames, components, variables, auto layout) directly on the canvas using the `use_figma` tool. Output is editable design structure, not static screenshots.

## Signature / Usage

```
# Basic prompt pattern
"Using this Figma file: [URL], create a new page and build a settings screen with auto layout"

# From a selection link
"Using this selection: [link], convert these raw values to variables"

# Follow-up in the same file
"Add an empty state below that"
```

## Options / Props

| Requirement | Detail |
|-------------|--------|
| Plan | Professional, Education, Organization, and Enterprise |
| File type | Figma Design, FigJam, and Figma Slides |
| File permission | Edit access to the file |
| Server | Remote Figma MCP server (supported MCP client required) |
| Skills | `figma-use` helps the agent use `use_figma` reliably; `figma-spec` reads and writes Figma Specs (open beta) |

## Notes

- Feature is **beta** and currently free; will eventually become a usage-based paid feature. Because of beta, test on a duplicate of your library or a draft file before changing production files, and keep a backup copy
- Different from sending UI to Figma: sending UI captures a running app as flat layers without a connection to your libraries; write to canvas builds with your existing components and variables
- Current limitations:
  - Each tool call returns up to 20 KB of output
  - `use_figma` can't add new images on its own: add them with `upload_assets`, create them with `generate_image`. Importing components that contain images or videos, and creating GIFs, aren't supported yet
  - Fonts uploaded to your Figma account are usable; fonts only installed on your computer are not
  - Components must be published manually before Code Connect mappings can be completed
  - Output is beta quality and may need manual review and cleanup
- Tips: include a file or selection link; continue in the same conversation; make large changes in steps; name the libraries, components, variables, or modes to use
- Workflow: system → canvas → code (not a screenshot, generates real Figma layer structure)

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Tools and Prompts](./tools-and-prompts.md)
- [Code Connect Integration](./code-connect-integration.md)
- [Write Effective Prompts](./write-effective-prompts.md)
