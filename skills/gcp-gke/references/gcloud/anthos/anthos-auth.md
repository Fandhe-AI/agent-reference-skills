---
source: https://docs.cloud.google.com/sdk/gcloud/reference/anthos/auth
---

# gcloud anthos auth

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud anthos auth login

```text
NAME
    gcloud anthos auth login - authenticate clusters using the Anthos client

SYNOPSIS
    gcloud anthos auth login [--no-browser] [--cluster=CLUSTER] [--dry-run]
        [--kubeconfig=KUBECONFIG] [--login-config=LOGIN_CONFIG]
        [--login-config-cert=LOGIN_CONFIG_CERT]
        [--remote-bootstrap=REMOTE_BOOTSTRAP] [--server=SERVER]
        [--set-preferred-auth] [--user=USER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Authenticate clusters using the Anthos client.

EXAMPLES
    To add credentials to default kubeconfig file:

        $ gcloud anthos auth login --cluster=testcluster \
          --login-config=kubectl-anthos-config.yaml

    To add credentials to custom kubeconfig file:

        $ gcloud anthos auth login --cluster=testcluster \
          --login-config=kubectl-anthos-config.yaml \
          --kubeconfig=my.kubeconfig

    To generate the commands without executing them:

        $ gcloud anthos auth login --cluster=testcluster \
          --login-config=kubectl-anthos-config.yaml --dry-run

    To add credentials to default kubeconfig file using server side login:

        $ gcloud anthos auth login --cluster=testcluster \
          --server=<server-url>

    To add credentials to custom kubeconfig file using server side login:

        $ gcloud anthos auth login --cluster=testcluster \
          --server=<server-url> --kubeconfig=my.kubeconfig

    To add credentials to custom kubeconfig file with server side login using a
    remote-device for login:

        $ gcloud anthos auth login --cluster=testcluster \
          --server=<server-url> --kubeconfig=my.kubeconfig --no-browser

FLAGS
     --no-browser
        Option to indicate login completion on a second device with
        browser.Used with server option.

     --cluster=CLUSTER
        Cluster to authenticate against. If no cluster is specified, the
        command will print a list of available options.

     --dry-run
        Print out the generated kubectl commands but do not execute them.

     --kubeconfig=KUBECONFIG
        Specifies the destination kubeconfig file where credentials will be
        stored.

     --login-config=LOGIN_CONFIG
        Specifies the configuration yaml file for login. Can be a file path or
        a URL.

     --login-config-cert=LOGIN_CONFIG_CERT
        Specifies the CA certificate file to be added to trusted pool for
        making HTTPS connections to a --login-config URL.

     --remote-bootstrap=REMOTE_BOOTSTRAP
        Option to complete login that was started using no-browser optionon a
        remote device that does not have a browser.

     --server=SERVER
        Specifies the URL of API server of the cluster to authenticate against.

     --set-preferred-auth
        If set, forces update of preferred authentication for given cluster

     --user=USER
        If configuring multiple user accounts in the same kubecconfig file, you
        can specify a user to differentiate between them.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha anthos auth login

        $ gcloud beta anthos auth login
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud anthos auth login \
    --cluster=testcluster \
    --server=SERVER_URL

gcloud anthos auth login \
    --cluster=testcluster \
    --server=SERVER_URL \
    --kubeconfig=my.kubeconfig

gcloud anthos auth login \
    --cluster=testcluster \
    --server=SERVER_URL \
    --kubeconfig=my.kubeconfig \
    --no-browser
```

### gcloud beta anthos auth login

```text
NAME
    gcloud beta anthos auth login - authenticate clusters using the Anthos
        client

SYNOPSIS
    gcloud beta anthos auth login [--no-browser] [--cluster=CLUSTER]
        [--dry-run] [--kubeconfig=KUBECONFIG] [--login-config=LOGIN_CONFIG]
        [--login-config-cert=LOGIN_CONFIG_CERT]
        [--remote-bootstrap=REMOTE_BOOTSTRAP] [--server=SERVER]
        [--set-preferred-auth] [--user=USER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha anthos auth login

```text
NAME
    gcloud alpha anthos auth login - authenticate clusters using the Anthos
        client

SYNOPSIS
    gcloud alpha anthos auth login [--no-browser] [--cluster=CLUSTER]
        [--dry-run] [--kubeconfig=KUBECONFIG] [--login-config=LOGIN_CONFIG]
        [--login-config-cert=LOGIN_CONFIG_CERT]
        [--remote-bootstrap=REMOTE_BOOTSTRAP] [--server=SERVER]
        [--set-preferred-auth] [--user=USER] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/anthos/auth (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
