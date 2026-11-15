---
source: https://docs.cloud.google.com/sdk/gcloud/reference/services/api-keys
---

# gcloud services api-keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud services api-keys create

```text
NAME
    gcloud services api-keys create - create an API key

SYNOPSIS
    gcloud services api-keys create [--annotations=[KEY=VALUE,...]] [--async]
        [--display-name=DISPLAY_NAME] [--key-id=KEY_ID]
        [--service-account=SERVICE_ACCOUNT]
        [--api-target=service=SERVICE[,methods=METHOD:...],[...]
          --allowed-application=[sha1_fingerprint=SHA1_FINGERPRINT,
          package_name=PACKAGE_NAME,...]
          | --allowed-bundle-ids=[ALLOWED_BUNDLE_IDS,...]
          | --allowed-ips=[ALLOWED_IPS,...]
          | --allowed-referrers=[ALLOWED_REFERRERS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create an API key.

EXAMPLES
    To create a key with display name, allowed IPs, and allowed API targets
    specified:

        $ gcloud services api-keys create --display-name="test name" \
            --allowed-ips=2620:15c:2c4:203:2776:1f90:6b3b:217,104.133.8.78 \
            --api-target=service=bar.googleapis.com

    To create a key with annotations and allowed API targets:

        $ gcloud services api-keys create --annotations=foo=bar,abc=def \
             --api-target=service=bar.googleapis.com

    To create a key with user-specified key ID and allowed API targets:

        $ gcloud services api-keys create --key-id="my-key-id" \
            --api-target=service=bar.googleapis.com

    To create a key with allowed referrers restriction and allowed API targets:

        $ gcloud services api-keys create \
            --allowed-referrers="https://www.example.com/*,http://sub.exampl\
        e.com/*" --api-target=service=bar.googleapis.com

    To create a key with allowed IOS app bundle IDs and allowed API targets:

        $ gcloud services api-keys create --allowed-bundle-ids=my.app \
            --api-target=service=bar.googleapis.com

    To create a key with allowed Android application and allowed API targets:

        $ gcloud services api-keys create \
            --allowed-application=sha1_fingerprint=DA:39:A3:EE:5E:6B:4B:0D:3\
        2:55:BF:EF:95:60:18:90:AF:D8:07:09,package_name=bar.foo \
            --allowed-application=sha1_fingerprint=DA39A3EE5E6B4B0D3255BFEF9\
        5601890AFD80709,package_name=foo.bar \
            --api-target=service=bar.googleapis.com

    To create a key with allowed API targets (service name only):

        $ gcloud services api-keys create \
            --api-target=service=bar.googleapis.com \
            --api-target=service=foo.googleapis.com

    To create a key with service account and allowed API targets:

        $ gcloud services api-keys create \
            --service-account=my-service-account \
            --api-target=service=bar.googleapis.com

    To create a key with allowed API targets (service and methods are
    specified):

        $ gcloud services api-keys create --flags-file=my-flags.yaml

    The content of 'my-flags.yaml' is as follows:

        - --api-target:
            service: "foo.googleapis.com"
        - --api-target:
            service: "bar.googleapis.com"
            methods:
              - "foomethod"
              - "barmethod"

FLAGS
     --annotations=[KEY=VALUE,...]
        Annotations are key resource. Specify annotations as a key-value
        dictionary for small amounts of arbitrary client data.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        Display name of the key to create.

     --key-id=KEY_ID
        User-specified ID of the key to create.

     --service-account=SERVICE_ACCOUNT
        The email of the service account the key is bound to. If this field is
        specified, the key is a service account bound key and auth enabled.

     --api-target=service=SERVICE[,methods=METHOD:...],[...]
        Repeatable. Specify service and optionally one or multiple specific
        methods. Both fields are case insensitive. Methods can be specified as
        a colon-separated list (e.g.,
        --api-target="service=foo.service.com,methods=method1:method2"), or
        using --flags-file (see $ gcloud topic flags-file for details).

     At most one of these can be specified:

       --allowed-application=[sha1_fingerprint=SHA1_FINGERPRINT,package_name=PACKAGE_NAME,...]
          Repeatable. Specify multiple allowed applications. The accepted keys
          are sha1_fingerprint and package_name. sha1_fingerprint accepts both
          a 20-byte colon-delimited hex string (e.g.
          DA:39:A3:EE:5E:6B:4B:0D:32:55:BF:EF:95:60:18:90:AF:D8:07:09) and a
          40-character non-delimited hex string (e.g.
          DA39A3EE5E6B4B0D3255BFEF95601890AFD80709).

       --allowed-bundle-ids=[ALLOWED_BUNDLE_IDS,...]
          iOS app's bundle ids that are allowed to use the key.

       --allowed-ips=[ALLOWED_IPS,...]
          A list of the caller IP addresses that are allowed to make API calls
          with this key.

       --allowed-referrers=[ALLOWED_REFERRERS,...]
          A list of regular expressions for the referrer URLs that are allowed
          to make API calls with this key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services api-keys create

        $ gcloud beta services api-keys create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud services api-keys create \
    --allowed-referrers="https://www.example.com/*,http://sub.example.com/*" \
    --api-target=service=bar.googleapis.com

gcloud services api-keys create \
    --allowed-application=sha1_fingerprint=DA:39:A3:EE:5E:6B:4B:0D:32:55:BF:EF:95:60:18:90:AF:D8:07:09,package_name=bar.foo \
    --allowed-application=sha1_fingerprint=DA39A3EE5E6B4B0D3255BFEF95601890AFD80709,package_name=foo.bar \
    --api-target=service=bar.googleapis.com
```

