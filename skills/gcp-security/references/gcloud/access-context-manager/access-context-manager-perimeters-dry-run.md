---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/dry-run
---

# gcloud access-context-manager perimeters dry-run

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager perimeters dry-run create

```text
NAME
    gcloud access-context-manager perimeters dry-run create - create a dry-run
        mode configuration for a new or existing Service Perimeter

SYNOPSIS
    gcloud access-context-manager perimeters dry-run create
        (PERIMETER : --policy=POLICY)
        (--access-levels=[access_levels,...] --egress-policies=YAML_FILE
          --ingress-policies=YAML_FILE --resources=[resources,...]
          --restricted-services=[restricted_services,...]
          --vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
          | --enable-vpc-accessible-services
          --vpc-allowed-services=[vpc_allowed_services,...]
          | [--perimeter-title=PERIMETER_TITLE --perimeter-type=PERIMETER_TYPE
          : --perimeter-access-levels=[access_levels,...]
          --perimeter-description=PERIMETER_DESCRIPTION
          --perimeter-egress-policies=YAML_FILE
          --perimeter-ingress-policies=YAML_FILE
          --perimeter-resources=[resources,...]
          --perimeter-restricted-services=[restricted_services,...]
          --perimeter-vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
          | --perimeter-enable-vpc-accessible-services
          --perimeter-vpc-allowed-services=[vpc_allowed_services,...]])
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    When a Service Perimeter with the specified name does not exist, a new
    Service Perimeter will be created. In this case, the newly created Service
    Perimeter will not have any enforcement mode configuration, and, therefore,
    all policy violations will be logged.

    When a perimeter with the specified name does exist, a dry-run mode
    configuration will be created for it. The behavior of the enforcement mode
    configuration, if present, will not be impacted in this case. Requests that
    violate the existing enforcement mode configuration of the Service
    Perimeter will continue being denied. Requests that only violate the policy
    in the dry-run mode configuration will be logged but will not be denied.

EXAMPLES
    To create a dry-run configuration for an existing Service Perimeter:

        $ gcloud access-context-manager perimeters dry-run create \
            my-perimeter --resources="projects/0123456789" \
            --access-levels="accessPolicies/a_policy/accessLevels/a_level" \
            --restricted-services="storage.googleapis.com"

    To create a dry-run configuration for a new Service Perimeter:

        $ gcloud access-context-manager perimeters dry-run create \
            my-perimeter --perimeter-title="My New Perimeter" \
            --perimeter-description="Perimeter description" \
            --perimeter-type="regular" \
            --perimeter-resources="projects/0123456789" \
            --perimeter-access-levels="accessPolicies/a_policy/accessLevels/\
        a_level" --perimeter-restricted-services="storage.googleapis.com"

POSITIONAL ARGUMENTS
     Perimeter resource - The service perimeter to update. The arguments in
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
          + set the property access_context_manager/policy.

REQUIRED FLAGS
     Exactly one of these must be specified:

       Arguments for creating dry-run spec for an **existing** Service
       Perimeter.

       --access-levels=[access_levels,...]
          Comma-separated list of IDs for access levels (in the same policy)
          that an intra-perimeter request must satisfy to be allowed.

       --egress-policies=YAML_FILE
          Path to a file containing a list of Egress Policies. This file
          contains a list of YAML-compliant objects representing Egress
          Policies described in the API reference. For more information about
          the alpha version, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
          For more information about non-alpha versions, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

       --ingress-policies=YAML_FILE
          Path to a file containing a list of Ingress Policies. This file
          contains a list of YAML-compliant objects representing Ingress
          Policies described in the API reference. For more information about
          the alpha version, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
          For more information about non-alpha versions, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

       --resources=[resources,...]
          Comma-separated list of resources (currently only projects, in the
          form projects/<projectnumber>) in this perimeter.

       --restricted-services=[restricted_services,...]
          Comma-separated list of services to which the perimeter boundary does
          apply (for example, storage.googleapis.com).

       At most one of these can be specified:

         --vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
            Path to a YAML file containing a VpcAccessibleServices object.

         Or at least one of these can be specified:

           --enable-vpc-accessible-services
              Whether to restrict API calls within the perimeter to those in
              the vpc-allowed-services list.

           --vpc-allowed-services=[vpc_allowed_services,...]
              Comma-separated list of APIs accessible from within the Service
              Perimeter. In order to include all restricted services, use
              reference "RESTRICTED-SERVICES". Requires vpc-accessible-services
              be enabled.

       Arguments for creating a dry-run spec for a new Service Perimeter.

       --perimeter-title=PERIMETER_TITLE
          Short human-readable title for the Service Perimeter.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --perimeter-type=PERIMETER_TYPE
          Type of the perimeter.

              A *regular* perimeter allows resources within this service perimeter
              to import and export data amongst themselves. A project may belong
              to at most one regular service perimeter.

              A *bridge* perimeter allows resources in different regular service
              perimeters to import and export data between each other. A project
              may belong to multiple bridge service perimeters (only if it also
              belongs to a regular service perimeter). Both restricted and
              unrestricted service lists, as well as access level lists, must be
              empty.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --perimeter-access-levels=[access_levels,...]
          Comma-separated list of IDs for access levels (in the same policy)
          that an intra-perimeter request must satisfy to be allowed.

       --perimeter-description=PERIMETER_DESCRIPTION
          Long-form description of Service Perimeter.

       --perimeter-egress-policies=YAML_FILE
          Path to a file containing a list of Egress Policies. This file
          contains a list of YAML-compliant objects representing Egress
          Policies described in the API reference. For more information about
          the alpha version, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
          For more information about non-alpha versions, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

       --perimeter-ingress-policies=YAML_FILE
          Path to a file containing a list of Ingress Policies. This file
          contains a list of YAML-compliant objects representing Ingress
          Policies described in the API reference. For more information about
          the alpha version, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
          For more information about non-alpha versions, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

       --perimeter-resources=[resources,...]
          Comma-separated list of resources (currently only projects, in the
          form projects/<projectnumber>) in this perimeter.

       --perimeter-restricted-services=[restricted_services,...]
          Comma-separated list of services to which the perimeter boundary does
          apply (for example, storage.googleapis.com).

       At most one of these can be specified:

         --perimeter-vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
            Path to a YAML file containing a VpcAccessibleServices object.

         Or at least one of these can be specified:

           --perimeter-enable-vpc-accessible-services
              Whether to restrict API calls within the perimeter to those in
              the vpc-allowed-services list.

           --perimeter-vpc-allowed-services=[vpc_allowed_services,...]
              Comma-separated list of APIs accessible from within the Service
              Perimeter. In order to include all restricted services, use
              reference "RESTRICTED-SERVICES". Requires vpc-accessible-services
              be enabled.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters dry-run create

        $ gcloud beta access-context-manager perimeters dry-run create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud access-context-manager perimeters dry-run create my-perimeter \
    --perimeter-title="My New Perimeter" \
    --perimeter-description="Perimeter description" \
    --perimeter-type="regular" \
    --perimeter-resources="projects/0123456789" \
    --perimeter-access-levels="accessPolicies/a_policy/accessLevels/a_level" \
    --perimeter-restricted-services="storage.googleapis.com"
```

