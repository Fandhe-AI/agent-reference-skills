---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/rbacrolebindingactuation/update
---

# gcloud container hub rbacrolebindingactuation update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub rbacrolebindingactuation update

```text
NAME
    gcloud container hub rbacrolebindingactuation update - update
        RbacRoleBinding Actuation Feature

SYNOPSIS
    gcloud container hub rbacrolebindingactuation update
        (--add-allowed-custom-role=ADD_ALLOWED_CUSTOM_ROLE
          | --allowed-custom-roles=[ROLES,...]
          | --remove-allowed-custom-role=REMOVE_ALLOWED_CUSTOM_ROLE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates RbacRoleBinding Actuation Feature in a fleet.

EXAMPLES
    To update the RbacRoleBinding Actuation Feature, run:

        $ gcloud container fleet rbacrolebinding-actuation update \
            --allowed-custom-roles=role1,role2

        $ gcloud container fleet rbacrolebinding-actuation update \
            --add-allowed-custom-role=role1

        $ gcloud container fleet rbacrolebinding-actuation update \
            --remove-allowed-custom-role=role2

REQUIRED FLAGS
     Exactly one of these must be specified:

       --add-allowed-custom-role=ADD_ALLOWED_CUSTOM_ROLE
          Add a single custom role to the allowed custom roles list.

       --allowed-custom-roles=[ROLES,...]
          The list of allowed custom roles that can be used in scope
          RBACRoleBindings.

       --remove-allowed-custom-role=REMOVE_ALLOWED_CUSTOM_ROLE
          Remove a single custom role from the allowed custom roles list.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub rbacrolebindingactuation update

        $ gcloud beta container hub rbacrolebindingactuation update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud container fleet rbacrolebindingactuation update \
    --allowed-custom-roles=role1,role2

gcloud container fleet rbacrolebindingactuation update \
    --add-allowed-custom-role=role1

gcloud container fleet rbacrolebindingactuation update \
    --remove-allowed-custom-role=role2
```

### gcloud beta container hub rbacrolebindingactuation update

```text
NAME
    gcloud beta container hub rbacrolebindingactuation update - update
        RbacRoleBinding Actuation Feature

SYNOPSIS
    gcloud beta container hub rbacrolebindingactuation update
        (--add-allowed-custom-role=ADD_ALLOWED_CUSTOM_ROLE
          | --allowed-custom-roles=[ROLES,...]
          | --remove-allowed-custom-role=REMOVE_ALLOWED_CUSTOM_ROLE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub rbacrolebindingactuation update

```text
NAME
    gcloud alpha container hub rbacrolebindingactuation update - update
        RbacRoleBinding Actuation Feature

SYNOPSIS
    gcloud alpha container hub rbacrolebindingactuation update
        (--add-allowed-custom-role=ADD_ALLOWED_CUSTOM_ROLE
          | --allowed-custom-roles=[ROLES,...]
          | --remove-allowed-custom-role=REMOVE_ALLOWED_CUSTOM_ROLE)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples run `gcloud container fleet rbacrolebinding-actuation update`, but the command group is `rbacrolebindingactuation` (no hyphen; gcloud 593.0.0: "Invalid choice: 'rbacrolebinding-actuation'"); the runnable form uses `gcloud container fleet rbacrolebindingactuation update`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/rbacrolebindingactuation/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
