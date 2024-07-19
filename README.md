### Get pinned github repositories

The projects in build using NodeJS and AWS Serverless Framework. It's a simple API that fetches the pinned repositories of a user from Github.

Make a request on this route with the username of the user you want to get the pinned repositories.

```plaintext
https://zu6jm2s7ba.execute-api.us-east-1.amazonaws.com/dev/user/{USERNAME}
```

The following is the response format:

```json
{
  "status": "success",
  "results": 6,
  "data": [
    {
      "name": "<REPO_NAME>",
      "description": "<REPO_DESCRIPTION>",
      "repositoryLink": "<REPO_LINK>",
      "stars": 1,
      "forkCount": 1,
      "projectLink": "<PROJECT_LINK>",
      "githubBannerImage": "<BANNER_IMAGE>",
      "primaryLanguage": {
        "name": "JavaScript",
        "color": "#f1e05a"
      }
    }
  ]
}
```
