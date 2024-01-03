const hx = require("hbuilderx");
const CanIUse = require('./can-i-use.ts')

//该方法将在插件激活的时候调用
function activate(context) {
	const disposable = hx.commands.registerCommand('extension.canIUse', () => {
		
		const caniuse = new CanIUse();
		
		const activeEditor = hx.window.getActiveTextEditor();
		activeEditor.then(function(editor){
			
			if (!editor) {
			    return;
			}
			
			// 获取光标所在位置
			const cursorPosition = editor.selection.active;
			
			// 获取选中文本
			const selectedText = editor.document.getText(editor.selection);

			// 在控制台打印选中文本
			console.log('Selected Text:', caniuse.getNormalizedRule(selectedText).toLowerCase());
			
			caniuse.retrieveInformation(caniuse.getNormalizedRule(selectedText).toLowerCase(), showOutput);
		
		});
		
	});
	//订阅销毁钩子，插件禁用的时候，自动注销该command。
	context.subscriptions.push(disposable);
}

function showOutput(message) {
	console.log('message>>>>》》》》',message);
    hx.window.setStatusBarMessage(message);
}


//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}
module.exports = {
	activate,
	deactivate
}
