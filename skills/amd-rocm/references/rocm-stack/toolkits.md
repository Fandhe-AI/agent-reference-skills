# Toolkits

Open-source collections of ROCm-accelerated libraries for building high-performance domain-specific applications, the fourth top-level section of the ROCm docs landing page.

## Signature / Usage

```text
Available toolkits (ROCm 7.14.0 landing page):
  - ROCm Data Science
  - ROCm Finance
  - ROCm Life Science
  - ROCm LLMExt
  - ROCm Simulation
```

## Options / Props

| Toolkit | Domain |
| --- | --- |
| ROCm Data Science | Data-science workloads accelerated on ROCm |
| ROCm Finance | Financial-computing workloads accelerated on ROCm |
| ROCm Life Science | Life-science / bioinformatics workloads accelerated on ROCm |
| ROCm LLMExt | Large language model extensions/tooling on ROCm |
| ROCm Simulation | Simulation workloads accelerated on ROCm |

## Notes

- ROCm 7.14.0. Each toolkit is its own open-source library collection layered on top of the Core SDK (math/compute libraries, HIP runtime); this page is a catalog entry point, not a per-toolkit API reference
- Toolkit-level API detail is out of scope for `rocm-stack` — the underlying Core SDK libraries each toolkit builds on are covered in [math-compute-libraries.md](./math-compute-libraries.md) and [communication-libraries.md](./communication-libraries.md)

## Related

- [What is ROCm](./what-is-rocm.md)
- [AI Ecosystem](./ai-ecosystem.md)
