---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/ai
---

# gcloud container ai

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container ai profiles benchmarks list

```text
NAME
    gcloud container ai profiles benchmarks list - list benchmarks for a given
        model and model server

SYNOPSIS
    gcloud container ai profiles benchmarks list --model=MODEL
        --model-server=MODEL_SERVER [--format=FORMAT]
        [--instance-type=INSTANCE_TYPE]
        [--model-server-version=MODEL_SERVER_VERSION]
        [--pricing-model=PRICING_MODEL] [--serving-stack=SERVING_STACK]
        [--serving-stack-version=SERVING_STACK_VERSION] [--use-case=USE_CASE]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command lists all benchmarking data for a given model and model
    server. By default, the benchmarks are displayed in a CSV format.

    For examples of visualizing the benchmarking data, see the accompanying
    Colab notebook:
    https://colab.research.google.com/github/GoogleCloudPlatform/kubernetes-engine-samples/blob/main/ai-ml/notebooks/giq_visualizations.ipynb

REQUIRED FLAGS
     --model=MODEL
        The model.

     --model-server=MODEL_SERVER
        The model server.

FLAGS
     --format=FORMAT
        The format to print the output in. Default is csvprofile, which
        displays the profile information in a CSV format, including cost
        conversions.

     --instance-type=INSTANCE_TYPE
        The instance type. If not specified, this defaults to any instance
        type.

     --model-server-version=MODEL_SERVER_VERSION
        The model server version. If omitted, the most recently benchmarked
        version is used. Other options include the model server version of a
        profile, or 'all' to return all versions.

     --pricing-model=PRICING_MODEL
        The pricing model to use to calculate token cost. Currently, this
        supports on-demand, spot, 3-years-cud, 1-year-cud.

     --serving-stack=SERVING_STACK
        The serving stack to filter benchmarking data by. If not provided,
        benchmarking data for all serving stacks that support the given model
        and model server will be returned.

     --serving-stack-version=SERVING_STACK_VERSION
        The serving stack version. If omitted, the most recently benchmarked
        version is used. Other options include the serving stack version of a
        profile, or 'all' to return all versions.

     --use-case=USE_CASE
        If specified, results will only show profiles that match the provided
        use case. Options are: Advanced Customer Support, Code Completion, Text
        Summarization, Chatbot (ShareGPT), Code Generation, Deep Research. If
        omitted, defaults to Chatbot (ShareGPT).

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
```

### gcloud container ai profiles list

