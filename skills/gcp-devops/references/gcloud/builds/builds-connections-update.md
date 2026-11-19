---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/connections/update
---

# gcloud builds connections update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds connections update bitbucket-cloud

```text
NAME
    gcloud builds connections update bitbucket-cloud - update a Cloud Build
        Connection of type Bitbucket Cloud

SYNOPSIS
    gcloud builds connections update bitbucket-cloud
        (CONNECTION : --region=REGION) [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [--read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION]
        [--webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION]
        [--workspace=WORKSPACE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud Build Connection of type Bitbucket Cloud.

EXAMPLES
    To update the workspace, provide the connection name and the workspace
    name:

        $ gcloud builds connections update bitbucket-cloud my-bbc-conn \
            --region=us-west1 --workspace=my-workspace

    To update the authorization token, provide the connection name and the new
    authorization token        secret version.

        $ gcloud builds connections update bitbucket-cloud my-bbc-conn \
            --region=us-west1 \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        admin-pat/versions/1

POSITIONAL ARGUMENTS
     Connection resource - Connection to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the repository_read,repository_admin,
        pullrequest_read, webhook access token. It can be a repository, project
        or workspace access token.

     --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the repository_read access token. It can be a
        repository, project or workspace access token.

     --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
        Secret containing the webhook secret string for validating webhook
        events sent by Bitbucket Cloud.

     --workspace=WORKSPACE
        Workspace of the Bitbucket Cloud instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds connections update bitbucket-cloud

        $ gcloud beta builds connections update bitbucket-cloud
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds connections update bitbucket-cloud my-bbc-conn \
    --region=us-west1 \
    --authorizer-token-secret-version=projects/myproj/secrets/admin-pat/versions/1
```

### gcloud builds connections update bitbucket-data-center

```text
NAME
    gcloud builds connections update bitbucket-data-center - update a Cloud
        Build Connection of type Bitbucket Data Center

SYNOPSIS
    gcloud builds connections update bitbucket-data-center
        (CONNECTION : --region=REGION) [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [--host-uri=HOST_URI]
        [--read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud Build Connection of type Bitbucket Data Center.

EXAMPLES
    To update the ssl_ca, provide the connection name and the ssl_ca file:

        $ gcloud builds connections update bitbucket-data-center \
            my-gle-conn --region=us-west1 --ssl-ca-file=mycertificate.crt

    To update the authorization token, provide the connection name and the new
    authorization token secret version name.

        $ gcloud builds connections update bitbucket-data-center \
            my-gle-conn --region=us-west1 \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        admin-pat/versions/1

POSITIONAL ARGUMENTS
     Connection resource - Connection to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the REPO_ADMIN personal access token.

     --host-uri=HOST_URI
        URI of the Bitbucket Data Center instance.

     --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the REPO_READ personal access token.

     --service-directory-service=SERVICE_DIRECTORY_SERVICE
        Service Directory service resource to use for accessing the Bitbucket
        Data Center. Necessary only if the server has no public access from the
        internet.

     --ssl-ca-file=SSL_CA_FILE
        File containing the SSL_CA to be used.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds connections update bitbucket-data-center

        $ gcloud beta builds connections update bitbucket-data-center
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds connections update bitbucket-data-center my-gle-conn \
    --region=us-west1 \
    --authorizer-token-secret-version=projects/myproj/secrets/admin-pat/versions/1
```

### gcloud builds connections update github

```text
NAME
    gcloud builds connections update github - update a Cloud Build Connection
        of type GitHub

SYNOPSIS
    gcloud builds connections update github (CONNECTION : --region=REGION)
        [--app-installation-id=APP_INSTALLATION_ID] [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud Build Connection of type GitHub (for github.com).

EXAMPLES
    To update the authorizer token, provide the connection name and the
    authorizer token secret:

        $ gcloud builds connections update github myconn \
            --region=us-central1 \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        mytoken/versions/1

    To update the installation id, provide the connection name and the
    installation id of the Cloud Build GitHub app.

        $ gcloud builds connections update github myconn \
            --region=us-central1 --app-installation-id=1234

POSITIONAL ARGUMENTS
     Connection resource - Connection to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

FLAGS
     --app-installation-id=APP_INSTALLATION_ID
        Installation ID of the Cloud Build GitHub App.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the authorizer user's token.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds connections update github

        $ gcloud beta builds connections update github
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds connections update github myconn \
    --region=us-central1 \
    --authorizer-token-secret-version=projects/myproj/secrets/mytoken/versions/1
```

