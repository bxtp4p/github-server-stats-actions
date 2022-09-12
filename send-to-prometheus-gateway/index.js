const core = require("@actions/core");
const github = require("@actions/github");
const prom = require("prom-client");
const fs = require("fs");

const metric_labels = ["host_name", "ghes_version"];

const gh_server_stats_dormant_users_total_gauge = new prom.Gauge({
  name: "gh_server_stats_dormant_users_total",
  help: "total number of dormant users",
  labelNames: metric_labels,
});

const gh_server_stats_commit_comments_total_gauge = new prom.Gauge({
  name: "gh_server_stats_commit_comments_total",
  help: "total number of commit comments",
  labelNames: metric_labels,
});

const gh_server_stats_gist_comments_total_gauge = new prom.Gauge({
  name: "gh_server_stats_gist_comments_total",
  help: "total number of gist comments",
  labelNames: metric_labels,
});

const gh_server_stats_issue_comments_total_gauge = new prom.Gauge({
  name: "gh_server_stats_issue_comments_total",
  help: "total number of issue comments",
  labelNames: metric_labels,
});

const gh_server_stats_pull_request_comments_total_gauge = new prom.Gauge({
  name: "gh_server_stats_pull_request_comments_total",
  help: "total number of pull request comments",
  labelNames: metric_labels,
});

const gh_server_stats_gists_total_gauge = new prom.Gauge({
  name: "gh_server_stats_gists_total",
  help: "total number of gists",
  labelNames: metric_labels,
});

const gh_server_stats_private_gists_total_gauge = new prom.Gauge({
  name: "gh_server_stats_private_gists_total",
  help: "total number of private gists",
  labelNames: metric_labels,
});

const gh_server_stats_public_gists_total_gauge = new prom.Gauge({
  name: "gh_server_stats_public_gists_total",
  help: "total number of public gists",
  labelNames: metric_labels,
});

const gh_server_stats_hooks_total_gauge = new prom.Gauge({
  name: "gh_server_stats_hooks_total",
  help: "total number of hooks",
  labelNames: metric_labels,
});

const gh_server_stats_active_hooks_total_gauge = new prom.Gauge({
  name: "gh_server_stats_active_hooks_total",
  help: "total number of active hooks",
  labelNames: metric_labels,
});

const gh_server_stats_inactive_hooks_total_gauge = new prom.Gauge({
  name: "gh_server_stats_inactive_hooks_total",
  help: "total number of inactive hooks",
  labelNames: metric_labels,
});

const gh_server_stats_issues_total_gauge = new prom.Gauge({
  name: "gh_server_stats_issues_total",
  help: "total number of issues",
  labelNames: metric_labels,
});

const gh_server_stats_open_issues_total_gauge = new prom.Gauge({
  name: "gh_server_stats_open_issues_total",
  help: "total number of open issues",
  labelNames: metric_labels,
});

const gh_server_stats_closed_issues_total_gauge = new prom.Gauge({
  name: "gh_server_stats_closed_issues_total",
  help: "total number of closed issues",
  labelNames: metric_labels,
});

const gh_server_stats_milestones_total_gauge = new prom.Gauge({
  name: "gh_server_stats_milestones_total",
  help: "total number of milestones",
  labelNames: metric_labels,
});

const gh_server_stats_open_milestones_total_gauge = new prom.Gauge({
  name: "gh_server_stats_open_milestones_total",
  help: "total number of open milestones",
  labelNames: metric_labels,
});

const gh_server_stats_closed_milestones_total_gauge = new prom.Gauge({
  name: "gh_server_stats_closed_milestones_total",
  help: "total number of closed milestones",
  labelNames: metric_labels,
});

const gh_server_stats_orgs_total_gauge = new prom.Gauge({
  name: "gh_server_stats_orgs_total",
  help: "total number of orgs",
  labelNames: metric_labels,
});

const gh_server_stats_disabled_orgs_total_gauge = new prom.Gauge({
  name: "gh_server_stats_disabled_orgs_total",
  help: "total number of disabled orgs",
  labelNames: metric_labels,
});

const gh_server_stats_teams_total_gauge = new prom.Gauge({
  name: "gh_server_stats_teams_total",
  help: "total number of teams",
  labelNames: metric_labels,
});

const gh_server_stats_team_members_total_gauge = new prom.Gauge({
  name: "gh_server_stats_team_members_total",
  help: "total number of team members",
  labelNames: metric_labels,
});

const gh_server_stats_pages_total_gauge = new prom.Gauge({
  name: "gh_server_stats_pages_total",
  help: "total number of pages",
  labelNames: metric_labels,
});

const gh_server_stats_pulls_total_gauge = new prom.Gauge({
  name: "gh_server_stats_pulls_total",
  help: "total number of pulls",
  labelNames: metric_labels,
});

const gh_server_stats_merged_pulls_total_gauge = new prom.Gauge({
  name: "gh_server_stats_merged_pulls_total",
  help: "total number of merged pulls",
  labelNames: metric_labels,
});

const gh_server_stats_mergeable_pulls_total_gauge = new prom.Gauge({
  name: "gh_server_stats_mergeable_pulls_total",
  help: "total number of mergeable pulls",
  labelNames: metric_labels,
});

const gh_server_stats_unmergeable_pulls_total_gauge = new prom.Gauge({
  name: "gh_server_stats_unmergeable_pulls_total",
  help: "total number of unmergeable pulls",
  labelNames: metric_labels,
});

