# Inspecting, debugging, and profiling Core AI models

Three tools investigate model behavior, monitor activity, and profile performance: the Core AI Debugger app, the Core AI debug gauge in Xcode, and the Core AI instrument in Instruments.

## Signature / Usage

```text
Core AI Debugger          standalone macOS app; works on the .aimodel file
Core AI debug gauge       Xcode Debug navigator; live load / specialization / inference events
Core AI instrument        Instruments template (Product > Profile > Core AI)

Include Model Debug Information:
  Product > Scheme > Edit Scheme > Run > Diagnostics > Core AI
```

## Options / Props

| Tool | Purpose |
|------|---------|
| Core AI Debugger | Visualize model structure, execute on a target, validate against a reference run. Download from `https://developer.apple.com/core-ai-debugger/` |
| Core AI debug gauge | Monitor Inference (blue), Load (green), and Specialization (orange) events in real time during a debug session |
| Core AI instrument | Profile timing across CPU, GPU, and Neural Engine; categories Specialization (green), Load (cyan), Setup (magenta), Inference (blue) |

Debug gauge metrics: High (max duration), Low (min duration), Count. Activity table columns: Start (`hh:mm:ss.sss`, relative to the first event), Duration, Model (filename), Event.

Core AI instrument template includes: Core AI, Neural Engine, GPU, Time Profiler.

Reference-run comparison metrics (default PSNR; colors are metric-aware, green is always good): PSNR, Mean Absolute Error (MAE), Mean Squared Error (MSE), Max Absolute Error, Mean Relative Error.

## Notes

### Core AI Debugger

- Three-step workflow: visualize, execute, validate. Workspace: Navigator (left; operations organized by PyTorch module), Structure Viewer and Source Viewer (middle), Inspector (right).
- Source-level features (source line and PyTorch module mappings) need debug metadata embedded in the `.aimodel` at export time (see coreai-torch `api/debugging.html`); without it the Source Viewer is unavailable.
- Execute: configure a scheme (hardware target, compute unit, inputs as zeros / ones / random or a NumPy file), click Run to specialize for the target; the Structure Viewer then shows the specialized model and the Inspector shows each operation's output tensor.
- Comparison: either validate against a reference run (a PyTorch run exported to an `.aimodelintermediates` file with the coreai-torch `save_intermediates` API, passing both the model to validate and the original source model), or validate across configurations (two runs of the same `.aimodel` on different targets, compute units, or inputs). Compared operation pairs are sync points with similarity metrics. To start: open the `.aimodel`, click Comparison in the toolbar, set Configuration A (Target, Function, Compute Unit, Graph Visualization, inputs), set Configuration B Target to Intermediates File under Load Reference Run, select the file, click Compare.
- Navigator sync point indicators: green close match, yellow moderate divergence, red large error. Sort by Similarity or Operation. The Inspector shows both tensors and a visual difference. Divergence clustered in one module localizes the problem.
- The comparison tells whether conversion or optimization changed output, not whether the model performs the task well; use the Evaluations framework for quality.
- PyTorch conversion: see coreai-torch quickstart (`https://apple.github.io/coreai-torch/main/getting-started/quickstart.html`).

### Debug gauge

- Needs an Xcode project that directly links the Core AI framework (add under Frameworks, Libraries, and Embedded Content). The gauge does not support Core ML.
- Report page: click the Core AI tray in the Debug navigator. Each graph bar is the maximum duration in a one-second interval; the tray bars combine events per second with a median-duration label.
- Specialization events appear only for models not specialized ahead of time.
- More button on an Activity row: Open in Core AI Debugger, Export to file (single-tensor inputs save as `.npy`, multi-tensor as zipped `.npz`). Not available for events recorded before the report was opened; Open in Core AI Debugger also needs Include Model Debug Information. To satisfy both: turn the setting on, build and run, open the report page, then run the inference.
- Include Model Debug Information applies only to the Run action of the selected scheme (does not affect archive or distribution builds). It adds overhead to on-device specialization (not load or inference timings); turn it off before measuring specialization performance.
- Profile in Instruments button in the report page header hands off to the Core AI instrument.

### Core AI instrument

- Start: Product > Profile, choose the Core AI template (or open Instruments directly). Profile on a real device and run the app alone for the most accurate data.
- Tracks: top track shows all activity; expand for a per-model track, then a per-function track (default function name is `main`).
- Event order: Specialization (at most one per model; none if fully specialized or cached), Load (only at first load; frequent Load events suggest repeated reloading), Setup (before each inference), Inference.

## Related

- [Compiling Core AI models ahead of time](./compiling-core-ai-models-ahead-of-time.md)
- [Managing model specialization and caching](./managing-model-specialization-and-caching.md)
- [Integrating on-device AI models](./integrating-on-device-ai-models.md)
