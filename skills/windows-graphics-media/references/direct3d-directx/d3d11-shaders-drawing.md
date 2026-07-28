# ID3D11VertexShader / ID3D11PixelShader / ID3D11InputLayout / Draw / DrawIndexed / OMSetRenderTargets

Shader-stage objects (`ID3D11VertexShader`, `ID3D11PixelShader`) and the input-assembler description (`ID3D11InputLayout`) configure the programmable pipeline; `OMSetRenderTargets` binds output targets; `Draw`/`DrawIndexed` submit rendering work on `ID3D11DeviceContext`.

## Signature / Usage

```cpp
// Create shaders + input layout from compiled bytecode (see HLSL shader compilation).
ComPtr<ID3D11VertexShader> vs;
device->CreateVertexShader(vsBlob->GetBufferPointer(), vsBlob->GetBufferSize(), nullptr, &vs);

ComPtr<ID3D11PixelShader> ps;
device->CreatePixelShader(psBlob->GetBufferPointer(), psBlob->GetBufferSize(), nullptr, &ps);

D3D11_INPUT_ELEMENT_DESC layoutDesc[] = {
    { "POSITION", 0, DXGI_FORMAT_R32G32B32_FLOAT, 0, 0, D3D11_INPUT_PER_VERTEX_DATA, 0 },
};
ComPtr<ID3D11InputLayout> inputLayout;
device->CreateInputLayout(layoutDesc, _countof(layoutDesc),
    vsBlob->GetBufferPointer(), vsBlob->GetBufferSize(), &inputLayout);

// Per frame:
context->IASetInputLayout(inputLayout.Get());
context->VSSetShader(vs.Get(), nullptr, 0);
context->PSSetShader(ps.Get(), nullptr, 0);
context->OMSetRenderTargets(1, rtv.GetAddressOf(), nullptr);
context->DrawIndexed(indexCount, 0, 0);
```

## Options / Props

`OMSetRenderTargets` parameters:

| Name | Type | Description |
|------|------|-------------|
| NumViews | UINT | Number of render targets to bind (0 to `D3D11_SIMULTANEOUS_RENDER_TARGET_COUNT`, typically 8). |
| ppRenderTargetViews | ID3D11RenderTargetView* const* | Array of render-target views; pass `NULL`/0 to unbind all. |
| pDepthStencilView | ID3D11DepthStencilView* | Depth-stencil view to bind, or `NULL`. |

`Draw` / `DrawIndexed` parameters:

| Name | Type | Description |
|------|------|-------------|
| VertexCount / IndexCount | UINT | Number of vertices (Draw) or indices (DrawIndexed) to submit. |
| StartVertexLocation / StartIndexLocation | UINT | Offset of the first vertex/index. |
| BaseVertexLocation | INT | (DrawIndexed only) Value added to each index before reading the vertex buffer. |

## Notes

- `ID3D11Device::CreateInputLayout` requires the vertex-shader bytecode (not just the shader object) to validate signatures against `D3D11_INPUT_ELEMENT_DESC`.
- All bound render targets must reference the same resource type/dimensions/sample count; the same subresource cannot be bound to multiple render-target slots simultaneously.
- `Draw` reads vertex data from whatever vertex buffer(s) are bound via `IASetVertexBuffers`; a vertex shader can also synthesize data from `SV_VertexID` with no buffer bound.
- `DrawIndexed` requires an index buffer bound via `IASetIndexBuffer`.
- Namespace: Win32 COM (`d3d11.h`).

## Related

- [D3D11CreateDevice / ID3D11Device / ID3D11DeviceContext](./d3d11-device-context.md)
- [D3D11 resources: Buffer, Texture2D, RenderTargetView](./d3d11-resources.md)
- [HLSL shader compilation](./hlsl-shader-compilation.md)
