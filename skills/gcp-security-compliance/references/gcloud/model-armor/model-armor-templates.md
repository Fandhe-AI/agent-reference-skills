---
source: https://docs.cloud.google.com/sdk/gcloud/reference/model-armor/templates
---

# gcloud model-armor templates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud model-armor templates create

```text
NAME
    gcloud model-armor templates create - create Model Armor Template

SYNOPSIS
    gcloud model-armor templates create (TEMPLATE : --location=LOCATION)
        (--malicious-uri-filter-settings-enforcement=MALICIOUS_URI_FILTER_SETTINGS_ENFORCEMENT --rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE]
          --basic-config-filter-enforcement=BASIC_CONFIG_FILTER_ENFORCEMENT
          | --advanced-config-deidentify-template=ADVANCED_CONFIG_DEIDENTIFY_TEMPLATE --advanced-config-inspect-template=ADVANCED_CONFIG_INSPECT_TEMPLATE --pi-and-jailbreak-filter-settings-confidence-level=PI_AND_JAILBREAK_FILTER_SETTINGS_CONFIDENCE_LEVEL --pi-and-jailbreak-filter-settings-enforcement=PI_AND_JAILBREAK_FILTER_SETTINGS_ENFORCEMENT)
        [--labels=[LABELS,...]] [--request-id=REQUEST_ID]
        [--template-metadata-custom-llm-response-safety-error-code=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_CODE --template-metadata-custom-llm-response-safety-error-message=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_MESSAGE --template-metadata-custom-prompt-safety-error-code=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_CODE --template-metadata-custom-prompt-safety-error-message=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_MESSAGE --template-metadata-ignore-partial-invocation-failures --template-metadata-log-operations --template-metadata-log-sanitize-operations --filter-version-selector=FILTER_VERSION_SELECTOR | --filter-version-selector-alias=FILTER_VERSION_SELECTOR_ALIAS]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new Template in a given project and location.

EXAMPLES
    To create a Template, run:        $ gcloud model-armor templates create my-template \
            --location=us-central1 \
            --malicious-uri-filter-settings-enforcement=enabled

POSITIONAL ARGUMENTS
     Template resource - Identifier. name of resource The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TEMPLATE
          ID of the template or fully qualified identifier for the template.

          To set the template attribute:
          + provide the argument template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the template resource.

          To set the location attribute:
          + provide the argument template on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Filters configuration.

     At least one of these must be specified:

       Malicious URI filter settings.

       --malicious-uri-filter-settings-enforcement=MALICIOUS_URI_FILTER_SETTINGS_ENFORCEMENT
          Tells whether the Malicious URI filter is enabled or disabled.
          MALICIOUS_URI_FILTER_SETTINGS_ENFORCEMENT must be one of:

           disabled
              Disabled
           enabled
              Enabled

       Responsible AI Filter settings.

       --rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],[filterType=FILTERTYPE]
          Required, List of Responsible AI filters enabled for template.

           confidenceLevel
              Confidence level for this RAI filter. During data sanitization,
              if data is classified under this filter with a confidence level
              equal to or greater than the specified level, a positive match is
              reported. If the confidence level is unspecified (i.e., 0), the
              system will use a reasonable default level based on the
              filter_type.

           filterType
              Type of responsible AI filter.

          Shorthand Example:

              --rai-settings-filters=confidenceLevel=string,filterType=string --rai-settings-filters=confidenceLevel=string,filterType=string

          JSON Example:

              --rai-settings-filters='[{"confidenceLevel": "string", "filterType": "string"}]'

          File Example:

              --rai-settings-filters=path_to_file.(yaml|json)

       Sensitive Data Protection settings.

       Arguments for the sdp configuration.

       At most one of these can be specified:

         Sensitive Data Protection basic configuration.

         --basic-config-filter-enforcement=BASIC_CONFIG_FILTER_ENFORCEMENT
            Tells whether the Sensitive Data Protection basic config is enabled
            or disabled. BASIC_CONFIG_FILTER_ENFORCEMENT must be one of:

             disabled
                Disabled
             enabled
                Enabled

         Sensitive Data Protection Advanced configuration.

         --advanced-config-deidentify-template=ADVANCED_CONFIG_DEIDENTIFY_TEMPLATE
            Optional Sensitive Data Protection Deidentify template resource
            name.

            If provided then DeidentifyContent action is performed during
            Sanitization using this template and inspect template. The
            De-identified data will be returned in SdpDeidentifyResult. Note
            that all info-types present in the deidentify template must be
            present in inspect template.

            e.g.
            organizations/{organization}/deidentifyTemplates/{deidentify_template},
            projects/{project}/deidentifyTemplates/{deidentify_template}
            organizations/{organization}/locations/{location}/deidentifyTemplates/{deidentify_template}
            projects/{project}/locations/{location}/deidentifyTemplates/{deidentify_template}

         --advanced-config-inspect-template=ADVANCED_CONFIG_INSPECT_TEMPLATE
            Sensitive Data Protection inspect template resource name

            If only inspect template is provided (de-identify template not
            provided), then Sensitive Data Protection InspectContent action is
            performed during Sanitization. All Sensitive Data Protection
            findings identified during inspection will be returned as
            SdpFinding in SdpInsepctionResult e.g.
            organizations/{organization}/inspectTemplates/{inspect_template},
            projects/{project}/inspectTemplates/{inspect_template}
            organizations/{organization}/locations/{location}/inspectTemplates/{inspect_template}
            projects/{project}/locations/{location}/inspectTemplates/{inspect_template}

       Prompt injection and Jailbreak Filter settings.

       --pi-and-jailbreak-filter-settings-confidence-level=PI_AND_JAILBREAK_FILTER_SETTINGS_CONFIDENCE_LEVEL
          Confidence level for this filter. Confidence level is used to
          determine the threshold for the filter. If detection confidence is
          equal to or greater than the specified level, a positive match is
          reported. Confidence level will only be used if the filter is
          enabled. PI_AND_JAILBREAK_FILTER_SETTINGS_CONFIDENCE_LEVEL must be
          one of:

           high
              Low chance of false positives.
           low-and-above
              Highest chance of a false positive.
           medium-and-above
              Some chance of false positives.

       --pi-and-jailbreak-filter-settings-enforcement=PI_AND_JAILBREAK_FILTER_SETTINGS_ENFORCEMENT
          Tells whether Prompt injection and Jailbreak filter is enabled or
          disabled. PI_AND_JAILBREAK_FILTER_SETTINGS_ENFORCEMENT must be one
          of:

           disabled
              Enabled
           enabled
              Enabled

OPTIONAL FLAGS
     --labels=[LABELS,...]
        Labels as key value pairs.

         KEY
            Keys must start with a lowercase character and contain only hyphens
            (-), underscores (_), lowercase characters, and numbers.

         VALUE
            Values must contain only hyphens (-), underscores (_), lowercase
            characters, and numbers.

        Shorthand Example:

            --labels=string=string

        JSON Example:

            --labels='{"string": "string"}'

        File Example:

            --labels=path_to_file.(yaml|json)

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server stores
        the request ID for 60 minutes after the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Message describing TemplateMetadata

     --template-metadata-custom-llm-response-safety-error-code=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_CODE
        Indicates the custom error code set by the user to be returned to the
        end user if the LLM response trips Model Armor filters.

     --template-metadata-custom-llm-response-safety-error-message=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_MESSAGE
        Indicates the custom error message set by the user to be returned to
        the end user if the LLM response trips Model Armor filters.

     --template-metadata-custom-prompt-safety-error-code=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_CODE
        Indicates the custom error code set by the user to be returned to the
        end user by the service extension if the prompt trips Model Armor
        filters.

     --template-metadata-custom-prompt-safety-error-message=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_MESSAGE
        Indicates the custom error message set by the user to be returned to
        the end user if the prompt trips Model Armor filters.

     --template-metadata-ignore-partial-invocation-failures
        If true, partial detector failures should be ignored.

     --template-metadata-log-operations
        If true, log template crud operations.

     --template-metadata-log-sanitize-operations
        If true, log sanitize operations.

     Arguments for the filter version selector.

     Represents the configuration for selecting a Filter Version. Allows
     customers to choose to use either a specific version or a predefined
     alias.

     Arguments for the version spec.

     At most one of these can be specified:

       --filter-version-selector=FILTER_VERSION_SELECTOR
          Allows customers to pin to a specific, immutable Filter Version. This
          provides stability, as this will not change after a version upgrade.
          Expected format is a case-sensitive string, e.g., "v1", "v2".
          Requests providing an invalid or non-existent version string will be
          rejected with an INVALID_ARGUMENT error.

       --filter-version-selector-alias=FILTER_VERSION_SELECTOR_ALIAS
          Allows customers to use a predefined alias that dynamically points to
          a specific version based on internal upgrades. This offers
          flexibility and reduces the need for template updates.
          FILTER_VERSION_SELECTOR_ALIAS must be one of:

           filter-version-alias-latest
              LATEST alias points to the newest model version available. This
              version is subject to frequent revisions and offers SLO
              guarantees but does not assure stability, providing the most
              current security protections.
           filter-version-alias-legacy
              LEGACY alias could be used for sanitization operations for a
              transition period. New templates cannot be created with this
              version.
           filter-version-alias-retired
              RETIRED alias could be used for versions that are no longer
              available to be used. While new templates cannot be created with
              this alias, any existing template or request using RETIRED
              version will fall back to the current STABLE version for
              sanitization operations.
           filter-version-alias-stable
              STABLE alias points to the most recent stable model version.
              Using this alias means no code changes are required when a new
              model becomes the stable version.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the modelarmor/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/security-command-center/docs/model-armor-overview

NOTES
    These variants are also available:

        $ gcloud alpha model-armor templates create

        $ gcloud beta model-armor templates create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud model-armor templates create my-template \
    --location=us-central1 \
    --malicious-uri-filter-settings-enforcement=enabled
```

