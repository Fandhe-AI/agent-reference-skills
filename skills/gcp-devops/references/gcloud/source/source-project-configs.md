---
source: https://docs.cloud.google.com/sdk/gcloud/reference/source/project-configs
---

# gcloud source project-configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud source project-configs describe

```text
NAME
    gcloud source project-configs describe - show details about the
        configuration of a project

SYNOPSIS
    gcloud source project-configs describe [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about the configuration of a project.

EXAMPLES
    To show the current configuration of the current project run:

        $ gcloud source project-configs describe

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the sourcerepo/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/source-repositories/docs

NOTES
    These variants are also available:

        $ gcloud alpha source project-configs describe

        $ gcloud beta source project-configs describe
```

### gcloud source project-configs update

```text
NAME
    gcloud source project-configs update - update the Cloud Source Repositories
        configuration of the current project

SYNOPSIS
    gcloud source project-configs update
        (--disable-pushblock | --enable-pushblock
          | --message-format=MESSAGE_FORMAT --service-account=SERVICE_ACCOUNT
          --topic-project=TOPIC_PROJECT --add-topic=ADD_TOPIC
          | --remove-topic=REMOVE_TOPIC | --update-topic=UPDATE_TOPIC)
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To enable PushBlock for all repositories under current project, run:

        $ gcloud source project-configs update --enable-pushblock

    To associate a Cloud Pub/Sub topic to receive repository update
    notifications, run:

        $ gcloud source project-configs update --add-topic=TOPIC_NAME \
            --service-account=SERVICE_ACCOUNT_EMAIL --message-format=json

REQUIRED FLAGS
     Exactly one of these must be specified:

       --disable-pushblock
          Disable PushBlock for all repositories under current project.
          PushBlock allows repository owners to block git push transactions
          containing private key data.

       --enable-pushblock
          Enable PushBlock for all repositories under current project.
          PushBlock allows repository owners to block git push transactions
          containing private key data.

       Or at least one of these can be specified:

         Manage Cloud Pub/Sub topics associated with the Cloud project.

         --message-format=MESSAGE_FORMAT
            The format of the message to publish to the topic. MESSAGE_FORMAT
            must be one of: json, protobuf.

         --service-account=SERVICE_ACCOUNT
            Email address of the service account used for publishing Cloud
            Pub/Sub messages. This service account needs to be in the same
            project as the project. When added, the caller needs to have
            iam.serviceAccounts.actAs permission on this service account. If
            unspecified, it defaults to the Compute Engine default service
            account.

         --topic-project=TOPIC_PROJECT
            Cloud project for the topic. If not set, the currently set project
            will be used.

         At most one of these can be specified:

           Topic resource - The Cloud Pub/Sub topic to add to the project. This
           represents a Cloud resource. (NOTE) Some attributes are not given
           arguments in this group but can be set in other ways.

           To set the project attribute:
            o provide the argument --add-topic on the command line with a
              fully specified name;
            o provide the argument --topic-project on the command line;
            o set the property core/project.

           --add-topic=ADD_TOPIC
              ID of the topic or fully qualified identifier for the topic.

              To set the topic attribute:
              o provide the argument --add-topic on the command line.

           Topic resource - The Cloud Pub/Sub topic to remove from the project.
           This represents a Cloud resource. (NOTE) Some attributes are not
           given arguments in this group but can be set in other ways.

           To set the project attribute:
            o provide the argument --remove-topic on the command line with a
              fully specified name;
            o provide the argument --topic-project on the command line;
            o set the property core/project.

           --remove-topic=REMOVE_TOPIC
              ID of the topic or fully qualified identifier for the topic.

              To set the topic attribute:
              o provide the argument --remove-topic on the command line.

           Topic resource - The Cloud Pub/Sub topic to update in the project.
           This represents a Cloud resource. (NOTE) Some attributes are not
           given arguments in this group but can be set in other ways.

           To set the project attribute:
            o provide the argument --update-topic on the command line with a
              fully specified name;
            o provide the argument --topic-project on the command line;
            o set the property core/project.

           --update-topic=UPDATE_TOPIC
              ID of the topic or fully qualified identifier for the topic.

              To set the topic attribute:
              o provide the argument --update-topic on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source project-configs update

        $ gcloud beta source project-configs update
```

### gcloud beta source project-configs describe

```text
NAME
    gcloud beta source project-configs describe - show details about the
        configuration of a project

SYNOPSIS
    gcloud beta source project-configs describe [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source project-configs update

```text
NAME
    gcloud beta source project-configs update - update the Cloud Source
        Repositories configuration of the current project

SYNOPSIS
    gcloud beta source project-configs update
        (--disable-pushblock | --enable-pushblock
          | --message-format=MESSAGE_FORMAT --service-account=SERVICE_ACCOUNT
          --topic-project=TOPIC_PROJECT --add-topic=ADD_TOPIC
          | --remove-topic=REMOVE_TOPIC | --update-topic=UPDATE_TOPIC)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source project-configs describe

```text
NAME
    gcloud alpha source project-configs describe - show details about the
        configuration of a project

SYNOPSIS
    gcloud alpha source project-configs describe [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source project-configs update

```text
NAME
    gcloud alpha source project-configs update - update the Cloud Source
        Repositories configuration of the current project

SYNOPSIS
    gcloud alpha source project-configs update
        (--disable-pushblock | --enable-pushblock
          | --message-format=MESSAGE_FORMAT --service-account=SERVICE_ACCOUNT
          --topic-project=TOPIC_PROJECT --add-topic=ADD_TOPIC
          | --remove-topic=REMOVE_TOPIC | --update-topic=UPDATE_TOPIC)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (End of Sale): the Cloud Source Repositories documentation says "Effective June 17, 2024, Cloud Source Repositories isn't available to new customers. If your organization hasn't previously used Cloud Source Repositories, you can't enable the API or use Cloud Source Repositories." and "Cloud Source Repositories is End of Sale. In preparation for the deprecation of this service, this page outlines migration options for multiple use cases. A shutdown date will be communicated at least one year before the shutdown occurs to provide time for you to successfully migrate to an alternative product." (https://docs.cloud.google.com/source-repositories/docs/enable-disable-cloud-source-repositories, https://docs.cloud.google.com/source-repositories/docs/migration-guides, retrieved 2026-11-19). Migration to Secure Source Manager is covered in the `secure-source-manager` category.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/source/project-configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
