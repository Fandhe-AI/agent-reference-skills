---
source: https://www.electronjs.org/docs/latest/api/structures/printer-info
---

# Printing structures (PrinterInfo, PrintToPDFMargins, PrintToPDFOptions)

Object structures used by `webContents.getPrintersAsync()`, `webContents.printToPDF()` and `webFrameMain.printToPDF()`.

## Signature / Usage

```js
const data = await win.webContents.printToPDF({
  landscape: false,
  printBackground: true,
  pageSize: 'A4',
  margins: { top: 0.4, bottom: 0.4, left: 0.4, right: 0.4 }
})
```

### PrinterInfo Object

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | the name of the printer as understood by the OS. |
| `displayName` | string | the name of the printer as shown in Print Preview. |
| `description` | string | a longer description of the printer's type. |
| `options` | Object | an object containing a variable number of platform-specific printer information. |

The number represented by `status` means different things on different platforms: on Windows its potential values can be found in the Microsoft Learn `PRINTER_INFO_2` documentation, and on Linux and macOS they can be found in the CUPS programming manual.

Below is an example of some of the additional options that may be set which may be different on each platform.

```json5
{
  name: 'Austin_4th_Floor_Printer___C02XK13BJHD4',
  displayName: 'Austin 4th Floor Printer @ C02XK13BJHD4',
  description: 'TOSHIBA ColorMFP',
  options: {
    copies: '1',
    'device-uri': 'dnssd://Austin%204th%20Floor%20Printer%20%40%20C02XK13BJHD4._ipps._tcp.local./?uuid=71687f1e-1147-3274-6674-22de61b110bd',
    finishings: '3',
    'job-cancel-after': '10800',
    'job-hold-until': 'no-hold',
    'job-priority': '50',
    'job-sheets': 'none,none',
    'marker-change-time': '0',
    'number-up': '1',
    'printer-commands': 'ReportLevels,PrintSelfTestPage,com.toshiba.ColourProfiles.update,com.toshiba.EFiling.update,com.toshiba.EFiling.checkPassword',
    'printer-info': 'Austin 4th Floor Printer @ C02XK13BJHD4',
    'printer-is-accepting-jobs': 'true',
    'printer-is-shared': 'false',
    'printer-is-temporary': 'false',
    'printer-location': '',
    'printer-make-and-model': 'TOSHIBA ColorMFP',
    'printer-state': '3',
    'printer-state-change-time': '1573472937',
    'printer-state-reasons': 'offline-report,com.toshiba.snmp.failed',
    'printer-type': '10531038',
    'printer-uri-supported': 'ipp://localhost/printers/Austin_4th_Floor_Printer___C02XK13BJHD4',
    system_driverinfo: 'T'
  }
}
```

### PrintToPDFMargins Object

| Name | Type | Description |
| --- | --- | --- |
| `top` | number (optional) | Top margin in inches. Defaults to 1cm (~0.4 inches). |
| `bottom` | number (optional) | Bottom margin in inches. Defaults to 1cm (~0.4 inches). |
| `left` | number (optional) | Left margin in inches. Defaults to 1cm (~0.4 inches). |
| `right` | number (optional) | Right margin in inches. Defaults to 1cm (~0.4 inches). |

### PrintToPDFOptions Object

| Name | Type | Description |
| --- | --- | --- |
| `landscape` | boolean (optional) | Paper orientation. `true` for landscape, `false` for portrait. Defaults to false. |
| `displayHeaderFooter` | boolean (optional) | Whether to display header and footer. Defaults to false. |
| `printBackground` | boolean (optional) | Whether to print background graphics. Defaults to false. |
| `scale` | number (optional) | Scale of the webpage rendering. Defaults to 1. |
| `pageSize` | string \| Size (optional) | Specify page size of the generated PDF. Can be `A0`, `A1`, `A2`, `A3`, `A4`, `A5`, `A6`, `Legal`, `Letter`, `Tabloid`, `Ledger`, or an Object containing `height` and `width` in inches. Defaults to `Letter`. |
| `margins` | PrintToPDFMargins (optional) | |
| `pageRanges` | string (optional) | Page ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages. |
| `headerTemplate` | string (optional) | HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them: `date` (formatted print date), `title` (document title), `url` (document location), `pageNumber` (current page number) and `totalPages` (total pages in the document). For example, `<span class=title></span>` would generate span containing the title. |
| `footerTemplate` | string (optional) | HTML template for the print footer. Should use the same format as the `headerTemplate`. |
| `preferCSSPageSize` | boolean (optional) | Whether or not to prefer page size as defined by css. Defaults to false, in which case the content will be scaled to fit the paper size. |
| `generateTaggedPDF` | boolean (optional) _Experimental_ | Whether or not to generate a tagged (accessible) PDF. Defaults to false. As this property is experimental, the generated PDF may not adhere fully to PDF/UA and WCAG standards. |
| `generateDocumentOutline` | boolean (optional) _Experimental_ | Whether or not to generate a PDF document outline from content headers. Defaults to false. |

## Notes

* Source pages: `api/structures/printer-info`, `print-to-pdf-margins`, `print-to-pdf-options` (under https://www.electronjs.org/docs/latest/).
* `generateTaggedPDF` and `generateDocumentOutline` are _Experimental_.

## Related

* [WebContents methods: editing, find, print](./web-contents-methods-editing-find-print.md)
* [webFrameMain](./web-frame-main.md)
