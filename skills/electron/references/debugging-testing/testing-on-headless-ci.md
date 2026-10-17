---
source: https://www.electronjs.org/docs/latest/tutorial/testing-on-headless-ci
---

# Testing on Headless CI Systems

Electron, being based on Chromium, requires a display driver; if none is found it fails to launch and no tests run. On headless CI use a virtual display driver (Xvfb).

## Signature / Usage

Install Xvfb (a virtual framebuffer implementing the X11 display server protocol), create a virtual screen and export `DISPLAY`; Chromium in Electron looks for `$DISPLAY` automatically. `xvfb-maybe` automates this:

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

## Notes

- `xvfb-maybe` (github.com/anaisbetts/xvfb-maybe) configures Xvfb only if required by the current system; on Windows or macOS it does nothing.
- Travis CI: see its docs on using Xvfb. Jenkins: a Xvfb plugin is available.
- CircleCI has Xvfb and `$DISPLAY` already set up; AppVeyor runs on Windows and supports Electron out of the box. No configuration is required for either.
- Distance: for end-to-end test frameworks that drive Electron, see Automated Testing; the playwright and vitest skills cover those tools themselves.

## Related

- [Automated Testing](./automated-testing.md)
