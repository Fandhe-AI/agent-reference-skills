---
source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/odb-networks
---

# gcloud oracle-database odb-networks (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud oracle-database odb-networks update

```text
NAME
    gcloud oracle-database odb-networks update - update an OdbNetwork

SYNOPSIS
    gcloud oracle-database odb-networks update
        (ODB_NETWORK : --location=LOCATION) [--async] [--request-id=REQUEST_ID]
        [--clear-service-connectivity-config
          --psc-interface-config-network-attachment=PSC_INTERFACE_CONFIG_NETWORK_ATTACHMENT]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an OdbNetwork. Only setting or clearing service_connectivity_config
    and updating labels are supported; an existing network attachment cannot be
    changed directly.

EXAMPLES
    To set the Private Service Connect interface network attachment on an
    OdbNetwork with id my-odbnetwork in the location us-east4, run:

        $ gcloud oracle-database odb-networks update my-odbnetwork \
            --location=us-east4 \
            --psc-interface-config-network-attachment=projects/my-project/\
        regions/us-east4/networkAttachments/my-network-attachment

    To remove the service connectivity configuration from an OdbNetwork with id
    my-odbnetwork in the location us-east4, run:

        $ gcloud oracle-database odb-networks update my-odbnetwork \
            --location=us-east4 --clear-service-connectivity-config

    To add or update labels on an OdbNetwork with id my-odbnetwork in the
    location us-east4, run:

        $ gcloud oracle-database odb-networks update my-odbnetwork \
            --location=us-east4 --update-labels=env=prod,team=oasis

    To remove the label team from the OdbNetwork, run:

        $ gcloud oracle-database odb-networks update my-odbnetwork \
            --location=us-east4 --remove-labels=team

    To clear all labels from the OdbNetwork, run:

        $ gcloud oracle-database odb-networks update my-odbnetwork \
            --location=us-east4 --clear-labels

POSITIONAL ARGUMENTS
     OdbNetwork resource - Identifier. The name of the OdbNetwork resource in
     the following format:
     projects/{project}/locations/{region}/odbNetworks/{odb_network} The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument odb_network on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ODB_NETWORK
          ID of the odbNetwork or fully qualified identifier for the
          odbNetwork.

          To set the odb_network attribute:
          + provide the argument odb_network on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the odbNetwork resource.

          To set the location attribute:
          + provide the argument odb_network on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --request-id=REQUEST_ID
        An optional ID to identify the request. This value is used to identify
        duplicate requests. If you make a request with the same request ID and
        the original request is still in progress or completed, the server
        ignores the second request. This prevents clients from accidentally
        creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Configuration to enable the service (Oracledatabase@Google Cloud) to
     establish connectivity to the database.

     This should be specified if you intend to associate this OdbNetwork with a
     DatabaseConnection resource to ExecuteSQL on the database, or to create a
     ServiceIntegration with the Database.

     Please don't specify it otherwise to avoid complicating the network setup.

     --clear-service-connectivity-config
        Set odbNetwork.serviceConnectivityConfig back to default value.

     Configuration for a Private Service Connect (PSC) interface used by
     Oracledatabase@Google Cloud to establish private connectivity to the
     database.

     --psc-interface-config-network-attachment=PSC_INTERFACE_CONFIG_NETWORK_ATTACHMENT
        The resource name of the Network Attachment that Oracledatabase@Google
        Cloud will use to establish private connectivity to the database via a
        Private Service Connect Interface (PSC-I). Format:
        projects/{project}/regions/{region}/networkAttachments/{network_attachment}

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Labels or tags associated with the resource.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. Labels or tags
            associated with the resource.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the oracledatabase/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/oracle/database/docs
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud oracle-database odb-networks update my-odbnetwork \
    --location=us-east4 \
    --psc-interface-config-network-attachment=projects/my-project/regions/us-east4/networkAttachments/my-network-attachment
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/oracle-database/odb-networks (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
