---
source: https://docs.expo.dev/config-plugins/plugins/
---

# Create and use config plugins

How to create a config plugin, pass parameters, chain plugins, and use a plugin from an Expo library. The examples use a dynamic app config (**app.config.ts**), required for function-based plugins that accept parameters.

## Signature / Usage

Android plugin adding a `HelloWorldMessage` meta-data entry:

```ts
import { ConfigPlugin, withAndroidManifest } from 'expo/config-plugins';

const withAndroidPlugin: ConfigPlugin = config => {
  // Define a custom message
  const message = 'Hello world, from Expo plugin!';

  return withAndroidManifest(config, config => {
    const mainApplication = config?.modResults?.manifest?.application?.[0];

    if (mainApplication) {
      // Ensure meta-data array exists
      if (!mainApplication['meta-data']) {
        mainApplication['meta-data'] = [];
      }

      // Add the custom message as a meta-data entry
      mainApplication['meta-data'].push({
        $: {
          'android:name': 'HelloWorldMessage',
          'android:value': message,
        },
      });
    }

    return config;
  });
};

export default withAndroidPlugin;
```

iOS plugin:

```ts
import { ConfigPlugin, withInfoPlist } from 'expo/config-plugins';

const withIosPlugin: ConfigPlugin = config => {
  const message = 'Hello world, from Expo plugin!';

  return withInfoPlist(config, config => {
    config.modResults.HelloWorldMessage = message;
    return config;
  });
};

export default withIosPlugin;
```

Accepting parameters (update both plugins to read `options.message`). Android (**withAndroidPlugin.ts**):

```ts
import { ConfigPlugin, withAndroidManifest } from 'expo/config-plugins';

type AndroidProps = {
  message?: string;
};

const withAndroidPlugin: ConfigPlugin<AndroidProps> = (
  config,
  options = {}
) => {
  const message = options.message || 'Hello world, from Expo plugin!';
  return withAndroidManifest(config, config => {
    const mainApplication = config?.modResults?.manifest?.application?.[0];

    if (mainApplication) {
      if (!mainApplication['meta-data']) {
        mainApplication['meta-data'] = [];
      }

      mainApplication['meta-data'].push({
        $: {
          'android:name': 'HelloWorldMessage',
          'android:value': message,
        },
      });
    }

    return config;
  });
};

export default withAndroidPlugin;
```

iOS (**withIosPlugin.ts**):

```ts
import { ConfigPlugin, withInfoPlist } from 'expo/config-plugins';

type IosProps = {
  message?: string;
};

const withIosPlugin: ConfigPlugin<IosProps> = (config, options = {}) => {
  const message = options.message || 'Hello world, from Expo plugin!';

  return withInfoPlist(config, config => {
    config.modResults.HelloWorldMessage = message;
    return config;
  });
};

export default withIosPlugin;
```

Combined plugin and parameters:

```ts
import { ConfigPlugin } from 'expo/config-plugins';
import withAndroidPlugin from './withAndroidPlugin';
import withIosPlugin from './withIosPlugin';

const withPlugin: ConfigPlugin<{ message?: string }> = (config, options = {}) => {
  config = withAndroidPlugin(config, options);
  return withIosPlugin(config, options);
};

export default withPlugin;
```

Calling from dynamic app config (requires `tsx` for TypeScript plugins):

```ts
import "tsx/cjs";

plugins: [
  ["./plugins/withPlugin.ts", { message: "Custom message from app.config.ts" }],
],
```

```sh
npx expo prebuild --clean --no-install
```

Chaining with `withPlugins`:

```ts
import { withPlugins } from 'expo/config-plugins';

withPlugins(config, [
  [withFoo, 'input 1'],
  [withBar, 'input 2'],
  // When no input is required, you can just pass the method
  withDelta,
]);
```

Using a library plugin:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera."
        }
      ]
    ]
  }
}
```

## Notes

- The parameter examples are assembled from the official snippets, which elide the unchanged body with `...`.
- Install `tsx` (`npm install --save-dev tsx`) to write plugins in TypeScript; rename **app.json** to **app.config.ts** and add `import 'tsx/cjs'` at the top.
- Plugins in the `plugins` array run in order; the output of one is the input to the next. The array uses `withPlugins` under the hood. Chaining is also supported in **app.json**.
- Library plugins are installed like any library (`npx expo install expo-camera`); each Expo library with a plugin documents its options in its API reference.
- Changes do not take effect until the native project is rebuilt. In CNG projects, plugins are applied during the prebuild step in EAS Build or when running `npx expo prebuild|android|ios` locally.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [Introduction to config plugins](./config-plugins-introduction.md)
- [Mods](./mods.md)
- [Developing and debugging a plugin](./plugin-development-debugging.md)
