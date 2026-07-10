# Spark Stacking

How to connect multiple DGX Spark systems into a compute cluster using simplified networking configuration and a QSFP/CX7 cable for high-performance interconnect, enabling distributed workloads across Grace Blackwell GPUs via MPI and NCCL v2.28.3.

## Connect the QSFP/CX7 Cable

Before configuring networking, connect the two DGX Spark systems with the approved QSFP/CX7 cable. Each unit has two ConnectX-7 ports on the rear panel.

Steps:

1. Locate the two QSFP/CX7 ports on the rear panel of each DGX Spark.
2. Insert one cable end into a ConnectX-7 port on the first unit, and the other end into the same port location on the second unit.
3. Orient the connector so the pull-tab (ring tab) faces the top of the DGX Spark.
4. Align the connector with the port and insert it until it seats fully.
5. To remove the cable, pull the ring tab straight out.

## Connect Multiple DGX Spark Systems

For scaling beyond two units, see the related playbooks:

- Connect Two Sparks
- Connect Three Sparks
- Multi Sparks Through a Switch

## Next Steps

Once tested, the cluster configuration can be scaled to support:

- Job orchestration with Slurm or Kubernetes
- Containerized execution with Singularity or Docker

## Notes

- Do not force the QSFP/CX7 connector. If it does not slide in smoothly, stop, verify tab orientation and port alignment, and try again.
- Distributed workloads use MPI (inter-process CPU communication) and NCCL v2.28.3 (GPU-accelerated collective operations).

## Related

- [System Configuration and Operation](./system-config-and-operation.md)
