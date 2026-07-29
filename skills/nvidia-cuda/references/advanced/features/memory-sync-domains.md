# Memory Synchronization Domains

Assigns kernel launches to logical "domains" (`cudaLaunchAttributeMemSyncDomain`) so memory fence traffic from unrelated workloads (e.g. a communication library vs. compute kernels) does not interfere with each other's fence latency on the same GPU.

## Signature / Usage

```c
cudaLaunchAttribute domainAttr;
domainAttr.id = cudaLaunchAttrMemSyncDomain;
domainAttr.val = cudaLaunchMemSyncDomainRemote;
cudaLaunchConfig_t config;
config.attrs = &domainAttr;
config.numAttrs = 1;
cudaLaunchKernelEx(&config, myKernel, kernelArg1, kernelArg2);
```

## Options / Props

| Name | Description |
| --- | --- |
| `cudaLaunchAttributeMemSyncDomain` | Launch attribute assigning a kernel to a memory-fence domain (`cudaLaunchMemSyncDomainDefault` or `cudaLaunchMemSyncDomainRemote`). |
| `cudaLaunchAttributeMemSyncDomainMap` | Launch attribute remapping logical domains to physical domains for a specific launch. |
| `cudaLaunchMemSyncDomainDefault` / `cudaLaunchMemSyncDomainRemote` | The two logical domain values available for `cudaLaunchAttributeMemSyncDomain`. |
| `cudaDevAttrMemSyncDomainCount` | Device attribute reporting how many physical sync domains the device supports. |
| `cudaStreamSetAttribute` | Can also apply a memory sync domain at stream granularity rather than per-launch. |

## Notes

- Ordering or synchronization between distinct domains on the same GPU requires system-scope fencing — code cannot assume device-scope fences alone provide cross-domain ordering.
- This feature is primarily intended to isolate fence-heavy communication libraries (e.g. NCCL-style remote/network operations) from compute kernels sharing the same GPU, so one workload's fences don't add latency to the other's.

## Related

- [L2 Cache Control](./l2-cache-control.md)
- [Advanced CUDA APIs and Features](../core/advanced-host-programming.md)
