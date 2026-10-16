# D3D12 debug layer, GPU-based validation, and DRED: ID3D12Debug1::SetEnableGPUBasedValidation, ID3D12DeviceRemovedExtendedDataSettings

Diagnostics for Direct3D 12: the debug layer (CPU-timeline validation), GPU-based validation (GBV, validation on the GPU timeline via patched shaders), and Device Removed Extended Data (DRED) for diagnosing device removal and GPU page faults.

## Signature / Usage

```cpp
// Enable GPU-based validation (before creating the D3D12 device).
void EnableShaderBasedValidation()
{
    CComPtr<ID3D12Debug> spDebugController0;
    CComPtr<ID3D12Debug1> spDebugController1;
    VERIFY(D3D12GetDebugInterface(IID_PPV_ARGS(&spDebugController0)));
    VERIFY(spDebugController0->QueryInterface(IID_PPV_ARGS(&spDebugController1)));
    spDebugController0->EnableDebugLayer(); // GBV requires the debug layer
    spDebugController1->SetEnableGPUBasedValidation(true);
}
```

```cpp
// Configure DRED (process-global; before creating the device).
CComPtr<ID3D12DeviceRemovedExtendedDataSettings> pDredSettings;
VERIFY_SUCCEEDED(D3D12GetDebugInterface(IID_PPV_ARGS(&pDredSettings)));

// Turn on auto-breadcrumbs and page fault reporting.
pDredSettings->SetAutoBreadcrumbsEnablement(D3D12_DRED_ENABLEMENT_FORCED_ON);
pDredSettings->SetPageFaultEnablement(D3D12_DRED_ENABLEMENT_FORCED_ON);
```

```cpp
// After device removal (e.g. Present returns DXGI_ERROR_DEVICE_REMOVED).
void MyDeviceRemovedHandler(ID3D12Device * pDevice)
{
    CComPtr<ID3D12DeviceRemovedExtendedData> pDred;
    VERIFY_SUCCEEDED(pDevice->QueryInterface(IID_PPV_ARGS(&pDred)));
    D3D12_DRED_AUTO_BREADCRUMBS_OUTPUT DredAutoBreadcrumbsOutput;
    D3D12_DRED_PAGE_FAULT_OUTPUT DredPageFaultOutput;
    VERIFY_SUCCEEDED(pDred->GetAutoBreadcrumbsOutput(&DredAutoBreadcrumbsOutput));
    VERIFY_SUCCEEDED(pDred->GetPageFaultAllocationOutput(&DredPageFaultOutput));
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ID3D12Debug::EnableDebugLayer | method | Enables the debug layer. |
| ID3D12Debug1::SetEnableGPUBasedValidation | method | Enables GBV; call before creating the device. Related: `ID3D12DebugCommandList1`, `ID3D12DebugDevice1`, `D3D12_GPU_BASED_VALIDATION_SHADER_PATCH_MODE`, `D3D12_GPU_BASED_VALIDATION_PIPELINE_STATE_CREATE_FLAGS`, `D3D12_DEBUG_COMMAND_LIST_GPU_BASED_VALIDATION_SETTINGS`, `D3D12_DEBUG_DEVICE_GPU_BASED_VALIDATION_SETTINGS`. |
| ID3D12DeviceRemovedExtendedDataSettings | interface | `SetAutoBreadcrumbsEnablement`, `SetPageFaultEnablement` with `D3D12_DRED_ENABLEMENT_FORCED_ON`. |
| ID3D12DeviceRemovedExtendedData | interface | `GetAutoBreadcrumbsOutput` (`D3D12_DRED_AUTO_BREADCRUMBS_OUTPUT`), `GetPageFaultAllocationOutput` (`D3D12_DRED_PAGE_FAULT_OUTPUT`); obtained by `QueryInterface` on `ID3D12Device`. |

## Notes

- GBV detects: uninitialized or incompatible descriptors/samplers in a shader; descriptors referencing deleted resources; promoted resource state and state decay validation; indexing beyond the descriptor heap end; shader access of resources in incompatible state. It patches shaders and injects Dispatch calls; COPY command lists are emulated by COMPUTE lists. Available from Graphics Tools for Windows 10 Anniversary Update. Can also be forced on via DirectX Control Panel (DXCPL).
- GBV can slow things down a lot: use with small data sets or early bring-up, or on one or two test machines in a nightly pass. Output appears after `ExecuteCommandLists` completes on the GPU (asynchronous to CPU validation); consider your own wait-after-execute. Output identifies the shader location, draw/dispatch count, and related objects (e.g. `EXECUTION ERROR #942: GPU_BASED_VALIDATION_INCOMPATIBLE_RESOURCE_STATE`).
- DRED auto-breadcrumbs insert a `WriteBufferImmediate` counter after each render op; history ring buffer keeps up to 64KiB ops per command list (`LastOpIndex = (BreadcrumbCount - 1) % 65536`). Off by default; measured 2-5% performance loss on a typical AAA engine. Requires display driver support for `D3D12_FEATURE_EXISTING_HEAPS`. The counter may not indicate the exact failing operation (pipelining, tile-based deferred rendering, reordering).
- DRED page fault reporting (DRED 1.1) reports names/types of existing or recently freed API objects matching the faulting GPU VA. Off by default (runtime must track objects by VA). Not all GPUs support page faults; GPUs without page faulting still benefit from auto-breadcrumbs.
- DRED settings are process-global and affect only devices created afterwards (`D3D12CreateDevice` uses the latest settings). Debuggers read data via `d3d12!D3D12DeviceRemovedExtendedData`; a WinDbg extension is in the DirectX-Debugging-Tools repository. DRED 1.0 was in Windows 10 version 1809 (no API); since version 1903 user-mode device-removed events are reported to WER.
- Namespace: Win32 COM (`d3d12.h`, `d3d12sdklayers.h`).
- The official GBV snippet omits EnableDebugLayer; GBV only takes effect with the debug layer enabled.
- Source: https://learn.microsoft.com/en-us/windows/win32/direct3d12/understanding-the-d3d12-debug-layer, https://learn.microsoft.com/en-us/windows/win32/direct3d12/using-d3d12-debug-layer-gpu-based-validation, https://learn.microsoft.com/en-us/windows/win32/direct3d12/use-dred (learn.microsoft.com win32 docs at commit `ca8274d`).

## Related

- [Direct3D 12 overview](./d3d12-overview.md)
- [D3D12 command lists and bundles](./d3d12-command-lists-bundles.md)
- [D3D12 memory management and residency](./d3d12-memory-residency.md)
