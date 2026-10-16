---
source: https://react.dev/reference/react-dom/components/img
---

# `<img>`

The built-in browser `<img>` component lets you embed an image.

## Signature / Usage

```js
<img src="photo.jpg" alt="A person walking through a park" />
```

Controlling image preloading during server rendering:

```js
function ProductPage() {
  return (
    <>
      <img src="hero.jpg" alt="Featured product" />
      <img src="thumbnail.jpg" alt="Related product" loading="lazy" />
      <img src="secondary.jpg" alt="Another product" fetchPriority="low" />
    </>
  );
}
```

## Options / Props

`<img>` supports all [common element props](./common.md).

| Name | Type | Description |
| --- | --- | --- |
| alt | string | Specifies alternative text for the image. Use an empty string for a purely decorative image. |
| crossOrigin | string | Specifies the CORS policy to use when fetching the image. Possible values are `anonymous` and `use-credentials`. |
| decoding | string | Suggests whether the browser should wait to decode the image before presenting other content. Possible values are `async`, `sync`, and `auto` (the default). |
| fetchPriority | string | Suggests a relative priority for fetching the image. Possible values are `high`, `low`, and `auto` (the default). During server rendering, `fetchPriority="low"` also prevents React from automatically preloading the image. |
| height | number or string | Specifies the rendered height of the image. |
| loading | string | Specifies whether the browser should defer loading the image until it is near the viewport. Possible values are `eager` (the default) and `lazy`. Setting `loading="lazy"` prevents React from automatically preloading the image. |
| onError | function | Event handler. Fires when the image fails to load. |
| onLoad | function | Event handler. Fires when the image finishes loading. Passing `onLoad` prevents React from waiting for the image during a client-rendered View Transition update. |
| referrerPolicy | string | Specifies the referrer information to send when fetching the image. |
| sizes | string | Specifies the image sizes for different page layouts. Used with `srcSet`. |
| src | string | Specifies the URL of the image. |
| srcSet | string | Specifies one or more candidate image sources for the browser to choose from. |
| useMap | string | Associates the image with a client-side image map. |
| width | number or string | Specifies the rendered width of the image. |

## Notes

- Do not pass an empty string to `src`. It may cause the browser to request the current page again. React warns in development and omits the attribute. To render no image, omit the `<img>` or pass `null` to `src`.
- `<img>` cannot have children or use `dangerouslySetInnerHTML`. React throws an error if you pass either.
- During server rendering, React automatically generates a preload hint for an `<img>` by default (the equivalent of `<link rel="preload" as="image" href="hero.jpg" />`, or the same hint in a `Link` response header). `loading="lazy"` or `fetchPriority="low"` opt an image out.
- React also does not automatically preload an image when it is inside a `<picture>` or `<noscript>` element, or when its `src` or `srcSet` is a data URL.
- If you render an image through a framework or a component library, consult its documentation for the default behavior. React decides whether to generate an automatic preload from the props of the underlying `<img>`. To create an explicit preload hint, call `preload`.
- During a `<ViewTransition>` update, React waits up to 500 ms for visible images to load before starting the animation. This includes newly rendered `<img>` elements and existing images whose `src` or `srcSet` changes. Setting `loading="lazy"` or adding an `onLoad` handler opts an image out.
- `fetchPriority="low"` does not stop React from waiting for the image to load during a client-rendered View Transition update. Use `loading="lazy"` or an `onLoad` handler to opt out of that behavior.
- Specify `width` and `height` when you know the image dimensions so the browser can reserve space before the image loads. For a decorative image, pass `alt=""` so that screen readers ignore it.
- Built-in DOM element, distinct from framework image components: see nextjs-app (`next/image`).

## Related

- [Common components](./common.md)
- [link](./link.md)
