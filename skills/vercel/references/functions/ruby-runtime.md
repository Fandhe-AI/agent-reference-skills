# Ruby Runtime

Ruby runtime (Beta, all plans) compiles Ruby Vercel Functions that define a single HTTP handler from `.rb` files within an `/api` directory at the project root.

## Signature / Usage

```ruby
# api/index.rb
require 'cowsay'

Handler = Proc.new do |request, response|
  name = request.query['name'] || 'World'

  response.status = 200
  response['Content-Type'] = 'text/text; charset=utf-8'
  response.body = Cowsay.say("Hello #{name}", 'cow')
end
```

```ruby
# Gemfile
source "https://rubygems.org"

gem "cowsay", "~> 0.3.0"
```

## Handler forms

A Ruby file must define one of:

| Form | Description |
|------|-------------|
| `Handler` proc | Matches the `do |request, response|` signature |
| `Handler` class | Inherits from `WEBrick::HTTPServlet::AbstractServlet` |

## Ruby version

```ruby
# Gemfile
source "https://rubygems.org"
ruby "~> 3.3.x"
```

## Notes

- New deployments use Ruby 3.3.x by default
- If the patch part of the version is defined (e.g. `3.3.1`), it is ignored and the latest `3.3.x` is assumed
- Dependencies are installed from the `Gemfile`; alternatively vendor them with `bundler install --deployment` (useful for gems with native extensions), in which case dependencies are not built on deployment

## Related

- [runtimes.md](./runtimes.md)
- [go-runtime.md](./go-runtime.md)
- [rust-runtime.md](./rust-runtime.md)
