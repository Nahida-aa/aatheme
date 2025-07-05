// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration("aatheme");
	let disableGlow = config && config.disableGlow ? !!config.disableGlow : false;
	let brightness = parseFloat(config.brightness) > 1 ? 1 : parseFloat(config.brightness);
	brightness = brightness < 0 ? 0 : brightness;
	brightness = isNaN(brightness) ? 0.45 : brightness;

	const parsedBrightness = Math.floor(brightness * 255).toString(16).toUpperCase();
	let neonBrightness = parsedBrightness;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "aatheme" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('aatheme.enableGlow', () => {
		// vscode.window.showInformationMessage("hello aatheme.enableGlow");
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from AaTheme!');
		const appDir = path.dirname(vscode.env.appRoot);
		const base = path.join(appDir,'app','out','vs','code');
		const electronBase = isVSCodeBelowVersion("1.70.0") ? "electron-browser" : "electron-sandbox";
		const workBenchFilename = vscode.version == "1.94.0" ? "workbench.esm.html" : "workbench.html";

		const htmlFile = path.join(base, electronBase, "workbench", workBenchFilename);
		const templateFile = path.join(base, electronBase, "workbench", "glowdreams.js");

		try {
			// const version = context.globalState.get(`${context.extensionName}.version`);
			// generate production theme JS // 生成主题 JS
			// vscode.window.showInformationMessage("准备读取 chrome 样式文件");
			const chromeStyles = fs.readFileSync(__dirname +'/custom/editor_chrome.css', 'utf-8');
			// vscode.window.showInformationMessage("已经读取 chrome 样式文件");
			const jsTemplate = fs.readFileSync(__dirname +'/custom/theme_template.js', 'utf-8');
			// vscode.window.showInformationMessage("已经读取 JS 模板文件");
			const themeWithGlow = jsTemplate.replace(/\[DISABLE_GLOW\]/g, String(disableGlow));
			const themeWithChrome = themeWithGlow.replace(/\[CHROME_STYLES\]/g, chromeStyles);
			const finalTheme = themeWithChrome.replace(/\[NEON_BRIGHTNESS\]/g, neonBrightness);
			fs.writeFileSync(templateFile, finalTheme, "utf-8");
			
			// modify workbench html
			const html = fs.readFileSync(htmlFile, "utf-8");
			// check if the tag is already there
			const isEnabled = html.includes("glowdreams.js");
			// vscode.window.showInformationMessage("准备检查是否没有 glowdreams.js");
			if (!isEnabled) {
				vscode.window.showInformationMessage("当前没有启用 Neon Dreams，正在启用中..., 可以进入下一步");
				// delete 现有的 script tag if there
				let output = html.replace(/^.*(<!-- AaTheme --><script src="glowdreams.js"><\/script><!-- NEON DREAMS -->).*\n?/mg, '');
				// add new script tag
				output = html.replace(/\<\/html\>/g, `	<!-- AaTheme --><script src="glowdreams.js"></script><!-- NEON DREAMS -->\n`);
				output += '</html>';
	
				fs.writeFileSync(htmlFile, output, "utf-8");
				
				vscode.window
					.showInformationMessage("Neon Dreams enabled. VS code must reload for this change to take effect. Code may display a warning that it is corrupted, this is normal. You can dismiss this message by choosing 'Don't show this again' on the notification.", { title: "Restart editor to complete" })
					.then(function(msg) {
						vscode.commands.executeCommand("workbench.action.reloadWindow");
					});

			} else {
				vscode.window
					.showInformationMessage('Neon dreams is already enabled. Reload to refresh JS settings.', { title: "Restart editor to refresh settings" })
					.then(function(msg) {
						vscode.commands.executeCommand("workbench.action.reloadWindow");
					});
			}
		} catch (e) {
			if (typeof e === 'object' && e !== null && 'code' in e && typeof (e as any).code === 'string' && /ENOENT|EACCES|EPERM/.test((e as any).code)) {
				vscode.window.showErrorMessage("Neon Dreams was unable to modify the core VS code files needed to launch the extension. You may need to run VS code with admin privileges in order to enable Neon Dreams.");
				return;
			} else {
				vscode.window.showErrorMessage('Something went wrong when starting neon dreams');
				return;
			}
		}
	});

	let disable = vscode.commands.registerCommand('aatheme.disableGlow', uninstall);
	
	context.subscriptions.push(disposable);
	context.subscriptions.push(disable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function uninstall() {
	const appDir = path.dirname(vscode.env.appRoot);
	const base = path.join(appDir, 'app', 'out', 'vs', 'code');
	const electronBase = isVSCodeBelowVersion("1.70.0") ? "electron-browser" : "electron-sandbox";
	const workBenchFilename = vscode.version == "1.94.0" ? "workbench.esm.html" : "workbench.html";

	const htmlFile = path.join(base, electronBase, "workbench", workBenchFilename);

	// modify workbench html
	const html = fs.readFileSync(htmlFile, "utf-8");

	// check if the tag is already there
	const isEnabled = html.includes("glowdreams.js");

	if (isEnabled) {
		// delete synthwave script tag if there
		let output = html.replace(/^.*(<!-- AaTheme --><script src="glowdreams.js"><\/script><!-- NEON DREAMS -->).*\n?/mg, '');
		fs.writeFileSync(htmlFile, output, "utf-8");

		vscode.window
			.showInformationMessage("Neon Dreams disabled. VS code must reload for this change to take effect", { title: "Restart editor to complete" })
			.then(function(msg) {
				vscode.commands.executeCommand("workbench.action.reloadWindow");
			});
	} else {
		vscode.window.showInformationMessage('Neon dreams isn\'t running.');
	}
}

// Returns true if the VS Code version running this extension is below the
// version specified in the "version" parameter. Otherwise returns false.
// 如果运行此扩展的 VS Code 版本低于 "version" 参数中指定的版本，则返回 true。否则返回 false。
function isVSCodeBelowVersion(version: string): boolean {
	const current = vscode.version.split('.').map(Number);
	const target = version.split('.').map(Number);

	for (let i = 0; i < Math.max(current.length, target.length); i++) {
		const cur = current[i] || 0;
		const tar = target[i] || 0;
		if (cur < tar) return true;
		if (cur > tar) return false;
	}
	return false;
}
