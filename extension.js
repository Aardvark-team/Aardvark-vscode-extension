const vscode = require("vscode");
// Import libs to run the command
const cp = require("child_process");

function activate(context) {
	// Define custom command
	let runAardvarkProgramCommand = vscode.commands.registerCommand(
		"aardvark.runAardvarkProgram",
		async () => {
			// Get the active text editor
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage("No active text editor.");
				return;
			}

			// Get the file path of the active document
			const filePath = editor.document.fileName;

			// Create a new terminal
			const terminal = vscode.window.createTerminal("Aardvark Terminal");

			// Run the Aardvark program in the terminal
			terminal.sendText(`adk run "${filePath}"`);

			// Show the terminal
			terminal.show();
		}
	);

	// Register custom command
	context.subscriptions.push(runAardvarkProgramCommand);

	// Define toolbar button
	let runAardvarkProgramButton = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left
	);
	runAardvarkProgramButton.text = "$(triangle-right) Run Aardvark Program";
	runAardvarkProgramButton.command = "aardvark.runAardvarkProgram";

	// Register toolbar button
	context.subscriptions.push(runAardvarkProgramButton);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
