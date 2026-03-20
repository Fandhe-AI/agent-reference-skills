# View Transitions

Animate between page transitions using the browser's View Transitions API. Without extra CSS, adds a cross-fade; with `view-transition-name` CSS, enables element-level animations.

**Available in:** Framework mode and Data mode.

## 実装方法

1. Add `viewTransition` prop to `<Link>`, `<NavLink>`, or `<Form>`
2. Or pass `{ viewTransition: true }` to `useNavigate()`
3. Assign `view-transition-name` CSS property to elements that should animate
4. Use `isTransitioning` render prop on `<NavLink>` or `useViewTransitionState(href)` hook to conditionally apply transition names

## コード例

```tsx
// Basic cross-fade
<Link to="/about" viewTransition>About</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate("/about", { viewTransition: true });
```

```tsx
// Element-level transition with NavLink render prop
<NavLink to={`/image/${idx}`} viewTransition>
  {({ isTransitioning }) => (
    <>
      <p style={{ viewTransitionName: isTransitioning ? "image-title" : "none" }}>
        Image {idx}
      </p>
      <img
        src={src}
        style={{ viewTransitionName: isTransitioning ? "image-expand" : "none" }}
      />
    </>
  )}
</NavLink>
```

```css
/* Detail page — match the same transition names */
.image-detail h1 { view-transition-name: image-title; }
.image-detail img { view-transition-name: image-expand; }
```

## 注意点

- Browser support for the View Transitions API varies; add a feature check or graceful degradation as needed
- Each `view-transition-name` value must be unique on the page at the time of the transition
- `useViewTransitionState(href)` returns `true` when a transition to that href is in progress

## 関連

- [./navigation-blocking.md](./navigation-blocking.md)