### gcloud access-context-manager perimeters dry-run delete

```text
NAME
    gcloud access-context-manager perimeters dry-run delete - mark the Service
        Perimeter as deleted in the dry-run mode

SYNOPSIS
    gcloud access-context-manager perimeters dry-run delete
        (PERIMETER : --policy=POLICY) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    When this command completed successfully, the affected Service Perimeter
    will be considered to have been deleted in the dry-run mode, but the
    enforcement mode configuration will be left untouched.

EXAMPLES
    To mark the Service Perimeter as deleted in the dry-run mode:

        $ gcloud access-context-manager perimeters dry-run delete \
            my-perimeter

POSITIONAL ARGUMENTS
     Perimeter resource - The service perimeter to delete. The arguments in
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
          + set the property access_context_manager/policy.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters dry-run delete

        $ gcloud beta access-context-manager perimeters dry-run delete
```

### gcloud access-context-manager perimeters dry-run describe

```text
NAME
    gcloud access-context-manager perimeters dry-run describe - display the
        dry-run mode configuration for a Service Perimeter

SYNOPSIS
    gcloud access-context-manager perimeters dry-run describe
        (PERIMETER : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The dry-run mode configuration is presented as a diff against the
    enforcement mode configuration. '+' indicates additions in spec,'-'
    indicates removals from status and entries without either of those indicate
    that they are the same across the dry-run and the enforcement mode
    configurations. When a particular field is completely empty, it will not be
    displayed.

    Note: When this command is executed on a Service Perimeter with no explicit
    dry-run mode configuration, the effective dry-run mode configuration is
    inherited from the enforcement mode configuration, and thus, the
    enforcement mode configuration is displayed in such cases.

EXAMPLES
    To display the dry-run mode configuration for a Service Perimeter:

        $ gcloud access-context-manager perimeters dry-run describe \
            my-perimeter

    Sample output:

        ===
          name: my_perimeter
          title: My Perimeter
          type: PERIMETER_TYPE_REGULAR
          resources:
        +   projects/123
        -   projects/456
            projects/789
          restrictedServices:
        +   bigquery.googleapis.com
        -   storage.googleapis.com
            bigtable.googleapis.com
          vpcAccessibleServices:
        +   allowedServices:
        +     bigquery.googleapis.com
        -     storage.googleapis.com
        +   enableRestriction: true

POSITIONAL ARGUMENTS
     Perimeter resource - The service perimeter to describe. The arguments in
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
          + set the property access_context_manager/policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters dry-run describe

        $ gcloud beta access-context-manager perimeters dry-run describe
```

