---
source: https://react.dev/reference/react-dom/components/script
---

# `<script>`

The built-in browser `<script>` component lets you add a script to your document. You can render `<script>` from any component and React will in certain cases place the corresponding DOM element in the document head and de-duplicate identical scripts.

## Signature / Usage

```js
<script> alert("hi!") </script>
<script src="script.js" />
```

Rendering an external script:

```js
function Map({lat, long}) {
  return (
    <>
      <script async src="map-api.js" onLoad={() => console.log('script loaded')} />
      <div id="map" data-lat={lat} data-long={long} />
    </>
  );
}
```

## Options / Props

`<script>` supports all [common element props](./common.md). It should have *either* `children` or a `src` prop.

| Name | Type | Description |
| --- | --- | --- |
| children | string | The source code of an inline script. |
| src | string | The URL of an external script. |
| async | boolean | Allows the browser to defer execution of the script until the rest of the document has been processed; the preferred behavior for performance. |
| crossOrigin | string | The CORS policy to use. Possible values are `anonymous` and `use-credentials`. |
| fetchPriority | string | Lets the browser rank scripts in priority when fetching multiple scripts at the same time. Can be `"high"`, `"low"`, or `"auto"` (the default). |
| integrity | string | A cryptographic hash of the script, to verify its authenticity. |
| noModule | boolean | Disables the script in browsers that support ES modules, allowing for a fallback script for browsers that do not. |
| nonce | string | A cryptographic nonce to allow the resource when using a strict Content Security Policy. |
| referrer | string | Says what Referer header to send when fetching the script and any resources that the script fetches in turn. |
| type | string | Says whether the script is a classic script, ES module, or import map. |
| onError | function | Called when the script fails to load. Disables React's special treatment of scripts. |
| onLoad | function | Called when the script finishes being loaded. Disables React's special treatment of scripts. |
| blocking | string | Not recommended. If set to `"render"`, instructs the browser not to render the page until the scriptsheet is loaded. React provides more fine-grained control using Suspense. |
| defer | string | Not recommended. Prevents the browser from executing the script until the document is done loading. Not compatible with streaming server-rendered components. Use the `async` prop instead. |

## Notes

- Special rendering behavior: React can move `<script>` components to the document's `<head>` and de-duplicate identical scripts. To opt in, provide the `src` and `async={true}` props. React de-duplicates scripts if they have the same `src`. The `async` prop must be true to allow scripts to be safely moved.
- React will ignore changes to props after the script has been rendered (React issues a warning in development if this happens).
- React may leave the script in the DOM even after the component that rendered it has been unmounted. (This has no effect as scripts just execute once when they are inserted into the DOM.)
- The component might be committed before the script has finished loading. You can start depending on the script content once the `load` event is fired, e.g. by using the `onLoad` prop.
- Inline scripts are not de-duplicated or moved to the document `<head>`.
- Calling `preinit` may allow the browser to start fetching the script earlier than rendering a `<script>` component, for example by sending an HTTP Early Hints response.
- Built-in DOM element, distinct from framework script components: see nextjs-app (`next/script`) and react-router.

## Related

- [link](./link.md)
- [Common components](./common.md)
