---
source: https://docs.flutter.dev/release/breaking-changes/opengles-render-to-texture-top-down
---

# OpenGL ES render-to-texture content is stored top-down

Impeller's OpenGL ES backend now stores render-to-texture content top-down, matching Metal and Vulkan. Fragment shaders and Flutter GPU apps that flipped Y to compensate for the old bottom-up orientation now render upside down.

## Signature / Usage

Before migration:

```glsl
void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
#ifdef IMPELLER_TARGET_OPENGLES
  uv.y = 1.0 - uv.y;
#endif
  fragColor = texture(u_texture, uv);
}
```

After migration (only needs to run on a release that includes this change):

```glsl
void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
  fragColor = texture(u_texture, uv);
}
```

To keep one source working across releases, guard the flip with `IMPELLER_OPENGLES_UNFLIPPED_DEPRECATED`, which is only defined on releases that store render-target textures top-down:

```glsl
void main() {
  vec2 uv = FlutterFragCoord().xy / u_size;
#if defined(IMPELLER_TARGET_OPENGLES) && !defined(IMPELLER_OPENGLES_UNFLIPPED_DEPRECATED)
  uv.y = 1.0 - uv.y;
#endif
  fragColor = texture(u_texture, uv);
}
```

## Notes

- Timeline: landed in version 3.46.0-0.1.pre; in stable release 3.47.
- Invisible to the framework and to Flutter's 2D rendering. Application code only observes the old orientation through the `FragmentShader` API and Flutter GPU (the experimental `flutter_gpu` package), when a shader samples a render-target texture directly.
- The renderer previously carried the difference as a per-sampler Y-coordinate scale; Impeller now absorbs it once at the vertex stage.
- Impeller is Flutter's rendering engine; this page is not about the Metal / Vulkan / OpenGL ES APIs themselves (see apple-graphics, apple-silicon, windows-graphics-media for those).

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
- [What's new in Flutter 3.47](./whats-new-3-47.md)
