---
source: https://docs.expo.dev/eas-update/runtime-versions/
---

# Runtime versions and updates

Learn about different runtime version policies and how they may suit your project.

## Signature / Usage

Runtime versions guarantee compatibility between a build's native code and an update. Any time native code is updated, a new build is required before publishing an update. Set a custom runtime version in app config:

```json
{
  "expo": {
    "runtimeVersion": "1.0.0"
  }
}
```

### Setting `"runtimeVersion"`

- **Policies**: derive the runtime version from other project information. The available policies (`appVersion`, `nativeVersion`, `fingerprint`) are documented in the `expo-updates` library documentation (see [Updates](./updates.md)).
- **Custom runtime version**: set a string manually to control which updates are compatible with which builds. It must meet the runtime version formatting requirements in app config.
- **Platform-specific**: set per platform; the platform-specific value takes precedence over the top-level one.

```json
{
  "expo": {
    "android": {
      "runtimeVersion": "1.0.0"
    }
  }
}
```

```json
{
  "expo": {
    "android": {
      "runtimeVersion": {
        "policy": "appVersion"
      }
    }
  }
}
```

### Avoiding incompatible updates

An update may rely on native code that the build does not support (for example, a newly installed `expo-camera` without a changed `"runtimeVersion"`). `expo-updates` may detect an error and attempt to roll back to the previously working update (see [Error recovery](./error-recovery.md)). Strategies:

- **Use a policy that updates automatically**: `"appVersion"` increments the runtime version when the app version is incremented, but forgetting to bump the app version causes a mismatch. `"fingerprint"` increments whenever anything that may impact the native runtime changes, making incompatible updates extremely unlikely at the cost of creating builds more often.
- **Manually increment** the `"runtimeVersion"` property in app config whenever installing or updating native code.
- **Roll out gradually**: use [rollouts](./rollouts.md) to a small percentage of users and monitor the error rate on the EAS dashboard; cancel the rollout on high error rates, or [roll back](./rollbacks.md) if fully rolled out.
- **Manually verify with a smaller group**: create a preview build that uses the same runtime but points to a different channel, or opt in certain users with channel surfing.

## Notes

- Source modificationDate: July 03, 2026 (fetched 2026-10-17).

## Related

- [Updates](./updates.md)
- [Deploy updates](./deployment.md)
- [Rollouts](./rollouts.md)
- [Rollbacks](./rollbacks.md)
- [Error recovery](./error-recovery.md)
