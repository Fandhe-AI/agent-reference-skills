# HLSL shader compilation: D3DCompile2 / DXC

HLSL source is compiled to shader bytecode before it is passed to `ID3D11Device::CreateVertexShader`/`CreatePixelShader` or embedded in a D3D12 `ID3D12PipelineState`. The legacy compiler API is `D3DCompile`/`D3DCompile2` (`d3dcompiler.h`, produces DXBC, shader model <= 5.1). For Shader Model 6.0+ (DXIL), use the DirectX Shader Compiler (`dxc.exe` / `dxcompiler.dll`) instead.

## Signature / Usage

```cpp
HRESULT D3DCompile2(
  LPCVOID                pSrcData,
  SIZE_T                 SrcDataSize,
  LPCSTR                 pSourceName,
  const D3D_SHADER_MACRO *pDefines,
  ID3DInclude            *pInclude,
  LPCSTR                 pEntrypoint,
  LPCSTR                 pTarget,
  UINT                   Flags1,
  UINT                   Flags2,
  UINT                   SecondaryDataFlags,
  LPCVOID                pSecondaryData,
  SIZE_T                 SecondaryDataSize,
  ID3DBlob               **ppCode,
  ID3DBlob               **ppErrorMsgs
);
```

```cpp
ComPtr<ID3DBlob> blob, errors;
D3DCompile2(src, srcSize, "shader.hlsl", nullptr,
    D3D_COMPILE_STANDARD_FILE_INCLUDE, "main", "ps_5_0",
    0, 0, 0, nullptr, 0, &blob, &errors);
```

```
:: DXC command line (Shader Model 6+, DXIL)
dxc.exe -T ps_6_0 -E main shader.hlsl -Fo shader.cso
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| pSrcData / SrcDataSize | LPCVOID / SIZE_T | Pointer to and length of the ASCII HLSL source. |
| pSourceName | LPCSTR | Name used in compiler error messages (optional). |
| pDefines | const D3D_SHADER_MACRO* | Optional array of shader macros; NULL-terminated. |
| pInclude | ID3DInclude* | Include handler; pass `D3D_COMPILE_STANDARD_FILE_INCLUDE` for the default file-relative handler. |
| pEntrypoint | LPCSTR | Shader entry point function name (e.g. `"main"`, `"VSMain"`). |
| pTarget | LPCSTR | Shader model/profile string, e.g. `"vs_5_0"`, `"ps_5_0"`. |
| Flags1 | UINT | `D3DCOMPILE_*` constants (debug info, optimization level, etc.), bitwise-ORed. |
| ppCode | ID3DBlob** | Receives the compiled bytecode blob. |
| ppErrorMsgs | ID3DBlob** | Receives compiler error/warning text, or NULL if none. |

## Notes

- For Direct3D 12 with Shader Model 5.1, both `D3DCompile`/FXC and DXC are deprecated in favor of Shader Model 6 via DXC/DXIL.
- Compiling with `D3DCompile2` at runtime (e.g. inside a UWP/WinUI app) should be done off the UI thread; offline compilation with the effect-compiler tool (`fxc.exe`) or `dxc.exe` is preferred for shipping shaders.
- Visual Studio automatically invokes `dxc.exe` instead of `fxc.exe` when Shader Model 6 is selected in the HLSL project property page.
- `dxc.exe`/`dxcompiler.dll` ship in the Windows SDK and as standalone releases of the DirectXShaderCompiler project.

## Related

- [D3D11 shaders and drawing pipeline](./d3d11-shaders-drawing.md)
- [Direct3D 12 overview](./d3d12-overview.md)
