---
source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/agents
---

# gcloud transfer agents

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud transfer agents delete

```text
NAME
    gcloud transfer agents delete - delete Transfer Service transfer agents

SYNOPSIS
    gcloud transfer agents delete [--ids=[IDS,...] | --all | --uninstall]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete Transfer Service agents from your machine.

EXAMPLES
    If you plan to delete specific agents, you can list which agents are
    running on your machine by running:

        $ docker container list --all \
            --filter ancestor=gcr.io/cloud-ingest/tsop-agent

    Then run:

        $ gcloud transfer agents delete --ids=id1,id2,...

FLAGS
     At most one of these can be specified:

       --ids=[IDS,...]
          The IDs of the agents you want to delete. Separate multiple agent IDs
          with commas, with no spaces following the commas.

       --all
          Delete all agents running on your machine.

       --uninstall
          Fully uninstall the agent container image in addition to deleting the
          agents. Uninstalling the container image will free up space, but
          you'll need to reinstall it to run agents on this machine in the
          future.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer agents delete
```

### gcloud transfer agents install

```text
NAME
    gcloud transfer agents install - install Transfer Service agents

SYNOPSIS
    gcloud transfer agents install --pool=POOL [--count=COUNT]
        [--creds-file=CREDS_FILE] [--docker-network=NETWORK]
        [--[no-]enable-multipart] [--id-prefix=ID_PREFIX]
        [--logs-directory=LOGS_DIRECTORY; default="/tmp"]
        [--memlock-limit=MEMLOCK_LIMIT; default=64000000]
        [--mount-directories=[MOUNT-DIRECTORIES,...]] [--proxy=PROXY]
        [--hdfs-namenode-uri=HDFS_NAMENODE_URI --hdfs-username=HDFS_USERNAME
          --hdfs-data-transfer-protection=HDFS_DATA_TRANSFER_PROTECTION]
        [--kerberos-config-file=KERBEROS_CONFIG_FILE
          --kerberos-keytab-file=KERBEROS_KEYTAB_FILE
          --kerberos-user-principal=KERBEROS_USER_PRINCIPAL
          --kerberos-service-principal=KERBEROS_SERVICE_PRINCIPAL]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Install Transfer Service agents to enable you to transfer data to or from
    POSIX filesystems, such as on-premises filesystems. Agents are installed
    locally on your machine and run inside Docker containers.

EXAMPLES
    To create an agent pool for your agent, see the gcloud transfer agent-pools
    create command.

    To install an agent that authenticates with your user account credentials
    and has default agent parameters, run:

        $ gcloud transfer agents install --pool=AGENT_POOL

    You will be prompted to run a command to generate a credentials file if one
    does not already exist.

    To install an agent that authenticates with a service account with
    credentials stored at '/example/path.json', run:

        $ gcloud transfer agents install --creds-file=/example/path.json \
            --pool=AGENT_POOL

    To install an agent using service account impersonation, run:

        $ gcloud transfer agents install --creds-file=/example/path.json \
            --pool=CUSTOM_AGENT_POOL \
            --impersonate-service-account=impersonated-account@project-id.ia\
        m.gserviceaccount.com

    Note : The --impersonate-service-account flag only applies to the API calls
    made by gcloud during the agent installation and authorization process. The
    impersonated credentials are not passed to the transfer agent's runtime
    environment. The agent itself does not support impersonation and will use
    the credentials provided via the --creds-file flag or the default gcloud
    authenticated account for all of its operations. To grant the agent
    permissions, you must provide a service account key with the required
    direct roles (e.g., Storage Transfer Agent, Storage Object User)

REQUIRED FLAGS
     --pool=POOL
        The agent pool to associate with the newly installed agent. When
        creating transfer jobs, the agent pool parameter will determine which
        agents are activated.

FLAGS
     --count=COUNT
        Specify the number of agents to install on your current machine. System
        requirements: 8 GB of memory and 4 CPUs per agent.

        Note: If the 'id-prefix' flag is specified, Transfer Service increments
        a number value after each prefix. Example: prefix1, prefix2, etc.

     --creds-file=CREDS_FILE
        Specify the path to the service account's credentials file.

        No input required if authenticating with your user account credentials,
        which Transfer Service will look for in your system.

        Note that the credentials location will be mounted to the agent
        container.

     --docker-network=NETWORK
        Specify the network to connect the container to. This flag maps
        directly to the --network flag in the underlying 'docker run' command.

        If binding directly to the host's network is an option, then setting
        this value to 'host' can dramatically improve transfer performance.

     --[no-]enable-multipart
        Split up files and transfer the resulting chunks in parallel before
        merging them at the destination. Can be used make transfers of large
        files faster as long as the network and disk speed are not limiting
        factors. If unset, agent decides when to use the feature. Use
        --enable-multipart to enable and --no-enable-multipart to disable.

     --id-prefix=ID_PREFIX
        An optional prefix to add to the agent ID to help identify the agent.

     --logs-directory=LOGS_DIRECTORY; default="/tmp"
        Specify the absolute path to the directory you want to store transfer
        logs in. If not specified, gcloud transfer will mount your /tmp
        directory for logs.

     --memlock-limit=MEMLOCK_LIMIT; default=64000000
        Set the agent container's memlock limit. A value of 64000000 (default)
        or higher is required to ensure that agent versions 1.14 or later have
        enough locked memory to be able to start.

     --mount-directories=[MOUNT-DIRECTORIES,...]
        If you want to grant agents access to specific parts of your filesystem
        instead of the entire filesystem, specify which directory paths to
        mount to the agent container. Multiple paths must be separated by
        commas with no spaces (e.g.,
        --mount-directories=/system/path/to/dir1,/path/to/dir2). When mounting
        specific directories, gcloud transfer will also mount a directory for
        logs (either /tmp or what you've specified for --logs-directory) and
        your Google credentials file for agent authentication.

        It is strongly recommended that you use this flag. If this flag isn't
        specified, gcloud transfer will mount your entire filesystem to the
        agent container and give the agent root access.

     --proxy=PROXY
        Specify the HTTP URL and port of a proxy server if you want to use a
        forward proxy. For example, to use the URL 'example.com' and port
        '8080' specify 'http://www.example.com:8080/'

        Ensure that you specify the HTTP URL and not an HTTPS URL to avoid
        double-wrapping requests in TLS encryption. Double-wrapped requests
        prevent the proxy server from sending valid outbound requests.

HDFS FLAGS
     --hdfs-namenode-uri=HDFS_NAMENODE_URI
        A URI representing an HDFS cluster including a schema, namenode, and
        port. Examples: "rpc://my-namenode:8020", "http://my-namenode:9870".

        Use "http" or "https" for WebHDFS. If no schema is provided, the CLI
        assumes native "rpc". If no port is provided, the default is 8020 for
        RPC, 9870 for HTTP, and 9871 for HTTPS. For example, the input
        "my-namenode" becomes "rpc://my-namenode:8020".

     --hdfs-username=HDFS_USERNAME
        Username for connecting to an HDFS cluster with simple auth.

     --hdfs-data-transfer-protection=HDFS_DATA_TRANSFER_PROTECTION
        Client-side quality of protection setting for Kerberized clusters.
        Client-side QOP value cannot be more restrictive than the server-side
        QOP value. HDFS_DATA_TRANSFER_PROTECTION must be one of:
        authentication, integrity, privacy.

Kerberos FLAGS
     --kerberos-config-file=KERBEROS_CONFIG_FILE
        Path to Kerberos config file.

     --kerberos-keytab-file=KERBEROS_KEYTAB_FILE
        Path to a Keytab file containing the user principal specified with the
        --kerberos-user-principal flag.

     --kerberos-user-principal=KERBEROS_USER_PRINCIPAL
        Kerberos user principal to use when connecting to an HDFS cluster via
        Kerberos auth.

     --kerberos-service-principal=KERBEROS_SERVICE_PRINCIPAL
        Kerberos service principal to use, of the form "<primary>/<instance>".
        Realm is mapped from your Kerberos config. Any supplied realm is
        ignored. If not passed in, it will default to "hdfs/<namenode_fqdn>"
        (fqdn = fully qualified domain name).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha transfer agents install
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud transfer agents install \
    --creds-file=/example/path.json \
    --pool=CUSTOM_AGENT_POOL \
    --impersonate-service-account=impersonated-account@project-id.iam.gserviceaccount.com
```

