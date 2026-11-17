---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/route-views
---

# gcloud network-services route-views

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-services route-views describe

```text
NAME
    gcloud network-services route-views describe - route View for a Mesh or
        Gateway

SYNOPSIS
    gcloud network-services route-views describe
        (--route-view=ROUTE_VIEW
          : --gateway=GATEWAY --location=LOCATION --mesh=MESH)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Route Views for a Mesh or Gateway

EXAMPLES
    Describe a Route Views for a Mesh

        $ gcloud network-services route-views describe \
            --project=$PROJECT_ID --location=$LOCATION --mesh mesh1 \
            --route-view $ROUTE_VIEW_ID
        $ gcloud network-services route-views describe \
            --route-view=projects/-/locations/-/meshes/-/routeViews/\
        $ROUTE_VIEW_ID

    Describe a Route Views for a Gateway

        $ gcloud network-services route-views describe \
            --project=$PROJECT_ID --location=$LOCATION --gateway gateway1 \
            --route-view $ROUTE_VIEW_ID
        $ gcloud network-services route-views describe \
            --route-view=projects/-/locations/-/gateways/-/routeViews/\
        $ROUTE_VIEW_ID

REQUIRED FLAGS
     Mesh or gateway route view resource - RouteView to describe The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --route-view on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project. This resource can be one of the
        following types: [networkservices.projects.locations.meshes.routeViews,
        networkservices.projects.locations.gateways.routeViews].

     This must be specified.

       --route-view=ROUTE_VIEW
          ID of the mesh_or_gateway_route_view or fully qualified identifier
          for the mesh_or_gateway_route_view.

          To set the route_view attribute:
          + provide the argument --route-view on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --gateway=GATEWAY
          Parent Gateway of the mesh_or_gateway_route_view

          To set the gateway attribute:
          + provide the argument --route-view on the command line with a
            fully specified name;
          + provide the argument --gateway on the command line. Must be
            specified for resource of type
            [networkservices.projects.locations.gateways.routeViews].

       --location=LOCATION
          Location of the mesh_or_gateway_route_view

          To set the location attribute:
          + provide the argument --route-view on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --mesh=MESH
          Parent Mesh of the mesh_or_gateway_route_view

          To set the mesh attribute:
          + provide the argument --route-view on the command line with a
            fully specified name;
          + provide the argument --mesh on the command line. Must be
            specified for resource of type
            [networkservices.projects.locations.meshes.routeViews].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha network-services route-views describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud network-services route-views describe \
    --project="${PROJECT_ID}" \
    --location="${LOCATION}" \
    --mesh mesh1 \
    --route-view "${ROUTE_VIEW_ID}"

gcloud network-services route-views describe \
    --route-view="projects/-/locations/-/meshes/-/routeViews/${ROUTE_VIEW_ID}"

gcloud network-services route-views describe \
    --project="${PROJECT_ID}" \
    --location="${LOCATION}" \
    --gateway gateway1 \
    --route-view "${ROUTE_VIEW_ID}"

gcloud network-services route-views describe \
    --route-view="projects/-/locations/-/gateways/-/routeViews/${ROUTE_VIEW_ID}"
```

### gcloud network-services route-views list

```text
NAME
    gcloud network-services route-views list - route View for a Mesh or Gateway

SYNOPSIS
    gcloud network-services route-views list (--gateway=GATEWAY | --mesh=MESH)
        [--location=LOCATION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Route Views for a Mesh or Gateway

EXAMPLES
    List Route Views for a mesh.

        $ gcloud network-services route-views list \
            --mesh projects/-/locations/-/meshes/mesh1
        $ gcloud network-services route-views list --project $PROJECT \
            --location $LOCATION \
            --mesh projects/-/locations/-/meshes/mesh1 List Route Views \
            for a gateway.

        $ gcloud network-services route-views list \
            --gateway projects/-/locations/-/gateways/gateway1
        $ gcloud network-services route-views list --project $PROJECT \
            --location $LOCATION \
            --gateway projects/-/locations/-/gateways/gateway1

REQUIRED FLAGS
     Parent of the Route View

     Exactly one of these must be specified:

       Gateway resource - Parent Gateway This represents a Cloud resource.
       (NOTE) Some attributes are not given arguments in this group but can be
       set in other ways.

       To set the project attribute:
        + provide the argument --gateway on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --gateway on the command line with a fully
          specified name;
        + provide the argument --location on the command line.

       --gateway=GATEWAY
          ID of the gateway or fully qualified identifier for the gateway.

          To set the gateway attribute:
          + provide the argument --gateway on the command line.

       Mesh resource - Parent Mesh This represents a Cloud resource. (NOTE)
       Some attributes are not given arguments in this group but can be set in
       other ways.

       To set the project attribute:
        + provide the argument --mesh on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --mesh on the command line with a fully
          specified name;
        + provide the argument --location on the command line.

       --mesh=MESH
          ID of the mesh or fully qualified identifier for the mesh.

          To set the mesh attribute:
          + provide the argument --mesh on the command line.

FLAGS
     Location resource - Location of the parent This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line.

LIST COMMAND FLAGS
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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha network-services route-views list
```

Adapted (not in the official docs): runnable form of the example(s) above: `$VARIABLE` placeholders are quoted and the corrections listed in Notes are applied.

```bash
gcloud network-services route-views list \
    --project "${PROJECT}" \
    --location "${LOCATION}" \
    --mesh projects/-/locations/-/meshes/mesh1

gcloud network-services route-views list \
    --project "${PROJECT}" \
    --location "${LOCATION}" \
    --gateway projects/-/locations/-/gateways/gateway1
```

### gcloud alpha network-services route-views describe

```text
NAME
    gcloud alpha network-services route-views describe - route View for a Mesh
        or Gateway

SYNOPSIS
    gcloud alpha network-services route-views describe
        (--route-view=ROUTE_VIEW
          : --gateway=GATEWAY --location=LOCATION --mesh=MESH)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services route-views list

```text
NAME
    gcloud alpha network-services route-views list - route View for a Mesh or
        Gateway

SYNOPSIS
    gcloud alpha network-services route-views list
        (--gateway=GATEWAY | --mesh=MESH) [--location=LOCATION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the help joins the sentence "List Route Views for a gateway." to the end of the second mesh `list` example, so gcloud 593.0.0 receives it as arguments ("unrecognized arguments: List Route Views for a gateway."); the runnable form ends the command after `--mesh projects/-/locations/-/meshes/mesh1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-services/route-views (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
