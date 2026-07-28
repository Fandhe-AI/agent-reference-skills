# Permission Groups and One-Time Permission

Related dangerous permissions are bundled into permission groups so the system can present a single dialog; for sensitive data (location, camera, microphone) the dialog additionally offers a one-time "Only this time" grant.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Permission group | grouping concept | — | Permissions sharing a group (e.g. SMS send/receive) can appear together in one system dialog. Groupings are not guaranteed stable across releases. |
| "Only this time" | runtime dialog option | — | Available for location, camera, and microphone since Android 11 (API 30). Grants access only until the app process is fully stopped or the permission page is next reviewed. |
| "While using the app" | runtime dialog option | — | Foreground-only grant. |
| "Don't allow" | runtime dialog option | — | Denies the permission; a second denial without "Ask every time" is treated as `USER_FIXED`. |

## Notes

- After a one-time grant, the app must request the permission again on the next relevant use — never assume a prior grant persists across app restarts.
- Do not hard-code assumptions about which specific permissions share a group; request and check each dangerous permission individually via `checkSelfPermission()`.
- One-time permissions apply only to the location, camera, and microphone dangerous-permission groups, not to all runtime permissions.

## Related

- [requesting-runtime-permissions](./requesting-runtime-permissions.md)
- [automatic-permission-reset](./automatic-permission-reset.md)
- [explaining-permission-access](./explaining-permission-access.md)
