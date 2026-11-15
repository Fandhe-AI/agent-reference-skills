---
source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/update
---

# gcloud lustre instances update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud lustre instances update

```text
NAME
    gcloud lustre instances update - updates the parameters of a single Managed
        Lustre instance

SYNOPSIS
    gcloud lustre instances update INSTANCE [--async]
        [--capacity-gib=CAPACITY_GIB] [--description=DESCRIPTION]
        [--[no-]gke-support-enabled] [--location=LOCATION]
        [--per-unit-storage-throughput=PER_UNIT_STORAGE_THROUGHPUT]
        [--request-id=REQUEST_ID] [--target-version=TARGET_VERSION]
        [--clear- --default-squash-gid=DEFAULT_SQUASH_GID
          --default-squash-mode=DEFAULT_SQUASH_MODE
          --default-squash-uid=DEFAULT_SQUASH_UID
          --access-rules=[ipAddressRanges=IPADDRESSRANGES],
          [name=NAME],[squashMode=SQUASHMODE]
          | --add-access-rules=[ipAddressRanges=IPADDRESSRANGES],
          [name=NAME],[squashMode=SQUASHMODE] --clear-access-rules
          | --remove-access-rules=[ipAddressRanges=IPADDRESSRANGES],
          [name=NAME],[squashMode=SQUASHMODE]]
        [--clear-maintenance-policy
          --maintenance-policy-exclusion-window=[endDate=ENDDATE],
          [startDate=STARTDATE],[time=TIME]
          | --add-maintenance-policy-exclusion-window=[endDate=ENDDATE],
          [startDate=STARTDATE],[time=TIME]
          --clear-maintenance-policy-exclusion-window
          | --remove-maintenance-policy-exclusion-window=[endDate=ENDDATE],
          [startDate=STARTDATE],[time=TIME]
          --maintenance-policy-weekly-windows=[dayOfWeek=DAYOFWEEK],
          [startTime=STARTTIME]
          | --add-maintenance-policy-weekly-windows=[dayOfWeek=DAYOFWEEK],
          [startTime=STARTTIME] --clear-maintenance-policy-weekly-windows
          | --remove-maintenance-policy-weekly-windows=[dayOfWeek=DAYOFWEEK],
          [startTime=STARTTIME]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--region=REGION --clear-placement-policy
          | --placement-policy=PLACEMENT_POLICY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates the parameters of a single Managed Lustre instance.

EXAMPLES
    To update the description of an instance my-instance in location
    us-central1-a run:

        $ gcloud lustre instances update my-instance \
            --location=us-central1-a --description="<updated description>"

POSITIONAL ARGUMENTS
     Instance resource - Identifier. The name of the instance. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --location on the command line.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --capacity-gib=CAPACITY_GIB
        The storage capacity of the instance in gibibytes (GiB). Allowed values
        depend on the per_unit_storage_throughput. See Performance tiers
        (https://docs.cloud.google.com/managed-lustre/docs/performance-tiers)
        for specific minimums, maximums, and step sizes for each performance
        tier.

     --description=DESCRIPTION
        A user-readable description of the instance.

     --[no-]gke-support-enabled
        Deprecated: No longer required for GKE instance creation. Indicates
        whether you want to enable support for GKE clients. By default, GKE
        clients are not supported. Use --gke-support-enabled to enable and
        --no-gke-support-enabled to disable.

     --location=LOCATION
        For resources [instance, placement-policy], provides fallback value for
        resource location attribute. When the resource's full URI path is not
        provided, location will fallback to this flag value.

     --per-unit-storage-throughput=PER_UNIT_STORAGE_THROUGHPUT
        The throughput of the instance in MBps per TiB. Valid values are 0,
        125, 250, 500, 1000. See Performance tiers
        (https://docs.cloud.google.com/managed-lustre/docs/performance-tiers)
        for more information.

        If the instance is using the Dynamic tier, this field must not be set
        or must be set to zero.

     --request-id=REQUEST_ID
        An optional request ID to identify requests. Specify a unique request
        ID so that if you must retry your request, the server will know to
        ignore the request if it has already been completed. The server will
        guarantee that for at least 60 minutes since the first request.

        For example, consider a situation where you make an initial request and
        the request times out. If you make the request again with the same
        request ID, the server can check if original operation with the same
        request ID was received, and if so, will ignore the second request.
        This prevents clients from accidentally creating duplicate commitments.

        The request ID must be a valid UUID with the exception that zero UUID
        is not supported (00000000-0000-0000-0000-000000000000).

     Arguments for the target version.

     --target-version=TARGET_VERSION
        The target version for the instance. To trigger an upgrade, specify a
        version listed in available_version, or latest for the newest version.

     IP-based access rules for the Managed Lustre instance. These options
     define the root user squash configuration.

     --clear-
        Set instance.accessRulesOptions back to default value.

     --default-squash-gid=DEFAULT_SQUASH_GID
        The user squash GID for the default access rule. This user squash GID
        applies to all root users connecting from clients that are not matched
        by any of the access rules. If not set, the default is 0 (no GID
        squash).

     --default-squash-mode=DEFAULT_SQUASH_MODE
        The squash mode for the default access rule. DEFAULT_SQUASH_MODE must
        be one of:

         no-squash
            Squash is disabled.

            If set inside an AccessRule, root users matching the
            ip_address_ranges are not squashed.

            If set as the default_squash_mode, root squash is disabled for this
            instance.

            If the default squash mode is NO_SQUASH, do not set the
            default_squash_uid or default_squash_gid, or an invalid argument
            error is returned.
         root-squash
            Root user squash is enabled.

            Not supported inside an AccessRule.

            If set as the default_squash_mode, root users not matching any of
            the access_rules are squashed to the default_squash_uid and
            default_squash_gid.

     --default-squash-uid=DEFAULT_SQUASH_UID
        The user squash UID for the default access rule. This user squash UID
        applies to all root users connecting from clients that are not matched
        by any of the access rules. If not set, the default is 0 (no UID
        squash).

     Update access_rules.

     At most one of these can be specified:

       --access-rules=[ipAddressRanges=IPADDRESSRANGES],[name=NAME],[squashMode=SQUASHMODE]
          Set access_rules to new value. The access rules for the instance.

           ipAddressRanges
              The IP address ranges to which to apply this access rule. Accepts
              non-overlapping CIDR ranges (e.g., 192.168.1.0/24) and IP
              addresses (e.g., 192.168.1.0).

           name
              The name of the access rule policy group. Must be 16 characters
              or less and include only alphanumeric characters or underscores.

           squashMode
              Squash mode for the access rule.

          Shorthand Example:

              --access-rules=ipAddressRanges=[string],name=string,squashMode=string --access-rules=ipAddressRanges=[string],name=string,squashMode=string

          JSON Example:

              --access-rules='[{"ipAddressRanges": ["string"], "name": "string", "squashMode": "string"}]'

          File Example:

              --access-rules=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-access-rules=[ipAddressRanges=IPADDRESSRANGES],[name=NAME],[squashMode=SQUASHMODE]
            Add new value to access_rules list. The access rules for the
            instance.

             ipAddressRanges
                The IP address ranges to which to apply this access rule.
                Accepts non-overlapping CIDR ranges (e.g., 192.168.1.0/24) and
                IP addresses (e.g., 192.168.1.0).

             name
                The name of the access rule policy group. Must be 16 characters
                or less and include only alphanumeric characters or
                underscores.

             squashMode
                Squash mode for the access rule.

            Shorthand Example:

                --add-access-rules=ipAddressRanges=[string],name=string,squashMode=string --add-access-rules=ipAddressRanges=[string],name=string,squashMode=string

            JSON Example:

                --add-access-rules='[{"ipAddressRanges": ["string"], "name": "string", "squashMode": "string"}]'

            File Example:

                --add-access-rules=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-access-rules
              Clear access_rules value and set to empty list.

           --remove-access-rules=[ipAddressRanges=IPADDRESSRANGES],[name=NAME],[squashMode=SQUASHMODE]
              Remove existing value from access_rules list. The access rules
              for the instance.

               ipAddressRanges
                  The IP address ranges to which to apply this access rule.
                  Accepts non-overlapping CIDR ranges (e.g., 192.168.1.0/24)
                  and IP addresses (e.g., 192.168.1.0).

               name
                  The name of the access rule policy group. Must be 16
                  characters or less and include only alphanumeric characters
                  or underscores.

               squashMode
                  Squash mode for the access rule.

              Shorthand Example:

                  --remove-access-rules=ipAddressRanges=[string],name=string,squashMode=string --remove-access-rules=ipAddressRanges=[string],name=string,squashMode=string

              JSON Example:

                  --remove-access-rules='[{"ipAddressRanges": ["string"], "name": "string", "squashMode": "string"}]'

              File Example:

                  --remove-access-rules=path_to_file.(yaml|json)

     Defines a maintenance policy for a resource.

     --clear-maintenance-policy
        Set instance.maintenancePolicy back to default value.

     Update maintenance_policy_exclusion_window.

     At most one of these can be specified:

       --maintenance-policy-exclusion-window=[endDate=ENDDATE],[startDate=STARTDATE],[time=TIME]
          Set maintenance_policy_exclusion_window to new value. The exclusion
          windows for the instance. Currently limited to 1 window.

           endDate
              End date of the exclusion period in UTC time zone. This date is
              inclusive.

               day
                  Day of a month. Must be from 1 to 31 and valid for the year
                  and month, or 0 to specify a year by itself or a year and
                  month where the day isn't significant.

               month
                  Month of a year. Must be from 1 to 12, or 0 to specify a year
                  without a month and day.

               year
                  Year of the date. Must be from 1 to 9999, or 0 to specify a
                  date without a year.

           startDate
              Start date of the exclusion period in UTC time zone. This date is
              inclusive.

               day
                  Day of a month. Must be from 1 to 31 and valid for the year
                  and month, or 0 to specify a year by itself or a year and
                  month where the day isn't significant.

               month
                  Month of a year. Must be from 1 to 12, or 0 to specify a year
                  without a month and day.

               year
                  Year of the date. Must be from 1 to 9999, or 0 to specify a
                  date without a year.

           time
              Time in UTC when the exclusion window starts on start_date and
              ends on end_date. This can be:
              - Full time OR
              - All zeros for 00:00:00 UTC.

               hours
                  Hours of a day in 24 hour format. Must be greater than or
                  equal to 0 and typically must be less than or equal to 23. An
                  API may choose to allow the value "24:00:00" for scenarios
                  like business closing time.

               minutes
                  Minutes of an hour. Must be greater than or equal to 0 and
                  less than or equal to 59.

               nanos
                  Fractions of seconds, in nanoseconds. Must be greater than or
                  equal to 0 and less than or equal to 999,999,999.

               seconds
                  Seconds of a minute. Must be greater than or equal to 0 and
                  typically must be less than or equal to 59. An API may allow
                  the value 60 if it allows leap-seconds.

          Shorthand Example:

              --maintenance-policy-exclusion-window=endDate={day=int,month=int,year=int},startDate={day=int,month=int,year=int},time={hours=int,minutes=int,nanos=int,seconds=int} --maintenance-policy-exclusion-window=endDate={day=int,month=int,year=int},startDate={day=int,month=int,year=int},time={hours=int,minutes=int,nanos=int,seconds=int}

          JSON Example:

              --maintenance-policy-exclusion-window='[{"endDate": {"day": int, "month": int, "year": int}, "startDate": {"day": int, "month": int, "year": int}, "time": {"hours": int, "minutes": int, "nanos": int, "seconds": int}}]'

          File Example:

              --maintenance-policy-exclusion-window=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-maintenance-policy-exclusion-window=[endDate=ENDDATE],[startDate=STARTDATE],[time=TIME]
            Add new value to maintenance_policy_exclusion_window list. The
            exclusion windows for the instance. Currently limited to 1 window.

             endDate
                End date of the exclusion period in UTC time zone. This date is
                inclusive.

                 day
                    Day of a month. Must be from 1 to 31 and valid for the year
                    and month, or 0 to specify a year by itself or a year and
                    month where the day isn't significant.

                 month
                    Month of a year. Must be from 1 to 12, or 0 to specify a
                    year without a month and day.

                 year
                    Year of the date. Must be from 1 to 9999, or 0 to specify a
                    date without a year.

             startDate
                Start date of the exclusion period in UTC time zone. This date
                is inclusive.

                 day
                    Day of a month. Must be from 1 to 31 and valid for the year
                    and month, or 0 to specify a year by itself or a year and
                    month where the day isn't significant.

                 month
                    Month of a year. Must be from 1 to 12, or 0 to specify a
                    year without a month and day.

                 year
                    Year of the date. Must be from 1 to 9999, or 0 to specify a
                    date without a year.

             time
                Time in UTC when the exclusion window starts on start_date and
                ends on end_date. This can be:
                o Full time OR
                o All zeros for 00:00:00 UTC.

                 hours
                    Hours of a day in 24 hour format. Must be greater than or
                    equal to 0 and typically must be less than or equal to 23.
                    An API may choose to allow the value "24:00:00" for
                    scenarios like business closing time.

                 minutes
                    Minutes of an hour. Must be greater than or equal to 0 and
                    less than or equal to 59.

                 nanos
                    Fractions of seconds, in nanoseconds. Must be greater than
                    or equal to 0 and less than or equal to 999,999,999.

                 seconds
                    Seconds of a minute. Must be greater than or equal to 0 and
                    typically must be less than or equal to 59. An API may
                    allow the value 60 if it allows leap-seconds.

            Shorthand Example:

                --add-maintenance-policy-exclusion-window=endDate={day=int,month=int,year=int},startDate={day=int,month=int,year=int},time={hours=int,minutes=int,nanos=int,seconds=int} --add-maintenance-policy-exclusion-window=endDate={day=int,month=int,year=int},startDate={day=int,month=int,year=int},time={hours=int,minutes=int,nanos=int,seconds=int}

            JSON Example:

                --add-maintenance-policy-exclusion-window='[{"endDate": {"day": int, "month": int, "year": int}, "startDate": {"day": int, "month": int, "year": int}, "time": {"hours": int, "minutes": int, "nanos": int, "seconds": int}}]'

            File Example:

                --add-maintenance-policy-exclusion-window=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-maintenance-policy-exclusion-window
              Clear maintenance_policy_exclusion_window value and set to empty
              list.

           --remove-maintenance-policy-exclusion-window=[endDate=ENDDATE],[startDate=STARTDATE],[time=TIME]
              Remove existing value from maintenance_policy_exclusion_window
              list. The exclusion windows for the instance. Currently limited
              to 1 window.

               endDate
                  End date of the exclusion period in UTC time zone. This date
                  is inclusive.

                   day
                      Day of a month. Must be from 1 to 31 and valid for the
                      year and month, or 0 to specify a year by itself or a
                      year and month where the day isn't significant.

                   month
                      Month of a year. Must be from 1 to 12, or 0 to specify a
                      year without a month and day.

                   year
                      Year of the date. Must be from 1 to 9999, or 0 to specify
                      a date without a year.

               startDate
                  Start date of the exclusion period in UTC time zone. This
                  date is inclusive.

                   day
                      Day of a month. Must be from 1 to 31 and valid for the
                      year and month, or 0 to specify a year by itself or a
                      year and month where the day isn't significant.

                   month
                      Month of a year. Must be from 1 to 12, or 0 to specify a
                      year without a month and day.

                   year
                      Year of the date. Must be from 1 to 9999, or 0 to specify
                      a date without a year.

               time
                  Time in UTC when the exclusion window starts on start_date
                  and ends on end_date. This can be:
                  * Full time OR
                  * All zeros for 00:00:00 UTC.

                   hours
                      Hours of a day in 24 hour format. Must be greater than or
                      equal to 0 and typically must be less than or equal to
                      23. An API may choose to allow the value "24:00:00" for
                      scenarios like business closing time.

                   minutes
                      Minutes of an hour. Must be greater than or equal to 0
                      and less than or equal to 59.

                   nanos
                      Fractions of seconds, in nanoseconds. Must be greater
                      than or equal to 0 and less than or equal to 999,999,999.

                   seconds
                      Seconds of a minute. Must be greater than or equal to 0
                      and typically must be less than or equal to 59. An API
                      may allow the value 60 if it allows leap-seconds.

              Shorthand Example:

                  --remove-maintenance-policy-exclusion-window=endDate={day=int,month=int,year=int},startDate={day=int,month=int,year=int},time={hours=int,minutes=int,nanos=int,seconds=int} --remove-maintenance-policy-exclusion-window=endDate={day=int,month=int,year=int},startDate={day=int,month=int,year=int},time={hours=int,minutes=int,nanos=int,seconds=int}

              JSON Example:

                  --remove-maintenance-policy-exclusion-window='[{"endDate": {"day": int, "month": int, "year": int}, "startDate": {"day": int, "month": int, "year": int}, "time": {"hours": int, "minutes": int, "nanos": int, "seconds": int}}]'

              File Example:

                  --remove-maintenance-policy-exclusion-window=path_to_file.(yaml|json)

     Update maintenance_policy_weekly_windows.

     At most one of these can be specified:

       --maintenance-policy-weekly-windows=[dayOfWeek=DAYOFWEEK],[startTime=STARTTIME]
          Set maintenance_policy_weekly_windows to new value. The weekly
          maintenance windows for the instance. Currently limited to 1 window.

           dayOfWeek
              Day of the week for the maintenance window.

           startTime
              Start time of the maintenance window in UTC time zone.

               hours
                  Hours of a day in 24 hour format. Must be greater than or
                  equal to 0 and typically must be less than or equal to 23. An
                  API may choose to allow the value "24:00:00" for scenarios
                  like business closing time.

               minutes
                  Minutes of an hour. Must be greater than or equal to 0 and
                  less than or equal to 59.

               nanos
                  Fractions of seconds, in nanoseconds. Must be greater than or
                  equal to 0 and less than or equal to 999,999,999.

               seconds
                  Seconds of a minute. Must be greater than or equal to 0 and
                  typically must be less than or equal to 59. An API may allow
                  the value 60 if it allows leap-seconds.

          Shorthand Example:

              --maintenance-policy-weekly-windows=dayOfWeek=string,startTime={hours=int,minutes=int,nanos=int,seconds=int} --maintenance-policy-weekly-windows=dayOfWeek=string,startTime={hours=int,minutes=int,nanos=int,seconds=int}

          JSON Example:

              --maintenance-policy-weekly-windows='[{"dayOfWeek": "string", "startTime": {"hours": int, "minutes": int, "nanos": int, "seconds": int}}]'

          File Example:

              --maintenance-policy-weekly-windows=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --add-maintenance-policy-weekly-windows=[dayOfWeek=DAYOFWEEK],[startTime=STARTTIME]
            Add new value to maintenance_policy_weekly_windows list. The weekly
            maintenance windows for the instance. Currently limited to 1
            window.

             dayOfWeek
                Day of the week for the maintenance window.

             startTime
                Start time of the maintenance window in UTC time zone.

                 hours
                    Hours of a day in 24 hour format. Must be greater than or
                    equal to 0 and typically must be less than or equal to 23.
                    An API may choose to allow the value "24:00:00" for
                    scenarios like business closing time.

                 minutes
                    Minutes of an hour. Must be greater than or equal to 0 and
                    less than or equal to 59.

                 nanos
                    Fractions of seconds, in nanoseconds. Must be greater than
                    or equal to 0 and less than or equal to 999,999,999.

                 seconds
                    Seconds of a minute. Must be greater than or equal to 0 and
                    typically must be less than or equal to 59. An API may
                    allow the value 60 if it allows leap-seconds.

            Shorthand Example:

                --add-maintenance-policy-weekly-windows=dayOfWeek=string,startTime={hours=int,minutes=int,nanos=int,seconds=int} --add-maintenance-policy-weekly-windows=dayOfWeek=string,startTime={hours=int,minutes=int,nanos=int,seconds=int}

            JSON Example:

                --add-maintenance-policy-weekly-windows='[{"dayOfWeek": "string", "startTime": {"hours": int, "minutes": int, "nanos": int, "seconds": int}}]'

            File Example:

                --add-maintenance-policy-weekly-windows=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-maintenance-policy-weekly-windows
              Clear maintenance_policy_weekly_windows value and set to empty
              list.

           --remove-maintenance-policy-weekly-windows=[dayOfWeek=DAYOFWEEK],[startTime=STARTTIME]
              Remove existing value from maintenance_policy_weekly_windows
              list. The weekly maintenance windows for the instance. Currently
              limited to 1 window.

               dayOfWeek
                  Day of the week for the maintenance window.

               startTime
                  Start time of the maintenance window in UTC time zone.

                   hours
                      Hours of a day in 24 hour format. Must be greater than or
                      equal to 0 and typically must be less than or equal to
                      23. An API may choose to allow the value "24:00:00" for
                      scenarios like business closing time.

                   minutes
                      Minutes of an hour. Must be greater than or equal to 0
                      and less than or equal to 59.

                   nanos
                      Fractions of seconds, in nanoseconds. Must be greater
                      than or equal to 0 and less than or equal to 999,999,999.

                   seconds
                      Seconds of a minute. Must be greater than or equal to 0
                      and typically must be less than or equal to 59. An API
                      may allow the value 60 if it allows leap-seconds.

              Shorthand Example:

                  --remove-maintenance-policy-weekly-windows=dayOfWeek=string,startTime={hours=int,minutes=int,nanos=int,seconds=int} --remove-maintenance-policy-weekly-windows=dayOfWeek=string,startTime={hours=int,minutes=int,nanos=int,seconds=int}

              JSON Example:

                  --remove-maintenance-policy-weekly-windows='[{"dayOfWeek": "string", "startTime": {"hours": int, "minutes": int, "nanos": int, "seconds": int}}]'

              File Example:

                  --remove-maintenance-policy-weekly-windows=path_to_file.(yaml|json)

     Update labels.

     At most one of these can be specified:

       --labels=[LABELS,...]
          Set labels to new value. Labels as key value pairs.

           KEY
              Keys must start with a lowercase character and contain only
              hyphens (-), underscores (_), lowercase characters, and numbers.

           VALUE
              Values must contain only hyphens (-), underscores (_), lowercase
              characters, and numbers.

          Shorthand Example:

              --labels=string=string

          JSON Example:

              --labels='{"string": "string"}'

          File Example:

              --labels=path_to_file.(yaml|json)

       Or at least one of these can be specified:

         --update-labels=[UPDATE_LABELS,...]
            Update labels value or add key value pair. Labels as key value
            pairs.

             KEY
                Keys must start with a lowercase character and contain only
                hyphens (-), underscores (_), lowercase characters, and
                numbers.

             VALUE
                Values must contain only hyphens (-), underscores (_),
                lowercase characters, and numbers.

            Shorthand Example:

                --update-labels=string=string

            JSON Example:

                --update-labels='{"string": "string"}'

            File Example:

                --update-labels=path_to_file.(yaml|json)

         At most one of these can be specified:

           --clear-labels
              Clear labels value and set to empty map.

           --remove-labels=REMOVE_LABELS
              Remove existing value from map labels. Sets remove_labels value.

              Shorthand Example:

                  --remove-labels=string,string

              JSON Example:

                  --remove-labels=["string"]

              File Example:

                  --remove-labels=path_to_file.(yaml|json)

     All arguments needed to update placement_policy.

     --region=REGION
        The region id of the resourcePolicy resource.

        To set the region attribute:
        * provide the argument --current on the command line with a fully
          specified name;
        * provide the argument --region on the command line. Must be
          specified for resource of type
          [lustre.projects.regions.resourcePolicies].

     Update placement_policy.

     At most one of these can be specified:

       --clear-placement-policy
          Clear placement_policy value and set to null.

       ResourcePolicy resource - Set placement_policy to new value.

       The placement policy name for the instance in the format of
       projects/{project}/locations/{location}/resourcePolicies/{resource_policy}
       This represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --placement-policy on the command line with a
          fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --placement-policy on the command line with a
          fully specified name;
        + provide the argument --location on the command line.

       To set the region attribute:
        + provide the argument --placement-policy on the command line with a
          fully specified name;
        + provide the argument --region on the command line. This resource
          can be one of the following types:
          [lustre.projects.locations.resourcePolicies,
          lustre.projects.regions.resourcePolicies].

       --placement-policy=PLACEMENT_POLICY
          ID of the resourcePolicy or fully qualified identifier for the
          resourcePolicy.

          To set the resource_policy attribute:
          + provide the argument --placement-policy on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the lustre/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/managed-lustre/docs

NOTES
    This variant is also available:

        $ gcloud alpha lustre instances update
```

