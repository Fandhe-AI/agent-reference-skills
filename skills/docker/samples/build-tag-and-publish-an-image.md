---
source: https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/
---

# Build, tag, and publish an image

Build an image, give it a name with `-t`, add another tag, and push it to a registry.

```console
$ docker build -t <YOUR_DOCKER_USERNAME>/concepts-build-image-demo .
$ docker image ls
$ docker image history <YOUR_DOCKER_USERNAME>/concepts-build-image-demo
$ docker image tag my-username/my-image another-username/another-image:v1
$ docker push <YOUR_DOCKER_USERNAME>/concepts-build-image-demo
```

Full image name structure:

```text
[HOST[:PORT_NUMBER]/]PATH[:TAG]
```

## Notes

- Without a host, `docker.io` is used; without a namespace, `library`; without a tag, `latest`.
- Pushing requires authentication via `docker login`. `requested access to the resource is denied` means you are not logged in or the username in the tag is wrong.
- `docker build .` without `-t` produces an unnamed image identified only by its `sha256:` ID.
