---
source: https://developers.cloudflare.com/workers/runtime-apis/rpc/visibility/
---

# RPC visibility and security model

Which properties are and are not exposed to clients communicating via RPC, and the capability-based security model behind it.

## Signature / Usage

```js
class Foo extends RpcTarget {
  constructor() {
    super();

    // i CANNOT be accessed over RPC
    this.i = 0;

    // funcProp CANNOT be called over RPC
    this.funcProp = () => {}
  }

  // value CAN be accessed over RPC
  get value() {
    return this.i;
  }

  // method CAN be called over RPC
  method() {}
}
```

Arrow function class fields are not exposed:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
  // add() is exposed over RPC.
  add(a, b) {
    return a + b;
  }

  // subtract() is NOT exposed over RPC.
  subtract = (a, b) => a - b;
}
```

Own properties of a passed function are visible:

```js
someRpcMethod() {
  let func = () => {};
  func.prop = 123;  // `prop` is visible over RPC
  return func;
}
```

## Notes

- Security model: the RPC system allows safe communication between Workers that do not trust each other. Neither side can access arbitrary objects or invoke arbitrary code; each side can only use objects and functions for which it has explicitly received stubs (Object Capabilities). Built on Cap'n Proto RPC, based on CapTP.
- Private (`#`) properties are not directly exposed. Arrow functions are defined on instances, not the prototype, so they are not exposed and should not be used as `WorkerEntrypoint` methods.
- For instances of classes extending `RpcTarget`, `WorkerEntrypoint` or `DurableObject`, the recipient can only access methods and properties declared on the class, not instance properties (always private across RPC, with or without `#`). Declare an explicit getter to expose one.
- These rules do not apply to plain objects, which are passed by value with all own properties.
- Own properties of a function passed over RPC are accessible to the caller, accessed asynchronously like `RpcTarget` class properties.

## Related

- [rpc.md](./rpc.md)
- [rpc-lifecycle.md](./rpc-lifecycle.md)