### gcloud alpha transfer agents delete

```text
NAME
    gcloud alpha transfer agents delete - delete Transfer Service transfer
        agents

SYNOPSIS
    gcloud alpha transfer agents delete
        [--container-manager=CONTAINER_MANAGER; default="docker"]
        [--ids=[IDS,...] | --all | --uninstall] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer agents install

```text
NAME
    gcloud alpha transfer agents install - install Transfer Service agents

SYNOPSIS
    gcloud alpha transfer agents install --pool=POOL
        [--container-manager=CONTAINER_MANAGER; default="docker"]
        [--count=COUNT] [--creds-file=CREDS_FILE] [--[no-]enable-multipart]
        [--gcs-api-endpoint=GCS_API_ENDPOINT] [--id-prefix=ID_PREFIX]
        [--logs-directory=LOGS_DIRECTORY; default="/tmp"]
        [--max-concurrent-small-file-uploads=MAX_CONCURRENT_SMALL_FILE_UPLOADS]
        [--memlock-limit=MEMLOCK_LIMIT; default=64000000]
        [--mount-directories=[MOUNT-DIRECTORIES,...]] [--network=NETWORK]
        [--proxy=PROXY]
        [--hdfs-namenode-uri=HDFS_NAMENODE_URI --hdfs-username=HDFS_USERNAME
          --hdfs-data-transfer-protection=HDFS_DATA_TRANSFER_PROTECTION]
        [--kerberos-config-file=KERBEROS_CONFIG_FILE
          --kerberos-keytab-file=KERBEROS_KEYTAB_FILE
          --kerberos-user-principal=KERBEROS_USER_PRINCIPAL
          --kerberos-service-principal=KERBEROS_SERVICE_PRINCIPAL]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/transfer/agents (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
