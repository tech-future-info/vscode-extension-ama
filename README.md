<!-- DO NOT REMOVE - contributor_list:data:start:["mefengl", "renovate[bot]", "esonwong"]:end -->
# Ask My Code Anything - The AI Expert Colleague

A simple, free plugin to chat with your code. The plugin helps in analysis of the code and optimize the code.

The plugin aims to supercharge the developer with AI expert colleague.

[Visit Github Repository](https://github.com/mefengl/vscode-i-dont-care-about-commit-message)

[Join Discord Server](https://discord.gg/pwTKpnc2sF)

## Features ✨ - AI  Plugin

- **AI Analyze**: Generate explanatory text, documentation for currently selected code.
- **AI Optimize**: Generate optimized code for currently selected code.

## Usage - AI Git Extension for VSCode

- `Ctrl+Shift+P`
- Search for `Ask Code Anything` or `Ask Me to Optimize`.
- Press `Enter`.
  > Will ask for OpenAI API Key if not set.
- Done!

What's more:

- Supports Azure Open AI too!

## Settings

### Model

Specify the OpenAI Model. The default is `gpt-3.5-turbo`.

Consider these advanced models:

- `gpt-3.5-turbo-16k`: Ideal for large file changes, although it can increase cost if unnecessary files are added and are still within the token limit.
- `gpt-4`: An upgrade but at a higher expense.

For more options, visit [OpenAI Models Documentation](https://platform.openai.com/docs/models).


### OpenAI API Key

Specify the OpenAI API Key.

### OpenAI API Base URL

Specify the OpenAI API Base URL, default is `https://api.openai.com/v1`.

## Language Support

This AI  plugin interface supports multiple languages, making it accessible for developers around the world:

| Language            | Code   | Language            | Code   |
| ------------------- | ------ | ------------------- | ------ |
| English (US)        | en     | Italiano            | it     |
| 简体中文             | zh-cn  | Español             | es     |
| 繁體中文             | zh-tw  | 日本語               | ja     |
| Français            | fr     | 한국어               | ko     |
| Deutsch             | de     | Русский             | ru     |
| Português (Brasil)  | pt-br  | Türkçe              | tr     |
| Polski              | pl     | Čeština             | cs     |
| Magyar              | hu     |                     |        |

## Development - Building the AI  Plugin

For development, follow these steps:

1. Clone the repository and navigate into it.
2. Run `npm install` to install all the necessary dependencies.
3. Run `npm run watch` to start the development server.
4. Press `F5` to start the plugin in a new VSCode window.

For testing, run `npm run test`.

## Credits
- [I Don't Care About Commit Message](https://github.com/mefengl/vscode-i-dont-care-about-commit-message) For the OpenAI Extension 
- `I don't care about cookies`: For the funny way of naming
- [Simple Git](https://github.com/steveukx/git-js) @steveukx: It would be much harder without this
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): For the conventional commit format
  > The `Conventional Commits` format used in this tool is based on the [Conventional Commits specification (v1.0.0)](https://www.conventionalcommits.org/en/v1.0.0/), which is licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- [aicommits](https://github.com/Nutlope/aicommits) @Nutlope: The CLI AI commit tool I used before I created my own
- [OpenAI API](https://platform.openai.com/docs/api-reference/chat): It makes this AI git extension possible
- [weekly](https://github.com/ruanyf/weekly) @ruanyf: For making this project known and used by more people

## License

MIT

<!-- prettier-ignore-start -->
<!-- DO NOT REMOVE - contributor_list:start -->
## 👥 Contributors


- **[@mefengl](https://github.com/mefengl)**

- **[@renovate[bot]](https://github.com/apps/renovate)**

- **[@esonwong](https://github.com/esonwong)**

<!-- DO NOT REMOVE - contributor_list:end -->
<!-- prettier-ignore-end -->