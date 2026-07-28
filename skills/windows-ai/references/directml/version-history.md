# DirectML Version History and Hardware Requirements

DirectML is distributed as a system component of Windows (available in Windows 10, version 1903 / Build 18362 and newer), and, since DirectML version 1.4.0, also as a standalone NuGet redistributable (`Microsoft.AI.DirectML`) for applications that need a fixed version or must run on older Windows 10 builds. DirectML follows semantic versioning (`major.minor.patch`).

## Signature / Usage

```cpp
// Exclude DirectML.h content newer than a given DirectML version at compile time:
#define DML_TARGET_VERSION 0x2000  // targets DirectML 1.1.0 (feature level 2.0)
#include <DirectML.h>
```

## Options / Props

| DirectML version | Feature level | `DML_TARGET_VERSION` | First available (OS) |
|---|---|---|---|
| 1.15.x | `DML_FEATURE_LEVEL_6_4` | `0x6400` | N/A (redistributable only) |
| 1.13.x | `DML_FEATURE_LEVEL_6_2` | `0x6200` | N/A |
| 1.12.0 | `DML_FEATURE_LEVEL_6_1` | `0x6100` | N/A |
| 1.11.0 | `DML_FEATURE_LEVEL_6_0` | `0x6000` | N/A |
| 1.10.0 | `DML_FEATURE_LEVEL_5_2` | `0x5200` | N/A |
| 1.9.0 | `DML_FEATURE_LEVEL_5_1` | `0x5100` | N/A |
| 1.8.0 | `DML_FEATURE_LEVEL_5_0` | `0x5000` | Windows 11, 22H2 (Build 22621) |
| 1.7.0 | `DML_FEATURE_LEVEL_4_1` | `0x4100` | N/A |
| 1.6.0 | `DML_FEATURE_LEVEL_4_0` | `0x4000` | Windows 11, 21H2 (Build 22000) |
| 1.5.0 | `DML_FEATURE_LEVEL_3_1` | `0x3100` | N/A |
| 1.4.0 | `DML_FEATURE_LEVEL_3_0` | `0x3000` | N/A |
| 1.1.0 | `DML_FEATURE_LEVEL_2_0` | `0x2000` | Windows 10, version 2004 (Build 19041, 20H1) |
| 1.0.0 | `DML_FEATURE_LEVEL_1_0` | `0x1000` | Windows 10, version 1903 (Build 18362, 19H1) |

("N/A" for First available (OS) means the version shipped only as a NuGet redistributable, not bundled with a specific Windows release; the 1.2.0/1.3.0 intermediate releases were never made widely available.)

## Notes

- `DML_TARGET_VERSION` conditionally excludes newer `DirectML.h` declarations at compile time, ensuring code doesn't accidentally use functionality unavailable in an older targeted DirectML version — analogous to `NTDDI_VERSION`. If unset, it's inferred from `NTDDI_VERSION`, or defaults to the latest target version if neither is defined.
- DirectML *version* (for example 1.4.0) describes a specific header/lib release; DirectML *feature level* (for example `DML_FEATURE_LEVEL_2_0`) describes the runtime capability actually available on the machine, which can be lower than what the SDK headers support if running on an older OS/driver.
- Hardware requirement: any DirectX 12-compatible GPU (or WARP software adapter); DirectML itself imposes no vendor restriction, though individual operators/feature levels may require newer drivers.

## Related

- [DirectML Overview](./directml-overview.md)
- [DMLCreateDevice / IDMLDevice](./dmlcreatedevice.md)