const gh_server_stats_repos_total_gauge = new prom.Gauge({
  name: "gh_server_stats_repos_total",
  help: "total number of repos",
  labelNames: metric_labels,
});

const gh_server_stats_root_repos_total_gauge = new prom.Gauge({
  name: "gh_server_stats_root_repos_total",
  help: "total number of root repos",
  labelNames: metric_labels,
});

const gh_server_stats_fork_repos_total_gauge = new prom.Gauge({
  name: "gh_server_stats_fork_repos_total",
  help: "total number of fork repos",
  labelNames: metric_labels,
});

const gh_server_stats_org_repos_total_gauge = new prom.Gauge({
  name: "gh_server_stats_org_repos_total",
  help: "total number of org repos",
  labelNames: metric_labels,
});

const gh_server_stats_pushes_total_gauge = new prom.Gauge({
  name: "gh_server_stats_pushes_total",
  help: "total number of pushes",
  labelNames: metric_labels,
});

const gh_server_stats_wikis_total_gauge = new prom.Gauge({
  name: "gh_server_stats_wikis_total",
  help: "total number of wikis",
  labelNames: metric_labels,
});

const gh_server_stats_users_total_gauge = new prom.Gauge({
  name: "gh_server_stats_users_total",
  help: "total number of users",
  labelNames: metric_labels,
});

const gh_server_stats_admin_users_total_gauge = new prom.Gauge({
  name: "gh_server_stats_admin_users_total",
  help: "total number of admin users",
  labelNames: metric_labels,
});

const gh_server_stats_suspended_users_total_gauge = new prom.Gauge({
  name: "gh_server_stats_suspended_users_total",
  help: "total number of suspended users",
  labelNames: metric_labels,
});

try {
  const prom_pushgateway_url = core.getInput("prometheus-pushgateway-url");
  const server_data_file = core.getInput("server-stats-data-file");
  const server_data = JSON.parse(fs.readFileSync(server_data_file));
  const gateway = new prom.Pushgateway(prom_pushgateway_url);
  const now = new Date();

  let counter = 0;

  for (var i = 0; i < server_data.length; i++) {
    var item = server_data[i];
    var collection_date = new Date(item.collection_date);

    if (
      collection_date.getUTCFullYear() === now.getUTCFullYear() &&
      collection_date.getUTCMonth() === now.getUTCMonth() &&
      collection_date.getUTCDate() >= now.getUTCDate() - 1
    ) {
      counter++;

      gh_server_stats_dormant_users_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.dormant_users.total_dormant_users
      );

      gh_server_stats_commit_comments_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.comments.total_commit_comments
      );
      gh_server_stats_gist_comments_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.comments.total_gist_comments
      );
      gh_server_stats_issue_comments_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.comments.total_issue_comments
      );
      gh_server_stats_pull_request_comments_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.comments.total_pull_request_comments
      );

      gh_server_stats_gists_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.gists.total_gists
      );
      gh_server_stats_private_gists_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.gists.private_gists
      );
      gh_server_stats_public_gists_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.gists.public_gists
      );

      gh_server_stats_hooks_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.hooks.total_hooks
      );
      gh_server_stats_active_hooks_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.hooks.active_hooks
      );
      gh_server_stats_inactive_hooks_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.hooks.inactive_hooks
      );

      gh_server_stats_issues_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.issues.total_issues
      );
      gh_server_stats_open_issues_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.issues.open_issues
      );
      gh_server_stats_closed_issues_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.issues.closed_issues
      );

      gh_server_stats_milestones_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.milestones.total_milestones
      );
      gh_server_stats_open_milestones_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.milestones.open_milestones
      );
      gh_server_stats_closed_milestones_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.milestones.closed_milestones
      );

      gh_server_stats_orgs_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.orgs.total_orgs
      );
      gh_server_stats_disabled_orgs_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.orgs.disabled_orgs
      );
      gh_server_stats_teams_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.orgs.total_teams
      );
      gh_server_stats_team_members_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.orgs.total_team_members
      );

      gh_server_stats_pages_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.pages.total_pages
      );

      gh_server_stats_pulls_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.pulls.total_pulls
      );
      gh_server_stats_merged_pulls_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.pulls.merged_pulls
      );
      gh_server_stats_mergeable_pulls_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.pulls.mergeable_pulls
      );
      gh_server_stats_unmergeable_pulls_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.pulls.unmergeable_pulls
      );

      gh_server_stats_repos_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.repos.total_repos
      );
      gh_server_stats_root_repos_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.repos.root_repos
      );
      gh_server_stats_fork_repos_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.repos.fork_repos
      );
      gh_server_stats_org_repos_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.repos.org_repos
      );
      gh_server_stats_pushes_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.repos.total_pushes
      );
      gh_server_stats_wikis_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.repos.total_wikis
      );

      gh_server_stats_users_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.users.total_users
      );
      gh_server_stats_admin_users_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.users.admin_users
      );
      gh_server_stats_suspended_users_total_gauge.set(
        { host_name: item.host_name, ghes_version: item.ghes_version },
        item.ghe_stats.users.suspended_users
      );

      gateway.pushAdd({ jobName: github.context.action }).catch((err) => {
        core.setFailed(err.message);
      });
    }
  }

  (async function () {
    const prom_metrics = await prom.register.metrics();
    core.setOutput("prometheus-metrics", prom_metrics);
    
  })();
} catch (error) {
  core.setFailed(error.message);
}