# First-Run Onboarding

Show a tour once on the first visit, remember that it was seen, and give users a button to replay it.

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const SEEN_KEY = "onboarding-seen";

const tour = driver({
  showProgress: true,
  steps: [
    { element: "#projects", popover: { title: "Projects" } },
    { element: "#invite", popover: { title: "Invite" } },
    { element: "#replay-tour", popover: { title: "Replay" } },
  ],
  onDestroyed: () => localStorage.setItem(SEEN_KEY, "1"),
});

if (!localStorage.getItem(SEEN_KEY)) {
  tour.drive();
}

document
  .querySelector("#replay-tour")
  .addEventListener("click", () => tour.drive());
```

## Notes

- `onDestroyed` runs however the tour ends, so closing it early counts as seen too. To show it again until it is finished, save only when `reason` is `"done"` (`reason` since 1.10.0; see the finished-or-closed and track-tour-analytics samples)
- For signed-in users, save the flag on the user record instead, so it follows them to other devices
- Start the tour once the page has rendered; in React or Vue see the react-and-vue sample
- Source: https://driverjs.com/docs/first-run-onboarding (driver.js 1.14.0 docs source, apps/docs/src/content/guides/first-run-onboarding.mdx at tag 1.14.0).
