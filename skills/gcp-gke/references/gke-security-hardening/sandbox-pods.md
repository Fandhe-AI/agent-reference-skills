---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/sandbox-pods
---

# About GKE Sandbox

GKE Sandbox isolates untrusted or third-party workloads from the node's host kernel using gVisor (a userspace Linux kernel) or microVMs (Kata Containers with Cloud Hypervisor). There is generally no advantage to sandboxing trusted first-party workloads.

## Signature / Usage

### Request a sandbox

1. Enable a sandbox technology on nodes, either through ComputeClasses that auto-create nodes or by creating node pools manually.
2. Request the sandbox for Pods with the matching RuntimeClass, such as `gvisor` or `microvm` (see "Harden workload isolation with GKE Sandbox", https://docs.cloud.google.com/kubernetes-engine/docs/how-to/sandbox-pods).

Pods that don't request a sandbox can still run on sandbox-enabled nodes by using node selectors and tolerations (useful for trusted per-node tools such as monitoring).

### Enable SMT on a gVisor node pool (Standard)

```bash
gcloud container node-pools create smt-enabled \
    --cluster=CLUSTER_NAME \
    --location=LOCATION \
    --machine-type=MACHINE_TYPE \
    --threads-per-core=2 \
    --sandbox=type=gvisor
```

On an existing gVisor node pool, label it and deploy the DaemonSet:

```bash
gcloud container node-pools update NODE_POOL_NAME \
    --cluster=CLUSTER_NAME \
    --location=LOCATION \
    --node-labels=cloud.google.com/gke-smt-disabled=false
```

Adapted (not in the official docs): the source applies the manifest directly from the `master` branch; it is downloaded from a commit-pinned URL, inspected, and then applied from the local file.

```bash
curl -fsSLo enable-smt.yaml \
    https://raw.githubusercontent.com/GoogleCloudPlatform/k8s-node-tools/425885c92a47f3d9a5dbbb9f1af340b855fefa32/disable-smt/gke/enable-smt.yaml
less enable-smt.yaml
kubectl create -f enable-smt.yaml
```

```bash
kubectl get pods --selector=name=enable-smt -n kube-system
```

Adapted (not in the official docs): the Pod name `enable-smt-2xnnc` (taken from the source's sample output) is replaced with the placeholder `POD_NAME`; use the name returned by the previous command.

```bash
kubectl logs POD_NAME enable-smt -n kube-system
```

The DaemonSet runs only on nodes with the `cloud.google.com/gke-smt-disabled=false` label. Expect the Pod to be `Running` and `SMT has been enabled` to appear in its logs.

### Add NET_RAW (Standard clusters only)

```yaml
spec:
  containers:
  - name: my-container
    securityContext:
      capabilities:
        add: ["NET_RAW"]
```

## Options / Props

### gVisor vs microVMs

| Feature | MicroVMs | gVisor |
|---------|----------|--------|
| Kernel access | Full Linux kernel | Subset of Linux kernel syscalls |
| Isolation level | Full hardware virtualization with a dedicated guest kernel | Syscall interception in a userspace kernel |
| CPU and memory overhead | Fixed 250 mCPU and 130 MiB per Pod | Dynamic overhead with low base memory |
| Start time | About one to two seconds | Less than 100 ms |
| Node configuration | GKE Standard nodes with nested virtualization enabled | Standard node pools and Autopilot nodes; enabled by default in Autopilot clusters |
| Node image | Container-Optimized OS (`cos_containerd`) or Ubuntu | Container-Optimized OS (`cos_containerd`) only |
| Machine types | x86 series that support nested virtualization (not E2 or Arm VMs) | Most x86 CPUs, Arm, and accelerator machine types |
| Accelerators | No GPUs or TPUs | Specific GPU models and TPU versions |
| Example use cases | AI agents running unsupervised generated code; browser automation (Puppeteer); workloads needing the full Linux kernel; many small-I/O syscalls | Untrusted third-party apps (Rust, Java, Python, PHP, Node.js, Go); web frontends, caches, proxies; CPU media/data processing; GPU/TPU workloads; AI inference on arbitrary inputs; training on large third-party datasets |

### GPU model support in gVisor sandboxes

| Model | Preview | GA support | Notes |
|-------|---------|------------|-------|
| NVIDIA RTX PRO 6000 | One or more GPUs per machine type: 1.34.1-gke.2037001 and later; less than one GPU: not supported | - | - |
| NVIDIA GB200, B200, H200 141GB | 1.34.0-gke.1713000 and later | - | - |
| NVIDIA H100 80GB, A100 80GB, A100 40GB, L4, T4 | - | 1.29.15-gke.1134000+, 1.30.11-gke.1093000+, 1.31.7-gke.1149000+, 1.32.2-gke.1182003+ | Supported since initial launch |
| NVIDIA V100, P100 | not supported | not supported | Proprietary drivers; won't be supported. P100 end of support is September 15, 2026 |
| NVIDIA T4 VWS, L4 VWS | - | - | Windows and Ubuntu node types required for Virtual Workstation Nodes are not supported |

### Limitations

| Area | Limitation |
|------|------------|
| GPUs | MicroVMs: none. gVisor: CUDA only; subset of models; only `latest` and `default` NVIDIA driver versions per GKE version; no RDMA or IMEX. Don't use GPU time-sharing in sandboxed Pods (GPU not fully isolated). |
| TPUs | gVisor from GKE 1.31.3-gke.1111001: V4pod, V4lite, V5litepod, V5pod, V6e. MicroVMs: none. |
| Nodes | Linux nodes only. gVisor: COS only. MicroVMs need nested virtualization. In Standard clusters GKE Sandbox can't be enabled on the default node pool; keep at least one non-sandbox node pool with at least one node. |
| Metadata | gVisor Pods can't reach node-level cluster metadata or Google Cloud services unless Workload Identity Federation for GKE is used. MicroVM Pods can: deny egress with a NetworkPolicy to `169.254.169.252/32` port `988`, or on GKE Dataplane V2 to `169.254.169.254/32` port `80`. |
| SMT | Autopilot `Scale-Out` ComputeClass: SMT always disabled. Intel: disabled by default. AMD: enabled by default. One thread per core (Arm): no SMT. gVisor uses Linux Core Scheduling. You are charged per vCPU whether SMT is on or off. |
| NET_RAW | Blocked by default (affects `ping`, `tcpdump`); can't be added in Autopilot. |
| Both sandbox types | No Cloud Service Mesh in Autopilot sandboxes; no seccomp, AppArmor, SELinux, No New Privileges, bidirectional mount propagation or `procMount`; no container-level memory metrics (Pod-level works); host-kernel monitors (Container Threat Detection, Falco, Tetragon) can't observe sandboxed syscalls. |
| gVisor only | No privileged mode, raw block volumes, `kubectl port-forward`, hostPath, `sysctl` settings; CPU/memory limits applied only for `Guaranteed` or `Burstable` QoS with limits on all containers; `seccheck`, `pod-init-config` and custom UDS telemetry unsupported. |
| MicroVM only | `hostNetwork: true` unsupported (Pod can't reach anything outside itself); socket-level tracing sees only microVM interfaces. |

## Notes

- Recommended with GKE Sandbox: set resource limits on all sandboxed containers; with Workload Identity Federation for GKE (always on in Autopilot), use a NetworkPolicy to block `169.254.169.254`.
- Enabling SMT on machine types that are vulnerable to MDS exposes nodes to side-channel attacks. Check `/proc/cpuinfo` ("bugs") or `/sys/devices/system/cpu/vulnerabilities`.
- Adapted from the official docs: the SMT `kubectl create -f` command applied a manifest from the mutable `master` branch of `GoogleCloudPlatform/k8s-node-tools`; it is now downloaded from commit `425885c92a47f3d9a5dbbb9f1af340b855fefa32` (latest commit touching `disable-smt/gke/enable-smt.yaml`, committed 2022-04-18, checked 2026-11-16), reviewed, then applied. The DaemonSet modifies node SMT settings, so try it on a disposable node pool first.
- The `NET_RAW` example is for Standard clusters only; adding it widens the container's attack surface.
- CSI drivers run outside the sandbox boundary and may have privileged host access; run them with least permissions. The Compute Engine Persistent Disk CSI driver is supported. External services reachable from sandboxed code (databases, APIs, other containers) must be secured individually.
- Orchestration alternatives for AI agents: Agent Substrate on GKE and Agent Sandbox on GKE (https://docs.cloud.google.com/kubernetes-engine/docs/concepts/machine-learning/agent-sandbox).
- GKE runs Kubernetes workloads on Google Cloud; GKE Sandbox is distinct from Cloudflare Containers / Sandbox SDK (`cloudflare-sandbox-containers`) and from Cloud Run (`gcp-run`).
- Corrected from the official docs: the source command `kubectl logs enable-smt-2xnnc enable-smt -n kube-system` uses a Pod name from sample output, which does not exist in other clusters; the example uses `POD_NAME`.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/sandbox-pods (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-overview.md](./security-overview.md)
- [hardening-your-cluster.md](./hardening-your-cluster.md)
- [container-threat-detection-overview.md](./container-threat-detection-overview.md)
