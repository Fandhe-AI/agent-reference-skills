# lifecycle

| Name | Description | Path |
|------|-------------|------|
| Application | `Microsoft.UI.Xaml.Application`, `Application.Current`, `OnLaunched` entry point | [application.md](./application.md) |
| AppInstance | Instance identity, `GetCurrent`, `GetInstances`, `Restart`, `Activated` event | [app-instance.md](./app-instance.md) |
| AppActivationArguments / ExtendedActivationKind | Activation payload and activation kind enum | [app-activation-arguments.md](./app-activation-arguments.md) |
| Rich activation (ActivationRegistrationManager) | Register/unregister for file type, protocol, startup activation | [rich-activation.md](./rich-activation.md) |
| Single-instancing and multi-instancing | `FindOrRegisterForKey` + `RedirectActivationToAsync` patterns | [single-instancing.md](./single-instancing.md) |
| PowerManager | Battery, power source, display, suspend/idle state notifications | [power-manager.md](./power-manager.md) |