### gcloud services api-keys delete

```text
NAME
    gcloud services api-keys delete - delete an API key

SYNOPSIS
    gcloud services api-keys delete (KEY : --location=LOCATION) [--async]
        [--[no-]check-existing-usage] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an API key.

EXAMPLES
    Delete an API Key :

        $ gcloud services api-keys delete \
            projects/myproject/locations/global/keys/1234

        $ gcloud services api-keys delete 1234

POSITIONAL ARGUMENTS
     Key resource - The name of the key to delete. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument key on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEY
          ID of the key or fully qualified identifier for the key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the key.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + location will default to global.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --[no-]check-existing-usage
        If true, existing usage will be checked before the key is deleted. If
        the key has traffic in the last 7 days that is incompatible with the
        requested change, the request fails with an error. Defaults to true.
        Set to false (--no-check-existing-usage) to skip the check. Use
        --check-existing-usage to enable and --no-check-existing-usage to
        disable.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services api-keys delete

        $ gcloud beta services api-keys delete
```

### gcloud services api-keys describe

```text
NAME
    gcloud services api-keys describe - describe an API key's metadata

SYNOPSIS
    gcloud services api-keys describe (KEY : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an API key's metadata.

EXAMPLES
    To describe an API key using Key:

        $ gcloud services api-keys describe 1234 OR
        $ gcloud services api-keys describe \
            projects/myproject/locations/global/keys/1234

    To describe an API key with key and project:

        $ gcloud services api-keys describe 1234 --project=myproject

    To describe an API key with key, project, and location:

        $ gcloud services api-keys describe 1234 --project=myproject \
          --location=global

POSITIONAL ARGUMENTS
     Key resource - The name of the key to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument key on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEY
          ID of the key or fully qualified identifier for the key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the key.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + location will default to global.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services api-keys describe

        $ gcloud beta services api-keys describe
```

### gcloud services api-keys get-key-string

```text
NAME
    gcloud services api-keys get-key-string - get the key string of an API key

SYNOPSIS
    gcloud services api-keys get-key-string (KEY : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the key string of an API key

EXAMPLES
    To get the key string of API key 1234, run:

        $ gcloud services api-keys get-key-string 1234

    To get the key string of API key 1234 in project myproject using the fully
    qualified API key name, run:

        $ gcloud services api-keys get-key-string \
             projects/myproject/locations/global/keys/1234

POSITIONAL ARGUMENTS
     Key resource - The name of the key to retrieve key string. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument key on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEY
          ID of the key or fully qualified identifier for the key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the key.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + location will default to global.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services api-keys get-key-string

        $ gcloud beta services api-keys get-key-string
```

### gcloud services api-keys list

```text
NAME
    gcloud services api-keys list - lists API keys

SYNOPSIS
    gcloud services api-keys list [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists the API keys of a given project.

EXAMPLES
    List keys of a given project:

        $ gcloud services api-keys list

    List keys of a given project, including keys that were soft-deleted in the
    past 30 days.:

        $ gcloud services api-keys list --show-deleted --project=my_project

FLAGS
     --show-deleted
        Show soft-deleted keys by specifying this flag.

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

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services api-keys list

        $ gcloud beta services api-keys list
```

### gcloud services api-keys lookup

