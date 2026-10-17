---
source: https://docs.docker.com/build/concepts/dockerfile/
---

# Dockerfile overview

Package a small Flask app with a Dockerfile, build it, and run it.

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
```

```dockerfile
# syntax=docker/dockerfile:1
FROM ubuntu:22.04

# install app dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install flask==3.0.*

# install app
COPY hello.py /

# final configuration
ENV FLASK_APP=hello
EXPOSE 8000
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]
```

```console
$ docker build -t test:latest .
$ docker run -p 127.0.0.1:8000:8000 test:latest
```

## Notes

- The `# syntax=docker/dockerfile:1` parser directive must come before any other comment, whitespace, or instruction. `docker/dockerfile:1` tracks the latest release of the version 1 syntax.
- The default file name is `Dockerfile`; use `--file` for names like `<something>.Dockerfile`.
- Only the last `CMD` takes effect. Exec form (`CMD ["flask", ...]`) and shell form differ in signal handling.
