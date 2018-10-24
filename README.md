# Figma Alfred 3 workflow

> Alfred workflow to quick link Figma teams, projects and files

## TODO:

- Figma's API doesn't allow access to draft files.
- Figma's API doesn't allow access to get teams. This requires adding team ids to the workflow manually.
- Files open in the desktop app, but teams and projects won't.

## Installation

```
$ npm install --global alfred-figma
```

*Requires [Node.js](https://nodejs.org) 10+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*

## Configuration

There are a couple of requirements.

1. You need a [Figma account](https://www.figma.com) and be part of a team.
2. Create a [Personal Access Token](https://www.figma.com/developers/docs#auth-dev-token) so you can reach the API.
3. Create a `.env` file with your access token in the directory of the installed workflow.
   - `FIGMA_TOKEN=<personal-access-token>`
   - Alternatively add an environment variable for `FIGMA_TOKEN`
4. Add a team to your results with the `figma add [teamurl]` command.

## Usage

![alfred-figma](https://user-images.githubusercontent.com/54012/47411429-88909400-d71d-11e8-93a4-43a06e5bdd8e.gif)


The workflow lists results of 3 items teams, projects and files.

### Teams

- <kbd>⏎</kbd> Open team page.
- <kbd>⌥</kbd> + <kbd>⏎</kbd> Remove team from workflow.
- <kbd>⌘</kbd> + <kbd>⏎</kbd> Open team page in web browser.

### Projects

- <kbd>⏎</kbd> Open project page.
- <kbd>⌘</kbd> + <kbd>⏎</kbd> Open project page in web browser.

### Files

- <kbd>⏎</kbd> Open file.
- <kbd>⌥</kbd> + <kbd>⏎</kbd> Duplicate file to your drafts.
- <kbd>⌘</kbd> + <kbd>⏎</kbd> Open file in web browser.

## Credits

- [alfy](https://github.com/sindresorhus/alfy) made by [Sindre Sorhus](https://sindresorhus.com/) is licensed by [MIT](https://github.com/sindresorhus/alfy/blob/master/license)


## License

MIT © [Jon Rohan](http://jonrohan.codes/)
