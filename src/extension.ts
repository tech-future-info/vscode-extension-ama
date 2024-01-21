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

async function getOpenAIKeyAMAAzure(): Promise<string> {
  let openaiKey = vscode.workspace.getConfiguration('vscodeAskCodeAnything').get('openaiAzureApiKey') as string | undefined
  if (!openaiKey) {
    openaiKey = await vscode.window.showInputBox({ prompt: i18n.t('enter-your-azure-openai-api-key') })
    if (!openaiKey) {
      vscode.window.showErrorMessage(i18n.t('no-openai-azure-api-key-provided'))
      return ''
    }
    await vscode.workspace.getConfiguration('vscodeAskCodeAnything').update('openaiAzureApiKey', openaiKey, vscode.ConfigurationTarget.Global)
  }
  return openaiKey
}

async function getChatCompletionAMA(prompt: string) {  
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
        //TODO add user       
      ],
    })
  }
  catch (error) {
    if (error instanceof OpenAI.APIError)
      vscode.window.showErrorMessage(error.message)
    return null
  }
}

async function processAMA(title: string, operation: (aiResponse: string) => Promise<void>) {
  await vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title,
    cancellable: false,
  }, async () => {
    const chatCompletion = await getChatCompletionAMA(title)
    // const useConventionalCommit = vscode.workspace.getConfiguration('vscodeAskCodeAnything').get('useConventionalCommit') as boolean
    // const aiResponse = processChatCompletion(chatCompletion, useConventionalCommit)
    await operation(chatCompletion?.choices[0].message?.content || '')
  })
}

async function processAMAAzure(title: string, operation: (aiResponse: string) => Promise<void>) {
  await vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title,
    cancellable: false,
  }, async () => {
    const chatCompletion = await getChatCompletionAMAAzure(title)
    // const useConventionalCommit = vscode.workspace.getConfiguration('vscodeAskCodeAnything').get('useConventionalCommit') as boolean
    // const aiResponse = processChatCompletion(chatCompletion, useConventionalCommit)
    await operation(chatCompletion?.choices[0].message?.content || '')
  })
}

async function getChatCompletionAMAAzure(prompt: string) {
  const openaiKey = await getOpenAIKeyAMAAzure()
  if (!openaiKey)
    return null
    
  // The name of your Azure OpenAI Resource.
  // https://learn.microsoft.com/en-us/azure/cognitive-services/openai/how-to/create-resource?pivots=web-portal#create-a-resource
  const resource = vscode.workspace.getConfiguration('vscodeAskCodeAnything').get('AzureOpenaiResource') as string | undefined;
    
  // https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#rest-api-versioning
  const apiVersion = vscode.workspace.getConfiguration('vscodeAskCodeAnything').get('AzureOpenaiApiVersion') as string | undefined;
  
  const model = vscode.workspace.getConfiguration('vscodeAskCodeAnything').get('AzureOpenaiModel') as string;
  
  const openaiConfig = {
    apiKey: openaiKey,
    baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}/chat/completions`,    
    defaultQuery: { 'api-version': apiVersion },
    defaultHeaders: { 'api-key': openaiKey },
  };
  vscode.window.showInformationMessage(JSON.stringify(openaiConfig)  )
  const selector: vscode.DocumentSelector = { language: 'plaintext' };
  const editor = vscode.window.activeTextEditor;
let word = '';
    let selection: vscode.Position | vscode.Range | vscode.Selection;
if (editor) {
      const document = editor.document;
      selection = editor.selection;
      word = document.getText(selection);
    }
    if (editor) {
        editor.edit(editBuilder => {
          editBuilder.replace(selection, JSON.stringify(openaiConfig));
        });
      }
  const openai = new OpenAI({
    apiKey: openaiKey,
    baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}/chat/completions`,    
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
        //TODO add user 
      ],      
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
  
  context.subscriptions.push(vscode.commands.registerCommand('ama', async () => {    
    let word = '';
    let selection: vscode.Position | vscode.Range | vscode.Selection;
    vscode.window.showInformationMessage('activating ama')  
    if (editor) {
      const document = editor.document;
      selection = editor.selection;
      word = document.getText(selection);
    }
    await processAMA(word, async (aiResponse) => {
      if (editor) {
        editor.edit(editBuilder => {
          // editBuilder.replace(selection, aiResponse);
          editBuilder.insert(editor.selection.end, aiResponse)
        });
      }
    })
  })) 

  context.subscriptions.push(vscode.commands.registerCommand('amaAnalyze', async () => {
    let word = '';
    let selection: vscode.Position | vscode.Range | vscode.Selection;
    vscode.window.showInformationMessage('activating amaAnalyze')  
    if (editor) {
      const document = editor.document;
      selection = editor.selection;
      word = document.getText(selection);
    }
    await processAMA('explain following code ' + word, async (aiResponse) => {
      if (editor) {
        editor.edit(editBuilder => {
          // editBuilder.replace(selection, aiResponse);
          editBuilder.insert(editor.selection.end, aiResponse)
        });
      }
    })    
  }))

  context.subscriptions.push(vscode.commands.registerCommand('amaOptimize', async () => {
    let word = '';
    let selection: vscode.Position | vscode.Range | vscode.Selection;
    vscode.window.showInformationMessage('activating amaOptimize')  
    if (editor) {
      const document = editor.document;
      selection = editor.selection;
      word = document.getText(selection);
    }
    await processAMA('optimize following code ' + word, async (aiResponse) => {      
      if (editor) {
        editor.edit(editBuilder => {
          editBuilder.replace(selection, aiResponse);
        });
      }
    })   
  }))  

  context.subscriptions.push(vscode.commands.registerCommand('amaAzure', async () => {    
    let word = '';
    let selection: vscode.Position | vscode.Range | vscode.Selection;
    vscode.window.showInformationMessage('activating amaAzure')  
    if (editor) {
      const document = editor.document;
      selection = editor.selection;
      word = document.getText(selection);
    }
    await processAMAAzure(word, async (aiResponse) => {      
      if (editor) {
        editor.edit(editBuilder => {
          // editBuilder.replace(selection, aiResponse);
          editBuilder.insert(editor.selection.end, aiResponse)
        });
      }
    })
  })) 

  context.subscriptions.push(vscode.commands.registerCommand('amaAnalyzeAzure', async () => {
    let word = '';
    let selection: vscode.Position | vscode.Range | vscode.Selection;
    vscode.window.showInformationMessage('activating amaAnalyzeAzure')  
    if (editor) {
      const document = editor.document;
      selection = editor.selection;
      word = document.getText(selection);
    }
    await processAMAAzure('explain following code ' + word, async (aiResponse) => {      
      if (editor) {
        editor.edit(editBuilder => {
          editBuilder.replace(selection, aiResponse);
        });
      }
    })    
  })) 

  context.subscriptions.push(vscode.commands.registerCommand('amaOptimizeAzure', async () => {    
    let word = '';
    let selection: vscode.Position | vscode.Range | vscode.Selection;
    vscode.window.showInformationMessage('activating amaOptimizeAzure')  
    if (editor) {
      const document = editor.document;
      selection = editor.selection;
      word = document.getText(selection);
    }
    await processAMAAzure('optimize following code ' + word, async (aiResponse) => {      
      if (editor) {
        editor.edit(editBuilder => {
          editBuilder.replace(selection, aiResponse);
        });
      }
    })   
  })) 

}

export function deactivate() { }
