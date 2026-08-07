# Unknown Error

## Notes

- Generic error page shown when an unidentified error occurs within Better Auth. Indicates something unexpected happened during an authentication operation.
- Common causes: an unexpected exception raised in Better Auth core functionality; a plugin encountering an unhandled error condition; an error that doesn't match any defined error code in the system.
- Immediate actions: retry the operation (transient issues sometimes resolve on subsequent attempts); check the browser console for detailed error messages or stack traces; review server-side logs for more context about what failed.
- Troubleshooting: visit the official error reference page to compare against known errors; verify the Better Auth configuration is correct; ensure all required environment variables are set; check that the database adapter is properly configured.
- Getting help: if the error appears to come from Better Auth core functionality or a plugin, open an issue on [GitHub](https://github.com/better-auth/better-auth/issues).

## Related

- [errors](./errors.md)
