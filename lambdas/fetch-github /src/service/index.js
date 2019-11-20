const { fetchGithubData } = require("./retrieve");
const { normalizeGithubData } = require("./normalize");

class GithubService {
  constructor(fetchGithubData, normalizeResponse) {
    this.fetch = fetchGithubData;
    this.normalize = normalizeResponse;
  }
  retrieve() {
    return this.fetch().then(response => {
      const { data, errors } = this.normalize(response);
      return {
        data: JSON.stringify(data),
        errors: JSON.stringify(errors)
      };
    });
  }
}

exports.githubService = new GithubService(fetchGithubData, normalizeGithubData);
