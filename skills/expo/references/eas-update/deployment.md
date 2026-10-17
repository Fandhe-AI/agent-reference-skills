---
source: https://docs.expo.dev/eas-update/deployment/
---

# Deploy updates

Learn a simple but powerful process for safely deploying updates to your users.

## Signature / Usage

A simple release process that uses **channels** and **runtime versions** and mostly ignores branches. Channels indicate the environment (such as "production" or "staging"); runtime versions indicate the app version the update targets (such as "1.0.0").

Adapted (not in the official docs): adds `--environment`, which the EAS CLI reference marks as required for Expo SDK 55 or greater.

```sh
eas update --channel staging --environment production
eas update --channel production --environment production
```

### Configuring your project

Run `eas update:configure` if you have not already. With EAS Build, each profile points to a channel of the same name. Approximate configuration:

```json
{
  "build": {
    "production": {
      "channel": "production"
    },
    "staging": {
      "channel": "staging"
    },
    "preview": {
      "channel": "preview",
      "distribution": "internal"
    }
  }
}
```

Without EAS Build, modify the channel in your native project configuration (set "production" for production releases and "preview" for staging).

`eas update:configure` sets `"runtimeVersion": { "policy": "appVersion" }` by default, so the runtime version equals the app version shown in the store (without build number or version code; `"1.0.0"`, not `"1.0.0(1)"`):

```json
{
  "expo": {
    "runtimeVersion": {
      "policy": "appVersion"
    }
  }
}
```

The `"fingerprint"` policy is experimental and not yet widely recommended in this guide.

### Deploying

- **Previews**: preview updates in internal distribution release builds (use a channel per feature such as "preview-feature-a") or in development builds, which can load updates from any channel provided the runtime version is compatible.
- **Staging**: `eas update --channel staging --environment production` makes the hotfix available to staging builds with the targeted runtime version. Staging is typically Google Play Beta or TestFlight. Create a staging build whenever you upload a production build (`eas build --profile staging --auto-submit` alongside `eas build --profile production --auto-submit`).
- **Production**: `eas update --channel production --environment production`. If you already verified the fix on staging, republish from the same commit. With identical environment variables and code signing configuration on staging and production, promote with `eas update:republish --destination-channel production` to use the exact bundle tested in staging.
- **Runtime versions**: increment the app version with each new production build for a unique runtime version per release.
- **Gradual rollout**: `eas update --rollout-percentage 10 --environment production` rolls out to 10% of users; edit later with `eas update:edit`. Per-update rollouts operate on a single update; branch-based rollouts switch a channel over to a different branch.
- **Rollback**: `eas update:rollback` initiates a rollback to a previous update.

## Notes

- The official guide examples omit `--environment`; it is required for SDK 55+ (EAS CLI reference). The `--environment` values shown here are adapted, not from the official guide.
- The `staging` build profile sets no `environment`, so with the default `store` distribution EAS Build uses `production`; pass the same environment to `eas update`, or set `build.staging.environment` explicitly. A `staging` EAS environment would be a custom environment, available only on Enterprise and Production plans (EAS environment variables usage / manage pages).
- Each binary version must always point to a single channel, and you cannot change the channel embedded in a build after you create it. On SDK 54 and later, channel surfing lets an installed release build request updates from a different channel at runtime.
- As an escape hatch you can host your own update service compatible with the Expo Updates Protocol; only "Runtime Version" and "Platform" exist at the protocol level.
- Source modificationDate: August 11, 2026 (fetched 2026-10-17).

## Related

- [Preview updates](./preview.md)
- [Rollouts](./rollouts.md)
- [Rollbacks](./rollbacks.md)
- [Runtime versions and updates](./runtime-versions.md)
- [Bundle diffing for EAS Update](./bundle-diffing.md)
