---
source: https://kotlinlang.org/docs/multiplatform/compose-pdf.html
---

# Display PDF files in a Compose Multiplatform app

Compose Multiplatform has no built-in PDF API; the docs show how to display, edit, or generate PDFs with third-party libraries: Nucleus PDF reader, KitePDF, and PdfKmp.

## Signature / Usage

Choose an approach based on what users need to do with PDFs: a PDF viewer for existing PDFs, a document engine to create and edit them, a PDF generator to produce them from app data, or a platform viewer for PDFs opened outside your Compose UI.

Nucleus PDF reader (PDFium on Android, iOS, desktop, and web) displays a PDF that is already loaded into memory:

```kotlin
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import dev.nucleusframework.pdfium.PdfReader
import dev.nucleusframework.pdfium.rememberPdfReaderState

@Composable
fun PdfScreen(bytes: ByteArray) {
    val reader = rememberPdfReaderState()

    LaunchedEffect(bytes) {
        reader.open(bytes)
    }

    PdfReader(
        state = reader,
        modifier = Modifier.fillMaxSize(),
    )
}
```

KitePDF (document engine plus Compose viewer for Android, iOS, web, and desktop) opens a PDF with `PdfDocument.open(bytes)` and passes the document to the viewer:

```kotlin
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import io.github.yuroyami.kitepdf.PdfDocument
import io.github.yuroyami.kitepdf.compose.PdfView
import io.github.yuroyami.kitepdf.compose.rememberPdfViewState

@Composable
fun PdfScreen(bytes: ByteArray) {
    val document = remember(bytes) {
        PdfDocument.open(bytes)
    }

    PdfView(
        state = rememberPdfViewState(document),
        modifier = Modifier.fillMaxSize(),
    )
}
```

PdfKmp creates PDFs from app data and displays them with the optional `pdfkmp-viewer` Compose viewer (Android, iOS, desktop; not available on web):

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import com.conamobile.pdfkmp.pdf
import com.conamobile.pdfkmp.viewer.KmpPdfViewer

@Composable
fun RecipePdfScreen(
    recipeTitle: String,
    ingredients: String,
    instructions: String,
    onBack: () -> Unit,
) {
    val document = remember(recipeTitle, ingredients, instructions) {
        pdf {
            page {
                text(recipeTitle)
                text(ingredients)
                text(instructions)
            }
        }
    }

    KmpPdfViewer(
        document = document,
        title = recipeTitle,
        fileName = "recipe.pdf",
        onBack = onBack,
    )
}
```

## Notes

- All three libraries are third-party; platform support and the required Kotlin and Compose Multiplatform versions change over time, so check each library's documentation. The docs link to the Nucleus PDF reader, KitePDF, and PdfKmp documentation sites. The examples are verbatim from the official page and were not compiled here.
- Use a platform viewer when no embedded Compose viewer is needed: a desktop app can open a saved PDF with `java.awt.Desktop.open()`, mobile apps use platform APIs such as PDFKit on iOS or a file-sharing intent on Android, and a web app can offer the PDF for the browser to open or download. PdfKmp's save and share guide has per-platform examples that do not require its Compose viewer.
- For web apps, `pdfkmp-viewer` is unavailable; the docs point to PdfKmp's browser viewing-and-saving guidance.
- Source: https://github.com/JetBrains/kotlin-multiplatform-dev-docs/blob/54ca714a853f25f193b016207b89e09edfded5e6/topics/compose-pdf.md (pinned, fetched 2026-11-14). Page added after Compose Multiplatform 1.12.2.

## Related

- [Sharing content in Compose Multiplatform](./sharing-content.md)
- [Compose UI previews](./previews.md)
