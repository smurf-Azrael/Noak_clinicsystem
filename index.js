class Doctor {
    constructor(name, avgConsultationTime) {
        this.name = name;
        this.avgConsultationTime = avgConsultationTime;
    }
}

function calculateWaitingTime(doctors, positionInQueue) {
    const numPatients = positionInQueue;
    const totalDoctors = doctors.length;

    let totalWaitingTime = 0;

    if (numPatients === 0) {
        return totalWaitingTime;
    }

    const patientsPerDoctor = Math.floor(numPatients / totalDoctors);
    const extraPatients = numPatients % totalDoctors;

    for (let i = 0; i < totalDoctors; i++) {
        let patientsForThisDoctor = patientsPerDoctor;
        if (i < extraPatients) {
            patientsForThisDoctor++;
        }

        totalWaitingTime += patientsForThisDoctor * doctors[i].avgConsultationTime;
    }

    return totalWaitingTime;
}

document.getElementById("waitingTimeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const numDoctors = parseInt(document.getElementById("numDoctors").value);
    const queuePosition = parseInt(document.getElementById("queuePosition").value);

    const doctors = [];
    for (let i = 0; i < numDoctors; i++) {
        const avgConsultationTime = prompt(`Enter average consultation time for Doctor ${i + 1} (in minutes):`);
        if (avgConsultationTime) {
            doctors.push(new Doctor(`Doctor ${i + 1}`, parseInt(avgConsultationTime)));
        }
    }

    const waitingTime = calculateWaitingTime(doctors, queuePosition - 1);
    document.getElementById("result").innerText = `Estimated waiting time for the patient is ${waitingTime} minutes.`;
});
