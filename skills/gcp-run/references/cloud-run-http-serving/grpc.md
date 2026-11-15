---
source: https://docs.cloud.google.com/run/docs/triggering/grpc
---

# Use gRPC

Cloud Run-specific details for gRPC between services. All gRPC types (unary and streaming) work. The only special server requirement is to listen on the port in the `PORT` environment variable.

## Signature / Usage

### Server listening on `PORT` (Go)

```go
func main() {
	log.Printf("grpc-ping: starting server...")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.Fatalf("net.Listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	pb.RegisterPingServiceServer(grpcServer, &pingService{})
	if err = grpcServer.Serve(listener); err != nil {
		log.Fatal(err)
	}
}
```

## Options / Props

| Topic | Behavior |
|---|---|
| HTTP/2 | Recommended for gRPC; streaming and metadata require it (some simple unary features work without) |
| Client port | Connect to the service URL (or mapped custom domain) on port 443 |
| Proto definitions / client | Nothing Cloud Run-specific |
| Authentication | Required unless the service allows public access: the calling service needs invoker permission (Cloud Run Invoker, `roles/run.invoker`) on the receiving service and sends an `authorization: Bearer <identity token>` header whose audience is the service's auto-assigned URL (no port) |
| Concurrency | Counted by maximum concurrent requests per instance; each stream counts once |

Autoscaling and load balancing:

- gRPC client connections end at the edge load balancer; `KeepAlive` settings affect only the connection to the load balancer, and the client does not notice a dropped instance.
- On scale-in the load balancer closes connections with GOAWAY to backends as they shut down; on scale-out it opens new backend connections, transparent to clients.
- Many instances can multiplex into a single client-to-load-balancer connection.

## Notes

- Integration steps: configure HTTP/2 if you use streaming; define and compile proto messages; create a server listening on `PORT`; create a client; optionally add authentication (needed unless the service allows public access); build and deploy.
- The source shows only Go samples (server, connection, plain and authenticated requests). Only the server `main()` is kept; the client blocks are omitted. The source's identity token example notes a token has a 1 hour expiry and should be reused.
- Streaming reference: the `RouteGuide` implementation in the gRPC Basics tutorial of your language.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that run only inside the container.
- Source: https://docs.cloud.google.com/run/docs/triggering/grpc (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [https-request.md](./https-request.md)
- [healthchecks.md](./healthchecks.md)
- Using HTTP/2: https://docs.cloud.google.com/run/docs/configuring/http2
- Service-to-service authentication: https://docs.cloud.google.com/run/docs/authenticating/service-to-service
