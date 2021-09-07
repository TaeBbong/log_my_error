// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const editor = vscode.window.activeTextEditor;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "log-my-error" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "log-my-error.logError",
    logError
  );
  context.subscriptions.push(disposable);

  let disposable2 = vscode.commands.registerCommand(
    "log-my-error.searchError",
    function () {
      vscode.window.showInformationMessage("Hello World from log my error 2!");
    }
  );
  context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
function deactivate() {}

async function logError() {
  //   vscode.window.showInformationMessage("Hello World from log my error!");
  var title;
  var description;
  var selectedRange = editor.selections.length;
  console.log(selectedRange);
  //   var solution = editor.document.getText(editor.selections);

  //   console.log(solution);

  await vscode.window
    .showInputBox({
      prompt: "Enter Error Title",
      value: "my_error_title",
      placeHolder: "my_error_title",
      validateInput: (value) => {
        if (!value) {
          return "Please enter a title";
        }
        return null;
      },
    })
    .then((value) => {
      title = value;
      console.log(title);
    })
    .then(() => {
      return vscode.window
        .showInputBox({
          prompt: "Enter Error Description",
          value: "my_error_description",
          placeHolder: "my_error_description",
        })
        .then((value) => {
          if (!value) {
            description = "No description";
          } else {
            description = value;
          }
          console.log(description);
        });
    })
    .then(() => {});
}

module.exports = {
  activate,
  deactivate,
};