### gcloud access-context-manager perimeters dry-run drop

```text
NAME
    gcloud access-context-manager perimeters dry-run drop - reset the dry-run
        mode configuration of a Service Perimeter

SYNOPSIS
    gcloud access-context-manager perimeters dry-run drop
        (PERIMETER : --policy=POLICY) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes the explicit dry-run mode configuration for a Service Perimeter.
    After this operation, the effective dry-run mode configuration is
    implicitly inherited from the enforcement mode configuration. No audit logs
    will be generated in this state.

EXAMPLES
    To reset the dry-run mode configuration for a Service Perimeter:

        $ gcloud access-context-manager perimeters dry-run drop my-perimeter

POSITIONAL ARGUMENTS
     Perimeter resource - The service perimeter to reset. The arguments in this
     group can be used to specify the attributes of this resource.

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
          + set the property access_context_manager/policy.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters dry-run drop

        $ gcloud beta access-context-manager perimeters dry-run drop
```

### gcloud access-context-manager perimeters dry-run enforce

```text
NAME
    gcloud access-context-manager perimeters dry-run enforce - enforces a
        Service Perimeter's dry-run configuration

SYNOPSIS
    gcloud access-context-manager perimeters dry-run enforce
        (PERIMETER : --policy=POLICY) [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Copies a Service Perimeter's dry-run mode configuration to its enforcement
    mode configuration and unsets the explicit dry-run spec. After this
    operation succeeds, the Service Perimeter will not have an explicit dry-run
    mode configuration, and, instead, the previous dry-run mode configuration
    will become the enforcement mode configuration. The operation will not be
    performed if there is no explicit dry-run mode configuration or if the
    dry-run mode configuration is incompatible with the overall enforcement
    mode VPC Service Controls policy.

EXAMPLES
    To enforce the dry-run mode configuration for a Service Perimeter:

        $ gcloud access-context-manager perimeters dry-run enforce \
            my-perimeter

POSITIONAL ARGUMENTS
     Perimeter resource - The service perimeter to reset. The arguments in this
     group can be used to specify the attributes of this resource.

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
          + set the property access_context_manager/policy.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters dry-run enforce

        $ gcloud beta access-context-manager perimeters dry-run enforce
```

### gcloud access-context-manager perimeters dry-run enforce-all

