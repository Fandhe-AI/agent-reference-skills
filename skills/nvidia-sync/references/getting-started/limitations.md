# Limitations

Constraints and unsupported scenarios for NVIDIA Sync.

## Signature / Usage

Adapted (not in the official docs): the diagram below only illustrates the unsupported path described in prose.

```text
Not supported: laptop -> jump / bastion server -> remote device
```

## Notes

- Adapted: the code block is an illustration, not official content.
- NVIDIA Sync does not support connections through jump or bastion servers. (The Adding and Connecting Devices page repeats this: Sync does not support connections through jump or bastion servers.)
- Source: https://docs.nvidia.com/sync/latest/index.html (Limitations section, retrieved 2026-11-14).

## Related

- [overview.md](./overview.md)
- [terminology.md](./terminology.md)
