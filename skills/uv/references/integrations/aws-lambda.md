---
source: https://docs.astral.sh/uv/guides/integration/aws-lambda/
---

# AWS Lambda

Using uv with AWS Lambda to manage dependencies and build deployment packages as Docker container images or zip archives (including Lambda layers).

## Signature / Usage

Example FastAPI application (`pyproject.toml`; handler `app.main.handler` via Mangum):

```toml
[project]
name = "uv-aws-lambda-example"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = [
    # FastAPI is a modern web framework for building APIs with Python.
    "fastapi",
    # Mangum is a library that adapts ASGI applications to AWS Lambda and API Gateway.
    "mangum",
]

[dependency-groups]
dev = [
    # In development mode, include the FastAPI development server.
    "fastapi[standard]>=0.115",
]
```

Run locally with `uv run fastapi dev`.

## Deploying a Docker image

Multi-stage build: bundle dependencies into the task root in the first stage, copy it into the final image (uv itself is not included).

```dockerfile
FROM ghcr.io/astral-sh/uv:0.13.1 AS uv

# First, bundle the dependencies into the task root.
FROM public.ecr.aws/lambda/python:3.13 AS builder

# Enable bytecode compilation, to improve cold-start performance.
ENV UV_COMPILE_BYTECODE=1

# Disable installer metadata, to create a deterministic layer.
ENV UV_NO_INSTALLER_METADATA=1

# Enable copy mode to support bind mount caching.
ENV UV_LINK_MODE=copy

# Bundle the dependencies into the Lambda task root via `uv pip install --target`.
#
# Omit any local packages (`--no-emit-workspace`) and development dependencies (`--no-dev`).
# This keeps the layer cached across changes to the application code or `pyproject.toml`, as long as
# `uv.lock` is unchanged.
RUN --mount=from=uv,source=/uv,target=/bin/uv \
    --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    uv export --frozen --no-emit-workspace --no-dev --no-editable -o requirements.txt && \
    uv pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

FROM public.ecr.aws/lambda/python:3.13

# Copy the runtime dependencies from the builder stage.
COPY --from=builder ${LAMBDA_TASK_ROOT} ${LAMBDA_TASK_ROOT}

# Copy the application code.
COPY ./app ${LAMBDA_TASK_ROOT}/app

# Set the AWS Lambda handler.
CMD ["app.main.handler"]
```

Build, push to ECR, and deploy:

```console
$ uv lock
$ docker build -t fastapi-app .
$ aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
$ docker tag fastapi-app:latest aws_account_id.dkr.ecr.region.amazonaws.com/fastapi-app:latest
$ docker push aws_account_id.dkr.ecr.region.amazonaws.com/fastapi-app:latest
$ aws lambda create-function \
   --function-name myFunction \
   --package-type Image \
   --code ImageUri=aws_account_id.dkr.ecr.region.amazonaws.com/fastapi-app:latest \
   --role arn:aws:iam::111122223333:role/my-lambda-role
```

Update an existing function:

```console
$ aws lambda update-function-code \
   --function-name myFunction \
   --image-uri aws_account_id.dkr.ecr.region.amazonaws.com/fastapi-app:latest \
   --publish
```

Invoke:

```console
$ aws lambda invoke \
   --function-name myFunction \
   --payload file://event.json \
   --cli-binary-format raw-in-base64-out \
   response.json
```

`event.json`:

```json
{
  "httpMethod": "GET",
  "path": "/",
  "requestContext": {},
  "version": "1.0"
}
```

### Workspace support

Local dependencies (workspace members) must also be included. `uv init --lib library` + `uv add ./library` converts the project into a workspace (`[tool.uv.workspace] members = ["library"]`). Add a second `RUN` in the builder stage, omitting `--no-emit-workspace`, so third-party dependencies stay cached separately:

```dockerfile
RUN --mount=from=uv,source=/uv,target=/bin/uv \
    --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=library,target=library \
    uv export --frozen --no-dev --no-editable -o requirements.txt && \
    uv pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"
```

## Deploying a zip archive

Zip archives are limited to 250 MB. Bundle dependencies, then the application code:

```console
$ uv export --frozen --no-dev --no-editable -o requirements.txt
$ uv pip install \
   --no-installer-metadata \
   --no-compile-bytecode \
   --python-platform x86_64-manylinux2014 \
   --python 3.13 \
   --target packages \
   -r requirements.txt
$ cd packages
$ zip -r ../package.zip .
$ cd ..
$ zip -r package.zip app
$ aws lambda create-function \
   --function-name myFunction \
   --runtime python3.13 \
   --zip-file fileb://package.zip \
   --handler app.main.handler \
   --role arn:aws:iam::111122223333:role/service-role/my-lambda-role
```

Update an existing function: `aws lambda update-function-code --function-name myFunction --zip-file fileb://package.zip`.

### Using a Lambda layer

Use `--prefix` rather than `--target` for the dependency layer, then zip with the expected layout:

```console
$ uv export --frozen --no-dev --no-editable -o requirements.txt
$ uv pip install \
   --no-installer-metadata \
   --no-compile-bytecode \
   --python-platform x86_64-manylinux2014 \
   --python 3.13 \
   --prefix packages \
   -r requirements.txt
$ mkdir python
$ cp -r packages/lib python/
$ zip -r layer_content.zip python
$ aws lambda publish-layer-version --layer-name dependencies-layer \
   --zip-file fileb://layer_content.zip \
   --compatible-runtimes python3.13 \
   --compatible-architectures "x86_64"
```

Create the function with only the app code (`zip -r app.zip app`), then attach the layer by ARN:

```console
$ aws lambda update-function-configuration --function-name myFunction \
    --cli-binary-format raw-in-base64-out \
    --layers "arn:aws:lambda:region:111122223333:layer:dependencies-layer:1"
```

## Notes

- ARM-based runtimes: replace `public.ecr.aws/lambda/python:3.13` with `public.ecr.aws/lambda/python:3.13-arm64`, and `x86_64-manylinux2014` with `aarch64-manylinux2014`.
- The AWS Management Console assumes entrypoint `lambda_function.lambda_handler`; change it if your handler differs (e.g. `app.main.handler`).
- Pass `-X` to `zip` for deterministic archives.
- Official example project: `astral-sh/uv-aws-lambda-example`.

## Related

- [Docker](./docker.md)
- [Alternative registries](./alternative-registries.md)
