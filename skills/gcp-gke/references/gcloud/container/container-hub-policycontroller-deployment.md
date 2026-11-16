---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/policycontroller/deployment
---

# gcloud container hub policycontroller deployment

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub policycontroller deployment remove

```text
NAME
    gcloud container hub policycontroller deployment remove - removes
        configuration properties from Policy Controller components

SYNOPSIS
    gcloud container hub policycontroller deployment remove DEPLOYMENT PROPERTY
        [VALUE] [--effect=EFFECT]
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove customizations of on-cluster components in Policy Controller. These
    components are managed as individual kubernetes deployments (e.g.
    'admission') in the gatekeeper-system namespace.

    When removing a 'toleration' property, it must match exactly, including the
    key, value and effect flag (if originally specified).

EXAMPLES
    To remove the replica count for a component:

        $ gcloud container hub policycontroller deployment remove \
            admission replica-count

    To remove the replica count for a component across all fleet memberships:

        $ gcloud container hub policycontroller deployment remove \
            admission replica-count --all-memberships

    To remove a toleration with key 'my-key' on a component:

        $ gcloud container hub policycontroller deployment remove \
            admission toleration my-key

    To remove a toleration with key 'my-key' and 'my-value' on a component:

        $ gcloud container hub policycontroller deployment remove \
            admission toleration my-key=my-value

    To remove a toleration with key 'my-key' and 'my-value' on a component,
    along with the effect 'NoSchedule':

        $ gcloud container hub policycontroller deployment remove \
            admission toleration my-key=my-value --effect=NoSchedule

    To remove a memory limit:

        $ gcloud container hub policycontroller deployment remove audit \
            memory-limit

    To remove a memory request:

        $ gcloud container hub policycontroller deployment remove mutation \
            memory-request

    To remove a cpu limit:

        $ gcloud container hub policycontroller deployment remove \
            admission cpu-limit

    To remove a cpu request:

        $ gcloud container hub policycontroller deployment remove audit \
            cpu-request

    To remove the anti-affinity configuration:

        $ gcloud container hub policycontroller deployment remove \
            admission pod-affinity

POSITIONAL ARGUMENTS
     DEPLOYMENT
        The PolicyController deployment component (i.e, "admission", "audit" or
        "mutation" from which to remove configuration.

     PROPERTY
        Property to be removed.

     [VALUE]
        This is only required to remove a toleration. It should not be included
        for any other property.

FLAGS
     --effect=EFFECT
        Applies only to "toleration" property. To be removed, tolerations must
        match exactly, including the effect setting. EFFECT must be one of:
        NoSchedule, PreferNoSchedule, NoExecute.

     Membership flags.

     At most one of these can be specified:

       --all-memberships
          If supplied, apply to all Policy Controllers memberships in the
          fleet.

       Or at least one of these can be specified:

         Membership resource - The group of arguments defining one or more
         memberships. The arguments in this group can be used to specify the
         attributes of this resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --memberships on the command line with a
            fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         --memberships=[MEMBERSHIPS,...]
            IDs of the memberships or fully qualified identifiers for the
            memberships.

            To set the memberships attribute:
            - provide the argument --memberships on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --location=LOCATION
            Location for the memberships.

            To set the location attribute:
            - provide the argument --memberships on the command line with a
              fully specified name;
            - provide the argument --location on the command line;
            - set the property gkehub/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub policycontroller deployment remove

        $ gcloud beta container hub policycontroller deployment remove
```

### gcloud container hub policycontroller deployment set

