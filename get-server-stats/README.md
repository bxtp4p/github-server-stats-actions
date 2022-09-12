# get-server-stats

This action retrieves Server Stats data from GitHub and saves it to a file. The file can be uploaded as an artifact and/or can be combined with other actions to send the data to other systems, like Prometheus.

See this [workflow](../.github/workflows/main.yml) for an example.


## Inputs

### `personal-access-token`

**Required** The [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) used to call the GitHub API and retrieve the [Server Stats](https://docs.github.com/en/rest/enterprise-admin/admin-stats). Must include `read:enterprise` and/or `read:org` scopes, depending if you are retrieving an enterprise or an organization.

### `enterprise-or-organization`

**Required** The slug of the enterprise or organization to retrieve the stats for.

### `filename`

**Required** The name of the file to write the server stats data to.

## Outputs

### `server-stats-data-file`

The path to the downloaded server stats data file.
