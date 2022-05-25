import {
    buildThing,
    createSolidDataset, createThing,
    getSolidDataset,
    getStringNoLocale,
    getThing,
    getThingAll,
    getUrl,
    getUrlAll, saveSolidDatasetAt, setThing
} from "@inrupt/solid-client";
import {cleanWebId, makeId} from "../tools/SolidTools";
import {LDP, RDF} from "@inrupt/vocab-common-rdf";
import SolidUserService from "./solid.user.service";

class SolidContactsService {
    async getAllContacts(session) {
        //TODO discover contacts folder trough profile
        const peopleDataset = await getSolidDataset(cleanWebId(session.info.webId, 'contacts/people.ttl'), {fetch: session.fetch});
        let peopleThings = getThingAll(peopleDataset);

        const contactURLs = peopleThings.filter(thing => {
            return getUrl(thing, RDF.type) !== 'http://www.w3.org/ns/ldp#RDFSource'
        }).map(movie => movie.url)

        const contacts = []

        for (const contactURL of contactURLs) {
            const contactDataset = await getSolidDataset(contactURL, {fetch: session.fetch});
            const contactThings = getThingAll(contactDataset)
            const obj = {};
            for (const contactThing of contactThings) {
                const type = getUrl(contactThing, RDF.type);
                if (type === 'http://www.w3.org/2006/vcard/ns#WebId') {
                    obj.url = getUrl(contactThing, 'http://www.w3.org/2006/vcard/ns#value')
                } else if (type === 'http://www.w3.org/2006/vcard/ns#Individual') {
                    obj.name = getStringNoLocale(contactThing, 'http://www.w3.org/2006/vcard/ns#fn')
                }
            }
            contacts.push(obj);
        }
        return contacts;
    }

    async createInvite(session, friendUrl, movieName) {
        const userInfo = await SolidUserService.getUserInfoForWebId(session, friendUrl)
        let inviteDataset = createSolidDataset();
        const eventInviteThing = buildThing(createThing({name: "invite"}))
            .addStringNoLocale("https://schema.org/description", `Want to watch ${movieName} with me?`)
            .addUrl(RDF.type, "https://schema.org/InviteAction")
            .build();
        inviteDataset = setThing(inviteDataset, eventInviteThing);
        console.log(userInfo.inbox + makeId(10))
        await saveSolidDatasetAt(
            userInfo.inbox + makeId(10),
            inviteDataset,
            {fetch: session.fetch}             // fetch from authenticated Session
        );
    }
}

export default new SolidContactsService();