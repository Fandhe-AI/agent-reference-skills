---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect
---

# set-state-in-effect

Validates against calling setState synchronously in an effect, which can lead to re-renders that degrade performance.

## Signature / Usage

```js
// ❌ Synchronous setState in effect
function Component({data}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data); // Extra render, use initial state instead
  }, [data]);
}

// ❌ Deriving state from props
function Component({selectedId, items}) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(items.find(i => i.id === selectedId));
  }, [selectedId, items]);
}

// ✅ setState in an effect is fine if the value comes from a ref
function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
}

// ✅ Calculate during render
function Component({selectedId, items}) {
  const selected = items.find(i => i.id === selectedId);
  return <div>{selected?.name}</div>;
}
```

## Notes

- Setting state immediately inside an effect forces React to restart the entire render cycle. React must re-render your component, apply changes to the DOM, and then run effects again. Transform data at the top level of your component instead.
- Synchronous `setState` calls in effects trigger immediate re-renders before the browser can paint, causing performance issues and visual jank.
- Common violations: setting loading state synchronously (`setLoading(true)` at the start of an effect); deriving state from props in effects; transforming data in effects instead of render (`setProcessed(rawData.map(transform))`).
- When something can be calculated from the existing props or state, don't put it in state. Instead, calculate it during rendering.
- In many cases, you may also not need an effect at all (see You Might Not Need an Effect).

## Related

- [useEffect](../hooks/useEffect.md)
- [set-state-in-render](./lint-set-state-in-render.md)
