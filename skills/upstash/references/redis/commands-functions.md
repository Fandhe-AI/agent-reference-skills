# Commands: Functions (FCALL / FUNCTION *)

Commands for loading Lua function libraries once and invoking the registered functions by name, atomically on the server.

## Signature / Usage

```ts
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const code = `#!lua name=mylib
redis.register_function('my_hset',
  function (keys, args)
    local hash = keys[1]
    local time = redis.call('TIME')[1]
    return redis.call('HSET', hash, '_last_modified_', time, unpack(args))
  end
)
`;

const libraryName = await redis.functions.load({ code, replace: true }); // "mylib"

await redis.functions.call("my_hset", ["myhash"], ["myfield", "some value"]);

const roCode = `#!lua name=ro_lib

local function get_value(keys, args)
  return redis.call('GET', keys[1])
end

redis.register_function({
  function_name='get_value',
  callback=get_value,
  flags={ 'no-writes' }
})
`;
await redis.functions.load({ code: roCode, replace: true });
await redis.functions.callRo("get_value", ["mykey"]); // registered above with 'no-writes'
await redis.functions.list({ libraryName: "mylib", withCode: true });
await redis.functions.stats(); // { engines: { LUA: { librariesCount, functionsCount } } }
await redis.functions.delete("mylib");
await redis.functions.flush();
```

```redis
FUNCTION LOAD [REPLACE] <function-code>
FCALL <function> <numkeys> [<key> [<key> ...]] [<arg> [<arg> ...]]
FCALL_RO <function> <numkeys> [<key> [<key> ...]] [<arg> [<arg> ...]]
FUNCTION LIST [LIBRARYNAME <library-name-pattern>] [WITHCODE]
FUNCTION DELETE <library-name>
FUNCTION FLUSH [ASYNC | SYNC]
FUNCTION KILL
FUNCTION STATS
```

```lua
redis.register_function{
  function_name='incr_quota',
  callback=incr_quota,
  flags={'allow-key-locking'}
}
```

## Options / Props

| Command (SDK method) | Arguments | Reply |
|----------------------|-----------|-------|
| `FUNCTION LOAD` (`functions.load({ code, replace })`) | `code` including the `#!lua name=<library>` shebang; `replace` default `false` | Library name (bulk string) |
| `FCALL` (`functions.call(fn, keys?, args?)`) | `<function>`, `<numkeys>`, keys, args | Whatever the function returns |
| `FCALL_RO` (`functions.callRo(fn, keys?, args?)`) | Same as `FCALL`; function must have the `no-writes` flag | Whatever the function returns |
| `FUNCTION LIST` (`functions.list({ libraryName?, withCode? })`) | Name pattern; `withCode` default `false` | Array of `{ libraryName, engine, functions: [{ name, description, flags }], libraryCode? }` |
| `FUNCTION DELETE` (`functions.delete(libraryName)`) | Library name (not a single function) | `OK` |
| `FUNCTION FLUSH` (`functions.flush()`) | Optional `ASYNC` or `SYNC` | `OK` |
| `FUNCTION KILL` | none | Error reply `NOTBUSY` on the current deployment |
| `FUNCTION STATS` (`functions.stats()`) | none | Flat array (RESP2) / map (RESP3); SDK returns `{ engines: { LUA: { librariesCount, functionsCount } } }` |

## Notes

- Functions are the successor to `EVAL` scripts: named, registered once as part of a library, and persisted with the dataset, so they survive restarts and clients do not re-send code. Currently `LUA` is the only supported engine.
- The library source must start with `#!lua name=<library_name>` and register each function with `redis.register_function`, giving a name, a callback, and optional flags such as `no-writes`.
- Loading fails when the library name is already in use unless `REPLACE` / `replace: true` is given; this is how a new version is deployed. A single function cannot be deleted from a library; reload with `REPLACE` instead.
- `numkeys` must equal the number of key arguments that follow it. The callback receives the keys as its first argument (`keys`) and the remaining arguments as its second (`args`); unlike `EVAL`, there are no `KEYS` / `ARGV` globals (the Upstash FCALL page words this as KEYS / ARGV). The TypeScript docs warn that the function can only read / write the keys passed in `keys`.
- Locking: Upstash runs a function under the global lock by default. Registering it with `allow-key-locking` (set per function in `redis.register_function`, unlike Lua scripts where it goes on the shebang; fixed until the library is reloaded) makes a call lock the hash tag of each key in the key list, so calls on disjoint hash tags run in parallel. With it, every touched key must be passed in the key list or share a valid hash tag with an already locked key; commands needing database-wide access such as `FLUSHDB` are rejected. `FCALL_RO` with `flags={'no-writes', 'allow-key-locking'}` takes shared read locks.
- Pass every key the function touches in the key list even under the global lock: idle entries are kept on disk, declared keys are loaded before the function starts with the lock released, whereas a dynamic key is read from disk with the lock held and can stall the same hash tag (or the whole database).
- `FCALL_RO` on a function without the `no-writes` flag returns an error.
- `redis.setresp()` and RESP2 / RESP3 reply conversions behave exactly as for `EVAL`.
- `FUNCTION KILL`: the current Upstash deployment recognizes the command but has no interruptible running-function state, so it replies `NOTBUSY`. A function that has already written data cannot be killed in standard Redis semantics.
- `FUNCTION FLUSH` wipes all libraries and cannot be undone; suited to test setup and provisioning tooling.
- `FUNCTION LIST` flags show whether a deployed function locks only its keys (`allow-key-locking`) or the whole database.
- Source: https://upstash.com/docs/redis/commands/functions/overview and each `functions/*` command page, plus /redis/sdks/ts/commands/functions/* (fetched 2026-10; no version pin on the site).

## Related

- [Commands: Generic](./commands-generic.md)
- [Pipelining and Transactions](./pipelining-transactions.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
