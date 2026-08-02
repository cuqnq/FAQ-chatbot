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








// // Reveals `text` one character at a time inside `node`, mimicking an AI "typing" effect.
// // node = the DOM element to type into (e.g. the bot's message bubble)
// // text = the full response string to reveal gradually
// const streamText = (node, text) => {

//     let i = 0; // tracks which character we're currently revealing (closure variable — shared by addNextCharacter below)

//     node.innerHTML = ""; // clear out any placeholder text (like "Thinking...") before the reveal starts

//     const chars = text.split(""); // break the full response into an array of individual characters, e.g. "Hi" -> ["H", "i"]

//     const messagesDiv = document.getElementById("messages"); // grab the scrollable chat container once, so we're not re-querying the DOM on every character

//     // Recursive function: reveals one character, then schedules itself to reveal the next
//     const addNextCharacter = () => {

//         // Swap literal newline characters for actual <br> tags, since "\n" alone won't create
//         // a visible line break when inserted via innerHTML
//         let nextChar = chars[i] === "\n" ? "<br>" : chars[i];

//         // Check the user's scroll position BEFORE adding the new character, so we know whether
//         // they were already near the bottom (rather than being thrown off by the content we're about to add)
//         const isNearBottom =
//             messagesDiv.scrollHeight - messagesDiv.scrollTop - messagesDiv.clientHeight < 30;

//         node.innerHTML += nextChar; // append the next character (or <br>) onto what's already revealed

//         // Only auto-scroll if the user was already near the bottom — avoids yanking them down
//         // if they scrolled up on purpose to reread an earlier message
//         if (isNearBottom) {
//             messagesDiv.scrollTop = messagesDiv.scrollHeight;
//         }

//         // If there are more characters left to reveal, move to the next index and schedule
//         // this function to run again after a short, randomized delay (makes the typing feel
//         // more human than a perfectly uniform speed)
//         if (i < chars.length - 1) {
//             i++;
//             setTimeout(addNextCharacter, 5 + Math.random() * 20);
//         }
//         // (no else needed — once the last character is added, recursion simply stops)
//     };

//     addNextCharacter(); // kick off the very first character reveal
// };