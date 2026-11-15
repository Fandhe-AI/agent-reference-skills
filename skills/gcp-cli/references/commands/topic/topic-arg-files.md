---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/arg-files
---

# gcloud topic arg-files

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic arg-files

```text
NAME
    gcloud topic arg-files - supplementary help for arg-files to be used with
        gcloud firebase test

DESCRIPTION
    Supplementary help for arg-files to be used with gcloud firebase test.

    All gcloud firebase test android run arguments may be specified by flags on
    the command line and/or via a YAML-formatted ARG_FILE. The optional,
    positional ARG_SPEC argument on the command line is used to specify a
    single ARG_FILE:ARG_GROUP_NAME pair, where ARG_FILE is the path to the YAML
    argument file, and ARG_GROUP_NAME is the name of the argument group to load
    and parse. The ARG_FILE must contain valid YAML syntax or gcloud will
    respond with an error.

    The basic format of a YAML argument file is:

        arg-group1:
          arg1: value1  # a comment
          arg2: value2
          ...

        # Another comment
        arg-group2:
          arg3: value3
          ...

    List arguments may be specified within square brackets:

        directories-to-pull: [/sdcard/dir1, /data/dir2]

    or by using the alternate YAML list notation with one dash per list item:

        directories-to-pull:
          - /sdcard/dir1
          - /data/dir2

    If a list argument only contains a single value, you may omit the square
    brackets:

        directories-to-pull: /sdcard/dir1

    Composition

    A special include: [ARG_GROUP1, ...] syntax allows merging or composition
    of argument groups (see EXAMPLES below). Included argument groups can
    include: other argument groups within the same YAML file, with unlimited
    nesting.

    Precedence

    An argument which appears on the command line has the highest precedence
    and will override the same argument if it is specified within an argument
    file.

    Any argument defined directly within a group will have higher precedence
    than an identical argument which is merged into that group using the
    include: keyword.

EXAMPLES
    Here are the contents of a very simple YAML argument file which is assumed
    to be stored in a file named excelsior_args.yaml:

        # Run a quick 'robo' test on the 'Excelsior' app for
        # 90 seconds using only the default Test Lab device.
        quick-robo-test:
          app: path/to/excelsior.apk
          type: robo
          max-steps: 100
          timeout: 90s
          async: true

    To invoke this test, run:

        $ gcloud firebase test android run \
            excelsior_args.yaml:quick-robo-test

    To select which device(s) you wish to test against in an argument file, use
    device: to specify one or more devices, with each device having one or more
    dimensions. For example, to specify the LG G3 device in the Chinese locale
    and with landscape orientation, use:

        single-device-group:
          device: [{model: g3, orientation: landscape, locale: zh}]

    To specify multiple devices, use any of the following equivalent YAML
    formats:

        multi-device-group1:
          device: [{model: flo}, {model: g3, version: 19, locale: zh}, {model: mako, version: 21}]

        multi-device-group2:
          device:
            - {model: flo}
            - {model: g3, version: 19, locale: zh}
            - {model: mako, version: 21}

        multi-device-group3:
          device:
            - model: flo
            - model: g3
              version: 19
              locale: zh
            - model: mako
              version: 21

    If your app has a login screen, or has additional UI elements which require
    input text, you may specify the resource names of the Android target UI
    elements, along with their corresponding input values, in the
    'robo-directives' map argument. You may also specify the elements which the
    Robo test should prioritize clicking. In the example below,
    "username_resource" is the resource name of the username field and
    "username" is the input for that field (similarly for password), and
    "signin_button_resource" is the resource name of the sign in button.

        # Run a 'robo' test on the 'Excelsior' app with login credentials.
        robo-test-with-login:
          app: path/to/excelsior.apk
          type: robo
          robo-directives:
            "text:username_resource": username
            "text:password_resource": password
            "click:sigin_button_resource": ""

    Assuming the above YAML text is appended to the arg-file named
    excelsior_args.yaml, you may invoke the test by running:

        $ gcloud firebase test android run \
            excelsior_args.yaml:robo-test-with-login

    Here is a slightly more complicated example which demonstrates composition
    of argument groups using the legacy device dimension arguments (device: is
    now the preferred way to specify test devices). Assume the following YAML
    text is appended to the arg-file shown above named excelsior_args.yaml:

        # Specify some unit tests to be run against a test matrix
        # with one device type, two Android versions, and four
        # locales, for a total of eight test variations (1*2*4).
        unit-tests:
          type: instrumentation
          app: path/to/excelsior.apk
          test: path/to/excelsior-test.apk  # the unit tests
          timeout: 10m
          device-ids: NexusLowRes
          include: [supported-versions, supported-locales]

        supported-versions:
          os-version-ids: [21, 22]

        supported-locales:
          locales: [en, es, fr, it]

    To invoke this test matrix, run:

        $ gcloud firebase test android run excelsior_args.yaml:unit-tests

    To run these unit tests with the same locales and os-version-ids, but
    substituting a sampling of three physical Android devices instead of the
    single virtual NexusLowRes device, run:

        $ gcloud firebase test android run excelsior_args.yaml:unit-tests \
            --device-ids shamu,htc_m8,g3

    In the last example, the --device-ids argument on the command line
    overrides the device-ids: specification inside the arg-file because
    command-line arguments have higher precedence.

NOTES
    These variants are also available:

        $ gcloud alpha topic arg-files

        $ gcloud beta topic arg-files
```

### gcloud beta topic arg-files

```text
NAME
    gcloud beta topic arg-files - supplementary help for arg-files to be used
        with gcloud firebase test
```

### gcloud alpha topic arg-files

```text
NAME
    gcloud alpha topic arg-files - supplementary help for arg-files to be used
        with gcloud firebase test
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/arg-files (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
