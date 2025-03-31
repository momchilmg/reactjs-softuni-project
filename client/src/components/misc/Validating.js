export function isValidDate(dateString) {
    const d = new Date(dateString);
    return !isNaN(d.getTime());
}

export function isValidTime(timeString) {
    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!timeRegex.test(timeString)) {
        return false;
    }

    return true;
}

export function isFutureDateTime(dateTimeString) {
    const inputDateTime = new Date(dateTimeString);
    const currentDateTime = new Date();

    if (isNaN(inputDateTime.getTime())) {
        return false;
    }

    return inputDateTime > currentDateTime;
}

export function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}