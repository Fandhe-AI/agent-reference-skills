# .env File Support

gws automatically loads environment variables from a `.env` file in the working directory using [dotenvy](https://github.com/allan2/dotenvy). Any variable listed in [env-vars.md](./env-vars.md) can be placed in `.env` instead of being set in the shell.

## Usage

```sh
# .env
GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/credentials.json
GOOGLE_WORKSPACE_PROJECT_ID=my-gcp-project
GOOGLE_WORKSPACE_CLI_LOG=gws=debug
```

Run gws normally — variables are read from `.env` before the command executes.

## Notes

- A template file `.env.example` is provided in the repository as a starting point.
- Shell environment variables take precedence over `.env` values (standard dotenvy behavior).
- Do not commit `.env` files containing credentials to source control.

## Related

- [env-vars.md](./env-vars.md)
- [ci-headless.md](./ci-headless.md)
