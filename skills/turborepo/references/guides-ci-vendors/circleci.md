# CircleCI

## Usage

Example `.circleci/config.yml` (pnpm):

```yaml
version: 2.1
orbs:
  node: circleci/node@5.0.2
workflows:
  test:
    jobs:
      - test
jobs:
  test:
    docker:
      - image: cimg/node:lts
    steps:
      - checkout
      - node/install-packages
      - run:
          command: npm i -g pnpm
          environment:
            TURBO_UI: "false"
      - run:
          command: pnpm build
          environment:
            TURBO_UI: "false"
      - run:
          command: pnpm test
          environment:
            TURBO_UI: "false"
```

## Notes

- CircleCI uses a TTY, so `TURBO_UI: "false"` is required on every `run` step.
- Configure Remote Cache by registering `TURBO_TOKEN` and `TURBO_TEAM` under the CircleCI project's "Environment Variables" tab. Environment variables are loaded automatically, so no CI file changes are needed.