```text
NAME
    gcloud container hub policycontroller deployment set - sets configuration
        of the Policy Controller components

SYNOPSIS
    gcloud container hub policycontroller deployment set DEPLOYMENT PROPERTY
        VALUE [--effect=EFFECT]
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Customizes on-cluster components of Policy Controller. Supported properties
    may be set with this command, or removed with 'remove'. These components
    are managed as individual kubernetes deployments (e.g. 'admission') in the
    gatekeeper-system namespace.

    When setting cpu or memory limits and requests, Kubernetes-standard
    resource units are used.

    All properties set using this command will overwrite previous properties,
    with the exception of tolerations which can only be added, and any number
    may be added. To edit a toleration, use 'remove' to first delete it, and
    then 'set' the desired toleration.

EXAMPLES
    To set the replica count for a component:

        $ gcloud container hub policycontroller deployment set admission \
            replica-count 3

    To set the replica count for a component across all fleet memberships:

        $ gcloud container hub policycontroller deployment set admission \
            replica-count 3 --all-memberships

    To set a toleration with key 'my-key' on a component (which is an 'Exists'
    operator):

        $ gcloud container hub policycontroller deployment set admission \
            toleration my-key

    To set a toleration with key 'my-key' and 'my-value' on a component (which
    is an 'Equal' operator):

        $ gcloud container hub policycontroller deployment set admission \
            toleration my-key=my-value

    To set a toleration with key 'my-key' and 'my-value' on a component, along
    with the effect 'NoSchedule' (which is an 'Equal' operator):

        $ gcloud container hub policycontroller deployment set admission \
            toleration my-key=my-value --effect=NoSchedule

    To set a memory limit:

        $ gcloud container hub policycontroller deployment set audit \
            memory-limit 4Gi

    To set a memory request:

        $ gcloud container hub policycontroller deployment set mutation \
            memory-request 2Gi

    To set a cpu limit:

        $ gcloud container hub policycontroller deployment set admission \
            cpu-limit 500m

    To set a cpu request:

        $ gcloud container hub policycontroller deployment set audit \
            cpu-request 250m

    To set anti-affinity to achieve high availability on the mutation
    deployment:

        $ gcloud container hub policycontroller deployment set mutation \
            pod-affinity anti

POSITIONAL ARGUMENTS
     DEPLOYMENT
        The PolicyController deployment component (e.g. "admission", "audit" or
        "mutation") upon which to set configuration.

     PROPERTY
        Property to be set.

     VALUE
        The value to set the property to. Valid input varies based on the
        property being set.

FLAGS
     --effect=EFFECT
        Applies only to "toleration" property. EFFECT must be one of:
        NoSchedule, PreferNoSchedule, NoExecute.

     Membership flags.

     At most one of these can be specified:

       --all-memberships
          If supplied, apply to all Policy Controllers memberships in the
          fleet.

       Or at least one of these can be specified:

         Membership resource - The group of arguments defining one or more
         memberships. The arguments in this group can be used to specify the
         attributes of this resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --memberships on the command line with a
            fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         --memberships=[MEMBERSHIPS,...]
            IDs of the memberships or fully qualified identifiers for the
            memberships.

            To set the memberships attribute:
            - provide the argument --memberships on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --location=LOCATION
            Location for the memberships.

            To set the location attribute:
            - provide the argument --memberships on the command line with a
              fully specified name;
            - provide the argument --location on the command line;
            - set the property gkehub/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub policycontroller deployment set

        $ gcloud beta container hub policycontroller deployment set
```

### gcloud beta container hub policycontroller deployment remove

```text
NAME
    gcloud beta container hub policycontroller deployment remove - removes
        configuration properties from Policy Controller components

SYNOPSIS
    gcloud beta container hub policycontroller deployment remove DEPLOYMENT
        PROPERTY [VALUE] [--effect=EFFECT]
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub policycontroller deployment set

```text
NAME
    gcloud beta container hub policycontroller deployment set - sets
        configuration of the Policy Controller components

SYNOPSIS
    gcloud beta container hub policycontroller deployment set DEPLOYMENT
        PROPERTY VALUE [--effect=EFFECT]
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub policycontroller deployment remove

```text
NAME
    gcloud alpha container hub policycontroller deployment remove - removes
        configuration properties from Policy Controller components

SYNOPSIS
    gcloud alpha container hub policycontroller deployment remove DEPLOYMENT
        PROPERTY [VALUE] [--effect=EFFECT]
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub policycontroller deployment set

```text
NAME
    gcloud alpha container hub policycontroller deployment set - sets
        configuration of the Policy Controller components

SYNOPSIS
    gcloud alpha container hub policycontroller deployment set DEPLOYMENT
        PROPERTY VALUE [--effect=EFFECT]
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated product: "Policy Controller is deprecated as of November 12, 2026, and reaches end of support on December 31, 2027. In version 1.39 and later, Google Kubernetes Engine (GKE) clusters don't support Policy Controller." Migrate admission policies to Kubernetes ValidatingAdmissionPolicies or self-managed OPA Gatekeeper (see `config-sync-policy/policy-controller-deprecation.md`; https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller, retrieved 2026-11-16).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/policycontroller/deployment (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
