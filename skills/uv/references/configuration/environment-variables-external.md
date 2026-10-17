---
source: https://docs.astral.sh/uv/reference/environment/#externally-defined-variables
---

# Externally defined environment variables

uv also reads the following externally defined environment variables.

## Signature / Usage

```console
$ HTTPS_PROXY=http://proxy.example.com NO_PROXY=localhost uv pip install ruff
$ RUST_LOG=uv=debug uv sync
$ SSL_CERT_FILE=/path/to/ca-bundle.crt uv sync
```

## Options / Props

| Name | Added in | Description |
| --- | --- | --- |
| `ALL_PROXY` | 0.1.38 | General proxy for all network requests. |
| `ANDROID_API_LEVEL` | 0.8.16 | Used with `--python-platform aarch64-linux-android` and related variants to set the minimum supported Android API level. Defaults to `24`. |
| `APPDATA` | 0.1.42 | Path to user-level configuration directory on Windows systems. |
| `AWS_ACCESS_KEY_ID` | 0.8.21 | AWS access key ID used when signing S3 requests. |
| `AWS_CONFIG_FILE` | 0.8.21 | AWS config file used when signing S3 requests. |
| `AWS_DEFAULT_REGION` | 0.8.21 | Default AWS region used when signing S3 requests, if `AWS_REGION` is not set. |
| `AWS_PROFILE` | 0.8.21 | AWS profile used when signing S3 requests. |
| `AWS_REGION` | 0.8.21 | AWS region used when signing S3 requests. |
| `AWS_SECRET_ACCESS_KEY` | 0.8.21 | AWS secret access key used when signing S3 requests. |
| `AWS_SESSION_TOKEN` | 0.8.21 | AWS session token used when signing S3 requests. |
| `AWS_SHARED_CREDENTIALS_FILE` | 0.8.21 | AWS shared credentials file used when signing S3 requests. |
| `BASH_VERSION` | 0.1.28 | Used to detect Bash shell usage. |
| `CLICOLOR_FORCE` | 0.1.32 | Used to control color via `anstyle`. |
| `COLUMNS` | 0.6.2 | Overrides terminal width used for wrapping. Not read by uv directly. A quasi-standard variable, described in `ncurses(3x)`. |
| `CONDA_DEFAULT_ENV` | 0.5.0 | Used to determine the name of the active Conda environment. |
| `CONDA_PREFIX` | 0.0.5 | Used to detect the path of an active Conda environment. |
| `DEPENDABOT` | 0.9.11 | Used to determine if running in Dependabot. |
| `FISH_VERSION` | 0.1.28 | Used to detect Fish shell usage. |
| `FORCE_COLOR` | 0.2.7 | Forces colored output regardless of terminal support (see force-color.org). |
| `GITHUB_ACTIONS` | 0.4.16 | Indicates the process is running in GitHub Actions. `uv publish` may attempt trusted publishing flows when set to `true`. |
| `GITLAB_CI` | 0.8.18 | Indicates the process is running in GitLab CI. `uv publish` may attempt trusted publishing flows when set to `true`. |
| `HF_TOKEN` | 0.8.1 | Authentication token for Hugging Face requests. Used for requests to `https://huggingface.co/` and any subdomains. |
| `HOME` | 0.0.5 | The standard `HOME` env var. |
| `HTTPS_PROXY` | 0.1.38 | Proxy for HTTPS requests. |
| `HTTP_PROXY` | 0.1.38 | Proxy for HTTP requests. |
| `HTTP_TIMEOUT` | 0.1.7 | Timeout (in seconds) for HTTP requests. Equivalent to `UV_HTTP_TIMEOUT`. |
| `IPHONEOS_DEPLOYMENT_TARGET` | 0.8.16 | Used with `--python-platform arm64-apple-ios` and related variants to set the minimum supported iOS version. Defaults to `13.0`. |
| `JPY_SESSION_NAME` | 0.2.6 | Used to detect when running inside a Jupyter notebook. |
| `KSH_VERSION` | 0.2.33 | Used to detect Ksh shell usage. |
| `LOCALAPPDATA` | 0.3.3 | Used to look for Microsoft Store Pythons installations. |
| `MACOSX_DEPLOYMENT_TARGET` | 0.1.42 | Used with `--python-platform macos` and related variants to set the minimum supported macOS version. Defaults to `13.0`, the least-recent non-EOL macOS version at time of writing. |
| `NETRC` | 0.1.16 | Used to set the `.netrc` file location. |
| `NO_COLOR` | 0.2.7 | Disables colored output (takes precedence over `FORCE_COLOR`; see no-color.org). |
| `NO_PROXY` | 0.1.38 | Comma-separated list of hostnames (e.g., `example.com`) and/or patterns (e.g., `192.168.1.0/24`) that should bypass the proxy. |
| `NU_VERSION` | 0.1.16 | Used to detect `NuShell` usage. |
| `PAGER` | 0.4.18 | The standard `PAGER` posix env var. Used to configure the appropriate pager. |
| `PATH` | 0.0.5 | The standard `PATH` env var. |
| `PROMPT` | 0.1.16 | Used to detect the use of the Windows Command Prompt (as opposed to PowerShell). |
| `PSModulePath` | 0.10.0 | Used to detect PowerShell usage (set by PowerShell on all platforms). |
| `PWD` | 0.0.5 | The standard `PWD` posix env var. |
| `PYC_INVALIDATION_MODE` | 0.1.7 | The validation modes to use when run with `--compile` (see Python `PycInvalidationMode`). |
| `PYTHONPATH` | 0.1.22 | Adds directories to Python module search path (e.g., `PYTHONPATH=/path/to/modules`). |
| `PYX_API_KEY` | 0.8.15 | The pyx API key (e.g., `sk-pyx-...`). |
| `PYX_AUTH_TOKEN` | 0.8.15 | The pyx authentication token, as output by `uv auth token`. |
| `RUFF` | 0.11.22 | Path to the Ruff binary used by `uv format`. |
| `RUST_BACKTRACE` | 0.7.22 | Display more stack trace details when a panic occurs. `RUST_BACKTRACE=1` prints a short backtrace; `RUST_BACKTRACE=full` a full backtrace. |
| `RUST_LOG` | 0.0.5 | Log level for uv's `--verbose` output; accepts any filter compatible with the `tracing_subscriber` crate. `RUST_LOG=uv=debug` is equivalent to `--verbose`; `RUST_LOG=trace` enables trace-level logging. |
| `RUST_MIN_STACK` | 0.5.19 | Stack size used by uv, in bytes (4MB default when this and `UV_STACK_SIZE` are unset). Prefer `UV_STACK_SIZE`, since `RUST_MIN_STACK` also affects subprocesses such as build backends that use Rust code. |
| `SHELL` | 0.1.16 | The standard `SHELL` posix env var. |
| `SSL_CERT_DIR` | 0.9.10 | Path to a directory containing PEM-encoded CA certificate files for TLS connections. Multiple entries separated by `:` on Unix, `;` on Windows. Unparseable files are ignored; symlinks resolved and dangling symlinks ignored. DER-encoded files are not supported. When set, overrides the default certificate source: only certificates in this directory are trusted. |
| `SSL_CERT_FILE` | 0.1.14 | Path to a CA certificate bundle file (PEM-encoded, e.g., `certs.pem`, `ca-bundle.crt`). DER not supported. When set, overrides the default certificate source: only certificates in this file are trusted. |
| `SSL_CLIENT_CERT` | 0.2.11 | File used for mTLS authentication: a single file containing both the certificate and the private key in PEM format. |
| `SYSTEMDRIVE` | 0.4.26 | Path to system-level configuration directory on Windows systems. |
| `TRACING_DURATIONS_FILE` | 0.0.5 | Used to create the tracing durations file via the `tracing-durations-export` feature. |
| `TY` | 0.11.22 | Path to the ty binary used by `uv check`. |
| `USERPROFILE` | 0.0.5 | Path to root directory of user's profile on Windows systems. |
| `UV` | 0.6.0 | Path to the binary that was used to invoke uv. Propagated to all subprocesses spawned by uv. If invoked through a symbolic link, some platforms return the symlink path and others its target. |
| `VIRTUAL_ENV` | 0.0.5 | Used to detect an activated virtual environment. |
| `VIRTUAL_ENV_DISABLE_PROMPT` | 0.0.5 | If set to `1` before a virtual environment is activated, the environment name is not prepended to the terminal prompt. |
| `XDG_BIN_HOME` | 0.2.16 | Path to directory where executables are installed. |
| `XDG_CACHE_HOME` | 0.1.17 | Path to cache directory on Unix systems. |
| `XDG_CONFIG_DIRS` | 0.4.26 | Path to system-level configuration directory on Unix systems. |
| `XDG_CONFIG_HOME` | 0.1.34 | Path to user-level configuration directory on Unix systems. |
| `XDG_DATA_HOME` | 0.2.16 | Path to directory for storing managed Python installations and tools. |
| `ZDOTDIR` | 0.2.25 | Used to determine which `.zshenv` to use when Zsh is being used. |
| `ZSH_VERSION` | 0.1.28 | Used to detect Zsh shell usage. |
| `_CONDA_ROOT` | 0.8.18 | Used to determine the root install path of Conda. |

## Notes

- `PYX_API_KEY` and `PYX_AUTH_TOKEN` are registry credentials; `AWS_*` variables are used only to sign requests to S3-compatible endpoints configured with `UV_S3_ENDPOINT_URL`. Neither relates to application authentication (see better-auth, supabase).
- `GITHUB_ACTIONS` / `GITLAB_CI` only influence trusted-publishing detection in `uv publish`; for Actions syntax in general see github-docs.

## Related

- [Environment variables (UV_A-UV_M)](./environment-variables-uv-a-m.md)
- [Environment variables (UV_N-UV_Z)](./environment-variables-uv-n-z.md)
- [Storage](./storage.md)
