# DGX Dashboard (Playbook)

Monitor system resources and launch JupyterLab from the locally-running DGX Dashboard web app, accessible via desktop shortcut, NVIDIA Sync, or SSH tunnel.

## Signature / Usage

```bash
ssh -L 11000:localhost:11000 <user>@spark-abcd.local
# then open http://localhost:11000
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| stabilityai/stable-diffusion-xl-base-1.0 | model | sample AI workload used to validate JupyterLab GPU access |

## Notes

- Requires NVIDIA DGX OS; remote access needs NVIDIA Sync or manual SSH tunnel
- Dashboard Settings page also manages system updates
- Duration: 15-30 minutes; Risk: Low

## Related

- [Set Up Local Network Access](./connect-to-your-spark.md)
- [CUDA-X Data Science](./cuda-x-data-science.md)
