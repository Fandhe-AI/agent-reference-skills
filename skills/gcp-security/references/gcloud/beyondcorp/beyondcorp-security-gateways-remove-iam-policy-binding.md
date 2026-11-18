---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beyondcorp/security-gateways/remove-iam-policy-binding
---

# gcloud beyondcorp security-gateways remove-iam-policy-binding

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beyondcorp security-gateways remove-iam-policy-binding

```text
NAME
    gcloud beyondcorp security-gateways remove-iam-policy-binding - remove an
        IAM policy binding from a security gateway

SYNOPSIS
    gcloud beyondcorp security-gateways remove-iam-policy-binding
        (SECURITY_GATEWAY : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes an IAM policy binding from the given security gateway.

        EXAMPLES
            To remove an IAM policy binding for the role of
            'roles/beyondcorp.serviceDiscoveryUser' for the user 'test-user@gmail.com'
            on a security gateway with ID 'my-security-gateway':

        $ gcloud beyondcorp security-gateways remove-iam-policy-binding \
        my-security-gateway --member='user:test-user@gmail.com' \
        --role='roles/beyondcorp.serviceDiscoveryUser' --location=global

        To remove a binding with a condition:

        $ gcloud beyondcorp security-gateways remove-iam-policy-binding \
        my-security-gateway --member='user:test-user@gmail.com' \
        --role='roles/beyondcorp.serviceDiscoveryUser' --location=global \
        --condition="expression=request.time < timestamp('2026-01-01T00:00:00Z'),title=expires_2026"

POSITIONAL ARGUMENTS
     Security gateway resource - The security gateway for which to remove the
     IAM policy binding. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument security_gateway on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SECURITY_GATEWAY
          ID of the security_gateway or fully qualified identifier for the
          security_gateway.

          To set the security-gateway attribute:
          + provide the argument security_gateway on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id. We support only global location.

          To set the location attribute:
          + provide the argument security_gateway on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

OPTIONAL FLAGS
     At most one of these can be specified:

       --all
          Remove all bindings with this role and principal, irrespective of any
          conditions.

       --condition=[KEY=VALUE,...]
          The condition of the binding that you want to remove. When the
          condition is explicitly specified as None (--condition=None), a
          binding without a condition is removed. Otherwise, only a binding
          with a condition that exactly matches the specified condition
          (including the optional description) is removed. For more on
          conditions, refer to the conditions overview guide:
          https://cloud.google.com/iam/docs/conditions-overview

          When using the --condition flag, include the following key-value
          pairs:

           expression
              (Required) Condition expression that evaluates to True or False.
              This uses a subset of Common Expression Language syntax.

              If the condition expression includes a comma, use a different
              delimiter to separate the key-value pairs. Specify the delimiter
              before listing the key-value pairs. For example, to specify a
              colon (:) as the delimiter, do the following:
              --condition=^:^title=TITLE:expression=EXPRESSION. For more
              information, see
              https://cloud.google.com/sdk/gcloud/reference/topic/escaping.

           title
              (Required) A short string describing the purpose of the
              expression.

           description
              (Optional) Additional description for the expression.

       --condition-from-file=PATH_TO_FILE
          Path to a local JSON or YAML file that defines the condition. To see
          available fields, see the help for --condition. Use a full or
          relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta beyondcorp security-gateways remove-iam-policy-binding
```

### gcloud beta beyondcorp security-gateways remove-iam-policy-binding

```text
NAME
    gcloud beta beyondcorp security-gateways remove-iam-policy-binding - remove
        an IAM policy binding from a security gateway

SYNOPSIS
    gcloud beta beyondcorp security-gateways remove-iam-policy-binding
        (SECURITY_GATEWAY : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beyondcorp/security-gateways/remove-iam-policy-binding (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
