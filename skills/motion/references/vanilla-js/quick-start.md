# Quick start (JavaScript)

Install Motion and animate HTML, SVG, or WebGL with springs.

## Signature / Usage

```
npm install motion
```

```
import { animate, scroll } from "motion"

// CSS selector
animate(".box", { rotate: 360 })

// Elements
const boxes = document.querySelectorAll(".box")
animate(boxes, { rotate: 360 })
```

`script` tag (modern import syntax):

```
<script type="module">
  import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"
</script>
```

`script` tag (global variable):

```
<script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js"></script>
<script>
  const { animate, scroll } = Motion
</script>
```

Customising animations:

```
animate(
  element,
  { scale: [0.4, 1] },
  { ease: "circInOut", duration: 1.2 }
);

animate(
  element,
  { rotate: 90 },
  { type: "spring", stiffness: 300 }
);
```

Stagger:

```
import { animate, stagger } from "motion"

animate(
  "li",
  { y: 0, opacity: 1 },
  { delay: stagger(0.1) }
)
```

Animating a non-DOM object (Three.js rotation):

```javascript
animate(
  cube.rotation,
  { y: rad(360), z: rad(360) },
  { duration: 10, repeat: Infinity, ease: "linear" },
)
```

## Notes

- Install via the `"motion"` package or an HTML `script` tag. It is best practice to replace `latest` in CDN URLs with a specific version.
- Can animate CSS properties (`opacity`, `transform`, `filter`), SVG attributes and paths, independent transforms (`x`, `rotateY`), and JavaScript objects containing strings/colors/numbers.
- Hardware acceleration is used automatically when a value can be hardware accelerated (`x`, `y`, `opacity`, `filter`, `transform`).
- The mini HTML/SVG version of `animate()` is 3.2kb.
- Motion AI Kit (`npx motion-ai` installs its free `/motion` skill) and Motion Studio are development tools; some AI Kit features need Motion+.

## Related

- [animate](./animate.md)
- [stagger](./stagger.md)
- [spring](./spring.md)
- [scroll](./scroll.md)
- [in-view](./in-view.md)
