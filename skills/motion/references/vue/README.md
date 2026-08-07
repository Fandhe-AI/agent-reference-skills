# Vue

| Name | Description | Path |
|------|-------------|------|
| AnimateNumber | Motion+ component for beautiful number animations like countdowns, built on Motion's layout animation system and based on Max Barvian's NumberFlow. | [animate-number.md](./animate-number.md) |
| AnimatePresence | Enables exit animations by wrapping motion components, giving access to the `exit` animation prop when they are removed from the tree. | [animate-presence.md](./animate-presence.md) |
| Carousel | Motion+ component for performant, accessible, infinitely-scrolling carousels in Vue with pointer, wheel, and keyboard navigation. | [carousel.md](./carousel.md) |
| Cursor | Motion+ component for building custom cursors and follow-along effects in Vue, auto-adapting to links, text, and buttons. | [cursor.md](./cursor.md) |
| v-motion | Declarative animation directive for HTML/SVG elements, offering most of the `<motion />` component's power without a wrapper component. | [directive.md](./directive.md) |
| Gestures | UI gesture recognition — hover, press, pan, drag, and inView — with event listeners and `while-` animation props. | [gestures.md](./gestures.md) |
| Layout animations | FLIP-powered layout animation for Vue, animating CSS layout changes via the `layout` prop and shared elements via `layoutId`. | [layout-animations.md](./layout-animations.md) |
| LayoutGroup | Coordinates layout animations between Motion components that don't render together but affect each other's state, and namespaces `layoutId` values. | [layout-group.md](./layout-group.md) |
| LazyMotion | Reduces initial bundle size by loading animation features synchronously or asynchronously, paired with the lightweight `m` component. | [lazy-motion.md](./lazy-motion.md) |
| MotionConfig | Configures all child motion components: global transitions, `reducedMotion` preference, and CSP nonce compliance. | [motion-config.md](./motion-config.md) |
| motion | Drop-in replacement for HTML and SVG elements that adds declarative animation and gesture props to Vue components. | [motion.md](./motion.md) |
| Motion values | Composable, signal-like values that Motion renders with its optimized DOM renderer, tracking state and velocity without triggering Vue's render cycle. | [motion-value.md](./motion-value.md) |
| Vue animation overview | Motion for Vue provides multiple approaches to animating UI, from simple property-based animation to orchestration, via the `<motion />` component. | [overview.md](./overview.md) |
| Reka-UI integration | Guide for combining Motion for Vue's animation capabilities with Reka-UI (formerly Radix Vue) components via the `asChild` prop. | [radix.md](./radix.md) |
| Reorder | Lightweight drag-to-reorder list components: `Reorder.Group` and `Reorder.Item`. | [reorder.md](./reorder.md) |
| Scroll animations | Scroll-triggered animation via `whileInView` and scroll-linked animation via `useScroll`, for parallax and progress-bar effects. | [scroll-animations.md](./scroll-animations.md) |
| Ticker | Motion+ component for infinitely-scrolling marquee-style animations, cloning only the elements needed for the current viewport. | [ticker.md](./ticker.md) |
| Transitions | The `transition` prop defines animation behavior through time-based (tween) or physics-based (spring) animation. | [transitions.md](./transitions.md) |
| Typewriter | Motion+ component (1.5kb) for realistic typewriter text animations with human-like typing variance and accessible cursors. | [typewriter.md](./typewriter.md) |
| useAnimate | Provides an `animate` function scoped to the elements within a component, with manual controls, timelines, and automatic cleanup. | [use-animate.md](./use-animate.md) |
| useAnimationFrame | Executes a callback on every animation frame, supplying elapsed time and delta for frame-level animation control. | [use-animation-frame.md](./use-animation-frame.md) |
| useDragControls | Manually initiates drag gestures from any pointer event, rather than only from direct interaction with a draggable component. | [use-drag-controls.md](./use-drag-controls.md) |
| useInView | Lightweight composable (0.6kb) that monitors when a DOM element becomes visible in the viewport, returning a reactive boolean. | [use-in-view.md](./use-in-view.md) |
| useMotionTemplate | Generates a reactive motion value from a tagged template string containing other motion values. | [use-motion-template.md](./use-motion-template.md) |
| useMotionValueEvent | Manages motion value event listeners with automatic cleanup on unmount, wrapping the motion value's underlying `on()` method. | [use-motion-value-event.md](./use-motion-value-event.md) |
| useReducedMotion | Detects whether a device has Reduced Motion accessibility settings enabled, and reactively updates when the setting changes. | [use-reduced-motion.md](./use-reduced-motion.md) |
| useScroll | Builds scroll-linked animations such as progress indicators and parallax effects, using the browser's ScrollTimeline API. | [use-scroll.md](./use-scroll.md) |
| useSpring | Creates a motion value that animates to its latest target using spring physics, settable manually or by tracking another motion value. | [use-spring.md](./use-spring.md) |
| useTime | Returns a motion value that updates once per frame with the duration, in milliseconds, since it was first created. | [use-time.md](./use-time.md) |
| useTransform | Creates a new motion value that transforms the output of one or more motion values, via a transform function or value mapping. | [use-transform.md](./use-transform.md) |
| useVelocity | Accepts a motion value and returns a new one that tracks the rate of change of the original value. | [use-velocity.md](./use-velocity.md) |
