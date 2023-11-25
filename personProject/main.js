
document.addEventListener("DOMContentLoaded", function(){
    const apiUrl = 'https://api.quotable.io/random';
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const finish = document.getElementById("finish");
    const results = document.getElementById("results");
    const promptPreview = document.getElementById("promptPreview");
    const startButton = document.getElementById("startButton");
    const replayTest = document.getElementById("replayTest");
    const newTest = document.getElementById("newTest");
    let finalTimerValue = 0;
    let wpm = 0;
    let errors = 0;
    let prompt = "";
    

    
  
    async function getRandomQuote() {
        try {
            const response = await fetch(apiUrl);
            const Data = await response.json();
            quote = Data.content;
            return quote;
        } catch (error) {
            console.error("error", error);
            return "error";
        }
    }
    async function setPromptPreview() {
        prompt = await getRandomQuote();
        promptPreview.innerText = prompt;
    }
    function wordsPerMiniute(prompt, seconds) {
        const words = prompt.match(/\b\w+\b/g);
        wpm = Math.round((words.length / (seconds / 60)));
    }
 
    function displayFinish() {
        page1.style.display = "none";
        page2.style.display = "none";
        finish.classList.add("visible");

        wordsPerMiniute(prompt, finalTimerValue);
        results.innerText ="Words Per Miniute: " + wpm; 
    }
    async function startTypingTest() {
        try {
            const result = await startTyper(prompt);
            finalTimerValue = result.seconds;
            errors = result.errors;
            displayFinish();
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    // initial setting the prompt preview
    setPromptPreview();

    //allowing prompt preview to be changed when user clicks it
    promptPreview.addEventListener("click", () => {
        setPromptPreview();
    });



    //Actions that start they typing test
    startButton.addEventListener("click", function() {
        // Toggle the display of page1 and page2
        page1.style.display = "none";
        page2.style.display = "block";
          
        startTypingTest();
    });

    //replaying with the same prompt
    replayTest.addEventListener("click", function() {

        // Toggle the display of page1 and page2
        finish.classList.remove("visible")
        page2.style.display = "block";
        startTypingTest();
       
    });
    //replaying with the new
    newTest.addEventListener("click", async () => {
        
        //updating for a new test
        await setPromptPreview();
        finish.classList.remove("visible");
        page2.style.display = "block";
        startTypingTest();     
   });
});