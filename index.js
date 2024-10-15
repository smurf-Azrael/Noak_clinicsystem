// Define the Doctor class
class Doctor {
    constructor(name, avgConsultationTime) {
        this.name = name;
        this.avgConsultationTime = avgConsultationTime; // in minutes
    }
}

// Function to calculate estimated waiting time
function calculateWaitingTime(doctors, positionInQueue) {
    const numPatients = positionInQueue; // Total patients ahead of the new patient
    const totalDoctors = doctors.length;

    // Total waiting time variable
    let totalWaitingTime = 0;

    // Distribute patients among doctors
    const patientsPerDoctor = Math.floor(numPatients / totalDoctors);
    const extraPatients = numPatients % totalDoctors; // Patients that don't evenly divide

    // Calculate waiting time for each doctor
    for (let i = 0; i < totalDoctors; i++) {
        let patientsForThisDoctor = patientsPerDoctor;
        if (i < extraPatients) {
            patientsForThisDoctor++; // Distribute extra patients
        }

        totalWaitingTime += patientsForThisDoctor * doctors[i].avgConsultationTime;
    }

    return totalWaitingTime;
}

// Handle form submission
document.getElementById("waitingTimeForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const numDoctors = parseInt(document.getElementById("numDoctors").value);
    const queuePosition = parseInt(document.getElementById("queuePosition").value);

    const doctors = [];
    for (let i = 0; i < numDoctors; i++) {
        const avgConsultationTime = prompt(`Enter average consultation time for Doctor ${i + 1} (in minutes):`);
        if (avgConsultationTime) {
            doctors.push(new Doctor(`Doctor ${i + 1}`, parseInt(avgConsultationTime)));
        }
    }

    const waitingTime = calculateWaitingTime(doctors, queuePosition - 1); // Adjust for zero-based index
    document.getElementById("result").innerText = `Estimated waiting time for the patient is ${waitingTime} minutes.`;
});
