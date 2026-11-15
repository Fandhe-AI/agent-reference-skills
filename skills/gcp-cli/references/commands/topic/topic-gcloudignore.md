---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/gcloudignore
---

# gcloud topic gcloudignore

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic gcloudignore

```text
NAME
    gcloud topic gcloudignore - reference for .gcloudignore files

DESCRIPTION
    Several commands in gcloud involve uploading the contents of a directory to
    Google Cloud to host or build. In many cases, you will not want to upload
    certain files (i.e., "ignore" them).

    If there is a file called .gcloudignore within the top-level directory
    being uploaded, the files that it specifies (see "SYNTAX") will be ignored.

    Gcloud commands may generate a .gcloudignore file; see the individual
    command help page for details.

    The following gcloud commands respect the .gcloudignore file:

      o gcloud app deploy
      o gcloud alpha app migrate-to-run
      o gcloud beta app migrate-to-run
        * Note: If you add app.yaml to the .gcloudignore file, the above
          commands will fail.
      o gcloud functions deploy
      o gcloud builds submit
      o gcloud composer environments storage {dags, data, plugins} import
      o gcloud container builds submit
      o gcloud run deploy
      o gcloud run jobs deploy
      o gcloud run worker-pools deploy
      o gcloud alpha deploy releases create
      o gcloud beta deploy releases create
      o gcloud deploy releases create
      o gcloud infra-manager deployments apply
      o gcloud infra-manager previews create
      o gcloud alpha functions local deploy
      o gcloud alpha run jobs deploy
      o gcloud beta run jobs deploy
      o gcloud alpha run worker-pools deploy
      o gcloud beta run worker-pools deploy
      o gcloud alpha run instances dev sync
      o gcloud beta run instances dev sync

    To globally disable .gcloudignore parsing (including default file-ignore
    behavior), run:

        $ gcloud config set gcloudignore/enabled false

    The default content of the generated .gcloudignore file, which can be
    overridden with --ignore-file, is as follows:

        .gcloudignore
        .git
        .gitignore

EXAMPLES
    This .gcloudignore would prevent the upload of the node_modules/ directory
    and any files ending in ~:

        /node_modules/
        *~

    This .gcloudignore (similar to the one generated when Git files are
    present) would prevent the upload of the .gcloudignore file, the .git
    directory, and any files in ignored in the .gitignore file:

        .gcloudignore
        # If you would like to upload your .git directory, .gitignore file or
        # files from your .gitignore file, remove the corresponding line below:
        .git
        .gitignore
        #!include:.gitignore

SYNTAX
    The syntax of .gcloudignore borrows heavily from that of .gitignore; see
    https://git-scm.com/docs/gitignore or man gitignore for a full reference.

    Each line in a .gcloudignore is one of the following:

      o pattern: a pattern specifies file names to ignore (or explicitly
        include) in the upload. If multiple patterns match the file name, the
        last matching pattern takes precedence.
      o comment: comments begin with # and are ignored (see "ADVANCED TOPICS"
        for an exception). If you want to include a # at the beginning of a
        pattern, you must escape it: \#.
      o blank line: A blank line is ignored and useful for readability.

    Some example patterns follow; see the full reference
    (https://git-scm.com/docs/gitignore or man gitignore) for details.

    To ignore any file named foo, and any file in the root of the upload
    directory named bar:

        foo
        /bar

    To ignore any file starting with foo, ending with bar, or starting with baz
    and ending with qux:

        foo*
        *bar
        baz*qux

    To explicitly include any file named foo (useful if foo was excluded
    earlier in the file) and ignore a file named !bar:

        !foo
        \!bar

    To ignore any directory foo and all its contents (though not a file foo),
    any file baz, and the directory qux and all its contents:

        foo/
        **/baz
        qux/**

  ADVANCED TOPICS
    In order to ignore files specified in the gitignore file, there is a
    special comment syntax:

        #!include:.gitignore

    This will insert the content of a .gitignore-style file named .gitignore at
    the point of the include line. It does not recurse (that is, the included
    file cannot #!include another file) and cannot be anywhere but the
    top-level directory to be uploaded.

    To display files that will be uploaded run:

        gcloud meta list-files-for-upload

NOTES
    These variants are also available:

        $ gcloud alpha topic gcloudignore

        $ gcloud beta topic gcloudignore
```

### gcloud beta topic gcloudignore

```text
NAME
    gcloud beta topic gcloudignore - reference for .gcloudignore files
```

### gcloud alpha topic gcloudignore

```text
NAME
    gcloud alpha topic gcloudignore - reference for .gcloudignore files
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/gcloudignore (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
