const url = require("url");

exports.normalizeGithubData = ({ errors, data }) => {
  if (errors) {
    return { errors };
  }
  const {
    viewer: {
      pullRequests: { nodes },
      itemShowcase: { items }
    }
  } = data;
  return {
    data: {
      showcaseItems: items.edges.map(({ node }) => {
        const {
          repositoryTopics: { edges },
          ...rest
        } = node;
        return { ...rest, topics: edges.map(edge => edge.node.topic.name) };
      }),
      contributions: nodes
        .filter(pr => {
          if (
            !pr.url.includes("/vigour-io/") &&
            !pr.url.includes("/rickiesmooth/") &&
            !pr.url.includes("/ubertrace/")
          ) {
            return true;
          }
        })
        .map(pr => {
          const parsed = url.parse(pr.url);
          const [_, owner, repoName] = parsed.pathname.split("/");
          return {
            url: pr.url,
            repo: [owner, repoName].join("/")
          };
        })
    }
  };
};
