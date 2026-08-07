# invalid_code

## Signature / Usage

```
Error code: invalid_code
```

Raised when the provided authentication code is invalid or has expired. Authentication codes are designed as single-use and time-limited.

## Notes

- Restart the auth flow: begin a new authentication flow to obtain a fresh code
- Respect code constraints: design your integration around codes being single-use and time-limited
- Verify the callback endpoint: confirm the correct code is reaching the callback endpoint

## Related

- [no_code](./error-no-code.md)
- [errors](./errors.md)
