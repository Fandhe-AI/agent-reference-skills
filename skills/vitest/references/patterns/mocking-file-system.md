# Mocking the File System

Mocking the file system keeps tests independent of the real disk, avoids side effects from previous tests, and allows testing error conditions (permission issues, disk full, read/write errors).

## Signature / Usage

Vitest doesn't provide a file system mocking API out of the box. You can use `vi.mock` to mock the `fs` module manually, but it's hard to maintain. The recommended approach is `memfs`, which creates an in-memory file system.

To automatically redirect every `fs` call to `memfs`, create `__mocks__/fs.cjs` and `__mocks__/fs/promises.cjs` at the root of the project:

```ts
// __mocks__/fs.cjs
// we can also use `import`, but then
// every export should be explicitly defined

const { fs } = require('memfs')
module.exports = fs
```

```ts
// __mocks__/fs/promises.cjs
// we can also use `import`, but then
// every export should be explicitly defined

const { fs } = require('memfs')
module.exports = fs.promises
```

```ts
// read-hello-world.js
import { readFileSync } from 'node:fs'

export function readHelloWorld(path) {
  return readFileSync(path, 'utf-8')
}
```

```ts
// hello-world.test.js
import { beforeEach, expect, it, vi } from 'vitest'
import { fs, vol } from 'memfs'
import { readHelloWorld } from './read-hello-world.js'

// tell vitest to use fs mock from __mocks__ folder
// this can be done in a setup file if fs should always be mocked
vi.mock('node:fs')
vi.mock('node:fs/promises')

beforeEach(() => {
  // reset the state of in-memory fs
  vol.reset()
})

it('should return correct text', () => {
  const path = '/hello-world.txt'
  fs.writeFileSync(path, 'hello world')

  const text = readHelloWorld(path)
  expect(text).toBe('hello world')
})

it('can return a value multiple times', () => {
  // you can use vol.fromJSON to define several files
  vol.fromJSON(
    {
      './dir1/hw.txt': 'hello dir1',
      './dir2/hw.txt': 'hello dir2',
    },
    // default cwd
    '/tmp',
  )

  expect(readHelloWorld('/tmp/dir1/hw.txt')).toBe('hello dir1')
  expect(readHelloWorld('/tmp/dir2/hw.txt')).toBe('hello dir2')
})
```

## Notes

- Source: https://vitest.dev/guide/mocking/file-system (docs at tag `v5.0.5`).
- `memfs` is a third-party package (not part of Vitest).
- `vi.mock` must be at the top level of the file in Vitest 5.

## Related

- [Mocking Patterns](./mocking.md)
