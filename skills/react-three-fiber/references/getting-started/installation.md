---
source: https://r3f.docs.pmnd.rs/getting-started/installation
---

# Installation (Vite.js / Next.js / Without build tools)

Install `three` and `@react-three/fiber`; some frameworks require particular attention.

## Signature / Usage

```bash
npm install three @react-three/fiber
```

> [!WARNING]
> Fiber is compatible with React v18 and v19 and works with ReactDOM and React Native. Fiber is a React renderer, it must pair with a major version of React, just like react-dom, react-native, etc. @react-three/fiber@8 pairs with react@18, @react-three/fiber@9 pairs with react@19.

### Vite.js

`vite` will also work out of the box.

```bash
# Create app
npm create vite my-app

# Select react as framework

# Install dependencies
cd my-app
npm install three @react-three/fiber

# Start development server
npm run dev
```

### Next.js

It should work out of the box but you will encounter untranspiled add-ons in the three.js ecosystem, in that case,

#### Next.js 13.1 or latest version

You need to add three to `transpilePackages` property in `next.config.js`:

```js
transpilePackages: ['three'],
```

#### Next.js 13.0 or oldest version

You can install the `next-transpile-modules` module:

```bash
npm install next-transpile-modules --save-dev
```

then, add this to your `next.config.js`

```js
const withTM = require('next-transpile-modules')(['three'])
module.exports = withTM()
```

An official next.js starter exists: `pmndrs/react-three-next`.

### Without build tools

You can use React Three Fiber with browser-ready ES Modules from esm.sh and a JSX-like syntax powered by htm.

```jsx
import ReactDOM from 'https://esm.sh/react-dom'
import React, { useRef, useState } from 'https://esm.sh/react'
import { Canvas, useFrame } from 'https://esm.sh/@react-three/fiber'
import htm from 'https://esm.sh/htm'

const html = htm.bind(React.createElement)
ReactDOM.render(html`<${Canvas}>...<//>`, document.getElementById('root'))
```

Full example:

```jsx
import ReactDOM from 'https://esm.sh/react-dom'
import React, { useRef, useState } from 'https://esm.sh/react'
import { Canvas, useFrame } from 'https://esm.sh/@react-three/fiber'
import htm from 'https://esm.sh/htm'

const html = htm.bind(React.createElement)

function Box(props) {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame(() => (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01))
  return html` <mesh
    ...${props}
    ref=${meshRef}
    scale=${active ? 1.5 : 1}
    onClick=${() => setActive(!active)}
    onPointerOver=${() => setHover(true)}
    onPointerOut=${() => setHover(false)}
  >
    <boxGeometry args=${[1, 1, 1]} />
    <meshStandardMaterial color=${hovered ? 'hotpink' : 'orange'} />
  </mesh>`
}

ReactDOM.render(
  html` <${Canvas}>
    <ambientLight />
    <pointLight position=${[10, 10, 10]} />
    <${Box} position=${[-1.2, 0, 0]} />
    <${Box} position=${[1.2, 0, 0]} />
  <//>`,
  document.getElementById('root'),
)
```

## Notes

- The docs list guides for Vite.js, Next.js, CDN without build tools, and React Native (see the React Native page).
- Next.js 13.0 and older needs `next-transpile-modules`; 13.1+ uses `transpilePackages: ['three']`.

## Related

- [React Native](./react-native.md)
- [Introduction](./introduction.md)
- [v9 Migration Guide](./v9-migration-guide.md)
