---
source: https://docs.docker.com/get-started/docker-concepts/running-containers/multi-container-applications/
---

# Multi-container applications

Connect Nginx, two Node.js web containers, and Redis on a user-defined network with `docker run`, then replace it with Compose.

```console
$ docker network create sample-app
$ docker run -d  --name redis --network sample-app --network-alias redis redis
$ docker run -d --name web1 -h web1 --network sample-app --network-alias web1 web
$ docker run -d --name web2 -h web2 --network sample-app --network-alias web2 web
$ docker run -d --name nginx --network sample-app  -p 80:80 nginx
$ docker ps
```

With the project's `compose.yml` (from `dockersamples/nginx-node-redis`):

```console
$ docker compose up -d --build
```

## Notes

- Images `nginx` and `web` are built beforehand from the `nginx/` and `web/` directories of the sample repository with `docker build -t <name> .`.
- Network aliases provide DNS names for the containers on the custom network.
- The guide does not print the `compose.yml` content; run the project's file as shipped.
