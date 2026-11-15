---
source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/analyze-iam-policy-longrunning
---

# gcloud asset analyze-iam-policy-longrunning

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud asset analyze-iam-policy-longrunning

```text
NAME
    gcloud asset analyze-iam-policy-longrunning - analyzes IAM policies that
        match a request asynchronously and writes the results to Google Cloud
        Storage or BigQuery destination

SYNOPSIS
    gcloud asset analyze-iam-policy-longrunning
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID)
        (--gcs-output-path=GCS_OUTPUT_PATH
          | [--bigquery-dataset=BIGQUERY_DATASET
          --bigquery-table-prefix=BIGQUERY_TABLE_PREFIX
          : --bigquery-partition-key=BIGQUERY_PARTITION_KEY
          --bigquery-write-disposition=BIGQUERY_WRITE_DISPOSITION])
        [--access-time=ACCESS_TIME] [--full-resource-name=FULL_RESOURCE_NAME]
        [--identity=IDENTITY]
        [--analyze-service-account-impersonation --expand-groups
          --expand-resources
          --expand-roles --output-group-edges --output-resource-edges]
        [--permissions=[PERMISSIONS,...] --roles=[ROLES,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Analyzes IAM policies that match a request asynchronously and writes the
    results to Google Cloud Storage or BigQuery destination.

EXAMPLES
    To find out which users have been granted the iam.serviceAccounts.actAs
    permission on a service account, and write analysis results to Google Cloud
    Storage, run:

        $ gcloud asset analyze-iam-policy-longrunning \
            --organization=YOUR_ORG_ID \
            --full-resource-name=YOUR_SERVICE_ACCOUNT_FULL_RESOURCE_NAME \
            --permissions='iam.serviceAccounts.actAs' \
            --gcs-output-path='gs://YOUR_BUCKET_NAME/YOUR_OBJECT_NAME'

    To find out which resources a user can access, and write analysis results
    to Google Cloud Storage, run:

        $ gcloud asset analyze-iam-policy-longrunning \
            --organization=YOUR_ORG_ID --identity='user:u1@foo.com' \
            --gcs-output-path='gs://YOUR_BUCKET_NAME/YOUR_OBJECT_NAME'

    To find out which roles or permissions a user has been granted on a
    project, and write analysis results to BigQuery, run:

        $ gcloud asset analyze-iam-policy-longrunning \
            --organization=YOUR_ORG_ID \
            --full-resource-name=YOUR_PROJECT_FULL_RESOURCE_NAME \
            --identity='user:u1@foo.com' \
            --bigquery-dataset='projects/YOUR_PROJECT_ID/datasets/YOUR_DATAS\
        ET_ID' --bigquery-table-prefix='YOUR_BIGQUERY_TABLE_PREFIX'

    To find out which users have been granted the iam.serviceAccounts.actAs
    permission on any applicable resources, and write analysis results to
    BigQuery, run:

        $ gcloud asset analyze-iam-policy-longrunning \
            --organization=YOUR_ORG_ID \
            --permissions='iam.serviceAccounts.actAs' \
            --bigquery-dataset='projects/YOUR_PROJECT_ID/datasets/YOUR_DATAS\
        ET_ID' --bigquery-table-prefix='YOUR_BIGQUERY_TABLE_PREFIX'

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID on which to perform the analysis. Only policies defined at
          or below this folder will be targeted in the analysis.

       --organization=ORGANIZATION_ID
          Organization ID on which to perform the analysis. Only policies
          defined at or below this organization will be targeted in the
          analysis.

       --project=PROJECT_ID
          Project ID or number on which to perform the analysis. Only policies
          defined at or below this project will be targeted in the analysis.

     The destination path for writing IAM policy analysis results.

     Exactly one of these must be specified:

       --gcs-output-path=GCS_OUTPUT_PATH
          Google Cloud Storage URI where the results will be written. URI must
          start with "gs://". For example, "gs://bucket_name/object_name".

       Or at least one of these can be specified:

         BigQuery destination where the results will go.

         --bigquery-dataset=BIGQUERY_DATASET
            BigQuery dataset where the results will be written. Must be a
            dataset relative name starting with "projects/". For example,
            "projects/project_id/datasets/dataset_id".

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --bigquery-table-prefix=BIGQUERY_TABLE_PREFIX
            The prefix of the BigQuery tables to which the analysis results
            will be written. A table name consists of letters, numbers and
            underscores".

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --bigquery-partition-key=BIGQUERY_PARTITION_KEY
            This enum determines the partition key column for the bigquery
            tables. Partitioning can improve query performance and reduce query
            cost by filtering partitions. Refer to
            https://cloud.google.com/bigquery/docs/partitioned-tables for
            details. BIGQUERY_PARTITION_KEY must be one of:
            PARTITION_KEY_UNSPECIFIED, REQUEST_TIME.

         --bigquery-write-disposition=BIGQUERY_WRITE_DISPOSITION
            Specifies the action that occurs if the destination table or
            partition already exists. The following values are supported:
            WRITE_TRUNCATE, WRITE_APPEND and WRITE_EMPTY. The default value is
            WRITE_APPEND.

OPTIONAL FLAGS
     The hypothetical context to evaluate IAM conditions.

     --access-time=ACCESS_TIME
        The hypothetical access timestamp to evaluate IAM conditions.

     Specifies a resource for analysis. Leaving it empty means ANY.

     --full-resource-name=FULL_RESOURCE_NAME
        The full resource name.

     Specifies an identity for analysis. Leaving it empty means ANY.

     --identity=IDENTITY
        The identity appearing in the form of principals in the IAM policy
        binding.

     The analysis options.

     --analyze-service-account-impersonation
        If true, the response will include access analysis from identities to
        resources via service account impersonation. This is a very expensive
        operation, because many derived queries will be executed. We highly
        recommend you use AnalyzeIamPolicyLongrunning rpc instead. Default is
        false.

     --expand-groups
        If true, the identities section of the result will expand any Google
        groups appearing in an IAM policy binding. Default is false.

     --expand-resources
        If true, the resource section of the result will expand any resource
        attached to an IAM policy to include resources lower in the resource
        hierarchy. Default is false.

     --expand-roles
        If true, the access section of result will expand any roles appearing
        in IAM policy bindings to include their permissions. Default is false.

     --output-group-edges
        If true, the result will output the relevant membership relationships
        between groups. Default is false.

     --output-resource-edges
        If true, the result will output the relevant parent/child relationships
        between resources. Default is false.

     Specifies roles or permissions for analysis. Leaving it empty means ANY.

     --permissions=[PERMISSIONS,...]
        The permissions to appear in the result.

     --roles=[ROLES,...]
        The roles to appear in the result.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha asset analyze-iam-policy-longrunning

        $ gcloud beta asset analyze-iam-policy-longrunning
```

