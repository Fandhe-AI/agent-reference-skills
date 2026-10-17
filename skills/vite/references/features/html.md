---
source: https://vite.dev/guide/features#html
---

# HTML

HTML files are the entry points of a Vite project. Assets referenced by supported elements are processed and bundled.

## Signature / Usage

```html
<!doctype html>
<html>
  <head>
    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/src/styles.css" />
  </head>
  <body>
    <img src="/src/images/logo.svg" alt="logo" />
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

Any HTML file in the project root is directly accessible by its directory path:

- `<root>/index.html` -> `http://localhost:5173/`
- `<root>/about.html` -> `http://localhost:5173/about.html`
- `<root>/blog/index.html` -> `http://localhost:5173/blog/index.html`

## Options / Props

Supported elements whose assets are processed:

| Element | Attribute(s) |
|---------|--------------|
| `<audio>` | `src` |
| `<embed>` | `src` |
| `<img>` | `src`, `srcset` |
| `<image>` | `href`, `xlink:href` |
| `<input>` | `src` |
| `<link>` | `href`, `imagesrcset` |
| `<object>` | `data` |
| `<script type="module">` | `src` |
| `<source>` | `src`, `srcset` |
| `<track>` | `src` |
| `<use>` | `href`, `xlink:href` |
| `<video>` | `src`, `poster` |
| `<meta>` | `content` |

`<meta content>` is processed only if `name` matches `msapplication-tileimage`, `msapplication-square70x70logo`, `msapplication-square150x150logo`, `msapplication-wide310x150logo`, `msapplication-square310x310logo`, `msapplication-config`, or `twitter:image`; or only if `property` matches `og:image`, `og:image:url`, `og:image:secure_url`, `og:audio`, `og:audio:secure_url`, `og:video`, or `og:video:secure_url`.

## Notes

- To opt out of HTML processing on certain elements (e.g. external assets or CDN), add the `vite-ignore` attribute to the element.

## Related

- [Index HTML and project root](../getting-started/index-html-project-root.md)
- [Multi-Page App](../build-deploy/multi-page-app.md)
