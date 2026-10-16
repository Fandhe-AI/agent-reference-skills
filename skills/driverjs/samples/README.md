# samples

| Name | Description | Path |
|------|-------------|------|
| Advance on Click and Wait for Element | Advance the tour by clicking the highlighted element, then wait for the next step's element that renders on demand. | [advance-on-click-wait.md](./advance-on-click-wait.md) |
| Async Tour | Perform async operations between tour steps by overriding the next-click hook and manually advancing navigation. | [async-tour.md](./async-tour.md) |
| Basic Tour | Start a multi-step guided tour that walks users through page elements sequentially. | [basic-tour.md](./basic-tour.md) |
| Confirm on Exit | Intercept tour exit to show a confirmation dialog only when the user leaves before finishing the tour. | [confirm-on-exit.md](./confirm-on-exit.md) |
| Custom Popover Buttons | Add a custom button to the popover footer using the `onPopoverRender` hook. | [custom-popover-buttons.md](./custom-popover-buttons.md) |
| Custom Theme | Apply a custom visual theme to popovers using `popoverClass` and CSS targeting Driver.js class names. | [custom-theme.md](./custom-theme.md) |
| Feature Hints | Show pulsing hint beacons that open a popover on click, and keep dismissals across reloads with localStorage. | [feature-hints.md](./feature-hints.md) |
| Finished or Closed | Tell a finished tour apart from one that was closed early using the `reason` passed to `onDestroyed`. | [finished-or-closed.md](./finished-or-closed.md) |
| Multi-Page Tour | Save progress before navigating away, then resume the tour on the next page with `drive(index)`. | [multi-page-tour.md](./multi-page-tour.md) |
| Onboarding Checklist | Show a "Get started" checklist whose items start a tour, run code or follow a link, with progress saved to localStorage. | [onboarding-checklist.md](./onboarding-checklist.md) |
| Single Element Highlight | Draw attention to one element with a popover, without launching a full tour. | [single-element-highlight.md](./single-element-highlight.md) |
| Skip Missing Element | Skip steps whose target element is not on the page instead of showing the centered fallback popover. | [skip-missing-element.md](./skip-missing-element.md) |
