---
source: https://developers.cloudflare.com/workers/observability/dev-tools/cpu-usage/
---

# Profiling CPU usage

Profile CPU usage in DevTools to find code that makes responses slow or causes Worker startup to exceed time limits.

## Signature / Usage

Example Worker used to read a CPU profile:

```js
const addNumbers = (body) => {
	for (let i = 0; i < 5000; ++i) {
		body = body + " " + i;
	}
	return body;
};

const moreAddition = (body) => {
	for (let i = 5001; i < 15000; ++i) {
		body = body + " " + i;
	}
	return body;
};

export default {
	async fetch(request, env, ctx) {
		let body = "Hello Profiler! - ";
		body = addNumbers(body);
		body = moreAddition(body);
		return new Response(body);
	},
};
```

Rust Workers: preserve DWARF debug symbols in `Cargo.toml` and build with the `dev` profile in the Wrangler file:

```toml
[package.metadata.wasm-pack.profile.dev.wasm-bindgen]
dwarf-debug-info = true
```

```toml
[build]
command = "cargo install -q worker-build && worker-build --dev"
```

## Notes

- Taking a profile: run `wrangler dev`, press `D` to open DevTools, select the "Profiler" tab, select `Start`, send requests from a new tab, select `Stop`.
- Reading the profile: the top chart is a timeline (zoom on a request); the chart below shows CPU time per operation (hover for details, click to navigate to source). In the example `addNumbers` is 0.3ms and `moreAdditions` is 2.2ms, so optimize `moreAdditions`. The 'Heavy (Bottom Up)' visualization shows relative time per function; garbage collection may also be significant.
- Measuring function execution time in production is hard because Workers only increment timers on I/O (security). Profile locally or capture CPU profiles in production through the dashboard.
- To mimic production, send similar requests (volume, specific routes) or use production-like data via remote bindings.
- Google's guide: https://developer.chrome.com/docs/devtools/performance/nodejs#profile.

## Related

- [devtools.md](./devtools.md)
- [memory-profiling.md](./memory-profiling.md)
- [profiling-in-production.md](./profiling-in-production.md)
- [../local-development/overview.md](../local-development/overview.md)
