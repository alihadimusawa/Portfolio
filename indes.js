
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' } });
require(['vs/editor/editor.main'], function () {
    // Initialize Monaco Editor
    monaco.editor.create(document.getElementById('monaco-editor'), {
        value: `// JavaScript program to check if a number is odd or even
function checkOddOrEven(number) {
if (number % 2 === 0) {
    console.log(number + ' is an Even number.');
} else {
    console.log(number + ' is an Odd number.');
}
}

// Test the function with a sample number
checkOddOrEven(5);
`,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true, // Automatically adjust the layout
        scrollBeyondLastLine: false, // Prevent scrolling beyond the content
        lineNumbers: "on",
        minimap: { enabled: false }, // Disable the minimap if you want a simpler view
        wordWrap: "on" // Wrap long lines to prevent horizontal scrolling
    });

    // Dynamically adjust height based on content
    const contentHeight = Math.min(300, editor.getContentHeight());
    document.getElementById('monaco-editor').style.height = contentHeight + "px";
    editor.layout();
});
