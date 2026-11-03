---
source: https://developers.cloudflare.com/pages/tutorials/build-a-blog-using-nuxt-and-sanity/
---

# Build a blog using Nuxt.js and Sanity.io on Cloudflare Pages

Render a statically generated Nuxt 2 blog from a Sanity dataset and rebuild it with a Pages deploy hook when content changes.

## Signature / Usage

Legacy stack: this tutorial uses Nuxt 2 / Vue 2 (`asyncData`, `buildModules`, `@nuxtjs/sanity`). For current Nuxt see the Nuxt framework guide in this skill.

Set up Sanity, then the Nuxt project:

```sh
npx sanity init
cd my-sanity-project
npx sanity start
npx sanity deploy
```

```sh
npm i @nuxtjs/sanity @sanity/client
cp ../my-sanity-project/sanity.json .
npm i sanity-blocks-vue-component
```

Adapted (not in the official docs): the official `nuxt.config.js` fragments are not valid JavaScript (an array followed by `;` inside an object); shown here as one config object.

`nuxt.config.js`:

```js
export default {
	buildModules: ["@nuxtjs/sanity"],
	plugins: ["@/plugins/sanity-blocks.js"],
};
```

`plugins/sanity-blocks.js`:

```js
import Vue from "vue";
import BlockContent from "sanity-blocks-vue-component";
Vue.component("block-content", BlockContent);
```

`pages/index.vue`:

```html
<template>
	<div class="container">
		<div>
			<h1 class="title">My Blog</h1>
		</div>
		<div class="posts">
			<div v-for="post in posts" :key="post._id">
				<h2><a v-bind:href="post.slug.current" v-text="post.title" /></h2>
				<div class="summary">
					<block-content
						:blocks="post.body[0]"
						v-bind:key="post.body[0]._id"
						v-if="post.body.length"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { groq } from "@nuxtjs/sanity";

	export default {
		async asyncData({ $sanity }) {
			const query = groq`*[_type == "post"]`;
			const posts = await $sanity.fetch(query);
			return { posts };
		},
	};
</script>
```

Adapted (not in the official docs): the slug is passed as a GROQ query parameter instead of interpolated into the query string, and blocks are keyed by `_key`; see Notes.

`pages/_slug.vue`:

```html
<template>
	<div class="container">
		<div v-if="post">
			<h1 class="title" v-text="post.title" />
			<div class="content">
				<block-content
					:blocks="child"
					v-for="child in post.body"
					:key="child._key"
				/>
			</div>
		</div>
		<h4><a href="/">← Go back</a></h4>
	</div>
</template>

<script>
	import { groq } from "@nuxtjs/sanity";

	export default {
		async asyncData({ params, $sanity }) {
			const query = groq`*[_type == "post" && slug.current == $slug][0]`;
			const post = await $sanity.fetch(query, { slug: params.slug });
			return { post };
		},
	};
</script>
```

Deploy: push to GitHub, then in the dashboard choose **Create application** > **Pages** > **Import an existing Git repository**, and set **Framework preset** to Nuxt. To rebuild on content changes, create a Deploy Hook in the Pages project settings and add its URL under Webhooks in the Sanity project settings.

## Notes

- For new projects Cloudflare recommends Workers (cloudflare-workers skill, static assets); this sample targets an existing Pages project.
- Corrected from the official docs: the page built the GROQ query with `"${params.slug}"` interpolation, which lets a crafted URL alter the query. `$sanity.fetch(query, { slug })` binds it as a parameter. Portable Text blocks carry `_key`, not `_id`, so list keys use `_key` (the index page's `post.body[0]._id` is left as in the source because it is only a render key).
- Omitted from the official page: the `<style>` blocks that follow `<script>` in the official `pages/index.vue` and `pages/_slug.vue` examples are not reproduced in the snippets above. They are cosmetic CSS only, so the blog renders unstyled until you add your own styles.
- Select Static (Static/JAMStack hosting) and Universal (SSR / SSG) in `create-nuxt-app` so the site can be generated; add your deployed origin to the Sanity project CORS settings.
- The deploy hook URL is a secret-like endpoint: anyone holding it can trigger builds, so store it only in the Sanity webhook settings.

## Related

- [../references/framework-guides/nuxt.md](../references/framework-guides/nuxt.md)
- [../references/configuration/deploy-hooks.md](../references/configuration/deploy-hooks.md)
- [../references/configuration/build-configuration.md](../references/configuration/build-configuration.md)
