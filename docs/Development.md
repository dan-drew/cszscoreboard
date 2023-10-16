# Development

## Required Tools

### asdf Runtime Manager

Before starting, you will need to install thw [asdf runttime manager](https://asdf-vm.com/).
See [Getting Started](https://asdf-vm.com/guide/getting-started.html) for OS-specific installation instructions.

After installation, add runtime plugins:

```shell
asdf plugin add nodejs
asdf plugin add terraform
asdf plugin add awscli
```

### Platform Runtimes

From the project root directory:

```shell
asdf install
```

## Recommended Tools

A development IDE is strongly recommended

* [WebStorm](https://www.jetbrains.com/webstorm/) (PAID)
* [VS Code](https://code.visualstudio.com/) (FREE) with [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) extension

## Dependencies

From the project root directory:

```shell
npm install
```

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Making Changes

Please follow Git practices by creating a branch and submitting changes for review via
GitHub pull requests.

## See Also

* [Angular Documentation](https://angular.io/docs)
* [Guessing Games](Guessing-Games.md)
* [Deployment](Deployment.md)
