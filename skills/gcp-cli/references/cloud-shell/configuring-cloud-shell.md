---
source: https://docs.cloud.google.com/shell/docs/configuring-cloud-shell
---

# Configure Cloud Shell

Cloud Shell lets you set persistent environment variables, define gcloud CLI preferences, run a customization script to initialize tools across your sessions, and adjust usage statistics collection.

## Signature / Usage

### Configuration files in your home directory

Cloud Shell provisions 5 GB of free persistent disk storage mounted as your `$HOME` directory. All files you store in your home directory, including installed software, scripts and user configuration files like `.bashrc` and `.vimrc`, persist between sessions. Since your `.bashrc` persists, it is a good way to customize Cloud Shell behavior. To have installations persist, install packages into your home directory.

### Pre-configured environment variables

When Cloud Shell is started, the active project in Cloud Shell is propagated to your `gcloud` configuration for immediate use. `GOOGLE_CLOUD_PROJECT`, the environment variable used by Application Default Credentials library support to define project ID, is also set to point to the active project. The `CLOUD_SHELL` environment variable is set to `true`; applications can check it to determine if they are running in Cloud Shell.

### gcloud CLI preferences

Your gcloud CLI preferences are stored in a temporary `tmp` folder, set for your current tab only, and do not persist across sessions. To persist them:

- To keep your configuration customizable per tab but customize the default configuration itself, add `gcloud` configuration commands (such as `gcloud config set compute/region us-central1`) to the end of your `$HOME/.bashrc` file. Every new tab inherits your project and customized default configuration but can be customized further.
- To always use the same gcloud CLI configuration, add the following to the end of your `.bashrc` file, and then run `gcloud config configurations create CONFIG_NAME` to create the configuration you'd like to use:

```bash
export CLOUDSDK_CONFIG=$HOME/.config/gcloud
```

To set the project you'd like to work on:

```bash
gcloud config set project [PROJECT_NAME]
```

Your command prompt updates to the format `[USERNAME]@cloudshell:~ ([PROJECT_NAME])$`. To select your preferred region:

```bash
gcloud config set compute/region us-east1
```

For a full list of properties, see the gcloud CLI properties guide.

### Environment customization script

Cloud Shell automatically runs the script `$HOME/.customize_environment` when your instance boots up. Unlike `.profile` or `.bashrc`, this script runs once when Cloud Shell boots (rather than once for each shell login). It runs as root and you can install any packages that you want to exist in each session using Debian package management commands. For example, to have erlang installed:

```sh
#!/bin/sh
apt-get update
apt-get -y install erlang
```

Execution logs of your `.customize_environment` script can be found at `/var/log/customize_environment`. The script runs as a background process and on successful execution, will touch `/google/devshell/customize_environment_done`. Because package installation runs in parallel with your logging in, the installed packages may become available a few moments after you reach the login prompt.

### Open Cloud Shell with a specified user account

The `authuser` parameter lets you specify a user account to use with Cloud Shell. You must be logged in with the specified user account; if not, Cloud Shell opens with the default logged in account.

### tmux support

Cloud Shell uses `tmux`, which improves persistence across browser tab sessions: if you refresh the Google Cloud console in a tab or connect to your Cloud Shell from a different machine, the session state is not lost. Cloud Shell supports the default `tmux` key bindings; for example, pressing **Ctrl+b** and then **%** splits the current session window into left and right panes.

### Usage statistics

Cloud Shell collects anonymized usage statistics on commands run inside the terminal, only on commands that come pre-installed. These metrics can't be tied back to your account and don't include personally identifiable information such as arguments. To change preferences, select **Terminal Usage Statistics** in the **Settings** menu; a change takes effect on the next session (close your tab and open another).

This is separate from gcloud usage statistics, which is enabled by default in Cloud Shell. To disable gcloud CLI metrics collection, run:

```bash
gcloud config set disable_usage_reporting true
```

## Notes

- The `authuser` example URL in the fetched source is truncated (it shows only a stray backtick and `shell.cloud.google.com`), so no example URL is reproduced here.
- If you want a specific package included with Cloud Shell by default, the page asks you to submit your suggestion as feedback.
- Distance line: gcloud properties and named configurations in general are in the `config-auth` category of this skill.
- Source: https://docs.cloud.google.com/shell/docs/configuring-cloud-shell (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-cloud-shell-works.md](./how-cloud-shell-works.md)
- [resetting-cloud-shell.md](./resetting-cloud-shell.md)
- [quotas-limits.md](./quotas-limits.md)
- [open-in-cloud-shell.md](./open-in-cloud-shell.md)