### gcloud builds connections update github-enterprise

```text
NAME
    gcloud builds connections update github-enterprise - update a Cloud Build
        Connection of type GitHub Enterprise

SYNOPSIS
    gcloud builds connections update github-enterprise
        (CONNECTION : --region=REGION) [--app-id=APP_ID]
        [--app-installation-id=APP_INSTALLATION_ID] [--app-slug=APP_SLUG]
        [--async] [--host-uri=HOST_URI]
        [--private-key-secret-version=PRIVATE_KEY_SECRET_VERSION]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--ssl-ca-file=SSL_CA_FILE]
        [--webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud Build Connection of type GitHub Enterprise.

EXAMPLES
    To update the ssl_ca, provide the connection name and the ssl_ca file:

        $ gcloud builds connections update github-enterprise my-ghe-conn \
            --region=us-west1 --ssl-ca-file=mycertificate.crt

    To update the installation id, provide the connection name and the
    installation id of the Cloud Build GitHub app.

        $ gcloud builds connections update github-enterprise my-ghe-conn \
            --region=us-west1 --app-installation-id=1234

POSITIONAL ARGUMENTS
     Connection resource - Connection to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

FLAGS
     --app-id=APP_ID
        App ID of the GitHub App in the GitHub Enterprise server.

     --app-installation-id=APP_INSTALLATION_ID
        Installation ID of the Cloud Build GitHub App.

     --app-slug=APP_SLUG
        App slug (url-friendly name) of the GitHub App. When seeing the
        configuration page of the App (e.g. in
        https://my-ghe-server.net/settings/apps/my-app), the app-slug is the
        last component of the URL path ("my-app" in that example).

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --host-uri=HOST_URI
        URI of the GitHub Enterprise server.

     --private-key-secret-version=PRIVATE_KEY_SECRET_VERSION
        Secret containing the private key of the GitHub App.

     --service-directory-service=SERVICE_DIRECTORY_SERVICE
        Service Directory service resource to use for accessing the GitHub
        Enterprise Server. Necessary only if the server has no public access
        from the internet.

     --ssl-ca-file=SSL_CA_FILE
        File containing the SSL_CA to be used.

     --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
        Secret containing the webhook secret string for validating webhook
        events generated by the GitHub App.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds connections update github-enterprise

        $ gcloud beta builds connections update github-enterprise
```

### gcloud builds connections update gitlab

```text
NAME
    gcloud builds connections update gitlab - update a Cloud Build Connection
        of type gitlab.com or GitLab Enterprise

SYNOPSIS
    gcloud builds connections update gitlab (CONNECTION : --region=REGION)
        [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [--host-uri=HOST_URI]
        [--read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud Build Connection of type gitlab.com or GitLab Enterprise.

EXAMPLES
    To update the ssl_ca, provide the connection name and the ssl_ca file:

        $ gcloud builds connections update gitlab my-gle-conn \
            --region=us-west1 --ssl-ca-file=mycertificate.crt

    To update the authorization token, provide the connection name and the new
    authorization token        secret version.

        $ gcloud builds connections update gitlab my-gle-conn \
            --region=us-west1 \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        api-pat/versions/1

POSITIONAL ARGUMENTS
     Connection resource - Connection to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument connection on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONNECTION
          ID of the connection or fully qualified identifier for the
          connection.

          To set the connection attribute:
          + provide the argument connection on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Google Cloud region.

          To set the region attribute:
          + provide the argument connection on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the api personal access token.

     --host-uri=HOST_URI
        URI of the GitLab instance.

     --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the read_repository personal access token. Required
        for GitLab Enterprise versions older than 13.10.

     --service-directory-service=SERVICE_DIRECTORY_SERVICE
        Service Directory service resource to use for accessing the GitLab
        Enterprise Server. Necessary only if the server has no public access
        from the internet.

     --ssl-ca-file=SSL_CA_FILE
        File containing the SSL_CA to be used.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds connections update gitlab

        $ gcloud beta builds connections update gitlab
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds connections update gitlab my-gle-conn \
    --region=us-west1 \
    --authorizer-token-secret-version=projects/myproj/secrets/api-pat/versions/1
```

