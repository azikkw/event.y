import { collection, doc, getDocs, setDoc, getDoc, deleteDoc } from "@firebase/firestore";

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

// Add event to added events collection
export const addToEvents = async (event: any) => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    const myEvent = {
        id: event.id,
        title: event.name,
        description: getEventDescription(event),
        fullDate: getFullDate(event.dates),
        calendar: {
            month: getCalendarMonth(event.dates),
            day: getCalendarDay(event.dates),
        },
        location: getEventLocation(event)
    }

    if(user) {
        // @ts-ignore
        const userAddedEventsRef = doc($db, `users/${user}/events`, event.id);
        await setDoc(userAddedEventsRef, myEvent);
    }
}
// Get events
export const getEvents = async () => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    if(user) {
        // @ts-ignore
        const querySnapshot = await getDocs(collection($db, `users/${user}/events`));
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
export const removeFromEvents = async (id: string) => {
    const { $db } = useNuxtApp();
    const user = useFirebaseUser();

    if(user) {
        // @ts-ignore
        const userAddedEventsRef = doc($db, `users/${user}/events`, id);
        await deleteDoc(userAddedEventsRef);
    }
}