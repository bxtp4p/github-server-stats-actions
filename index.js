const core = require('@actions/core');
const github = require('@actions/github');
const http = require('@actions/http-client');
const prom = require('prom-client');

const metric_labels = ['host_name', 'ghes_version'];

const total_dormant_users_gauge = new prom.Gauge({
  name: 'total_dormant_users',
  help: 'total number of dormant users',
  labelNames: metric_labels,
});

const total_commit_comments_gauge = new prom.Gauge({
  name: 'total_commit_comments',
  help: 'total number of commit comments',
  labelNames: metric_labels,
});

const total_gist_comments_gauge = new prom.Gauge({  
  name: 'total_gist_comments',
  help: 'total number of gist comments',
  labelNames: metric_labels,
});

const total_issue_comments_gauge = new prom.Gauge({
  name: 'total_issue_comments',
  help: 'total number of issue comments',
  labelNames: metric_labels,
});

const total_pull_request_comments_gauge = new prom.Gauge({
  name: 'total_pull_request_comments',
  help: 'total number of pull request comments',
  labelNames: metric_labels,
});

const total_gists_gauge = new prom.Gauge({
  name: 'total_gists',
  help: 'total number of gists',
  labelNames: metric_labels,
});

const total_private_gists_gauge = new prom.Gauge({
  name: 'total_private_gists',
  help: 'total number of private gists',
  labelNames: metric_labels,
});

const total_public_gists_gauge = new prom.Gauge({
  name: 'total_public_gists',
  help: 'total number of public gists',
  labelNames: metric_labels,
});

const total_hooks_gauge = new prom.Gauge({
  name: 'total_hooks',
  help: 'total number of hooks',
  labelNames: metric_labels,
});

const total_active_hooks_gauge = new prom.Gauge({
  name: 'total_active_hooks',
  help: 'total number of active hooks',
  labelNames: metric_labels,
});

const total_inactive_hooks_gauge = new prom.Gauge({
  name: 'total_inactive_hooks',
  help: 'total number of inactive hooks',
  labelNames: metric_labels,
});

const total_issues_gauge = new prom.Gauge({
  name: 'total_issues',
  help: 'total number of issues',
  labelNames: metric_labels,
});

const total_open_issues_gauge = new prom.Gauge({
  name: 'total_open_issues',
  help: 'total number of open issues',
  labelNames: metric_labels,
});

const total_closed_issues_gauge = new prom.Gauge({
  name: 'total_closed_issues',
  help: 'total number of closed issues',
  labelNames: metric_labels,
});

const total_milestones_gauge = new prom.Gauge({
  name: 'total_milestones',
  help: 'total number of milestones',
  labelNames: metric_labels,
});

const total_open_milestones_gauge = new prom.Gauge({
  name: 'total_open_milestones',
  help: 'total number of open milestones',
  labelNames: metric_labels,
});

const total_closed_milestones_gauge = new prom.Gauge({
  name: 'total_closed_milestones',
  help: 'total number of closed milestones',
  labelNames: metric_labels,
});

const total_orgs_gauge = new prom.Gauge({
  name: 'total_orgs',
  help: 'total number of orgs',
  labelNames: metric_labels,
});

const total_disabled_orgs_gauge = new prom.Gauge({
  name: 'total_disabled_orgs',
  help: 'total number of disabled orgs',
  labelNames: metric_labels,
});

const total_teams_gauge = new prom.Gauge({
  name: 'total_teams',
  help: 'total number of teams',
  labelNames: metric_labels,
});

const total_team_members_gauge = new prom.Gauge({
  name: 'total_team_members',
  help: 'total number of team members',
  labelNames: metric_labels,
});

const total_pages_gauge = new prom.Gauge({
  name: 'total_pages',
  help: 'total number of pages',
  labelNames: metric_labels,
});

const total_pulls_gauge = new prom.Gauge({
  name: 'total_pulls',
  help: 'total number of pulls',
  labelNames: metric_labels,
});

const total_merged_pulls_gauge = new prom.Gauge({
  name: 'total_merged_pulls',
  help: 'total number of merged pulls',
  labelNames: metric_labels,
});

const total_mergeable_pulls_gauge = new prom.Gauge({
  name: 'total_mergeable_pulls',
  help: 'total number of mergeable pulls',
  labelNames: metric_labels,
});

const total_unmergeable_pulls_gauge = new prom.Gauge({
  name: 'total_unmergeable_pulls',
  help: 'total number of unmergeable pulls',
  labelNames: metric_labels,
});

const total_repos_gauge = new prom.Gauge({
  name: 'total_repos',
  help: 'total number of repos',
  labelNames: metric_labels,
});

const total_root_repos_gauge = new prom.Gauge({
  name: 'total_root_repos',
  help: 'total number of root repos',
  labelNames: metric_labels,
});

