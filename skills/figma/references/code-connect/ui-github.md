# Connect to GitHub Repository

Links a GitHub repository to a Figma library file in Code Connect UI, enabling file path autocomplete and enhanced Figma MCP server context.

## Signature / Usage

1. Open Code Connect UI in your Figma library file
2. Click **Settings** → **Connect to GitHub**
3. Authenticate with your GitHub account
4. Select **Install and Authorize** and confirm repository access (requires admin or owner permissions)
5. Select the repository and designate component directories

## Notes

- You must be the **owner** of the Figma library file or an **organization admin** to connect GitHub
- Only **one repository** can be linked per Figma library file
- GitHub Enterprise Server (GHES) is **not supported**
- Users without admin permissions must request access from their organization administrator
- Connected directories become available for component path autocomplete when mapping components

## Related

- [UI Setup](./ui-setup.md)
- [Comparing CLI and UI](./comparing-cc.md)
