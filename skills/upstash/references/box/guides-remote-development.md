# Guide: Remote Development

Forward ports over SSH to run any web server (Next.js, Vite, Django, Rails, Express, ...) inside a box and access it locally as if it were running on your own machine, with optional public sharing.

## Signature / Usage

```bash
# Connect with port forwarding (box-id as password's username, Box API key as password)
ssh -L 3000:127.0.0.1:3000 <box-id>@us-east-1.box.upstash.com

# Inside the box
npx create-next-app@latest my-app
cd my-app
npm run dev
# now reachable at http://localhost:3000 locally
```

## Notes

- The SSH tunnel makes the dev server available at `http://localhost:<port>` on the local machine, live-editable inside the box
- To share publicly, expose the port with a public URL from the Upstash Console: `https://<box-id>-<port>.preview.box.upstash.com`

## Related

- [Quickstart](./quickstart.md)
- [Guides: Next.js Setup](./guides-nextjs-setup.md)
