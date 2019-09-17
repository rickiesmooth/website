const { githubService } = require("./service");

exports.handler = async () => {
  const { data, errors } = await githubService.retrieve();
  return {
    body: data || errors,
    statusCode: errors ? 501 : 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
};
