---
source: https://docs.astral.sh/uv/reference/policies/python/
---

# Python support policy

Tier 1 / 2 / 3 support levels for Python versions and implementations in uv.

## Signature / Usage

```text
Tier 1: "guaranteed to work" (continuously tested)
Tier 2: "expected to work"
Tier 3: "should work"
```

## Options / Props

Python versions:

| Tier | Versions |
| --- | --- |
| Tier 1 | 3.10, 3.11, 3.12, 3.13, 3.14, 3.15 |
| Tier 2 | 3.6, 3.7, 3.8, 3.9 |
| Unsupported | Python versions prior to 3.6 |

Python implementations:

| Tier | Implementations |
| --- | --- |
| Tier 1 | CPython |
| Tier 2 | PyPy, GraalPy, Pyodide |
| Tier 3 | Pyston |

## Notes

- Tier 1 support can be thought of as "guaranteed to work". uv is continuously tested against these versions.
- Tier 2 Python versions: uv is "expected to work" with these versions. uv is tested against them, but they have reached their end-of-life and no longer receive security fixes. We do not recommend using these versions.
- uv does not work with Python versions prior to 3.6.
- Tier 1 implementation: uv supports managed installations of these implementations, and the builds are maintained by Astral.
- Tier 2 implementations: uv is "expected to work" with these implementations. uv also supports managed installations of them, but the builds are not maintained by Astral.
- Tier 3: uv "should work" with Pyston, but stability may vary.

## Related

- [Python versions](./python-versions.md)
- [Managed Python distributions](./managed-distributions.md)
