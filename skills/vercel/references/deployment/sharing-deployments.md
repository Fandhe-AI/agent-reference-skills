# Sharing a Preview Deployment

How to share a preview deployment with team members and external collaborators, including with Deployment Protection enabled.

## Signature / Usage

Sharing options in the dashboard or Vercel Toolbar:

```text
Share (Toolbar menu or deployment row in dashboard)
  -> Invite users by email (recommended for externals)
  -> Team members with access (default)
  -> Anyone (without deployment protection)
  -> Anyone with the link (with deployment protection) -> Copy Link
  -> Access Requests: allow or deny
```

## Sharing with team members

- Team members with project access get access to the deployment by default (comment, see viewers, use the toolbar).
- To share: invite individual users or groups, copy the URL from the browser address bar, or select **Share** in the Vercel Toolbar menu and copy the URL.

## Sharing with external collaborators

| Method | Details |
|--------|---------|
| Invite users (recommended) | Pro/Enterprise can add one or more collaborators; Hobby is limited to one collaborator at a time. Revoke via the **Revoke** icon in the Share dialog |
| Sharable link | **Anyone** (no deployment protection) or **Anyone with the link** (with deployment protection; creates a link that bypasses deployment protection). Use the **Copy Link** button URL, not the address bar |
| Request access | A user without access can select **Request Access** in the toolbar; owner is notified by email and notifications widget, and allows or denies under **Access Requests** |

## Notes

- External collaborators are not added to your Vercel team. They need a Vercel account only to view a protected deployment, use the toolbar, or comment.
- Two link types: branch links (latest commit) and commit links (up to a specific commit). The dashboard Share modal defaults to the branch link; the toolbar shares the current link.
- Without deployment protection, anyone with the link can view. With **Authentication**, only team members, individually added users, requesters, or sharable-link holders can view. With **Password Protection**, only users with the password (or the same exceptions) can view.
- Scope access to the fewest people possible.
- Source: https://vercel.com/docs/deployments/sharing-deployments

## Related

- [generated-urls.md](./generated-urls.md)
- [managing-deployments.md](./managing-deployments.md)
- [environments.md](./environments.md)
