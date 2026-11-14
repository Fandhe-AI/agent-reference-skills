# samples

| Name | Description | Path |
|------|-------------|------|
| Advance on Click and Wait for Element | Advance the tour by clicking the highlighted element, then wait for the next step's element that renders on demand. | [advance-on-click-wait.md](./advance-on-click-wait.md) |
| Announce a Feature | Point out a new feature once with a highlight, or leave a hint beacon that stays dismissed. | [announce-a-feature.md](./announce-a-feature.md) |
| Async Tour | Perform async operations between tour steps by overriding the next-click hook and manually advancing navigation. | [async-tour.md](./async-tour.md) |
| Basic Tour | Start a multi-step guided tour that walks users through page elements sequentially. | [basic-tour.md](./basic-tour.md) |
| Confirm on Exit | Intercept tour exit to show a confirmation dialog only when the user leaves before finishing the tour. | [confirm-on-exit.md](./confirm-on-exit.md) |
| Custom Buttons | Add Skip and Restart buttons from any step, and rename or translate the built-in buttons. | [custom-buttons.md](./custom-buttons.md) |
| Custom Popover Buttons | Add a custom button to the popover footer using the `onPopoverRender` hook. | [custom-popover-buttons.md](./custom-popover-buttons.md) |
| Custom Theme | Apply a custom visual theme to popovers using `popoverClass` and CSS targeting Driver.js class names. | [custom-theme.md](./custom-theme.md) |
| Feature Hints | Show pulsing hint beacons that open a popover on click, and keep dismissals across reloads with localStorage. | [feature-hints.md](./feature-hints.md) |
| Finished or Closed | Tell a finished tour apart from one that was closed early using the `reason` passed to `onDestroyed`. | [finished-or-closed.md](./finished-or-closed.md) |
| First-Run Onboarding | Show a tour once on the first visit, remember it was seen, and offer a replay button. | [first-run-onboarding.md](./first-run-onboarding.md) |
| Match Your Brand | Theme tours with a popover class, CSS variables, arrow colours and an overlay colour. | [match-your-brand.md](./match-your-brand.md) |
| Multi-Page Tour | Save progress before navigating away, then resume the tour on the next page with `drive(index)`. | [multi-page-tour.md](./multi-page-tour.md) |
| Onboarding Checklist | Show a "Get started" checklist whose items start a tour, run code or follow a link, with progress saved to localStorage. | [onboarding-checklist.md](./onboarding-checklist.md) |
| React and Vue | Set up and clean up a tour in React, Vue and Next.js. | [react-and-vue.md](./react-and-vue.md) |
| Resume a Tour | Save the step the user left on with `onDestroyed` and resume from it with `drive(index)`. | [resume-a-tour.md](./resume-a-tour.md) |
| Right-Click and Double-Click Steps | Accept only a context-menu or double-click gesture with `advanceOn` and `strict: true`. | [right-click-and-double-click.md](./right-click-and-double-click.md) |
| Single Element Highlight | Draw attention to one element with a popover, without launching a full tour. | [single-element-highlight.md](./single-element-highlight.md) |
| Skip Missing Element | Skip steps whose target element is not on the page instead of showing the centered fallback popover. | [skip-missing-element.md](./skip-missing-element.md) |
| Start From a Help Menu | Start the tour at the step that explains the current screen using step `data` and `drive(index)`. | [start-from-a-help-menu.md](./start-from-a-help-menu.md) |
| Steps Inside a Dialog | Run steps inside a modal dialog, wait for it to open and return to the page when it closes. | [steps-inside-a-dialog.md](./steps-inside-a-dialog.md) |
| Teach a Form | Explain fields on focus with `highlight()`, or advance only when a field is valid with `advanceOn` and `when`. | [teach-a-form.md](./teach-a-form.md) |
| Track Tour Analytics | Report step views and the end `reason` to an analytics tool. | [track-tour-analytics.md](./track-tour-analytics.md) |
| Wait for a Save | Hold a step until your app finishes a request with `advance()`, or load data in `onNextClick`. | [wait-for-a-save.md](./wait-for-a-save.md) |
| Walk Through a Menu | Open a dropdown and pick an item with `allowedElements`, recovering via `onElementMissing`. | [walk-through-a-menu.md](./walk-through-a-menu.md) |
