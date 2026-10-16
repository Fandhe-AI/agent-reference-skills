---
source: https://r3f.docs.pmnd.rs/api/objects#shader-material-uniforms
---

# Shader material uniforms

`ShaderMaterial`, `RawShaderMaterial` and subclasses keep the material's `uniforms` object stable. When a new `uniforms` object is passed, React Three Fiber merges the incoming uniforms into the existing target instead of replacing it. This preserves three.js internal uniform caching, even if the component creates a fresh `uniforms` object on each render. Existing entries are updated in place and new entries are added as needed.

## Signature / Usage

```jsx
<shaderMaterial
  uniforms={{
    time: { value: time },
    color: { value: color },
  }}
/>
```

To get a stable reference to the material's `uniforms`, use the React ref:

```jsx
function Component() {
  const ref = useRef()

  // This object is merged into the material, so mutating this reference
  // later will not update the shader.
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      color: { value: color },
    }),
    [color],
  )

  useFrame(({ clock }) => {
    // The material ref's uniforms object is stable and should be mutated instead.
    ref.current.uniforms.time.value = clock.elapsedTime
  })

  return (
    <mesh>
      <shaderMaterial ref={ref} uniforms={uniforms} />
    </mesh>
  )
}
```

## Notes

- Changelog: "Fix uniforms refs so they remain stable for ShaderMaterial" was released in 9.6.0.
- `ShaderMaterial` and its `uniforms` are three.js API; see the threejs skill.

## Related

- [Piercing into nested properties](./piercing-nested-properties.md)
