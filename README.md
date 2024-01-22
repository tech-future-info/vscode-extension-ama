<!-- DO NOT REMOVE - contributor_list:data:start:["tech-future-info", "mefengl", "renovate[bot]", "esonwong"]:end -->
# Ask My Code Anything - The AI Expert Colleague

A simple, free plugin to chat with your code. The plugin helps in analysis of the code and code optimization.

The plugin aims to supercharge the developer with AI expert colleague.

[Visit Github Repository](https://github.com/tech-future-info/vscode-extension-ama.git)

[Join Discord Server](https://discord.gg/hUBzGhdC)

## Features ✨ - AI  Plugin

- **AI Analyze**: Generate explanatory text, documentation for currently selected code.
- **AI Optimize**: Generate optimized code for currently selected code.

## Usage - AI Git Extension for VSCode

- `Ctrl+Shift+P`
- Search for `Ask Code Anything`, `Ask Me to Analyze` or `Ask Me to Optimize`.
- Press `Enter`.
  > Will ask for API Key if not set.
- Done!

What's more:

- Supports Azure Open AI too!

## Settings    

### Model (OpenAI & Azure)

Specify the OpenAI Model. The default is `gpt-3.5-turbo`.

Consider these advanced models:

- `gpt-3.5-turbo-16k`: Ideal for large file changes, although it can increase cost if unnecessary files are added and are still within the token limit.
- `gpt-4`: An upgrade but at a higher expense.

For more options, visit [OpenAI Models Documentation](https://platform.openai.com/docs/models).


### API Key (OpenAI & Azure)

Specify the API Key.

### API Base URL (OpenAI)

Specify the API Base URL, default for OpenAI is `https://api.openai.com/v1`.

### API Version (Azure)

Specify the version of Azure AI model.

For more information, visit [REST API reference](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#rest-api-versioning).


### AI Resource (Azure)

Specify the Azure AI Resource name.

For more information, visit [Azure OpenAI Service resource](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource).


## Language Support

This AI  plugin interface supports multiple languages, making it accessible for developers around the world:

| Language            | Code   | Language            | Code   |
| ------------------- | ------ | ------------------- | ------ |
| Kannada             | kn     |                    |      |
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
- [OpenAI API](https://platform.openai.com/docs/api-reference/chat): It makes this AI git extension possible

## License

MIT

<!-- prettier-ignore-start -->
<!-- DO NOT REMOVE - contributor_list:start -->
## 👥 Contributors

- **[@tech-future-info](https://github.com/tech-future-info)**

- **[@mefengl](https://github.com/mefengl)**

- **[@renovate[bot]](https://github.com/apps/renovate)**

- **[@esonwong](https://github.com/esonwong)**

<!-- DO NOT REMOVE - contributor_list:end -->
<!-- prettier-ignore-end -->