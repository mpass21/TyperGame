
function startTyper(prompt) {
    console.log("typern pnuts")
    const textDisplay = document.getElementById("textDisplay");
    const timerDisplay = document.getElementById("timerDisplay");
    let originalText = "hello my name is mason and this is the text hahah";
    let text = null;
    let errorCount = 0;
    let i = 15;
    let onCompleteCallback = null;
    let timerStarted = false;
    let seconds = 0;
    let timerInterval = null;

    originalText = prompt;

    text = originalText.slice(0, i);
    textDisplay.innerText = text;

    document.addEventListener("keydown", handleKeyPress);

    return new Promise((resolve, reject) => {
        setOnCompleteCallback(resolve);
    });

    function setOnCompleteCallback(callback) {
        onCompleteCallback = callback;
    }

    function startTimer() {
        timerStarted = true;
        seconds = 0;

        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.innerText = seconds + " seconds";
        }, 1000);
    }

    function stopTimer() {
        if (timerStarted) {
            clearInterval(timerInterval);
            timerStarted = false;
            timerDisplay.innerText = "";
            return seconds; // Return the final timer value
        }
        return 0; // Return 0 if the timer was not started
    }

    function flashRed() {
        textDisplay.style.color = "red";
        setTimeout(() => {
            textDisplay.style.color = "black";
        }, 100);
    }

    function handleKeyPress(event) {
        if (!timerStarted) {
            startTimer();
        }
        const pressedKey = event.key;
       
        if (pressedKey === "Shift") {
            return;
        }
        if (i < originalText.length) {
            if (pressedKey === text[0]) {
                text = text.slice(1);
                text += originalText[i];
                i++;
                textDisplay.innerText = text;
            } else {
                console.log(pressedKey);
                flashRed(pressedKey);
                errorCount++;
            }
        } else {
            if (pressedKey === text[0]) {
                text = text.slice(1);
                textDisplay.innerText = text;

                if (text.length === 0) {
                    console.log("removing event Listener");
                    document.removeEventListener("keydown", handleKeyPress);
                    const finalSeconds = stopTimer();
                    onCompleteCallback({ seconds: finalSeconds, errors: errorCount });
                }
            } else {
                console.log(pressedKey);
                flashRed();
                errorCount++;
            }
        }
    }
}






