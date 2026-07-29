# Web widget providers

Widget providers can populate a widget's content with HTML served from a remote URL instead of (or in addition to) the Adaptive Card body schema. The provider still sends an Adaptive Card JSON payload, so implementation otherwise follows the standard `IWidgetProvider` steps — only the payload shape and two additional interfaces differ.

## Signature / Usage

```json
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.6",
    "body": [],
    "metadata": {
        "webUrl": "https://www.contoso.com/widgetprovider.html"
    }
}
```

```csharp
internal class WidgetProvider : IWidgetProvider, IWidgetResourceProvider, IWidgetProviderMessage
{
    async void IWidgetResourceProvider.OnResourceRequested(WidgetResourceRequestedArgs args)
    {
        var deferral = args.GetDeferral();
        if (args.Request.Uri == "https://contoso.com/logo-image")
        {
            var file = await StorageFile.GetFileFromPathAsync(Windows.ApplicationModel.Package.Current.InstalledPath + "/Assets/image.png");
            var response = new WidgetResourceResponse(RandomAccessStreamReference.CreateFromFile(file), "OK", 200);
            response.Headers.Add("Content-Type", "image/png");
            args.Response = response;
        }
        deferral.Complete();
    }

    public void OnMessageReceived(WidgetMessageReceivedArgs args) { /* message from window.chrome.webview.postMessage */ }
}
```

## Options / Props

| Piece | Description |
|------|-------------|
| `metadata.webUrl` | Set with an empty `body` array in the Adaptive Card payload passed to `WidgetManager.UpdateWidget`; points to the URL supplying the widget's HTML content. |
| `IWidgetResourceProvider.OnResourceRequested` | Implement to intercept resource requests matching the *WebRequestFilter* declared on the widget's `Definition` in the manifest; set `WidgetResourceRequestedArgs.Response` to a `WidgetResourceResponse`, or leave unset to let the system fetch from the web (optionally after modifying `Request` headers). Use `GetDeferral()`/`Complete()` for async responses. |
| `IWidgetProviderMessage.OnMessageReceived` | Implement to receive string messages posted from the widget's web content via `window.chrome.webview.postMessage`. |
| `WidgetManager.SendMessageToContent(widgetId, message)` | Sends a string message (plain text or serialized JSON) to the widget's web content. |

## Notes

- The *WebRequestFilter* match-pattern format and Punycode requirement are the same as documented on the widget provider manifest page.
- This feature requires still providing a valid Adaptive Card payload — an empty `body` plus `metadata.webUrl` is the minimum, not a replacement schema.

## Related

- [IWidgetProvider](./iwidgetprovider.md)
- [widget-provider-manifest](./widget-provider-manifest.md)
- [implement-widget-provider](./implement-widget-provider.md)
