# Scripting Commands (EVAL / EVALSHA / SCRIPT)

Run Lua scripts server side: `eval`, `evalRo`, `evalsha`, `evalshaRo`, and script cache management (`scriptLoad`, `scriptExists`, `scriptFlush`).

## Signature / Usage

```ts
const script = `
    return ARGV[1]
`
const result = await redis.eval(script, [], ["hello"]);
console.log(result) // "hello"
```

```ts
const result = await redis.evalRo(script, [], ["hello"]);
const result = await redis.evalsha("fb67a0c03b48ddbf8b4c9b011e779563bdbc28cb", [], ["hello"]);
const result = await redis.evalshaRo("fb67a0c03b48ddbf8b4c9b011e779563bdbc28cb", [], ["hello"]);
```

```ts
const script = `
  local value = redis.call('GET', KEYS[1])
  return value
`;
const sha1 = await redis.scriptLoad(script);
await redis.scriptExists("<sha1>", "<sha2>")
await redis.scriptFlush({
  async: true,
});
```

## Options / Props

| Command | Arguments | Returns |
|---------|-----------|---------|
| `eval` / `evalRo` | `script`, `keys[]` (all keys accessed), `args[]` | Script result |
| `evalsha` / `evalshaRo` | `sha` (SHA1 of a cached script), `keys[]`, `args[]` | Script result |
| `scriptLoad` | `script` | SHA1 of the script |
| `scriptExists` | `...hashes` | Array of `1` / `0` per SHA1 |
| `scriptFlush` | optional `{ async }` / `{ sync }` | Removes all scripts from the cache |

## Notes

- `EVAL_RO` and `EVALSHA_RO` (Redis 7) were added to Upstash in February 2025 (changelog)
- Scripts run atomically on the server; by default they take the global lock. To let independent keys run concurrently use the `allow-key-locking` flag (see Key-Based Locking)
- Redis Functions (`FCALL`) are covered on the Functions page
- Source: https://upstash.com/docs/redis/sdks/ts/commands/scripts/eval, /eval_ro, /evalsha, /evalsha_ro, /script_load, /script_exists, /script_flush (fetched 2026-11-14; no version pin on the site)

## Related

- [Redis Key-Based Locking](./key-locking.md)
- [Commands: Functions](./commands-functions.md)
- [Commands: Generic](./commands-generic.md)
