let minutesInput = document.getElementById("minutesInput");
let secondsInput = document.getElementById("secondsInput");
let startButton = document.getElementById("startButton");
let progressBar = document.getElementById("progressBar");
let colonStyle = document.getElementById("colonStyle");

let progressBarMax;
let changeSeconds = 0;
let changeMinutes = 0;
let stopper;

const setTime = function(){
    clearTimeout(stopper);
    let getMinutes = parseInt(minutesInput.value);
    let getSeconds = parseInt(secondsInput.value);   
    
    // Lógica dos segundos

    if(getSeconds <= 9){
        let originalValue = secondsInput.value;
        secondsInput.value = ("0" + originalValue).slice(-2);
    }
    else if(getSeconds >= 60){
        secondsInput.value = ("0" + 0).slice(-2);
        changeSeconds = 0;
    }
    else if(getSeconds >= 10){
        secondsInput = getSeconds;
    }
    else if(secondsInput.value == ""){
        secondsInput.value = ("0" + 0).slice(-2);
    }

    // Lógica dos Minutos

    if(minutesInput.value == ""){
        minutesInput.value = 0;
    }
    changeMinutes = parseInt(minutesInput.value);
    changeMinutes = changeMinutes * 60;
    changeSeconds = parseInt(secondsInput.value);
    let totalTime = changeSeconds + changeMinutes;

    progressBar.value = 0;
    progressBar.setAttribute("max", totalTime);
    progressBarMax = totalTime;
}

minutesInput.addEventListener("keyup", setTime);
minutesInput.addEventListener("click", setTime);
secondsInput.addEventListener("keyup", setTime);
secondsInput.addEventListener("click", setTime);

// contagem regressiva principal

const progressCountDown = function(){
    secondsInput.classList.add("form_active");
    minutesInput.classList.add("form_active");
    colonStyle.classList.add("form_active");


    minutesInput.disabled = false;
    secondsInput.disabled = false;

    stopper = setTimeout(progressCountDown, 1000);

    if(secondsInput.value == 0 && minutesInput.value > 0){
        secondsInput.value = 60;
        minutesInput.value -= 1;
    }
    if(secondsInput.value > 0){
        secondsInput.value -= 1;
        progressBar.value += 1;
    }
    if(secondsInput.value < 10){
        let concatSeconds = secondsInput.value;
        secondsInput.value = ("0" + concatSeconds).slice(-2);
    }

    // Remover estilo

    if(progressBar.value == progressBar.max){
        secondsInput.classList.remove("form_active");
        minutesInput.classList.remove("form_active");
        colonInput.classList.remove("form_active");

        // SOM do fim da barra de progresso

        let soundClick = document.createElement("audio");
        soundClick.src = "http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3"
        soundClick.autoplay = "true", document.body.appendChild(soundClick);

        clearTimeout(stopper);
        minutesInput.removeAttribute("disabled");
        secondsInput.removeAttribute("disabled");

    }

    
}

const progressReset = function(){
    progressBar.value = 0;
    secondsInput.value = ("0" + 0).slice(-2);
    minutesInput.value = 0;
    progressBar.setAttribute("max" , 0);
    secondsInput.classList.remove("form_active");
    minutesInput.classList.remove("form_active");
    colonStyle.classList.remove("form_active");
    minutesInput.removeAttribute("disabled");
    secondsInput.removeAttribute("disabled");
    clearTimeout(stopper);
}

const enterPressed = function(event){
    let key = event.which || event.keyCode;

    if(key == 13){
        progressCountDown();
        secondsInput.setAttribute("disabled", true);
        minutesInput.setAttribute("disabled", true);
    }
}

startButton.addEventListener("click", progressCountDown);
resetButton.addEventListener("click", progressCountDown);
minutesInput.addEventListener("keypress", enterPressed);
secondsInput.addEventListener("keypress", enterPressed);