### gcloud model-armor templates delete

```text
NAME
    gcloud model-armor templates delete - delete Model Armor Template

SYNOPSIS
    gcloud model-armor templates delete (TEMPLATE : --location=LOCATION)
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a Template.

EXAMPLES
    To delete a Template, run:        $ gcloud model-armor templates delete my-template \
            --location=us-central1

POSITIONAL ARGUMENTS
     Template resource - Name of the resource The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TEMPLATE
          ID of the template or fully qualified identifier for the template.

          To set the template attribute:
          + provide the argument template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the template resource.

          To set the location attribute:
          + provide the argument template on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server stores
        the request ID for 60 minutes after the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the modelarmor/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/security-command-center/docs/model-armor-overview

NOTES
    These variants are also available:

        $ gcloud alpha model-armor templates delete

        $ gcloud beta model-armor templates delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud model-armor templates delete my-template \
    --location=us-central1
```

### gcloud model-armor templates describe

```text
NAME
    gcloud model-armor templates describe - get Model Armor Template

SYNOPSIS
    gcloud model-armor templates describe (TEMPLATE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Gets a Template.

EXAMPLES
    To get a Template, run:        $ gcloud model-armor templates describe my-template \
            --location=us-central1

POSITIONAL ARGUMENTS
     Template resource - Name of the resource The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TEMPLATE
          ID of the template or fully qualified identifier for the template.

          To set the template attribute:
          + provide the argument template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the template resource.

          To set the location attribute:
          + provide the argument template on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the modelarmor/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/security-command-center/docs/model-armor-overview

NOTES
    These variants are also available:

        $ gcloud alpha model-armor templates describe

        $ gcloud beta model-armor templates describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud model-armor templates describe my-template \
    --location=us-central1
```

