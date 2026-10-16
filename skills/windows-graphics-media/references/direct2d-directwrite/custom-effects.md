# Direct2D custom effects (ID2D1EffectImpl, ID2D1DrawTransform, RegisterEffectFromString)

Direct2D lets you write custom effects with standard HLSL and use them alongside built-in effects. A custom effect has four parts: an effect interface (`ID2D1EffectImpl`), a transform graph, transforms, and shaders.

## Signature / Usage

```cpp
#include <d2d1_1.h>
#include <d2d1effectauthor.h>
#include <d2d1effecthelpers.h>

DEFINE_GUID(CLSID_SampleEffect, 0x00000000, 0x0000, 0x0000, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00);

class SampleEffect : public ID2D1EffectImpl
{
public:
    IFACEMETHODIMP Initialize(_In_ ID2D1EffectContext* pContextInternal,
                              _In_ ID2D1TransformGraph* pTransformGraph);
    IFACEMETHODIMP PrepareForRender(D2D1_CHANGE_TYPE changeType);
    IFACEMETHODIMP SetGraph(_In_ ID2D1TransformGraph* pGraph);

    static HRESULT Register(_In_ ID2D1Factory1* pFactory);
    static HRESULT CreateEffect(_Outptr_ IUnknown** ppEffectImpl);

    IFACEMETHODIMP_(ULONG) AddRef();
    IFACEMETHODIMP_(ULONG) Release();
    IFACEMETHODIMP QueryInterface(_In_ REFIID riid, _Outptr_ void** ppOutput);
private:
    SampleEffect();
    LONG m_refCount;
};
```

Registration (XML metadata + property bindings):

```cpp
const D2D1_PROPERTY_BINDING bindings[] =
{
    D2D1_VALUE_TYPE_BINDING(L"Offset", &SetOffset, &GetOffset)
};

pFactory->RegisterEffectFromString(
    CLSID_SampleEffect,  // GUID defined in class header file.
    pszXml,              // XML that describes the effect.
    bindings,            // Property bindings array.
    ARRAYSIZE(bindings),
    CreateEffect         // Static method that returns an instance of the effect's class.
    );
```

Minimal registration XML:

```xml
<?xml version='1.0'?>
<Effect>
    <Property name='DisplayName' type='string' value='SampleEffect'/>
    <Property name='Author' type='string' value='Contoso'/>
    <Property name='Category' type='string' value='Sample'/>
    <Property name='Description' type='string' value='This is a demo effect.'/>
    <Inputs>
        <Input name='SourceOne'/>
    </Inputs>
</Effect>
```

## Options / Props

ID2D1EffectImpl methods to implement:

| Method | Description |
|--------|-------------|
| Initialize(ID2D1EffectContext*, ID2D1TransformGraph*) | Called after `ID2D1DeviceContext::CreateEffect`; internal init and initial transform graph. |
| SetGraph(ID2D1TransformGraph*) | Called when the input count changes; return `E_NOTIMPL` if the input count is fixed. |
| PrepareForRender(D2D1_CHANGE_TYPE) | Called before render if the effect was initialized but not yet drawn, a property changed, or context state (e.g. DPI) changed. |

Transform graph methods (ID2D1TransformGraph): `AddNode`, `ConnectToEffectInput(toEffectInputIndex, node, toNodeInputIndex)`, `ConnectNode(from, to, toNodeInputIndex)`, `SetOutputNode`, `SetSingleTransformNode`.

Transforms provided by Direct2D: `ID2D1BlendTransform` (`CreateBlendTransform`), `ID2D1BorderTransform` (`CreateBorderTransform`, D2D1_EXTEND_MODE), `ID2D1OffsetTransform` (`CreateOffsetTransform`); any effect as a transform via `ID2D1EffectContext::CreateTransformNodeFromEffect`.

Custom transform interfaces: `ID2D1Transform` (`GetInputCount`, `MapInputRectsToOutputRect`, `MapOutputRectToInputRects`, `MapInvalidRect`); `ID2D1DrawTransform` (adds `SetDrawInfo`, for pixel / vertex shaders); `ID2D1ComputeTransform` (adds `SetComputeInfo`, `CalculateThreadgroups`, for compute shaders).

