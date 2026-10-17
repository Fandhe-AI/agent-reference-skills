---
source: https://docs.expo.dev/modules/third-party-library/
---

# Wrap third-party native libraries

Tutorial: wrap two similar native chart libraries (MPAndroidChart on Android, Charts / DGCharts on iOS) in one Expo module that exposes a radial (pie) chart view.

## Signature / Usage

Create the module (inside an existing Expo project, or as a standalone module):

```sh
# local module inside an existing Expo project
npx create-expo-module --local expo-radial-chart

# standalone module
npx create-expo-module expo-radial-chart
```

Run the example app:

```sh
npx expo run:android
npx expo run:ios
```

Define the JavaScript props:

```ts
// src/ExpoRadialChart.types.ts
import { ViewStyle } from 'react-native/types';

export type ChangeEventPayload = {
  value: string;
};

type Series = {
  color: string;
  percentage: number;
};

export type ExpoRadialChartViewProps = {
  style?: ViewStyle;
  data: Series[];
};
```

Android view and module (Kotlin):

```kotlin
// android/src/main/java/expo/modules/radialchart/ExpoRadialChartView.kt
package expo.modules.radialchart

import android.content.Context
import android.graphics.Color
import com.github.mikephil.charting.charts.PieChart
import com.github.mikephil.charting.data.PieData
import com.github.mikephil.charting.data.PieDataSet
import com.github.mikephil.charting.data.PieEntry
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.views.ExpoView

class Series : Record {
  @Field
  val color: String = "#ff0000"

  @Field
  val percentage: Float = 0.0f
}

class ExpoRadialChartView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  internal val chartView = PieChart(context).also {
    it.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    addView(it)
  }

  fun setChartData(data: ArrayList<Series>) {
    val entries: ArrayList<PieEntry> = ArrayList()
    val colors: ArrayList<Int> = ArrayList()
    for (series in data) {
      entries.add(PieEntry(series.percentage))
      colors.add(Color.parseColor(series.color))
    }
    val dataSet = PieDataSet(entries, "DataSet");
    dataSet.colors = colors;
    val pieData = PieData(dataSet);
    chartView.data = pieData;
    chartView.invalidate();
  }
}
```

```kotlin
// android/src/main/java/expo/modules/radialchart/ExpoRadialChartModule.kt
package expo.modules.radialchart

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoRadialChartModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoRadialChart")

    View(ExpoRadialChartView::class) {
      Prop("data") { view: ExpoRadialChartView, prop: ArrayList<Series> ->
        view.setChartData(prop);
      }
    }
  }
}
```

iOS view and module (Swift):

```swift
// ios/ExpoRadialChartView.swift
import ExpoModulesCore
import DGCharts

struct Series: Record {
  @Field
  var color: UIColor = UIColor.black

  @Field
  var percentage: Double = 0
}

class ExpoRadialChartView: ExpoView {
  let chartView = PieChartView()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    addSubview(chartView)
  }

  override func layoutSubviews() {
    chartView.frame = bounds
  }

  func setChartData(data: [Series]) {
    let set1 = PieChartDataSet(entries: data.map({ (series: Series) -> PieChartDataEntry in
      return PieChartDataEntry(value: series.percentage)
    }))
    set1.colors = data.map({ (series: Series) -> UIColor in
      return series.color
    })
    let chartData: PieChartData = [set1]
    chartView.data = chartData
  }
}
```

```swift
// ios/ExpoRadialChartModule.swift
import ExpoModulesCore

public class ExpoRadialChartModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoRadialChart")

    View(ExpoRadialChartView.self) {
      Prop("data") { (view: ExpoRadialChartView, prop: [Series]) in
        view.setChartData(data: prop)
      }
    }
  }
}
```

Use the view from JavaScript:

```tsx
// src/app/index.tsx
import { ExpoRadialChartView } from '@/modules/expo-radial-chart';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <ExpoRadialChartView
      style={styles.container}
      data={[
        { color: '#ff0000', percentage: 0.5 },
        { color: '#00ff00', percentage: 0.2 },
        { color: '#0000ff', percentage: 0.3 },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## Notes

- Per the create-expo-module reference, local modules do not generate an `index.ts` barrel by default; pass `--barrel` (with `--local`) to import from the module directory as shown, or import directly from the module's `src` files.
- Native dependencies are added by editing **android/build.gradle** and **ios/ExpoRadialChart.podspec** (the published page shows the exact dependency lines in code tabs that are not preserved in the Markdown source; the lines are not reproduced here).
- `.aar` dependency, SDK 52 and later: place the **.aar** inside **android/libs** and add the file as a Gradle project from autolinking; then add the dependency to the `dependencies` list in **android/build.gradle** using the dependency's specified name with the `${project.name}$` prefix.
- `.aar` dependency, SDK 51 and earlier: place the **.aar** inside **android/libs**, add the directory as a repository, and in `dependencies` use the package path ending in `@aar` instead of the filename.
- `.xcframework` / `.framework` dependency on iOS: use the `vendored_frameworks` podspec option. The path pattern is relative to the podspec and cannot traverse the parent directory (`..`), so the framework must live inside **ios** (or a subdirectory). Make sure the `source_files` pattern matches no files inside the framework; one way is to move the Swift sources into an **ios/src** directory and set `source_files` to match only that directory.
- Since the example does not implement web, replace **src/ExpoRadialChartView.web.tsx** with a placeholder component (`<div>Not implemented</div>`).
- If a new standalone module was created, run `npm run build` in the module directory (TypeScript watch/rebuild) and run the example app from **example-expo-app**; import from `expo-radial-chart` instead of `@/modules/expo-radial-chart`.
- `Prop` is documented in the Module API reference.
- Distinct from the apple-swift and android-architecture skills (MPAndroidChart and DGCharts are third-party native libraries, not covered here).
- Source modificationDate: July 27, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [Module API Reference](./module-api.md)
- [create-expo-module](./create-expo-module.md)
- [Integrate in an existing library](./existing-library.md)
- [Additional platform support](./additional-platform-support.md)
