# Concurrency

| Name | Description | Path |
|------|-------------|------|
| Actor | Common protocol to which all actors conform. | [actor.md](./actor.md) |
| AsyncSequence | A type that provides asynchronous, sequential, iterated access to its elements. | [asyncsequence.md](./asyncsequence.md) |
| AsyncStream | An asynchronous sequence generated from a closure that calls a continuation to produce new elements. | [asyncstream.md](./asyncstream.md) |
| AsyncThrowingStream | An asynchronous sequence generated from an error-throwing closure that calls a continuation to produce new elements. | [asyncthrowingstream.md](./asyncthrowingstream.md) |
| CheckedContinuation | A mechanism to interface between synchronous and asynchronous code, logging correctness violations. | [checkedcontinuation.md](./checkedcontinuation.md) |
| Clock | A mechanism to measure time and delay work until a given point in time. | [clock.md](./clock.md) |
| ContinuousClock | A clock that measures time that always increments and does not stop incrementing while the system is asleep. | [continuousclock.md](./continuousclock.md) |
| DiscardingTaskGroup | A discarding group that contains dynamically created child tasks. | [discardingtaskgroup.md](./discardingtaskgroup.md) |
| Duration | A representation of high precision time, expressed as an elapsed time value in integral form. | [duration.md](./duration.md) |
| GlobalActor | A type that represents a globally-unique actor used to isolate declarations anywhere in the program. | [globalactor.md](./globalactor.md) |
| InstantProtocol | A protocol that represents an instant in time, used for measuring durations relative to a Clock. | [instantprotocol.md](./instantprotocol.md) |
| MainActor | A singleton actor whose executor is equivalent to the main dispatch queue. | [mainactor.md](./mainactor.md) |
| Sendable | A thread-safe type whose values can be shared across arbitrary concurrent contexts without introducing a risk of data races. | [sendable.md](./sendable.md) |
| SuspendingClock | A clock that measures time that always increments but stops incrementing while the system is asleep. | [suspendingclock.md](./suspendingclock.md) |
| Task | A unit of asynchronous work. | [task.md](./task.md) |
| TaskExecutor | An executor that may be used as the preferred executor by a task. | [taskexecutor.md](./taskexecutor.md) |
| TaskGroup | A group that contains dynamically created child tasks. | [taskgroup.md](./taskgroup.md) |
| TaskLocal | Wrapper type that defines a task-local value key. | [tasklocal.md](./tasklocal.md) |
| TaskPriority | The priority of a task. | [taskpriority.md](./taskpriority.md) |
| ThrowingTaskGroup | A group that contains throwing, dynamically created child tasks. | [throwingtaskgroup.md](./throwingtaskgroup.md) |
| withCheckedContinuation / withCheckedThrowingContinuation | Functions that suspend the current task and bridge to synchronous callback-based code with runtime correctness checks. | [withcheckedcontinuation.md](./withcheckedcontinuation.md) |
| withDiscardingTaskGroup(returning:isolation:body:) | Starts a new scope that can contain a dynamic number of child tasks whose results are discarded as they complete. | [withdiscardingtaskgroup.md](./withdiscardingtaskgroup.md) |
| withThrowingDiscardingTaskGroup(returning:isolation:body:) | Starts a new scope that can contain a dynamic number of throwing child tasks whose results are discarded as they complete. | [withthrowingdiscardingtaskgroup.md](./withthrowingdiscardingtaskgroup.md) |
| withThrowingTaskGroup(of:returning:isolation:body:) | Starts a new scope that can contain a dynamic number of throwing child tasks. | [withthrowingtaskgroup.md](./withthrowingtaskgroup.md) |
| withTaskGroup(of:returning:isolation:body:) | Starts a new scope that can contain a dynamic number of child tasks. | [withtaskgroup.md](./withtaskgroup.md) |
