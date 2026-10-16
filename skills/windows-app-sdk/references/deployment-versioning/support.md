# Windows App SDK and supported Windows releases

Identifies which Windows client and Windows Server releases each Windows App SDK version supports, plus servicing end-dates (page dated 2026-09-24).

## Signature / Usage

```text
Windows App SDK 2   (2026-04-29): Win11 26H2/25H2/24H2/23H2/22H2/21H2, Win10 23H2/22H2/21H2/1809; Server 2022, Server 2019
```

## Options / Props

Supported releases per Windows App SDK version:

| Windows App SDK | Release date | Windows client | Windows Server |
|---|---|---|---|
| 2 | 2026-04-29 | Win11 26H2, 25H2, 24H2, 23H2, 22H2, 21H2; Win10 23H2, 22H2, 21H2, 1809 | Server 2022, Server 2019 |
| 1.8 | 2025-09-09 | Win11 26H2, 25H2, 24H2, 23H2, 22H2, 21H2; Win10 23H2, 22H2, 21H2, 1809 | Server 2022, Server 2019 |
| 1.7 | 2025-03-18 | Win11 25H2, 24H2, 23H2, 22H2, 21H2; Win10 23H2, 22H2, 21H2, 1809 | Server 2022, Server 2019 |
| 1.6 | 2024-09-04 | Win11 25H2, 24H2, 23H2, 22H2, 21H2; Win10 23H2, 22H2, 21H2, 1809 | Server 2022, Server 2019 |

Windows client servicing end-dates (GA = General Availability channel; LTSC = Long Term Servicing Channel):

| Version | Build | GA Home, Pro | GA Enterprise | LTSC Mainstream | LTSC Extended | Max end-date |
|---|---|---|---|---|---|---|
| Win11 25H2 | 26200 | 2027-10-12 | 2028-10-10 | N/A | N/A | 2028-10-10 |
| Win11 24H2 | 26100 | 2026-10-13 | 2027-10-12 | 2029-10-09 | 2034-10-10 | 2034-10-10 |
| Win11 23H2 | 22631 | 2025-11-11 | 2026-11-10 | N/A | N/A | 2026-11-10 |
| Win10 21H2 | 19044 | Past | 2024-06-11 | 2027-01-12 | 2032-01-13 (IoT Enterprise only) | 2032-01-13 |
| Win10 1809 | 17763 | Past | Past | Past | 2029-01-09 | 2029-01-09 |

Windows Server servicing end-dates:

| Version | Build | LTSC Mainstream | LTSC Extended | Max end-date |
|---|---|---|---|---|
| Server 2022 | 20348 | 2026-10-13 | 2031-10-14 | 2032-01-13 |
| Server 2019 | 17763 | Past | 2029-01-09 | 2029-01-09 |

## Notes

- Each Windows version continues to be supported by the Windows App SDK until the latest applicable Windows servicing end-date for that version.
- Servicing categories: GA servicing channel (Home, Pro: shortest servicing; Enterprise: short servicing), LTSC Mainstream (long servicing, Enterprise), LTSC Extended (longest servicing).
- Dates in the table above are copied from the page as of its 2026-09-24 revision and may change. Individual APIs can require newer Windows builds than the SDK baseline (for example, `Microsoft.Windows.Management.Deployment` APIs need Windows 10 version 2004 or later).
- The Server 2022 Max end-date (2032-01-13) is copied verbatim from the official Windows Server table; that it is later than the LTSC Extended date (2031-10-14) is as published.
- Source: https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/support

## Related

- [System requirements](./system-requirements.md)
- [Release channels](./release-channels.md)
