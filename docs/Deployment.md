# Deployment

*This process requires valid AWS credentials. Please contact [dan.drew@hotmail.com](dan.drew@hotmail.com) 
for assistance.*

### First-time Setup

In a terminal window, change to the `<project-root>/terraform` directory and run:

```shell
terraform init
```
## Build

This step builds the web application distribution files.

From the project root directory:

```shell
./build.sh
```

## Deploy

This step deploys the distribution files to AWS.

From the project root directory:

```shell
./deploy.sh
```

## Rollback

**IMPORTANT:** There is no built-in rollback mechanism in case of breaking changes.

If you need to revert a change:

1. Using `git checkout` to set your local code to a previously known-good commit.
2. Re-run the build and deploy steps.