### gcloud beta asset analyze-iam-policy-longrunning

```text
NAME
    gcloud beta asset analyze-iam-policy-longrunning - analyzes IAM policies
        that match a request asynchronously and writes the results to Google
        Cloud Storage or BigQuery destination

SYNOPSIS
    gcloud beta asset analyze-iam-policy-longrunning
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID)
        (--gcs-output-path=GCS_OUTPUT_PATH
          | [--bigquery-dataset=BIGQUERY_DATASET
          --bigquery-table-prefix=BIGQUERY_TABLE_PREFIX
          : --bigquery-partition-key=BIGQUERY_PARTITION_KEY
          --bigquery-write-disposition=BIGQUERY_WRITE_DISPOSITION])
        [--access-time=ACCESS_TIME] [--full-resource-name=FULL_RESOURCE_NAME]
        [--identity=IDENTITY]
        [--analyze-service-account-impersonation --expand-groups
          --expand-resources
          --expand-roles --output-group-edges --output-resource-edges]
        [--permissions=[PERMISSIONS,...] --roles=[ROLES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha asset analyze-iam-policy-longrunning

```text
NAME
    gcloud alpha asset analyze-iam-policy-longrunning - analyzes IAM policies
        that match a request asynchronously and writes the results to Google
        Cloud Storage or BigQuery destination

SYNOPSIS
    gcloud alpha asset analyze-iam-policy-longrunning
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID)
        (--gcs-output-path=GCS_OUTPUT_PATH
          | [--bigquery-dataset=BIGQUERY_DATASET
          --bigquery-table-prefix=BIGQUERY_TABLE_PREFIX
          : --bigquery-partition-key=BIGQUERY_PARTITION_KEY
          --bigquery-write-disposition=BIGQUERY_WRITE_DISPOSITION])
        [--access-time=ACCESS_TIME] [--full-resource-name=FULL_RESOURCE_NAME]
        [--identity=IDENTITY]
        [--analyze-service-account-impersonation --expand-groups
          --expand-resources --expand-roles --include-deny-policy-analysis
          --output-group-edges --output-resource-edges]
        [--permissions=[PERMISSIONS,...] --roles=[ROLES,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/asset/analyze-iam-policy-longrunning (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
