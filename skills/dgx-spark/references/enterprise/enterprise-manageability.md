# Enterprise Manageability

Overview of fleet-scale operations for DGX Spark systems in enterprise IT environments: lifecycle integration and custom (air-gapped/on-premises) installation when removable media or local mirrors replace direct use of public package sources.

## Key Sections

- **Enterprise Lifecycle Integration** — fleet management tooling: asset identity clearing (7 tools), controlled software/firmware updates (1 tool), remote operations and remediation (2 tools), SSH execution patterns for management-platform integration.
- **Custom Installation with Cloud-Init** — air-gapped/custom deployment patterns: BaseOS image customization, USB partitioning and OEMDATA layout, local APT repository hosting, Ubuntu Ports and LVFS mirroring, client configuration.

## Notes

- Enterprise Lifecycle Integration scripts are reference Python/shell tools distributed as a downloadable ZIP package; they are not preinstalled and must be adapted within an organization's own enterprise management platform.
- This workflow bypasses individual end-user license prompts but remains governed by the NVIDIA Software License Agreement. By proceeding, the administrator represents they have authority to bind the customer to these terms.

## Related

- [Enterprise Lifecycle Integration](./enterprise-fleet-lifecycle.md)
- [Custom Installation with Cloud-Init](./enterprise-custom-install.md)
