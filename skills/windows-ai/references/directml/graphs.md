# DML_GRAPH_DESC / IDMLDevice1::CompileGraph

`DML_GRAPH_DESC` describes a directed acyclic graph of DirectML operators (nodes) and tensor connections (edges), which `IDMLDevice1::CompileGraph` compiles into a single, optimized `IDMLCompiledOperator`. This is the graph-based alternative to compiling and dispatching operators one at a time.

## Signature / Usage

```cpp
struct DML_GRAPH_DESC {
  UINT                      InputCount;
  UINT                      OutputCount;
  UINT                      NodeCount;
  const DML_GRAPH_NODE_DESC *Nodes;
  UINT                      InputEdgeCount;
  const DML_GRAPH_EDGE_DESC *InputEdges;
  UINT                      OutputEdgeCount;
  const DML_GRAPH_EDGE_DESC *OutputEdges;
  UINT                      IntermediateEdgeCount;
  const DML_GRAPH_EDGE_DESC *IntermediateEdges;
};

HRESULT CompileGraph(
        const DML_GRAPH_DESC *desc,
        DML_EXECUTION_FLAGS  flags,
        REFIID               riid,
  [out] void                 **ppv
);
```

```cpp
ComPtr<IDMLDevice1> dmlDevice1;
dmlDevice.As(&dmlDevice1);

DML_GRAPH_DESC graphDesc{ /* ... nodes and edges ... */ };
ComPtr<IDMLCompiledOperator> compiledGraph;
dmlDevice1->CompileGraph(
    &graphDesc, DML_EXECUTION_FLAG_NONE, IID_PPV_ARGS(&compiledGraph));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `InputCount` / `OutputCount` | `UINT` | Number of graph-level inputs/outputs (may differ from edge counts, since one graph input/output can connect to multiple internal node ports). |
| `NodeCount` / `Nodes` | `UINT` / `const DML_GRAPH_NODE_DESC*` | The internal operator nodes of the graph. |
| `InputEdgeCount` / `InputEdges` | `UINT` / `const DML_GRAPH_EDGE_DESC*` | Connections from graph inputs to internal node inputs (`Type = DML_GRAPH_EDGE_TYPE_INPUT`). |
| `OutputEdgeCount` / `OutputEdges` | `UINT` / `const DML_GRAPH_EDGE_DESC*` | Connections from internal node outputs to graph outputs (`Type = DML_GRAPH_EDGE_TYPE_OUTPUT`). |
| `IntermediateEdgeCount` / `IntermediateEdges` | `UINT` / `const DML_GRAPH_EDGE_DESC*` | Connections between internal nodes (`Type = DML_GRAPH_EDGE_TYPE_INTERMEDIATE`). |
| `desc` (CompileGraph) | `const DML_GRAPH_DESC*` | The graph to compile. |
| `flags` (CompileGraph) | `DML_EXECUTION_FLAGS` | Execution flags for the compiled operator. |

## Notes

- Requires `IDMLDevice1` (available from DirectML 1.1.0 / feature level 2.0 onward), obtained via `QueryInterface`/`As` from `IDMLDevice`.
- The graph must be acyclic; every non-optional operator input/output needs a corresponding edge. Operator inputs created with `DML_TENSOR_FLAG_OWNED_BY_DML` must connect to graph inputs.
- DirectML applies graph-level optimizations (tensor layout selection per adapter, elision of Join/Split operators, and so on); application-level optimizations such as fusing convolution with batch-norm or constant folding should be applied before building the graph.
- After `CompileGraph` returns, the compiled operator no longer references the source `IDMLOperator` objects supplied in the graph nodes.

## Related

- [IDMLOperator / DML_OPERATOR_DESC](./idmloperator.md)
- [IDMLCompiledOperator](./idmlcompiledoperator.md)
- [DMLCreateDevice / IDMLDevice](./dmlcreatedevice.md)
- [Key operators](./operators.md)
