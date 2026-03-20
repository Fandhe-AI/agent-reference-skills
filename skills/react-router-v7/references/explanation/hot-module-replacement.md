# Hot Module Replacement (HMR)

HMR updates modules in your app without a full page reload, preserving browser state (form inputs, modal states) across code changes.

**Availability**: Framework Mode only (requires Vite).

## 詳細説明

React Router leverages **React Fast Refresh** for component updates. Vite handles the HMR transport layer. React Router's Vite plugin automatically ensures route module exports (`loader`, `action`, `links`, `meta`, `headers`) are HMR-compatible.

**What state is preserved:**
- Form field values
- Modal/dialog open states
- Scroll positions
- Any React component state that Fast Refresh can track

## コード例

**Named exports — compatible:**
```tsx
export const ComponentA = () => {};   // ✅
export function ComponentB() {}       // ✅
export default function ComponentC() {} // ✅
```

**Anonymous exports — cause full reload:**
```tsx
export default () => {};              // ❌
export default function () {}         // ❌
```

**Route module exports — automatically handled:**
```tsx
export const meta = { title: "Home" };        // ✅ HMR-compatible
export const links = [{ rel: "stylesheet" }]; // ✅
export async function loader() {}             // ✅
export async function action() {}             // ✅
export default function Route() {}            // ✅

export const myValue = "custom export";       // ❌ causes full reload
```

**Move custom values to a separate module:**
```tsx
// my-custom-value.ts
export const myValue = "some value";
```

## 注意点

- **Class components** and HOCs that return classes do not preserve state with Fast Refresh
- **Renaming hook destructure keys** (e.g., `{ pet }` → `{ dog }`) causes a full reload for that component
- **Adding or removing hooks** from a component triggers a full reload
- User-defined non-route exports in route files cause full reloads — move them to separate modules
- In some cases, explicit `key` props are needed when modifying sibling elements

## 関連

- [Code Splitting](./code-splitting.md)
- [Lazy Route Discovery](./lazy-route-discovery.md)
