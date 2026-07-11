# Single-cell RNA Sequencing

Run an end-to-end GPU-accelerated single-cell RNA-seq (scRNA-seq) workflow using RAPIDS-singlecell (Scanpy-compatible API) for preprocessing, clustering, batch correction, and differential expression.

## Signature / Usage

```bash
git clone https://github.com/NVIDIA/dgx-spark-playbooks
./start_playbook.sh
# open JupyterLab, run scRNA_analysis_preprocessing.ipynb
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| RAPIDS 25.10 Notebooks | container | includes RAPIDS-singlecell, cuDF, cuML, cuGraph |

## Notes

- Requires min 40GB unified memory, 30GB+ storage, Docker
- Runs on sparse count matrices directly on GPU
- Duration: ~15 minutes (2-3 minutes notebook processing)

## Related

- [CUDA-X Data Science](./cuda-x-data-science.md)
- [Portfolio Optimization](./portfolio-optimization.md)
