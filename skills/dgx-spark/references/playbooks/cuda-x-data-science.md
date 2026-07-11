# CUDA-X Data Science

Accelerate pandas and scikit-learn workloads on DGX Spark with zero code changes using NVIDIA cuDF and cuML (RAPIDS) via two demonstration notebooks.

## Signature / Usage

```bash
conda create -n rapids-test -c rapidsai -c conda-forge -c nvidia rapids=* python=3.12 cuda-version=13.0
conda activate rapids-test
jupyter notebook cudf_pandas_demo.ipynb
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| cuDF | library | GPU-accelerated dataframe operations, drop-in pandas accelerator |
| cuML | library | GPU-accelerated ML: LinearSVC, UMAP, HDBSCAN |

## Notes

- Requires conda and a Kaggle API key for dataset download
- Demonstrated on datasets up to 8GB
- Duration: 20-30 minutes setup, 2-3 minutes per notebook run

## Related

- [DGX Dashboard](./dgx-dashboard.md)