```text
NAME
    gcloud access-context-manager perimeters dry-run enforce-all - enforces the
        dry-run mode configuration for all Service Perimeters

SYNOPSIS
    gcloud access-context-manager perimeters dry-run enforce-all [--etag=etag]
        [--policy=policy] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    An enforce operation on a Service Perimeter involves copying its dry-run
    mode configuration (spec) to that Service Perimeter's enforcement mode
    configration (status). This command performs this operation for all Service
    Perimeters in the user's Access Policy.

    Note: Only Service Perimeters with an explicit dry-run mode configuration
    are affected by this operation. The overall operation succeeds once the
    dry-run configurations of all such Service Perimeters have been enforced.
    If the operation fails for any given Service Perimeter, it will cause the
    entire operation to be aborted.

EXAMPLES
    To enforce the dry-run mode configurations for all Service Perimeter in an
    Access Policy, run the following command:

        $ gcloud access-context-manager perimeters dry-run enforce-all

FLAGS
     --etag=etag
        The etag for the version of the Access Policy that this operation is to
        be performed on. If, at the time of the operation, the etag for the
        Access Policy stored in Access Context Manager is different from the
        specified etag, then the commit operation will not be performed and the
        call will fail. If etag is not provided, the operation will be
        performed as if a valid etag is provided.

     --policy=policy
        The parent Access Policy which owns all Service Perimeters in scope for
        the commit operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters dry-run enforce-all

        $ gcloud beta access-context-manager perimeters dry-run enforce-all
```

### gcloud access-context-manager perimeters dry-run list

```text
NAME
    gcloud access-context-manager perimeters dry-run list - list the effective
        dry-run configuration across all Service Perimeters

SYNOPSIS
    gcloud access-context-manager perimeters dry-run list [--policy=policy]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    By default, only the Service Perimeter name, title, type and the dry-run
    mode configuration (as spec) is displayed.

    Note: For Service Perimeters without an explicit dry-run mode
    configuration, the enforcement mode configuration is used as the dry-run
    mode configuration, resulting in no audit logs being generated.

EXAMPLES
    To list the dry-run mode configuration across all Service Perimeter:

        $ gcloud access-context-manager perimeters dry-run list

    Output:

        name: perimeter_1*
        spec:
          resources:
          - projects/123
          - projects/456
          restrictedServices:
          - storage.googleapis.com
        title: Perimeter 1
        ---
        name: perimeter_2
        spec:
          resources:
          - projects/789
          restrictedServices:
          - bigquery.googleapis.com
          vpcAccessibleServices:
            allowedServices:
            - bigquery.googleapis.com
            enableRestriction: true
        title: Perimeter 2

FLAGS
     --policy=policy
        Policy resource - The access policy you want to list the effective
        dry-run configuration for. This represents a Cloud resource.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters dry-run list

        $ gcloud beta access-context-manager perimeters dry-run list
```

### gcloud access-context-manager perimeters dry-run update

