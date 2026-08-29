---
source: https://fastify.dev/docs/latest/Reference/Errors/
---

# Fastify Error Codes

All `FST_ERR_*` error codes thrown by Fastify's core (as of v5.12.1), exposed via the `errorCodes` export for `instanceof` matching in a custom error handler.

## Signature / Usage

```js
// ESM
import { errorCodes } from 'fastify'

// CommonJS
const errorCodes = require('fastify').errorCodes
```

## Error Codes

| Code | Description | How to solve | Discussion |
| --- | --- | --- | --- |
| `FST_ERR_NOT_FOUND` | 404 Not Found | - | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_OPTIONS_NOT_OBJ` | Fastify options wrongly specified. | Fastify options should be an object. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_QSP_NOT_FN` | QueryStringParser wrongly specified. | QueryStringParser option should be a function. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_SCHEMA_CONTROLLER_BUCKET_OPT_NOT_FN` | SchemaController.bucket wrongly specified. | SchemaController.bucket option should be a function. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_SCHEMA_ERROR_FORMATTER_NOT_FN` | SchemaErrorFormatter option wrongly specified. | SchemaErrorFormatter option should be a non async function. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_AJV_CUSTOM_OPTIONS_OPT_NOT_OBJ` | ajv.customOptions wrongly specified. | ajv.customOptions option should be an object. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_AJV_CUSTOM_OPTIONS_OPT_NOT_ARR` | ajv.plugins option wrongly specified. | ajv.plugins option should be an array. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_CTP_ALREADY_PRESENT` | The parser for this content type was already registered. | Use a different content type or delete the already registered parser. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_CTP_INVALID_TYPE` | `Content-Type` wrongly specified | The `Content-Type` should be a string. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_CTP_EMPTY_TYPE` | `Content-Type` is an empty string. | `Content-Type` cannot be an empty string. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_CTP_INVALID_HANDLER` | Invalid handler for the content type. | Use a different handler. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_CTP_INVALID_PARSE_TYPE` | The provided parse type is not supported. | Accepted values are `string` or `buffer`. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_CTP_BODY_TOO_LARGE` | The request body is larger than the provided limit. | Increase the limit in the Fastify server instance setting: [bodyLimit](./logging.md) | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_CTP_INVALID_MEDIA_TYPE` | The received media type is not supported (i.e. there is no suitable `Content-Type` parser for it). | Use a different content type. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_CTP_INVALID_CONTENT_LENGTH` | Request body size did not match `Content-Length`. | Check the request body size and the `Content-Length` header. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_CTP_EMPTY_JSON_BODY` | Body is not valid JSON but content-type is set to `application/json`. | Check if the request body is valid JSON. | [#5925](https://github.com/fastify/fastify/pull/5925) |
| `FST_ERR_CTP_INVALID_JSON_BODY` | Body cannot be empty when content-type is set to `application/json`. | Check the request body. | [#1253](https://github.com/fastify/fastify/pull/1253) |
| `FST_ERR_CTP_INSTANCE_ALREADY_STARTED` | Fastify is already started. | - | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_INSTANCE_ALREADY_LISTENING` | Fastify instance is already listening. | - | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_DEC_ALREADY_PRESENT` | A decorator with the same name is already registered. | Use a different decorator name. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_DEC_DEPENDENCY_INVALID_TYPE` | The dependencies of decorator must be of type `Array`. | Use an array for the dependencies. | [#3090](https://github.com/fastify/fastify/pull/3090) |
| `FST_ERR_DEC_MISSING_DEPENDENCY` | The decorator cannot be registered due to a missing dependency. | Register the missing dependency. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_DEC_AFTER_START` | The decorator cannot be added after start. | Add the decorator before starting the server. | [#2128](https://github.com/fastify/fastify/pull/2128) |
| `FST_ERR_DEC_REFERENCE_TYPE` | The decorator cannot be a reference type. | Define the decorator with a getter/setter interface or an empty decorator with a hook. | [#5462](https://github.com/fastify/fastify/pull/5462) |
| `FST_ERR_DEC_UNDECLARED` | An attempt was made to access a decorator that has not been declared. | Declare the decorator before using it. | [#5768](https://github.com/fastify/fastify/pull/5768) |
| `FST_ERR_HOOK_INVALID_TYPE` | The hook name must be a string. | Use a string for the hook name. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_HOOK_INVALID_HANDLER` | The hook callback must be a function. | Use a function for the hook callback. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_HOOK_INVALID_ASYNC_HANDLER` | Async function has too many arguments. Async hooks should not use the `done` argument. | Remove the `done` argument from the async hook. | [#4367](https://github.com/fastify/fastify/pull/4367) |
| `FST_ERR_HOOK_NOT_SUPPORTED` | The hook is not supported. | Use a supported hook. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_MISSING_MIDDLEWARE` | You must register a plugin for handling middlewares, visit `Middleware` for more info. | Register a plugin for handling middlewares. | [#2014](https://github.com/fastify/fastify/pull/2014) |
| `FST_ERR_HOOK_TIMEOUT` | A callback for a hook timed out. | Increase the timeout for the hook. | [#3106](https://github.com/fastify/fastify/pull/3106) |
| `FST_ERR_LOG_INVALID_DESTINATION` | The logger does not accept the specified destination. | Use a `'stream'` or a `'file'` as the destination. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_LOG_INVALID_LOGGER` | The logger should have all these methods: `'info'`, `'error'`, `'debug'`, `'fatal'`, `'warn'`, `'trace'`, `'child'`. | Use a logger with all the required methods. | [#4520](https://github.com/fastify/fastify/pull/4520) |
| `FST_ERR_LOG_INVALID_LOGGER_INSTANCE` | The `loggerInstance` only accepts a logger instance, not a configuration object. | To pass a configuration object, use `'logger'` instead. | [#5020](https://github.com/fastify/fastify/pull/5020) |
| `FST_ERR_LOG_INVALID_LOGGER_CONFIG` | The logger option only accepts a configuration object, not a logger instance. | To pass an instance, use `'loggerInstance'` instead. | [#5020](https://github.com/fastify/fastify/pull/5020) |
| `FST_ERR_LOG_LOGGER_AND_LOGGER_INSTANCE_PROVIDED` | You cannot provide both `'logger'` and `'loggerInstance'`. | Please provide only one option. | [#5020](https://github.com/fastify/fastify/pull/5020) |
| `FST_ERR_LOG_INVALID_LOG_CONTROLLER` | The `logController` option must be an instance of `LogController`. | Extend the `LogController` class and pass an instance. | - |
| `FST_ERR_REP_INVALID_PAYLOAD_TYPE` | Reply payload can be either a `string` or a `Buffer`. | Use a `string` or a `Buffer` for the payload. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_REP_RESPONSE_BODY_CONSUMED` | Using `Response` as reply payload, but the body is being consumed. | Make sure you don't consume the `Response.body` | [#5286](https://github.com/fastify/fastify/pull/5286) |
| `FST_ERR_REP_READABLE_STREAM_LOCKED` | Using `ReadableStream` as reply payload, but locked with another reader. | Make sure you don't call `Readable.getReader` before sending, or release the lock with `reader.releaseLock()` before sending. | [#5920](https://github.com/fastify/fastify/pull/5920) |
| `FST_ERR_REP_ALREADY_SENT` | A response was already sent. | - | [#1336](https://github.com/fastify/fastify/pull/1336) |
| `FST_ERR_REP_SENT_VALUE` | The only possible value for `reply.sent` is `true`. | - | [#1336](https://github.com/fastify/fastify/pull/1336) |
| `FST_ERR_SEND_INSIDE_ONERR` | You cannot use `send` inside the `onError` hook. | - | [#1348](https://github.com/fastify/fastify/pull/1348) |
| `FST_ERR_SEND_UNDEFINED_ERR` | Undefined error has occurred. | - | [#2074](https://github.com/fastify/fastify/pull/2074) |
| `FST_ERR_BAD_STATUS_CODE` | The status code is not valid. | Use a valid status code. | [#2082](https://github.com/fastify/fastify/pull/2082) |
| `FST_ERR_BAD_TRAILER_NAME` | Called `reply.trailer` with an invalid header name. | Use a valid header name. | [#3794](https://github.com/fastify/fastify/pull/3794) |
| `FST_ERR_BAD_TRAILER_VALUE` | Called `reply.trailer` with an invalid type. Expected a function. | Use a function. | [#3794](https://github.com/fastify/fastify/pull/3794) |
| `FST_ERR_FAILED_ERROR_SERIALIZATION` | Failed to serialize an error. | - | [#4601](https://github.com/fastify/fastify/pull/4601) |
| `FST_ERR_MISSING_SERIALIZATION_FN` | Missing serialization function. | Add a serialization function. | [#3970](https://github.com/fastify/fastify/pull/3970) |
| `FST_ERR_MISSING_CONTENTTYPE_SERIALIZATION_FN` | Missing `Content-Type` serialization function. | Add a serialization function. | [#4264](https://github.com/fastify/fastify/pull/4264) |
| `FST_ERR_REQ_INVALID_VALIDATION_INVOCATION` | Invalid validation invocation. Missing validation function for HTTP part nor schema provided. | Add a validation function. | [#3970](https://github.com/fastify/fastify/pull/3970) |
| `FST_ERR_SCH_MISSING_ID` | The schema provided does not have `$id` property. | Add a `$id` property. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_SCH_ALREADY_PRESENT` | A schema with the same `$id` already exists. | Use a different `$id`. | [#1168](https://github.com/fastify/fastify/pull/1168) |
| `FST_ERR_SCH_CONTENT_MISSING_SCHEMA` | A schema is missing for the corresponding content type. | Add a schema. | [#4264](https://github.com/fastify/fastify/pull/4264) |
| `FST_ERR_SCH_DUPLICATE` | Schema with the same attribute already present! | Use a different attribute. | [#1954](https://github.com/fastify/fastify/pull/1954) |
| `FST_ERR_SCH_VALIDATION_BUILD` | The JSON schema provided for validation to a route is not valid. | Fix the JSON schema. | [#2023](https://github.com/fastify/fastify/pull/2023) |
| `FST_ERR_SCH_SERIALIZATION_BUILD` | The JSON schema provided for serialization of a route response is not valid. | Fix the JSON schema. | [#2023](https://github.com/fastify/fastify/pull/2023) |
| `FST_ERR_SCH_RESPONSE_SCHEMA_NOT_NESTED_2XX` | Response schemas should be nested under a valid status code (2XX). | Use a valid status code. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_INIT_OPTS_INVALID` | Invalid initialization options. | Use valid initialization options. | [#1471](https://github.com/fastify/fastify/pull/1471) |
| `FST_ERR_FORCE_CLOSE_CONNECTIONS_IDLE_NOT_AVAILABLE` | Cannot set forceCloseConnections to `idle` as your HTTP server does not support the `closeIdleConnections` method. | Use a different value for `forceCloseConnections`. | [#3925](https://github.com/fastify/fastify/pull/3925) |
| `FST_ERR_DUPLICATED_ROUTE` | The HTTP method already has a registered controller for that URL. | Use a different URL or register the controller for another HTTP method. | [#2954](https://github.com/fastify/fastify/pull/2954) |
| `FST_ERR_BAD_URL` | The router received an invalid URL. | Use a valid URL. | [#2106](https://github.com/fastify/fastify/pull/2106) |
| `FST_ERR_MAX_PARAM_LENGTH` | The router received a URL that exceeds max param length. | Adjust the param length or increase the max param length to meet your needs. | [PR](https://github.com/fastify/fastify/pull/6716) |
| `FST_ERR_ASYNC_CONSTRAINT` | The router received an error when using asynchronous constraints. | - | [#4323](https://github.com/fastify/fastify/pull/4323) |
| `FST_ERR_INVALID_URL` | URL must be a string. | Use a string for the URL. | [#3653](https://github.com/fastify/fastify/pull/3653) |
| `FST_ERR_ROUTE_OPTIONS_NOT_OBJ` | Options for the route must be an object. | Use an object for the route options. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_ROUTE_DUPLICATED_HANDLER` | Duplicate handler for the route is not allowed. | Use a different handler. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_ROUTE_HANDLER_NOT_FN` | Handler for the route must be a function. | Use a function for the handler. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_ROUTE_MISSING_HANDLER` | Missing handler function for the route. | Add a handler function. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_ROUTE_METHOD_INVALID` | Method is not a valid value. | Use a valid value for the method. | [#4750](https://github.com/fastify/fastify/pull/4750) |
| `FST_ERR_ROUTE_METHOD_NOT_SUPPORTED` | Method is not supported for the route. | Use a supported method. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_ROUTE_LOG_LEVEL_INVALID` | `logLevel` must match a configured logger level. | Use one of the configured logger levels for the route. | [#6523](https://github.com/fastify/fastify/pull/6523) |
| `FST_ERR_ROUTE_BODY_VALIDATION_SCHEMA_NOT_SUPPORTED` | Body validation schema route is not supported. | Use a different method for the route. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_ROUTE_BODY_LIMIT_OPTION_NOT_INT` | `bodyLimit` option must be an integer. | Use an integer for the `bodyLimit` option. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_HANDLER_TIMEOUT` | Request timed out. | Increase the `handlerTimeout` option or optimize the handler. | - |
| `FST_ERR_ROUTE_HANDLER_TIMEOUT_OPTION_NOT_INT` | `handlerTimeout` option must be a positive integer. | Use a positive integer for the `handlerTimeout` option. | - |
| `FST_ERR_ROUTE_REWRITE_NOT_STR` | `rewriteUrl` needs to be of type `string`. | Use a string for the `rewriteUrl`. | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_ROUTE_MISSING_CONTENT_TYPE` | `Content-Type` header is required for the request. | Send the request with a `Content-Type` header. | [#6832](https://github.com/fastify/fastify/pull/6832) |
| `FST_ERR_ROUTE_MISSING_CONTENT` | Body is required for the request. | Send the request with a payload. | [#6832](https://github.com/fastify/fastify/pull/6832) |
| `FST_ERR_REOPENED_CLOSE_SERVER` | Fastify has already been closed and cannot be reopened. | - | [#2415](https://github.com/fastify/fastify/pull/2415) |
| `FST_ERR_REOPENED_SERVER` | Fastify is already listening. | - | [#2415](https://github.com/fastify/fastify/pull/2415) |
| `FST_ERR_PLUGIN_VERSION_MISMATCH` | Installed Fastify plugin mismatched expected version. | Use a compatible version of the plugin. | [#2549](https://github.com/fastify/fastify/pull/2549) |
| `FST_ERR_PLUGIN_CALLBACK_NOT_FN` | Callback for a hook is not a function. | Use a function for the callback. | [#3106](https://github.com/fastify/fastify/pull/3106) |
| `FST_ERR_PLUGIN_NOT_VALID` | Plugin must be a function or a promise. | Use a function or a promise for the plugin. | [#3106](https://github.com/fastify/fastify/pull/3106) |
| `FST_ERR_ROOT_PLG_BOOTED` | Root plugin has already booted. | - | [#3106](https://github.com/fastify/fastify/pull/3106) |
| `FST_ERR_PARENT_PLUGIN_BOOTED` | Impossible to load plugin because the parent has already booted (mapped directly from `avvio`). | - | [#3106](https://github.com/fastify/fastify/pull/3106) |
| `FST_ERR_PLUGIN_TIMEOUT` | Plugin did not start in time. | Increase the timeout for the plugin. | [#3106](https://github.com/fastify/fastify/pull/3106) |
| `FST_ERR_PLUGIN_NOT_PRESENT_IN_INSTANCE` | The decorator is not present in the instance. | - | [#4554](https://github.com/fastify/fastify/pull/4554) |
| `FST_ERR_PLUGIN_INVALID_ASYNC_HANDLER` | The plugin being registered mixes async and callback styles. | - | [#5141](https://github.com/fastify/fastify/pull/5141) |
| `FST_ERR_PLUGIN_DEPENDENCY_NOT_REGISTERED` | The dependency of a plugin is not registered. | Register the missing dependency before registering this plugin. | [#6774](https://github.com/fastify/fastify/pull/6774) |
| `FST_ERR_VALIDATION` | The Request failed the payload validation. | Check the request payload. | [#4824](https://github.com/fastify/fastify/pull/4824) |
| `FST_ERR_LISTEN_OPTIONS_INVALID` | Invalid listen options. | Check the listen options. | [#4886](https://github.com/fastify/fastify/pull/4886) |
| `FST_ERR_ERROR_HANDLER_NOT_FN` | Error Handler must be a function | Provide a function to `setErrorHandler`. | [#5317](https://github.com/fastify/fastify/pull/5317) |
| `FST_ERR_ERROR_HANDLER_ALREADY_SET` | Error Handler already set in this scope. Set `allowErrorHandlerOverride: true` to allow overriding. | Occurs only when `allowErrorHandlerOverride: false` was set on that scope and `setErrorHandler` is called a second time within it. The factory default is `true` (multiple `setErrorHandler` calls per scope are allowed unless explicitly opted out) — see [`allowErrorHandlerOverride`](../server/factory-options.md). | [PR](https://github.com/fastify/fastify/pull/6098) |

## Notes

- List reflects the `FST_ERR_*` codes documented on `docs/Reference/Errors.md` at tag `v5.12.1`. Codes are added/removed between minor versions; re-run `/update-skill fastify check` if a code used in application code is missing here.
- Every code is a subclass of `Error` reachable via `Fastify.errorCodes.<CODE_NAME>` for `instanceof` matching (see [error-handling](./error-handling.md)).
- Several codes are logger-configuration guards introduced for the v5 `logger` / `loggerInstance` split (`FST_ERR_LOG_INVALID_LOGGER_INSTANCE`, `FST_ERR_LOG_INVALID_LOGGER_CONFIG`, `FST_ERR_LOG_LOGGER_AND_LOGGER_INSTANCE_PROVIDED`) — see [logging](./logging.md) `## Notes` for the v4 → v5 change.
- `FST_ERR_ERROR_HANDLER_ALREADY_SET`'s upstream "How to solve" text on `docs/Reference/Errors.md` ("By default, `setErrorHandler` can only be called once per encapsulation context") does not match `docs/Reference/Server.md`'s `allowErrorHandlerOverride` section, which states the factory default is `true` (multiple calls allowed) and the restrictive behavior only applies when it is explicitly set to `false`. The table cell above has been corrected to match the verified `Server.md` default rather than the outdated `Errors.md` wording.

## Related

- [error-handling](./error-handling.md)
- [logging](./logging.md)
- [factory-options](../server/factory-options.md)
