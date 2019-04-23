const { Toolkit } = require('actions-toolkit');
const notifyIssueAuthor = require('./lib/notify-issue-author');

Toolkit.run(notifyIssueAuthor, {
  event: 'issues.closed',
  secrets: ['GITHUB_TOKEN']
});
