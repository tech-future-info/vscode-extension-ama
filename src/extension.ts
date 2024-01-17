import * as vscode from 'vscode'
import OpenAI from 'openai'
import { i18n } from './i18n'

async function getOpenAIKeyAMA(): Promise<string> {
  let openaiKey = vscode.workspace.getConfiguration('vscodeAskCodeAnything').get('openaiApiKey') as string | undefined
  if (!openaiKey) {
    openaiKey = await vscode.window.showInputBox({ prompt: i18n.t('enter-your-openai-api-key') })
    if (!openaiKey) {
      vscode.window.showErrorMessage(i18n.t('no-openai-api-key-provided'))
      return ''
    }
    await vscode.workspace.getConfiguration('vscodeAskCodeAnything').update('openaiApiKey', openaiKey, vscode.ConfigurationTarget.Global)
  }
  return openaiKey
}

async function getChatCompletionAMA(prompt: string) {
  // const openaiKey = '';
  const openaiKey = await getOpenAIKeyAMA()
  if (!openaiKey)
    return null

  const model
 = vscode.workspace.getConfiguration('vscodeAskCodeAnything').get('openaiModel') as string

  const openai = new OpenAI({
    apiKey: openaiKey,
    baseURL: vscode.workspace
      .getConfiguration('vscodeAskCodeAnything')
      .get('openaiBaseURL') as string | undefined,
  })

  try {
    return await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        
      ],
      // functions: useConventionalCommit
      //   ? [
      //       {
      //         name: 'createConventionalCommit',
      //         description: 'Create a conventional commit message.',
      //         parameters: {
      //           type: 'object',
      //           properties: {
      //             type: {
      //               type: 'string',
      //               description: 'The type of the commit.',
      //             },
      //             scope: {
      //               type: 'string',
      //               description: 'The scope or scopes of the commit, separated by a slash.',
      //             },
      //             description: {
      //               type: 'string',
      //               description: 'The description of the commit.',
      //             },
      //             body: {
      //               type: 'string',
      //               description: 'The body of the commit.',
      //             },
      //             footer: {
      //               type: 'string',
      //               description: 'The footer of the commit.',
      //             },
      //             isBreakingChange: {
      //               type: 'boolean',
      //               description: 'If the commit introduces a breaking change.',
      //             },
      //           },
      //           required: ['type', 'description'],
      //         },
      //       },
      //     ]
      //   : undefined,
      // function_call: useConventionalCommit ? { name: 'createConventionalCommit' } : undefined,
    })
  }
  catch (error) {
    if (error instanceof OpenAI.APIError)
      vscode.window.showErrorMessage(error.message)

    return null
  }
}

async function processAMA(title: string, operation: (commitMsg: string) => Promise<void>) {
  await vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title,
    cancellable: false,
  }, async () => {
    const chatCompletion = await getChatCompletionAMAAzure(title)
    // const useConventionalCommit = vscode.workspace.getConfiguration('vscodeAskCodeAnything').get('useConventionalCommit') as boolean
    // const commitMsg = processChatCompletion(chatCompletion, useConventionalCommit)
    await operation(chatCompletion?.choices[0].message?.content || '')
  })
}


async function getChatCompletionAMAAzure(prompt: string) {
  const openaiKey = '';
  // const openaiKey = await getOpenAIKeyAMA()
  if (!openaiKey)
    return null

  // The name of your Azure OpenAI Resource.
  // https://learn.microsoft.com/en-us/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource
  const resource = '';

  // const model = vscode.workspace.getConfiguration('vscodeAskCodeAnything').get('model') as string
  // https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#rest-api-versioning
  const apiVersion = '';

  const model = '';

  const openai = new OpenAI({
    apiKey: openaiKey,
    baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}`,
    
    defaultQuery: { 'api-version': apiVersion },
    defaultHeaders: { 'api-key': openaiKey },
  });

  try {
    return await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        
      ],
      // functions: useConventionalCommit
      //   ? [
      //       {
      //         name: 'createConventionalCommit',
      //         description: 'Create a conventional commit message.',
      //         parameters: {
      //           type: 'object',
      //           properties: {
      //             type: {
      //               type: 'string',
      //               description: 'The type of the commit.',
      //             },
      //             scope: {
      //               type: 'string',
      //               description: 'The scope or scopes of the commit, separated by a slash.',
      //             },
      //             description: {
      //               type: 'string',
      //               description: 'The description of the commit.',
      //             },
      //             body: {
      //               type: 'string',
      //               description: 'The body of the commit.',
      //             },
      //             footer: {
      //               type: 'string',
      //               description: 'The footer of the commit.',
      //             },
      //             isBreakingChange: {
      //               type: 'boolean',
      //               description: 'If the commit introduces a breaking change.',
      //             },
      //           },
      //           required: ['type', 'description'],
      //         },
      //       },
      //     ]
      //   : undefined,
      // function_call: useConventionalCommit ? { name: 'createConventionalCommit' } : undefined,
    })
  }
  catch (error) {
    if (error instanceof OpenAI.APIError)
      vscode.window.showErrorMessage(error.message)

    return null
  }
}

export function activate(context: vscode.ExtensionContext) {
  const selector: vscode.DocumentSelector = { language: 'plaintext' };
  const editor = vscode.window.activeTextEditor;

  // context.subscriptions.push(vscode.languages.registerDocumentPasteEditProvider(selector, new CopyCountPasteEditProvider(), {
	// 	id: 'copyCount',
	// 	pasteMimeTypes: ['text/plain'],
	// }));

  context.subscriptions.push(vscode.commands.registerCommand('ama', async () => {
    let word = '';
    if (editor) {
      const document = editor.document;
      const selection = editor.selection;

      // // Get the word within the selection
       word = document.getText(selection);
    }
    await processAMA('explain following code ' + word, async (commitMsg) => {

      vscode.window.showInformationMessage('AMA')
      if (editor) {
        const document = editor.document;
        const selection = editor.selection;
  
        // // Get the word within the selection
        const word = document.getText(selection);
        // const reversed = word.split('').reverse().join('');
        editor.edit(editBuilder => {
          editBuilder.replace(selection, commitMsg);
        });
      }
    })    
  }))

  context.subscriptions.push(vscode.commands.registerCommand('amaOptimize', async () => {
    await processAMA('Optimize the following code', async (commitMsg) => {
      // const currentBranch = await gitHelper.revparse(['--abbrev-ref', 'HEAD'])
      // await gitHelper.commit(commitMsg).push('origin', currentBranch)
      vscode.window.showInformationMessage('AMA')
    })
  }))  
}

export function deactivate() { }
