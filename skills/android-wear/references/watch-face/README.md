# watch-face

| Name | Description | Path |
|------|-------------|------|
| Watch Face Format Overview | Declarative XML watch face format, required for all Wear OS watch faces since Jan 2026. | [overview.md](./overview.md) |
| WFF Project Setup | Manifest declarations, file layout, watch_face_info.xml, multi-shape support. | [setup.md](./setup.md) |
| WatchFace (Root Element) | Root `<WatchFace>` element: width, height, clipShape. | [root-element.md](./root-element.md) |
| Scene, Group, and Part Elements | `<Scene>`, `<Group>`, `<PartDraw>`/`<PartText>`/`<PartImage>` containers. | [scene-and-parts.md](./scene-and-parts.md) |
| Drawing Shapes | `<Rectangle>`, `<Ellipse>`, `<Line>`, `<Arc>`, `<Fill>`, `<Stroke>`. | [shapes.md](./shapes.md) |
| Transform, Animation, and Variant | Dynamic attribute changes, easing, and mode-based overrides. | [transform.md](./transform.md) |
| Time Elements | `<DigitalClock>`, `<AnalogClock>`, `<TimeText>`, hour/minute/second hands. | [time.md](./time.md) |
| Text and Fonts | `<PartText>`, `<Text>`, `<Font>`, `<BitmapFont>`, `<Template>`. | [text.md](./text.md) |
| Images | `<PartImage>`, `<Image>`, `<Images>` conditional image sets. | [images.md](./images.md) |
| Expressions and Data Sources | WFF expression language, data sources, functions. | [expressions.md](./expressions.md) |
| Complication Slots | `<ComplicationSlot>`, `<Complication>`, `<DefaultProviderPolicy>`. | [complications.md](./complications.md) |
| User Configurations | `<BooleanConfiguration>`, `<ListConfiguration>`, `<ColorConfiguration>`, `<Flavors>`. | [user-configurations.md](./user-configurations.md) |
| Personalization and Photo Support | `<PhotosConfiguration>`, `<Photos>`, Watch Face Editor integration. | [personalization-and-photos.md](./personalization-and-photos.md) |
| Ambient Mode | `<Variant mode="AMBIENT">` and power-saving constraints. | [ambient-mode.md](./ambient-mode.md) |
| Masks, Blend Modes, and Tints | `renderMode`, `blendMode`, `tintColor`. | [effects.md](./effects.md) |
| WFF Versions | Version-to-Wear-OS and version-to-feature mapping. | [versions.md](./versions.md) |
| Memory Optimization | Ambient/interactive memory budgets and reduction techniques. | [memory-optimization.md](./memory-optimization.md) |
| Build, Debug, and Validate | Build tooling, XML validator, logcat debugging, pre-submission checks. | [build-and-debug.md](./build-and-debug.md) |
