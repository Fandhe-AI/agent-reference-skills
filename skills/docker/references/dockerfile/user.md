---
source: https://docs.docker.com/reference/dockerfile/#user
---

# USER

Sets the user name (or UID) and optionally the user group (or GID) used as the default user and group for the remainder of the current stage.

## Signature / Usage

```dockerfile
USER <user>[:<group>]
USER <UID>[:<GID>]
```

```dockerfile
FROM microsoft/windowsservercore
# Create Windows user in the container
RUN net user /add patrick
# Set it for subsequent commands
USER patrick
```

## Notes

- The specified user is used for `RUN` instructions and at runtime runs the relevant `ENTRYPOINT` and `CMD` commands.
- When a group is specified, the user has only the specified group membership; any other configured group memberships are ignored.
- When the user doesn't have a primary group, the image (or the next instructions) runs with the `root` group.
- On Windows, the user must be created first if it's not a built-in account, e.g. with the `net user` command in a `RUN`.

## Related

- [workdir.md](./workdir.md)
- [copy.md](./copy.md)
