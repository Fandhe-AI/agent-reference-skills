---
source: https://kotlinlang.org/docs/multiplatform/compose-regional-format.html
---

# Manage regional formats

Text fields and related components, such as date and time pickers, automatically apply locale-specific formatting for numbers, dates, times, and currencies, based on the system locale or a custom locale set in the app.

## Signature / Usage

Formatting respects platform locale conventions for:

- Numeric separators: `1,234.56` in `en-US` and `1.234,56` in `de-DE`.
- Date/time patterns: December 1 is `12/1/20` in `en-US` and `2020-12-01` in `fr-CA`.
- Currency symbols and placement: `$5,001` in `en-US` and `5.001,00 €` in `fr-FR`.

These work out of the box for system locales and custom locale overrides. Formatting is currently implemented with the `kotlinx-datetime` library on iOS and the JDK API on Android and desktop. Example in the iOS source set:

```kotlin
import androidx.compose.foundation.layout.Column
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.todayIn
import platform.Foundation.NSNumber
import platform.Foundation.NSNumberFormatter
import platform.Foundation.NSNumberFormatterCurrencyStyle
import platform.Foundation.NSLocale
import platform.Foundation.currentLocale

@Composable
fun RegionalFormatExample() {
    val currentLocale = NSLocale.current
    val languageCode = currentLocale.languageCode 
    val countryCode = currentLocale.countryCode 

    // Sample value to format as currency
    val amount = 1234.56

    // Uses NSNumberFormatter for currency formatting on iOS
    val currencyFormatter = NSNumberFormatter().apply { 
        numberStyle = NSNumberFormatterCurrencyStyle
        locale = currentLocale
    }
    val formattedCurrency = currencyFormatter.stringFromNumber(NSNumber(amount)) 

    // Gets current date using `kotlinx-datetime`
    val today = Clock.System.todayIn(TimeZone.currentSystemDefault())
    val formattedDate = today.toString()

    Column {
        Text("Current language: $languageCode")
        Text("Current country: $countryCode")
        Text("Amount: $amount")
        Text("Formatted currency: $formattedCurrency")
        Text("Today's date: $formattedDate")
    }
}
```

## Notes

- There is no common API for a unified multiplatform solution, but formatting is consistent in most cases. To ensure correctness: test edge cases such as large numbers, negative values, or zeroes, and verify formatting for all supported locales on all target platforms.

## Related

- [Manage local resource environment](./resource-environment.md)
- [Localizing strings](./localize-strings.md)
- [Setup and configuration for multiplatform resources](./resources-setup.md#qualifiers)
