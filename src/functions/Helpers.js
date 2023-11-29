export const getISODate = () => {
    // Get current date and time
    let currentDate = new Date();

    // Set time to start of the day (midnight)
    currentDate.setHours(0, 0, 0, 0);

    // Convert to ISO string
    let isoString = currentDate.toISOString();
    return isoString;
};