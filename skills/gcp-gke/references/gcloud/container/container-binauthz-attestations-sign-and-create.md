---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/binauthz/attestations/sign-and-create
---

# gcloud container binauthz attestations sign-and-create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container binauthz attestations sign-and-create

```text
NAME
    gcloud beta container binauthz attestations sign-and-create - sign and
        create a Binary Authorization Attestation using a Cloud KMS key

SYNOPSIS
    gcloud beta container binauthz attestations sign-and-create
        --artifact-url=ARTIFACT_URL
        (--keyversion=KEYVERSION : --keyversion-key=KEYVERSION_KEY
          --keyversion-keyring=KEYVERSION_KEYRING
          --keyversion-location=KEYVERSION_LOCATION
          --keyversion-project=KEYVERSION_PROJECT)
        [--dsse-type=DSSE_TYPE;
          default="application/vnd.dev.cosign.simplesigning.v1+json"]
        [--pae-encode-payload]
        [--public-key-id-override=PUBLIC_KEY_ID_OVERRIDE]
        [[--note=NOTE : --note-project=NOTE_PROJECT]
          | --validate [--attestor=ATTESTOR
          : --attestor-project=ATTESTOR_PROJECT]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container binauthz attestations sign-and-create

```text
NAME
    gcloud alpha container binauthz attestations sign-and-create - sign and
        create a Binary Authorization Attestation using a Cloud KMS key

SYNOPSIS
    gcloud alpha container binauthz attestations sign-and-create
        --artifact-url=ARTIFACT_URL
        (--keyversion=KEYVERSION : --keyversion-key=KEYVERSION_KEY
          --keyversion-keyring=KEYVERSION_KEYRING
          --keyversion-location=KEYVERSION_LOCATION
          --keyversion-project=KEYVERSION_PROJECT)
        [--dsse-type=DSSE_TYPE;
          default="application/vnd.dev.cosign.simplesigning.v1+json"]
        [--pae-encode-payload]
        [--public-key-id-override=PUBLIC_KEY_ID_OVERRIDE]
        [[--note=NOTE : --note-project=NOTE_PROJECT]
          | --validate [--attestor=ATTESTOR
          : --attestor-project=ATTESTOR_PROJECT]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/binauthz/attestations/sign-and-create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
