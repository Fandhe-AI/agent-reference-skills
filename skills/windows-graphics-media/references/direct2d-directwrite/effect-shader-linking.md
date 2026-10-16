# Effect shader linking

Effect shader linking is a Direct2D optimization that combines multiple effect graph rendering passes into a single pass by linking adjacent pixel shaders (builds on the Direct3D 11.2 HLSL shader linking feature).

## Signature / Usage

Linking-compatible effect shader using the D2D HLSL helpers (d2d1effecthelpers.hlsli):

```hlsl
#define D2D_INPUT_COUNT 1
#define D2D_INPUT0_SIMPLE
#include "d2d1effecthelpers.hlsli"

D2D_PS_ENTRY(LinkingCompatiblePixelShader)
{
    float4 input = D2DGetInput(0);
    input.rgb *= input.a;
    return input;
}
```

Two-step FXC compilation (export function first, then full shader with the export function embedded):

```
fxc /T <shadermodel> <MyShaderFile>.hlsl /D D2D_FUNCTION /D D2D_ENTRY=<entry> /Fl <MyShaderFile>.fxlib

fxc /T ps_<shadermodel> <MyShaderFile>.hlsl /D D2D_FULL_SHADER /D D2D_ENTRY=<entry> /E <entry> /setprivate <MyShaderFile>.fxlib /Fo <MyShader>.cso /Fh <MyShader>.h
```

## Options / Props

FXC flags, step 1 (export function) and step 2 (full shader):

| Flag | Description |
|------|-------------|
| /T `<ShaderModel>` | Pixel shader profile; step 1 must be one of the profiles under "HLSL shader linking", step 2 the corresponding pixel shader profile. |
| /D D2D_FUNCTION | Step 1: compile the export function version. |
| /D D2D_FULL_SHADER | Step 2: compile the full version. |
| /D D2D_ENTRY=`<entry>` | Entry point name defined inside `D2D_PS_ENTRY`. |
| /E `<entry>` | Step 2: same entry point name. |
| /Fl `<file>`.fxlib | Step 1: output for the export function (the .fxlib extension is only for identification). |
| /setprivate `<file>`.fxlib | Step 2: embed the export function into the D3D_BLOB_PRIVATE_DATA area. |
| /Fo, /Fh | Step 2: final combined .cso / header. |

Export function input signature (when not using the helpers): returns `float4`; inputs are `float4 d2d_inputN : INPUTN` (simple input), `float4 d2d_uvN : TEXCOORDN` (complex input), and at most one `float4 d2d_posScene : SCENE_POSITION`. Functions with any other input are rejected for linking.

D2D HLSL helpers: `D2DGetInput`, `D2DSampleInput`, `D2DSampleInputAtOffset`, `D2DSampleInputAtPosition`, `D2DGetInputCoordinate`, `D2DGetScenePosition`, `D2D_PS_ENTRY`.

## Notes

- App authors need to do nothing: Direct2D analyzes the effect graph and links adjacent rendering transforms where beneficial. All built-in effects support shader linking. Without linking the example graph needs 4 passes and 3 intermediates; with linking, 1 pass and 0 intermediates.
- Only pixel shaders can be linked; transforms with vertex or compute shaders are not linked (a vertex + pixel shader effect can still have its pixel shader output linked). If a transform provides only the full pixel shader blob via `ID2D1EffectContext::LoadPixelShader`, it is not linked with adjacent transforms. Around a linking hazard Direct2D does not link adjacent transforms but still tries to link the rest of the graph.
- Custom effect authors must provide both the full shader and the export function version (Direct2D picks one at runtime). No changes are needed to effect interface implementations such as `ID2D1DrawTransform`.
- Simple sampling (output pixel depends on one corresponding input pixel, e.g. grayscale) can be linked to its predecessor; complex sampling (e.g. Gaussian blur) needs an input texture to sample and is not linked to its predecessor. With the helpers you must declare simple vs complex inputs in HLSL.
- Only one `SCENE_POSITION` input may be defined, and only one function per linked shader can use it.
- When compiling in Visual Studio, run both FXC commands from a batch file as a custom build step before compile.
- Source: https://learn.microsoft.com/en-us/windows/win32/direct2d/effect-shader-linking (commit `ca8274d`).

## Related

- [Effects overview](./effects-overview.md)
- [Custom effects](./custom-effects.md)
- [Precision and clipping in effect graphs](./effect-precision-and-clipping.md)
