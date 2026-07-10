# Portfolio Optimization

Run a GPU-accelerated Mean-CVaR portfolio optimization workflow using NVIDIA cuOpt (LP/MILP solvers) and cuML (KDE for return distributions) on DGX Spark.

## Signature / Usage

```bash
git clone https://github.com/NVIDIA-AI-Blueprints/quantitative-portfolio-optimization
./start_playbook.sh
# open JupyterLab, select "Portfolio Optimization" kernel, run cvar_basic.ipynb
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| RAPIDS 25.10 Notebooks | container | includes cuOpt, cuML, cuDF, cuGraph |

## Notes

- Requires min 40GB unified memory, 30GB+ storage, Docker, Git
- Implements real-world constraints: concentration, leverage, turnover, cardinality limits
- Duration: ~20 minutes setup, ~7 minutes notebook processing

## Related

- [CUDA-X Data Science](./cuda-x-data-science.md)
