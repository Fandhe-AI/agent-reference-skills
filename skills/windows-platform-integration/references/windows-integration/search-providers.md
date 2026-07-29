# Windows Search web search providers

App extension that registers a third-party app as a web (or cloud-file) search provider for Windows Search, so its results appear alongside/instead of the built-in Bing web search. Available to apps installed in the European Economic Area (EEA).

## Signature / Usage

```xml
<!-- Package.appxmanifest -->
<uap3:Extension Category="windows.appExtension">
  <uap3:AppExtension Name="com.microsoft.windows.websearchprovider"
                      DisplayName="CustomSearch" Id="CustomSearchApp" PublicFolder="Public">
    <uap3:Properties>
      <Endpoint>https://customsearchendpoint</Endpoint>
      <Protocol>customsearch</Protocol>
    </uap3:Properties>
  </uap3:AppExtension>
</uap3:Extension>
<uap:Extension Category="windows.protocol">
  <uap:Protocol Name="customsearch"/>
</uap:Extension>
```

```json
// Suggestion endpoint response: GET https://contoso.com?setlang=en-US&cc=US&qry=<query>
{
  "Suggestions": [
    {
      "Attributes": {
        "url": "https://www.contoso.com/search?q=projection+matrix",
        "query": "projection matrix",
        "previewPaneUrl": "http://www.contoso.com/preview"
      },
      "Text": "projection matrix"
    }
  ]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `uap3:AppExtension/@Name` | manifest attribute | Must be `"com.microsoft.windows.websearchprovider"` to register as a Windows Search web search provider. |
| `Endpoint` | element (child of `uap3:Properties`) | HTTPS URL the OS calls with the user's query to fetch search suggestions. |
| `Protocol` | element (child of `uap3:Properties`) | URI scheme used to launch the app's own web search results; if unregistered, the default browser is launched instead. |
| `DynamicContentEndpoint` | element (child of `uap3:Properties`) | Gleam-icon endpoint URL. **No longer supported** — the gleam feature has been retired and this element is obsolete. |
| Suggestion request query params | `setlang`, `cc`, `qry` | Locale, country code, and user query string sent to the `Endpoint`; the OS does not sanitize `qry`. |
| Suggestion response fields | `Suggestions[].Attributes.{url,query,previewPaneUrl}`, `Text` | JSON shape the suggestion endpoint must return, key names must match exactly. |
| Preview request query param | `Darkschemeovr` | `1` if the calling Windows system has dark theme enabled, `0` otherwise; sent to the `previewPaneUrl` endpoint. |
| Required response headers | `Access-Control-Allow-Origin: https://www.bing.com`, `Access-Control-Allow-Credentials: true`, `Access-Control-Allow-Methods: GET`, `Content-Type`, `Content-Length` | Required on both suggestion and preview HTTPS responses; endpoints must also answer CORS `OPTIONS` preflight requests with HTTP OK. |

## Notes

- Content must be delivered over HTTPS only — HTTP endpoints are not supported for suggestions or previews.
- The provider is packaged as an [MSIX package](https://learn.microsoft.com/en-us/windows/msix/); once installed it is enabled by default, and users can enable/disable providers and reorder them from **Settings > Apps > Installed apps**.
- For development/testing, a sideloaded provider appears in the provider list only when Developer Mode is enabled on the device.
- Distinct from [App Actions and Windows search integration](./app-actions-search.md), which registers atomic app *actions* discoverable in search/Click to Do rather than a web search results provider.

## Related

- [App Actions and Windows search integration](./app-actions-search.md)
