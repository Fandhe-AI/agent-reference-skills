---
source: https://reactnative.dev/docs/0.87/the-new-architecture/custom-cxx-types
---

# Advanced: Custom C++ Types

C++ Turbo Native Modules bridge most `std::` standard types out of the box. To support new and custom types, provide the necessary `bridging` header file.

## Signature / Usage

### Custom type: Int64

`int64_t` is not supported yet, because JavaScript does not support numbers greater than 2^53. Use a `string` in JS and convert it to `int64_t` in C++.

`shared/Int64.h`:

```cpp
#pragma once

#include <react/bridging/Bridging.h>

namespace facebook::react {

template <>
struct Bridging<int64_t> {
  // Converts from the JS representation to the C++ representation
  static int64_t fromJs(jsi::Runtime &rt, const jsi::String &value) {
    try {
      size_t pos;
      auto str = value.utf8(rt);
      auto num = std::stoll(str, &pos);
      if (pos != str.size()) {
        throw std::invalid_argument("Invalid number"); // don't support alphanumeric strings
      }
      return num;
    } catch (const std::logic_error &e) {
      throw jsi::JSError(rt, e.what());
    }
  }

  // Converts from the C++ representation to the JS representation
  static jsi::String toJs(jsi::Runtime &rt, int64_t value) {
    return bridging::toJs(rt, std::to_string(value));
  }
};

}
```

Modify the JS spec.

**TypeScript** (`NativeSampleModule.ts`)

```diff
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
+  readonly cubicRoot: (input: string) => number;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

**Flow** (`NativeSampleModule.js`)

```diff
// @flow
import type {TurboModule} from 'react-native';
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
+  +cubicRoot: (input: string) => number;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

Implement the native code. `NativeSampleModule.h`:

```diff
#pragma once

#include <AppSpecsJSI.h>
#include <memory>
#include <string>

+ #include "Int64.h"

namespace facebook::react {

class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
public:
  NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

  std::string reverseString(jsi::Runtime& rt, std::string input);
+ int32_t cubicRoot(jsi::Runtime& rt, int64_t input);
};

} // namespace facebook::react

```

`NativeSampleModule.cpp`:

```diff
#include "NativeSampleModule.h"
+ #include <cmath>

namespace facebook::react {

NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

+int32_t NativeSampleModule::cubicRoot(jsi::Runtime& rt, int64_t input) {
+    return std::cbrt(input);
+}

} // namespace facebook::react
```

Update `App.tsx`:

```diff
// ...
+ const [cubicSource, setCubicSource] = useState('')
+ const [cubicRoot, setCubicRoot] = useState(0)
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Welcome to C++ Turbo Native Module Example
        </Text>
        <Text>Write down here the text you want to revert</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your text here"
          onChangeText={setValue}
          value={value}
        />
        <Button title="Reverse" onPress={onPress} />
        <Text>Reversed text: {reversedValue}</Text>
+        <Text>For which number do you want to compute the Cubic Root?</Text>
+        <TextInput
+          style={styles.textInput}
+          placeholder="Write your text here"
+          onChangeText={setCubicSource}
+          value={cubicSource}
+        />
+        <Button title="Get Cubic Root" onPress={() => setCubicRoot(SampleTurboModule.cubicRoot(cubicSource))} />
+        <Text>The cubic root is: {cubicRoot}</Text>
      </View>
    </SafeAreaView>
  );
}
//...
```

Test on Android with `yarn android` and on iOS with `yarn ios` from the root folder of the project.

### Structured custom type: Address

```ts
interface Address {
  street: string;
  num: number;
  isInUS: boolean;
}
```

Define the type in the specs.

**TypeScript**

```diff
import {TurboModule, TurboModuleRegistry} from 'react-native';

+export type Address = {
+  street: string,
+  num: number,
+  isInUS: boolean,
+};

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
+ readonly validateAddress: (input: Address) => boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

**Flow**

```diff

// @flow
import type {TurboModule} from 'react-native';
import { TurboModuleRegistry } from "react-native";

+export type Address = {
+  street: string,
+  num: number,
+  isInUS: boolean,
+};


export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
+ +validateAddress: (input: Address) => boolean;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

Define the bridging code in `shared/NativeSampleModule.h`:

```diff
#include "Int64.h"
#include <memory>
#include <string>

namespace facebook::react {
+  using Address = NativeSampleModuleAddress<std::string, int32_t, bool>;

+  template <>
+  struct Bridging<Address>
+      : NativeSampleModuleAddressBridging<Address> {};
  // ...
}
```

Add the function prototype:

```diff
  std::string reverseString(jsi::Runtime& rt, std::string input);

+  bool validateAddress(jsi::Runtime &rt, jsi::Object input);
};

} // namespace facebook::react
```

Implement in `shared/NativeSampleModule.cpp`:

```cpp
bool NativeSampleModule::validateAddress(jsi::Runtime &rt, jsi::Object input) {
  std::string street = input.getProperty(rt, "street").asString(rt).utf8(rt);
  int32_t number = input.getProperty(rt, "num").asNumber();

  return !street.empty() && number > 0;
}
```

Replace the body of `App()` in `App.tsx`:

```tsx
const [street, setStreet] = useState('');
const [num, setNum] = useState('');
const [isValidAddress, setIsValidAddress] = useState<
  boolean | null
>(null);

const onPress = () => {
  let houseNum = parseInt(num, 10);
  if (isNaN(houseNum)) {
    houseNum = -1;
  }
  const address = {
    street,
    num: houseNum,
    isInUS: false,
  };
  const result = SampleTurboModule.validateAddress(address);
  setIsValidAddress(result);
};

return (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        Welcome to C Turbo Native Module Example
      </Text>
      <Text>Address:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your address here"
        onChangeText={setStreet}
        value={street}
      />
      <Text>Number:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your address here"
        onChangeText={setNum}
        value={num}
      />
      <Button title="Validate" onPress={onPress} />
      {isValidAddress != null && (
        <Text>
          Your address is {isValidAddress ? 'valid' : 'not valid'}
        </Text>
      )}
    </View>
  </SafeAreaView>
);
```

## Notes

- This guide builds on the Pure C++ Turbo Native Modules guide.
- Key components of a custom bridging header: an explicit specialization of the `Bridging` struct for the custom type (here `int64_t`), a `fromJs` function (JS to C++) and a `toJs` function (C++ to JS). On iOS, remember to add the `Int64.h` file to the Xcode project.
- From the `Address` type, Codegen generates two helper types: `NativeSampleModuleAddress` and `NativeSampleModuleAddressBridging`. The first is the definition of `Address`; the second holds the infrastructure to bridge it. The only extra step is a `Bridging` structure extending `NativeSampleModuleAddressBridging`.
- The order of the generics in `NativeSampleModuleAddress<std::string, int32_t, bool>` matters: the first template argument refers to the first data type of the struct, the second to the second, and so on.
- Naming convention: the first part of the generated name is the type of the module (`NativeSampleModule`); the second part is the name of the JS type defined in the specs (`Address`).
- In `validateAddress` the `Address` is a `jsi::Object`. JSI accessors: `getProperty()` retrieves a property by name; `asString()` converts to `jsi::String`; `utf8()` converts a `jsi::String` to `std::string`; `asNumber()` converts to a `double`. Functions can also return custom types.

## Related

- [Cross-Platform Native Modules (C++)](./pure-cxx-modules.md)
- [Advanced Topics (Modules)](./advanced-topics-modules.md)
- [Appendix](./appendix.md)
