# Resource Monitor

NVIDIA Sync window that shows live utilization for CPU, sRAM, vRAM, and GPU on a single device or a cluster.

## Signature / Usage

Single device:

```text
NVIDIA Sync (connected to the device) > Resource Monitor
```

Cluster:

```text
NVIDIA Sync > Settings > Clusters > resource monitor icon on the cluster card
```

Steps for a single device:

1. Open NVIDIA Sync and connect to the device.
2. In the NVIDIA Sync pop-up window, select Resource Monitor and wait for it to open.
3. At the top of the window, select the resource you want to plot over time.
4. Hover over an individual CPU core at the bottom of the window to see its numerical utilization.

Steps for a cluster:

1. Open NVIDIA Sync and confirm that all devices in the cluster are connected.
2. Go to Settings > Clusters.
3. Select the resource monitor icon from the cluster card.
4. When the window opens, select individual devices to view their resources.

## Notes

- The official Resource Monitor page lists "CPU, sRAM, vRAM, and GPU"; the docs index and release notes summarize the same feature as "CPU, memory, and GPU utilization".
- Reports instantaneous values and plots them over time; CPU utilization is broken out by individual core.
- Displays live data and keeps a limited history while its window is open. The data is not saved to disk; closing the window erases the related data.
- Time plots include a marquee: click and drag to narrow the viewing window, then reset the zoom after selecting a region. A backward-looking time interval can also be specified to skip the marquee.
- A "Telemetry Unavailable" banner means the flow of data stopped. The resource monitor uses the direct SSH or Tailscale connection to the device, and momentary lags or lapses in that connection interrupt telemetry. Telemetry resumes as long as the connection persists; the corresponding gaps in the plots are times when telemetry was unavailable.

## Related

- [direct-connections](../connections/direct-connections.md)
- [tailscale-connections](../connections/tailscale-connections.md)
- [cluster-assistant](../cluster/cluster-assistant.md)
