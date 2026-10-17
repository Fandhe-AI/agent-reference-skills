# Task Scheduling: Patterns

Advanced warp-specialization patterns beyond a single linear producer/consumer schedule: ping-pong, split-consumer, interleaved pipelines, and leader-routed completions.

## Signature / Usage

Ping-pong (one buffer reused in place by two tasks; declared as a self-edge in the dependency graph):

```python
# Producer side: reads the current contents and writes the next contents
# back into the same buffer (transform in place).
@schedule
def producer_schedule(smem_pp: SmemPingPongResource) -> None:
    with domain_loop(0, num_k_tiles, 1):
        smem_pp.acquire()
        cur = smem_pp.read_current()
        smem_pp.write_next(cur=cur)
        smem_pp.commit()

# Consumer side (the other task): transforms in place.
@schedule
def consumer_schedule(smem_pp: SmemPingPongResource) -> None:
    with domain_loop(0, num_k_tiles, 1):
        smem_pp.wait()
        smem_pp.transform_inplace()
        smem_pp.release()

# The buffer is the producer's dst and the consumer's src; the self-edge
# ties the two sides together.
producer_task = Task(..., dst_resources=[smem_pp])
consumer_task = Task(..., src_resources=[smem_pp])

task_manager = TaskManager(
    tasks=[producer_task, consumer_task],
    resource_dependency_graph={smem_pp: [smem_pp]},
)
```

## Options / Props

| Pattern | Key requirements |
| --- | --- |
| Ping-Pong | Resource must have a `pipeline_config`; the pipeline's consumer side must be synchronous (`AsyncAsync`, `TmaAsync`, `UmmaAsync`); `TmaUmma` / `AsyncUmma` / `UmmaUmma` are rejected; the resource is used on both sides (`src_resources` and `dst_resources`). |
| Split-Consumer | `wait` and `release` of a pipeline in different tasks; a proxy resource declared downstream of the buffers in the dependency graph. |
| Interleaved Pipelines | `interleave_stride` = number of lanes; `num_stages` divisible by every role's stride; warp-lane mode needs `num_warps == interleave_stride`; domain-lane mode needs one sibling task per lane with `domain_start` in `[0, interleave_stride)` and `step == interleave_stride`. |
| Leader-Routed Completions | One warp (`TaskWarpLeader`) and/or one CTA (`CtaLeader`) arms the TMA transaction barrier; `num_bytes` must cover every producer the leader covers; declare `num_bytes_per_warp_per_cta`. |

## Notes

- Split-consumer example (the proxy `wait` serves as the open bracket for work on the buffers):

  ```python
  # proxy is downstream of the two SMEM buffers.
  resource_dependency_graph = {
      smem_a:  [gmem_a, work_queue],
      smem_b:  [gmem_b, work_queue],
      proxy:   [smem_a, smem_b, work_queue],
      tmem_c:  [proxy, work_queue],
  }

  @schedule
  def sync_schedule(smem_a, smem_b, proxy) -> None:      # wait-only consumer
      with domain_loop(0, num_k_tiles, 1):
          smem_a.wait()
          smem_b.wait()
          proxy.acquire()
          proxy.signal_ready()
          proxy.commit()

  @schedule
  def mma_schedule(proxy, smem_a, smem_b, tmem_c) -> None:  # proxy consumer
      with domain_loop(0, num_k_tiles, 1):
          proxy.wait()
          desc_a = smem_a.build_desc()       # work, no direct wait
          desc_b = smem_b.build_desc()
          tmem_c.mma(desc_a=desc_a, desc_b=desc_b)
          smem_a.release()
          smem_b.release()
          proxy.release()
  ```

  Safety comes from transitivity in the dependency graph. The buffers' `release` must still appear in some task. A task that waits without releasing is a wait-only consumer; TS advances its pipeline state on the wait automatically. Set `consumer_wait_signaling_threads` when wait and release need different CTA signaling; it must differ from `consumer_signaling_threads`.

