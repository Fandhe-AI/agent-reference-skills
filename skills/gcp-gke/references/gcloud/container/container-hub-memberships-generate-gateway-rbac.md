---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/memberships/generate-gateway-rbac
---

# gcloud container hub memberships generate-gateway-rbac

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub memberships generate-gateway-rbac

```text
NAME
    gcloud container hub memberships generate-gateway-rbac - generate RBAC
        policy files for connected clusters by the user

SYNOPSIS
    gcloud container hub memberships generate-gateway-rbac
        (--anthos-support | --groups=GROUPS | --users=USERS) [--apply]
        [--context=CONTEXT] [--kubeconfig=KUBECONFIG] [--membership=MEMBERSHIP]
        [--rbac-output-file=RBAC_OUTPUT_FILE] [--revoke] [--role=ROLE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud container hub memberships generate-gateway-rbac generates RBAC
    policies to be used by Connect Gateway API.

    Upon success, this command will write the output RBAC policy to the
    designated local file in dry run mode.

    Override RBAC policy: Y to override previous RBAC policy, N to stop. If
    overriding the --role, Y will clean up the previous RBAC policy and then
    apply the new one.

EXAMPLES
    The current implementation supports multiple modes:

    Dry run mode to generate the RBAC policy file, and write to local
    directory:

        $ gcloud container hub memberships generate-gateway-rbac \
            --membership=my-cluster \
            --users=foo@example.com,\
        test-acct@test-project.iam.gserviceaccount.com \
            --role=clusterrole/cluster-admin --rbac-output-file=./rbac.yaml

    Dry run mode to generate the RBAC policy, and print on screen:

        $ gcloud container hub memberships generate-gateway-rbac \
            --membership=my-cluster \
            --users=foo@example.com,\
        test-acct@test-project.iam.gserviceaccount.com \
            --role=clusterrole/cluster-admin

    Anthos support mode, generate the RBAC policy file with read-only
    permission for TSE/Eng to debug customers' clusters:

        $ gcloud container hub memberships generate-gateway-rbac \
            --membership=my-cluster --anthos-support

    Apply mode, generate the RBAC policy and apply it to the specified cluster:

        $ gcloud container hub memberships generate-gateway-rbac \
            --membership=my-cluster \
            --users=foo@example.com,\
        test-acct@test-project.iam.gserviceaccount.com \
            --role=clusterrole/cluster-admin --context=my-cluster-context \
            --kubeconfig=/home/user/custom_kubeconfig --apply

    Revoke mode, revoke the RBAC policy for the specified users:

        $ gcloud container hub memberships generate-gateway-rbac \
            --membership=my-cluster \
            --users=foo@example.com,\
        test-acct@test-project.iam.gserviceaccount.com \
            --role=clusterrole/cluster-admin --context=my-cluster-context \
            --kubeconfig=/home/user/custom_kubeconfig --revoke

    The role to be granted to the users can either be cluster-scoped or
    namespace-scoped. To grant a namespace-scoped role to the users in dry run
    mode, run:

        $ gcloud container hub memberships generate-gateway-rbac \
            --membership=my-cluster \
            --users=foo@example.com,\
        test-acct@test-project.iam.gserviceaccount.com \
            --role=role/mynamespace/namespace-reader

    The users provided can be using a Google identity (only email) or using
    external identity providers (starting with
    "principal://iam.googleapis.com"):

        $ gcloud container hub memberships generate-gateway-rbac \
            --membership=my-cluster \
            --users=foo@example.com,principal://iam.googleapis.com/\
        locations/global/workforcePools/pool/subject/user \
            --role=clusterrole/cluster-admin --context=my-cluster-context \
            --kubeconfig=/home/user/custom_kubeconfig --apply

    The groups can be provided as a Google identity (only email) or an external
    identity (starting with "principalSet://iam.googleapis.com"):

        $ gcloud container hub memberships generate-gateway-rbac \
            --membership=my-cluster \
            --groups=group@example.com,principalSet://iam.googleapis.com/\
        locations/global/workforcePools/pool/group/ExampleGroup \
            --role=clusterrole/cluster-admin --context=my-cluster-context \
            --kubeconfig=/home/user/custom_kubeconfig --apply

REQUIRED FLAGS
     Exactly one of these must be specified:

       --anthos-support
          If specified, this command will generate RBAC policy file for anthos
          support.

       --groups=GROUPS
          Group email address or third-party IAM group principal.

       --users=USERS
          User's email address, service account email address, or third-party
          IAM subject principal.

OPTIONAL FLAGS
     --apply
        If specified, this command will generate RBAC policy and apply to the
        specified cluster.

     --context=CONTEXT
        The cluster context as it appears in the kubeconfig file. You can get
        this value from the command line by running command: kubectl config
        current-context.

     --kubeconfig=KUBECONFIG
        The kubeconfig file containing an entry for the cluster. Defaults to
        $KUBECONFIG if it is set in the environment, otherwise defaults to
        $HOME/.kube/config.

     --membership=MEMBERSHIP
        Membership name to assign RBAC policy with.

     --rbac-output-file=RBAC_OUTPUT_FILE
        If specified, this command will execute in dry run mode and write to
        the file specified with this flag: the generated RBAC policy will not
        be applied to Kubernetes clusters,instead it will be written to the
        designated local file.

     --revoke
        If specified, this command will revoke the RBAC policy for the
        specified users.

     --role=ROLE
        Namespace scoped role or cluster role.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub memberships generate-gateway-rbac

        $ gcloud beta container hub memberships generate-gateway-rbac
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud container hub memberships generate-gateway-rbac \
    --membership=my-cluster \
    --users=foo@example.com,test-acct@test-project.iam.gserviceaccount.com \
    --role=clusterrole/cluster-admin \
    --rbac-output-file=./rbac.yaml

gcloud container hub memberships generate-gateway-rbac \
    --membership=my-cluster \
    --users=foo@example.com,test-acct@test-project.iam.gserviceaccount.com \
    --role=clusterrole/cluster-admin

gcloud container hub memberships generate-gateway-rbac \
    --membership=my-cluster \
    --users=foo@example.com,test-acct@test-project.iam.gserviceaccount.com \
    --role=clusterrole/cluster-admin \
    --context=my-cluster-context \
    --kubeconfig=/home/user/custom_kubeconfig \
    --apply

gcloud container hub memberships generate-gateway-rbac \
    --membership=my-cluster \
    --users=foo@example.com,test-acct@test-project.iam.gserviceaccount.com \
    --role=clusterrole/cluster-admin \
    --context=my-cluster-context \
    --kubeconfig=/home/user/custom_kubeconfig \
    --revoke

gcloud container hub memberships generate-gateway-rbac \
    --membership=my-cluster \
    --users=foo@example.com,test-acct@test-project.iam.gserviceaccount.com \
    --role=role/mynamespace/namespace-reader

gcloud container hub memberships generate-gateway-rbac \
    --membership=my-cluster \
    --users=foo@example.com,principal://iam.googleapis.com/locations/global/workforcePools/pool/subject/user \
    --role=clusterrole/cluster-admin \
    --context=my-cluster-context \
    --kubeconfig=/home/user/custom_kubeconfig \
    --apply

gcloud container hub memberships generate-gateway-rbac \
    --membership=my-cluster \
    --groups=group@example.com,principalSet://iam.googleapis.com/locations/global/workforcePools/pool/group/ExampleGroup \
    --role=clusterrole/cluster-admin \
    --context=my-cluster-context \
    --kubeconfig=/home/user/custom_kubeconfig \
    --apply
```

### gcloud beta container hub memberships generate-gateway-rbac

```text
NAME
    gcloud beta container hub memberships generate-gateway-rbac - generate RBAC
        policy files for connected clusters by the user

SYNOPSIS
    gcloud beta container hub memberships generate-gateway-rbac
        (--anthos-support | --groups=GROUPS | --users=USERS) [--apply]
        [--context=CONTEXT] [--kubeconfig=KUBECONFIG] [--membership=MEMBERSHIP]
        [--rbac-output-file=RBAC_OUTPUT_FILE] [--revoke] [--role=ROLE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub memberships generate-gateway-rbac

```text
NAME
    gcloud alpha container hub memberships generate-gateway-rbac - generate
        RBAC policy files for connected clusters by the user

SYNOPSIS
    gcloud alpha container hub memberships generate-gateway-rbac
        (--anthos-support | --groups=GROUPS | --users=USERS) [--apply]
        [--context=CONTEXT] [--kubeconfig=KUBECONFIG] [--membership=MEMBERSHIP]
        [--rbac-output-file=RBAC_OUTPUT_FILE] [--revoke] [--role=ROLE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/memberships/generate-gateway-rbac (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
