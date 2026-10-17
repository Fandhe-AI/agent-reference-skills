---
source: https://reactnative.dev/docs/0.87/easing
---

# Easing

The `Easing` module implements common easing functions. This module is used by `Animated.timing()` to convey physically believable motion in animations. A visualization of common easing functions is at https://easings.net/.

## Signature / Usage

```tsx
Animated.timing(opacity, {
  toValue: 1,
  duration: 1200,
  easing: Easing.inOut(Easing.elastic(1)),
  useNativeDriver: false,
}).start();
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `step0()` | `static step0(n: number)` | A stepping function, returns 1 for any positive value of `n`. |
| `step1()` | `static step1(n: number)` | A stepping function, returns 1 if `n` is greater than or equal to 1. |
| `linear()` | `static linear(t: number)` | A linear function, `f(t) = t`. Position correlates to elapsed time one to one. |
| `ease()` | `static ease(t: number)` | A basic inertial interaction, similar to an object slowly accelerating to speed. |
| `quad()` | `static quad(t: number)` | A quadratic function, `f(t) = t * t`. |
| `cubic()` | `static cubic(t: number)` | A cubic function, `f(t) = t * t * t`. |
| `poly()` | `static poly(n: number)` | A power function. Position is equal to the Nth power of elapsed time (n = 4 quartic, n = 5 quintic). |
| `sin()` | `static sin(t: number)` | A sinusoidal function. |
| `circle()` | `static circle(t: number)` | A circular function. |
| `exp()` | `static exp(t: number)` | An exponential function. |
| `elastic()` | `static elastic(bounciness: number)` | A basic elastic interaction, similar to a spring oscillating back and forth. Default bounciness is 1, which overshoots a little bit once. 0 bounciness doesn't overshoot at all, and bounciness of N > 1 will overshoot about N times. |
| `back()` | `static back(s)` | Use with `Animated.parallel()` to create a basic effect where the object animates back slightly as the animation starts. |
| `bounce()` | `static bounce(t: number)` | Provides a basic bouncing effect. |
| `bezier()` | `static bezier(x1: number, y1: number, x2: number, y2: number)` | Provides a cubic bezier curve, equivalent to CSS Transitions' `transition-timing-function`. |
| `in()` | `static in(easing: EasingFunction): EasingFunction` | Runs an easing function forwards. |
| `out()` | `static out(easing: EasingFunction): EasingFunction` | Runs an easing function backwards. |
| `inOut()` | `static inOut(easing: EasingFunction): EasingFunction` | Makes any easing function symmetrical. Runs forwards for half of the duration, then backwards for the rest. |

## Notes

- Groups: predefined animations (`back`, `bounce`, `ease`, `elastic`), standard functions (`linear`, `quad`, `cubic`; `poly` for higher powers), additional functions (`bezier`, `circle`, `sin`, `exp`) and the helpers `in`, `inOut`, `out`.
- The 0.87 docs page writes `easing: number` for in/out/inOut; Easing.d.ts types the parameter and return value as `EasingFunction`.
- A cubic bezier curve visualization tool: https://cubic-bezier.com/.
- This is the React Native `Easing` module; distinct from Motion for React (motion), Jetpack Compose animation (android-compose-graphics-animation) and SwiftUI animation (apple-swiftui).

## Related

- [Animated](./animated.md)
- [Animations](./animations.md)