```text
NAME
    gcloud services api-keys lookup - look up resource name of a key string

SYNOPSIS
    gcloud services api-keys lookup KEY_STRING [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Look up resource name of a key string.

EXAMPLES
    Look up resource name of a key string named my-key-string:

        $ gcloud services api-keys lookup my-key-string

POSITIONAL ARGUMENTS
     KEY_STRING
        Key string of the key

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services api-keys lookup

        $ gcloud beta services api-keys lookup
```

### gcloud services api-keys undelete

```text
NAME
    gcloud services api-keys undelete - undelete an API key

SYNOPSIS
    gcloud services api-keys undelete
        ([KEY : --location=LOCATION] --key-string=KEY_STRING) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    API Keys that are deleted will be retained in the system for 30 days. If a
    key is still within this retention window, it can be undeleted with this
    command.

EXAMPLES
    UnDelete an API Key (Key or key-string should be specified):

    To undelete with key 1234, run:

        $ gcloud services api-keys undelete 1234

    To undelete with 1234 in project myproject using the fully qualified API
    key name, run:

        $ gcloud services api-keys undelete \
          projects/myproject/locations/global/keys/1234

    To undelete using a Key-string, run:

        $ gcloud services api-keys undelete --key-string='my-key-string'

POSITIONAL ARGUMENTS
     Exactly one of these must be specified:

         Key resource - The name of the key to undelete. The arguments in this
         group can be used to specify the attributes of this resource. (NOTE)
         Some attributes are not given arguments in this group but can be set
         in other ways.

         To set the project attribute:
         + provide the argument key on the command line with a fully
           specified name;
         + provide the argument --project on the command line;
         + set the property core/project.

         KEY
            ID of the key or fully qualified identifier for the key.

            To set the key attribute:
         + provide the argument key on the command line.

       This positional argument must be specified if any of the other arguments
       in this group are specified.

         --location=LOCATION
            Location of the key.

            To set the location attribute:
         + provide the argument key on the command line with a fully
           specified name;
         + provide the argument --location on the command line;
         + location will default to global.

       --key-string=KEY_STRING
          Key String of the key.

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

        $ gcloud alpha services api-keys undelete

        $ gcloud beta services api-keys undelete
```

### gcloud services api-keys update

