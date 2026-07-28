# IDMLOperatorInitializer

Represents a specialized dispatchable object whose sole purpose is to initialize one or more `IDMLCompiledOperator` instances. Created via `IDMLDevice::CreateOperatorInitializer`. Every compiled operator must be initialized exactly once before it can be executed.

## Signature / Usage

```cpp
ComPtr<IDMLOperatorInitializer> initializer;
IDMLCompiledOperator* compiledOps[] = { compiledOperator.Get() };
dmlDevice->CreateOperatorInitializer(
    ARRAYSIZE(compiledOps), compiledOps,
    IID_PPV_ARGS(&initializer));

// Record onto a command list, then execute:
commandRecorder->RecordDispatch(commandList.Get(), initializer.Get(), bindingTable.Get());
```

## Options / Props

| Name | Description |
|------|-------------|
| `Reset` | Resets the initializer to target a different set of compiled operators, allowing reuse. |

## Notes

- Inherits from `IDMLDispatchable`; recorded for execution via `IDMLCommandRecorder::RecordDispatch`, same as a compiled operator.
- Expected bindings when dispatched: one input buffer-array binding per target operator (matching the order operators were supplied), and the persistent resources of each target operator as outputs.
- Operator initializers never require a persistent resource themselves (`GetBindingProperties` always reports `PersistentResourceSize == 0`), but may require a temporary resource.
- The initializer object itself does not need initialization — only the target compiled operators do.

## Related

- [IDMLCompiledOperator](./idmlcompiledoperator.md)
- [IDMLBindingTable / DML_BINDING_DESC](./idmlbindingtable.md)
- [IDMLCommandRecorder](./idmlcommandrecorder.md)
- [DMLCreateDevice / IDMLDevice](./dmlcreatedevice.md)
