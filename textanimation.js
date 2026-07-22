const streamText = (node, text) => {

    let i = 0;
    node.innerHTML = "";
    const chars = text.split("");
    const messagesDiv = document.getElementById("messages"); 

    const addNextCharacter = () => {
        let nextChar = chars[i] === "\n" ? "<br>" : chars[i];

        const isNearBottom =
            messagesDiv.scrollHeight - messagesDiv.scrollTop - messagesDiv.clientHeight < 30;

        node.innerHTML += nextChar;

        if (isNearBottom) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        if (i < chars.length - 1) {
            i++;
            setTimeout(addNextCharacter, 5 + Math.random() * 20);
        }
    };

    addNextCharacter();
};