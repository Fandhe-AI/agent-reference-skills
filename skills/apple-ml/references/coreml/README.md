# Core ML

| Name | Description | Path |
|------|-------------|------|
| MLModel | Core class for loading and running a Core ML model | [mlmodel.md](./mlmodel.md) |
| MLModelConfiguration | Settings (compute units, Metal device, parameters) for model loading | [mlmodelconfiguration.md](./mlmodelconfiguration.md) |
| MLModelDescription | Input/output feature descriptions, metadata, and update capability of a model | [mlmodeldescription.md](./mlmodeldescription.md) |
| MLFeatureProvider | Protocol for custom input/output feature collections | [mlfeatureprovider.md](./mlfeatureprovider.md) |
| MLFeatureValue | Type-tagged wrapper for a single feature value (numeric, string, array, image, etc.) | [mlfeaturevalue.md](./mlfeaturevalue.md) |
| MLDictionaryFeatureProvider | Dictionary-backed convenience implementation of MLFeatureProvider | [mldictionaryfeatureprovider.md](./mldictionaryfeatureprovider.md) |
| MLMultiArray | Multidimensional numeric array for tensor inputs and outputs | [mlmultiarray.md](./mlmultiarray.md) |
| MLPredictionOptions | Per-call prediction options including output buffer pre-allocation | [mlpredictionoptions.md](./mlpredictionoptions.md) |
| MLModelAsset | Abstraction over a compiled model file or in-memory specification | [mlmodelasset.md](./mlmodelasset.md) |
| MLComputeUnits | Enum selecting which hardware (CPU/GPU/Neural Engine) runs the model | [mlcomputeunits.md](./mlcomputeunits.md) |
| MLModelCollection | (Deprecated) Set of models from a Core ML model deployment | [mlmodelcollection.md](./mlmodelcollection.md) |
