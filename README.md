![Build Status](https://codebuild.eu-central-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiV1V2VDZnYUxxVDNiWFVOc0ExSy9PQ2M3MUdaUjUzSEFVUk8wRkpKUEdkOG1DbzJwbHdYL1cvb0RFMGdqbzlGeXJuWnR6Nm5MQ0VzK2x6aDM0VVNkbGVBPSIsIml2UGFyYW1ldGVyU3BlYyI6IlY2Vm84dHcyYmVrRDVWSG0iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

# website

personal website

## Getting started

Run website locally and deploy to AWS

### Prerequisites

- install `dotenv-cli`

```
npm install -g dotenv-cli

<!-- or -->

yarn global add dotenv-cli
```

- For local development rename `.env.example` to `.env` and update the `GITHUB_TOKEN`

- upload CloudFormation template in CloudFormation Console (or with aws-cli) which will deploy your S3 buckets, cloudformation distributions, codebuild pipeline etc.

### Install

- `yarn install`

### Run locally

- `npm run dev`
- open browser on https://localhost:5000

## Deploying

Codebuild is setup to use the [Feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow), making a PR to the repo will create a feature build on AWS and deploy it to a feature url. When PR is merged it will delete old stack.
