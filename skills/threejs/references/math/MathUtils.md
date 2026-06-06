# MathUtils

A collection of static utility functions for common mathematical operations.

## Signature / Usage

```js
import { MathUtils } from 'three';

const clamped = MathUtils.clamp(value, 0, 1);
const radians = MathUtils.degToRad(90);
const id = MathUtils.generateUUID();
const t = MathUtils.smoothstep(x, 0, 1);
```

## Key Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `clamp` | `(value, min, max): number` | Clamps `value` between `min` and `max` |
| `degToRad` | `(degrees): number` | Converts degrees to radians |
| `radToDeg` | `(radians): number` | Converts radians to degrees |
| `lerp` | `(x, y, t): number` | Linear interpolation; `t=0` → `x`, `t=1` → `y` |
| `inverseLerp` | `(x, y, value): number` | Returns `t` such that `lerp(x, y, t) = value` |
| `damp` | `(x, y, lambda, dt): number` | Frame-rate-independent exponential smoothing |
| `smoothstep` | `(x, min, max): number` | Smooth S-curve interpolation (0–1 range) |
| `smootherstep` | `(x, min, max): number` | Smoother S-curve with zero 1st/2nd derivatives at edges |
| `mapLinear` | `(x, a1, a2, b1, b2): number` | Remaps `x` from range [a1, a2] to [b1, b2] |
| `euclideanModulo` | `(n, m): number` | Always-positive modulo: `((n % m) + m) % m` |
| `isPowerOfTwo` | `(value): boolean` | Checks if `value` is a power of two |
| `ceilPowerOfTwo` | `(value): number` | Smallest power of two ≥ `value` |
| `floorPowerOfTwo` | `(value): number` | Largest power of two ≤ `value` |
| `randInt` | `(low, high): number` | Random integer in [low, high] |
| `randFloat` | `(low, high): number` | Random float in [low, high] |
| `randFloatSpread` | `(range): number` | Random float in [-range/2, range/2] |
| `seededRandom` | `(s): number` | Deterministic pseudo-random float [0, 1) |
| `generateUUID` | `(): string` | Generates a UUID |
| `pingpong` | `(x, length?): number` | Bounces `x` between 0 and `length` (default 1) |
| `setQuaternionFromProperEuler` | `(q, a, b, c, order): void` | Sets quaternion from intrinsic Proper Euler angles |

## Notes

- `damp` is suitable for smooth camera following: `pos = MathUtils.damp(pos, target, lambda, deltaTime)`.
- `euclideanModulo` avoids negative results unlike the `%` operator for negative inputs.
- See official docs for full function list: https://threejs.org/docs/#api/en/math/MathUtils

## Related

- [Vector3.md](./Vector3.md)
- [Quaternion.md](./Quaternion.md)
