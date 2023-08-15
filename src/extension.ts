import * as vscode from 'vscode';


var config = vscode.workspace.getConfiguration('increment-fields');
var padding = config.padding;
var seperator = config.seperator;

function displayOutput(input: string[]): string{
    let output: string[] = [];
    let longest = Math.max(...(input.map(el => el.length)));
    padding = longest > padding ? longest : padding;
    input.forEach((item, index) => {
        let zenkaku = item.replace(/[A-Za-z0-9]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
        });
        if (index % seperator !== (seperator-1)){
            var end = zenkaku.padEnd(padding, "\u3000");
        }
        else{
            var end = zenkaku + "\n";
        }
        let number = (index % seperator !== 0) ? index + 1 : "# " + (index + 1);
        output.push(number + ":" + end);
      });
    return output.join("");
}

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
    }
    else {
        let noDash = fieldNames.replace(/#/gi, '');
        let splitted = noDash.trim().split(/\s+/);
        let input: string[] = [];

        splitted.forEach(
            (el) => {
                let names = el.split(":");
                
                if (names.length === 1){
                    input.push(names[0]);
                }
                else if (names.length === 2){
                    input.push(names[1]);
                }
                else {
                    if (/^\d+$/.test(names[0])){
                        input.push(names.slice(1).join(':'));
                    }
                    else {
                        input.push(names.join(':'));
                    }
                };
            }
            );
        let displayText = displayOutput(input);
        editor.edit(function (edit) {
                    selections.forEach(function (selection) {
                        edit.replace(selection, displayText);
                    });
                });
            }
}

export function activate(context: vscode.ExtensionContext) {
    let autoLayout = vscode.commands.registerCommand('startIncrement', () => {
        console.log(padding);
        doSelection();
    });

    context.subscriptions.push(autoLayout);
}

export function deactivate() { }
