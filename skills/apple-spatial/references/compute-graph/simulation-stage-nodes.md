# Simulation-stage nodes (element / emitter / initialize / module / force / output)

Namespaces of built-in shader nodes, one per simulation stage, that you wire together in a `ComputeNodeGraph`. They are Metal shading-language node functions (symbolKind namespace), not Swift types.

## Signature / Usage

```metal
void emitter::burst(burstSize)
void module::setColor(color)
void force::gravity(gravity)
```

## Options / Props

### emitter

A set of nodes for the emission stage that control how often and how many elements a simulation spawns.

| Node | Description |
|------|-------------|
| `void emitter::burst(burstSize)` | Emit a single burst of particles when the system spawns. |
| `void emitter::continuous(rate, maxBurst)` | Continuously emit particles at a fixed rate. |
| `void emitter::periodicBurst(intervalRange, burstSize)` | Emit a burst of particles periodically. |
| `void emitter::setGroup(activeGroup, sequentialGroups)` | Sets the element group(s) for spawn requests from this emitter. |

### initialize

A set of nodes for the initialization stage that set an element's starting state.

| Node | Description |
|------|-------------|
| `uint initialize::sourceElementIndex()` | When initializing a new particle from an event triggered from another particle, this returns the source particle's index with its system. |
| `int initialize::spawnIndex()` | For a derived element spawned from an emitter, returns the sequential index of the spawn from that emitter. If this was spawned from an EventSource or from the CPU, this value is the index within the current spawn request. |

### element

A set of nodes for reading and writing the current element within a particle simulation.

| Node | Description |
|------|-------------|
| `float element::age()` | Returns the current age of the element in seconds. |
| `float element::ageOverLifetime()` | Returns the normalized age of the element as a ratio of its lifetime. |
| `half4 element::color()` | Returns the current color of the element. |
| `uint element::index()` | Returns the index of the current element. |
| `float element::lifetime()` | Returns the total lifetime of the element in seconds. |
| `float3 element::position()` | Returns the current position of the element, in the graph's coordinate space. |
| `float2 element::size()` | Returns the current size of the element. |
| `void element::terminate(terminate)` | Ends the lifetime of the current element, if terminate is true. |
| `float3 element::velocity()` | Returns the current velocity of the element. |

### module

A set of nodes that mutate per-particle state, including position, velocity, color, size, and lifetime. Also contains a `module::debug` namespace (no abstract on the official page).

| Node | Description |
|------|-------------|
| `void module::addPosition(offset)` | Moves an element by adding an offset to its current position. |
| `void module::addVelocity(velocity)` | Adds a velocity delta to the element's current velocity. |
| `void module::setAlpha(alpha)` | Sets the alpha (opacity) value of an element. |
| `void module::setColor(color)` | Sets the color of an element to the specified RGBA value. |
| `void module::setLifetime(lifetime)` | Sets the lifetime of an element in seconds. |
| `void module::setPosition(position)` | Sets the position of an element to the specified coordinates. |
| `void module::setSize(size)` | Sets the size of an element to the specified dimensions. Size is in meters. |
| `void module::setVelocity(velocity)` | Sets the velocity of an element to the specified value. |

### force

A set of nodes that apply physics forces to particles, including gravity, drag, noise, and twist.

| Node | Description |
|------|-------------|
| `void force::add(force)` | Adds a constant force vector to the current element. |
| `void force::drag(linearDragFactor)` | Applies linear drag to slow down the current element over time. |
| `void force::gravity(gravity)` | Applies a gravity force to the current element |
| `void force::noise(params)` | Applies a noise force to the current element |
| `void force::twist(origin, strength, attraction)` | Applies a twisting force around a vertical axis through a specified origin point. |

### output

A set of nodes for the output stage that adjust an element's appearance without modifying its underlying state.

| Node | Description |
|------|-------------|
| `void output::fadeInOut()` | Applies a smooth fade-in and fade-out animation to the rendered output. |
| `void output::growIn()` | Applies a smooth grow-in animation to the rendered output. |
| `uint output::outputIndex()` | Returns the index of the current output element being processed. |
| `float3 output::outputPosition()` | Returns the position of the rendered output. |
| `void output::setColor(color)` | Sets the color of the rendered output. |
| `void output::setOpacity(opacity)` | Sets the opacity of the rendered output. |
| `void output::setOutputPosition(position)` | Sets the position of the rendered output. |
| `void output::setScale(scale)` | Sets the scale factor of the rendered output. |
| `void output::setSize(size)` | Sets the size of the rendered output. |
| `void output::setUV2(value)` ... `output::setUV7(value)` | Sets the second ... seventh UV coordinate set for the rendered output mesh (one node per set, UV2 to UV7). |
| `void output::setUVTransform(uvOffset, uvScale)` | Sets the UV0 coordinate transformation for the rendered output. |

## Notes

- The namespace pages list platforms as macOS and Reality Composer Pro without an `introducedAt` version; the parent Compute Graph framework is introduced at 27.0 on iOS, iPadOS, Mac Catalyst, macOS, tvOS, and visionOS.
- Related utility namespaces and functions listed on the framework page but not covered here: `graph`, `group`, `texture`, `random`, `matrix4x4f`, `matrix4x4h`, `viewpoint`, `element_integrate`, `texture_sample`, `texture_sample1d`, `orient_to_velocity`, `gridDebugCells`, `gridFromPoints`, `spawn_demo`, `filteredLinesFromNeighbors`, `linesFromNeighbors`.
- Part of Compute Graph (RealityKit particle / compute-simulation node graph), distinct from `MPSGraph` in the apple-silicon skill.
- Sources: https://developer.apple.com/documentation/computegraph/emitter, .../initialize, .../element, .../module, .../force, .../output (fetched 2026-10).

## Related

- [ComputeNodeGraph.Library](./computenodegraph-library.md)
- [ElementSpawnParameters](./elementspawnparameters.md)
- [ComputeNodeGraph](./computenodegraph.md)
