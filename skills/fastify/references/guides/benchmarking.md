---
source: https://fastify.dev/docs/latest/Guides/Benchmarking/
---

# Benchmarking

Target: Fastify v5.12.1. Measures how a change affects application performance, including comparisons across branches and Node.js versions.

## Signature / Usage

```sh
# Run the benchmark in the current branch
npm run benchmark

# Run against a different Node.js version
npx -p node@10 -- npm run benchmark

# Compare across branches
branchcmp --rounds 2 --script "npm run benchmark"

# Compare current branch with main (Gitflow)
branchcmp --rounds 2 --gitflow --script "npm run benchmark"
```

## Notes

- Tooling used: [`autocannon`](https://github.com/mcollina/autocannon) (HTTP/1.1 load generator), [`branch-comparer`](https://github.com/StarpTech/branch-comparer) (checkout/run/compare across git branches), [`concurrently`](https://github.com/open-cli-tools/concurrently), and `npx` for running against arbitrary Node.js versions

## Related

- [recommendations.md](./recommendations.md)
