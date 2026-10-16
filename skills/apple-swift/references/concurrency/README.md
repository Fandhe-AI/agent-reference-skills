# Concurrency

| Name | Description | Path |
|------|-------------|------|
| Actor | Common protocol to which all actors conform. | [actor.md](./actor.md) |
| AsyncSequence | A type that provides asynchronous, sequential, … | [asyncsequence.md](./asyncsequence.md) |
| AsyncStream | An asynchronous sequence generated from a closure … | [asyncstream.md](./asyncstream.md) |
| AsyncThrowingStream | An asynchronous sequence generated from an error-… | [asyncthrowingstream.md](./asyncthrowingstream.md) |
| CheckedContinuation | A mechanism to interface between synchronous and… | [checkedcontinuation.md](./checkedcontinuation.md) |
| Clock | A mechanism to measure time and delay work until… | [clock.md](./clock.md) |
| Continuation | A mechanism to interface between synchronous and… | [continuation.md](./continuation.md) |
| ContinuousClock | A clock that measures time that always increments… | [continuousclock.md](./continuousclock.md) |
| DiscardingTaskGroup | A discarding group that contains dynamically… | [discardingtaskgroup.md](./discardingtaskgroup.md) |
| Duration | A representation of high precision time, expressed… | [duration.md](./duration.md) |
| Executor | A service that can execute jobs. | [executor.md](./executor.md) |
| ExecutorJob | A unit of schedulable work. | [executorjob.md](./executorjob.md) |
| GlobalActor | A type that represents a globally-unique actor… | [globalactor.md](./globalactor.md) |
| globalConcurrentExecutor | The global concurrent executor used by default for… | [globalconcurrentexecutor.md](./globalconcurrentexecutor.md) |
| InstantProtocol | A protocol that represents an instant in time… | [instantprotocol.md](./instantprotocol.md) |
| JobPriority | The priority of this job. | [jobpriority.md](./jobpriority.md) |
| MainActor | A singleton actor whose executor is equivalent… | [mainactor.md](./mainactor.md) |
| Sendable | A thread-safe type whose values can be shared… | [sendable.md](./sendable.md) |
| SerialExecutor | A service that executes jobs. | [serialexecutor.md](./serialexecutor.md) |
| SuspendingClock | A clock that measures time that always… | [suspendingclock.md](./suspendingclock.md) |
| Task | A unit of asynchronous work. | [task.md](./task.md) |
| TaskExecutor | An executor that may be used as the preferred… | [taskexecutor.md](./taskexecutor.md) |
| TaskGroup | A group that contains dynamically created… | [taskgroup.md](./taskgroup.md) |
| TaskLocal | Wrapper type that defines a task-local value key. | [tasklocal.md](./tasklocal.md) |
| TaskPriority | The priority of a task. | [taskpriority.md](./taskpriority.md) |
| ThrowingDiscardingTaskGroup | A throwing discarding group that contains… | [throwingdiscardingtaskgroup.md](./throwingdiscardingtaskgroup.md) |
| ThrowingTaskGroup | A group that contains throwing, dynamically… | [throwingtaskgroup.md](./throwingtaskgroup.md) |
| UnownedJob | A unit of schedulable work. | [unownedjob.md](./unownedjob.md) |
| UnownedSerialExecutor | An unowned reference to a serial executor… | [unownedserialexecutor.md](./unownedserialexecutor.md) |
| UnownedTaskExecutor | An unowned reference to a task executor… | [unownedtaskexecutor.md](./unownedtaskexecutor.md) |
| UnsafeContinuation | A mechanism to interface between synchronous and… | [unsafecontinuation.md](./unsafecontinuation.md) |
| UnsafeCurrentTask / withUnsafeCurrentTask(body:) | An unsafe reference to the current task. | [unsafecurrenttask.md](./unsafecurrenttask.md) |
| withCheckedContinuation / withCheckedThrowingContinuation | Functions that suspend the current task and… | [withcheckedcontinuation.md](./withcheckedcontinuation.md) |
| withContinuation(of:_:) / withContinuation(of:throwing:_:) | Invokes the passed in closure with a non-copyable… | [withcontinuation.md](./withcontinuation.md) |
| withDiscardingTaskGroup(returning:isolation:body:) | Starts a new scope that can contain a dynamic… | [withdiscardingtaskgroup.md](./withdiscardingtaskgroup.md) |
| withTaskExecutorPreference(_:isolation:operation:) | Configure the current task hierarchy's task… | [withtaskexecutorpreference.md](./withtaskexecutorpreference.md) |
| withTaskGroup(of:returning:isolation:body:) | Starts a new scope that can contain a dynamic… | [withtaskgroup.md](./withtaskgroup.md) |
| withThrowingDiscardingTaskGroup(returning:isolation:body:) | Starts a new scope that can contain a dynamic… | [withthrowingdiscardingtaskgroup.md](./withthrowingdiscardingtaskgroup.md) |
| withThrowingTaskGroup(of:returning:isolation:body:) | Starts a new scope that can contain a dynamic… | [withthrowingtaskgroup.md](./withthrowingtaskgroup.md) |
| withUnsafeContinuation / withUnsafeThrowingContinuation | Invokes the passed in closure with an unsafe… | [withunsafecontinuation.md](./withunsafecontinuation.md) |
