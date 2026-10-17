---
source: https://react.dev/learn/react-developer-tools
---

# React Developer Tools

Use React Developer Tools to inspect React components, edit props and state, and identify performance problems.

## Signature / Usage

The easiest way to debug websites built with React is to install the React Developer Tools browser extension (Chrome, Firefox, Edge). On a website built with React you will see the Components and Profiler panels.

For other browsers (for example, Safari), install the `react-devtools` npm package:

```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

Next open the developer tools from the terminal:

```bash
react-devtools
```

Then connect your website by adding the following `<script>` tag to the beginning of your website's `<head>`:

```html
<html>
  <head>
    <script src="http://localhost:8097"></script>
```

Reload your website in the browser now to view it in developer tools.

## Notes

- Browser extension install pages: Chrome (`chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi`), Firefox (`addons.mozilla.org/en-US/firefox/addon/react-devtools/`), Edge (`microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil`).
- Mobile (React Native): to inspect apps built with React Native, use React Native DevTools, the built-in debugger that deeply integrates React Developer Tools. All features work identically to the browser extension, including native element highlighting and selection.
- For versions of React Native earlier than 0.76, use the standalone build of React DevTools by following the "Safari and other browsers" steps above.

## Related

- [React Performance tracks](./react-performance-tracks.md)
- [Profiler](../components/Profiler.md)
