const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

 const synth = window.speechSynthesis;
    let currentUtterance = null;
    let voices = [];
    let faVoice = null;

    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resumeBtn = document.getElementById("resumeBtn");
    const stopBtn = document.getElementById("stopBtn");
    const textInput = document.getElementById("text");
    const statusText = document.getElementById("status");

  
    function loadVoices() {
      voices = synth.getVoices();
      faVoice = voices.find(v => v.lang.startsWith("fa"));
      if (faVoice) {
        statusText.textContent = `✅ صدای فارسی شناسایی شد: ${faVoice.name}`;
      } else {
        statusText.textContent = "⚠️ صدای فارسی یافت نشد، متن با لهجه انگلیسی خوانده می‌شود.";
      }
    }

    speechSynthesis.onvoiceschanged = loadVoices;

   
    playBtn.addEventListener("click", () => {
      const text = textInput.value.trim();
      if (!text) {
        alert("Enter your text!");
        return;
      }

      synth.cancel(); 

      currentUtterance = new SpeechSynthesisUtterance(text);


      if (faVoice) {
        currentUtterance.voice = faVoice;
        currentUtterance.lang = "fa-IR";
      } else {
        currentUtterance.lang = "en-US"; 
      }

      synth.speak(currentUtterance);
    });

 
    pauseBtn.addEventListener("click", () => {
      if (synth.speaking && !synth.paused) synth.pause();
    });

   
    resumeBtn.addEventListener("click", () => {
      if (synth.paused) synth.resume();
    });

    
    stopBtn.addEventListener("click", () => synth.cancel());


const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetId = tab.dataset.tab;
        tabContents.forEach(tc => {
            tc.classList.toggle('active', tc.id === targetId);
        });
    });
});


const translateBtn = document.getElementById('translateBtn');
translateBtn.addEventListener('click', () => {
    const inputText = document.getElementById('translateInput').value;
    if (!inputText.trim()) {
        alert("Enter your text.");
        return;
    }
    const translateBtn = document.getElementById('translateBtn');

translateBtn.addEventListener('click', () => {
    const inputText = document.getElementById('translateInput').value;

    if (!inputText.trim()) {
        alert("Enter your text.");
        return;
    }

    const sourceLang = "en";
    const targetLang = "fa";

    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLang}|${targetLang}`)
        .then(res => res.json())
        .then(data => {
           const translatedText = data.responseData.translatedText;
            document.getElementById("translateOutputContainer").style.display = 'block';
            document.getElementById("translateOutput").value = data.responseData.translatedText;
        })
        .catch(err => {
            console.error(err);
            alert("Error translating text.");
        });
});
});
