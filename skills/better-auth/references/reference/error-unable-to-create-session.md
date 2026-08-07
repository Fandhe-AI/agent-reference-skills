# unable_to_create_session

## Notes

- Occurs when Better Auth fails to create a session after a successful authentication step. Sessions are required to maintain the user's login state.
- Common causes: session record DB write failure; session storage misconfiguration or inaccessibility; network issues or DB timeouts; incomplete or invalid session-related data fields; custom hooks or adapters interfering with session creation.
- Fix: verify the database or session store is correctly configured and reachable; confirm session-related tables exist and the latest migrations are applied; check that session handling parameters are correct; review server logs for the specific error during session creation.

## Related

- [unable_to_create_user](./error-unable-to-create-user.md)
- [internal_server_error](./error-internal-server-error.md)
