exports.normalizeGithubData = ({ errors, data }) => {
  if (errors) {
    return { errors };
  }
  const {
    viewer: {
      repositoriesContributedTo: { nodes },
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
    }
  };
};
