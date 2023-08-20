function inputGmailTest(text) {
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '@') return true;
    }
    return false;
}

function inputTextTest(text, num) {
    if (text.length <= num) return true;
    return false;
}

module.exports = {
    inputGmailTest: inputGmailTest,
    inputTextTest: inputTextTest,
}