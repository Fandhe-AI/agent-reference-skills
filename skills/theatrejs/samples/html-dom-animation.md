# HTML DOM Animation

Animate HTML/SVG elements by connecting Theatre.js prop values to DOM style properties.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { margin: 0; background: black; color: white; font-family: sans-serif; }
  </style>
</head>
<body>
  <h1 id="heading" style="text-align: center">Welcome</h1>
  <script type="module">
    import 'https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.5.0-insiders.88df1ef/dist/core-and-studio.js'

    const { core, studio } = Theatre
    studio.initialize()

    const project = core.getProject('HTML Animation')
    const sheet = project.sheet('Sheet 1')

    const obj = sheet.object('Heading', {
      y: 0,
      opacity: core.types.number(1, { range: [0, 1] }),
    })

    const el = document.getElementById('heading')
    obj.onValuesChange(({ y, opacity }) => {
      el.style.transform = `translateY(${y}px)`
      el.style.opacity = opacity
    })

    // Play after export: replace core-and-studio.js with core-only.min.js
    // and pass { state: projectState } to getProject
    project.ready.then(() => {
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 6] })
    })
  </script>
</body>
</html>
```

## Notes

- The `core-and-studio` CDN bundle includes both `@theatre/core` and `@theatre/studio`; swap it for `core-only.min.js` in production
- `onValuesChange` receives the current value of every prop on each animation frame, making direct DOM style mutation straightforward
- Any CSS-animatable property (transform, opacity, color, etc.) can be driven this way — no framework required
- `range` in `sequence.play` limits playback to a subsection of the timeline (in seconds)
