---
source: https://react.dev/reference/react/Activity
---

# `<Activity>`

`<Activity>` lets you hide and restore the UI and internal state of its children.

## Signature / Usage

```js
<Activity mode={isShowingSidebar ? 'visible' : 'hidden'}>
  <Sidebar />
</Activity>
```

When hidden, React visually hides its children using `display: "none"` and destroys their Effects, cleaning up any active subscriptions. While hidden, children still re-render in response to new props, at a lower priority. When visible again, React reveals the children with their previous state restored and re-creates their Effects.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| children | ReactNode | The UI you intend to show and hide. |
| mode | `'visible'` \| `'hidden'` | Defaults to `'visible'` if omitted. |

## Notes

- If an Activity is rendered inside a `ViewTransition`, and it becomes visible as a result of an update caused by `startTransition`, it activates the ViewTransition's `enter` animation. If it becomes hidden, it activates its `exit` animation.
- A hidden Activity that just renders text will not render anything, because there is no DOM element to apply visibility changes to.
- Pre-rendering: when an Activity is hidden during its initial render, its children are still rendered at lower priority, without mounting their Effects. Only data read from a source that activates a Suspense boundary (e.g. a Promise read with `use`) is fetched during pre-rendering; data fetched inside an Effect is not detected.
- Hidden DOM is not destroyed, so side effects from DOM such as `<video>`, `<audio>`, `<iframe>` persist. Add an Effect with a cleanup function (the example uses `useLayoutEffect`) to pause or clean them up.
- Activity boundaries participate in Selective Hydration, like Suspense boundaries. Always-visible `<Activity>` boundaries can be added to improve hydration performance.
- Effects of hidden children are cleaned up; conceptually, hidden Activities should be thought of as unmounted. Do not rely on an Effect mounting to clean up side effects; do the work in the returned cleanup function.
- `<StrictMode>` is recommended to eagerly find Effects without proper cleanup.

```js
export default function VideoTab() {
  const ref = useRef();

  useLayoutEffect(() => {
    const videoRef = ref.current;

    return () => {
      videoRef.pause()
    }
  }, []);

  return (
    <video
      ref={ref}
      controls
      playsInline
      src="..."
    />
  );
}
```

## Related

- [Suspense](./Suspense.md)
- [StrictMode](./StrictMode.md)
- [ViewTransition](./ViewTransition.md)
- [Fragment](./Fragment.md)
