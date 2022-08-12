# github-server-stats-prom-exporter

This action exports [GitHub Server Stats](https://docs.github.com/en/rest/enterprise-admin/admin-stats) to a Prometheus Pushgateway and can then be scraped by Prometheus.

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
      - uses: bxtp4p/github-server-stats-prom-exporter@main
        with:
          personal-access-token: ${{ secrets.ACCESS_TOKEN }}
          enterprise-or-organization: 'your-enterprise-or-organization'
          prometheus-pushgateway-url: 'https://prometheus-pushgateway.example.com'
```

## Inputs

### `personal-access-token`

**Required** The access token to use to make the call the the GitHub API to retrieve the [Server Stats](https://docs.github.com/en/rest/enterprise-admin/admin-stats). Must include `read:enterprise` and/or `read:org` scopes, depending on the enterprise or organization you want to query.

### `enterprise-or-organization`

**Required** The slug of the enterprise or organization to retrieve the stats for.

### `prometheus-pushgateway-url`

**Required** The URL of the Prometheus Pushgateway to send the metrics to.
