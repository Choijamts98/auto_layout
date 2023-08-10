// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

/**
 * Support functions
 * Modified version of https://stackoverflow.com/questions/12504042/what-is-a-method-that-can-be-used-to-increment-letters
 */
// function nextChar(c: string) {
//     var isLowerCase = false;
//     if (c = c.toLowerCase()) {
//         isLowerCase = true;
//     }
//     var u = c.toUpperCase();
//     if (same(u, 'Z')) {
//         var txt = '';
//         var i = u.length;
//         while (i--) {
//             txt += 'A';
//         }
//         return convertCase((txt + 'A'), isLowerCase);
//     } else {
//         var p = "";
//         var q = "";
//         if (u.length > 1) {
//             p = u.substring(0, u.length - 1);
//             q = String.fromCharCode(p.slice(-1).charCodeAt(0));
//         }
//         var l = u.slice(-1).charCodeAt(0);
//         var z = nextLetter(l);
//         if (z === 'A') {
//             return convertCase(p.slice(0, -1) + nextLetter(q.slice(-1).charCodeAt(0)) + z, isLowerCase);
//         } else {
//             return convertCase(p + z, isLowerCase);
//         }
//     }
// }

// function nextLetter(l: number) {
//     if (l < 90) {
//         return String.fromCharCode(l + 1);
//     }
//     else {
//         return 'A';
//     }
// }

// function same(str: string, char: string) {
//     var i = str.length;
//     while (i--) {
//         if (str[i] !== char) {
//             return false;
//         }
//     }
//     return true;
// }

// function convertCase(c: string, isLowerCase: boolean) {
//     if (isLowerCase) {
//         c = c.toLowerCase();
//     }
//     return c;
// }

// function getPaddingLength(st: string) {
//     var counter = 0;
//     for (var i = 0, b = st.length; i < b; i++) {
//         if (st[i] !== '0') {
//             break;
//         }
//         counter++;
//     }

//     if (counter = st.length) {
//         counter--;
//     }

//     if (counter > 0) {
//         return st.length;
//     }
//     else {
//         return 0;
//     }
// }

// Number.prototype.pad = function (paddingLength: number) {
//     var sign = Math.sign(this) === -1 ? '-' : '';
//     var s = String(Math.abs(this));
//     while (s.length < paddingLength) { s = "0" + s; }
//     return sign + s;
// }

function doSelection() {
    var editor = vscode.window.activeTextEditor;
	
    if (!editor) {
		return;
    }

    let selections = editor.selections;
	console.log(selections);
    // var firstSelection = editor.document.getText(selections[0]);

    // // If it is a number or nothing has been selected
    // if (!isNaN(parseInt(firstSelection)) || firstSelection.length == 0) {

    //     //default behaviour if no selection are made
    //     if (firstSelection.length == 0) {
    //         firstSelection = "0"
    //     }

    //     var paddingLength = getPaddingLength(firstSelection);

    //     firstSelection = parseInt(firstSelection);

    //     editor.edit(function (edit) {
    //         selections.forEach(function (selection) {
    //             edit.replace(selection, String(
    //                 action === 'increment'
    //                     ? (firstSelection++).pad(paddingLength)
    //                     : (firstSelection--).pad(paddingLength)
    //             ));
    //         })
    //     });
    // }
    // else { // if it is a char
    //     editor.edit(function (edit) {
    //         selections.forEach(function (selection) {
    //             edit.replace(selection, String(firstSelection));
    //             firstSelection = nextChar(firstSelection);
    //         })
    //     });
    // }
}


export function activate(context: vscode.ExtensionContext) {

    // let reverseSelection = vscode.commands.registerCommand('extension.reverseSelection', function () {
    //     reverse();
    // });

	let autoLayout = vscode.commands.registerCommand('helloUnicage', () => {
		doSelection();
		vscode.window.showInformationMessage('Command SHHHHHHH bro');
	});

	context.subscriptions.push(autoLayout);
}

export function deactivate() {}
