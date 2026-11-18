---
source: https://docs.cloud.google.com/workflows/docs/reference/syntax/parallel-steps
---

# Parallel steps in Workflows

A `parallel` step defines a part of a workflow where two or more steps (branches) or loop iterations can run concurrently. The step waits until everything inside it has completed or been interrupted by an unhandled exception, then execution continues. Branches and iterations can run in any order, and the order can differ between executions.

## Signature / Usage

### Syntax

```text
  - PARALLEL_STEP_NAME:
      parallel:
        exception_policy: POLICY
        shared: [VARIABLE_A, VARIABLE_B, ...]
        concurrency_limit: CONCURRENCY_LIMIT
        BRANCHES_OR_FOR:
          ...
```

### Parallel branches

A branch is a named set of steps that run sequentially; branches run concurrently.

```text
  - PARALLEL_STEP_NAME:
      parallel:
          ...
          branches:
            - BRANCH_NAME_A:
                steps:
                    ...
            - BRANCH_NAME_B:
                steps:
                    ...
```

The `user` and `notification` variables are shared so branches can update them and later steps can read them:

```yaml
main:
  params: [args]
  steps:
    - init:
        assign:
          - user: {}
          - notification: {}
    - parallelStep:
        parallel:
          shared: [user, notification]
          branches:
            - getUser:
                steps:
                  - getUserCall:
                      call: http.get
                      args:
                        url: ${"https://example.com/users/" + args.userId}
                      result: user
            - getNotification:
                steps:
                  - getNotificationCall:
                      call: http.get
                      args:
                        url: ${"https://example.com/notification/" + args.notificationId}
                      result: notification
```

### Parallel iteration

Nest a `for` block in a `parallel` step to run iterations concurrently (nondeterministically, up to the concurrency limit).

```text
  - PARALLEL_ITERATION_STEP_NAME:
      parallel:
        ...
        for:
          value: LOOP_VARIABLE_NAME
          ...
          steps:
            - STEP_NAME_A:
            ...
```

Sum comment counts across posts; `total` is shared:

Adapted (not in the official docs): adds `numComments.body` instead of `numComments`, because `result` stores the whole HTTP response (`body`, `code`, `headers`); the sample assumes the endpoint returns the count as its body.

```yaml
main:
  params: [args]
  steps:
    - init:
        assign:
          - total: 0
    - countComments:
        parallel:
          shared: [total]    # allows child branch to write to this variable
          for:
            value: postId
            in: ${args.posts}
            steps:
              - getPostCommentCount:
                  call: http.get
                  args:
                    url: ${"https://example.com/postComments/" + postId}
                  result: numComments
              - add:
                  assign:
                    - total: ${total + numComments.body}
    - done:
        return: ${total}
```

### Concurrency limit example

Three iterations of `parent` exist, only two are active at a time.

Adapted (not in the official docs): the `url` values `www.foo.com` and `www.bar.com` are not absolute URLs, so `http.get` fails; they are replaced with `https://www.example.com/foo` and `https://www.example.com/bar`.

```yaml
  - parent:
      parallel:
        concurrency_limit: 2
        for:
          range: [1, 3]
          value: i
          steps:
            - parentHttpCall:
                call: http.get
                args:
                  url: "https://www.example.com/foo"
            - nestedChild:
                parallel:
                  concurrency_limit: 4
                  for:
                    range: [1, 5]
                    value: j
                    steps:
                      - childHttpCall:
                          call: http.get
                          args:
                            url: "https://www.example.com/bar"
```

### Catch an unhandled parallel exception

Adapted (not in the official docs): after logging, the `except` block re-raises the error (`raise: ${e}`) instead of returning it, so the execution does not end as successful with the error map as its result.

```yaml
- catchErrors:
    try:
      steps:
        - failOdd:
            parallel:
              for:
                value: num
                range: [0, 5]
                steps:
                  - checkEven:
                      switch:
                        - condition: ${num % 2 != 0}
                          raise: "how odd!"
    except:
      as: e
      steps:
        - log:
            call: sys.log
            args:
              data: ${e}
        - raiseError:
            raise: ${e}
```

`UnhandledBranchError` exception map:

