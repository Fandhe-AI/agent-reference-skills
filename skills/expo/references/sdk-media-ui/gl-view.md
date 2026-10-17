---
source: https://docs.expo.dev/versions/v58.0.0/sdk/gl-view/
---

# GLView

`expo-gl`: a `View` that acts as an OpenGL ES render target, useful for rendering 2D and 3D graphics. On mounting, an OpenGL ES context is created. Its drawing buffer is presented as the contents of the `View` every frame.

## Signature / Usage

```sh
npx expo install expo-gl
```

```jsx
import { View } from 'react-native';
import { GLView } from 'expo-gl';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
    </View>
  );
}

function onContextCreate(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0, 1, 1, 1);

  // Create vertex shader (shape & position)
  const vert = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(
    vert,
    `
    void main(void) {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 150.0;
    }
  `
  );
  gl.compileShader(vert);

  // Create fragment shader (color)
  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(
    frag,
    `
    void main(void) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
  `
  );
  gl.compileShader(frag);

  // Link together into a program
  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);

  gl.flush();
  gl.endFrameEXP();
}
```

```js
import { GLView } from 'expo-gl';
```

## Options / Props

### GLView component

Supported platforms: Android, iOS, Web. Type: `React.Component<GLViewProps>`. Inherits `ViewProps`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| enableExperimentalWorkletSupport | `boolean` | `false` | Enables support for interacting with a `gl` object from code running on the Reanimated worklet thread. |
| msaaSamples (iOS) | `number` | `4` | Number of samples for iOS built-in multisampling. `0` turns off multisampling. |
| onContextCreate | `(gl: ExpoWebGLRenderingContext) => void` | — | Called when the OpenGL ES context is created. `gl` extends the `WebGLRenderingContext` interface. |

### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `createContextAsync()` | `Promise<ExpoWebGLRenderingContext>` | Creates a headless context without an underlying view. Must be destroyed with `destroyContextAsync`. You must set up a viewport and your own framebuffer and texture before taking a snapshot. |
| `destroyContextAsync(exgl?: number \| ExpoWebGLRenderingContext)` | `Promise<boolean>` | Destroys the given (headless) context; resolves `true` if it existed and was destroyed. |
| `takeSnapshotAsync(exgl?: number \| ExpoWebGLRenderingContext, options?: SnapshotOptions)` | `Promise<GLSnapshot>` | Takes a snapshot of the framebuffer and saves it as a file to the app's cache directory. `options` defaults to `{}`. |
| `GLView.getWorkletContext(contextId: number)` | `ExpoWebGLRenderingContext \| undefined` | Recreates the GL object inside a Reanimated worklet. |

### Component (instance) methods

| Method | Returns | Description |
| --- | --- | --- |
| `createCameraTextureAsync(cameraRefOrHandle: ComponentOrHandle)` | `Promise<WebGLTexture>` | — |
| `destroyObjectAsync(glObject: WebGLObject)` | `Promise<boolean>` | — |
| `takeSnapshotAsync(options?: SnapshotOptions)` | `Promise<GLSnapshot>` | Same as static `takeSnapshotAsync()`, using the WebGL context associated with the view. |

### ExpoWebGLRenderingContext

Extends `WebGL2RenderingContext`.

| Name | Type | Description |
| --- | --- | --- |
| contextId | `number` | — |
| `__expoSetLogging(option: GLLoggingOption)` | `void` | — |
| `_expo_texImage2D(...props: any[])` | `void` | — |
| `_expo_texSubImage2D(...props: any[])` | `void` | — |
| `endFrameEXP()` | `void` | Notifies the context that the current frame is ready to present (like a swap-buffers call). |
| `flushEXP()` | `void` | — |

### Types

`ComponentOrHandle`: `null` | `number` | `Component<any, any>` | `ComponentClass<any>`

`GLSnapshot`

| Property | Type | Description |
| --- | --- | --- |
| height | `number` | Height of the snapshot. |
| localUri | `string` | Synonym for `uri`. Makes snapshot object compatible with `texImage2D`. |
| uri | `string \| Blob \| null` | URI to the snapshot. |
| width | `number` | Width of the snapshot. |

`SnapshotOptions`

| Property | Type | Description |
| --- | --- | --- |
| compress | `number` | `0` to `1.0` compression level; `1.0` means no compression. Default `1.0`. |
| flip | `boolean` | Flip the snapshot vertically. Default `false`. |
| format | `'jpeg' \| 'png' \| 'webp'` | Compression type and result file extension. Default `'jpeg'`. On iOS, `webp` prints a warning and generates a `png` file. |
| framebuffer | `WebGLFramebuffer` | Framebuffer to read from. Defaults to the framebuffer presented in the view, or the current framebuffer if the context is headless. |
| rect | `{ height: number, width: number, x: number, y: number }` | Rect to crop the snapshot; passed directly to `glReadPixels`. |

`SurfaceCreateEvent`: `{ nativeEvent: { exglCtxId: number } }`. `WebGLObject`: `{ id: number }`.

### GLLoggingOption

| Name | Value | Description |
| --- | --- | --- |
| DISABLED | 0 | Disables logging entirely. |
| METHOD_CALLS | 1 | Logs method calls, their parameters and results. |
| GET_ERRORS | 2 | Calls `gl.getError()` after each other method call and prints an error if any. Significant performance impact (blocking). |
| RESOLVE_CONSTANTS | 4 | Resolves parameters of type `number` to their constant names. |
| TRUNCATE_STRINGS | 8 | Truncates long strings (useful for big shaders). |
| ALL | 15 | Enables all options; implies `GET_ERRORS`. |

## Notes

- Platforms: Android, iOS, Web, included in Expo Go. Package `expo-gl`, source `https://github.com/expo/expo/tree/sdk-58/packages/expo-gl`. Pinned to Expo SDK 58 docs (modificationDate September 15, 2026).
- The `gl` object provides a WebGL API resembling `WebGL2RenderingContext`. Some older Android devices may not support WebGL2; check with `gl instanceof WebGL2RenderingContext`.
- Unimplemented `WebGL2RenderingContext` methods: `getFramebufferAttachmentParameter()`, `getRenderbufferParameter()`, `compressedTexImage2D()`, `compressedTexSubImage2D()`, `getTexParameter()`, `getUniform()`, `getVertexAttrib()`, `getVertexAttribOffset()`, `getBufferSubData()`, `getInternalformatParameter()`, `renderbufferStorageMultisample()`, `compressedTexImage3D()`, `compressedTexSubImage3D()`, `fenceSync()`, `isSync()`, `deleteSync()`, `clientWaitSync()`, `waitSync()`, `getSyncParameter()`, `getActiveUniformBlockParameter()`.
- The `pixels` argument of `texImage2D()` must be `null`, an `ArrayBuffer` with pixel data, or `{ localUri }` where `localUri` is a `file://` URI. For an `Asset`, call `.downloadAsync()` first.
- Implementations do not type- or bounds-check arguments; invalid arguments may cause a native crash.
- Does not work with remote debugging enabled (GLView requires synchronous native calls).
- Reanimated worklets: pass `gl.contextId` to `runOnUI` and call `GLView.getWorkletContext(contextId)` inside the worklet; set `enableExperimentalWorkletSupport`. Third-party libraries (Pixi.js, Three.js) do not work inside the worklet; assets must be loaded on the main thread; use `requestAnimationFrame`, not `setTimeout`, for render loops.
- Higher-level graphics: `expo-three` for three.js; any library expecting a `WebGLRenderingContext` can be used, possibly with workarounds for web-only assumptions such as `document`.

## Related

- [Camera](./camera.md)