```text
NAME
    gcloud container ai profiles list - list compatible accelerator profiles

SYNOPSIS
    gcloud container ai profiles list [--format=FORMAT] [--model=MODEL]
        [--model-server=MODEL_SERVER]
        [--model-server-version=MODEL_SERVER_VERSION]
        [--pricing-model=PRICING_MODEL] [--serving-stack=SERVING_STACK]
        [--serving-stack-version=SERVING_STACK_VERSION]
        [--target-cost-per-million-input-tokens=TARGET_COST_PER_MILLION_INPUT_TOKENS]
        [--target-cost-per-million-output-tokens=TARGET_COST_PER_MILLION_OUTPUT_TOKENS]
        [--target-input-length=TARGET_INPUT_LENGTH]
        [--target-itl-milliseconds=TARGET_ITL_MILLISECONDS]
        [--target-ntpot-milliseconds=TARGET_NTPOT_MILLISECONDS]
        [--target-output-length=TARGET_OUTPUT_LENGTH]
        [--target-ttft-milliseconds=TARGET_TTFT_MILLISECONDS]
        [--use-case=USE_CASE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command lists all supported accelerators with their performance
    details. By default, the supported accelerators are displayed in a table
    format with select information for each accelerator. To see all details,
    use --format=yaml or --format=csvprofile.

    To get supported model, model servers, and model server versions, run
    gcloud container ai profiles models list, gcloud container ai profiles
    model-servers list, and gcloud container ai profiles model-server-versions
    list.

FLAGS
     --format=FORMAT
        The output format. Default is profile, which displays the profile
        information in a table format, including cost conversions. csvprofile
        displays the profile information in a CSV format.Options include
        csvprofile, profile, and yaml.

     --model=MODEL
        The model.

     --model-server=MODEL_SERVER
        The model server.

     --model-server-version=MODEL_SERVER_VERSION
        The model server version. If omitted, the most recently benchmarked
        version is used. Other options include the model server version of a
        profile, or 'all' to return all versions.

     --pricing-model=PRICING_MODEL
        The pricing model to use to calculate token cost. Currently, this
        supports on-demand, spot, 3-years-cud, 1-year-cud

     --serving-stack=SERVING_STACK
        The serving stack to filter profiles by. If not provided, profiles for
        all serving stacks that support the given model and model server will
        be returned.

     --serving-stack-version=SERVING_STACK_VERSION
        The serving stack version. If omitted, the most recently benchmarked
        version is used. Other options include the serving stack version of a
        profile, or 'all' to return all versions.

     --target-cost-per-million-input-tokens=TARGET_COST_PER_MILLION_INPUT_TOKENS
        The target cost per million input tokens to filter profiles by, unit is
        1 USD up to 5 decimal places.

     --target-cost-per-million-output-tokens=TARGET_COST_PER_MILLION_OUTPUT_TOKENS
        The target cost per million output tokens to filter profiles by, unit
        is 1 USD up to 5 decimal places.

     --target-input-length=TARGET_INPUT_LENGTH
        If specified, results will only show profiles that have an input length
        within 20% of the specified one. Only works alongside output length.

     --target-itl-milliseconds=TARGET_ITL_MILLISECONDS
        If specified, results will only show profiles with instance types that
        can meet the latency target and will show their throughput performances
        at the target inter-token latency (ITL).

     --target-ntpot-milliseconds=TARGET_NTPOT_MILLISECONDS
        The target normalized time per output token (NTPOT) in milliseconds.
        NTPOT is measured as the request_latency / output_tokens. If this field
        is set, the command will only return accelerators that can meet the
        target ntpot milliseconds and display their throughput performance at
        the target latency. Otherwise, the command will return all accelerators
        and display their highest throughput performance.

     --target-output-length=TARGET_OUTPUT_LENGTH
        If specified, results will only show profiles that have an output
        length within 20% of the specified one. Only works alongside input
        length.

     --target-ttft-milliseconds=TARGET_TTFT_MILLISECONDS
        The target time to first token (TTFT) in milliseconds. TTFT is measured
        as the request_latency / output_tokens. If this field is set, the
        command will only return profiles that can meet the target ttft
        milliseconds and display their throughput performance at the target
        latency. Otherwise, the command will return all profiles and display
        their highest throughput performance.

     --use-case=USE_CASE
        If specified, results will only show profiles that match the provided
        use case. Options are: Advanced Customer Support, Code Completion, Text
        Summarization, Chatbot (ShareGPT), Text Generation, Deep Research

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
```

### gcloud container ai profiles manifests create

