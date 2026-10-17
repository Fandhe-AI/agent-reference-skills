---
source: https://ui.shadcn.com/docs/installation/laravel
---

# Laravel

Install and configure shadcn/ui for Laravel. The shadcn CLI does not scaffold a new Laravel app; create one with the React starter kit first.

## Signature / Usage

```bash
laravel new my-app
cd my-app
npx shadcn@latest init
npx shadcn@latest add switch
```

```tsx
import { Switch } from "@/components/ui/switch"

const MyPage = () => {
  return (
    <div>
      <Switch />
    </div>
  )
}

export default MyPage
```

## Notes

- Choose the **React** starter kit when prompted by `laravel new`; skip creation if you already have a Laravel app with React and Inertia configured.
- shadcn/create command: `npx shadcn@latest init --preset [CODE] --template laravel`, run from the root of your Laravel app.
- When asked to overwrite `components.json` and components, choose `Yes`.
- `add switch` places the component at `resources/js/components/ui/switch.tsx`; the page example lives in `resources/js/pages/index.tsx`.

## Related

- [Installation](./installation.md)
