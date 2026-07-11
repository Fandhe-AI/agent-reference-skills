# Connect Three DGX Spark in a Ring Topology

Configure three DGX Spark systems in a 200GbE QSFP ring topology for high-speed inter-node communication and passwordless SSH cluster operations.

## Signature / Usage

```bash
# on each node: verify username match, connect QSFP cables in ring, then
./discover-sparks.sh
```

## Notes

- Requires 3 DGX Spark systems, 3 QSFP cables (0.4m recommended), matching usernames, sudo access
- No specific AI model/container involved; infrastructure setup only
- Includes NCCL bandwidth test validation and rollback instructions
- Duration: ~1 hour; Risk: Medium

## Field notes: identity-IP overlay for a switchless 3-node mesh

In a 3-node direct-connect (ring/triangle) each node's two QSFP ports reach a
*different* peer, so **no single IP is reachable from all peers**. Ray/NCCL need a
common rendezvous IP, and advertising one node's port IP times out from the peer on
the other link. Fix without a switch:

- Give each node an **identity `/32` on a `dummy0` interface** (a range separate from
  the QSFP `/30` links), then add **static host routes**: `dest = peer identity`,
  `via = the directly-connected peer address on the shared /30`, `dev = the QSFP IF
  facing that peer`. The kernel then picks the correct egress per destination.
- Point apps at the identity IP: `NCCL_SOCKET_IFNAME=dummy0`,
  `GLOO_SOCKET_IFNAME=dummy0`, `NCCL_IB_DISABLE=1` (TCP over QSFP), and for
  Ray/vLLM `VLLM_HOST_IP=<own identity>` / `ray start --node-ip-address=<own identity>`.
- Validated field result: full N×(N-1) ping mesh over QSFP and NCCL bootstrap
  (`via NET/Socket`) succeed over the overlay. This is a **TCP path — not RoCE line
  rate**; for full RoCE bandwidth use a switch (see below) or rebuild NCCL for the GPU
  arch ([nccl.md](./nccl.md)). Persist routes in netplan and the `dummy0` address in a
  small systemd unit (ephemeral `ip` commands are lost on reboot).

## Related

- [Connect Two Sparks](./connect-two-sparks.md)
- [Multi Sparks Through Switch](./multi-sparks-through-switch.md)
- [NCCL for Two Sparks](./nccl.md)