```text
NAME
    gcloud container ai profiles manifests create - generate ready-to-deploy
        Kubernetes manifests with compute, load balancing, and autoscaling
        capabilities

SYNOPSIS
    gcloud container ai profiles manifests create
        --accelerator-type=ACCELERATOR_TYPE --model=MODEL
        --model-server=MODEL_SERVER [--model-bucket-uri=MODEL_BUCKET_URI]
        [--model-server-version=MODEL_SERVER_VERSION] [--namespace=NAMESPACE]
        [--output=OUTPUT; default="all"] [--output-path=OUTPUT_PATH]
        [--serving-stack=SERVING_STACK]
        [--serving-stack-version=SERVING_STACK_VERSION]
        [--target-itl-milliseconds=TARGET_ITL_MILLISECONDS]
        [--target-ntpot-milliseconds=TARGET_NTPOT_MILLISECONDS]
        [--target-ttft-milliseconds=TARGET_TTFT_MILLISECONDS]
        [--use-case=USE_CASE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    To get supported model, model servers, and model server versions, run
    gcloud alpha container ai profiles model-and-server-combinations list. To
    get supported accelerators with their performance metrics, run gcloud alpha
    container ai profiles accelerators list.

REQUIRED FLAGS
     --accelerator-type=ACCELERATOR_TYPE
        The accelerator type.

     --model=MODEL
        The model.

     --model-server=MODEL_SERVER
        The model server.

OPTIONAL FLAGS
     --model-bucket-uri=MODEL_BUCKET_URI
        The Google Cloud Storage bucket URI to load the model from. This URI
        must point to the directory containing the model's config file
        (config.json) and model weights. If unspecified, defaults to loading
        the model from Hugging Face.

     --model-server-version=MODEL_SERVER_VERSION
        The model server version. If omitted, the most recently benchmarked
        version is used.

     --namespace=NAMESPACE
        The namespace to deploy the manifests in. Default namespace is
        'default'.

     --output=OUTPUT; default="all"
        The output to display. Default is all. OUTPUT must be one of: manifest,
        comments, all.

     --output-path=OUTPUT_PATH
        The path to save the output to. If not specified, output to the
        terminal.

     --serving-stack=SERVING_STACK
        The serving stack to filter manifests by. If not provided, will default
        to none.

     --serving-stack-version=SERVING_STACK_VERSION
        The serving stack version. If omitted, the most recently benchmarked
        version is used.

     --target-itl-milliseconds=TARGET_ITL_MILLISECONDS
        The target inter-token latency (ITL) in milliseconds. If this is set,
        the manifest will include Horizontal Pod Autoscaler (HPA) resources
        which automatically adjust the model server replica count in response
        to changes in model server load to keep p50 ITL below the specified
        threshold. If the provided target-itl-milliseconds is too low to
        achieve, the HPA manifest will not be generated.

     --target-ntpot-milliseconds=TARGET_NTPOT_MILLISECONDS
        The maximum normalized time per output token (NTPOT) in milliseconds.
        NTPOT is measured as the request_latency / output_tokens. If this is
        set, the manifests will include Horizontal Pod Autoscaler (HPA)
        resources which automatically adjust the model server replica count in
        response to changes in model server load to keep p50 NTPOT below the
        specified threshold. If the provided target-ntpot-milliseconds is too
        low to achieve, the HPA manifest will not be generated.

     --target-ttft-milliseconds=TARGET_TTFT_MILLISECONDS
        If specified, results will only show accelerators that can meet the
        latency target and will show their throughput performances at the
        target ttft target to achieve, the HPA manifest will not be generated.

     --use-case=USE_CASE
        The manifest will be optimized for this use case. Options are: Advanced
        Customer Support, Code Completion, Text Summarization, Chatbot
        (ShareGPT), Code Generation, Deep Research. If omitted, defaults to
        Chatbot (ShareGPT).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha container ai profiles manifests create
```

### gcloud container ai profiles model-server-versions list

```text
NAME
    gcloud container ai profiles model-server-versions list - list supported
        model server versions

SYNOPSIS
    gcloud container ai profiles model-server-versions list --model=MODEL
        --model-server=MODEL_SERVER [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    To get supported model and model servers, run gcloud container ai profiles
    models list and gcloud container ai profiles model-servers list.

REQUIRED FLAGS
     --model=MODEL
        The model.

     --model-server=MODEL_SERVER
        The model server. If not specified, this defaults to any model server.

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
    This variant is also available:

        $ gcloud alpha container ai profiles model-server-versions list
```

### gcloud container ai profiles model-servers list

```text
NAME
    gcloud container ai profiles model-servers list - list supported model
        servers for a given model

SYNOPSIS
    gcloud container ai profiles model-servers list --model=MODEL
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    To get supported models, run gcloud container ai profiles models list.

REQUIRED FLAGS
     --model=MODEL
        The model.

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
    This variant is also available:

        $ gcloud alpha container ai profiles model-servers list
```