### gcloud model-armor templates list

```text
NAME
    gcloud model-armor templates list - list Model Armor Templates

SYNOPSIS
    gcloud model-armor templates list --location=LOCATION [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists Templates in a given project and location.

EXAMPLES
    To list Templates in a given project and location, run:        $ gcloud model-armor templates list list --location=us-central1

REQUIRED FLAGS
     Location resource - Parent value for ListTemplatesRequest This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

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

API REFERENCE
    This command uses the modelarmor/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/security-command-center/docs/model-armor-overview

NOTES
    These variants are also available:

        $ gcloud alpha model-armor templates list

        $ gcloud beta model-armor templates list
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud model-armor templates list \
    --location=us-central1
```

### gcloud model-armor templates sanitize-model-response

```text
NAME
    gcloud model-armor templates sanitize-model-response - sanitize Model
        Response

SYNOPSIS
    gcloud model-armor templates sanitize-model-response
        (TEMPLATE : --location=LOCATION) [--user-prompt=USER_PROMPT]
        [--model-response-data-text=MODEL_RESPONSE_DATA_TEXT
          | --model-response-data-byte-item-from-file=PATH_TO_FILE
          --model-response-data-byte-item-type=MODEL_RESPONSE_DATA_BYTE_ITEM_TYPE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sanitizes a model response.

EXAMPLES
    To sanitize a model response, run:        $ gcloud model-armor templates sanitize-model-response my-template \
            --location=us-central1 \
            --model-response-data="test-model-response"

POSITIONAL ARGUMENTS
     Template resource - Represents resource name of template e.g.
     name=projects/sample-project/locations/us-central1/templates/templ01 The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TEMPLATE
          ID of the template or fully qualified identifier for the template.

          To set the template attribute:
          + provide the argument template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the template resource.

          To set the location attribute:
          + provide the argument template on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --user-prompt=USER_PROMPT
        User Prompt associated with Model response.

     Arguments for the data item.

     At most one of these can be specified:

       --model-response-data-text=MODEL_RESPONSE_DATA_TEXT
          Plaintext string data for sanitization.

       Or at least one of these can be specified:

         Represents Byte Data item.

         --model-response-data-byte-item-from-file=PATH_TO_FILE
            Bytes Data. Use a full or relative path to a local file containing
            the value of model_response_data_byte_item.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --model-response-data-byte-item-type=MODEL_RESPONSE_DATA_BYTE_ITEM_TYPE
            The type of byte data. MODEL_RESPONSE_DATA_BYTE_ITEM_TYPE must be
            one of:

             pdf
                PDF
             plaintext-utf8
                plain text

            This flag argument must be specified if any of the other arguments
            in this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the modelarmor/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/security-command-center/docs/model-armor-overview

NOTES
    These variants are also available:

        $ gcloud alpha model-armor templates sanitize-model-response

        $ gcloud beta model-armor templates sanitize-model-response
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud model-armor templates sanitize-model-response my-template \
    --location=us-central1 \
    --model-response-data-text="test-model-response"
```

### gcloud model-armor templates sanitize-user-prompt

