import {
    buildThing, createThing,
    getSolidDataset, getThing,
    getThingAll, getUrl, saveSolidDatasetAt, setThing,
} from "@inrupt/solid-client";
import {RDF} from "@inrupt/vocab-common-rdf";
import {cleanWebId} from "../tools/SolidTools";


class SolidUserService {

    isSolidUser(session) {
        return session.info.isLoggedIn
    }

    async discoverType(session, searchType, backupPath) {
        const privateTypeIndex = (await this.getUserInfo(session)).privateTypeIndex;
        let dataSet = await getSolidDataset(privateTypeIndex, {fetch: session.fetch});
        for (const thing of getThingAll(dataSet)) {
            const type = getUrl(thing, RDF.type)
            if (type === "http://www.w3.org/ns/solid/terms#TypeRegistration") {
                if (getUrl(thing, "http://www.w3.org/ns/solid/terms#forClass") === searchType) {
                    console.log("found")
                    return getUrl(thing, "http://www.w3.org/ns/solid/terms#instanceContainer")
                }
            }
        }
        // no index defined, make one
        const url = cleanWebId(session.info.webId, backupPath)
        let TypeRegistration = buildThing(createThing({name: searchType.split('/')[searchType.split('/').length - 1] + "TypeRegistration"}))
            .addUrl(RDF.type, "http://www.w3.org/ns/solid/terms#TypeRegistration")
            .addUrl("http://www.w3.org/ns/solid/terms#instanceContainer", url)
            .addUrl("http://www.w3.org/ns/solid/terms#forClass", searchType)
            .build()
        dataSet = setThing(dataSet, TypeRegistration)
        await saveSolidDatasetAt(
            privateTypeIndex,
            dataSet,
            {fetch: session.fetch}             // fetch from authenticated Session
        );
        return url;
    }

    async getUserInfo(session) {
        const dataSet = await getSolidDataset(cleanWebId(session.info.webId, 'profile/card'), {fetch: session.fetch});
        let ob = {oidcIssuer: "", name: ""}
        for (const thing of getThingAll(dataSet)) {
            const type = getUrl(thing, RDF.type)
            if (type === "http://xmlns.com/foaf/0.1/Person") {
                ob.oidcIssuer = getUrl(thing, "http://www.w3.org/ns/solid/terms#oidcIssuer")
                ob.privateTypeIndex = getUrl(thing, "http://www.w3.org/ns/solid/terms#privateTypeIndex")
            } else if (type === 'http://xmlns.com/foaf/0.1/PersonalProfileDocument') {
                ob.name = getUrl(thing, "http://xmlns.com/foaf/0.1/maker").split("/")[3]
            }
        }
        return ob
    }

}

export default new SolidUserService();