---
source: https://docs.cloud.google.com/shell/docs/how-cloud-shell-works
---

# How Cloud Shell works

Cloud Shell lets you manage Google Cloud resources and develop applications from your browser without installing local tools. A session provisions an ephemeral Compute Engine virtual machine running Debian-based Linux, owned and managed by Google Cloud (it does not appear within your projects).

## Signature / Usage

Cloud Shell instances are provisioned per-user, per-session. The instance persists while your session is active; after an hour of inactivity, your session terminates and its VM is discarded. With the default experience you get an ephemeral, pre-configured VM and the environment you work with is a Docker container running on that VM. You can also customize your environment automatically on VM boot.

### Persistent disk storage

Cloud Shell provisions 5 GB of free persistent disk storage mounted as your `$HOME` directory. It is per-user and available across projects; unlike the instance, it does not time out on inactivity. All files you store in your home directory, including installed software, scripts and `.bashrc` / `.vimrc`, persist between sessions. Your `$HOME` is private to you. You cannot expand the persistent disk; for more control and space, use Cloud Workstations.

Cloud Shell also offers Ephemeral mode: no persistent disk, faster startup, all files lost on session end.

### Authorization

The first time you make a Google Cloud API call or use a tool that requires credentials, Cloud Shell prompts you to authorize; click **Authorize**. See [auth.md](./auth.md).

### Pre-configured environment variables

The active project in the Google Cloud console is propagated to your `gcloud` configuration. `GOOGLE_CLOUD_PROJECT` is set to that project. The environment variable `WEB_HOST` points to the hostname of your Cloud Shell VM which you can use to make HTTPS requests to the environment.

### Zone selection

Cloud Shell is globally distributed across multiple Google Cloud regions. You are assigned to the closest available region; you can't pick your own, and Cloud Shell tries to migrate your VM to a closer region when it isn't in use. To view your current region, run from a Cloud Shell session:

```bash
curl metadata/computeMetadata/v1/instance/zone
```

Adapted (not in the official docs): the Compute Engine metadata server requires the `Metadata-Flavor: Google` request header for `computeMetadata/v1` paths.

```bash
curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/zone
```

### Image rollout

The container image is updated weekly, so Cloud Shell always comes with the latest versions of the gcloud CLI, Docker, and other utilities.

### Root user

You get a regular Unix user account with a username based on your email address, with full root privileges on your allocated VM, including `sudo`.

### Available tools

| Type | Tool |
| --- | --- |
| Linux shell interpreters | bash sh |
| Linux utilities | Standard Debian system utilities |
| gcloud CLI and tools | Google Cloud CLI including the gcloud CLI |
| Text editors | Emacs Vim Nano |
| Build and package tools | Gradle Helm Make Maven Bazel npm nvm pip uv Composer |
| Source control tools | Git Mercurial |
| Additional tools | Docker iPython MySQL client gRPC compiler TensorFlow |

Additional software installs do not persist after the instance terminates unless installed in your `$HOME` directory or provided through a custom environment.

### Language support

| Language | Version |
| --- | --- |
| Java | JRE/JDK 17 (OpenJDK) |
| Go | Latest |
| Python | 3.12 |
| Node.js | LTS |
| Ruby | 3.2 |
| PHP | 8.3 |
| .NET Core | SDKs 6.0, 7.0, and 8.0 |

The default Java version is 17. To change the current session to JRE and JDK 1.11:

```sh
sudo update-java-alternatives -s java-1.11.0-openjdk-amd64 && export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
```

To change to 21:

```sh
sudo update-java-alternatives -s java-1.21.0-openjdk-amd64 && export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
```

To change back to 17:

Adapted (not in the official docs): the official command sets `JAVA_HOME` to `/usr/lib/jvm/java-17-openjdk-amd64/jre`; OpenJDK 17 has no separate `jre` directory, so the JDK root is used, as in the Java 11 and 21 commands.

```sh
sudo update-java-alternatives -s java-1.17.0-openjdk-amd64 && export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

### Safe mode

If there's a problem in your `.bashrc` or `.tmux.conf` files, Cloud Shell immediately closes after connection. Safe mode restarts your instance and logs you in as root, allowing you to fix the files. To open Cloud Shell in safe mode, append `cloudshellsafemode=true` to the URL, or use the **Safe Mode** option and click **Restart**. To permanently delete all files in your home directory and restore it to a clean state, reset your Cloud Shell VM (see [resetting-cloud-shell.md](./resetting-cloud-shell.md)).

## Notes

- Adapted from the official docs: the region example is also shown with the `Metadata-Flavor: Google` header that the metadata server requires for `computeMetadata/v1` requests.
- Warning (verbatim): If you delete your `$HOME` directory, or if you don't access Cloud Shell for 120 days, Cloud Shell automatically deletes your `$HOME` directory and can't recover your files. You'll receive an email notification before this occurs. Starting a Cloud Shell session prevents the `$HOME` directory persistent storage from being recycled.
- While `GOOGLE_CLOUD_PROJECT` inherits the active project from the console, your Cloud Shell instance is not directly associated with or managed by this project.
- Inactivity timeout: this page says the session terminates "after an hour of inactivity", whereas [quotas-limits.md](./quotas-limits.md) says the VM "terminates if your session is inactive for 40 minutes". Both are kept as written in the official pages.
- Language versions might change; you can install different versions with the environment customization script. Corrected from the official docs: the Java 17 command sets `JAVA_HOME` to `/usr/lib/jvm/java-17-openjdk-amd64/jre`, but OpenJDK 17 ships no separate `jre` directory; the JDK root `/usr/lib/jvm/java-17-openjdk-amd64` is used, matching the Java 11 and 21 commands.
- The Safe Mode bullet in the source reads "click , click **Safe Mode**" (the name of the first button is missing in the fetched twin); it is not guessed here.
- Source: https://docs.cloud.google.com/shell/docs/how-cloud-shell-works (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuring-cloud-shell.md](./configuring-cloud-shell.md)
- [quotas-limits.md](./quotas-limits.md)
- [resetting-cloud-shell.md](./resetting-cloud-shell.md)
- [using-cloud-shell.md](./using-cloud-shell.md)