```text
NAME
    gcloud model-armor templates sanitize-user-prompt - sanitize User Prompt

SYNOPSIS
    gcloud model-armor templates sanitize-user-prompt
        (TEMPLATE : --location=LOCATION)
        [--user-prompt-data-text=USER_PROMPT_DATA_TEXT
          | --byte-item-data-from-file=PATH_TO_FILE
          --byte-item-data-type=BYTE_ITEM_DATA_TYPE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sanitizes a user prompt.

EXAMPLES
    To sanitize a user prompt, run:        $ gcloud model-armor templates sanitize-user-prompt my-template \
            --location=us-central1 --user-prompt-data="test-user-prompt"

POSITIONAL ARGUMENTS
     Template resource - Represents resource name of template e.g.
     name=projects/sample-project/locations/us-central1/templates/templ01 The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TEMPLATE
          ID of the template or fully qualified identifier for the template.

          To set the template attribute:
          + provide the argument template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the template resource.

          To set the location attribute:
          + provide the argument template on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     Arguments for the data item.

     At most one of these can be specified:

       --user-prompt-data-text=USER_PROMPT_DATA_TEXT
          Plaintext string data for sanitization.

       Or at least one of these can be specified:

         Represents Byte Data item.

         --byte-item-data-from-file=PATH_TO_FILE
            Bytes Data. Use a full or relative path to a local file containing
            the value of byte_item_data.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --byte-item-data-type=BYTE_ITEM_DATA_TYPE
            The type of byte data. BYTE_ITEM_DATA_TYPE must be one of:

             pdf
                PDF
             plaintext-utf8
                plain text

            This flag argument must be specified if any of the other arguments
            in this group are specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the modelarmor/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/security-command-center/docs/model-armor-overview

NOTES
    These variants are also available:

        $ gcloud alpha model-armor templates sanitize-user-prompt

        $ gcloud beta model-armor templates sanitize-user-prompt
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud model-armor templates sanitize-user-prompt my-template \
    --location=us-central1 \
    --user-prompt-data-text="test-user-prompt"
```

### gcloud model-armor templates update

