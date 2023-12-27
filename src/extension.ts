import * as vscode from "vscode";

var config = vscode.workspace.getConfiguration("increment-fields");
var padding = config.padding;
var seperator = config.seperator;

function doSelection() {
  let editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  let selections = editor.selections;
  let fieldNames = editor.document.getText(selections[0]);
  // If it is a number or nothing has been selected
  if (fieldNames.length === 0) {
    return;
  } else {
    let noDash = fieldNames.replace(/#/gi, "");
    let splitted = noDash.trim().split(/\s+/);
    let input: string[] = [];

    splitted.forEach((el, index) => {
      let [oldIndex, name] = el.split(":");

      let newName = name.padEnd(padding, "\u3000");
      if ((index + 1) % seperator === 0) {
        newName = name;
      }
      let newNumber = String(index + 1);
      if (index === 0) {
        newNumber = "# " + newNumber;
      } else if (index !== 5 && index < 10) {
        newNumber = " " + newNumber;
      }

      if (index !== 0 && index % seperator === 0) {
        newNumber = "\n# " + newNumber;
      }

      input.push(`${newNumber}:${newName}`);
    });

    let displayText = input.join("");
    editor.edit(function (edit) {
      selections.forEach(function (selection) {
        edit.replace(selection, displayText);
      });
    });
  }
}

export function activate(context: vscode.ExtensionContext) {
  let autoLayout = vscode.commands.registerCommand("startIncrement", () => {
    doSelection();
  });

  context.subscriptions.push(autoLayout);
}

export function deactivate() {}
