---
source: https://docs.cloud.google.com/sdk/gcloud/reference/org-policies/set-policy
---

# gcloud org-policies set-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud org-policies set-policy

```text
NAME
    gcloud org-policies set-policy - set an organization policy from a JSON or
        YAML file

SYNOPSIS
    gcloud org-policies set-policy POLICY_FILE [--update-mask=UPDATE_MASK]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets an organization policy from a JSON or YAML file. The policy will be
    created if it does not exist, or updated if it already exists.

EXAMPLES
    Organization policy list constraint YAML file example:

        name: projects/PROJECT_ID/policies/CONSTRAINT_NAME
        spec:
          rules:
          - values:
            denied_values:
            - VALUE_A

    Organization policy list constraint JSON file example:

        {
          "name": "projects/PROJECT_ID/policies/CONSTRAINT_NAME",
          "spec": {
            "rules": [
              {
                "values": {
                    "deniedValues": ["VALUE_A"]
                }
              }
            ]
          }
        }

    To set the policy from the file on the path './sample_path', run:

        $ gcloud org-policies set-policy ./sample_path

POSITIONAL ARGUMENTS
     POLICY_FILE
        Path to JSON or YAML file that contains the organization policy.

FLAGS
     --update-mask=UPDATE_MASK
        Field mask used to specify the fields to be overwritten in the policy
        by the set. The fields specified in the update_mask are relative to the
        policy, not the full request. The update-mask flag can be empty, or
        have values policy.spec, policy.dry_run_spec or *. If the policy does
        not contain the dry_run_spec and update-mask flag is not provided, then
        it defaults to policy.spec.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/org-policies/set-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