### gcloud beta builds connections update bitbucket-cloud

```text
NAME
    gcloud beta builds connections update bitbucket-cloud - update a Cloud
        Build Connection of type Bitbucket Cloud

SYNOPSIS
    gcloud beta builds connections update bitbucket-cloud
        (CONNECTION : --region=REGION) [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [--read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION]
        [--webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION]
        [--workspace=WORKSPACE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds connections update bitbucket-data-center

```text
NAME
    gcloud beta builds connections update bitbucket-data-center - update a
        Cloud Build Connection of type Bitbucket Data Center

SYNOPSIS
    gcloud beta builds connections update bitbucket-data-center
        (CONNECTION : --region=REGION) [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [--host-uri=HOST_URI]
        [--read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds connections update github

```text
NAME
    gcloud beta builds connections update github - update a Cloud Build
        Connection of type GitHub

SYNOPSIS
    gcloud beta builds connections update github (CONNECTION : --region=REGION)
        [--app-installation-id=APP_INSTALLATION_ID] [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds connections update github-enterprise

```text
NAME
    gcloud beta builds connections update github-enterprise - update a Cloud
        Build Connection of type GitHub Enterprise

SYNOPSIS
    gcloud beta builds connections update github-enterprise
        (CONNECTION : --region=REGION) [--app-id=APP_ID]
        [--app-installation-id=APP_INSTALLATION_ID] [--app-slug=APP_SLUG]
        [--async] [--host-uri=HOST_URI]
        [--private-key-secret-version=PRIVATE_KEY_SECRET_VERSION]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--ssl-ca-file=SSL_CA_FILE]
        [--webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds connections update gitlab

```text
NAME
    gcloud beta builds connections update gitlab - update a Cloud Build
        Connection of type gitlab.com or GitLab Enterprise

SYNOPSIS
    gcloud beta builds connections update gitlab (CONNECTION : --region=REGION)
        [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [--host-uri=HOST_URI]
        [--read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections update bitbucket-cloud

```text
NAME
    gcloud alpha builds connections update bitbucket-cloud - update a Cloud
        Build Connection of type Bitbucket Cloud

SYNOPSIS
    gcloud alpha builds connections update bitbucket-cloud
        (CONNECTION : --region=REGION) [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [--[no-]disabled]
        [--read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION]
        [--webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION]
        [--workspace=WORKSPACE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections update bitbucket-data-center

```text
NAME
    gcloud alpha builds connections update bitbucket-data-center - update a
        Cloud Build Connection of type Bitbucket Data Center

SYNOPSIS
    gcloud alpha builds connections update bitbucket-data-center
        (CONNECTION : --region=REGION) [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [--[no-]disabled] [--host-uri=HOST_URI]
        [--read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections update github

```text
NAME
    gcloud alpha builds connections update github - update a Cloud Build
        Connection of type GitHub

SYNOPSIS
    gcloud alpha builds connections update github
        (CONNECTION : --region=REGION)
        [--app-installation-id=APP_INSTALLATION_ID] [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [--[no-]disabled] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections update github-enterprise

```text
NAME
    gcloud alpha builds connections update github-enterprise - update a Cloud
        Build Connection of type GitHub Enterprise

SYNOPSIS
    gcloud alpha builds connections update github-enterprise
        (CONNECTION : --region=REGION) [--app-id=APP_ID]
        [--app-installation-id=APP_INSTALLATION_ID] [--app-slug=APP_SLUG]
        [--async] [--[no-]disabled] [--host-uri=HOST_URI]
        [--private-key-secret-version=PRIVATE_KEY_SECRET_VERSION]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--ssl-ca-file=SSL_CA_FILE]
        [--webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections update gitlab

```text
NAME
    gcloud alpha builds connections update gitlab - update a Cloud Build
        Connection of type gitlab.com or GitLab Enterprise

SYNOPSIS
    gcloud alpha builds connections update gitlab
        (CONNECTION : --region=REGION) [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION]
        [--[no-]disabled] [--host-uri=HOST_URI]
        [--read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE]
        [--ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/connections/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