```text
NAME
    gcloud model-armor templates update - update Model Armor Template

SYNOPSIS
    gcloud model-armor templates update (TEMPLATE : --location=LOCATION)
        [--request-id=REQUEST_ID]
        [--clear-filter-config
          --malicious-uri-filter-settings-enforcement=MALICIOUS_URI_FILTER_SETTINGS_ENFORCEMENT --basic-config-filter-enforcement=BASIC_CONFIG_FILTER_ENFORCEMENT | --advanced-config-deidentify-template=ADVANCED_CONFIG_DEIDENTIFY_TEMPLATE --advanced-config-inspect-template=ADVANCED_CONFIG_INSPECT_TEMPLATE --pi-and-jailbreak-filter-settings-confidence-level=PI_AND_JAILBREAK_FILTER_SETTINGS_CONFIDENCE_LEVEL --pi-and-jailbreak-filter-settings-enforcement=PI_AND_JAILBREAK_FILTER_SETTINGS_ENFORCEMENT --rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE]
          | --add-rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE] --clear-rai-settings-filters
          | --remove-rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE]]
        [--clear-template-metadata
          --template-metadata-custom-llm-response-safety-error-code=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_CODE --template-metadata-custom-llm-response-safety-error-message=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_MESSAGE --template-metadata-custom-prompt-safety-error-code=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_CODE --template-metadata-custom-prompt-safety-error-message=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_MESSAGE --[no-]template-metadata-ignore-partial-invocation-failures --[no-]template-metadata-log-operations --[no-]template-metadata-log-sanitize-operations --filter-version-selector=FILTER_VERSION_SELECTOR | --filter-version-selector-alias=FILTER_VERSION_SELECTOR_ALIAS]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a Template.

EXAMPLES
    To update a Template, run:        $ gcloud model-armor templates update my-template \
            --location=us-central1 --clear-labels

POSITIONAL ARGUMENTS
     Template resource - Identifier. name of resource The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TEMPLATE
          ID of the template or fully qualified identifier for the template.

          To set the template attribute:
          + provide the argument template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the template resource.

          To set the location attribute:
          + provide the argument template on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

FLAGS
     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server stores
        the request ID for 60 minutes after the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Filters configuration.

     --clear-filter-config
        Set template.filterConfig back to default value.

     Malicious URI filter settings.

     --malicious-uri-filter-settings-enforcement=MALICIOUS_URI_FILTER_SETTINGS_ENFORCEMENT
        Tells whether the Malicious URI filter is enabled or disabled.
        MALICIOUS_URI_FILTER_SETTINGS_ENFORCEMENT must be one of:

         disabled
            Disabled
         enabled
            Enabled

     Sensitive Data Protection settings.

     Arguments for the sdp configuration.

     At most one of these can be specified:

       Sensitive Data Protection basic configuration.

       --basic-config-filter-enforcement=BASIC_CONFIG_FILTER_ENFORCEMENT
          Tells whether the Sensitive Data Protection basic config is enabled
          or disabled. BASIC_CONFIG_FILTER_ENFORCEMENT must be one of:

           disabled
              Disabled
           enabled
              Enabled

       Sensitive Data Protection Advanced configuration.

       --advanced-config-deidentify-template=ADVANCED_CONFIG_DEIDENTIFY_TEMPLATE
          Optional Sensitive Data Protection Deidentify template resource name.

          If provided then DeidentifyContent action is performed during
          Sanitization using this template and inspect template. The
          De-identified data will be returned in SdpDeidentifyResult. Note that
          all info-types present in the deidentify template must be present in
          inspect template.

          e.g.
          organizations/{organization}/deidentifyTemplates/{deidentify_template},
          projects/{project}/deidentifyTemplates/{deidentify_template}
          organizations/{organization}/locations/{location}/deidentifyTemplates/{deidentify_template}
          projects/{project}/locations/{location}/deidentifyTemplates/{deidentify_template}

       --advanced-config-inspect-template=ADVANCED_CONFIG_INSPECT_TEMPLATE
          Sensitive Data Protection inspect template resource name

          If only inspect template is provided (de-identify template not
          provided), then Sensitive Data Protection InspectContent action is
          performed during Sanitization. All Sensitive Data Protection findings
          identified during inspection will be returned as SdpFinding in
          SdpInsepctionResult e.g.
          organizations/{organization}/inspectTemplates/{inspect_template},
          projects/{project}/inspectTemplates/{inspect_template}
          organizations/{organization}/locations/{location}/inspectTemplates/{inspect_template}
          projects/{project}/locations/{location}/inspectTemplates/{inspect_template}

     Prompt injection and Jailbreak Filter settings.

     --pi-and-jailbreak-filter-settings-confidence-level=PI_AND_JAILBREAK_FILTER_SETTINGS_CONFIDENCE_LEVEL
        Confidence level for this filter. Confidence level is used to determine
        the threshold for the filter. If detection confidence is equal to or
        greater than the specified level, a positive match is reported.
        Confidence level will only be used if the filter is enabled.
        PI_AND_JAILBREAK_FILTER_SETTINGS_CONFIDENCE_LEVEL must be one of:

         high
            Low chance of false positives.
         low-and-above
            Highest chance of a false positive.
         medium-and-above
            Some chance of false positives.

     --pi-and-jailbreak-filter-settings-enforcement=PI_AND_JAILBREAK_FILTER_SETTINGS_ENFORCEMENT
        Tells whether Prompt injection and Jailbreak filter is enabled or
        disabled. PI_AND_JAILBREAK_FILTER_SETTINGS_ENFORCEMENT must be one of:

         disabled
            Enabled
         enabled
            Enabled

     Responsible AI Filter settings.

     Update rai_settings_filters.

     At most one of these can be specified:

       --rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],[filterType=FILTERTYPE]
          Set rai_settings_filters to new value. List of Responsible AI filters
          enabled for template.

           confidenceLevel
              Confidence level for this RAI filter. During data sanitization,
              if data is classified under this filter with a confidence level
              equal to or greater than the specified level, a positive match is
              reported. If the confidence level is unspecified (i.e., 0), the
              system will use a reasonable default level based on the
              filter_type.

           filterType
              Type of responsible AI filter.

          Shorthand Example:

              --rai-settings-filters=confidenceLevel=string,filterType=string --rai-settings-filters=confidenceLevel=string,filterType=string

          JSON Example:

              --rai-settings-filters='[{"confidenceLevel": "string", "filterType": "string"}]'

          File Example:

              --rai-settings-filters=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],[filterType=FILTERTYPE]
            Add new value to rai_settings_filters list. List of Responsible AI
            filters enabled for template.

             confidenceLevel
                Confidence level for this RAI filter. During data sanitization,
                if data is classified under this filter with a confidence level
                equal to or greater than the specified level, a positive match
                is reported. If the confidence level is unspecified (i.e., 0),
                the system will use a reasonable default level based on the
                filter_type.

             filterType
                Type of responsible AI filter.

            Shorthand Example:

                --add-rai-settings-filters=confidenceLevel=string,filterType=string --add-rai-settings-filters=confidenceLevel=string,filterType=string

            JSON Example:

                --add-rai-settings-filters='[{"confidenceLevel": "string", "filterType": "string"}]'

            File Example:

                --add-rai-settings-filters=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-rai-settings-filters
              Clear rai_settings_filters value and set to empty list.

           --remove-rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],[filterType=FILTERTYPE]
              Remove existing value from rai_settings_filters list. List of
              Responsible AI filters enabled for template.

               confidenceLevel
                  Confidence level for this RAI filter. During data
                  sanitization, if data is classified under this filter with a
                  confidence level equal to or greater than the specified
                  level, a positive match is reported. If the confidence level
                  is unspecified (i.e., 0), the system will use a reasonable
                  default level based on the filter_type.

               filterType
                  Type of responsible AI filter.

              Shorthand Example:

                  --remove-rai-settings-filters=confidenceLevel=string,filterType=string --remove-rai-settings-filters=confidenceLevel=string,filterType=string

              JSON Example:

                  --remove-rai-settings-filters='[{"confidenceLevel": "string", "filterType": "string"}]'

              File Example:

                  --remove-rai-settings-filters=path_to_file.(yaml|json)

     Message describing TemplateMetadata

     --clear-template-metadata
        Set template.templateMetadata back to default value.

     --template-metadata-custom-llm-response-safety-error-code=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_CODE
        Indicates the custom error code set by the user to be returned to the
        end user if the LLM response trips Model Armor filters.

     --template-metadata-custom-llm-response-safety-error-message=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_MESSAGE
        Indicates the custom error message set by the user to be returned to
        the end user if the LLM response trips Model Armor filters.

     --template-metadata-custom-prompt-safety-error-code=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_CODE
        Indicates the custom error code set by the user to be returned to the
        end user by the service extension if the prompt trips Model Armor
        filters.

     --template-metadata-custom-prompt-safety-error-message=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_MESSAGE
        Indicates the custom error message set by the user to be returned to
        the end user if the prompt trips Model Armor filters.

     --[no-]template-metadata-ignore-partial-invocation-failures
        If true, partial detector failures should be ignored. Use
        --template-metadata-ignore-partial-invocation-failures to enable and
        --no-template-metadata-ignore-partial-invocation-failures to disable.

     --[no-]template-metadata-log-operations
        If true, log template crud operations. Use
        --template-metadata-log-operations to enable and
        --no-template-metadata-log-operations to disable.

     --[no-]template-metadata-log-sanitize-operations
        If true, log sanitize operations. Use
        --template-metadata-log-sanitize-operations to enable and
        --no-template-metadata-log-sanitize-operations to disable.

     Arguments for the filter version selector.

     Represents the configuration for selecting a Filter Version. Allows
     customers to choose to use either a specific version or a predefined
     alias.

     Arguments for the version spec.

     At most one of these can be specified:

       --filter-version-selector=FILTER_VERSION_SELECTOR
          Allows customers to pin to a specific, immutable Filter Version. This
          provides stability, as this will not change after a version upgrade.
          Expected format is a case-sensitive string, e.g., "v1", "v2".
          Requests providing an invalid or non-existent version string will be
          rejected with an INVALID_ARGUMENT error.

       --filter-version-selector-alias=FILTER_VERSION_SELECTOR_ALIAS
          Allows customers to use a predefined alias that dynamically points to
          a specific version based on internal upgrades. This offers
          flexibility and reduces the need for template updates.
          FILTER_VERSION_SELECTOR_ALIAS must be one of:

           filter-version-alias-latest
              LATEST alias points to the newest model version available. This
              version is subject to frequent revisions and offers SLO
              guarantees but does not assure stability, providing the most
              current security protections.
           filter-version-alias-legacy
              LEGACY alias could be used for sanitization operations for a
              transition period. New templates cannot be created with this
              version.
           filter-version-alias-retired
              RETIRED alias could be used for versions that are no longer
              available to be used. While new templates cannot be created with
              this alias, any existing template or request using RETIRED
              version will fall back to the current STABLE version for
              sanitization operations.
           filter-version-alias-stable
              STABLE alias points to the most recent stable model version.
              Using this alias means no code changes are required when a new
              model becomes the stable version.

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Labels as key value pairs.

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
            Update labels value or add key value pair. Labels as key value
            pairs.

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
    This command uses the modelarmor/v1 API. The full documentation for this
    API can be found at:
    https://cloud.google.com/security-command-center/docs/model-armor-overview

NOTES
    These variants are also available:

        $ gcloud alpha model-armor templates update

        $ gcloud beta model-armor templates update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud model-armor templates update my-template \
    --location=us-central1 \
    --clear-labels
```

