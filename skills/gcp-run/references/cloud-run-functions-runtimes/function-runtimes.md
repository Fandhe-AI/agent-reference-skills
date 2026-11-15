---
source: https://docs.cloud.google.com/run/docs/runtimes/function-runtimes
---

# Cloud Run functions runtimes

Cloud Run functions runs in an environment of an OS version with add-on packages, language support, and the Functions Frameworks library that invokes your function. This environment is identified by the language version and is known as the runtime. Languages: Node.js, Python, Go, Java, Ruby, PHP, and .NET.

## Signature / Usage

Select the runtime at deploy time with a runtime ID as the base image:

```bash
gcloud run deploy FUNCTION \
    --source . \
    --function FUNCTION_ENTRYPOINT \
    --base-image python314
```

Snippet taken from https://docs.cloud.google.com/run/docs/runtimes/python.

## Options / Props

| Language | Runtime page | Latest GA runtime ID in the source table |
| --- | --- | --- |
| Node.js | https://docs.cloud.google.com/run/docs/runtimes/nodejs | `nodejs24` (`nodejs26` is Preview) |
| Python | https://docs.cloud.google.com/run/docs/runtimes/python | `python314` (`python315` is Preview) |
| Go | https://docs.cloud.google.com/run/docs/runtimes/go | `go127` |
| Java | https://docs.cloud.google.com/run/docs/runtimes/java | `java25` |
| Ruby | https://docs.cloud.google.com/run/docs/runtimes/ruby | `ruby40` |
| PHP | https://docs.cloud.google.com/run/docs/runtimes/php | `php85` |
| .NET | https://docs.cloud.google.com/run/docs/runtimes/dotnet | `dotnet10` |

## Notes

- The source embeds the same per-language support schedule tables as the Cloud Run runtime support page; they are recorded once in runtime-support.md.
- Functions runtimes are subject to the Cloud Run runtime lifecycle and support schedule.
- Source: https://docs.cloud.google.com/run/docs/runtimes/function-runtimes (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [runtime-support.md](./runtime-support.md)
- [nodejs.md](./nodejs.md)
- [python.md](./python.md)
