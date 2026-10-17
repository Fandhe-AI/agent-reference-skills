---
source: https://docs.astral.sh/uv/guides/integration/coiled/
---

# Using uv with Coiled

Run a self-contained script with inline metadata on cloud hardware through Coiled.

```python
# COILED container ghcr.io/astral-sh/uv:debian-slim
# COILED region us-east-2

# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "pandas",
#   "pyarrow",
#   "s3fs",
# ]
# ///

import pandas as pd

df = pd.read_parquet(
    "s3://coiled-data/uber/part.0.parquet",
    storage_options={"anon": True},
)
print(df.head())
```

```bash
$ uv run process.py
$ uvx coiled login
$ uvx coiled batch run \
    uv run process.py
```

## Notes

- The first command runs the script locally; `coiled batch run` runs the same `uv run` command on a cloud VM.
- The `# COILED container` comment selects the official uv Docker image so uv is available; `# COILED region` pins the AWS region (remove it for other clouds).
- Monitor jobs with `coiled batch status`, `coiled batch wait`, and `coiled batch logs`.
