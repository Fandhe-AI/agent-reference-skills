---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/connections/create
---

# gcloud builds connections create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds connections create bitbucket-cloud

```text
NAME
    gcloud builds connections create bitbucket-cloud - create a Cloud Build
        Connection for Bitbucket Cloud

SYNOPSIS
    gcloud builds connections create bitbucket-cloud
        (CONNECTION : --region=REGION)
        --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
        --workspace=WORKSPACE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Build Connection for Bitbucket Cloud.

    A Bitbucket Cloud Connection can be created by using a
    repository/project/workspace access token with
    repository_read,repository_admin, pullrequest_read, webhook scope
    permission and a repository/project/workspace access token with
    repository_read scope permission.

EXAMPLES
    To create a Bitbucket Cloud connection, provide all the required
    parameters:

        $ gcloud builds connections create bitbucket-cloud \
            my-bitbucket-conn --project=myproj --region=us-central1 \
            --workspace=my-workspace \
            --read-authorizer-token-secret-version=projects/myproj/secrets/\
        read-pat/versions/1 \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        admin-pat/versions/1 \
            --webhook-secret-secret-version=projects/myproj/secrets/\
        whsecret/versions/1

POSITIONAL ARGUMENTS
     Connection resource - Connection to create. The arguments in this group
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

REQUIRED FLAGS
     --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the repository_read,repository_admin,
        pullrequest_read, webhook repository/project/workspace access token.

     --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the repository_read repository/project/workspace
        access token.

     --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
        Secret containing the webhook secret string for validating webhook
        events sent by Bitbucket Cloud.

     --workspace=WORKSPACE
        Workspace of the Bitbucket Cloud instance.

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

API REFERENCE
    This command uses the cloudbuild/v2 API. The full documentation for this
    API can be found at: https://cloud.google.com/cloud-build/docs/

NOTES
    These variants are also available:

        $ gcloud alpha builds connections create bitbucket-cloud

        $ gcloud beta builds connections create bitbucket-cloud
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds connections create bitbucket-cloud my-bitbucket-conn \
    --project=myproj \
    --region=us-central1 \
    --workspace=my-workspace \
    --read-authorizer-token-secret-version=projects/myproj/secrets/read-pat/versions/1 \
    --authorizer-token-secret-version=projects/myproj/secrets/admin-pat/versions/1 \
    --webhook-secret-secret-version=projects/myproj/secrets/whsecret/versions/1
```

### gcloud builds connections create bitbucket-data-center

```text
NAME
    gcloud builds connections create bitbucket-data-center - create a Cloud
        Build Connection for Bitbucket Data Center

SYNOPSIS
    gcloud builds connections create bitbucket-data-center
        (CONNECTION : --region=REGION)
        --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION [--async]
        [--host-uri=HOST_URI]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE
          : --ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Build Connection for Bitbucket Data Center.

    A Bitbucket Data Center Connection can be created by using a personal
    access token with REPO_ADMIN scope permission. A REPO_READ scoped personal
    access token will also be required.

    If the Bitbucket Data Center can only be accessed within a VPC, a Service
    Directory service resource can be provided for connecting to it.

EXAMPLES
    To create a Bitbucket Data Center connection, provide all the required
    parameters:

        $ gcloud builds connections create bitbucket-data-center \
            my-bitbucket-conn --project=myproj --region=us-central1 \
            --host-uri=https://bitbucket-server.net \
            --read-authorizer-token-secret-version=projects/myproj/secrets/\
        read-pat/versions/1 \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        admin-pat/versions/1 \
            --webhook-secret-secret-version=projects/myproj/secrets/\
        whsecret/versions/1

    To create a Bitbucket Data Center connection for a private Bitbucket Data
    Center server. Provide the service-directory-service and ssl-ca-file as
    well:

        $ gcloud builds connections create bitbucket-data-center \
            my-private-bitbucket-conn \
            --host-uri=https://my.private-bitbucket-server.net \
            --project=myproj --region=us-central1 \
            --service-directory-service=projects/myproj/namespaces/x/\
        services/mysds --ssl-ca-file=mycertificate.crt \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        admin-pat/versions/1 \
            --read-authorizer-token-secret-version=projects/myproj/secrets/\
        read-pat/versions/1 \
            --webhook-secret-secret-version=projects/myproj/secrets/\
        whsecret/versions/1

POSITIONAL ARGUMENTS
     Connection resource - Connection to create. The arguments in this group
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

REQUIRED FLAGS
     --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the REPO_ADMIN personal access token.

     --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the REPO_READ personal access token.

     --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
        Secret containing the webhook secret string for validating webhook
        events sent by Bitbucket Data Center.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --host-uri=HOST_URI
        URI of the Bitbucket Data Center instance.

     Group of arguments for configuring access through Service Directory.

     --service-directory-service=SERVICE_DIRECTORY_SERVICE
        Service Directory service resource to use for accessing the Bitbucket
        Data Center. Necessary only if the server has no public access from the
        internet.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

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

        $ gcloud alpha builds connections create bitbucket-data-center

        $ gcloud beta builds connections create bitbucket-data-center
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud builds connections create bitbucket-data-center my-bitbucket-conn \
    --project=myproj \
    --region=us-central1 \
    --host-uri=https://bitbucket-server.net \
    --read-authorizer-token-secret-version=projects/myproj/secrets/read-pat/versions/1 \
    --authorizer-token-secret-version=projects/myproj/secrets/admin-pat/versions/1 \
    --webhook-secret-secret-version=projects/myproj/secrets/whsecret/versions/1

gcloud builds connections create bitbucket-data-center my-private-bitbucket-conn \
    --host-uri=https://my.private-bitbucket-server.net \
    --project=myproj \
    --region=us-central1 \
    --service-directory-service=projects/myproj/locations/us-central1/namespaces/x/services/mysds \
    --ssl-ca-file=mycertificate.crt \
    --authorizer-token-secret-version=projects/myproj/secrets/admin-pat/versions/1 \
    --read-authorizer-token-secret-version=projects/myproj/secrets/read-pat/versions/1 \
    --webhook-secret-secret-version=projects/myproj/secrets/whsecret/versions/1
```

