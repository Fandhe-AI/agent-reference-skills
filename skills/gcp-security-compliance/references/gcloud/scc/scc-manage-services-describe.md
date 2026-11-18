---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/describe
---

# gcloud scc manage services describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc manage services describe

```text
NAME
    gcloud scc manage services describe - get the details of a Security Command
        Center service

SYNOPSIS
    gcloud scc manage services describe SERVICE_NAME
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter-modules=FILTER_MODULES]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the details of a Security Command Center service. It resolves INHERITED
    enablement states to ENABLED or DISABLED for services at ancestor levels.
    For example, if the service is enabled at the ancestor level, services for
    all child resources will have the enablement state set to ENABLED.

EXAMPLES
    To get the details of a Security Command Center service with name sha for
    organization 123, run:

        $ gcloud scc manage services describe sha --organization=123

    To get the details of a Security Command Center service with name sha for
    folder 456, run:

        $ gcloud scc manage services describe sha --folder=456

    To get the details of a Security Command Center service with ID sha for
    project 789, run:

        $ gcloud scc manage services describe sha --project=789

    You can also specify the parent more generally:

        $ gcloud scc manage services describe sha --parent=organizations/123

    To get the details of modules, [ABC, DEF] of a Security Command Center
    service with name sha for organization 123, run:

        $ gcloud scc manage services describe sha --module-list=[ABC, DEF] \
            --organization=123

POSITIONAL ARGUMENTS
     SERVICE_NAME
        The service name, provided either in lowercase hyphenated form (e.g.
        security-health-analytics), or in abbreviated form (e.g. sha) if
        applicable.

        The list of supported services is:

        * security-health-analytics (can be abbreviated as sha)

        * event-threat-detection (can be abbreviated as etd)

        * container-threat-detection (can be abbreviated as ctd)

        * vm-threat-detection (can be abbreviated as vmtd)

        * web-security-scanner (can be abbreviated as wss)

        * vm-threat-detection-aws (can be abbreviated as vmtd-aws)

        * cloud-run-threat-detection (can be abbreviated as crtd)

        * external-exposure (can be abbreviated as ee)

        * vm-manager (can be abbreviated as vmm)

        * ec2-vulnerability-assessment (can be abbreviated as ec2-va)

        * gce-vulnerability-assessment (can be abbreviated as gce-va)

        * azure-vulnerability-assessment (can be abbreviated as azure-va)

        * notebook-security-scanner (can be abbreviated as nss)

        * agent-engine-threat-detection (can be abbreviated as aetd)

REQUIRED FLAGS
     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder associated with the custom module.

       --organization=ORGANIZATION_ID
          Organization associated with the custom module.

       --parent=PARENT
          Parent associated with the custom module. Can be one of
          organizations/<id>, projects/<id or name>, folders/<id>

       --project=PROJECT_ID_OR_NUMBER
          Project associated with the custom module.

OPTIONAL FLAGS
     --filter-modules=FILTER_MODULES
        If provided, only prints module information for modules specified in
        the list. Provided as a comma separated list of module names in
        SCREAMING_SNAKE_CASE format (e.g. WEB_UI_ENABLED, API_KEY_NOT_ROTATED).
        A single module name is also valid.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha scc manage services describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud scc manage services describe sha \
    --filter-modules=ABC,DEF \
    --organization=123
```

### gcloud alpha scc manage services describe

```text
NAME
    gcloud alpha scc manage services describe - get the details of a Security
        Command Center service

SYNOPSIS
    gcloud alpha scc manage services describe SERVICE_NAME
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID | --parent=PARENT
          | --project=PROJECT_ID_OR_NUMBER) [--filter-modules=FILTER_MODULES]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `describe` example passes `--module-list=[ABC, DEF]`, which is not a flag of this command (gcloud 593.0.0: "unrecognized arguments: --module-list=[ABC, (did you mean '--filter-modules'?) DEF]"); the SYNOPSIS flag is `--filter-modules`, a "comma separated list of module names", so the runnable form passes `--filter-modules=ABC,DEF`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/manage/services/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
