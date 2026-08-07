# scripting-api-reference

| Name | Description | Path |
|------|-------------|------|
| Animation | Represents a named timeline animation retrieved from an Artboard | [artboard-animation.md](./artboard-animation.md) |
| Artboard | Represents a Rive artboard instance: drawing, advancing, interaction… | [artboard-artboard.md](./artboard-artboard.md) |
| Artboard Event Types | Event payload types delivered to Artboard interaction handlers and… | [artboard-events.md](./artboard-events.md) |
| ListenerContext | Provides access to the event context that triggered a state-machine… | [artboard-listener-context.md](./artboard-listener-context.md) |
| NodeData / NodeReadData | Node types representing a node within an Artboard's hierarchy… | [artboard-node-data.md](./artboard-node-data.md) |
| TextInput | Represents a text input event (coming soon) | [artboard-text-input.md](./artboard-text-input.md) |
| ViewModel (artboards namespace) | Represents a view model used for data binding: structured data that… | [artboard-view-model.md](./artboard-view-model.md) |
| Color | An ARGB-packed color value used throughout the scripting drawing… | [color.md](./color.md) |
| Configuration (Scripting Editor) | Customize the Rive code editor's appearance and behavior (theme,… | [configuration.md](./configuration.md) |
| Creating Scripts | How to create and attach a new script asset in the Rive Editor | [creating-scripts.md](./creating-scripts.md) |
| Data Binding (Scripting) | Scripting allows a script to read, modify, and subscribe to changes… | [data-binding.md](./data-binding.md) |
| DataValue | Foundational type for storing values passed into scripted… | [data-value.md](./data-value.md) |
| Debugging (Debug Panel / Unit Testing) | The Debug Panel inspects script console output and lists pre-run… | [debugging.md](./debugging.md) |
| Scripting Demos | Community/example gallery demonstrating scripting features:… | [demos.md](./demos.md) |
| Font | An immutable font resource, obtained from a host and assignable… | [font.md](./font.md) |
| Getting Started (Scripting) | Rive Scripting lets you write code, animation, and interaction… | [getting-started.md](./getting-started.md) |
| Gradient / GradientStop | Gradient defines a fill/stroke gradient (linear or radial) from a… | [gradient.md](./gradient.md) |
| GPU Bindings | Resource-binding types that connect buffers, textures, and… | [gpu-bindings.md](./gpu-bindings.md) |
| GPU Buffers | Vertex, index, and uniform buffer types used with GPUPipeline… | [gpu-buffers.md](./gpu-buffers.md) |
| GPU Core | Core rendering-target and pipeline types for the WGSL Shaders… | [gpu-core.md](./gpu-core.md) |
| GPU Pipeline Fixed-Function State | Fixed-function state descriptors and enums used when building a… | [gpu-pipeline-state.md](./gpu-pipeline-state.md) |
| GPU Textures | Texture resource, sampler, and pixel-format types for the… | [gpu-textures.md](./gpu-textures.md) |
| Image / ImageSampler / ImageFilter / ImageWrap | Image is a drawable image resource. ImageSampler configures the… | [image.md](./image.md) |
| Context (interfaces.Context) | Bridges a script and the Rive runtime: view model access, asset… | [interface-context.md](./interface-context.md) |
| Converter (interfaces.Converter) | The lifecycle-method contract implemented by Converter Scripts.… | [interface-converter.md](./interface-converter.md) |
| DecodedImage | Pixel data decoded via context:decodeImage(data) | [interface-decoded-image.md](./interface-decoded-image.md) |
| Input<T> (interfaces.Input) | Generic type wrapper for a typed input value declared on a… | [interface-input.md](./interface-input.md) |
| Layout (interfaces.Layout) | The lifecycle-method contract implemented by Layout Scripts. A… | [interface-layout.md](./interface-layout.md) |
| Interfaces (Misc) | Smaller interfaces.* types grouped together: property-accessor… | [interface-misc.md](./interface-misc.md) |
| Node (interfaces.Node) | The lifecycle-method contract implemented by Node Scripts:… | [interface-node.md](./interface-node.md) |
| PathEffect (interfaces.PathEffect) | The lifecycle-method contract implemented by Path Effect Scripts… | [interface-path-effect.md](./interface-path-effect.md) |
| Trigger (interfaces.Trigger) | A function-typed input that triggers an action when invoked | [interface-trigger.md](./interface-trigger.md) |
| ViewModel (interfaces.ViewModel) | Access to named properties used for data binding between… | [interface-view-model.md](./interface-view-model.md) |
| Keyboard Shortcuts (Scripting Editor) | Reference for keyboard shortcuts in the Rive script editor… | [keyboard-shortcuts.md](./keyboard-shortcuts.md) |
| Luau Built-in Types | Built-in Luau standard-library types available inside Rive… | [luau-types.md](./luau-types.md) |
| Mat2D | A 2D transformation matrix with components for scaling, rotation… | [mat2d.md](./mat2d.md) |
| Mat4 | A 4x4 column-major transformation matrix for 3D transforms and… | [mat4.md](./mat4.md) |
| Paint / PaintDefinition | Paint controls how a shape is rendered: fill/stroke styling,… | [paint.md](./paint.md) |
| PathMeasure / ContourMeasure / PathCommand / PathData / CommandType | Measurement and inspection types for Path geometry. PathData is… | [path-measure.md](./path-measure.md) |
| Path | A mutable drawing object built from move/line/curve commands… | [path.md](./path.md) |
| Pointer Events (Scripting) | Scripts can listen for pointer interaction by implementing… | [pointer-events.md](./pointer-events.md) |
| Promise | A value that will be available in the future. Supports… | [promise.md](./promise.md) |
| Property / PropertyTrigger / Listener | Property is a mutable, listenable reference to a ViewModel… | [property.md](./property.md) |
| Converter Scripts | Custom data-binding converters for when built-in options… | [protocol-converter-scripts.md](./protocol-converter-scripts.md) |
| Layout Scripts | Layout Scripts extend Node Scripts, giving programmatic control… | [protocol-layout-scripts.md](./protocol-layout-scripts.md) |
| Listener Action Scripts | Run custom logic when a state machine listener fires — side… | [protocol-listener-action-scripts.md](./protocol-listener-action-scripts.md) |
| Node Scripts | Node scripts render shapes, images, text, artboards, and other… | [protocol-node-scripts.md](./protocol-node-scripts.md) |
| Protocols (Overview) | Protocols are the structured categories of scripts that tell the… | [protocol-overview.md](./protocol-overview.md) |
| Path Effect Scripts | Modify and transform path geometry in real-time — warping,… | [protocol-path-effect-scripts.md](./protocol-path-effect-scripts.md) |
| Test Scripts | Write and run unit tests for Util Scripts directly in the Rive… | [protocol-test-scripts.md](./protocol-test-scripts.md) |
| Transition Condition Scripts | Custom conditions for state machine transitions when built-in… | [protocol-transition-condition-scripts.md](./protocol-transition-condition-scripts.md) |
| Util Scripts | Reusable, focused modules that organize shared logic across… | [protocol-util-scripts.md](./protocol-util-scripts.md) |
| Renderer | Draws paths and images, manages clipping, and applies transforms… | [renderer.md](./renderer.md) |
| Script Inputs | Scripted Inputs bridge scripts and the Rive editor: fields… | [script-inputs.md](./script-inputs.md) |
| Vector | A three-component vector (x, y, z; z is 0 for 2D vectors from… | [vector.md](./vector.md) |
| WGSL Shaders | Rive lets scripts write custom WGSL programs that execute on… | [wgsl-shaders.md](./wgsl-shaders.md) |
