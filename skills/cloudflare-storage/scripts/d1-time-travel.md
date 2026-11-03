---
source: https://developers.cloudflare.com/d1/reference/time-travel/
---

# D1 Time Travel

Copy-paste commands for D1 Time Travel (point-in-time recovery to any minute within the last 30 days). See [time-travel.md](../references/d1/time-travel.md) for details.

## Check Time Travel support

```sh
wrangler d1 info YOUR_DATABASE
```

Databases showing `version: production` support Time Travel. Wrangler `v3.4.0` or later is required.

## Get the current bookmark

```sh
wrangler d1 time-travel info YOUR_DATABASE
```

## Get a bookmark for a past time

```sh
wrangler d1 time-travel info YOUR_DATABASE --timestamp="2023-07-09T17:31:11+00:00"
```

`--timestamp` accepts a Unix timestamp (seconds) or an RFC3339 timestamp. On macOS and Windows, `date +%s` prints the current Unix timestamp.

## Restore to a timestamp

> **Warning**: Restoring is destructive: it overwrites the database in place and cancels in-flight queries and transactions. Confirm the target time with `time-travel info` before running this on production. The command prints the previous bookmark so you can undo the restore; note it down.

```sh
wrangler d1 time-travel restore YOUR_DATABASE --timestamp=UNIX_TIMESTAMP
```

## Restore to a bookmark

> **Warning**: Overwrites the database in place, as above.

```sh
wrangler d1 time-travel restore YOUR_DATABASE --bookmark=00000085-0000024c-00004c6d-8e61117bf38d7adb71b934ebbf891683
```

## Undo a restore

Restore to the previous bookmark printed by the earlier `restore`, or to any bookmark from before it.

```sh
wrangler d1 time-travel restore YOUR_DATABASE --bookmark=<PREVIOUS_BOOKMARK>
```

The restore window is 30 days on the Workers Paid plan and 7 days on Workers Free.
