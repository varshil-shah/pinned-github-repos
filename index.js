const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const query = `
  query ($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6) {
        nodes {
          ... on Repository {
            name
            description
            repositoryLink: url
            stars: stargazerCount
            forkCount
            projectLink: homepageUrl
            githubBannerImage: openGraphImageUrl
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

exports.handler = async (event) => {
  const username = event.pathParameters.username;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Username is required!" }),
    };
  }

  try {
    const { data } = await axios.post(
      "https://api.github.com/graphql",
      {
        query,
        variables: { username },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.errors) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: "error",
          message: data.errors[0].message,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "success",
        results: data.data.user.pinnedItems.nodes.length,
        data: data.data.user.pinnedItems.nodes,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "error",
        message: error.message || "Something went wrong!",
      }),
    };
  }
};
