// Utility function to get event full address
export function getEventLocation(event: any): string {
    if(event._embedded?.venues) {
        const venue = event._embedded.venues[0];
        const city = venue.city?.name || '';
        const country = venue.country?.name || '';
        const address = venue.name || venue.address?.line1 || '';
        return `${address}${city ? ', ' + city : ''}${country ? ', ' + country : ''}`;
    } else if (event.place) {
        const place = event.place;
        const city = place.city?.name || '';
        const country = place.country?.name || '';
        const address = place.address?.line1 || '';
        return `${address}${city ? ', ' + city : ''}${country ? ', ' + country : ''}`;
    }
    return 'Online Event';
}

// Utility function to get event description
export function getEventDescription(event: any): string {
    return event.description || event.info || '-';
}

// Utility function to get calendar date
export function getCalendarMonth(dates: any): string {
    if (dates.start?.localDate) {
        const date = new Date(dates.start.localDate);
        return date.toLocaleString('en-US', { month: 'short' }); // Use 'en-US' for better compatibility
    }
    return '';
}
// Utility function to get calendar day
export function getCalendarDay(dates: any): string {
    if (dates.start?.localDate) {
        const date = new Date(dates.start.localDate);
        return date.getDate().toString().padStart(2, '0');
    }
    return '';
}

// Utility function to get event time
export function getEventTime(dates: any): string {
    if (dates.start?.localTime) {
        return ' at ' + dates.start.localTime;
    }
    return '';
}
// Utility function to get full date
export function getFullDate(dates: any): string {
    if (dates.start?.localDate) {
        return dates.start.localDate + getEventTime(dates);
    }
    return '';
}