```text
NAME
    gcloud access-context-manager perimeters dry-run update - update the
        dry-run mode configuration for a Service Perimeter

SYNOPSIS
    gcloud access-context-manager perimeters dry-run update
        (PERIMETER : --policy=POLICY) [--async] [--etag=etag]
        [--add-access-levels=[ACCESS-LEVELS,...] | --clear-access-levels
          | --remove-access-levels=[ACCESS-LEVELS,...]]
        [--add-resources=[RESOURCES,...] | --clear-resources
          | --remove-resources=[RESOURCES,...]]
        [--add-restricted-services=[RESTRICTED-SERVICES,...]
          | --clear-restricted-services
          | --remove-restricted-services=[RESTRICTED-SERVICES,...]]
        [--clear-egress-policies | --set-egress-policies=YAML_FILE]
        [--clear-ingress-policies | --set-ingress-policies=YAML_FILE]
        [--clear-vpc-accessible-services
          | --set-vpc-accessible-services=YAML_FILE
          | --enable-vpc-accessible-services
          --add-vpc-allowed-services=[VPC_SERVICE,...]
          | --clear-vpc-allowed-services
          | --remove-vpc-allowed-services=[VPC_SERVICE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates the dry-run mode configuration (spec) for a Service
    Perimeter.

    For Service Perimeters with an explicitly defined dry-run mode
    configuration (i.e. an explicit spec), this operation updates that
    configuration directly, ignoring enforcement mode configuration.

    Service Perimeters that do not have explict dry-run mode configuration will
    inherit the enforcement mode configuration in the dry-run mode. Therefore,
    this command effectively clones the enforcement mode configuration, then
    applies the update on that configuration, and uses that as the explicit
    dry-run mode configuration.

EXAMPLES
    To update the dry-run mode configuration for a Service Perimeter:

        $ gcloud access-context-manager perimeters dry-run update \
            my-perimeter --add-resources="projects/123,projects/456" \
            --remove-restricted-services="storage.googleapis.com" \
            --add-access-levels="accessPolicies/123/accessLevels/a_level" \
            --enable-vpc-accessible-services --clear-vpc-allowed-services

POSITIONAL ARGUMENTS
     Perimeter resource - The service perimeter to update. The arguments in
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
          + set the property access_context_manager/policy.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=etag
        The etag for the version of the Access Policy that this operation is to
        be performed on. If, at the time of the operation, the etag for the
        Access Policy stored in Access Context Manager is different from the
        specified etag, then the commit operation will not be performed and the
        call will fail. If etag is not provided, the operation will be
        performed as if a valid etag is provided.

     These flags modify the member Access Level of this Service Perimeter.

     At most one of these can be specified:

       --add-access-levels=[ACCESS-LEVELS,...]
          Append the given values to the current Access Level.

       --clear-access-levels
          Empty the current Access Level.

       --remove-access-levels=[ACCESS-LEVELS,...]
          Remove the given values from the current Access Level.

     These flags modify the member Resources of this Service Perimeter.

     At most one of these can be specified:

       --add-resources=[RESOURCES,...]
          Append the given values to the current Resources.

       --clear-resources
          Empty the current Resources.

       --remove-resources=[RESOURCES,...]
          Remove the given values from the current Resources.

     These flags modify the member Restricted Services of this Service
     Perimeter.

     At most one of these can be specified:

       --add-restricted-services=[RESTRICTED-SERVICES,...]
          Append the given values to the current Restricted Services.

       --clear-restricted-services
          Empty the current Restricted Services.

       --remove-restricted-services=[RESTRICTED-SERVICES,...]
          Remove the given values from the current Restricted Services.

     These flags modify the enforced EgressPolicies of this ServicePerimeter.

     At most one of these can be specified:

       --clear-egress-policies
          Empties existing enforced Egress Policies.

       --set-egress-policies=YAML_FILE
          Path to a file containing a list of Egress Policies.

          This file contains a list of YAML-compliant objects representing
          Egress Policies described in the API reference.

          For more information about the alpha version, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
          For more information about non-alpha versions, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

     These flags modify the enforced IngressPolicies of this ServicePerimeter.

     At most one of these can be specified:

       --clear-ingress-policies
          Empties existing enforced Ingress Policies.

       --set-ingress-policies=YAML_FILE
          Path to a file containing a list of Ingress Policies.

          This file contains a list of YAML-compliant objects representing
          Ingress Policies described in the API reference.

          For more information about the alpha version, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
          For more information about non-alpha versions, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

     These flags modify the VpcAccessibleServices of this ServicePerimeter
     config.

     At most one of these can be specified:

       --clear-vpc-accessible-services
          Empties existing enforced VpcAccessibleServices.

       --set-vpc-accessible-services=YAML_FILE
          Path to a file containing a VpcAccessibleServices object.

          This file contains a YAML-compliant object representing
          VpcAccessibleServices described in the API reference.

          For more information about the alpha version, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
          For more information about non-alpha versions, see:
          https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

       Or at least one of these can be specified:

         --enable-vpc-accessible-services
            When specified restrict API calls within the Service Perimeter to
            the set of vpc allowed services. To disable use
            '--no-enable-vpc-accessible-services'.

         These flags modify the member vpc allowed services of this perimeter.
         Services allowed to be called within the Perimeter when VPC Accessible
         Services is enabled

         At most one of these can be specified:

           --add-vpc-allowed-services=[VPC_SERVICE,...]
              Append the given values to the current vpc allowed services.

           --clear-vpc-allowed-services
              Empty the current vpc allowed services.

           --remove-vpc-allowed-services=[VPC_SERVICE,...]
              Remove the given values from the current vpc allowed services.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters dry-run update

        $ gcloud beta access-context-manager perimeters dry-run update
```

### gcloud beta access-context-manager perimeters dry-run create

