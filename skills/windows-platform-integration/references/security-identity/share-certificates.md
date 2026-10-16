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

Server side (ASP.NET Core): require client certificates and validate by thumbprint. Validation service:

```cs
using System.Security.Cryptography.X509Certificates;

public class SecureCertificateValidationService
{
    public bool ValidateCertificate(X509Certificate2 clientCertificate)
    {
        // Values are hard-coded for this example.
        // You should load your valid thumbprints from a secure location.
        string[] allowedThumbprints = { "YOUR_CERTIFICATE_THUMBPRINT_1", "YOUR_CERTIFICATE_THUMBPRINT_2" };
        if (allowedThumbprints.Contains(clientCertificate.Thumbprint))
        {
            return true;
        }

        return false;
    }
}
```

`Program.cs` (excerpt of the `Main` method):

```csharp
// Add our certificate validation service to the DI container.
builder.Services.AddTransient<SecureCertificateValidationService>();

builder.Services.Configure<KestrelServerOptions>(options =>
{
    // Configure Kestrel to require a client certificate.
    options.ConfigureHttpsDefaults(options =>
    {
        options.ClientCertificateMode = ClientCertificateMode.RequireCertificate;
        options.AllowAnyClientCertificate();
    });
});

// Add certificate authentication middleware.
builder.Services.AddAuthentication(
CertificateAuthenticationDefaults.AuthenticationScheme)
   .AddCertificate(options =>
{
    options.AllowedCertificateTypes = CertificateTypes.SelfSigned;
    options.Events = new CertificateAuthenticationEvents
    {
        // Validate the certificate with the validation service.
        OnCertificateValidated = context =>
        {
            var validationService = context.HttpContext.RequestServices.GetService<SecureCertificateValidationService>();

            if (validationService.ValidateCertificate(context.ClientCertificate))
            {
                context.Success();
            }
            else
            {
                context.Fail("Invalid certificate");
            }

            return Task.CompletedTask;
        },
        OnAuthenticationFailed = context =>
        {
            context.Fail("Invalid certificate");
            return Task.CompletedTask;
        }
    };
 });

 var app = builder.Build();

 // Add authentication/authorization middleware.
 app.UseHttpsRedirection();
 app.UseAuthentication();
 app.UseAuthorization();

 app.MapControllers().RequireAuthorization(); // Added: the official sample omits this; without it a failed certificate authentication does not block access.
 app.Run();
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
- This guide's client sample uses .NET `System.Net.Http.HttpClient` with `HttpClientHandler.ClientCertificates`; using .NET here is the guide's choice. With the WinRT `Windows.Web.Http.HttpClient`, the client certificate is supplied through `HttpBaseProtocolFilter.ClientCertificate` (see [HttpBaseProtocolFilter](../networking/http-base-protocol-filter.md)), and when the service requests client authentication Windows queries the certificate store so the user can pick a certificate.
- `AllowAnyClientCertificate()` and `CertificateTypes.SelfSigned` accept any self-signed certificate at the TLS / middleware layer. The thumbprint check in `OnCertificateValidated` (which calls `context.Fail("Invalid certificate")` on mismatch) restricts access only when the endpoint requires authentication: `[Authorize]` on `BankController`, `MapControllers().RequireAuthorization()`, or a `FallbackPolicy` requiring an authenticated user. The official sample has none of these, so the snippet above adds `RequireAuthorization()`.
- The protected endpoint in the official guide is the `BankController` (`[Route("bank")]`, `Login` action).
- Some certificates are password protected, so provide a way to enter the PFX password.
- The sample hard-codes allowed thumbprints; load valid thumbprints from a secure location in real code.

## Related

- [Certificate](./certificate.md)
- [CertificateEnrollmentManager](./certificate-enrollment-manager.md)
- [App capabilities](./app-capabilities.md)
- [HttpBaseProtocolFilter](../networking/http-base-protocol-filter.md)
- [Official docs: Share certificates between Windows apps](https://learn.microsoft.com/en-us/windows/apps/develop/security/share-certificates)
