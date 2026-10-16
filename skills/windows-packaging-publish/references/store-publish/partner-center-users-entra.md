# Partner Center Account Users, Groups, and Microsoft Entra ID Applications

Managing who (users, groups, Microsoft Entra ID applications) can access a Partner Center account, under Account settings > User management.

## Signature / Usage

```text
Account settings -> User management
  tabs: Users | Groups | Microsoft Entra applications
  Add users -> Create new users | Add existing users | Invite outside users
  Add user group -> Create user group | Add user group
  Add Microsoft Entra application -> Create Microsoft Entra application | Add Microsoft Entra application
Each addition ends with "Roles applicable to developer programs": choose role(s) or "Customize permissions".
```

## Options / Props

| Action | Key details |
|---|---|
| Create new user | First/last name, username, optional password recovery email; optional **Global admin**; groups; roles. A temporary password is shown once on the confirmation page |
| Add existing users / groups / applications | Multiple selections must get the same role or custom permission set; repeat for different roles |
| Invite outside users | Up to ten email addresses (comma or semicolon separated); creates a guest account in the tenant; invitee must accept |
| Reset password | Click user -> **Password reset**; changes the Entra ID password too; temporary password shown once |
| Edit | Roles/permissions affect Partner Center only; names, group membership and application Reply URL also change the Entra ID tenant |
| Remove user | **Delete from account** (keeps tenant user) or **Delete from organization** (also deletes from tenant) |
| Remove group / application | Removes Partner Center access only; not deleted from the directory |
| Create Entra application | Display name and Reply URL (max 256 characters, unique in directory) |
| Application keys | Click the application -> **Add new key** shows Client ID and Key once; **Remove** deletes a key; list shows creation and expiry dates |

## Notes

- The Partner Center account must first be associated with the organization's Microsoft Entra ID tenant. All users, groups and applications need an active account in an associated tenant. User management is per tenant; sign in with a Manager account that also has global administrator permissions for the tenant.
- Creating a user in Partner Center also creates the account in the tenant; renaming changes it in the tenant.
- With directory integration (on-premises sync), users, groups and applications can't be created in Partner Center; create them in the on-premises directory first.
- Outside (guest) users can't perform some Visual Studio tasks, such as associating an app with the Store or creating packages to upload; use **Create new users** for those, or create a new tenant.
- Entra application accounts can call the Microsoft Store services REST APIs; the Tenant ID and Client ID shown for the application are needed to obtain an Entra access token.
- Only Company accounts (linked to Entra ID) support additional users; Individual accounts do not support multiple users. Follow least privilege.
- The same tenant-association approach applies to the Windows Hardware Developer Program and Windows Desktop Application Program accounts.

## Related

- [Partner Center Roles and Custom Permissions](./partner-center-roles-permissions.md)
- [Developer Account](./developer-account.md)
- [Publish App Updates to Microsoft Store with GitHub Actions (msstore)](./msstore-cli-github-actions.md)