### gcloud beta model-armor templates create

```text
NAME
    gcloud beta model-armor templates create - create Model Armor Template

SYNOPSIS
    gcloud beta model-armor templates create (TEMPLATE : --location=LOCATION)
        (--malicious-uri-filter-settings-enforcement=MALICIOUS_URI_FILTER_SETTINGS_ENFORCEMENT --rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE]
          --basic-config-filter-enforcement=BASIC_CONFIG_FILTER_ENFORCEMENT
          | --advanced-config-deidentify-template=ADVANCED_CONFIG_DEIDENTIFY_TEMPLATE --advanced-config-inspect-template=ADVANCED_CONFIG_INSPECT_TEMPLATE --pi-and-jailbreak-filter-settings-confidence-level=PI_AND_JAILBREAK_FILTER_SETTINGS_CONFIDENCE_LEVEL --pi-and-jailbreak-filter-settings-enforcement=PI_AND_JAILBREAK_FILTER_SETTINGS_ENFORCEMENT)
        [--labels=[LABELS,...]] [--request-id=REQUEST_ID]
        [--[no-]multi-language-detection-enable
          --template-metadata-custom-llm-response-safety-error-code=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_CODE --template-metadata-custom-llm-response-safety-error-message=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_MESSAGE --template-metadata-custom-prompt-safety-error-code=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_CODE --template-metadata-custom-prompt-safety-error-message=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_MESSAGE --template-metadata-enforcement-type=TEMPLATE_METADATA_ENFORCEMENT_TYPE --template-metadata-ignore-partial-invocation-failures --template-metadata-log-operations --template-metadata-log-sanitize-operations --filter-version-selector=FILTER_VERSION_SELECTOR | --filter-version-selector-alias=FILTER_VERSION_SELECTOR_ALIAS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta model-armor templates delete

```text
NAME
    gcloud beta model-armor templates delete - delete Model Armor Template

