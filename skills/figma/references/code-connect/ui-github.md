# Connect to GitHub Repository

Links a GitHub repository to a Figma library file in Code Connect UI, enabling file path autocomplete and enhanced Figma MCP server context.

## Usage

UI procedure page (no code API); steps below replace a code example.

1. Open Code Connect UI in your Figma library file
2. Click **Settings** → **Connect to GitHub**
3. Authenticate with your GitHub account
4. Select **Install and Authorize** and confirm repository access (requires admin or owner permissions)
5. Select the repository and designate component directories

## Notes

- You must be the **owner** of the Figma library file to connect GitHub; on Organization and Enterprise plans, organization admins can also connect files
- Multiple repositories can be connected: click the `+` above the list of repositories to add more. On Professional plans, you can connect more than one repository to the active library as long as every repository uses the same framework
- The GitHub App permissions requested at authorization are listed on the GitHub App permissions overview page (github-permissions in the Code Connect docs)
- GitHub Enterprise Server (GHES) is **not supported**
- Users without admin permissions must request access from their organization administrator
- Connected directories become available for component path autocomplete when mapping components

## Related

- [UI Setup](./ui-setup.md)
- [Comparing CLI and UI](./comparing-cc.md)
