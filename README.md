# hello-world-ort-node

This is the README for "hello-world-ort-node". Extension to test integration with `onnxruntine-node`.

# Setup

Use Node 16, and run `npm ci`.

# Debugging

Use the "Run extension" launch task, ignore the warning about a missing problem matcher. To activate the extension, open the command palette and run the "Hello World" command, results should appear in the debug console of the parent VS Code instance.

# Packaging

Run `npm run vsce`, and install the resulting VSIX with the "Install from VSIX..." command. Open the developer console with the "Developer: Toggle Developer Tools" command, and then run the "Hello World" command, results should appear in the developer console.
