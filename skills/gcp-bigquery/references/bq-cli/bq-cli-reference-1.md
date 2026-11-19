---
source: https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference
---

# bq command-line tool reference (part 1 of 3)

## Signature / Usage

This document describes the syntax, commands, flags, and arguments for `bq`,
the Python-based command-line tool for BigQuery.

For a tutorial on using the bq command-line tool, see
[Load and query data with the bq tool](https://docs.cloud.google.com/bigquery/docs/quickstarts/load-data-bq).

### Ways to use the bq command-line tool

You can enter bq command-line tool commands in [Cloud Shell](https://docs.cloud.google.com/shell/docs/how-cloud-shell-works)
either from the Google Cloud console or from a local installation of the
[Google Cloud CLI](https://docs.cloud.google.com/sdk/docs).

- To use the bq command-line tool from the Google Cloud console, activate
  Cloud Shell:

  [Activate Cloud Shell](https://console.cloud.google.com/bigquery?cloudshell=true)
- To use the bq command-line tool locally, [install and configure the
  gcloud CLI](https://docs.cloud.google.com/sdk/docs/install). To keep your installation
  current, see [Manage an installation](https://docs.cloud.google.com/sdk/docs/install#manage_an_installation)
  in the gcloud CLI documentation.

### Command format

The bq command-line tool uses the following format:

`bq COMMAND [FLAGS] [ARGUMENTS]`

Some flags can be used with multiple bq command-line tool commands; these flags are
described in the [Global flags](#global-flags) section.

Other flags are command-specific; they can only be used with a particular
bq command-line tool command. The command-specific flags are described in the command
sections.

### Specifying values for flags

When you specify a value for a flag, the equals sign (`=`) is optional. For
example, the following two commands are equivalent:

```text
bq ls --format prettyjson myDataset
bq ls --format=prettyjson myDataset
```

<br />

This document uses the equals sign for clarity.

Some bq command-line tool flags are *boolean* ; you can set the flag's value to either
`true` or `false`.
The bq command-line tool accepts the following formats for setting boolean flags.

| Value | Format | Example |
|---|---|---|
| `true` | `--FLAGNAME=true` | `--debug_mode=true` |
| `true` | `--FLAGNAME` | `--debug_mode` |
| `false` | `--FLAGNAME=false` | `--debug_mode=false` |
| `false` | `--noFLAGNAME` | `--nodebug_mode` |

This document uses the `--FLAGNAME=VALUE`
format for boolean flags.

All boolean flags are optional; if a boolean flag is not present, then
BigQuery uses the flag's default value.

### Specifying BigQuery resources in arguments

The format for specifying a resource depends on the context; in some cases the
separator between the project and dataset is a colon (`:`) and in some cases, it
is a period (`.`). The following table
describes how to specify a BigQuery table in different contexts.

| Context | Format | Example |
|---|---|---|
| bq command-line tool | `PROJECT:DATASET.TABLE` | `myProject:myDataset.myTable` |
| GoogleSQL query | `PROJECT.DATASET.TABLE` | `myProject.myDataset.myTable` |
| Legacy SQL query | `PROJECT:DATASET.TABLE` | `myProject:myDataset.myTable` |

If you don't specify a project, then BigQuery uses the current
project. For example, if the current project is `myProject`, then
BigQuery interprets `myDataset.myTable` as
`myProject:myDataset.myTable` (or `myProject.myDataset.myTable`).

Some resource identifiers must be quoted using back ticks (`` ` ``).
If your resource identifier begins with a letter or underscore character, and
contains only characters that are letters, numbers, and underscores, then you
don't need to quote it. However, if your resource identifier
contains other types of
characters, or reserved keywords, you need to surround the identifier (or the
part of the identifier with the special characters or reserved keywords) with
back ticks. For more information, see
[Identifiers](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/lexical#identifiers).

### How to run commands

Place any [global flags](#global-flags) before the `bq` command, and then
include command-specific flags. You can include multiple global or
command-specific flags. For example:

```text
bq --location=us mk --reservation --project_id=project reservation_name
```

You can specify command arguments in the following ways:

- `--FLAG ARGUMENT` (as shown in the previous examples)
- `--FLAG=ARGUMENT`
- `--FLAG='ARGUMENT'`
- `--FLAG="ARGUMENT"`
- `--FLAG 'ARGUMENT'`
- `--FLAG "ARGUMENT"`

Replace the following:

- `FLAG`: a global or command-specific flag
- `ARGUMENT`: the flag's argument

Some commands require the use of quotes around arguments. If quotes are
required, either single or double quotes are acceptable. Arguments that
require quotes are typically values that contain spaces, commas, or other
special characters. If your argument contains a BigQuery
resource, be sure to follow the [rules for specifying resource names](#specifying-bigquery-resources-in-arguments)
in commands.

> [!NOTE]
> **Note:** The following examples use the `--nouse_legacy_sql` flag. This flag is required to run a GoogleSQL query from the command line unless you [set a default value in `.bigqueryrc`](#set-default-values-for-command-line-flags) or [set the configuration setting](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_project_set_options_statement) `default_sql_dialect_option` to 'default_legacy_sql' at the project or organization level.

This example shows how to run a GoogleSQL query on the command line:

```bash
bq query --nouse_legacy_sql \
'SELECT
   COUNT(*)
 FROM
   `bigquery-public-data`.samples.shakespeare'
```

Flags with boolean values can be specified without an argument. If you specify
`true` or `false`, then you must use the format
`FLAG=ARGUMENT`.

For example, this command specifies false for the boolean flag
`--use_legacy_sql` by placing `no` at the front of the flag:

```bash
bq query --nouse_legacy_sql \
'SELECT
   COUNT(*)
 FROM
   `bigquery-public-data`.samples.shakespeare'
```

Alternatively, to specify `false` as the flag's argument, you can enter the
following:

```bash
bq query --use_legacy_sql=false \
'SELECT
   COUNT(*)
 FROM
   `bigquery-public-data`.samples.shakespeare'
```

#### Run commands in a script

You can run the bq command-line tool in a script, as you would run a
[Google Cloud CLI command](https://docs.cloud.google.com/sdk/docs/scripting-gcloud). The following is an
example of `gcloud` and `bq` commands in a bash script:

```sh
#!/bin/bash
gcloud config set project myProject
bq query --use_legacy_sql=false --destination_table=myDataset.myTable \
'SELECT
   word,
   SUM(word_count) AS count
 FROM
   `bigquery-public-data`.samples.shakespeare
 WHERE
   word LIKE "%raisin%"
 GROUP BY
   word'
```

#### Use a service account

You can use a [service account](https://docs.cloud.google.com/bigquery/docs/use-service-accounts) to make
authorized API calls or run query jobs on your behalf. To use a service account
in the bq command-line tool, authorize access to Google Cloud from the service account.
For more information, see
[gcloud auth activate-service-account](https://docs.cloud.google.com/sdk/gcloud/reference/auth/activate-service-account).

To start running `bq` commands using
[service account impersonation](https://docs.cloud.google.com/iam/docs/impersonating-service-accounts),
run the following command:

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCOUNT_NAME
```

Replace `SERVICE_ACCOUNT_NAME` with your service account
name.

`bq` commands that you run now use the service account credentials.

To stop running `bq` commands from a service account, run the following command:

```bash
gcloud config unset auth/impersonate_service_account
```

### Set default values for command-line flags

You can set default values for command-line flags by including them in the
bq command-line tool's configuration file, `.bigqueryrc`. Before you configure your
default options, you must first create a `.bigqueryrc` file. You can use your
preferred text editor to create the file. After you create the `.bigqueryrc`
file, you can specify the path to the file using the `--bigqueryrc` global flag.

If the `--bigqueryrc` flag is not specified, then the `BIGQUERYRC` environment
variable is used. If that is not specified, then the path `~/.bigqueryrc` is
used. The default path is `$HOME/.bigqueryrc`.

> [!NOTE]
> **Note:** Creating a `.bigqueryrc` file using the `bq init` command is not recommended.

#### How to add flags to `.bigqueryrc`

To add default values for command-line flags to `.bigqueryrc`:

- Place [global flags](#global-flags) at the top of the file without a header.
- For command-specific flags, enter the command name (in brackets) and add the command-specific flags (one per line) after the command name.

For example:

```bash
--apilog=stdout
--format=prettyjson
--location=US

[query]
--use_legacy_sql=false
--max_rows=100
--maximum_bytes_billed=10000000

[load]
--destination_kms_key=projects/myproject/locations/mylocation/keyRings/myRing/cryptoKeys/myKey
```

The preceding example sets default values for the following flags:

- The global flag `--apilog` is set to `stdout` to print debugging output to the Google Cloud console.
- The global flag `--format` is set to `prettyjson` to display command output in a human-readable JSON format.
- The global flag `--location` is set to the `US` multi-region location.
- The `query` command-specific flag `--use_legacy_sql` is set to `false` to make
  GoogleSQL the default query syntax.

  > [!NOTE]
  > **Note:** You cannot use `--nouse_legacy_sql` in `.bigqueryrc`.

- The `query` command-specific flag `--max_rows` is set to `100` to control the
  number of rows in the query output.

- The `query` command-specific flag `--maximum_bytes_billed` is set to
  10,000,000 bytes (10 MB) to fail queries that read more than 10 MB of
  data.

- The `load` command-specific flag
  [`--destination_kms_key`](https://docs.cloud.google.com/bigquery/docs/customer-managed-encryption) is set
  to `projects/myproject/locations/mylocation/keyRings/myRing/cryptoKeys/myKey`.

### CLI help

You can get help with the bq command-line tool by running the following commands:

| Description | Help command format | Example |
|---|---|---|
| Installed version | `bq version` | `bq version` |
| List of all commands with examples | `bq help` | `bq help` |
| Description of global flags | `bq --help` | `bq --help` |
| Description of a particular command | `bq help COMMAND` | `bq help mk` |

### Troubleshooting CLI commands

To log requests sent and received:

:   Add the `--apilog=PATH_TO_FILE` flag to save a log of
operations to a local file. Replace `PATH_TO_FILE` with
the location where you want to save the log. The bq command-line tool works by making
standard REST-based API calls, which can be useful to see when troubleshooting.
It's also useful to attach this log when you're reporting issues to
Cloud Customer Care.

:   Using `-` or `stdout` instead of a path prints the log to the Google Cloud console.
Setting `--apilog` to `stderr` outputs to the standard error file. To log more
requests, use the `--httplib2_debuglevel=LOG_LEVEL` flag.
A higher `LOG_LEVEL` logs more information about the HTTP
requests.

To troubleshoot errors:

:   Enter the `--format=prettyjson` flag when you get a
[job's status](https://docs.cloud.google.com/bigquery/docs/managing-jobs#view-job) or when you view
detailed information about resources such as tables and datasets. Using this
flag outputs the response in JSON format, including the `reason` property. You
can use the `reason` property to find
[error messages](https://docs.cloud.google.com/bigquery/troubleshooting-errors).

:   For more information about errors when you run a command, use the
`--debug_mode` flag.

### Global flags

You can use the following flags with any `bq` command, where applicable:

**`--alpha=FEATURE_NAME`**
:   Specifies an alpha feature to enable.

**`--api=ENDPOINT`**
:   Specifies the API endpoint to call. The default value is
`https://bigquery.googleapis.com`.

**`--api_version=VERSION`**
:   Specifies the API version to use. The default is `v2`.

**`--apilog=FILE`**

:   Logs all API requests and responses to the file specified by
`FILE`. Possible values are the following:

- the path to a file - logs to the specified file
- `stdout` - logs to standard output
- `stderr` - logs to standard error
- `false` - API requests and responses are not logged (default)

**`--bigquery_discovery_api_key=API_KEY`**

:   Specifies an API key to use for discovery document requests.

**`--bigqueryrc=PATH`**

:   Specifies the path to the bq command-line tool configuration file. If you don't specify
the `--bigqueryrc` flag, then the command uses the `BIGQUERYRC` environment
variable.
If the environment variable is not set, then `$HOME/.bigqueryrc` is used.
If that file does not exist, then `~/.bigqueryrc` is used. For more
information, see
[Setting default values for command-line flags](https://docs.cloud.google.com/bigquery/docs/bq-command-line-tool#setting_default_values_for_command-line_flags).

**`--ca_certificates_file=PATH`**

:   Specifies the location of your
[Certificate Authority Service](https://docs.cloud.google.com/certificate-authority-service)
(CA) file.

**`--dataset_id=DATASET_ID`**

:   Specifies the default dataset to use with the command. This flag is ignored
when not applicable. You can specify the `DATASET_ID`
argument using the format
`PROJECT:DATASET` or
`DATASET`.
If the `PROJECT` part is missing, then the default
project
is used. You can override the default project setting by specifying the
[`--project_id` flag](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#project_id_flag).

**`--debug_mode={true|false}`**

:   If set to `true`, shows tracebacks on Python exceptions. The default value is
`false`.

**`--disable_ssl_validation={true|false}`**

:   If set to `true`, disables HTTPS certificate validation. The
default value is `false`.

**`--discovery_file=PATH`**

:   Specifies the JSON file to read for discovery.

**`--enable_gdrive={true|false}`**

:   If set to `false`, requests a new OAuth token without Google Drive scope.
The default value is `true`; requests a new OAuth token with
Drive scope. To set this flag to `false` when authenticated
using a user account, the `--use_google_auth` flag must be set to `false`.

**`--enable_resumable_uploads={true|false}`**

:   Enables resumable uploads over HTTP for jobs that load data from local files.
The default value is `true`.

**`--fingerprint_job_id={true|false}`**

:   To use a job ID that is derived from a
fingerprint of the job configuration, set to `true`.
This prevents the same job from
running multiple times accidentally. The default value is `false`.

**`--format=FORMAT`**

:   Specifies the format of the command's output. Use one of the following values:

- `pretty`: formatted table output
- `sparse`: simpler table output
- `prettyjson`: easy-to-read JSON format
- `json`: maximally compact JSON
- `csv`: csv format with header

`pretty`, `sparse`, and `prettyjson` are intended to be human-readable.
`json` and `csv` are intended to be used by another program. If `none` is
specified, then
the command produces no output. If the `--format` flag is absent, then an
appropriate output format is chosen based on the command.

**`--headless={true|false}`**

:   To run the `bq` session without user
interaction, set to `true`. For example,
`debug_mode` does not break into the debugger, and the frequency of
informational printing is lowered. The default value is `false`.

**`--httplib2_debuglevel=DEBUG_LEVEL`**

:   Specifies whether to show HTTP debugging information.
If `DEBUG_LEVEL`
is greater than `0`, then the command logs HTTP server requests and responses to
stderr, in addition to
error messages. If `DEBUG_LEVEL` is not \> 0,
or if the `--httplib2_debuglevel` flag is not used, then only
error messages are provided.

For example:

```text
--httplib2_debuglevel=1
```

<br />

> [!NOTE]
> **Note:** Multi-level debugging is not supported for this flag, so you can set `DEBUG_LEVEL` to any positive number.

**`--job_id=JOB_ID`**

:   Specifies a job identifier for a new job.
This flag applies only to
commands that create jobs: `cp`, `extract`, `load`, and `query`. If you don't
use the `--job_id` flag, then the commands generate a unique job identifier.
For more information, see
[Running jobs programmatically](https://docs.cloud.google.com/bigquery/docs/running-jobs).

**`--job_property=KEY:VALUE`**

:   A key-value pair to include in the properties
field of the job configuration. Repeat this flag to specify additional
properties.

**`--jobs_query_use_request_id={true|false}`**

:   If set to `true`, sends a request ID in `jobs.query` requests. The default value is `false`.

**`--jobs_query_use_results_from_response={true|false}`**

:   If set to `true`, uses results from the `jobs.query` response. The default value is `true`.

**`--location=LOCATION`**

:   A string corresponding to a region or multi-region
[location](https://docs.cloud.google.com/bigquery/docs/locations).
The location flag is required for the
[`bq cancel`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_cancel) command
and for the [`bq show`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_show)
command when you use the `--jobs` flag to show information about jobs. The
location flag is optional for the following commands:

- [`query`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_query)
- [`cp`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_cp)
- [`load`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_load)
- [`extract`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_extract)
- [`partition`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_partition)
- [`update`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_update)
- [`wait`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_wait)
- [`mk`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_mk) when you use the `--dataset`, `--reservation`, `--capacity_commitment`, or `--reservation_assignment` flags
- [`ls`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_ls) when you use the `--reservation`, `--capacity_commitment`, or `--reservation_assignment` flags

All other commands ignore the `--location` flag.

> [!NOTE]
> **Note:** The `--location` flag was introduced in bq version 2.0.29. To verify the version of the bq command-line tool, enter `bq version`.

**`--max_rows_per_request=MAX_ROWS`**

:   An integer that specifies the maximum number of rows
to return per read.

**`--mtls={true|false}`**

:   If set to `true`, uses an mTLS client certificate on connections to BigQuery.
The default value is `false`.

**`--project_id=PROJECT`**

:   Specifies the project to use for commands.

**`--proxy_address=PROXY`**

:   Specifies the name or IP address of the proxy host to use for
connecting to Google Cloud.

**`--proxy_password=PASSWORD`**

:   Specifies the password to use when authenticating with the proxy host.

**`--proxy_port=PORT`**

:   Specifies the port number to use to connect to the proxy host.

**`--proxy_username=USERNAME`**

:   Specifies the username to use when authenticating with the proxy
host.

**`--quiet={true|false}` or `-q={true|false}`**

:   To suppress status updates while jobs are
running, set to `true`. The default value is `false`.

**`--quota_project_id=PROJECT_ID`**

:   Specifies the ID of a Google Cloud project to use as the quota project to be used for billing and quota limits.

**`--request_reason=REASON`**

:   Specifies a reason for making a request that is recorded in audit logs.

**`--synchronous_mode={true|false}` or `-sync={true|false}`**

:   To create the job and immediately return, with a successful completion status
as the error code,
set to `false`. If set to `true`, then the command waits for the job to
complete before returning, and returns the job completion status as the error
code. The default value is `true`.

**`--trace=token:TOKEN`**

:   Specifies a tracing token to include in API requests.

**`--universe_domain=DOMAIN`**

:   Specifies the universe domain to use in Trusted Partner Cloud (TPC) domains.

**`--use_gcloud_config={true|false}`**

:   If set to `true`, uses `gcloud` config to override default flag values. The default value is `true`.

**`--use_gcloud_config_cache={true|false}`**

:   If set to `true`, uses a persistent cache for `gcloud` config and credentials. The default value is `false`.

**`--use_google_auth={true|false}`**

:   If set to `true`, enables authentication using Google Auth libraries. The
default value is `true`.

**`--use_lep={true|false}`**

:   If set to `true`, uses a LEP endpoint based on the operation's location. The default value is `false`.

**`--use_regional_endpoints={true|false}`**

:   In [preview](https://cloud.google.com/products/#product-launch-stages). To connect to a regional
endpoint, set the `--use_regional_endpoints` flag to `true` and the
[`--location`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#location_flag) flag to the region you want to connect to. The
default value is `false`.

**`--use_rep={true|false}`**

:   If set to `true`, uses a REP endpoint based on the operation's location. The default value is `false`.

### Deprecated global flags

The following global flag for specifying bq command-line tool flags from a file
is
deprecated. To specify flags from a file, use the
[`--bigqueryrc`](https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference#bigqueryrc_flag) flag.

**`--flagfile=PATH`**

When specified, flag definitions from the supplied file are inserted
into
the bq command-line tool. The default value is `''`. For more information, see
[Setting default values for command-line flags](https://docs.cloud.google.com/bigquery/docs/bq-command-line-tool#setting_default_values_for_command-line_flags).

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; definition-list bodies are un-indented by four spaces so that they are not read as code; the `:` markers of the twin are kept (GitHub Markdown has no definition lists); indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 3 files at section boundaries; this is part 1.

## Related

- [Index of this directory](./README.md)
