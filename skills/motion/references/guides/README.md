# Guides

| Name | Description | Path |
|------|-------------|------|
| Accessibility | Respect the OS "Reduced Motion" setting to avoid motion sickness and usability issues. Motion provides `MotionConfig` and the `useReducedMotion` hook. | [accessibility.md](./accessibility.md) |
| Installation | Install Motion for React and import the `motion` component. Requires React 18.2 or higher. | [installation.md](./installation.md) |
| Migrate from GSAP | Motion separates animation values from options into distinct objects and uses declarative timelines, the Web Animations API, and ScrollTimeline for hardware-accelerated, tree-shakeable animations. | [migrate-from-gsap.md](./migrate-from-gsap.md) |
| Performance | Animate cheap, compositor-only properties (`transform`, `opacity`) to keep animations hardware-accelerated and smooth even when the main JS thread is busy. | [performance.md](./performance.md) |
| Reduce Bundle Size | Replace the full `motion` component (34kb) with the slim `m` component plus `LazyMotion` to cut the initial bundle to under 4.6kb, loading animation features on demand. | [reduce-bundle-size.md](./reduce-bundle-size.md) |
| Troubleshooting | Motion's error/warning guide: each runtime message links to a dedicated page explaining the message, its cause, and the fix. This page summarizes the most common ones. | [troubleshooting.md](./troubleshooting.md) |
| Upgrade from Framer Motion | Framer Motion was renamed to Motion. Uninstall `framer-motion`, install `motion`, and update imports from `"framer-motion"` to `"motion/react"`. | [upgrade-guide.md](./upgrade-guide.md) |
