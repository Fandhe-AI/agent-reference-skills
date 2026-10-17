---
source: https://reactnative.dev/docs/0.87/legacy/local-library-setup
---

# Local libraries setup

A local library is a library containing views or modules that is local to the app and not published to a registry. It lives outside the `android/` and `ios/` folders and integrates through autolinking.

## Signature / Usage

Structure with a local library:

```plaintext
MyApp
├── node_modules
├── modules <-- folder for your local libraries
│ └── awesome-module <-- your local library
├── android
├── ios
├── src
├── index.js
└── package.json
```

Create it from the app root with create-react-native-library:

```shell
npx create-react-native-library@latest awesome-module
```

After the prompts, a `modules` folder is created in the project root containing the new module.

**Linking.** The generated library is linked using the `link:` protocol with Yarn and `file:` with npm.

npm:

```json
"dependencies": {
  "awesome-module": "file:./modules/awesome-module"
}
```

Yarn:

```json
"dependencies": {
  "awesome-module": "link:./modules/awesome-module"
}
```

This creates a symlink under `node_modules`, which makes autolinking work. Install dependencies to link the module (`npm install` / `yarn install`), then import by name:

```js
import {multiply} from 'awesome-module';
```

## Notes

- Because the code sits outside `android/` and `ios/`, it is easier to upgrade React Native versions later and to copy to other projects (page text).
- This page has no Legacy Architecture deprecation banner in the source, but it sits under the `legacy/` docs section.

## Related

- [native-modules-intro.md](./native-modules-intro.md)
- [native-modules-setup.md](./native-modules-setup.md)
- [Create a Module Library](../native-development/create-module-library.md)
