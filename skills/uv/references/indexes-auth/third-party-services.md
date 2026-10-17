---
source: https://docs.astral.sh/uv/concepts/authentication/third-party/
---

# Third-party services

Authentication with alternative package indexes and Hugging Face.

## Signature / Usage

```console
$ HF_TOKEN=hf_... uv run https://huggingface.co/datasets/<user>/<name>/resolve/<branch>/main.py
```

## Authentication with alternative package indexes

The documentation has dedicated guides for popular alternative Python package indexes:

| Service | Guide |
|---------|-------|
| Azure Artifacts | https://docs.astral.sh/uv/guides/integration/azure/ |
| Google Artifact Registry | https://docs.astral.sh/uv/guides/integration/google/ |
| AWS CodeArtifact | https://docs.astral.sh/uv/guides/integration/aws/ |
| JFrog Artifactory | https://docs.astral.sh/uv/guides/integration/jfrog/ |

## Hugging Face support

uv supports automatic authentication for the Hugging Face Hub. If the `HF_TOKEN` environment variable is set, uv propagates it to requests to `huggingface.co`. This is useful for accessing private scripts in Hugging Face Datasets, as in the command above.

Disable automatic Hugging Face authentication by setting `UV_NO_HF_TOKEN=1`.

## Related

- [Index authentication](./index-authentication.md)
- [Authentication](./authentication.md)
