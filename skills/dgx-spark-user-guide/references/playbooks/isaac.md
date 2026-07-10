# Install and Use Isaac Sim and Isaac Lab

Build Isaac Sim (Omniverse-based robotics simulation) and Isaac Lab (RL framework on top of Isaac Sim) from source on DGX Spark for developing and testing robotics applications.

## Signature / Usage

```bash
git clone --recurse-submodules https://github.com/isaac-sim/IsaacSim
./build.sh
git clone https://github.com/isaac-sim/IsaacLab
ln -s <isaac-sim-path> _isaac_sim
./isaaclab.sh --install
```

## Notes

- Requires GCC/G++ 11, Git LFS, min 50GB storage, X11 dev libraries for Isaac Lab
- No container image used; built natively on DGX OS
- Isaac Lab training supports headless or visualization modes
- Duration: 30 minutes; Risk: Medium

## Related

- [CUDA-X Data Science](./cuda-x-data-science.md)