### gcloud alpha lustre instances update

```text
NAME
    gcloud alpha lustre instances update - updates the parameters of a single
        Managed Lustre instance

SYNOPSIS
    gcloud alpha lustre instances update INSTANCE [--async]
        [--capacity-gib=CAPACITY_GIB] [--description=DESCRIPTION]
        [--[no-]gke-support-enabled] [--location=LOCATION]
        [--per-unit-storage-throughput=PER_UNIT_STORAGE_THROUGHPUT]
        [--request-id=REQUEST_ID] [--target-version=TARGET_VERSION]
        [--clear- --default-squash-gid=DEFAULT_SQUASH_GID
          --default-squash-mode=DEFAULT_SQUASH_MODE
          --default-squash-uid=DEFAULT_SQUASH_UID
          --access-rules=[ipAddressRanges=IPADDRESSRANGES],
          [name=NAME],[squashMode=SQUASHMODE]
          | --add-access-rules=[ipAddressRanges=IPADDRESSRANGES],
          [name=NAME],[squashMode=SQUASHMODE] --clear-access-rules
          | --remove-access-rules=[ipAddressRanges=IPADDRESSRANGES],
          [name=NAME],[squashMode=SQUASHMODE]]
        [--clear-maintenance-policy
          --maintenance-policy-exclusion-window=[endDate=ENDDATE],
          [startDate=STARTDATE],[time=TIME]
          | --add-maintenance-policy-exclusion-window=[endDate=ENDDATE],
          [startDate=STARTDATE],[time=TIME]
          --clear-maintenance-policy-exclusion-window
          | --remove-maintenance-policy-exclusion-window=[endDate=ENDDATE],
          [startDate=STARTDATE],[time=TIME]
          --maintenance-policy-weekly-windows=[dayOfWeek=DAYOFWEEK],
          [startTime=STARTTIME]
          | --add-maintenance-policy-weekly-windows=[dayOfWeek=DAYOFWEEK],
          [startTime=STARTTIME] --clear-maintenance-policy-weekly-windows
          | --remove-maintenance-policy-weekly-windows=[dayOfWeek=DAYOFWEEK],
          [startTime=STARTTIME]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--region=REGION --clear-placement-policy
          | --placement-policy=PLACEMENT_POLICY] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/lustre/instances/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
