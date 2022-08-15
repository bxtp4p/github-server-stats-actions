# GitHub Server Stats Prometheus Exporter Action

This action exports [GitHub Server Stats](https://docs.github.com/en/rest/enterprise-admin/admin-stats) to a [Prometheus Pushgateway](https://github.com/prometheus/pushgateway) which can then be [scraped by Prometheus](https://prometheus.io/docs/instrumenting/pushing/).

Best used on a schedule, as can be seen in the [example workflow](./.github/workflows/main.yml). 

## Metrics

All metrics are labeled with the following labels:

- host_name
- ghes_version

The following metrics are exported:

- total_dormant_users
- total_commit_comments
- total_gist_comments
- total_issue_comments
- total _pull_request_comments
- total_gists
- total_private_gists
- total_public_gists
- total_hooks
- total_active_hooks
- total_inactive_hooks
- total_issues
- total_open_issues
- total_closed_issues
- total_milestones
- total_open_milestones
- total_closed_milestones
- total_orgs
- total_disabled_orgs
- total_teams
- total_team_members
- total_pages
- total_pulls
- total_mergeable_pulls
- total_unmergeable_pulls
- total_repos
- total_root_repos
- total_pushes
- total_wikis
- total_users
- total_admin_users
- total_suspended_users



## Usage

See [action.yml](./action.yml)

```
steps:
      - uses: bxtp4p/github-server-stats-prom-exporter-action@main
        with:
          personal-access-token: ${{ secrets.ACCESS_TOKEN }}
          enterprise-or-organization: 'your-enterprise-or-organization'
          prometheus-pushgateway-url: 'http://localhost:9091'
```

## Inputs

### `personal-access-token`

**Required** The [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to use to make the call the the GitHub API to retrieve the [Server Stats](https://docs.github.com/en/rest/enterprise-admin/admin-stats). Must include `read:enterprise` and/or `read:org` scopes, depending on the enterprise or organization you want to query.

### `enterprise-or-organization`

**Required** The slug of the enterprise or organization to retrieve the stats for.

### `prometheus-pushgateway-url`

**Required** The URL of the Prometheus Pushgateway to send the metrics to. For example, `http://localhost:9091`.


## Outputs

### `prom_metrics`

The set of metrics sent to the Prometheus Pushgateway. 