### gcloud builds connections create github

```text
NAME
    gcloud builds connections create github - create a Cloud Build Connection
        of type GitHub

SYNOPSIS
    gcloud builds connections create github (CONNECTION : --region=REGION)
        [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
          : --app-installation-id=APP_INSTALLATION_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Build Connection of type GitHub (for github.com).

    Connections for github.com can be created either by following an
    installation process (that requires manual steps in a web browser) or by
    providing the properties of an already-installed application (installation
    ID and a user token) as arguments to this command.

EXAMPLES
    To create a connection by following the installation process, provide only
    the connection name:

        $ gcloud builds connections create github myconn --project=myproj \
            --region=us-central1

    The command will print a URL to be opened in a web browser in order to
    authorize Cloud Build (i.e. Cloud Build gets an OAuth token for the github
    account that you use). After doing this authorization, you can get the
    connection's installation state with the describe command:

        $ gcloud alpha builds connections describe myconn

    The output will include a second link to install the Cloud Build GitHub
    App. After doing this, the connection will be in installation state
    COMPLETE and repositories can be added to it (see gcloud alpha builds
    repositories create).

    --

    To create a complete connection (e.g. based on an existing user token and
    installation), provide both the authorizer secret token and the app
    installation id:

        $ gcloud builds connections create github myconn --project=myproj \
            --region=us-central1 \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        mytoken/versions/1 --app-installation-id=1234

    Above command creates the connection in installation state COMPLETE, ready
    for adding repositories.

POSITIONAL ARGUMENTS
     Connection resource - Connection to create. The arguments in this group
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

     Group of arguments for configuring a complete connnection.

     --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the authorizer user's token.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --app-installation-id=APP_INSTALLATION_ID
        Installation ID of the Cloud Build GitHub App.

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

        $ gcloud alpha builds connections create github

        $ gcloud beta builds connections create github
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud builds connections create github myconn \
    --project=myproj \
    --region=us-central1 \
    --authorizer-token-secret-version=projects/myproj/secrets/mytoken/versions/1 \
    --app-installation-id=1234
```

### gcloud builds connections create github-enterprise

