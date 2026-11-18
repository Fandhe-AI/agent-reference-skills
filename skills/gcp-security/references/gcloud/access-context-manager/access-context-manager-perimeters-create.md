---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/create
---

# gcloud access-context-manager perimeters create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager perimeters create

```text
NAME
    gcloud access-context-manager perimeters create - create a new service
        perimeter

SYNOPSIS
    gcloud access-context-manager perimeters create
        (PERIMETER : --policy=POLICY) --title=TITLE
        [--access-levels=[LEVEL,...]] [--async] [--description=DESCRIPTION]
        [--egress-policies=YAML_FILE] [--ingress-policies=YAML_FILE]
        [--perimeter-type=PERIMETER_TYPE; default="regular"]
        [--resources=[RESOURCES,...]] [--restricted-services=[SERVICE,...]]
        [--vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
          | --enable-vpc-accessible-services
          --vpc-allowed-services=[VPC_SERVICE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new service perimeter in a given access policy.

EXAMPLES
    To create a new basic Service Perimeter:

        $ gcloud access-context-manager perimeters create \
            --title=my_perimeter_title --resources=projects/12345 \
            --restricted-services="storage.googleapis.com" --policy=9876543

POSITIONAL ARGUMENTS
     Perimeter resource - The service perimeter to create. The arguments in
     this group can be used to specify the attributes of this resource.

     This must be specified.

       PERIMETER
          ID of the perimeter or fully qualified identifier for the perimeter.

          To set the perimeter attribute:
          + provide the argument perimeter on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          The ID of the access policy.

          To set the policy attribute:
          + provide the argument perimeter on the command line with a fully
            specified name;
          + provide the argument --policy on the command line;
          + set the property access_context_manager/policy;
          + automatically, if the current account belongs to an organization
            with exactly one access policy..

REQUIRED FLAGS
     --title=TITLE
        Short human-readable title for the service perimeter.

OPTIONAL FLAGS
     --access-levels=[LEVEL,...]
        Comma-separated list of IDs for access levels (in the same policy) that
        an intra-perimeter request must satisfy to be allowed.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Long-form description of service perimeter.

     --egress-policies=YAML_FILE
        Path to a file containing a list of Engress Policies.

        This file contains a list of YAML-compliant objects representing
        Engress Policies described in the API reference.

        For more information about the alpha version, see:
        https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
        For more information about non-alpha versions, see:
        https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

     --ingress-policies=YAML_FILE
        Path to a file containing a list of Ingress Policies.

        This file contains a list of YAML-compliant objects representing
        Ingress Policies described in the API reference.

        For more information about the alpha version, see:
        https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
        For more information about non-alpha versions, see:
        https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

     --perimeter-type=PERIMETER_TYPE; default="regular"
        Type of the perimeter. PERIMETER_TYPE must be one of:

         bridge
            Allows resources in different regular service perimeters to import
            and export data between each other.

            A project may belong to multiple bridge service perimeters (only if
            it also belongs to a regular service perimeter). Both restricted
            and unrestricted service lists, as well as access level lists, must
            be empty.

         regular
            Allows resources within this service perimeter to import and export
            data amongst themselves.

            A project may belong to at most one regular service perimeter.

     --resources=[RESOURCES,...]
        Comma-separated list of resources (currently only projects, in the form
        projects/<projectnumber>) in this perimeter.

     --restricted-services=[SERVICE,...]
        Comma-separated list of services to which the perimeter boundary does
        apply (for example, storage.googleapis.com).

     At most one of these can be specified:

       --vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
          Path to a YAML file containing the full VPC Accessible Services
          configuration. This file should contain a single YAML object
          representing a VpcAccessibleServices message as described in the API
          reference. This cannot be used with --vpc-allowed-services or
          --enable-vpc-accessible-services.

          For more information about the alpha version, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
          For more information about non-alpha versions, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

       Or at least one of these can be specified:

         --enable-vpc-accessible-services
            Whether to restrict API calls within the perimeter to those in the
            vpc-allowed-services list.

         --vpc-allowed-services=[VPC_SERVICE,...]
            Comma-separated list of APIs accessible from within the Service
            Perimeter. In order to include all restricted services, use
            reference "RESTRICTED-SERVICES". Requires vpc-accessible-services
            be enabled.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters create

        $ gcloud beta access-context-manager perimeters create
```

### gcloud beta access-context-manager perimeters create

```text
NAME
    gcloud beta access-context-manager perimeters create - create a new service
        perimeter

SYNOPSIS
    gcloud beta access-context-manager perimeters create
        (PERIMETER : --policy=POLICY) --title=TITLE
        [--access-levels=[LEVEL,...]] [--async] [--description=DESCRIPTION]
        [--egress-policies=YAML_FILE] [--ingress-policies=YAML_FILE]
        [--perimeter-type=PERIMETER_TYPE; default="regular"]
        [--resources=[RESOURCES,...]] [--restricted-services=[SERVICE,...]]
        [--vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
          | --enable-vpc-accessible-services
          --vpc-allowed-services=[VPC_SERVICE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters create

```text
NAME
    gcloud alpha access-context-manager perimeters create - create a new
        service perimeter

SYNOPSIS
    gcloud alpha access-context-manager perimeters create
        (PERIMETER : --policy=POLICY) --title=TITLE
        [--access-levels=[LEVEL,...]] [--async] [--description=DESCRIPTION]
        [--egress-policies=YAML_FILE] [--ingress-policies=YAML_FILE]
        [--perimeter-type=PERIMETER_TYPE; default="regular"]
        [--resources=[RESOURCES,...]] [--restricted-services=[SERVICE,...]]
        [--vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
          | --enable-vpc-accessible-services
          --vpc-allowed-services=[VPC_SERVICE,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `gcloud access-context-manager perimeters create` example omits the `PERIMETER` positional argument, which the SYNOPSIS requires (`(PERIMETER : --policy=POLICY)`; gcloud 593.0.0: "argument --policy: PERIMETER must be specified."). Add the perimeter ID.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
