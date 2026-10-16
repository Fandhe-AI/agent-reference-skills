# Share certificates between Windows apps

Quickstart for authenticating multiple Windows apps to a web service with the same client certificate, including importing a PFX into the user certificate store. Client is a WinUI 3 app; service is an ASP.NET Core web API.

## Signature / Usage

Import a PFX into the user certificate store:

```cs
await CertificateEnrollmentManager.UserCertificateEnrollmentManager.ImportPfxDataAsync(
      pfxCert,                       // base64 string of the PFX file
      PfxPassword.Password,
      ExportOption.Exportable,
      KeyProtectionLevel.NoConsent,
      InstallOptions.DeleteExpired,
      "Import Pfx");
```

Call the secured service with a client certificate (.NET `HttpClient`):

```cs
var certificate = new X509Certificate2(Convert.FromBase64String(pfxCert), PfxPassword.Password);

var handler = new HttpClientHandler();
handler.ClientCertificates.Add(certificate);
handler.ClientCertificateOptions = ClientCertificateOption.Automatic;

var client = new HttpClient(handler);
var response = await client.GetAsync(requestUri);
```

Server side (ASP.NET Core): require client certificates and validate by thumbprint.

```csharp
builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.ConfigureHttpsDefaults(options =>
    {
        options.ClientCertificateMode = ClientCertificateMode.RequireCertificate;
        options.AllowAnyClientCertificate();
    });
});

builder.Services.AddAuthentication(CertificateAuthenticationDefaults.AuthenticationScheme)
   .AddCertificate(options =>
   {
       options.AllowedCertificateTypes = CertificateTypes.SelfSigned;
       // OnCertificateValidated: call context.Success() or context.Fail("Invalid certificate")
   });
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| EnterpriseAuthentication | app capability | Required in `Package.appxmanifest`. |
| SharedUserCertificates | app capability | Required in `Package.appxmanifest`. |
| Microsoft.AspNetCore.Authentication.Certificate | NuGet package | Certificate authentication middleware for the web service. |
| New-SelfSignedCertificate / Export-PfxCertificate | PowerShell cmdlets | Create a self-signed test certificate and export it to PFX; keep the thumbprint for server-side validation. |

## Notes

- No Windows App SDK APIs for managing certificates exist yet; use the WinRT APIs (`Windows.Security.Cryptography.Certificates`) and WinRT storage APIs (`FileOpenPicker` initialized with the window HWND via `InitializeWithWindow`) for the PFX import.
- The WinRT `Windows.Web.Http.HttpClient` does not support client certificates; use .NET `System.Net.Http.HttpClient`.
- Some certificates are password protected, so provide a way to enter the PFX password.
- The sample hard-codes allowed thumbprints; load valid thumbprints from a secure location in real code.

## Related

- [Certificate](./certificate.md)
- [CertificateEnrollmentManager](./certificate-enrollment-manager.md)
- [App capabilities](./app-capabilities.md)