```text
NAME
    gcloud builds connections create github-enterprise - create a Cloud Build
        Connection of type GitHub Enterprise

SYNOPSIS
    gcloud builds connections create github-enterprise
        (CONNECTION : --region=REGION) --host-uri=HOST_URI [--async]
        [--app-id=APP_ID --app-slug=APP_SLUG
          --private-key-secret-version=PRIVATE_KEY_SECRET_VERSION
          --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
          : --app-installation-id=APP_INSTALLATION_ID]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE
          : --ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Build Connection of type GitHub Enterprise.

    Connections for GitHub Enterprise can be created either by following an
    intallation process (that requires manual steps in a web browser) or by
    providing all the properties of an already-installed application as
    arguments to this command.

    If the GitHub Enterprise server can only be accessed within a VPC, a
    Service Directory service resource can be provided for connecting to it.

EXAMPLES
    To create a connection by following the installation process, provide only
    the connection name and the host URI. If the server can only be accessed
    within a VPC, provide also the Service Directory service resource:

        $ gcloud builds connections create github-enterprise my-ghe-conn \
            --project=myproj --region=us-central1 \
            --host-uri=https://my.ghe-server.net \
            --service-directory-service=projects/myproj/namespaces/x/\
        services/mysds

    The command will print a URL to be opened in a web browser in order create
    and install a GitHub App in that server. After following the URL, you can
    get the connection's installation state with The describe command:

        $ gcloud alpha builds connections describe my-ghe-conn \
            --region=us-central1

    If the connection's installation state is not COMPLETE yet, it will provide
    a link to continue the installation process. Once the connection is in
    installation state COMPLETE, repositories can be added to it (see gcloud
    alpha builds repositories create).

    --

    To create a complete connection (e.g. based on an existing installation),
    provide all the parameters:

        $ gcloud builds connections create github-enterprise my-ghe-conn \
            --project=myproj --region=us-central1 --app-id=111 \
            --app-slug=gcb-app \
            --service-directory-service=projects/myproj/namespaces/x/\
        services/mysds \
            --private-key-secret-version=projects/myproj/secrets/pk/\
        versions/1 \
            --webhook-secret-secret-version=projects/myproj/secrets/\
        whsecret/versions/1 --app-slug=myapp --app-installation-id=1234

    Above command creates the connection in installation state COMPLETE, ready
    for adding repositories.

POSITIONAL ARGUMENTS
     Connection resource - Connection to create. The arguments in this group
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

REQUIRED FLAGS
     --host-uri=HOST_URI
        URI of the GitHub Enterprise server.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     Group of arguments for the GitHub App properties.

     --app-id=APP_ID
        App ID of the GitHub App in the GitHub Enterprise server.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --app-slug=APP_SLUG
        App slug (url-friendly name) of the GitHub App. When seeing the
        configuration page of the App (e.g. in
        https://my-ghe-server.net/settings/apps/my-app), the app-slug is the
        last component of the URL path ("my-app" in that example).

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --private-key-secret-version=PRIVATE_KEY_SECRET_VERSION
        Secret containing the private key of the GitHub App.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
        Secret containing the webhook secret string for validating webhook
        events generated by the GitHub App.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --app-installation-id=APP_INSTALLATION_ID
        Installation ID of the Cloud Build GitHub App.

     Group of arguments for configuring access through Service Directory.

     --service-directory-service=SERVICE_DIRECTORY_SERVICE
        Service Directory service resource to use for accessing the GitHub
        Enterprise Server. Necessary only if the server has no public access
        from the internet.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

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

        $ gcloud alpha builds connections create github-enterprise

        $ gcloud beta builds connections create github-enterprise
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud builds connections create github-enterprise my-ghe-conn \
    --project=myproj \
    --region=us-central1 \
    --host-uri=https://my.ghe-server.net \
    --service-directory-service=projects/myproj/locations/us-central1/namespaces/x/services/mysds

gcloud builds connections create github-enterprise my-ghe-conn \
    --host-uri=https://my.ghe-server.net \
    --project=myproj \
    --region=us-central1 \
    --app-id=111 \
    --service-directory-service=projects/myproj/locations/us-central1/namespaces/x/services/mysds \
    --private-key-secret-version=projects/myproj/secrets/pk/versions/1 \
    --webhook-secret-secret-version=projects/myproj/secrets/whsecret/versions/1 \
    --app-slug=myapp \
    --app-installation-id=1234
```

### gcloud builds connections create gitlab

