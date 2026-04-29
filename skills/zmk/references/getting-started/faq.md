# FAQ

Frequently asked questions about ZMK Firmware.

## General

**Why Zephyr?**
Zephyr is a best-in-class RTOS offering cross-architecture support, low-power optimization, DeviceTree/Kconfig configuration, a qualified BLE stack, multi-processor support, Apache 2.0 licensing, and LTS security updates.

**Why create ZMK?**
ZMK offers a Zephyr foundation, permissive MIT licensing (enabling integration of non-GPL-compatible libraries), and a wireless-first design prioritizing power efficiency.

**What is the license?**
ZMK uses the MIT license.

**What does "ZMK" stand for?**
"Zephyr Mechanical Keyboard" — inspired by the naming convention of TMK/QMK.

**Who created ZMK?**
Pete Johanson.

**Is ZMK related to TMK/QMK?**
Inspired by them, but it is an entirely separate and unrelated project.

## Hardware

**What hardware is supported?**
ZMK can theoretically run on any Zephyr-supported platform; contributors test a limited subset of configurations. See [Supported Hardware](./hardware.md).

**Does ZMK support AVR?**
No. Zephyr only supports 32-bit and 64-bit platforms.

**What are boards vs. shields?**
Zephyr terminology that enables modularity — different compatible controllers can be combined with different keyboard PCBs (shields) at build time.

## Features

**Does ZMK support wired split keyboards?**
Currently, ZMK only supports wireless split keyboards. Experimental wired support exists for advanced users with specific hardware.

**What is the input latency?**
Comparable to other keyboard firmware; varies by scanning method and debounce algorithm.

**Is there a 2.4 GHz dongle option?**
No current plans. Nordic's proprietary 2.4 GHz protocols require restrictive licensing. BLE dongles are available with approximately 3.75 ms theoretical latency.

**Is ZMK bootloader-specific?**
No. ZMK supports multiple flash utilities including OpenOCD and nrfjprog.

## Community

**How do I contribute?**
Use the developer documentation to get started.

**Where do I discuss ideas or new keyboard support?**
Join the Discord community.

**Is there a Code of Conduct?**
Yes, available on GitHub.

## Notes

- The project team is small; support capacity is limited while development is ongoing.
- Community channels: Discord, Mastodon, Twitter, GitHub.

## Related

- [Supported Hardware](./hardware.md)
- [Installing ZMK](./user-setup.md)
