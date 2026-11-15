---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/private-tutorials
---

# Private tutorials

Host a Cloud Shell tutorial in a private Git repository (the guide uses Secure Source Manager) and give your users an Open in Cloud Shell link.

## Signature / Usage

Any Git repository hosting service can be used. To use Secure Source Manager, you must enable billing on your Google Cloud project.

### Create a private Git repository

1. Launch the Cloud Shell terminal. For a standalone Cloud Shell session, use shell.cloud.google.com.

2. Create a Secure Source Manager instance if you don't already have one (it can take up to 60 minutes to create the instance):

   ```bash
   gcloud source-manager instances create INSTANCE_ID \
       --region=LOCATION
   ```

   - `INSTANCE_ID`: the ID of the Secure Source Manager instance.
   - `LOCATION`: the region where you are creating the instance, for example `us-central1`.

3. To access the instance through its web interface, copy the following URL into your browser address bar (replace `PROJECT_NUMBER` with the instance's Google Cloud project number):

   ```bash
   INSTANCE_ID-PROJECT_NUMBER.LOCATION.sourcemanager.dev
   ```

4. Create a private repository (replace `REPO_ID` with the ID of the repository):

   ```bash
   gcloud source-manager repos create REPO_ID \
       --instance=INSTANCE_ID \
       --region=LOCATION
   ```

5. Add the Secure Source Manager authentication helper to your global Git config (see "Set up your credentials" in the Secure Source Manager create-clone-repository guide).

6. Clone your repository to Cloud Shell (replace `PROJECT_ID` with the instance's Google Cloud project ID):

   ```bash
   git clone https://INSTANCE_ID-PROJECT_NUMBER-git.LOCATION.sourcemanager.dev/PROJECT_ID/REPO_ID.git
   ```

7. Move your tutorial file to your locally created repository (replace `PATH_TO_TUTORIAL` with the path to your private tutorial):

   ```bash
   mv PATH_TO_TUTORIAL REPO_ID/PATH_TO_TUTORIAL
   ```

8. Go to your local repository:

   ```bash
   cd REPO_ID
   ```

9. Add, commit, and push the tutorial files:

   ```bash
   git add .
   git commit -m "Add private tutorial to Secure Source Manager"
   git push origin main
   ```

10. You can view your repository in the web interface.

### Create an Open in Cloud Shell link

For a tutorial hosted in a Secure Source Manager repository, define the `cloudshell_git_repo` parameter with the HTTPS URL of your repository:

```bash
https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://INSTANCE_ID-PROJECT_NUMBER-git.LOCATION.sourcemanager.dev/PROJECT_ID/REPO_ID.git
```

Style the link as a button and embed it in your documentation:

```bash
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://INSTANCE_ID-PROJECT_NUMBER-git.LOCATION.sourcemanager.dev/PROJECT_ID/REPO_ID.git)
```

### Customize tutorials with add-on tools

You can create a Docker image that functions as a custom Cloud Shell environment with the additional packages and custom configurations you want available to your users. The source gives no commands for this step.

## Notes

- Secure Source Manager is a billable service (billing must be enabled on the project). The first command creates an instance that can take up to 60 minutes to provision; check Secure Source Manager pricing before running it.
- The URL and button snippets are marked `bash` in the source although they are a URL and Markdown, not shell commands; kept as in the source. This page uses `open-btn.svg`, while the "Writing tutorials" page uses `open-btn.png`.
- Product details for Secure Source Manager: see the Secure Source Manager documentation (not covered in this skill).
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/private-tutorials (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [writing-tutorials.md](./writing-tutorials.md)
- [style-guide.md](./style-guide.md)