```text
NAME
    gcloud builds connections create gitlab - create a Cloud Build Connection
        for gitlab.com or GitLab Enterprise

SYNOPSIS
    gcloud builds connections create gitlab (CONNECTION : --region=REGION)
        --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION [--async]
        [--host-uri=HOST_URI]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE
          : --ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Build Connection for gitlab.com or GitLab Enterprise.

    A gitlab.com or GitLab Enterprise Connection can be created by using a
    personal access token with api scope permission. A read_repository scoped
    personal access token will also be required on gitlab.com or if the
    self-hosted GitLab server doesn't support project access token (GitLab
    Enterprise server version < 13.10).

    If the GitLab Enterprise server can only be accessed within a VPC, a
    Service Directory service resource can be provided for connecting to it.

EXAMPLES
    To create a GitLab connection for gitlab.com, provide all the required
    parameters:

        $ gcloud builds connections create gitlab my-gitlab-conn \
            --project=myproj --region=us-central1 \
            --read-authorizer-token-secret-version=projects/myproj/secrets/\
        read-pat/versions/1 \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        api-pat/versions/1 \
            --webhook-secret-secret-version=projects/myproj/secrets/\
        whsecret/versions/1

    To create a GitLab connection for a GitLab server, provide host-uri
    parameter as well:

        $ gcloud builds connections create gitlab my-gle-conn \
            --host-uri=https://my.gle-server.net --project=myproj \
            --region=us-central1 \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        api-pat/versions/1 \
            --read-authorizer-token-secret-version=projects/myproj/secrets/\
        read-pat/versions/1 \
            --webhook-secret-secret-version=projects/myproj/secrets/\
        whsecret/versions/1

    To create a GitLab connection for a private GitLab server. provide the
    service-directory-service and ssl-ca-file as well:

        $ gcloud builds connections create gitlab my-gle-conn \
            --host-uri=https://my.private-gle-server.net --project=myproj \
            --region=us-central1 \
            --service-directory-service=projects/myproj/namespaces/x/\
        services/mysds --ssl-ca-file=mycertificate.crt \
            --authorizer-token-secret-version=projects/myproj/secrets/\
        api-pat/versions/1 \
            --read-authorizer-token-secret-version=projects/myproj/secrets/\
        read-pat/versions/1 \
            --webhook-secret-secret-version=projects/myproj/secrets/\
        whsecret/versions/1

POSITIONAL ARGUMENTS
     Connection resource - Connection to create. The arguments in this group
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

REQUIRED FLAGS
     --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the api personal access token.

     --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        Secret containing the read_api personal access token.

     --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
        Secret containing the webhook secret string for validating webhook
        events sent by GitLab.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --host-uri=HOST_URI
        URI of the GitLab instance.

     Group of arguments for configuring access through Service Directory.

     --service-directory-service=SERVICE_DIRECTORY_SERVICE
        Service Directory service resource to use for accessing the gitlab.com
        or GitLab Enterprise Server. Necessary only if the server has no public
        access from the internet.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

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

        $ gcloud alpha builds connections create gitlab

        $ gcloud beta builds connections create gitlab
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud builds connections create gitlab my-gitlab-conn \
    --project=myproj \
    --region=us-central1 \
    --read-authorizer-token-secret-version=projects/myproj/secrets/read-pat/versions/1 \
    --authorizer-token-secret-version=projects/myproj/secrets/api-pat/versions/1 \
    --webhook-secret-secret-version=projects/myproj/secrets/whsecret/versions/1

gcloud builds connections create gitlab my-gle-conn \
    --host-uri=https://my.gle-server.net \
    --project=myproj \
    --region=us-central1 \
    --authorizer-token-secret-version=projects/myproj/secrets/api-pat/versions/1 \
    --read-authorizer-token-secret-version=projects/myproj/secrets/read-pat/versions/1 \
    --webhook-secret-secret-version=projects/myproj/secrets/whsecret/versions/1

gcloud builds connections create gitlab my-gle-conn \
    --host-uri=https://my.private-gle-server.net \
    --project=myproj \
    --region=us-central1 \
    --service-directory-service=projects/myproj/locations/us-central1/namespaces/x/services/mysds \
    --ssl-ca-file=mycertificate.crt \
    --authorizer-token-secret-version=projects/myproj/secrets/api-pat/versions/1 \
    --read-authorizer-token-secret-version=projects/myproj/secrets/read-pat/versions/1 \
    --webhook-secret-secret-version=projects/myproj/secrets/whsecret/versions/1
```

### gcloud beta builds connections create bitbucket-cloud

```text
NAME
    gcloud beta builds connections create bitbucket-cloud - create a Cloud
        Build Connection for Bitbucket Cloud

SYNOPSIS
    gcloud beta builds connections create bitbucket-cloud
        (CONNECTION : --region=REGION)
        --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
        --workspace=WORKSPACE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds connections create bitbucket-data-center

```text
NAME
    gcloud beta builds connections create bitbucket-data-center - create a
        Cloud Build Connection for Bitbucket Data Center

