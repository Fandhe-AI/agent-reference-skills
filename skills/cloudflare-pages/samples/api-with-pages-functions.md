---
source: https://developers.cloudflare.com/pages/tutorials/build-an-api-with-pages-functions/
---

# Build an API for your front end using Pages Functions

Serve a JSON blog API from `functions/api/` next to a React (Vite) front end that fetches it.

## Signature / Usage

Project layout (front end in `src/`, API in `functions/`):

```txt
blog-frontend/
├── functions/
│   └── api/
│       ├── posts.js
│       └── post/
│           ├── data.js
│           └── [id].js
└── src/
    ├── App.jsx
    └── components/
        ├── posts.jsx
        └── post.jsx
```

`functions/api/posts.js` serves `GET /api/posts`:

```js
import posts from "./post/data";

export function onRequestGet() {
	return Response.json(posts);
}
```

`functions/api/post/data.js` holds the content:

```js
const posts = [
	{
		id: 1,
		title: "My first blog post",
		text: "Hello world! This is my first blog post on my new Cloudflare Workers + Pages blog.",
		published_at: new Date("2020-10-23"),
	},
	{
		id: 2,
		title: "Updating my blog",
		text: "It's my second blog post! I'm still writing and publishing using Cloudflare Workers + Pages :)",
		published_at: new Date("2020-10-26"),
	},
];

export default posts;
```

Adapted (not in the official docs): file renamed from `[[id]].js` to `[id].js`; see Notes.

`functions/api/post/[id].js` serves `GET /api/post/:id`:

```js
import posts from "./data";

export function onRequestGet(context) {
	const id = context.params.id;

	if (!id) {
		return new Response("Not found", { status: 404 });
	}

	const post = posts.find((post) => post.id === Number(id));

	if (!post) {
		return new Response("Not found", { status: 404 });
	}

	return Response.json(post);
}
```

Adapted (not in the official docs): front-end files use `.jsx` because Vite does not parse JSX in `.js`; see Notes.

Front end, `src/App.jsx`:

```js
import { Routes, Route } from "react-router-dom";

import Posts from "./components/posts";
import Post from "./components/post";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Posts />} />
			<Route path="/posts/:id" element={<Post />} />
		</Routes>
	);
}

export default App;
```

`src/components/posts.jsx`:

```js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			const resp = await fetch("/api/posts");
			const postsResp = await resp.json();
			setPosts(postsResp);
		};

		getPosts();
	}, []);

	return (
		<div>
			<h1>Posts</h1>
			{posts.map((post) => (
				<div key={post.id}>
					<h2>
						<Link to={`/posts/${post.id}`}>{post.title}</Link>
					</h2>
				</div>
			))}
		</div>
	);
};

export default Posts;
```

`src/components/post.jsx`:

```js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Post = () => {
	const [post, setPost] = useState({});
	const { id } = useParams();

	useEffect(() => {
		const getPost = async () => {
			const resp = await fetch(`/api/post/${id}`);
			const postResp = await resp.json();
			setPost(postResp);
		};

		getPost();
	}, [id]);

	if (!Object.keys(post).length) return <div />;

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.text}</p>
			<p>
				<em>Published {new Date(post.published_at).toLocaleString()}</em>
			</p>
			<p>
				<Link to="/">Go back</Link>
			</p>
		</div>
	);
};

export default Post;
```

Adapted (not in the official docs): deploys the Vite output directory `dist`, not the project directory; see Notes.

Create the project and deploy:

```sh
npx create-vite -t react blog-frontend
cd blog-frontend
npm install
npm i react-router-dom@6
npm run build
npx wrangler pages deploy dist
```

## Notes

- For new projects Cloudflare recommends Workers (cloudflare-workers skill, static assets); this sample targets an existing Pages project.
- Corrected from the official docs: the page names the dynamic route `[[id]].js`, which is a catch-all whose `context.params.id` is an array; `[id].js` matches one segment and gives a string. Files are `.jsx` because Vite does not parse JSX in `.js`, and the deploy directory is `dist` (the page says `wrangler pages deploy blog-frontend` and build directory `build`, which does not match the Vite output).
- Wrap `<App />` in a `BrowserRouter` in `src/main.jsx`; the official page does not show that file.
- `Response.json(posts)` serializes the `Date` values as ISO strings, so `new Date(post.published_at)` works in the client.
- In Git-integration builds set the build command to `npm run build` and the output directory to `dist`.

## Related

- [../references/functions/routing.md](../references/functions/routing.md)
- [../references/functions/event-context.md](../references/functions/event-context.md)
- [../references/platform-howto/get-started-direct-upload.md](../references/platform-howto/get-started-direct-upload.md)