XML property type to data type mapping:

| XML type | Data type |
|----------|-----------|
| string | PWSTR |
| bool | BOOL |
| uint32 / int32 / float | UINT / INT / FLOAT |
| vector2 / vector3 / vector4 | D2D_VECTOR_2F / 3F / 4F |
| matrix3x2 / matrix4x3 / matrix4x4 / matrix5x4 | D2D_MATRIX_3X2_F / 4X3_F / 4X4_F / 5X4_F |
| blob | BYTE[] |
| iunknown | IUnknown* |
| colorcontext | ID2D1ColorContext* |
| clsid | CLSID |
| enum | enumeration (e.g. D2D1_INTERPOLATION_MODE) |

## Notes

- Effects must be registered before use; registration is scoped to a Direct2D factory instance and must be repeated each time the app runs. Use a unique GUID (e.g. guidgen.exe) and the same GUID in `CreateEffect` calls.
- Effect metadata XML is informational (queryable via `ID2D1Properties`); inputs and properties are used by Direct2D. Property `Min` / `Max` / `Default` sub-properties are informational only and not enforced; the setter must clamp itself.
- The XML property `type` must match the setter parameter and getter return type. Custom properties are indexed in XML declaration order and accessed with `ID2D1Properties::SetValue` / `GetValue`. `D2D1_VALUE_TYPE_BINDING` requires the effect class to inherit from `ID2D1EffectImpl` before any other interface.
- Update transforms in response to property changes typically in `PrepareForRender`. All effect properties are DPI independent (DIPs); scale to pixels with `ID2D1EffectContext::GetDPI`.
- `ID2D1Transform` rectangles are in pixels, not DIPs. If the opaque output region is unclear, set the output opaque rect to (0, 0, 0, 0). Check for over/underflow when expanding rects (e.g. blur radius); for a non-trivial mapping, set the input rect to the maximum area (INT_MIN / INT_MAX). `MapInvalidRect` is not called at any guaranteed time; for complex mappings set a logically infinite rect (`D2D1::RectL(LONG_MIN, LONG_MIN, LONG_MAX, LONG_MAX)`).
- Pixel shader: load the compiled .CSO bytecode with `ID2D1EffectContext::LoadPixelShader` (ignored if the GUID is already loaded), then select it with `ID2D1DrawInfo::SetPixelShader`. Constant buffers go through `ID2D1DrawInfo::SetPixelShaderConstantBuffer`. Inputs map to `Texture2D` t0, t1... and `SamplerState` s0, s1...; shader entry parameters are clip-space output (`SV_POSITION`, do not use), scene-space output (`SCENE_POSITION`), texel-space input (`TEXCOORD0`).
- Vertex shader: `ID2D1EffectContext::LoadVertexShader`, `CreateVertexBuffer`, `ID2D1DrawInfo::SetVertexProcessing`. If none is specified, Direct2D substitutes a default vertex shader / vertex buffer. A vertex shader must return `sceneSpaceOutput` and `clipSpaceOutput` unchanged.
- Compute shader: check support with `ID2D1EffectContext::CheckFeatureSupport` and return `D2DERR_INSUFFICIENT_DEVICE_CAPABILITIES` if unsupported. Supports Shader Model 4 (DirectX 10) and 5 (DirectX 11); SM4 `numthreads`: z == 1 and x*y*z <= 768; SM5: z <= 64 and x*y*z <= 1024. Round the threadgroup count up in `CalculateThreadgroups`. SM4 output must be a 1D `RWStructuredBuffer<float4>`; SM5 can use 2D output textures.
- Full pixel, vertex and compute shader effect examples are in the D2DCustomEffects SDK sample (Windows-universal-samples).
- Source: https://learn.microsoft.com/en-us/windows/win32/direct2d/custom-effects (commit `ca8274d`).

## Related

- [Effects overview](./effects-overview.md)
- [Effect shader linking](./effect-shader-linking.md)
- [Built-in effects](./built-in-effects.md)
- [ID2D1Factory1](./id2d1factory1.md)
- [ID2D1Effect](./id2d1effect.md)
