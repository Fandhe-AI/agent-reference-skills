# OS and Component Update

Guide for updating the operating system, software components, and firmware on DGX Spark Founders Edition, which runs NVIDIA DGX OS, an Ubuntu-based Linux distribution.

## Ubuntu Support

DGX Spark includes an Ubuntu Pro OS license providing 10 years of operating system support from Canonical.

## Update Methods

### DGX Dashboard (Recommended)

The DGX Dashboard is the primary and recommended way to perform system updates. It provides a centralized interface to:

- Review available system updates
- Deploy security patches and system updates
- Manage NVIDIA drivers
- Manage firmware updates
- Track update progress

### Manual Update (apt / fwupdmgr)

For advanced users, or when the dashboard is unavailable, updates can be performed manually with standard Ubuntu package management tools.

## Signature / Usage

```bash
sudo apt update
sudo apt dist-upgrade
sudo fwupdmgr refresh
sudo fwupdmgr upgrade
sudo reboot
```

These commands, in order: refresh package lists, upgrade installed packages and drivers, refresh firmware metadata, upgrade firmware, and reboot the system.

## Notes

- Confirm a stable power connection before updating.
- Close all applications and save work before updating.
- Prepare a recovery plan in case the update fails.
- Schedule updates during maintenance windows when feasible.
- Prioritize the DGX Dashboard for routine updates; use manual `apt`/`fwupdmgr` steps only when necessary.
- Back up critical data before performing major updates.

## Related

- [System Recovery](./system-recovery.md)
