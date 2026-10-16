# Error Messages

Advanced Usage: https://react-hook-form.com/advanced-usage#ErrorMessages

Error messages are visual feedback to our users when there are issues with their inputs. React Hook Form provides an `errors` object to let you retrieve errors easily. There are several different ways to improve error presentation on the screen.

## Signature / Usage

Register: You can simply pass the error message to `register`, via the `message` attribute of the validation rule object, like this:

```javascript
<input {...register('test', { maxLength: { value: 2, message: "error message" } })} />
```

Optional Chaining: The `?.` [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) operator permits reading the `errors` object without worrying about causing another error due to `null` or `undefined`.

```javascript
errors?.firstName?.message
```

Lodash `get`: If your project is using [lodash](https://lodash.com), then you can leverage the lodash [get](https://lodash.com/docs/4.17.15#get) function. Eg:

```javascript
get(errors, 'firstName.message')
```

## Related

- [errormessage](../api/errormessage.md)
- [useform-formstate](../api/useform-formstate.md)
