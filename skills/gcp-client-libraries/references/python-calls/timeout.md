---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/timeout.py
---

# Timeout classes (google.api_core.timeout)

Decorators that apply a `timeout` keyword argument to a function: a Deadline-dependent timeout (`TimeToDeadlineTimeout`, recommended), a constant timeout (`ConstantTimeout`, DEPRECATED) or an exponential timeout (`ExponentialTimeout`, DEPRECATED). In the broader context they are typically combined with `google.api_core.retry` to implement API methods with a signature that matches `api_method(request, timeout=None, retry=None)`.

## Signature / Usage

### `TimeToDeadlineTimeout` (recommended)

Decreases the timeout set for an RPC based on how much time is left until its deadline. The deadline is calculated as `now + initial_timeout` when the decorator is first called for an RPC, so it implements deadline semantics as a sequence of decreasing timeouts `t0 > t1 > t2 ... tn >= 0`.

```python
class TimeToDeadlineTimeout(object):
    def __init__(self, timeout=None, clock=datetime_helpers.utcnow):
```

### `ConstantTimeout` (DEPRECATED)

Adds a constant timeout argument; effectively equivalent to `functools.partial(func, timeout=timeout)`. Deprecated: use `TimeToDeadlineTimeout`.

```python
class ConstantTimeout(object):
    def __init__(self, timeout=None):
```

### `ExponentialTimeout` (DEPRECATED)

Adds an exponentially increasing timeout argument, computed from the number of times the function has been called. Deprecated: the concept of incrementing timeout exponentially has been deprecated; use `TimeToDeadlineTimeout`.

```python
class ExponentialTimeout(object):
    def __init__(
        self,
        initial=_DEFAULT_INITIAL_TIMEOUT,
        maximum=_DEFAULT_MAXIMUM_TIMEOUT,
        multiplier=_DEFAULT_TIMEOUT_MULTIPLIER,
        deadline=_DEFAULT_DEADLINE,
    ):
```

## Options / Props

| Class | Name | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `TimeToDeadlineTimeout` | `timeout` | `Optional[float]` | `None` | Timeout in seconds applied to the wrapped function. If `None`, the target function is expected to never timeout. |
| `TimeToDeadlineTimeout` | `clock` | callable | `datetime_helpers.utcnow` | Not described in the docstring. From the function body of `TimeToDeadlineTimeout.__call__` in `timeout.py`: called to take the first-attempt and current timestamps used to compute the remaining timeout. |
| `ConstantTimeout` | `timeout` | `Optional[float]` | `None` | Timeout in seconds applied to the wrapped function. If `None`, the target function is expected to never timeout. |
| `ExponentialTimeout` | `initial` | `float` | `5.0` | The initial timeout to pass (module constant `_DEFAULT_INITIAL_TIMEOUT`, seconds). |
| `ExponentialTimeout` | `maximum` | `float` | `30.0` | The maximum timeout for any one call (`_DEFAULT_MAXIMUM_TIMEOUT`, seconds). |
| `ExponentialTimeout` | `multiplier` | `float` | `2.0` | Multiplier applied to the timeout for each invocation (`_DEFAULT_TIMEOUT_MULTIPLIER`). |
| `ExponentialTimeout` | `deadline` | `Optional[float]` | `None` | Overall deadline across all invocations, to stop a large calculated timeout from pushing total time over the deadline. If `None`, timeouts are not adjusted for an overall deadline. |

`ExponentialTimeout.with_deadline(deadline)` returns a copy with the given deadline.

## Notes

- Applies to google-api-core 2.44.0 (PyPI), Python `>=3.10`.
- Wrapped functions must accept a `timeout` keyword argument; each decorator's `__call__(func)` returns the wrapped callable.
- Timeout (RPC timeout) is distinct from `Retry.timeout` (how long retrying continues) and the polling timeout; see `retry.md` and `polling.md`.
- Source inconsistency: the module docstring example and the `ExponentialTimeout` class docstring illustrate the DEPRECATED `ExponentialTimeout` (the class docstring's `.. code-block:: python` is empty after "For example"); this page does not reproduce that example. Separately, the `wrap_method` docstring refers to `timeout.Timeout(deadline=60)` but this module defines no `Timeout` class (see `gapic-method.md`).
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/timeout.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Snippet taken from the source above (class signatures only). Blocks are fragments.

## Related

- [retry.md](./retry.md)
- [gapic-method.md](./gapic-method.md)
- [polling.md](./polling.md)
