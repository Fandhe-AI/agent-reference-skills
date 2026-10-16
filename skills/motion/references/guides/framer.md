# Motion x Framer

Use the full Motion for React API in Framer code components and overrides.

## Signature / Usage

```tsx
import { motion, useSpring } from "framer-motion"
```

```tsx
export function withRotateAnimation(Component): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                animate={{ rotate: 90 }}
                transition={{ duration: 2 }}
                style={{ ...props.style, x: 100 }}
            />
        )
    })
}
```

## Notes

- Framer sites are already powered by Motion; code is only needed for code components and overrides.
- In Framer, import from `"framer-motion"` wherever the Motion docs say `"motion/react"`.
- Components returned by overrides support the full `motion` component API (`animate`, `transition`, `whileHover`, etc.).
- Source: https://motion.dev/docs/framer (fetched 2026-10).

## Related

- [Installation](./installation.md)
- [Upgrade from Framer Motion](./upgrade-guide.md)
