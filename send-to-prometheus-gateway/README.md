# send-to-prometheus-gateway

Converts GitHub Server Stats data file to Prometheus metrics and sends them to a Prometheus Push Gateway.

See this [workflow](../.github/workflows/main.yml) for an example.

## Metrics

All metrics are labeled with the following labels:

- host_name
- ghes_version

The following metrics are exported:

- gh_server_stats_dormant_users_total
- gh_server_stats_commit_comments_total
- gh_server_stats_gist_comments_total
- gh_server_stats_issue_comments_total
- gh_server_stats_pull_request_comments_total
- gh_server_stats_gists_total
- gh_server_stats_private_gists_total
- gh_server_stats_public_gists_total
- gh_server_stats_hooks_total
- gh_server_stats_active_hooks_total
- gh_server_stats_inactive_hooks_total
- gh_server_stats_issues_total
- gh_server_stats_open_issues_total
- gh_server_stats_closed_issues_total
- gh_server_stats_milestones_total
- gh_server_stats_open_milestones_total
- gh_server_stats_closed_milestones_total
- gh_server_stats_orgs_total
- gh_server_stats_disabled_orgs_total
- gh_server_stats_teams_total
- gh_server_stats_team_members_total
- gh_server_stats_pages_total
- gh_server_stats_pulls_total
- gh_server_stats_mergeable_pulls_total
- gh_server_stats_unmergeable_pulls_total
- gh_server_stats_repos_total
- gh_server_stats_root_repos_total
- gh_server_stats_pushes_total
- gh_server_stats_wikis_total
- gh_server_stats_users_total
- gh_server_stats_admin_users_total
- gh_server_stats_suspended_users_total

## Inputs

### `prometheus-pushgateway-url`

**Required** The URL of the Prometheus Push Gateway to send the metrics to. For example, `http://localhost:9091`.

### `server-stats-data-file`

**Required** The path to the server stats data file to be sent to Prometheus.

## Outputs

### `prometheus-metrics`

The Prometheus metrics that were sent to the Prometheus.
