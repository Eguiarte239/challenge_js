let intervalId;

document.getElementById("calculate").onclick = function () {
    intervalId = setInterval( function () {
        try {
            let inputDate = document.getElementById("input-dates").value;
            
            if(!inputDate) {
                throw new Error('Cannot use an empty date');
            }

            let dateParts = inputDate.split('-');
            let year = parseInt(dateParts[0], 10);
            let month = parseInt(dateParts[1], 10) - 1;
            let day = parseInt(dateParts[2], 10);
            let desiredDate = new Date(year, month, day);
            let currentDate = new Date();

            if(desiredDate.getTime() <= currentDate.getTime()) {
                throw new Error('Desired date must be greater than current date');
            }

            let differenceInTime = desiredDate.getTime() - currentDate.getTime();
            let differenceInDays = Math.floor(differenceInTime / (1000*3600*24));
            let differenceInHours = Math.floor((differenceInTime % (1000*3600*24)) / (1000*3600));
            let differenceInMinutes = Math.floor((differenceInTime & (1000*3600)) / (1000*60));
            let differenceInSeconds = Math.floor((differenceInTime % (1000*60)) / 1000);

            document.getElementById('days').textContent = differenceInDays;
            document.getElementById('hours').textContent = differenceInHours;
            document.getElementById('minutes').textContent = differenceInMinutes;
            document.getElementById('seconds').textContent = differenceInSeconds;

            if(differenceInTime < 0) {
                clearInterval(intervalId);
                document.getElementById('days').textContent = '0';
                document.getElementById('hours').textContent = '0';
                document.getElementById('minutes').textContent = '0';
                document.getElementById('seconds').textContent = '0';
            }
        } catch(error) {
            clearInterval(intervalId);
            alert(error.message);
        }
    }, 1000);
};

document.getElementById('reset').onclick = function () {
    clearInterval(intervalId);
    document.getElementById('days').textContent = '0';
    document.getElementById('hours').textContent = '0';
    document.getElementById('minutes').textContent = '0';
    document.getElementById('seconds').textContent = '0';
}