const total_fork_repos_gauge = new prom.Gauge({
  name: 'total_fork_repos',
  help: 'total number of fork repos',
  labelNames: metric_labels,
});

const total_org_repos_gauge = new prom.Gauge({
  name: 'total_org_repos',
  help: 'total number of org repos',
  labelNames: metric_labels,
});

const total_pushes_gauge = new prom.Gauge({
  name: 'total_pushes',
  help: 'total number of pushes',
  labelNames: metric_labels,
});

const total_wikis_gauge = new prom.Gauge({
  name: 'total_wikis',
  help: 'total number of wikis',
  labelNames: metric_labels,
});

const total_users_gauge = new prom.Gauge({
  name: 'total_users',
  help: 'total number of users',
  labelNames: metric_labels,
});

const total_admin_users_gauge = new prom.Gauge({
  name: 'total_admin_users',
  help: 'total number of admin users',
  labelNames: metric_labels,
});

const total_suspended_users_gauge = new prom.Gauge({
  name: 'total_suspended_users',
  help: 'total number of suspended users',
  labelNames: metric_labels,
});

try {
  const token = core.getInput('personal-access-token');
  const slug = core.getInput('enterprise-or-organization');
  const prom_pushgateway_url = core.getInput('prometheus-pushgateway-url');
  let gateway = new prom.Pushgateway(prom_pushgateway_url);
  
  const httpClient = new http.HttpClient();

  httpClient.requestOptions = {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'github-server-stats-prom-exporter-action'
    }
  };
  
  (async function () {
    const response = await httpClient.get(`${github.context.apiUrl}/enterprise-installation/${slug}/server-statistics`);
    const body = await response.readBody();
    
    if (response.message.statusCode !== 200) {
      core.setFailed(response.message.statusMessage);
    }
    
    return JSON.parse(body);
  }())
  .then(function (data) {
    const now = new Date();
    console.log("Total number of records returned from API: ", data.length);

    let counter = 0;
      
    for(var i=0; i<data.length; i++) {
      var item = data[i];
      var collection_date = new Date(item.collection_date);
      
      if (collection_date.getUTCFullYear() === now.getUTCFullYear() 
          && collection_date.getUTCMonth() === now.getUTCMonth() 
          && collection_date.getUTCDate() === now.getUTCDate() - 1) {

          counter++;

          total_dormant_users_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.dormant_users.total_dormant_users);

          total_commit_comments_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.comments.total_commit_comments);
          total_gist_comments_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.comments.total_gist_comments);
          total_issue_comments_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.comments.total_issue_comments);
          total_pull_request_comments_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.comments.total_pull_request_comments);

          total_gists_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.gists.total_gists);
          total_private_gists_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.gists.private_gists);
          total_public_gists_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.gists.public_gists);

          total_hooks_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.hooks.total_hooks);
          total_active_hooks_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.hooks.active_hooks);  
          total_inactive_hooks_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.hooks.inactive_hooks);  

          total_issues_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.issues.total_issues); 
          total_open_issues_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.issues.open_issues); 
          total_closed_issues_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.issues.closed_issues); 

          total_milestones_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.milestones.total_milestones);
          total_open_milestones_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.milestones.open_milestones);
          total_closed_milestones_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.milestones.closed_milestones);

          total_orgs_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.orgs.total_orgs);
          total_disabled_orgs_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.orgs.disabled_orgs);
          total_teams_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.orgs.total_teams);
          total_team_members_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.orgs.total_team_members);

          total_pages_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.pages.total_pages);

          total_pulls_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.pulls.total_pulls);
          total_merged_pulls_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.pulls.merged_pulls);
          total_mergeable_pulls_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.pulls.mergeable_pulls);
          total_unmergeable_pulls_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.pulls.unmergeable_pulls);

          total_repos_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.repos.total_repos);  
          total_root_repos_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.repos.root_repos);
          total_fork_repos_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.repos.fork_repos);
          total_org_repos_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.repos.org_repos);
          total_pushes_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.repos.total_pushes);
          total_wikis_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.repos.total_wikis);

          total_users_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.users.total_users);
          total_admin_users_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.users.admin_users);
          total_suspended_users_gauge.set({ host_name: item.host_name, ghes_version: item.ghes_version }, item.ghe_stats.users.suspended_users);

          gateway.pushAdd({ jobName: github.context.action }).catch(err => {
            core.setFailed(err.message);
          });
      }

      console.log(`Number of records converted to metrics: ${counter}`);
    }

    (async function () {
      const prom_metrics = await prom.register.metrics();
      core.setOutput('prom_metrics', prom_metrics);
    })();
    
  });
  
} catch (error) {
  core.setFailed(error.message);
}