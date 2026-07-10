# PXE Boot Setup

Network boot deployment of the DGX OS image or recovery media via UEFI PXE, using TFTP, HTTP, and DHCP servers configured to match organizational infrastructure and security standards.

## Signature / Usage

```
class "pxeclients" {
  match if substring (option vendor-class-identifier, 0, 9) = "PXEClient";
    filename "grubnetaa64.efi.signed";
    next-server <TFTP_Server_IP>;
    option root-path "/local/tftp";
}
```

## Core Requirements

Three server components, which may run on a single system or be distributed across multiple servers:

| Server | Role |
|--------|------|
| TFTP | Delivers boot files (kernel and initramfs) |
| HTTP | Transfers large files like ISO images |
| DHCP | Provides IP addresses and PXE configuration |

## Server Directory Structure

For DGX OS installation:

```
/local/
  http/
    base_os_7.0.0/
      base_os_7.0.0.iso
  tftp/
    baseos/
      vmlinuz
      initrd
    grub/
      grub.cfg
    grubnetaa64.efi.signed
```

For recovery media:

```
/local/
  http/
    fastos/
      usb.customer.tar.gz
  tftp/
    fastos/
      vmlinuz
      initrd
    grub/
      grub.cfg
    grubnetaa64.efi.signed
```

## GRUB Configuration

`/local/tftp/grub/grub.cfg` directs the boot process.

OS installation entry:

```
set default=0
set timeout=5

menuentry 'Install BaseOS 7.0.0' {
   linux /baseos/vmlinuz fsck.mode=skip autoinstall ip=dhcp url=http://<Server IP>/base_os_7.0.0/base_os_7.0.0.iso nvme-core.multipath=n nouveau.modeset=0
   initrd /baseos/initrd
}
```

Recovery media entry:

```
menuentry "Install DGX Spark FastOS" {
    linux /fastos/vmlinuz nouveau.modeset=0 console=tty0 console=ttyS0,921600 sbsa_gwdt.action=1 noui pxeinstall=true fastos_usbimg_url=http://<Server IP>/fastos/usb.customer.tar.gz ip=dhcp static_ip=<static ip>:<gateway ip>
    initrd /fastos/initrd
}
```

## Setup Instructions

- **HTTP**: place the ISO or tarball in the designated directory (`/local/http/base_os_7.0.0/` or `/local/http/fastos/`).
- **TFTP**:
  1. Mount the ISO: `sudo mount -o loop /path/to/iso /mnt`
  2. Extract kernel and initrd to the TFTP directory
  3. Download the GRUB binary: `wget http://ports.ubuntu.com/ubuntu-ports/dists/jammy/main/uefi/grub2-arm64/current/grubnetaa64.efi.signed`
  4. Copy it to the TFTP root
- **DHCP**: configure the server to specify the TFTP server address and bootloader filename (see class snippet above).

## Options / Props

Boot / installer parameters passed on the GRUB `linux` command line:

| Name | Description |
|------|-------------|
| `ip=dhcp` | Dynamic IP assignment |
| `static_ip=<address>:<gateway>` | Static IP configuration |
| `autoinstall` | Automatic installation without prompts |
| `noui` | Disables the installer user interface |
| `usb.skipfw` | Skips firmware updates |
| `usb.shell` | Launches a shell instead of installing |

## Verification Steps

TFTP test:

```
cd /tmp
tftp <TFTP_Server_IP>
get grub/grub.cfg
quit
```

HTTP test:

```
cd /tmp
wget http://<HTTP_Server_IP>/fastos/usb.customer.tar.gz
```

## Enabling PXE on DGX Spark

Before PXE boot, either disable Secure Boot in UEFI or enroll the `grubnetaa64.efi.signed` certificate. Then enable PXE boot through the Network Stack Configuration menu in UEFI, select the desired NIC, and save settings.

## Notes

- The PXE process requires manual configuration of TFTP, HTTP, and DHCP components; there is no automated setup path.
- Secure Boot must be disabled or the GRUB certificate enrolled before PXE boot will succeed.

## Related

- DGX Spark UEFI Boot Configuration: https://docs.nvidia.com/dgx/dgx-spark-uefi/boot-tab.html