- Interleaving with `interleave_stride=4` over 8 stages (task declared with `num_warps=4`, so warps own lanes 0..3):

  ```python
  cfg = PipelineConfig.create_tma_umma_pipeline_cfg(
      num_stages=8,
      num_bytes=tile_bytes,
      producer_group=pipeline.CooperativeGroup(pipeline.Agent.Thread),
      consumer_group=pipeline.CooperativeGroup(pipeline.Agent.Thread),
      cta_layout_vmnk=cta_layout_vmnk,
      interleave_stride=4,        # 4 warps share the 8 stages (lanes 0..3)
  )
  ```

- A per-role tuple interleaves only one side (`advance_on_wait` is required so the wait and release cursors can advance at different strides):

  ```python
  cfg = PipelineConfig.create_tma_async_pipeline_cfg(
      num_stages=8,
      num_bytes=tile_bytes,
      producer_group=pipeline.CooperativeGroup(pipeline.Agent.Thread),
      consumer_group=pipeline.CooperativeGroup(pipeline.Agent.Thread),
      cta_layout_vmnk=cta_layout_vmnk,
      advance_on_wait=True,
      interleave_stride=(1, 1, 4, 1),  # only consumer_wait is interleaved
  )
  ```

- Domain-lane interleaving assigns disjoint loop iterations to sibling tasks (abbreviated example with two four-warp softmax tasks, one for even tiles and one for odd tiles; `num_warps` must differ from the stride so TS can distinguish this mode):

  ```python
  NUM_LANES = 2

  scores_cfg = PipelineConfig.create_umma_async_pipeline_cfg(
      ...,
      interleave_stride=(1, 1, NUM_LANES, NUM_LANES),
  )
  probs_cfg = PipelineConfig.create_async_umma_pipeline_cfg(
      ...,
      interleave_stride=(NUM_LANES, NUM_LANES, 1, 1),
  )

  def make_softmax_task(lane, warp_idx):
      @schedule
      def softmax_lane(scores, probs):
          with domain_loop(lane, num_k_tiles, NUM_LANES):
              scores.wait()
              scores.compute_softmax()
              probs.acquire()
              probs.store()
              probs.commit()
              scores.release()

      return Task(
          src_resources=[scores],
          dst_resources=[probs],
          warp_idx=warp_idx,
          num_warps=4,  # differs from NUM_LANES: select domain-lane mode
          schedule=softmax_lane(scores, probs),
          name=f"SoftmaxLane{lane}",
      )

  softmax_even = make_softmax_task(lane=0, warp_idx=0)
  softmax_odd = make_softmax_task(lane=1, warp_idx=4)
  ```

- Leader-routed completion:

  ```python
  cfg = PipelineConfig.create_tma_async_pipeline_cfg(
      num_stages=...,
      num_bytes=total_bytes,                 # sum across all covered producers
      producer_group=...,
      consumer_group=...,
      cta_layout_vmnk=cta_layout_vmnk,       # must be inspectable (a tuple)
      producer_signaling_threads=SignalingThreads.TaskWarpLeader,
      num_bytes_per_warp_per_cta=bytes_one_warp_one_cta,
  )
  ```

  TS checks that `num_bytes` equals `num_bytes_per_warp_per_cta` scaled by the number of producing warps and CTAs in the cluster. It cannot check the bytes against the TMA instructions actually issued inside the work body.
- Each pattern is optional; reach for it only when the simpler shapes in the schedules page do not fit.
- Document version: CUTLASS v4.8.0 — [Scheduling Patterns](https://docs.nvidia.com/cutlass/latest/media/docs/pythonDSL/ts_general/ts_patterns.html) (source: [ts_patterns.rst](https://github.com/NVIDIA/cutlass/blob/v4.8.0/media/docs/pythonDSL/ts_general/ts_patterns.rst))

## Related

- [Task Scheduling: Schedules](./ts-schedules.md)
- [Task Scheduling: Pipelines](./ts-pipelines.md)
- [Task Scheduling: Validation](./ts-validation.md)
