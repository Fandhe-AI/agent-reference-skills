---
source: https://docs.docker.com/get-started/docker-concepts/running-containers/sharing-local-files/
---

# Sharing local files with containers

Bind-mount a host directory into a container with `-v` or `--mount`.

```console
$ docker run -d --name my_site -p 8080:80 -v .:/usr/local/apache2/htdocs/ httpd:2.4
```

Equivalent with `--mount`:

```console
$ docker run -d --name my_site -p 8080:80 --mount type=bind,source=./,target=/usr/local/apache2/htdocs/ httpd:2.4
```

Read-only bind mount and read-write flag:

```console
$ docker run --mount type=bind,source=/HOST/PATH,target=/CONTAINER/PATH,readonly nginx
$ docker run -v /HOST/DIRECTORY:/CONTAINER/DIRECTORY:rw nginx
```

## Notes

- `-v` creates a missing host directory; `--mount` errors instead. Docker recommends `--mount`.
- In Windows PowerShell, give an absolute path rather than `./`.
- Use a volume for data that must outlive the container, a bind mount for host files you want to share live (config, development code).
- Adapted: the official example writes `HOST-DIRECTORY` without a path separator, which `-v` interprets as a named volume; it is shown here as the absolute-path placeholders `/HOST/DIRECTORY` and `/CONTAINER/DIRECTORY`.