```text
NAME
    gcloud beta access-context-manager perimeters dry-run create - create a
        dry-run mode configuration for a new or existing Service Perimeter

SYNOPSIS
    gcloud beta access-context-manager perimeters dry-run create
        (PERIMETER : --policy=POLICY)
        (--access-levels=[access_levels,...] --egress-policies=YAML_FILE
          --ingress-policies=YAML_FILE --resources=[resources,...]
          --restricted-services=[restricted_services,...]
          --vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
          | --enable-vpc-accessible-services
          --vpc-allowed-services=[vpc_allowed_services,...]
          | [--perimeter-title=PERIMETER_TITLE --perimeter-type=PERIMETER_TYPE
          : --perimeter-access-levels=[access_levels,...]
          --perimeter-description=PERIMETER_DESCRIPTION
          --perimeter-egress-policies=YAML_FILE
          --perimeter-ingress-policies=YAML_FILE
          --perimeter-resources=[resources,...]
          --perimeter-restricted-services=[restricted_services,...]
          --perimeter-vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
          | --perimeter-enable-vpc-accessible-services
          --perimeter-vpc-allowed-services=[vpc_allowed_services,...]])
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager perimeters dry-run delete

```text
NAME
    gcloud beta access-context-manager perimeters dry-run delete - mark the
        Service Perimeter as deleted in the dry-run mode

SYNOPSIS
    gcloud beta access-context-manager perimeters dry-run delete
        (PERIMETER : --policy=POLICY) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager perimeters dry-run describe

```text
NAME
    gcloud beta access-context-manager perimeters dry-run describe - display
        the dry-run mode configuration for a Service Perimeter

SYNOPSIS
    gcloud beta access-context-manager perimeters dry-run describe
        (PERIMETER : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager perimeters dry-run drop

```text
NAME
    gcloud beta access-context-manager perimeters dry-run drop - reset the
        dry-run mode configuration of a Service Perimeter

SYNOPSIS
    gcloud beta access-context-manager perimeters dry-run drop
        (PERIMETER : --policy=POLICY) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager perimeters dry-run enforce

```text
NAME
    gcloud beta access-context-manager perimeters dry-run enforce - enforces a
        Service Perimeter's dry-run configuration

SYNOPSIS
    gcloud beta access-context-manager perimeters dry-run enforce
        (PERIMETER : --policy=POLICY) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager perimeters dry-run enforce-all

```text
NAME
    gcloud beta access-context-manager perimeters dry-run enforce-all -
        enforces the dry-run mode configuration for all Service Perimeters

