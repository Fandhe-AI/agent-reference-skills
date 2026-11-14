# Key-Based Locking

Upstash Redis keeps commands isolated with locks on the hash tag of each key, so commands on different hash tags run in parallel. Lua scripts and Redis functions use the global lock unless they opt in with `allow-key-locking`.

## Signature / Usage

```lua
#!lua flags=allow-key-locking
redis.call('INCR', KEYS[1])
redis.call('INCRBY', KEYS[2], ARGV[1])
return "OK"
```

```lua
#!lua name=locks
local function incr_if_below(keys, args)
  local current = tonumber(redis.call('GET', keys[1]) or "0")
  if current >= tonumber(args[1]) then
    return 0
  end
  redis.call('INCR', keys[1])
  return 1
end

redis.register_function{
  function_name='incr_if_below',
  callback=incr_if_below,
  flags={'allow-key-locking'}
}
```

```redis
FCALL incr_if_below 1 user:42:quota 100
```

## Options / Props

| Item | Description |
|------|-------------|
| `allow-key-locking` (script shebang) | `#!lua flags=allow-key-locking`; locks the hash tag of each key passed in `KEYS` instead of the global lock |
| `allow-key-locking` (function) | Set per function in `redis.register_function{ flags={...} }`, effective when the library is loaded with `FUNCTION LOAD` |
| `no-writes` | Combine with a comma: `#!lua flags=no-writes,allow-key-locking`; read-only scripts need `allow-key-locking` to use per-key read locks |

## Notes

- Locking is transparent to clients; no changes to regular commands are needed
- Single-key commands lock the key's hash tag; multi-key commands lock every referenced hash tag in a deterministic order (no deadlocks); read-only commands take a shared read lock; `FLUSHDB` / `FLUSHALL` take the global lock
- A hash tag is the non-empty value between the first `{` and the first following `}`; without one the full key name is the tag. `{queue}:wait` and `{queue}:active` lock together, `queue:wait` and `queue:active` lock separately
- Commands writing indexed data also lock the matching Search indexes, so commands can contend when they update the same index
- Transactions (`MULTI` / `EXEC`) take an exclusive write lock on the union of the queued keys at `EXEC` time; transactions with disjoint hash tags run concurrently. Lua scripts queued inside a transaction always run under the global lock, even with `allow-key-locking`
- Rules with `allow-key-locking`: every key used by `redis.call` must be covered by an existing lock (appear in `KEYS` or share a hash tag with one that does); otherwise `ERR Dynamic keys are not allowed in Lua scripts when 'allow-key-locking' flag is set. Key was: <key>`. Database-wide writes (`FLUSHDB`, `FLUSHALL`) are not allowed in such scripts
- Use it for short scripts on a small known key set called frequently (counters, rate limiters, per-user state); leave it off for scripts that scan or mutate many keys
- Pass every key through `KEYS` where possible: declared keys are loaded before the script runs, whereas a dynamic key discovered mid-script can force a disk read while the lock is held (blocking that hash tag, or the whole database under the global lock). The cost is easy to miss on a small warm dataset
- Source: https://upstash.com/docs/redis/features/key-locking (fetched 2026-11-14; no version pin on the site)

## Related

- [Commands: Functions](./commands-functions.md)
- [Pipelining & Transactions](./pipelining-transactions.md)
- [Durability](./durability.md)
