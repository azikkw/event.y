import { collection, doc, getDocs, setDoc, getDoc, updateDoc, deleteDoc, query, orderBy } from "@firebase/firestore";
import type { RouteParamValue } from "vue-router";

// Get user info
export const getUserInfo = async () => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    if(user) {
        // @ts-ignore
        const docSnapshot = await getDoc(doc($db, `users`, user));
        return docSnapshot.data();
    }
}

// Add event to events collection
export const addToEvents = async (event: any) => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    const myEvent = {
        id: event.id,
        title: event.name,
        description: getEventDescription(event),
        location: getEventLocation(event),
        calendar: {
            month: getCalendarMonth(event.dates),
            day: getCalendarDay(event.dates),
        },
        fullDate: getFullDate(event.dates),
        date: getEventDate(event.dates),
        time: getEventTime(event.dates)
    }

    if(user) {
        // @ts-ignore
        const userAddedEventsRef = doc($db, `users/${user}/events`, event.id);
        await setDoc(userAddedEventsRef, myEvent);
    }
}
// Create event
export const createEvent = async (event: any) => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    const myEvent = {
        ...event,
        calendar: {
            month: getMonthForCreateEvent(event.date),
            day: getDayForCreateEvent(event.date),
        },
        fullDate: getFullDateForCreateEvent(event.date, event.time)
    }

    if(user) {
        // @ts-ignore
        const userAddedEventsRef = doc($db, `users/${user}/events`, event.id);
        await setDoc(userAddedEventsRef, myEvent);
    }
}
// Get event by id
export const getEvent = async (id: any) => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    if(user) {
        // @ts-ignore
        const docSnapshot = await getDoc(doc($db, `users/${user}/events`, id));
        return docSnapshot.data();
    }
}
// Get events
export const getEvents = async () => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    if(user) {
        // @ts-ignore
        const eventsRef = collection($db, `users/${user}/events`);
        const eventsQuery = query(eventsRef, orderBy('date', 'asc'));
        const querySnapshot = await getDocs(eventsQuery);
        return querySnapshot.docs.map(doc => doc.data());
    }
}
// Get events id for search function
export const getEventsForSearch = async () => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    if(user) {
        // @ts-ignore
        const querySnapshot = await getDocs(collection($db, `users/${user}/events`));
        return querySnapshot.docs.map(doc => doc.id);
    }
}
// Remove from added events
export const removeFromEvents = async (id: string | RouteParamValue[]) => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    if(user) {
        // @ts-ignore
        const userAddedEventsRef = doc($db, `users/${user}/events`, id);
        await deleteDoc(userAddedEventsRef);
    }
}
// Update event function
export const updateEvent = async (id: any, updatedData: any) => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    if(user) {
        const eventDocRef = doc($db, `users/${user}/events`, id);
        await updateDoc(eventDocRef, updatedData);
    }
};