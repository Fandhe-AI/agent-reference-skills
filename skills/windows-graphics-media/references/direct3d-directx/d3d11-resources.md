# ID3D11Buffer / ID3D11Texture2D / ID3D11RenderTargetView

GPU resources in Direct3D 11 are buffers (`ID3D11Buffer`, for vertex/index/constant data) and textures (`ID3D11Texture2D`, for images and render targets). A resource view such as `ID3D11RenderTargetView` exposes a resource to a pipeline stage — here, as the output-merger's render target.

## Signature / Usage

```cpp
// Vertex buffer.
D3D11_BUFFER_DESC bd = {};
bd.ByteWidth = sizeof(vertices);
bd.Usage = D3D11_USAGE_DEFAULT;
bd.BindFlags = D3D11_BIND_VERTEX_BUFFER;

D3D11_SUBRESOURCE_DATA initData = { vertices };
ComPtr<ID3D11Buffer> vertexBuffer;
device->CreateBuffer(&bd, &initData, &vertexBuffer);

// Render target view onto the swap chain's back buffer.
ComPtr<ID3D11Texture2D> backBuffer;
swapChain->GetBuffer(0, IID_PPV_ARGS(&backBuffer));

ComPtr<ID3D11RenderTargetView> rtv;
device->CreateRenderTargetView(backBuffer.Get(), nullptr, &rtv);
```

## Options / Props

`ID3D11Device::CreateBuffer` parameters:

| Name | Type | Description |
|------|------|-------------|
| pDesc | const D3D11_BUFFER_DESC* | Describes `ByteWidth`, `Usage`, `BindFlags` (`D3D11_BIND_VERTEX_BUFFER` / `INDEX_BUFFER` / `CONSTANT_BUFFER`), `CPUAccessFlags`. |
| pInitialData | const D3D11_SUBRESOURCE_DATA* | Initial contents; required when `Usage` is `D3D11_USAGE_IMMUTABLE`. |
| ppBuffer | ID3D11Buffer** | Receives the created buffer. |

| Type | Description |
|------|-------------|
| ID3D11Buffer | A generic GPU buffer resource; bound as vertex, index, or constant buffer depending on `BindFlags`. |
| ID3D11Texture2D | A 2D texture resource (or array of 2D textures); created with `ID3D11Device::CreateTexture2D` from a `D3D11_TEXTURE2D_DESC`. Swap-chain back buffers are `ID3D11Texture2D` retrieved via `IDXGISwapChain::GetBuffer`. |
| ID3D11RenderTargetView | A view that lets the output-merger stage write to a resource (texture); created with `ID3D11Device::CreateRenderTargetView`. |

## Notes

- Constant buffers (`D3D11_BIND_CONSTANT_BUFFER`) must have `ByteWidth` a multiple of 16.
- A buffer or texture with `Usage = D3D11_USAGE_IMMUTABLE` cannot be modified after creation and requires non-`NULL` `pInitialData`.
- To update a resource at runtime, use `ID3D11DeviceContext::Map`/`Unmap` (dynamic/staging resources) or `UpdateSubresource` (default-usage resources).
- Namespace: Win32 COM (`d3d11.h`). Distinct from Windows.Graphics.Imaging WinRT types and from other frameworks' texture/buffer abstractions (e.g. threejs `BufferGeometry`).

## Related

- [D3D11CreateDevice / ID3D11Device / ID3D11DeviceContext](./d3d11-device-context.md)
- [D3D11 shaders and drawing pipeline](./d3d11-shaders-drawing.md)
