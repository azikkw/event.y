import moment from "moment-timezone";

// Utility function to get the next day
export function getNextDay() {
    const today = moment();
    const nextDay = today.add(1, 'day');
    return nextDay.format('YYYY-MM-DD');
}

// Utility function to get calendar date
export function getMonthForCreateEvent(date: any): string {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString('en-US', { month: 'short' });
}
// Utility function to get calendar day
export function getDayForCreateEvent(date: any): string {
    const formattedDate = new Date(date);
    return formattedDate.getDate().toString().padStart(2, '0');
}

// Utility function to get full date
export function getFullDateForCreateEvent(date: any, time: any): string {
    return date + ' at ' + time;
}