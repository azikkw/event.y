export default defineEventHandler(async (event) => {

    const { query, page } = getQuery(event);
    const { ticketMasterKey } = useRuntimeConfig();

    const date = new Date().toISOString().split('.')[0] + 'Z';

    const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${query}&page=${page}&startDateTime=${date}&apikey=${ticketMasterKey}`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    }

    return await fetch(url, options).then(res => res.json());

});