```json
{
  "branches": [
    {
      "id": "1",
      "error": {
        "context": "RuntimeError: \"branch error\"\nin step \"step1\", routine \"main\", line: 9",
        "payload": {
          "message": "ZeroDivisionError: division by zero",
          "tags": [
            "ZeroDivisionError",
            "ArithmeticError"
          ]
        }
      }
    }
  ],
  "message": "UnhandledBranchError: One or more branches or iterations encountered an unhandled runtime error",
  "tags": [
    "UnhandledBranchError",
    "RuntimeError"
  ],
  "truncated": false
}
```

## Options / Props

### `parallel` fields

| Field | Description |
|-------|-------------|
| `exception_policy` | Optional. Action other branches take on an unhandled exception. Default and only supported policy: `continueAll` (no further action; all other branches attempt to run) |
| `shared` | List of writable variables with parent scope that may be assigned inside the parallel step |
| `concurrency_limit` | Optional. Positive integer (literal or expression): maximum branches and iterations running concurrently within a single workflow execution before further ones are queued. Applies to this `parallel` step only and does not cascade |
| `branches` or `for` | One of: concurrently running branches, or a loop whose iterations run concurrently |

### Limits and rules

| Item | Value |
|------|-------|
| Branches per parallel step | 2-10 (see https://docs.cloud.google.com/workflows/quotas) |
| Nesting | Nested parallel steps allowed up to the depth limit (https://docs.cloud.google.com/workflows/docs/reference/syntax/parallel/quotas) |
| Global concurrency | Maximum concurrency quota (https://docs.cloud.google.com/workflows/quotas#parallel_steps); cannot be changed, only lowered per step with `concurrency_limit` |
| Truncation of exception payloads | If a child's error payload would push the parent scope over 90% of remaining memory capacity, that error is truncated (`error:null`, `truncated:true`); all branch IDs with an error (up to the maximum number of unhandled exceptions) are still listed |

## Notes

- Parent-scope variables are read-only inside branches and iterations unless listed in `shared`; assigning a non-shared parent variable is a deployment error. Do not mark read-only variables `shared`, to optimize performance.
- Assignments in parallel steps are atomic; shared writes are seen immediately by other branches. Do not rely on evaluation order.
- Variables assigned only inside a branch or iteration are local to it; in `for` loops a local variable is unique per iteration and cannot accumulate values between iterations.
- The variable memory limit applies independently to each branch and must not be exceeded counting parent and local scopes.
- To write a shared variable in a nested `parallel` step, mark it `shared` in both the parent and the child parallel steps.
- The loop variable name must not be used outside its loop; the same name may be reused in non-nested loops.
- A parent waiting for its children is not active and does not count toward its `concurrency_limit`; a child's limit is independent of its parent's.
- Jumps are possible only within the same branch or loop; use `next: continue` to exit an iteration or branch early. `return` is not allowed inside a branch or loop step; return values through a shared variable.
- An unhandled exception in a branch terminates that branch; in a parallel `for` it terminates the single iteration. `UnhandledBranchError` (tags `UnhandledBranchError`, `RuntimeError`) can be caught; failed branches or iterations are listed in `branches` in chronological order, and branch execution order is not guaranteed.
- Shared variables set before a branch exception remain visible to other branches.
- Cloud Run functions (2nd gen) can use concurrency through the underlying Cloud Run service; in a parallel `for`, setting concurrency lets one instance process several items (https://docs.cloud.google.com/run/docs/about-concurrency).
- The source also shows the JSON form of every example, a nested parallel example with its exception output, a shared-variables and scopes example, and diagrams; they are omitted here.
- Corrected from the official docs: the parallel-iteration sample assigned `total: ${total + numComments}`, adding the whole HTTP response map; the HTTP response data is read from `body` (https://docs.cloud.google.com/workflows/docs/http-requests).
- Adapted from the official docs: the concurrency-limit sample used `url: "www.foo.com"` and `url: "www.bar.com"`, which have no scheme; `http.get` needs an absolute URL, so they are `https://www.example.com/foo` and `https://www.example.com/bar` here.
- Corrected from the official docs: the unhandled-exception sample ended with `- returnError: return: ${e}`, which completes the execution successfully; it now re-raises with `raise: ${e}`.
- Source: https://docs.cloud.google.com/workflows/docs/reference/syntax/parallel-steps (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [catching-errors.md](./catching-errors.md)
- [retrying.md](./retrying.md)
- Execute workflow steps in parallel: https://docs.cloud.google.com/workflows/docs/execute-parallel-steps
- Tutorial, parallel BigQuery jobs: https://docs.cloud.google.com/workflows/docs/tutorials/bigquery-parallel-jobs
