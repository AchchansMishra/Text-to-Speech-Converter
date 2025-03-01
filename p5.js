let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Populate voices and set default
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = ""; // Clear previous options

    voices.forEach((voice, i) => {
        let option = new Option(voice.name, i);
        voiceSelect.appendChild(option);
    });

    // Set default voice
    if (voices.length > 0) {
        speech.voice = voices[0];
    }
}

// Ensure voices are loaded properly
window.speechSynthesis.onvoiceschanged = populateVoices;
populateVoices(); // Call in case voices are already available

// Handle voice selection change
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Handle speech on button click
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    
    // Cancel ongoing speech before starting new one
    window.speechSynthesis.cancel();
    
    window.speechSynthesis.speak(speech);
});
