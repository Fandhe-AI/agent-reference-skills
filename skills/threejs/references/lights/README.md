# Lights

| Name | Description | Path |
|------|-------------|------|
| AmbientLight | Globally illuminates all objects in the scene equally, with no direction. Cannot cast shadows. | [AmbientLight.md](./AmbientLight.md) |
| AmbientLightProbe | Removed in r157. Use LightProbe + LightProbeGenerator instead. | [AmbientLightProbe.md](./AmbientLightProbe.md) |
| DirectionalLight | Emits light in a specific direction as if from an infinitely distant source (parallel rays). Commonly used to simulate sunlight. Can cast shadows. | [DirectionalLight.md](./DirectionalLight.md) |
| DirectionalLightShadow | Represents the shadow configuration of a DirectionalLight. | [DirectionalLightShadow.md](./DirectionalLightShadow.md) |
| HemisphereLight | A light positioned above the scene that fades from a sky color (top) to a ground color (bottom). Cannot cast shadows. | [HemisphereLight.md](./HemisphereLight.md) |
| HemisphereLightProbe | Removed in r157. Use LightProbe + LightProbeGenerator instead. | [HemisphereLightProbe.md](./HemisphereLightProbe.md) |
| IESSpotLight | An IES (Illuminating Engineering Society) version of SpotLight. | [IESSpotLight.md](./IESSpotLight.md) |
| Light | Abstract base class for all light types in Three.js. Provides the foundational `color` and `intensity` properties inherited by all concrete light implementations. | [Light.md](./Light.md) |
| LightProbe | Stores information about light passing through 3D space using spherical harmonics, rather than emitting light directly. Approximates diffuse indirect lighting and is functionally equivalent to an irradiance environment map. | [LightProbe.md](./LightProbe.md) |
| LightShadow | Abstract base class for light shadow classes. These classes represent the shadow configuration for different light types. | [LightShadow.md](./LightShadow.md) |
| PointLight | Emits light in all directions from a single point, like a bare light bulb. Can cast shadows. | [PointLight.md](./PointLight.md) |
| PointLightShadow | Represents the shadow configuration of a PointLight. | [PointLightShadow.md](./PointLightShadow.md) |
| ProjectorLight | A projector light version of SpotLight. | [ProjectorLight.md](./ProjectorLight.md) |
| RectAreaLight | Emits light uniformly from a rectangular plane surface. Useful for simulating bright windows, monitors, or strip lighting. Does not support shadows. | [RectAreaLight.md](./RectAreaLight.md) |
| SpotLight | Emits light from a single point in a cone shape, like a stage spotlight. Can cast shadows. | [SpotLight.md](./SpotLight.md) |
| SpotLightShadow | Represents the shadow configuration of a SpotLight. | [SpotLightShadow.md](./SpotLightShadow.md) |
