let intervalId;
const calculateButton = document.getElementById("calculate");
const resetButton = document.getElementById("reset");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function resetTimer() {
    clearInterval(intervalId);
    daysElement.textContent = "0";
    hoursElement.textContent = "0";
    minutesElement.textContent = "0";
    secondsElement.textContent = "0";
}

function startTimer() {
    intervalId = setInterval(() => {
        try {
            const inputDate = document.getElementById("input-dates").value;
            
            if(!inputDate) {
                throw new Error('Cannot use an empty date');
            }

            const [year, month, day] = inputDate.split('-').map(part => parseInt(part, 10));
            const desiredDate = new Date(year, month - 1, day);
            const currentDate = new Date();

            if(desiredDate.getTime() <= currentDate.getTime()) {
                throw new Error('Desired date must be greater than current date');
            }

            let differenceInTime = desiredDate.getTime() - currentDate.getTime();
            const differenceInDays = Math.floor(differenceInTime / (1000*3600*24));
            differenceInTime %= 1000*3600*24;
            const differenceInHours = Math.floor(differenceInTime / (1000*3600));
            differenceInTime %= 1000*3600;
            const differenceInMinutes = Math.floor(differenceInTime / (1000*60));
            differenceInTime %= 1000*60;
            const differenceInSeconds = Math.floor(differenceInTime / 1000);

            daysElement.textContent = differenceInDays;
            hoursElement.textContent = differenceInHours;
            minutesElement.textContent = differenceInMinutes;
            secondsElement.textContent = differenceInSeconds;

            if(differenceInTime < 0) {
                resetTimer();
            }
        } catch(error) {
            resetTimer();
            alert(error.message);
        }
    }, 1000);
}

calculateButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);