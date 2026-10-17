---
source: https://v2.tauri.app/develop/tests/webdriver/ci/
---

# Continuous Integration (WebDriver)

Run WebDriver tests with `tauri-driver` on CI. The example uses the WebdriverIO example app and GitHub Actions. On Linux the tests run on a fake display; some CI systems such as GitHub Actions also support running WebDriver tests on Windows.

## Signature / Usage

Assumptions: the Tauri application is in the `src-tauri` folder; the WebDriverIO test runner is in the `e2e-tests` directory and runs when `yarn test` is used there.

`.github/workflows/webdriver.yml`

```yaml
# run this action when the repository is pushed to
on: [push]

# the name of our workflow
name: WebDriver

# least-privilege token: only checkout needs read access
permissions:
  contents: read

jobs:
  # a single job named test
  test:
    # the display name of the test job
    name: WebDriverIO Test Runner

    # run on the matrix platform
    runs-on: ${{ matrix.platform }}
    strategy:
      # do not fail other matrix runs if one fails
      fail-fast: false
      # set all platforms our test should run on
      matrix:
        platform: [ubuntu-latest, windows-latest]

    # the steps our job runs **in order**
    steps:
      # checkout the code on the workflow runner
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4

      # install system dependencies that Tauri needs to compile on Linux.
      # note the extra dependencies for `tauri-driver` to run which are: `webkit2gtk-driver` and `xvfb`
      - name: Tauri dependencies
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update &&
          sudo apt-get install -y \
          libwebkit2gtk-4.1-dev \
          libayatana-appindicator3-dev \
          webkit2gtk-driver \
          xvfb

      # install a matching Microsoft Edge Driver version using msedgedriver-tool
      - name: install msdgedriver (Windows)
        if: matrix.platform == 'windows-latest'
        run: |
          cargo install --git https://github.com/chippers/msedgedriver-tool
          & "$HOME/.cargo/bin/msedgedriver-tool.exe"
          $PWD.Path >> $env:GITHUB_PATH

      # install latest stable Rust release
      - name: Setup rust-toolchain stable
        uses: dtolnay/rust-toolchain@b725eda525362e7cf34af9a7243cac1e3f01a7ec # stable

      # setup caching for the Rust target folder
      - name: Setup Rust cache
        uses: Swatinem/rust-cache@6323deb102c322ba6fcbdcafc7e3dddab59af2b6 # v2
        with:
          workspaces: src-tauri

      # we run our Rust tests before the webdriver tests to avoid testing a broken application
      - name: Cargo test
        run: cargo test
        working-directory: src-tauri

      # install the latest stable node version at the time of writing
      - name: Node 24
        uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4
        with:
          node-version: 24
          cache: 'yarn'

      # install the application Node.js dependencies with Yarn
      - name: Yarn install
        run: yarn install --frozen-lockfile

      # install the e2e-tests Node.js dependencies with Yarn
      - name: Yarn install
        run: yarn install --frozen-lockfile
        working-directory: e2e-tests

      # install the latest version of `tauri-driver`.
      # note: the tauri-driver version is independent of any other Tauri versions
      - name: Install tauri-driver
        run: cargo install tauri-driver --locked

      # run the WebdriverIO test suite on Linux.
      # we run it through `xvfb-run` (the dependency we installed earlier) to have a fake
      # display server which allows our application to run headless without any changes to the code
      - name: WebdriverIO (Linux)
        if: matrix.platform == 'ubuntu-latest'
        run: xvfb-run yarn test
        working-directory: e2e-tests

      # run the WebdriverIO test suite on Windows.
      # in this case we can run the tests directly.
      - name: WebdriverIO (Windows)
        if: matrix.platform == 'windows-latest'
        run: yarn test
        working-directory: e2e-tests
```

## Notes

- The `tauri-driver` version is independent of other Tauri versions.
- Actions pinned to commit SHAs (upstream uses the tags `v4` / `v2` / `stable`); SHAs resolved from the GitHub API on 2026-10-17, re-resolve when updating.
- `permissions: contents: read` was added to the upstream workflow so the `GITHUB_TOKEN` is least-privilege (only checkout needs read access).
- Upstream runs `cargo test` at the repository root; `working-directory: src-tauri` added to match the stated assumption that the app lives in `src-tauri`.
- Tauri uses WebDriver via `tauri-driver`. This is not Playwright; see the playwright skill for Playwright. GitHub Actions itself is covered by the github-docs skill.

## Related

- [WebDriver](./webdriver-overview.md)
- [WebDriver Manual Setup](./webdriver-manual-setup.md)
