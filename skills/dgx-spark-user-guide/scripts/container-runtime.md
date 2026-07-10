# container-runtime

NVIDIA Container Runtime for Docker setup, GPU-enabled container execution, and pulling images from NGC. Source: nvidia-container-runtime-for-docker.html, ngc.html

## Run Docker without sudo (optional)

```sh
sudo usermod -aG docker $USER
newgrp docker
```

## Basic GPU access in a container

```sh
docker run -it --gpus=all nvcr.io/nvidia/cuda:13.0.1-devel-ubuntu24.04 nvidia-smi
```

## Restrict GPU capabilities

```sh
docker run -it --gpus '"capabilities=compute,utility"' nvcr.io/nvidia/cuda:13.0.1-devel-ubuntu24.04 nvidia-smi
```

## Authenticate to NGC registry

```sh
docker login nvcr.io
# Username: $oauthtoken
# Password: <your-api-key>
```

## Pull a container image from NGC

```sh
docker pull nvcr.io/nvidia/pytorch:24.08-py3
```

## Run an NGC container with GPU access

```sh
docker run -it --gpus=all nvcr.io/nvidia/pytorch:24.08-py3
```

## Run with a project directory mounted

```sh
docker run -it --gpus=all \
  -v /path/to/your/project:/workspace \
  nvcr.io/nvidia/pytorch:24.08-py3
```

## NGC CLI: download a model

```sh
ngc registry model download-version "nvidia/nemo/bertbaseuncased:1.0.0rc1"
```

## NGC CLI: list available container images

```sh
ngc registry image list nvidia/*
```

## Verify network connectivity to NGC

```sh
curl -I https://ngc.nvidia.com
```

## Troubleshooting: runtime not found

```sh
nvidia-ctk --version
cat /etc/docker/daemon.json
sudo systemctl restart docker
```

## Troubleshooting: driver / container CUDA mismatch

```sh
nvidia-smi
```

Compare the host CUDA driver version reported here against the CUDA version required by the container image.

## Troubleshooting: permission issues

```sh
groups $USER
ls -la /dev/nvidia*
sudo docker run -it --gpus=all nvcr.io/nvidia/cuda:13.0.1-devel-ubuntu24.04 nvidia-smi
```

## Troubleshooting: container startup issues

```sh
docker logs <container_id>
ls /dev/nvidia*
docker run --rm --gpus=all nvcr.io/nvidia/cuda:13.0.1-devel-ubuntu24.04 echo "GPU test successful"
```
