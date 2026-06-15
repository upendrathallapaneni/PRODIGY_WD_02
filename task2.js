(() => {
    const displayEl = document.getElementById('display');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const lapBtn = document.getElementById('lapBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapsList = document.getElementById('lapsList');

    let timerId = null;
    let startTime = 0;
    let elapsedTime = 0;
    let lapCount = 0;
    let running = false;

    function formatTime(totalMilliseconds) {
        const totalCentiseconds = Math.floor(totalMilliseconds / 10);
        const centiseconds = String(totalCentiseconds % 100).padStart(2, '0');
        const totalSeconds = Math.floor(totalCentiseconds / 100);
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = String(totalMinutes % 60).padStart(2, '0');
        const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');

        return { hours, minutes, seconds, centiseconds };
    }

    function renderTime() {
        const { hours, minutes, seconds, centiseconds } = formatTime(elapsedTime);
        displayEl.innerHTML = `${hours}:${minutes}:${seconds}.<span class="ms">${centiseconds}</span>`;
    }

    function updateTimer() {
        elapsedTime = Date.now() - startTime;
        renderTime();
        timerId = requestAnimationFrame(updateTimer);
    }

    function setRunningState(isRunning) {
        running = isRunning;
        startPauseBtn.textContent = isRunning ? 'Pause' : 'Start';
        startPauseBtn.classList.toggle('start', !isRunning);
        startPauseBtn.classList.toggle('pause', isRunning);
        lapBtn.disabled = !isRunning;
        resetBtn.disabled = elapsedTime === 0 && lapsList.children.length === 0;
    }

    startPauseBtn.onclick = () => {
        if (!running) {
            startTime = Date.now() - elapsedTime;
            timerId = requestAnimationFrame(updateTimer);
            setRunningState(true);
            return;
        }

        cancelAnimationFrame(timerId);
        elapsedTime = Date.now() - startTime;
        renderTime();
        setRunningState(false);
    };

    lapBtn.onclick = () => {
        if (!running) return;

        lapCount += 1;
        const { hours, minutes, seconds, centiseconds } = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.innerHTML = `<span class="lap-number">Lap ${lapCount}</span><span class="lap-time">${hours}:${minutes}:${seconds}.<span class="ms">${centiseconds}</span></span>`;
        lapsList.prepend(li);
        resetBtn.disabled = false;
    };

    resetBtn.onclick = () => {
        cancelAnimationFrame(timerId);
        timerId = null;
        startTime = 0;
        elapsedTime = 0;
        lapCount = 0;
        lapsList.innerHTML = '';
        renderTime();
        setRunningState(false);
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.remove('pause');
        startPauseBtn.classList.add('start');
    };

    renderTime();
    setRunningState(false);
})();