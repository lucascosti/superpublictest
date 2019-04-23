const nunjucks = require('nunjucks');

// Return true if author of issue was mentioned since the issue was closed
const authorMentionedSinceIssueClosed = async (github, { owner, repo, number, since, author }) => {
  // Get issue comments since the issue was closed
  const { data: comments } = await github.issues.listComments({
    owner,
    repo,
    number,
    since
  });

  const re = new RegExp(`@${author}\\b`, 'g');
  // Return true if the first comment mentions the author
  return comments.length > 0 && re.test(comments[0].body);
};

// Notifies author of an issue when their issue gets closed
const notifyIssueAuthor = async tools => {
  const {
    github,
    context: { actor, payload }
  } = tools;

  // Get repo owner and repo name
  const {
    owner: { login: owner },
    name: repo
  } = payload.repository;

  // Get issue author, number, and closed_at date
  const {
    user: { login: author },
    number: issueNumber,
    closed_at: issueClosedAt
  } = payload.issue;

  // Check if the person closing the issue is the author.
  if (actor === author) {
    tools.exit.neutral('Issue closed by author');
  }

  // Check if the author is already mentioned by the person closing the issue.
  if ( await authorMentionedSinceIssueClosed(github, {
    owner,
    repo,
    number: issueNumber,
    since: issueClosedAt,
    author
  })) {
    tools.exit.neutral('Author previously mentioned');
  }

  // Comment on the issue, letting the author know the issue is now closed
  const { template = '@, this issue was closed by @.'} = tools.arguments;

  const body = nunjucks.renderString(template, { author, actor });
  await github.issues.createComment({ owner, repo, number: issueNumber, body });
  tools.exit.success('Author was notified');
};

module.exports = notifyIssueAuthor;