```text
NAME
    gcloud services api-keys update - update an API key's metadata

SYNOPSIS
    gcloud services api-keys update (KEY : --location=LOCATION) [--append]
        [--async] [--[no-]check-existing-usage] [--display-name=DISPLAY_NAME]
        [--annotations=[KEY=VALUE,...] | --clear-annotations]
        [--api-target=service=SERVICE[,methods=METHOD:...],[...]
          --allowed-application=[sha1_fingerprint=SHA1_FINGERPRINT,
          package_name=PACKAGE_NAME,...]
          | --allowed-bundle-ids=[ALLOWED_BUNDLE_IDS,...]
          | --allowed-ips=[ALLOWED_IPS,...]
          | --allowed-referrers=[ALLOWED_REFERRERS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an API key's metadata.

EXAMPLES
    To update display name and set allowed ips as server key restrictions:

        $ gcloud services api-keys update \
            projects/myproject/locations/global/keys/my-key-id \
            --display-name="test name" \
            --allowed-ips=2620:15c:2c4:203:2776:1f90:6b3b:217,104.133.8.78

    To update annotations:

        $ gcloud services api-keys update \
            projects/myproject/locations/global/keys/my-key-id \
            --annotations=foo=bar,abc=def

    To update key's allowed referrers restriction:

        $ gcloud services api-keys update \
            projects/myproject/locations/global/keys/my-key-id \
            --allowed-referrers="https://www.example.com/*,http://sub.exampl\
        e.com/*"

    To update key's allowed ios app bundle ids:

        $ gcloud services api-keys update \
            projects/myproject/locations/global/keys/my-key-id \
            --allowed-bundle-ids=my.app

    To update key's allowed android application:

        $ gcloud services api-keys update \
            projects/myproject/locations/global/keys/my-key-id \
            --allowed-application=sha1_fingerprint=DA:39:A3:EE:5E:6B:4B:0D:3\
        2:55:BF:EF:95:60:18:90:AF:D8:07:09,package_name=bar1 \
            --allowed-application=sha1_fingerprint=DA39A3EE5E6B4B0D3255BFEF9\
        5601890AFD80709,package_name=bar2

    To update keys' allowed api target with multiple services:

        $ gcloud services api-keys update \
            projects/myproject/locations/global/keys/my-key-id \
            --api-target=service=bar.googleapis.com \
            --api-target=service=foo.googleapis.com

    To update keys' allowed api target with service and method:

        $ gcloud services api-keys update \
            projects/myproject/locations/global/keys/my-key-id \
            --flags-file=my-flags.yaml

        The content of 'my-flags.yaml' is as follows:

          - --api-target:
              service: "foo.googleapis.com"
          - --api-target:
              service: "bar.googleapis.com"
              methods:
              - "foomethod"
              - "barmethod"

    To append allowed referrers and api targets to an existing key:

        $ gcloud services api-keys update \
            projects/myproject/locations/global/keys/my-key-id --append \
            --allowed-referrers="https://www.example.com/*" \
            --api-target=service=foo.googleapis.com

POSITIONAL ARGUMENTS
     Key resource - The name of the key to update. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument key on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEY
          ID of the key or fully qualified identifier for the key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the key.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + location will default to global.

FLAGS
     --append
        If specified, merge the new restrictions with the current restrictions
        of the key instead of replacing them.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --[no-]check-existing-usage
        If true, existing usage will be checked before the key is updated. If
        the key has traffic in the last 7 days that is incompatible with the
        requested change, the request fails with an error. Defaults to true.
        Set to false (--no-check-existing-usage) to skip the check. Use
        --check-existing-usage to enable and --no-check-existing-usage to
        disable.

     --display-name=DISPLAY_NAME
        Display name of the key to update.

     At most one of these can be specified:

       --annotations=[KEY=VALUE,...]
          Annotations are key resource. Specify annotations as a key-value
          dictionary for small amounts of arbitrary client data.

       --clear-annotations
          If set, clear all annotations on the key.

     --api-target=service=SERVICE[,methods=METHOD:...],[...]
        Repeatable. Specify service and optionally one or multiple specific
        methods. Both fields are case insensitive. Methods can be specified as
        a colon-separated list (e.g.,
        --api-target="service=foo.service.com,methods=method1:method2"), or
        using --flags-file (see $ gcloud topic flags-file for details).

     At most one of these can be specified:

       --allowed-application=[sha1_fingerprint=SHA1_FINGERPRINT,package_name=PACKAGE_NAME,...]
          Repeatable. Specify multiple allowed applications. The accepted keys
          are sha1_fingerprint and package_name. sha1_fingerprint accepts both
          a 20-byte colon-delimited hex string (e.g.
          DA:39:A3:EE:5E:6B:4B:0D:32:55:BF:EF:95:60:18:90:AF:D8:07:09) and a
          40-character non-delimited hex string (e.g.
          DA39A3EE5E6B4B0D3255BFEF95601890AFD80709).

       --allowed-bundle-ids=[ALLOWED_BUNDLE_IDS,...]
          iOS app's bundle ids that are allowed to use the key.

       --allowed-ips=[ALLOWED_IPS,...]
          A list of the caller IP addresses that are allowed to make API calls
          with this key.

       --allowed-referrers=[ALLOWED_REFERRERS,...]
          A list of regular expressions for the referrer URLs that are allowed
          to make API calls with this key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services api-keys update

        $ gcloud beta services api-keys update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud services api-keys update projects/myproject/locations/global/keys/my-key-id \
    --allowed-referrers="https://www.example.com/*,http://sub.example.com/*"

gcloud services api-keys update projects/myproject/locations/global/keys/my-key-id \
    --allowed-application=sha1_fingerprint=DA:39:A3:EE:5E:6B:4B:0D:32:55:BF:EF:95:60:18:90:AF:D8:07:09,package_name=bar1 \
    --allowed-application=sha1_fingerprint=DA39A3EE5E6B4B0D3255BFEF95601890AFD80709,package_name=bar2
```

### gcloud beta services api-keys create

```text
NAME
    gcloud beta services api-keys create - create an API key

SYNOPSIS
    gcloud beta services api-keys create [--annotations=[KEY=VALUE,...]]
        [--async] [--display-name=DISPLAY_NAME] [--key-id=KEY_ID]
        [--service-account=SERVICE_ACCOUNT]
        [--api-target=service=SERVICE[,methods=METHOD:...],[...]
          --allowed-application=[sha1_fingerprint=SHA1_FINGERPRINT,
          package_name=PACKAGE_NAME,...]
          | --allowed-bundle-ids=[ALLOWED_BUNDLE_IDS,...]
          | --allowed-ips=[ALLOWED_IPS,...]
          | --allowed-referrers=[ALLOWED_REFERRERS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services api-keys delete

```text
NAME
    gcloud beta services api-keys delete - delete an API key

SYNOPSIS
    gcloud beta services api-keys delete (KEY : --location=LOCATION) [--async]
        [--[no-]check-existing-usage] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services api-keys describe