### gcloud container ai profiles models list

```text
NAME
    gcloud container ai profiles models list - list supported models

SYNOPSIS
    gcloud container ai profiles models list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List supported models.

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
    This variant is also available:

        $ gcloud alpha container ai profiles models list
```

### gcloud container ai profiles serving-stack-versions list

```text
NAME
    gcloud container ai profiles serving-stack-versions list - list supported
        serving stack versions that were used to generate the inference
        profiles

SYNOPSIS
    gcloud container ai profiles serving-stack-versions list
        --serving-stack=SERVING_STACK [--model=MODEL]
        [--model-server=MODEL_SERVER] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List supported serving stack versions that were used to generate the
    inference profiles.

REQUIRED FLAGS
     --serving-stack=SERVING_STACK
        The serving stack to filter serving stack versions by.

FLAGS
     --model=MODEL
        The model to filter serving stack versions by.

     --model-server=MODEL_SERVER
        The model server to filter serving stack versions by.

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
```

### gcloud container ai profiles serving-stacks list

```text
NAME
    gcloud container ai profiles serving-stacks list - list supported serving
        stacks that were used to generate the inference profiles

SYNOPSIS
    gcloud container ai profiles serving-stacks list [--model=MODEL]
        [--model-server=MODEL_SERVER] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List supported serving stacks that were used to generate the inference
    profiles.

FLAGS
     --model=MODEL
        The model to filter serving stacks by.

     --model-server=MODEL_SERVER
        The model server to filter serving stacks by.

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
```

### gcloud container ai profiles use-case list

```text
NAME
    gcloud container ai profiles use-case list - list supported use cases that
        were used to generate the inference profiles

SYNOPSIS
    gcloud container ai profiles use-case list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List supported use cases that were used to generate the inference profiles.

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
```

### gcloud alpha container ai profiles accelerators list

```text
NAME
    gcloud alpha container ai profiles accelerators list - list compatible
        accelerator profiles

SYNOPSIS
    gcloud alpha container ai profiles accelerators list --model=MODEL
        [--format=FORMAT] [--max-ntpot-milliseconds=MAX_NTPOT_MILLISECONDS]
        [--model-server=MODEL_SERVER]
        [--model-server-version=MODEL_SERVER_VERSION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container ai profiles manifests create

```text
NAME
    gcloud alpha container ai profiles manifests create - generate
        ready-to-deploy Kubernetes manifests with compute, load balancing, and
        autoscaling capabilities

SYNOPSIS
    gcloud alpha container ai profiles manifests create
        --accelerator-type=ACCELERATOR_TYPE --model=MODEL
        --model-server=MODEL_SERVER
        [--model-server-version=MODEL_SERVER_VERSION] [--namespace=NAMESPACE]
        [--output=OUTPUT; default="all"] [--output-path=OUTPUT_PATH]
        [--target-ntpot-milliseconds=TARGET_NTPOT_MILLISECONDS]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container ai profiles model-and-server-combinations list

```text
NAME
    gcloud alpha container ai profiles model-and-server-combinations list -
        list supported model and server combinations

SYNOPSIS
    gcloud alpha container ai profiles model-and-server-combinations list
        [--model=MODEL] [--model-server=MODEL_SERVER]
        [--model-server-version=MODEL_SERVER_VERSION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container ai profiles model-server-versions list

```text
NAME
    gcloud alpha container ai profiles model-server-versions list - list
        supported model server versions

SYNOPSIS
    gcloud alpha container ai profiles model-server-versions list --model=MODEL
        --model-server=MODEL_SERVER [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container ai profiles model-servers list

```text
NAME
    gcloud alpha container ai profiles model-servers list - list supported
        model servers for a given model

SYNOPSIS
    gcloud alpha container ai profiles model-servers list --model=MODEL
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container ai profiles models list

```text
NAME
    gcloud alpha container ai profiles models list - list supported models

SYNOPSIS
    gcloud alpha container ai profiles models list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/ai (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
