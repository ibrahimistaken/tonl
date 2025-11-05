/**
 * TONL VS Code Extension (T038-T040)
 *
 * Provides language support for TONL files including:
 * - Syntax highlighting (T038)
 * - Document Explorer (T039)
 * - IntelliSense (T040)
 */

import * as vscode from 'vscode';
import { TONLTreeDataProvider } from './tree-provider';
import { TONLCompletionProvider } from './completion-provider';
import { TONLHoverProvider } from './hover-provider';
import { TONLDiagnosticsProvider } from './diagnostics-provider';
import { decodeTONL, encodeTONL } from 'tonl';

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('TONL extension activated');

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('tonl.validateDocument', validateDocument)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('tonl.formatDocument', formatDocument)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('tonl.showDocumentTree', showDocumentTree)
  );

  // Register document tree provider (T039)
  const treeDataProvider = new TONLTreeDataProvider();
  vscode.window.registerTreeDataProvider('tonlDocumentTree', treeDataProvider);

  // Refresh tree when active editor changes
  vscode.window.onDidChangeActiveTextEditor(() => {
    treeDataProvider.refresh();
  });

  // Refresh tree when document changes (debounced)
  let timeout: NodeJS.Timeout | undefined;
  vscode.workspace.onDidChangeTextDocument((event) => {
    if (event.document.languageId === 'tonl') {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        treeDataProvider.refresh();
      }, 500); // 500ms debounce
    }
  });

  // Register completion provider (T040)
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      'tonl',
      new TONLCompletionProvider(),
      '@', ':', ','
    )
  );

  // Register hover provider (T040)
  context.subscriptions.push(
    vscode.languages.registerHoverProvider('tonl', new TONLHoverProvider())
  );

  // Register diagnostics provider (T040)
  const diagnosticsProvider = new TONLDiagnosticsProvider();
  context.subscriptions.push(diagnosticsProvider);

  // Update diagnostics on document open/change
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((document) => {
      diagnosticsProvider.updateDiagnostics(document);
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      diagnosticsProvider.updateDiagnostics(event.document);
    })
  );

  // Update diagnostics for already open documents
  vscode.workspace.textDocuments.forEach((document) => {
    diagnosticsProvider.updateDiagnostics(document);
  });
}

/**
 * Validate TONL document
 */
async function validateDocument() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active editor');
    return;
  }

  const document = editor.document;
  if (document.languageId !== 'tonl') {
    vscode.window.showErrorMessage('Not a TONL file');
    return;
  }

  try {
    const text = document.getText();
    decodeTONL(text); // Validate by parsing
    vscode.window.showInformationMessage('✓ TONL document is valid');
  } catch (error) {
    vscode.window.showErrorMessage(
      `✗ Validation error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Format TONL document
 */
async function formatDocument() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active editor');
    return;
  }

  const document = editor.document;
  if (document.languageId !== 'tonl') {
    vscode.window.showErrorMessage('Not a TONL file');
    return;
  }

  try {
    const text = document.getText();
    const parsed = decodeTONL(text);
    const formatted = encodeTONL(parsed);

    // Replace entire document
    const edit = new vscode.WorkspaceEdit();
    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length)
    );
    edit.replace(document.uri, fullRange, formatted);
    await vscode.workspace.applyEdit(edit);

    vscode.window.showInformationMessage('✓ TONL document formatted');
  } catch (error) {
    vscode.window.showErrorMessage(
      `✗ Formatting error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Show document tree view
 */
async function showDocumentTree() {
  // Tree view is always visible in sidebar
  vscode.window.showInformationMessage('Check TONL Explorer in the sidebar');
}

/**
 * Extension deactivation
 */
export function deactivate() {
  console.log('TONL extension deactivated');
}
