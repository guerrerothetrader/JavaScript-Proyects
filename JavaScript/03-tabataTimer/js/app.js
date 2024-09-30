document.addEventListener("DOMContentLoaded", function() {
    let [seconds, minutes, hours] = [0, 0, 0];
    let displayTime = document.getElementById("displayTime");
    let roundsDisplay = document.getElementById("rounds");
    let timer = null;
    let round = 1;
    let phase = 'training'; // 'training' or 'rest'

    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('show');
    });

    const sports = {
        sprints: {
            totalRounds: 8,
            trainingTime: 30,
            restTime: 600
        },
        tabata: {
            totalRounds: 12,
            trainingTime: 60,
            restTime: 20
        },
        box: {
            totalRounds: 6,
            trainingTime: 180,
            restTime: 60
        }
    };

    const soundTraining = new Audio('../media/sil1.mp3');
    const soundRest = new Audio('../media/sil1.mp3');
    const soundFinish = new Audio('../media/sil2.mp3');

    function updateDisplay() {
        let h = hours < 10 ? "0" + hours : hours;
        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;
        displayTime.innerHTML = h + ":" + m + ":" + s;
    }

    function stopwatch() {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
        updateDisplay();

        const currentSport = sports[document.body.getAttribute('data-sport')];
        const { totalRounds, trainingTime, restTime } = currentSport;

        if (phase === 'training' && (hours * 3600 + minutes * 60 + seconds) >= trainingTime) {
            phase = 'rest';
            [seconds, minutes, hours] = [0, 0, 0];
            updateDisplay();
            roundsDisplay.innerHTML = `Ronda: ${round} de ${totalRounds} (Descanso)`;
            soundRest.play();
        } 
        else if (phase === 'rest' && (hours * 3600 + minutes * 60 + seconds) >= restTime) {
            round++;
            if (round > totalRounds) {
                stopTraining();
                roundsDisplay.innerHTML = 'Entrenamiento completo';
                soundFinish.play();
            } else {
                phase = 'training';
                [seconds, minutes, hours] = [0, 0, 0];
                updateDisplay();
                roundsDisplay.innerHTML = `Ronda: ${round} de ${totalRounds}`;
                soundTraining.play();
            }
        }
    }

    function startTraining() {
        if (timer !== null) {
            clearInterval(timer);
        }
        timer = setInterval(stopwatch, 1000);
        soundTraining.play();
    }

    function stopTraining() {
        clearInterval(timer);
    }

    function resetTraining() {
        clearInterval(timer);
        [seconds, minutes, hours] = [0, 0, 0];
        round = 1;
        phase = 'training';
        updateDisplay();
        roundsDisplay.innerHTML = `Ronda: ${round} de ${sports[document.body.getAttribute('data-sport')].totalRounds}`;
    }

    document.querySelector('.buttons img[alt="Stop Button"]').addEventListener('click', stopTraining);
    document.querySelector('.buttons img[alt="Play Button"]').addEventListener('click', startTraining);
    document.querySelector('.buttons img[alt="Reset Button"]').addEventListener('click', resetTraining);
});