SYNOPSIS
    gcloud beta model-armor templates delete (TEMPLATE : --location=LOCATION)
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta model-armor templates describe

```text
NAME
    gcloud beta model-armor templates describe - get Model Armor Template

SYNOPSIS
    gcloud beta model-armor templates describe (TEMPLATE : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta model-armor templates list

```text
NAME
    gcloud beta model-armor templates list - list Model Armor Templates

SYNOPSIS
    gcloud beta model-armor templates list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta model-armor templates sanitize-model-response

```text
NAME
    gcloud beta model-armor templates sanitize-model-response - sanitize Model
        Response

SYNOPSIS
    gcloud beta model-armor templates sanitize-model-response
        (TEMPLATE : --location=LOCATION)
        [--multi-language-detection-metadata-enable]
        [--multi-language-detection-metadata-source=MULTI_LANGUAGE_DETECTION_METADATA_SOURCE]
        [--user-prompt=USER_PROMPT]
        [--model-response-data-text=MODEL_RESPONSE_DATA_TEXT
          | --model-response-data-byte-item-type=MODEL_RESPONSE_DATA_BYTE_ITEM_TYPE (--model-response-data-byte-item=MODEL_RESPONSE_DATA_BYTE_ITEM | --model-response-data-byte-item-from-file=PATH_TO_FILE)]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta model-armor templates sanitize-user-prompt

```text
NAME
    gcloud beta model-armor templates sanitize-user-prompt - sanitize User
        Prompt

SYNOPSIS
    gcloud beta model-armor templates sanitize-user-prompt
        (TEMPLATE : --location=LOCATION)
        [--multi-language-detection-metadata-enable]
        [--multi-language-detection-metadata-source=MULTI_LANGUAGE_DETECTION_METADATA_SOURCE]
        [--user-prompt-data-text=USER_PROMPT_DATA_TEXT
          | --byte-item-data-type=BYTE_ITEM_DATA_TYPE
          (--byte-item-data=BYTE_ITEM_DATA
          | --byte-item-data-from-file=PATH_TO_FILE)] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta model-armor templates update

```text
NAME
    gcloud beta model-armor templates update - update Model Armor Template

SYNOPSIS
    gcloud beta model-armor templates update (TEMPLATE : --location=LOCATION)
        [--request-id=REQUEST_ID]
        [--clear-filter-config
          --malicious-uri-filter-settings-enforcement=MALICIOUS_URI_FILTER_SETTINGS_ENFORCEMENT --basic-config-filter-enforcement=BASIC_CONFIG_FILTER_ENFORCEMENT | --advanced-config-deidentify-template=ADVANCED_CONFIG_DEIDENTIFY_TEMPLATE --advanced-config-inspect-template=ADVANCED_CONFIG_INSPECT_TEMPLATE --pi-and-jailbreak-filter-settings-confidence-level=PI_AND_JAILBREAK_FILTER_SETTINGS_CONFIDENCE_LEVEL --pi-and-jailbreak-filter-settings-enforcement=PI_AND_JAILBREAK_FILTER_SETTINGS_ENFORCEMENT --rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE]
          | --add-rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE] --clear-rai-settings-filters
          | --remove-rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE]]
        [--clear-template-metadata --[no-]multi-language-detection-enable
          --template-metadata-custom-llm-response-safety-error-code=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_CODE --template-metadata-custom-llm-response-safety-error-message=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_MESSAGE --template-metadata-custom-prompt-safety-error-code=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_CODE --template-metadata-custom-prompt-safety-error-message=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_MESSAGE --template-metadata-enforcement-type=TEMPLATE_METADATA_ENFORCEMENT_TYPE --[no-]template-metadata-ignore-partial-invocation-failures --[no-]template-metadata-log-operations --[no-]template-metadata-log-sanitize-operations --filter-version-selector=FILTER_VERSION_SELECTOR | --filter-version-selector-alias=FILTER_VERSION_SELECTOR_ALIAS]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha model-armor templates create

```text
NAME
    gcloud alpha model-armor templates create - create Model Armor Template

