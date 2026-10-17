---
source: https://docs.docker.com/get-started/tutorials/run-an-app/
---

# Build and share a containerized application

End-to-end flow: run a published image, start a Compose stack, build your own image, push it to Docker Hub.

```console
$ docker pull docker/welcome-to-docker
$ docker run --detach --name welcome --publish 8080:80 docker/welcome-to-docker
$ docker rm --force welcome

$ git clone https://github.com/docker/getting-started-todo-app
$ cd getting-started-todo-app
$ docker compose up --build --detach
$ docker compose ps

$ docker build --tag <YOUR_DOCKER_USERNAME>/getting-started-todo-app .
$ docker run --detach --name todo --publish 8080:3000 <YOUR_DOCKER_USERNAME>/getting-started-todo-app

$ docker login
$ docker push <YOUR_DOCKER_USERNAME>/getting-started-todo-app

$ docker rm --force todo
$ docker compose down --volumes
```

## Notes

- Create the public repository `getting-started-todo-app` in Docker Home before pushing.
- The sample project's `compose.yaml` defines five services (frontend, API, database, database management interface, proxy).
- `docker compose down --volumes` also removes the stack's volumes.
