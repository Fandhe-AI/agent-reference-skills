# Initial Setup - First Boot

First-time configuration of a DGX Spark device: choosing an access method, preparing the system, and running the first-time setup utility.

## Signature / Usage

Two access methods are available for completing the first-time setup utility:

- **Local Setup (Display-Connected)** — connect a keyboard/mouse (USB or Bluetooth) and a display, and work directly on the device following the on-screen wizard.
- **Network Setup (Appliance Mode)** — power on the device (it creates a Wi-Fi hotspot), connect from another computer on the same network using the SSID/password from the Quick Start Guide, and complete setup through the captive portal / web browser on that computer. No Spark display or keyboard required.

> This choice only affects how you complete the initial setup process. After setup is finished, you can access your DGX Spark however you prefer.

## Options / Props

| Step | Local Setup | Network Setup |
|------|-------------|----------------|
| Power on | System auto-starts; first-time setup utility launches automatically | System auto-starts and creates a Wi-Fi hotspot |
| Connect | Wired/Bluetooth keyboard and mouse, attached display | Connect from another computer to the hotspot SSID/password (from Quick Start Guide) |
| Entry point | On-screen wizard | Captive portal opens in browser |
| Language and Time Zone | Select preferred settings | Select preferred settings |
| Keyboard Layout | Choose layout type (local setup only) | N/A |
| Terms and Conditions | Review and accept | Review and accept |
| User Account Creation | Create username and password | Create username and password |
| Information Sharing | Optional analytics preferences | Optional analytics preferences |
| Wi-Fi Network Selection | Choose network (skipped if Ethernet connected) | Choose network (skipped if Ethernet connected) |
| Wi-Fi Password | Enter network password | Enter network password |
| Network Connection | System connects; access point tears down | System connects; access point tears down |
| Software Download/Installation | Automatic; can take 10+ minutes | Automatic; can take 10+ minutes |
| Installation Complete | Device auto-reboots | Device auto-reboots |

### Prerequisites

- Fast, reliable internet connection (Ethernet or Wi-Fi preferred; avoid captive portals and phone hotspots)
- Local Setup: display, keyboard, mouse
- Network Setup: a computer on the same network
- Power supply connected (system auto-starts on power)

## Notes

- The DGX Spark device starts up immediately when power is applied. Attach all peripherals (display, keyboard, mouse, network, etc.) **before** connecting the power supply.
- If connecting over USB-C/DisplayPort and there is no display output, try HDMI instead.
- Do not shut down or reboot the system during the update process. The installation cannot be interrupted once the download begins; powering down during updates can cause system damage.
- During the Wi-Fi joining phase, network issues can occur due to device isolation, connecting to a different network than the Spark, or corporate networks with mDNS problems. If the hotspot is not visible when an error modal appears, the Spark likely did join the network but the laptop cannot communicate with it.
- After setup, the system can be accessed locally (monitor/keyboard/mouse), over the network (NVIDIA Sync, SSH, remote desktop), or a mix of both, including the built-in DGX Dashboard for monitoring and JupyterLab access.

## Related

- NVIDIA Spark Developer Portal: https://build.nvidia.com/spark
- DGX Spark Release Notes
- Known Issues documentation
