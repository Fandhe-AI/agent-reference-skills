---
source: https://docs.expo.dev/custom-builds/functions/
---

# TypeScript functions

Learn how to create and use EAS Build functions in your custom build configurations.

## Signature / Usage

EAS Build functions extend custom builds with reusable steps written in JavaScript, TypeScript, or Bash. Create a module from the directory containing **eas.json**:

```sh
npx create-eas-build-function@latest ./.eas/build/myFunction
```

Generated **src/index.ts**:

```ts
import { BuildStepContext } from '@expo/steps';

async function myFunction(ctx: BuildStepContext): Promise<void> {
  ctx.logger.info('Hello from my TypeScript function!');
}

export default myFunction;
```

Compile to a single JavaScript file (default `build` script uses ncc; install with `npm install -g @vercel/ncc`):

```json
{
  "scripts": {
    "build": "ncc build ./src/index.ts -o build/ --minify --no-cache --no-source-map-register"
  }
}
```

Expose in **.eas/build/config.yml** (`path` is relative to the config file):

```yaml
build:
  name: My example config
  steps:
    - eas/checkout
    - eas/install_node_modules
    - my_function
    - run:
        name: Finished
        command: echo Finished

functions:
  my_function:
    name: My function
    path: ./myFunction
```

Inputs and outputs:

```yaml
functions:
  my_function:
    name: My function
    inputs:
      - name: num1
        type: number
      - name: num2
        type: number
    outputs:
      - name: sum
    path: ./myFunction
```

```ts
interface FunctionInputs {
  num1: BuildStepInput<BuildStepInputValueTypeName.NUMBER, true>;
  num2: BuildStepInput<BuildStepInputValueTypeName.NUMBER, true>;
}

interface FunctionOutputs {
  sum: BuildStepOutput<true>;
}

// inside the function:
outputs.sum.set(sum.toString()); // Currently, outputs must be strings.
```

## Notes

- Run `npm run build` after every change; **build/index.js** must be uploaded as part of the project archive and not excluded by **.gitignore** or **.easignore**.
- Assumes a custom build workflow is already configured in **eas.json**.
- Most built-in functions are open-source and can be used as references; an example repository (expo/eas-custom-builds-example) shows functions, env vars and artifact uploads.
- Source modificationDate: July 28, 2026 (fetched 2026-10-17).

## Related

- [Custom build configuration schema](./custom-builds-schema.md)
- [Ignore files via .easignore](./easignore.md)
