# Task Scheduling: Reading the Printout

Constructing a `TaskManager` runs `print_and_verify()` immediately; with the default `verbose=True` it prints the schedule table, register budget, SMEM / TMEM usage, and exhaustive-checker output.

## Signature / Usage

```text
===============================================================
|         MmaTask[5:6)         |        StoreTask[0:4)        |
==============>   Full (Head + Loop + Tail)   <===============
| SmemAb       ConsAux    H  0 | TmemC        ConsAux    H  0 |
| TmemC        ProdAux    H  0 | GmemD        ProdAux    H  0 |
| TmemC        ProdAux    H  1 | TmemC        ConsTrW    T  0 |
| TmemC        ProdTrA    H  0 |                              |
| TmemC        ProdAcq<-  H  0 |                              |
| SmemAb       ConsTrW       0 |                              |
| SmemAb     ->ConsWai       0 |                              |
| SmemAb       ConsWrk       0 |                              |
| TmemC        ProdWrk       0 |                              |
| SmemAb     <-ConsRel       0 |                              |
| TmemC        ProdCmt->  T  0 | TmemC      ->ConsWai    T  0 |
|                              | TmemC        ConsWrk    T  0 |
|                              | GmemD        ProdWrk    T  0 |
|                              | GmemD        ProdWrk    T  1 |
|                              | TmemC      <-ConsRel    T  0 |
===============> End Full (Head + Loop + Tail) <===============

    Phase tags:  H — Head (prefetch, before the loop)  |  F — FirstIter
      (first iteration only)  |  L — LastIter (last iteration only)  |
      T — Tail (drain, after the loop)
```

## Options / Props

| Cell field | Meaning |
| --- | --- |
| resource | The resource the step touches. |
| stage | The pipeline operation (`ConsumerWait`, `ProducerCommit`, ...). |
| phase-tag | `H` head, `F` first iteration, `L` last iteration, `T` tail; blank for a normal loop-body step. |
| call-idx | Call index of the step's schedule slot (distinguishes repeated work for the same resource/stage in the same phase). |

| `TaskManager` flag | Effect |
| --- | --- |
| `verbose=False` | Silences all informational output; verification errors are raised regardless. |
| `exhaustive_deadlock_race_check=True` (default) | Runs the BFS interleaving checker and prints its exploration. |

## Notes

- Print order: schedule table (one column per task, headed `name[warp_start:warp_end)`, simulated step by step), register budget, SMEM / TMEM usage and allocator report, exhaustive checker output.
- A step that can never make progress prints `is blocked!` and the run fails:

  ```text
       Smem       ConsumerWait    0 is blocked!  NOTE: if the domain is not a
         compile-time Python int, this may be a FALSE POSITIVE (domain defaults
         to 1).  Re-run with a realistic int domain via validate-only mode for
         accurate results.
  ```

  Unmatched brackets are reported the same way, e.g. `1x ProducerCommit from Smem not consumed!` or `1x ProducerAcquire from Smem not matched by ConsumerRelease!`.
- Register budget: one line per task shows `num_warps x (default_per_thread - task_per_thread)`. A task that lowers its budget donates registers (positive); one that raises it borrows (negative). `Num. regs` is the total register-file usage for the block and must not exceed the SM register file; a negative `Reg budget` is fine as long as the per-block total fits.

  ```text
  Task  0 'LoadTask            ', numWarps x (defaultMaxNumRegs - numRegsPerThread) = 1 x (168 - 32) = 136
  Task  1 'StoreTask           ', numWarps x (defaultMaxNumRegs - numRegsPerThread) = 4 x (168 - 232) = -256
  Num. regs: 41984 (free reg blocks: 3)
  Reg budget: -120
  ```

- SMEM / TMEM usage is printed against hardware capacity; `barriers` is the pipeline mbarrier storage (16 B per stage). Exceeding either capacity is an error. Aliased allocations are marked `*` and `savings` is the memory reclaimed by aliasing:

  ```text
  SMEM usage: 49408 B (data 49152 B + barriers 256 B) / 232448 B capacity
  TMEM usage: 128 columns / 512 columns capacity
  ```

- Exhaustive checker summary: `Result: SAFE` means no valid interleaving failed; `Result: UNSAFE` raises an error with details (e.g. `WriterTask writes TmemSP vs ReaderTask cons_work TmemVec`).

  ```text
  BFS complete: 7 states explored, 1 complete, 0 deadlock(s), 0 race(s), 0 PDL order violation(s)
  Result: SAFE
  ```

- If the search reaches its state cap (`max_states=100000`) it prints a warning that the search was incomplete, not that the schedule is safe. Keep the checker on in CI with a compile-time Python `int` domain and bump the state limit; disable it (`exhaustive_deadlock_race_check=False`) in production kernels for faster compilation.
- Document version: CUTLASS v4.8.0 — [Reading the Printed Output](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_general/ts_printout.html) (source: [ts_printout.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_general/ts_printout.rst))

## Related

- [Task Scheduling: Validation](./ts-validation.md)
- [Task Scheduling: Allocators](./ts-allocators.md)
- [Task Scheduling API: task_manager](./ts-api-task-manager.md)
