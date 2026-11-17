---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/mcp-transcoders
---

# gcloud network-services mcp-transcoders

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha network-services mcp-transcoders create

```text
NAME
    gcloud alpha network-services mcp-transcoders create - create an MCP
        Transcoder

SYNOPSIS
    gcloud alpha network-services mcp-transcoders create MCP_TRANSCODER
        --agent-gateway=AGENT_GATEWAY --endpoints=[ENDPOINTS,...]
        --mcp-server-url=MCP_SERVER_URL [--async] [--description=DESCRIPTION]
        [--etag=ETAG] [--labels=[LABELS,...]] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services mcp-transcoders delete

```text
NAME
    gcloud alpha network-services mcp-transcoders delete - delete an MCP
        Transcoder

SYNOPSIS
    gcloud alpha network-services mcp-transcoders delete
        (MCP_TRANSCODER : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services mcp-transcoders describe

```text
NAME
    gcloud alpha network-services mcp-transcoders describe - get details of an
        MCP Transcoder

SYNOPSIS
    gcloud alpha network-services mcp-transcoders describe
        (MCP_TRANSCODER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services mcp-transcoders list

```text
NAME
    gcloud alpha network-services mcp-transcoders list - list MCP Transcoders

SYNOPSIS
    gcloud alpha network-services mcp-transcoders list --location=LOCATION
        [--return-partial-success] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services mcp-transcoders refresh

```text
NAME
    gcloud alpha network-services mcp-transcoders refresh - refresh an MCP
        Transcoder

SYNOPSIS
    gcloud alpha network-services mcp-transcoders refresh
        (MCP_TRANSCODER : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-services mcp-transcoders update

```text
NAME
    gcloud alpha network-services mcp-transcoders update - update an MCP
        Transcoder

SYNOPSIS
    gcloud alpha network-services mcp-transcoders update MCP_TRANSCODER
        [--agent-gateway=AGENT_GATEWAY] [--async] [--description=DESCRIPTION]
        [--endpoints=[ENDPOINTS,...]] [--etag=ETAG] [--location=LOCATION]
        [--mcp-server-url=MCP_SERVER_URL]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/network-services/mcp-transcoders (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