SYNOPSIS
    gcloud beta builds connections create bitbucket-data-center
        (CONNECTION : --region=REGION)
        --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION [--async]
        [--host-uri=HOST_URI]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE
          : --ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds connections create github

```text
NAME
    gcloud beta builds connections create github - create a Cloud Build
        Connection of type GitHub

SYNOPSIS
    gcloud beta builds connections create github (CONNECTION : --region=REGION)
        [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
          : --app-installation-id=APP_INSTALLATION_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds connections create github-enterprise

```text
NAME
    gcloud beta builds connections create github-enterprise - create a Cloud
        Build Connection of type GitHub Enterprise

SYNOPSIS
    gcloud beta builds connections create github-enterprise
        (CONNECTION : --region=REGION) --host-uri=HOST_URI [--async]
        [--app-id=APP_ID --app-slug=APP_SLUG
          --private-key-secret-version=PRIVATE_KEY_SECRET_VERSION
          --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
          : --app-installation-id=APP_INSTALLATION_ID]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE
          : --ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta builds connections create gitlab

```text
NAME
    gcloud beta builds connections create gitlab - create a Cloud Build
        Connection for gitlab.com or GitLab Enterprise

SYNOPSIS
    gcloud beta builds connections create gitlab (CONNECTION : --region=REGION)
        --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION [--async]
        [--host-uri=HOST_URI]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE
          : --ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections create bitbucket-cloud

```text
NAME
    gcloud alpha builds connections create bitbucket-cloud - create a Cloud
        Build Connection for Bitbucket Cloud

SYNOPSIS
    gcloud alpha builds connections create bitbucket-cloud
        (CONNECTION : --region=REGION)
        --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
        --workspace=WORKSPACE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections create bitbucket-data-center

```text
NAME
    gcloud alpha builds connections create bitbucket-data-center - create a
        Cloud Build Connection for Bitbucket Data Center

SYNOPSIS
    gcloud alpha builds connections create bitbucket-data-center
        (CONNECTION : --region=REGION)
        --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION [--async]
        [--host-uri=HOST_URI]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE
          : --ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections create github

```text
NAME
    gcloud alpha builds connections create github - create a Cloud Build
        Connection of type GitHub

SYNOPSIS
    gcloud alpha builds connections create github
        (CONNECTION : --region=REGION) [--async]
        [--authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
          : --app-installation-id=APP_INSTALLATION_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections create github-enterprise

```text
NAME
    gcloud alpha builds connections create github-enterprise - create a Cloud
        Build Connection of type GitHub Enterprise

SYNOPSIS
    gcloud alpha builds connections create github-enterprise
        (CONNECTION : --region=REGION) --host-uri=HOST_URI [--async]
        [--app-id=APP_ID --app-slug=APP_SLUG
          --private-key-secret-version=PRIVATE_KEY_SECRET_VERSION
          --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
          : --app-installation-id=APP_INSTALLATION_ID]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE
          : --ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds connections create gitlab

```text
NAME
    gcloud alpha builds connections create gitlab - create a Cloud Build
        Connection for gitlab.com or GitLab Enterprise

SYNOPSIS
    gcloud alpha builds connections create gitlab
        (CONNECTION : --region=REGION)
        --authorizer-token-secret-version=AUTHORIZER_TOKEN_SECRET_VERSION
        --read-authorizer-token-secret-version=READ_AUTHORIZER_TOKEN_SECRET_VERSION
        --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION [--async]
        [--host-uri=HOST_URI]
        [--service-directory-service=SERVICE_DIRECTORY_SERVICE
          : --ssl-ca-file=SSL_CA_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `--service-directory-service` value `projects/myproj/namespaces/x/services/mysds` lacks the `locations/LOCATION/` segment of a Service Directory service name (`projects/*/locations/*/namespaces/*/services/*` in the Service Directory API, servicedirectory.v1 `projects.locations.namespaces.services`; see the `gcp-networking` skill); the runnable form inserts `locations/us-central1/`, the `--region` of the same example.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the complete-connection example omits `--host-uri`, which the SYNOPSIS requires (gcloud 593.0.0: "argument --host-uri: Must be specified"); the runnable form adds `--host-uri=https://my.ghe-server.net`, the host of the first example on this page.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the complete-connection example passes `--app-slug` twice (`gcb-app` and `myapp`); gcloud keeps the last value, so the runnable form drops the first one.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/connections/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
