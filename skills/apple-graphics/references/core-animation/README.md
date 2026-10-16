# Core Animation

| Name | Description | Path |
|------|-------------|------|
| CAAnimation | Abstract base class for animations in Core Animation. Provides support for `CAMediaTiming` and `CAAction` protocols. Not instantiated directly — use concrete subclasses. | [caanimation.md](./caanimation.md) |
| CAAnimationGroup | An animation that allows multiple animations to be grouped and run concurrently on a layer. | [caanimationgroup.md](./caanimationgroup.md) |
| CABasicAnimation | An animation that provides single-keyframe interpolation between two values for a layer property. | [cabasicanimation.md](./cabasicanimation.md) |
| CAConstraint | A representation of a single layout constraint between two layers. Each instance encapsulates one geometry relationship between two layers on the same axis. | [caconstraint.md](./caconstraint.md) |
| CADisplayLink | A timer object that allows your app to synchronize its drawing to the refresh rate of the display. | [cadisplaylink.md](./cadisplaylink.md) |
| CAEmitterLayer | A layer that emits, animates, and renders a particle system. Particles are drawn above the layer's background color and border. | [caemitterlayer.md](./caemitterlayer.md) |
| CAGradientLayer | A layer that draws a color gradient over its background color, filling the shape of the layer. | [cagradientlayer.md](./cagradientlayer.md) |
| CAKeyframeAnimation | An animation that provides keyframe animation capabilities for a layer object, allowing multiple intermediate values to be specified. | [cakeyframeanimation.md](./cakeyframeanimation.md) |
| CALayer | An object that manages image-based content and allows you to perform animations on that content. Base class for all Core Animation layers. | [calayer.md](./calayer.md) |
| CAMediaTimingFunction | A function that defines the pacing of an animation as a timing curve, mapping normalized input time `[0, 1]` to normalized output time `[0, 1]`. | [camediatimingfunction.md](./camediatimingfunction.md) |
| CAMetalDisplayLink | A class that allows Metal apps to register for callbacks to synchronize animations with display refresh rates, with specialized control over timing windows and rendering delays. | [cametaldisplaylink.md](./cametaldisplaylink.md) |
| CAMetalDrawable | A Metal drawable associated with a Core Animation layer. Represents a drawable owned by a `CAMetalLayer` instance. | [cametaldrawable.md](./cametaldrawable.md) |
| CAPropertyAnimation | An abstract subclass for creating animations that manipulate the value of layer properties. The property to animate is specified using a key path relative to the layer using the animation. | [capropertyanimation.md](./capropertyanimation.md) |
| CAReplicatorLayer | A layer that creates a specified number of copies of its sublayers, each with varying geometric, temporal, and color transformations. | [careplicatorlayer.md](./careplicatorlayer.md) |
| CAScrollLayer | A layer that displays scrollable content larger than its own bounds. | [cascrolllayer.md](./cascrolllayer.md) |
| CAShapeLayer | A layer that draws a cubic Bezier spline in its coordinate space. The shape is composited between the layer's `contents` and its first sublayer. | [cashapelayer.md](./cashapelayer.md) |
| CASpringAnimation | An animation that applies spring-like physics to a layer's properties, producing natural bounce and overshoot behavior. | [caspringanimation.md](./caspringanimation.md) |
| CATextLayer | A layer that provides simple text layout and rendering of plain or attributed strings. | [catextlayer.md](./catextlayer.md) |
| CATransaction | A mechanism for grouping multiple layer-tree operations into atomic updates to the render tree. | [catransaction.md](./catransaction.md) |
| CATransition | An animation that provides an animated transition between a layer's states. | [catransition.md](./catransition.md) |
| CATiledLayer | A layer that provides a way to asynchronously provide tiles of the layer's content, potentially cached at multiple levels of detail. | [catiledlayer.md](./catiledlayer.md) |
| CATransformLayer | A layer used to create true 3D layer hierarchies, rather than the flattened hierarchy rendering model used by other layer types. | [catransformlayer.md](./catransformlayer.md) |
| CAValueFunction | An object that provides a flexible method of defining animated transformations, letting you animate individual components of a transform such as rotation, scale, or translation. | [cavaluefunction.md](./cavaluefunction.md) |
