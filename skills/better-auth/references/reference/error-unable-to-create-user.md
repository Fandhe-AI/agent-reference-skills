# unable_to_create_user

## Notes

- Occurs when user creation fails during authentication, primarily in OAuth or SSO-based sign-up flows.
- Common causes: DB issues (connection errors, timeouts, transaction failures); schema issues (missing required user fields or type mismatches); constraint violations (duplicate email addresses or unique key conflicts); drift between the DB structure and Better Auth's expectations; exceptions thrown inside the `databaseHooks.user.create` custom hook; misconfigured DB client or adapter.
- Fix: verify DB accessibility, connection pool, and timeouts; validate that required user fields exist with correct data types and no unique constraint conflicts; run `npx auth migrate` to bring the DB schema up to date with the installed Better Auth version; check the `databaseHooks.user.create` implementation for errors or invalid return values; review server logs for the specific error during user creation.

## Related

- [unable_to_create_session](./error-unable-to-create-session.md)
- [internal_server_error](./error-internal-server-error.md)
