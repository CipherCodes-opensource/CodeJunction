function sendMessage() {
    var userMessage = document.getElementById('userMessage');
    var textContent = userMessage.innerHTML.trim();
    var chatContainer = document.getElementById('chat');
    
    if (textContent.trim() === '') {
        return; // Don't send empty messages
    }

    // Append user message
    var userMessageElement = document.createElement('div');
    userMessageElement.className = 'usersMessage';
    userMessageElement.innerHTML = '<div class="user-message">' + textContent + '</div>';
    chatContainer.appendChild(userMessageElement);

    // Simulate AI response (you would replace this with actual logic)
    var aiMessageElement = document.createElement('div');
    aiMessageElement.className = 'aiMessage';
    aiMessageElement.innerHTML = '<div class="ai-message">AI: Thanks for your message!</div>';
    chatContainer.appendChild(aiMessageElement);

    // Clear input field
    clearText();
    showPlaceholder();
    // Scroll to the bottom of the chat
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function updateSyntaxHighlighting() {
    var languageDropdown = document.getElementById('languageSelector');
    var selectedLanguage = languageDropdown.value;

    var codeEditor = document.getElementById('userMessage').innerHTML;
    codeEditor.className = 'language-' + selectedLanguage;

    // Trigger Prism.js to re-highlight the code
    Prism.highlightAll();
}

function clearText() {
    var codeEditor = document.getElementById('userMessage');
    codeEditor.innerHTML = '';
}
// Show placeholder text when no content is entered in the editor
function showPlaceholder() {
    var codeEditor = document.getElementById('userMessage');
    codeEditor.innerHTML = '<div class="placeholder-text" onclick="hidePlaceholder(this)">Type your code here...</div>';
}
function hidePlaceholder(element) {
    element.style.display = 'none';
}

var editor = CodeMirror.fromTextArea(document.getElementById("userMessage"), {
    lineNumbers: true,
    theme: "monokai",
    mode: "text/plain" // Set default mode to plain text
});

function highlightCode() {
    // Get the plain text content of the editable div
    var code = editor.getValue();
    
    // Get the CodeMirror document and set its value
    var doc = editor.getDoc();
    doc.setValue(code);
    
    // Detect language and set mode
    var language = detectLanguage(code);
    setEditorMode(language);
}

function detectLanguage(code) {
    // You can implement a more sophisticated language detection logic here
    // For simplicity, let's assume it's always JavaScript
    return 'javascript';
}

function setEditorMode(language) {
    var mode;
    switch (language) {
        case 'c':
            mode = 'text/x-csrc';
            break;
        case 'cpp':
            mode = 'text/x-c++src';
            break;
        case 'java':
            mode = 'text/x-java';
            break;
        // Add more cases for other languages

        default:
            mode = 'text/plain';
            break;
    }

    // Set the CodeMirror mode
    editor.setOption("mode", mode);
}