SYNOPSIS
    gcloud beta access-context-manager perimeters dry-run enforce-all
        [--etag=etag] [--policy=policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager perimeters dry-run list

```text
NAME
    gcloud beta access-context-manager perimeters dry-run list - list the
        effective dry-run configuration across all Service Perimeters

SYNOPSIS
    gcloud beta access-context-manager perimeters dry-run list
        [--policy=policy] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-context-manager perimeters dry-run update

```text
NAME
    gcloud beta access-context-manager perimeters dry-run update - update the
        dry-run mode configuration for a Service Perimeter

SYNOPSIS
    gcloud beta access-context-manager perimeters dry-run update
        (PERIMETER : --policy=POLICY) [--async] [--etag=etag]
        [--add-access-levels=[ACCESS-LEVELS,...] | --clear-access-levels
          | --remove-access-levels=[ACCESS-LEVELS,...]]
        [--add-resources=[RESOURCES,...] | --clear-resources
          | --remove-resources=[RESOURCES,...]]
        [--add-restricted-services=[RESTRICTED-SERVICES,...]
          | --clear-restricted-services
          | --remove-restricted-services=[RESTRICTED-SERVICES,...]]
        [--clear-egress-policies | --set-egress-policies=YAML_FILE]
        [--clear-ingress-policies | --set-ingress-policies=YAML_FILE]
        [--clear-vpc-accessible-services
          | --set-vpc-accessible-services=YAML_FILE
          | --enable-vpc-accessible-services
          --add-vpc-allowed-services=[VPC_SERVICE,...]
          | --clear-vpc-allowed-services
          | --remove-vpc-allowed-services=[VPC_SERVICE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters dry-run create

```text
NAME
    gcloud alpha access-context-manager perimeters dry-run create - create a
        dry-run mode configuration for a new or existing Service Perimeter

SYNOPSIS
    gcloud alpha access-context-manager perimeters dry-run create
        (PERIMETER : --policy=POLICY)
        (--access-levels=[access_levels,...] --egress-policies=YAML_FILE
          --ingress-policies=YAML_FILE --resources=[resources,...]
          --restricted-services=[restricted_services,...]
          --vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
          | --enable-vpc-accessible-services
          --vpc-allowed-services=[vpc_allowed_services,...]
          | [--perimeter-title=PERIMETER_TITLE --perimeter-type=PERIMETER_TYPE
          : --perimeter-access-levels=[access_levels,...]
          --perimeter-description=PERIMETER_DESCRIPTION
          --perimeter-egress-policies=YAML_FILE
          --perimeter-ingress-policies=YAML_FILE
          --perimeter-resources=[resources,...]
          --perimeter-restricted-services=[restricted_services,...]
          --perimeter-vpc-accessible-services=VPC_ACCESSIBLE_SERVICES_YAML_FILE
          | --perimeter-enable-vpc-accessible-services
          --perimeter-vpc-allowed-services=[vpc_allowed_services,...]])
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters dry-run delete

```text
NAME
    gcloud alpha access-context-manager perimeters dry-run delete - mark the
        Service Perimeter as deleted in the dry-run mode

SYNOPSIS
    gcloud alpha access-context-manager perimeters dry-run delete
        (PERIMETER : --policy=POLICY) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters dry-run describe

```text
NAME
    gcloud alpha access-context-manager perimeters dry-run describe - display
        the dry-run mode configuration for a Service Perimeter

SYNOPSIS
    gcloud alpha access-context-manager perimeters dry-run describe
        (PERIMETER : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters dry-run drop

```text
NAME
    gcloud alpha access-context-manager perimeters dry-run drop - reset the
        dry-run mode configuration of a Service Perimeter

SYNOPSIS
    gcloud alpha access-context-manager perimeters dry-run drop
        (PERIMETER : --policy=POLICY) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters dry-run enforce

```text
NAME
    gcloud alpha access-context-manager perimeters dry-run enforce - enforces a
        Service Perimeter's dry-run configuration

SYNOPSIS
    gcloud alpha access-context-manager perimeters dry-run enforce
        (PERIMETER : --policy=POLICY) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters dry-run enforce-all

```text
NAME
    gcloud alpha access-context-manager perimeters dry-run enforce-all -
        enforces the dry-run mode configuration for all Service Perimeters

SYNOPSIS
    gcloud alpha access-context-manager perimeters dry-run enforce-all
        [--etag=etag] [--policy=policy] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters dry-run list

```text
NAME
    gcloud alpha access-context-manager perimeters dry-run list - list the
        effective dry-run configuration across all Service Perimeters

SYNOPSIS
    gcloud alpha access-context-manager perimeters dry-run list
        [--policy=policy] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters dry-run update

```text
NAME
    gcloud alpha access-context-manager perimeters dry-run update - update the
        dry-run mode configuration for a Service Perimeter

SYNOPSIS
    gcloud alpha access-context-manager perimeters dry-run update
        (PERIMETER : --policy=POLICY) [--async] [--etag=etag]
        [--add-access-levels=[ACCESS-LEVELS,...] | --clear-access-levels
          | --remove-access-levels=[ACCESS-LEVELS,...]]
        [--add-resources=[RESOURCES,...] | --clear-resources
          | --remove-resources=[RESOURCES,...]]
        [--add-restricted-services=[RESTRICTED-SERVICES,...]
          | --clear-restricted-services
          | --remove-restricted-services=[RESTRICTED-SERVICES,...]]
        [--clear-egress-policies | --set-egress-policies=YAML_FILE]
        [--clear-ingress-policies | --set-ingress-policies=YAML_FILE]
        [--clear-vpc-accessible-services
          | --set-vpc-accessible-services=YAML_FILE
          | --enable-vpc-accessible-services
          --add-vpc-allowed-services=[VPC_SERVICE,...]
          | --clear-vpc-allowed-services
          | --remove-vpc-allowed-services=[VPC_SERVICE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/dry-run (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
