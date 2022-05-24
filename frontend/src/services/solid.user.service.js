import {
    getSolidDataset,
    getThingAll, getUrl,
} from "@inrupt/solid-client";
import {RDF} from "@inrupt/vocab-common-rdf";
import {cleanWebId} from "../tools/SolidTools";


class SolidUserService {

    isSolidUser(session) {
        return session.info.isLoggedIn
    }

    async getUserInfo(session) {
        const dataSet = await getSolidDataset(cleanWebId(session.info.webId, 'profile/card'), {fetch: session.fetch});
        let ob = {oidcIssuer: "", name: ""}
        for (const thing of getThingAll(dataSet)) {
            const type = getUrl(thing, RDF.type)
            if (type === "http://xmlns.com/foaf/0.1/Person")
                ob.oidcIssuer = getUrl(thing, "http://www.w3.org/ns/solid/terms#oidcIssuer")
            else if (type === 'http://xmlns.com/foaf/0.1/PersonalProfileDocument')
                ob.name = getUrl(thing, "http://xmlns.com/foaf/0.1/maker").split("/")[3]
        }
        return ob
    }

}

export default new SolidUserService();