```text
NAME
    gcloud beta services api-keys describe - describe an API key's metadata

SYNOPSIS
    gcloud beta services api-keys describe (KEY : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services api-keys get-key-string

```text
NAME
    gcloud beta services api-keys get-key-string - get the key string of an API
        key

SYNOPSIS
    gcloud beta services api-keys get-key-string (KEY : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services api-keys list

```text
NAME
    gcloud beta services api-keys list - lists API keys

SYNOPSIS
    gcloud beta services api-keys list [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services api-keys lookup

```text
NAME
    gcloud beta services api-keys lookup - look up resource name of a key
        string

SYNOPSIS
    gcloud beta services api-keys lookup KEY_STRING [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services api-keys undelete

```text
NAME
    gcloud beta services api-keys undelete - undelete an API key

SYNOPSIS
    gcloud beta services api-keys undelete
        ([KEY : --location=LOCATION] --key-string=KEY_STRING) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services api-keys update

```text
NAME
    gcloud beta services api-keys update - update an API key's metadata

SYNOPSIS
    gcloud beta services api-keys update (KEY : --location=LOCATION) [--append]
        [--async] [--[no-]check-existing-usage] [--display-name=DISPLAY_NAME]
        [--annotations=[KEY=VALUE,...] | --clear-annotations]
        [--api-target=service=SERVICE[,methods=METHOD:...],[...]
          --allowed-application=[sha1_fingerprint=SHA1_FINGERPRINT,
          package_name=PACKAGE_NAME,...]
          | --allowed-bundle-ids=[ALLOWED_BUNDLE_IDS,...]
          | --allowed-ips=[ALLOWED_IPS,...]
          | --allowed-referrers=[ALLOWED_REFERRERS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services api-keys create

```text
NAME
    gcloud alpha services api-keys create - create an API key

SYNOPSIS
    gcloud alpha services api-keys create [--annotations=[KEY=VALUE,...]]
        [--async] [--display-name=DISPLAY_NAME] [--key-id=KEY_ID]
        [--service-account=SERVICE_ACCOUNT]
        [--api-target=service=SERVICE[,methods=METHOD:...],[...]
          --allowed-application=[sha1_fingerprint=SHA1_FINGERPRINT,
          package_name=PACKAGE_NAME,...]
          | --allowed-bundle-ids=[ALLOWED_BUNDLE_IDS,...]
          | --allowed-ips=[ALLOWED_IPS,...]
          | --allowed-referrers=[ALLOWED_REFERRERS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services api-keys delete

```text
NAME
    gcloud alpha services api-keys delete - delete an API key

SYNOPSIS
    gcloud alpha services api-keys delete (KEY : --location=LOCATION) [--async]
        [--[no-]check-existing-usage] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services api-keys describe

```text
NAME
    gcloud alpha services api-keys describe - describe an API key's metadata

SYNOPSIS
    gcloud alpha services api-keys describe (KEY : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services api-keys get-key-string

```text
NAME
    gcloud alpha services api-keys get-key-string - get the key string of an
        API key

SYNOPSIS
    gcloud alpha services api-keys get-key-string (KEY : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services api-keys list

```text
NAME
    gcloud alpha services api-keys list - lists API keys

SYNOPSIS
    gcloud alpha services api-keys list [--show-deleted] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services api-keys lookup

```text
NAME
    gcloud alpha services api-keys lookup - look up resource name of a key
        string

SYNOPSIS
    gcloud alpha services api-keys lookup KEY_STRING [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services api-keys undelete

```text
NAME
    gcloud alpha services api-keys undelete - undelete an API key

SYNOPSIS
    gcloud alpha services api-keys undelete
        ([KEY : --location=LOCATION] --key-string=KEY_STRING) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services api-keys update

```text
NAME
    gcloud alpha services api-keys update - update an API key's metadata

SYNOPSIS
    gcloud alpha services api-keys update (KEY : --location=LOCATION)
        [--append] [--async] [--[no-]check-existing-usage]
        [--display-name=DISPLAY_NAME]
        [--annotations=[KEY=VALUE,...] | --clear-annotations]
        [--api-target=service=SERVICE[,methods=METHOD:...],[...]
          --allowed-application=[sha1_fingerprint=SHA1_FINGERPRINT,
          package_name=PACKAGE_NAME,...]
          | --allowed-bundle-ids=[ALLOWED_BUNDLE_IDS,...]
          | --allowed-ips=[ALLOWED_IPS,...]
          | --allowed-referrers=[ALLOWED_REFERRERS,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/services/api-keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
