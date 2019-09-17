const { httpsRequest } = require("@lambdas/common");

const githubOptions = {
  hostname: "api.github.com",
  path: "/graphql",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "node",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
  }
};

const query = JSON.stringify({
  query: `
    {
      viewer {
        repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
          nodes {
            nameWithOwner
            url
          }
        }
        itemShowcase {
          items(first:5) {
            edges {
              node {
                ... on Repository {
                  name
                  url
                  descriptionHTML
                  repositoryTopics(first: 8) {
                    edges {
                      node {
                        topic {
													name
												}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `
});

exports.fetchGithubData = () => {
  if (!process.env.GITHUB_TOKEN) {
    return { errors: "No GitHub API key provided" };
  }
  return httpsRequest(githubOptions, query)
    .then(res => JSON.parse(res))
    .catch(e => ({ errors: e.message }));
};
