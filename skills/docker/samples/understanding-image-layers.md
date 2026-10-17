---
source: https://docs.docker.com/get-started/docker-concepts/building-images/understanding-image-layers/
---

# Understanding the image layers

Create image layers manually with `docker container commit` and inspect them with `docker image history`.

```console
$ docker run --name=base-container -ti ubuntu
root@d8c5ca119fcd:/# apt update && apt install -y nodejs
```

In a second terminal, save the container as an image and view its layers:

```console
$ docker container commit -m "Add node" base-container node-base
$ docker image history node-base
$ docker run node-base node -e "console.log('Hello again')"
$ docker rm -f base-container
```

Extend the new base image and set the default command:

```console
$ docker run --name=app-container -ti node-base
$ echo 'console.log("Hello from an app")' > app.js
$ docker container commit -c "CMD node app.js" -m "Add app" app-container sample-app
$ docker run sample-app
$ docker rm -f app-container
```

## Notes

- Used for understanding layers only; real builds use a Dockerfile.
- Run `echo` / `node app.js` inside `app-container`; the `commit` and `run` commands run outside it.
- `-c "CMD ..."` adds image configuration (default command) during commit.
