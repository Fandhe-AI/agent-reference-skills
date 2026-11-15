---
source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/page_iterator.py
---

# page_iterator (pages and items)

Iterators for paging through list API methods where the request takes a page token and the response is a list of results with a token for the next page (see "list pagination" in the Google API Style Guide). API clients with such methods can return an `Iterator`; iterate it for items (not every item sends a request) or iterate `.pages` for one page per request.

## Signature / Usage

### All items, or stop early (module docstring)

```python
>>> results_iterator = client.list_resources()
>>> list(results_iterator)  # Convert to a list (consumes all values).
```

```python
>>> for resource in results_iterator:
...     print(resource.name)
...     if not resource.is_valid:
...         break
```

### Count consumed items (module docstring)

```python
>>> for my_item in results_iterator:
...     if results_iterator.num_results >= 10:
...         break
```

### Page by page (module docstring)

Adapted (not in the official docs): `iterator` replaced with `results_iterator` (the docstring's variable is undefined).

```python
>>> for page in results_iterator.pages:
...     print('=' * 20)
...     print('    Page number: {:d}'.format(results_iterator.page_number))
...     print('  Items in page: {:d}'.format(page.num_items))
...     print('     First item: {!r}'.format(next(page)))
...     print('Items remaining: {:d}'.format(page.remaining))
...     print('Next page token: {}'.format(results_iterator.next_page_token))
```

### Async (`page_iterator_async`)

```python
>>> results_iterator = await client.list_resources()
>>> async for resource in results_iterator:
...     print(resource.name)
...     if not resource.is_valid:
...         break
```

### Constructors

```python
class Iterator(object, metaclass=abc.ABCMeta):
    def __init__(
        self,
        client,
        item_to_value=_item_to_value_identity,
        page_token=None,
        max_results=None,
    ):
```

```python
class GRPCIterator(Iterator):
    def __init__(
        self,
        client,
        method,
        request,
        items_field,
        item_to_value=_item_to_value_identity,
        request_token_field=_DEFAULT_REQUEST_TOKEN_FIELD,
        response_token_field=_DEFAULT_RESPONSE_TOKEN_FIELD,
        max_results=None,
    ):
```

```python
class HTTPIterator(Iterator):
    def __init__(
        self,
        client,
        api_request,
        path,
        item_to_value,
        items_key=_DEFAULT_ITEMS_KEY,
        page_token=None,
        page_size=None,
        max_results=None,
        extra_params=None,
        page_start=_do_nothing_page_start,
        next_token=_NEXT_TOKEN,
    ):
```

## Options / Props

| Name | Applies to | Default | Description |
| --- | --- | --- | --- |
| `client` | all | — | The API client (unused by `GRPCIterator`, kept to satisfy the `Iterator` interface). |
| `item_to_value` | all | identity (`HTTPIterator`: required) | Callable converting a raw item into the native object; called with the iterator and a single item. |
| `page_token` | `Iterator`, `HTTPIterator` | `None` | Token identifying the page to start from. `GRPCIterator` has no `page_token`; put it in the `request`. |
| `max_results` | all | `None` | Maximum number of results to fetch. |
| `page_size` | `HTTPIterator` | `None` | Maximum number of results per page. |
| `api_request`, `path` | `HTTPIterator` | — | Function used to make API requests; method path for the list. |
| `items_key` | `HTTPIterator` | `"items"` | Key in the response where the list of items is found. |
| `next_token` | `HTTPIterator` | `"nextPageToken"` | Name of the response field used for page tokens. |
| `extra_params` | `HTTPIterator` | `None` | Extra query string parameters; `pageToken` is reserved (`ValueError` if used). |
| `page_start` | `HTTPIterator` | no-op | Called with the iterator, the started `Page` and the page response dict. |
| `method`, `request`, `items_field` | `GRPCIterator` | — | Bound gRPC method taking one request message; the request message; response field holding the page's items. |
| `request_token_field` | `GRPCIterator` | `"page_token"` | Request field used to specify the page token. |
| `response_token_field` | `GRPCIterator` | `"next_page_token"` | Response field with the next-page token. |

Iterator attributes: `page_number` (current page), `next_page_token` (setting it before the iterator starts offsets the start), `num_results` (results fetched so far), `max_results`. `Page` exposes `num_items`, `remaining` and `raw_page`.

## Notes

- Applies to google-api-core 2.44.0 (PyPI), Python `>=3.10`. `page_iterator_async` provides `AsyncIterator` and `AsyncGRPCIterator` (same arguments as `Iterator` / `GRPCIterator`) and reuses `Page`; async iterate with `async for`.
- `pages` and `__iter__` raise `ValueError` ("Iterator has already started") if the iterator has already been started: a given iterator can be walked either by items or by pages, once.
- Corrected from the official docs: the module docstring uses `iterator.page_number` / `iterator.next_page_token` while the variable is `results_iterator`.
- A source comment in `GRPCIterator._has_next_page` says the check is intentionally falsy rather than a `None` check, because the RPC can return an empty string indicating no more pages.
- Product list methods in client libraries may return these iterators; product-specific list semantics are not covered here.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/page_iterator.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-api-core-v2.44.0/packages/google-api-core/google/api_core/page_iterator_async.py (retrieved 2026-11-16; pinned at tag google-api-core-v2.44.0)
- Snippet taken from the sources above. Blocks are fragments (`>>>` doctests, undefined `client`).

## Related

- [gapic-method.md](./gapic-method.md)
- [exceptions.md](./exceptions.md)
