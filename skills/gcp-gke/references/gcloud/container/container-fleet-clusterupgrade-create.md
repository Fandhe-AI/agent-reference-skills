---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/clusterupgrade/create
---

# gcloud container fleet clusterupgrade create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet clusterupgrade create

```text
NAME
    gcloud container fleet clusterupgrade create - create the clusterupgrade
        feature for a fleet within a given project

SYNOPSIS
    gcloud container fleet clusterupgrade create
        [--default-upgrade-soaking=DEFAULT_UPGRADE_SOAKING]
        [--upstream-fleet=UPSTREAM_FLEET]
        [--add-upgrade-soaking-override=ADD_UPGRADE_SOAKING_OVERRIDE
          --upgrade-selector=[name=NAME],[version=VERSION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create the clusterupgrade feature for a fleet within a given project.

EXAMPLES
    To create the clusterupgrade feature for the current fleet, run:

        $ gcloud container fleet clusterupgrade create \
            --default-upgrade-soaking=DEFAULT_UPGRADE_SOAKING

FLAGS
     --default-upgrade-soaking=DEFAULT_UPGRADE_SOAKING
        Note: This flag only applies to Rollout Sequencing v1, not Rollout
        Sequencing v2 (which uses custom stages). If using Rollout Sequencing
        v1 and this flag is not provided, a default value of 7 days will be
        used.

        Configures the default soaking duration for each upgrade propagating
        through the current fleet to become "COMPLETE". Soaking begins after
        all clusters in the fleet are on the target version, or after 30 days
        if all cluster upgrades are not complete. Once an upgrade state becomes
        "COMPLETE", it will automatically be propagated to the downstream
        fleet. Max is 30 days.

        To configure Rollout Sequencing for a fleet, this attribute must be
        set. To do this while specifying a default soaking duration of 7 days,
        run:

            $ gcloud container fleet clusterupgrade create \
                --default-upgrade-soaking=7d

     --upstream-fleet=UPSTREAM_FLEET
        The upstream fleet. GKE will finish upgrades on the upstream fleet
        before applying the same upgrades to the current fleet.

        To configure the upstream fleet, run:

            $ gcloud container fleet clusterupgrade create             \
                --upstream-fleet={upstream_fleet}

     Upgrade soaking override.

     Defines a specific soaking time override for a particular upgrade
     propagating through the current fleet that supercedes the default soaking
     duration configured by --default-upgrade-soaking.

     To set an upgrade soaking override of 12 hours for the upgrade with name,
     k8s_control_plane, and version, 1.23.1-gke.1000, run:

         $ gcloud container fleet clusterupgrade create               \
             --add-upgrade-soaking-override=12h               \
             --upgrade-selector=name="k8s_control_plane",\
         version="1.23.1-gke.1000"

     --add-upgrade-soaking-override=ADD_UPGRADE_SOAKING_OVERRIDE
        Overrides the soaking time for a particular upgrade name and version
        propagating through the current fleet. Set soaking to 0 days to bypass
        soaking and fast-forward the upgrade to the downstream fleet.

        See $ gcloud topic datetimes for information on duration formats.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --upgrade-selector=[name=NAME],[version=VERSION]
        Name and version of the upgrade to be overridden where version is a
        full GKE version. Currently, name can be either k8s_control_plane or
        k8s_node.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet clusterupgrade create

        $ gcloud beta container fleet clusterupgrade create
```

### gcloud beta container fleet clusterupgrade create

```text
NAME
    gcloud beta container fleet clusterupgrade create - create the
        clusterupgrade feature for a fleet within a given project

SYNOPSIS
    gcloud beta container fleet clusterupgrade create
        [--default-upgrade-soaking=DEFAULT_UPGRADE_SOAKING]
        [--upstream-fleet=UPSTREAM_FLEET]
        [--add-upgrade-soaking-override=ADD_UPGRADE_SOAKING_OVERRIDE
          --upgrade-selector=[name=NAME],[version=VERSION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet clusterupgrade create

```text
NAME
    gcloud alpha container fleet clusterupgrade create - create the
        clusterupgrade feature for a fleet within a given project

SYNOPSIS
    gcloud alpha container fleet clusterupgrade create
        [--default-upgrade-soaking=DEFAULT_UPGRADE_SOAKING]
        [--upstream-fleet=UPSTREAM_FLEET]
        [--add-upgrade-soaking-override=ADD_UPGRADE_SOAKING_OVERRIDE
          --upgrade-selector=[name=NAME],[version=VERSION]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/clusterupgrade/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