SYNOPSIS
    gcloud alpha model-armor templates create (TEMPLATE : --location=LOCATION)
        (--malicious-uri-filter-settings-enforcement=MALICIOUS_URI_FILTER_SETTINGS_ENFORCEMENT --rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE]
          --basic-config-filter-enforcement=BASIC_CONFIG_FILTER_ENFORCEMENT
          | --advanced-config-deidentify-template=ADVANCED_CONFIG_DEIDENTIFY_TEMPLATE --advanced-config-inspect-template=ADVANCED_CONFIG_INSPECT_TEMPLATE --pi-and-jailbreak-filter-settings-confidence-level=PI_AND_JAILBREAK_FILTER_SETTINGS_CONFIDENCE_LEVEL --pi-and-jailbreak-filter-settings-enforcement=PI_AND_JAILBREAK_FILTER_SETTINGS_ENFORCEMENT)
        [--labels=[LABELS,...]] [--request-id=REQUEST_ID]
        [--template-metadata-custom-llm-response-safety-error-code=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_CODE --template-metadata-custom-llm-response-safety-error-message=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_MESSAGE --template-metadata-custom-prompt-safety-error-code=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_CODE --template-metadata-custom-prompt-safety-error-message=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_MESSAGE --template-metadata-ignore-partial-invocation-failures --template-metadata-log-operations --template-metadata-log-sanitize-operations --filter-version-selector=FILTER_VERSION_SELECTOR | --filter-version-selector-alias=FILTER_VERSION_SELECTOR_ALIAS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha model-armor templates delete

```text
NAME
    gcloud alpha model-armor templates delete - delete Model Armor Template

SYNOPSIS
    gcloud alpha model-armor templates delete (TEMPLATE : --location=LOCATION)
        [--request-id=REQUEST_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha model-armor templates describe

```text
NAME
    gcloud alpha model-armor templates describe - get Model Armor Template

SYNOPSIS
    gcloud alpha model-armor templates describe
        (TEMPLATE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha model-armor templates list

```text
NAME
    gcloud alpha model-armor templates list - list Model Armor Templates

SYNOPSIS
    gcloud alpha model-armor templates list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha model-armor templates sanitize-model-response

```text
NAME
    gcloud alpha model-armor templates sanitize-model-response - sanitize Model
        Response

SYNOPSIS
    gcloud alpha model-armor templates sanitize-model-response
        (TEMPLATE : --location=LOCATION) [--user-prompt=USER_PROMPT]
        [--model-response-data-text=MODEL_RESPONSE_DATA_TEXT
          | --model-response-data-byte-item-from-file=PATH_TO_FILE
          --model-response-data-byte-item-type=MODEL_RESPONSE_DATA_BYTE_ITEM_TYPE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha model-armor templates sanitize-user-prompt

```text
NAME
    gcloud alpha model-armor templates sanitize-user-prompt - sanitize User
        Prompt

SYNOPSIS
    gcloud alpha model-armor templates sanitize-user-prompt
        (TEMPLATE : --location=LOCATION)
        [--user-prompt-data-text=USER_PROMPT_DATA_TEXT
          | --byte-item-data-from-file=PATH_TO_FILE
          --byte-item-data-type=BYTE_ITEM_DATA_TYPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha model-armor templates update

```text
NAME
    gcloud alpha model-armor templates update - update Model Armor Template

SYNOPSIS
    gcloud alpha model-armor templates update (TEMPLATE : --location=LOCATION)
        [--request-id=REQUEST_ID]
        [--clear-filter-config
          --malicious-uri-filter-settings-enforcement=MALICIOUS_URI_FILTER_SETTINGS_ENFORCEMENT --basic-config-filter-enforcement=BASIC_CONFIG_FILTER_ENFORCEMENT | --advanced-config-deidentify-template=ADVANCED_CONFIG_DEIDENTIFY_TEMPLATE --advanced-config-inspect-template=ADVANCED_CONFIG_INSPECT_TEMPLATE --pi-and-jailbreak-filter-settings-confidence-level=PI_AND_JAILBREAK_FILTER_SETTINGS_CONFIDENCE_LEVEL --pi-and-jailbreak-filter-settings-enforcement=PI_AND_JAILBREAK_FILTER_SETTINGS_ENFORCEMENT --rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE]
          | --add-rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE] --clear-rai-settings-filters
          | --remove-rai-settings-filters=[confidenceLevel=CONFIDENCELEVEL],
          [filterType=FILTERTYPE]]
        [--clear-template-metadata
          --template-metadata-custom-llm-response-safety-error-code=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_CODE --template-metadata-custom-llm-response-safety-error-message=TEMPLATE_METADATA_CUSTOM_LLM_RESPONSE_SAFETY_ERROR_MESSAGE --template-metadata-custom-prompt-safety-error-code=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_CODE --template-metadata-custom-prompt-safety-error-message=TEMPLATE_METADATA_CUSTOM_PROMPT_SAFETY_ERROR_MESSAGE --[no-]template-metadata-ignore-partial-invocation-failures --[no-]template-metadata-log-operations --[no-]template-metadata-log-sanitize-operations --filter-version-selector=FILTER_VERSION_SELECTOR | --filter-version-selector-alias=FILTER_VERSION_SELECTOR_ALIAS]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create`, `delete`, `describe`, `list`, `sanitize-model-response`, `sanitize-user-prompt` and `update` examples put `$ gcloud` on the same line as the preceding sentence; the runnable form starts each command on its own line.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `list` example repeats `list` (`gcloud model-armor templates list list --location=us-central1`; gcloud 593.0.0: "unrecognized arguments: list"); the runnable form gives it once.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `sanitize-model-response` and `sanitize-user-prompt` examples pass `--model-response-data` and `--user-prompt-data`, which are not flags of these commands (gcloud 593.0.0: "unrecognized arguments: --model-response-data=test-model-response (did you mean '--model-response-data-text'?)" and the same for `--user-prompt-data-text`); the runnable form uses `--model-response-data-text` and `--user-prompt-data-text`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/model-armor/templates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
