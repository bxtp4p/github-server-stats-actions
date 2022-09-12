const core = require('@actions/core');
const github = require('@actions/github');
const http = require('@actions/http-client');
const fs = require('fs');
const { env } = require('process');

try {
  const token = core.getInput('personal-access-token');
  const slug = core.getInput('enterprise-or-organization');
  
  const httpClient = new http.HttpClient();

  httpClient.requestOptions = {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'get-server-stats-action'
    }
  };
  
  (async function () {
    const response = await httpClient.get(`${github.context.apiUrl}/enterprise-installation/${slug}/server-statistics`);
    const body = await response.readBody();
    
    if (response.message.statusCode !== 200) {
      core.setFailed(response.message.statusMessage);
    }

    const filename = core.getInput('filename') ?? 'server-stats-data.json';

    fs.writeFileSync(filename, body);
    core.setOutput('server-stats-data-file', fs.realpathSync(filename));
    
  }())
} catch (error) {
  core.setFailed(error.message);
}