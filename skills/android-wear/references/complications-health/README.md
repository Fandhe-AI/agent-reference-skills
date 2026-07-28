# complications-health

| Name | Description | Path |
|------|-------------|------|
| ComplicationDataSourceService | Base Service that supplies data to watch face complications (onComplicationRequest, getPreviewData, manifest metadata). | [complicationdatasourceservice.md](./complicationdatasourceservice.md) |
| ShortTextComplicationData | Complication data type for a short (≤7 char) piece of text. | [shorttextcomplicationdata.md](./shorttextcomplicationdata.md) |
| LongTextComplicationData | Complication data type for longer, unbounded text. | [longtextcomplicationdata.md](./longtextcomplicationdata.md) |
| RangedValueComplicationData | Complication data type for a numeric value within a range (e.g. percentage, gauge). | [rangedvaluecomplicationdata.md](./rangedvaluecomplicationdata.md) |
| MonochromaticImageComplicationData | Complication data type for a single-color, tintable icon. | [monochromaticimagecomplicationdata.md](./monochromaticimagecomplicationdata.md) |
| SmallImageComplicationData | Complication data type for a small, full-color image. | [smallimagecomplicationdata.md](./smallimagecomplicationdata.md) |
| NoDataComplicationData | Sent when a data source has no data to display, optionally with a placeholder. | [nodatacomplicationdata.md](./nodatacomplicationdata.md) |
| PlainComplicationText / TimeDifferenceComplicationText | Static text and live time-difference text for ComplicationData fields. | [complicationtext.md](./complicationtext.md) |
| ComplicationDataSourceUpdateRequester | Requests an immediate on-demand update instead of waiting for the poll interval. | [complicationdatasourceupdaterequester.md](./complicationdatasourceupdaterequester.md) |
| HealthServicesClient | Entry point exposing ExerciseClient / MeasureClient / PassiveMonitoringClient. | [healthservicesclient.md](./healthservicesclient.md) |
| MeasureClient | Live foreground callbacks for frequently-sampled data such as heart rate. | [measureclient.md](./measureclient.md) |
| ExerciseClient | Starts, pauses, resumes, and ends tracked exercises; delivers ExerciseUpdate callbacks. | [exerciseclient.md](./exerciseclient.md) |
| PassiveMonitoringClient | Long-running background monitoring via callback or PassiveListenerService. | [passivemonitoringclient.md](./passivemonitoringclient.md) |
| DataType | Typed identifier for a category of health/fitness data (HEART_RATE_BPM, STEPS, CALORIES, DISTANCE, ...). | [datatype.md](./datatype.md) |
| DataPointContainer / SampleDataPoint / IntervalDataPoint | Container and data point types delivered by measure/passive callbacks. | [datapointcontainer.md](./datapointcontainer.md) |
| Health Services Permissions | Required runtime permissions (BODY_SENSORS, ACTIVITY_RECOGNITION, ACCESS_FINE_LOCATION, etc.) per DataType. | [healthservicespermissions.md](./healthservicespermissions.md) |
| Simulating Health Services Data | adb commands and emulator sensor panel for synthetic sensor/exercise data. | [healthservicessimulation.md](./healthservicessimulation.md) |
