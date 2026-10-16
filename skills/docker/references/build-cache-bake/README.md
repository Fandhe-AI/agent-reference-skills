# build-cache-bake

| Name | Description | Path |
|------|-------------|------|
| Building with Bake from a Compose file | Compose services translated to Bake targets | [bake-compose-file.md](./bake-compose-file.md) |
| Using Bake with additional contexts | Named extra build contexts via the contexts map | [bake-contexts.md](./bake-contexts.md) |
| Expression evaluation in Bake | HCL arithmetic and conditional expressions | [bake-expressions.md](./bake-expressions.md) |
| Bake file reference | HCL, JSON, and YAML formats for Bake files | [bake-file-reference.md](./bake-file-reference.md) |
| Functions | HCL functions that manipulate build configuration values | [bake-funcs.md](./bake-funcs.md) |
| Inheritance in Bake | Targets inherit attributes from other targets | [bake-inheritance.md](./bake-inheritance.md) |
| Introduction to Bake | Declarative abstraction over the docker build command | [bake-introduction.md](./bake-introduction.md) |
| Matrix targets | Forking one target into variants by parameters | [bake-matrices.md](./bake-matrices.md) |
| Overriding configurations | Override definitions per environment or target | [bake-overrides.md](./bake-overrides.md) |
| Remote Bake file definition | Build Bake files from a remote Git repo or URL | [bake-remote-definition.md](./bake-remote-definition.md) |
| Bake standard library functions | Built-in go-cty functions usable in HCL files | [bake-stdlib.md](./bake-stdlib.md) |
| Bake targets | A target is one build invocation with its options | [bake-targets.md](./bake-targets.md) |
| Variables in Bake | Variables for attribute values and env overrides | [bake-variables.md](./bake-variables.md) |
| Bake | Buildx feature for declarative concurrent builds | [bake.md](./bake.md) |
| Azure Blob Storage cache | azblob cache store in Azure Blob Storage | [cache-backend-azblob.md](./cache-backend-azblob.md) |
| GitHub Actions cache | gha backend using the GitHub Actions cache | [cache-backend-gha.md](./cache-backend-gha.md) |
| Inline cache | inline backend embedded in the pushed image | [cache-backend-inline.md](./cache-backend-inline.md) |
| Local cache | local cache stored as files in an OCI layout | [cache-backend-local.md](./cache-backend-local.md) |
| Registry cache | registry cache kept separate from the image | [cache-backend-registry.md](./cache-backend-registry.md) |
| Amazon S3 cache | s3 cache in S3 or S3-compatible storage | [cache-backend-s3.md](./cache-backend-s3.md) |
| Cache storage backends | Internal cache and external import/export backends | [cache-backends.md](./cache-backends.md) |
| Build garbage collection | BuildKit GC prune policies and manual prune | [cache-garbage-collection.md](./cache-garbage-collection.md) |
| Build cache invalidation | How instructions are checked for cache reuse | [cache-invalidation.md](./cache-invalidation.md) |
| Optimize cache usage in builds | Layer ordering and cache-friendly build techniques | [cache-optimize.md](./cache-optimize.md) |
| Docker build cache | Image layer reuse from the build cache | [cache.md](./cache.md) |
