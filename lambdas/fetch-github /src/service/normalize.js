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
        .filter(
          pr =>
            !pr.url.includes("/vigour-io/") &&
            !pr.url.includes("/rickiesmooth/") &&
            !pr.url.includes("/ubertrace/")
        )
        .map(pr => {
          const [_, owner, repoName] = url.parse(pr.url).pathname.split("/");
          return {
            url: pr.url,
            repo: [owner, repoName].join("/")
          };
        })
    }
  };
};
