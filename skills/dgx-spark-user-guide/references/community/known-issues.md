# Known Issues (Community Reports)

Recurring hardware/software issues reported by DGX Spark / GB10 owners on the NVIDIA Developer Forums (accelerated-computing/dgx-spark-gb10 category). These are community-sourced, not confirmed defects unless explicitly attributed to NVIDIA staff below.

## GPU Clock Drop / Slowdown

GPU clock drops and the GPU becomes very slow after extended use. Reported on an ASUS GX10 (DGX Spark partner device).

### Workaround

1. Power off the machine
2. Disconnect the power brick from both the device and the AC outlet
3. Wait ~5 minutes (earlier community reports suggested up to 30 minutes was required)
4. Reconnect and power on
5. Verify GPU clock has recovered

No NVIDIA staff response recorded on this thread; workaround is community-sourced only.

## First-Boot Onboarding: Missing WiFi SSID / Ineffective QR Code

On some units, the advertised local WiFi network (`spark-xxxx`) used for headless first-boot setup never appears, blocking wireless onboarding. Separately, the QR code on the packaging resolves to the general product page rather than setup instructions.

### Workaround

If the Spark's setup SSID does not appear, skip the wireless onboarding path and connect a display and keyboard directly — this reliably triggers the first-boot wizard for user creation and network configuration.

Reported by a single user; another community member reported successfully onboarding four units via the WiFi SSID path with no issues, suggesting the problem is not universal. No NVIDIA staff response recorded.

## MT7925e WiFi: "Failed to set PTK to the driver" / Cannot Connect

The MediaTek MT7925 WiFi adapter (used in some DGX Spark partner devices, e.g. MSI EdgeXpert MS-C931) completes the WPA2 handshake but fails to install the pairwise key (PTK) into hardware, resulting in disconnection. The displayed error "pre-shared key may be incorrect" is misleading — the actual kernel-level failure is "key addition failed" (ENOENT).

- Kernel: `6.17.0-1026-nvidia` (issue also seen on other kernel builds)
- Driver: `mt7925e`
- Cipher: WPA2-PSK AES/CCMP
- Affects both 2.4GHz and 5GHz, multiple access points; Ethernet is unaffected

### Attempted fixes (unresolved)

- Password variations (plaintext, lowercase, pre-hashed PSK)
- Disabling PMF and powersave
- Direct `wpa_supplicant` testing, bypassing NetworkManager
- Kernel/firmware updates via `apt dist-upgrade` and `fwupdmgr`

A related report describes a partial workaround for a similar 5GHz instability: forcing the 2.4GHz BSSID/channel and setting `mt7925_common.disable_clc=1`.

### NVIDIA staff response

An NVIDIA engineer (identified as staff in the thread) confirmed they could not reproduce the issue on their own MSI units and recommended upgrading to kernel `6.17.0-1026-nvidia`. The issue persisted for the reporting user after the upgrade; unresolved as of the last update.

## NVIDIA Sync Overwrites `~/.ssh/config` on Update (macOS)

Updating NVIDIA Sync to version `0.97.6` on macOS overwrote the user's existing `~/.ssh/config` file, replacing its contents with a single `Include` directive pointing to NVIDIA Sync's own generated config. This occurred during an update from an older version, not a fresh install.

### NVIDIA staff response

An NVIDIA moderator confirmed the report was reproduced and stated a fix would ship in the next NVIDIA Sync update. No interim workaround or remediation steps were provided in the thread.

## Random Power-Off After Extended Uptime

Units powered off unexpectedly after around 55 days of continuous operation, with no OOM or thermal log entries explaining the shutdown.

### Suspected causes (community speculation, unconfirmed)

- Thermal paste degradation over months of continuous use, causing uneven core temperatures (one user found compound "dry as a rock" with CPU hitting 95°C despite lower logged readings)
- Power delivery issues (one user saw PDU faults limiting draw to ~35W before shutdown)
- Ambient temperature and unit stacking/spacing

### Suggested mitigations

- Add a UPS for grid power protection
- Use an external watchdog (e.g. Raspberry Pi + GPIO relay) to detect unresponsiveness and force a hard power cycle
- Re-apply thermal paste and improve airflow/cooling
- Power-cycle the PDU (unplug ~30 seconds) as a recovery step

No NVIDIA staff response recorded; discussion is entirely peer-to-peer.

## Notes

- Source: NVIDIA Developer Forums, DGX Spark / GB10 community category (`accelerated-computing/dgx-spark-gb10`). This is unofficial, user-generated content — always prefer the official DGX Spark documentation and NVIDIA support channels when they cover the same topic.
- Community responses are not validated by NVIDIA except where an NVIDIA staff/moderator reply is explicitly noted above.
- Usernames have been omitted; contributor identity is described only as "user" or "NVIDIA staff/moderator" per role.

## Related

- [troubleshooting.md](./troubleshooting.md)
