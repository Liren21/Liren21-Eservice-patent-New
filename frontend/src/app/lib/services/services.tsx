/* eslint-disable @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-unsafe-call*/

import axios from 'axios'

import urls from '../urls'
import {handlerError, handlerSuccess} from '../../../core/lib/api/common'
import Demand from "../models/demand";
import appStore from "../../../core/lib/store/app";
import pagesStore from "../store/pages-store";
import Authors from "../models/authors";
import addUser from "../store/addUser";


export default {
    async getApplication(): Promise<Demand[]> {
        appStore.setLoading(true)
        let result: Demand[]

        await axios
            .get(urls.GET_APPLICATION)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    result = data ? data.map((d) => new Demand(d)) : []
                    console.log(data)

                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))

        return result
    },
    async getApplicationById(row): Promise<Demand[]> {
        appStore.setLoading(true)
        let result: Demand[]
        const url = `${urls.GET_APPLICATION_BY_ID}?id=${row}`

        await axios
            .get(url)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    pagesStore.setPatentContent(data)
                    pagesStore.setAuthors(data.authors)
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))

        return result
    },
    async postUpdInfoRid(name, addressDemand, objType, owner, createDate): Promise<Demand> {
        appStore.setLoading(true)
        let result: Demand


        const data = {
            id: pagesStore.patentContent['id'],
            objType: objType == '' ? pagesStore.patentContent['objType'] : objType,
            name: name == '' ? pagesStore.patentContent['name'] : name,
            addressDemand: addressDemand == '' ? pagesStore.patentContent['addressDemand'] : addressDemand,
            owner: owner == '' ? pagesStore.patentContent['owner'] : owner,
            createDate: createDate == '' ? pagesStore.patentContent['createDate'] : createDate,
            pcType: '',
            language: '',
            annotation: '',
            OS: '',
            size: 0,
            status: pagesStore.patentContent['status'],
            authors: null,
            existAuths: null,
            createAppDate: '',
            comment: '',

        }
        console.log(data.status)
        await axios
            .post(urls.UPDATE_INFO, data)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    console.log(data)
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))

        return result
    },
    async postSearchUser(newName, newSurname, newLastname, newBirthday) {
        appStore.setLoading(true)
        const data = {
            id: 0,
            peopleId: '0',
            peopleDate: pagesStore.patentContent['id'],
            surname: `${newSurname}`,
            name: `${newName}`,
            lastname: `${newLastname}`,
            birthday: `${newBirthday}`,
            address: '',
            email: '',
            phone: '',
            work: '',
            position: '',
            department: '',
            series: '',
            number: '',
            whoGave: '',
            date: '',
            citizenship: '',
            contribution: '',
            isCreator: 0,
            isLeader: 0

        }

        await axios
            .post(urls.SEARCH_AUTHOR, data)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    addUser.setFoundAuthor(data)
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))


    },
    async postAddNewUser(newName, newSurname, newLastname,): Promise<Authors> {
        appStore.setLoading(true)
        let result: Authors

        const data = {
            id: 0,
            peopleId: '0',
            peopleDate: pagesStore.patentContent['id'],
            surname: newSurname,
            name: newName,
            lastname: newLastname,
            birthday: ``,
            address: '',
            email: '',
            phone: '',
            work: '',
            position: '',
            department: '',
            series: '',
            number: '',
            whoGave: '',
            date: '',
            citizenship: '',
            contribution: '',
            isCreator: 0,
            isLeader: 0
        }

        await axios
            .post(urls.INSERT_AUTHOR, data)
            .then((res) =>
                handlerSuccess(res, () => {

                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))

        return result
    },
    async postAddExAuthor(id, peopleId) {
        appStore.setLoading(true)


        const data = {
            authId: id,
            demandId: pagesStore.patentContent['id'],
            peopId: peopleId,
        }
        console.log(data.authId)
        console.log(data.demandId)
        // console.log(data.peopId)

        await axios
            .post(urls.ADD_EX_AUTHOR, {authId: id, demandId: pagesStore.patentContent['id'], peopId: peopleId},)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    data
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))


    },
    async postUpdateAuthorPersonalInfo(dataPerson) {
        appStore.setLoading(true)


        const data = {
            id: pagesStore.patentContent['id'],
            peopleId: '0',
            peopleDate: pagesStore.patentContent['id'],
            surname: dataPerson.surName,
            name: dataPerson.name,
            lastname: dataPerson.lastName,
            birthday: dataPerson.birthday,
            address: dataPerson.address,
            email: dataPerson.email,
            phone: dataPerson.phone,
            work: '',
            position: '',
            department: '',
            series: '',
            number: '',
            whoGave: '',
            date: '',
            citizenship: '',
            contribution: dataPerson.contribution,
            isCreator: dataPerson.isCreator,
            isLeader: dataPerson.isLeader
        }

        console.log(data.isLeader)

        await axios
            .post(urls.UPD_AUTHORS_PERSON_INFO, data,)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    data
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))


    },
    async postUpdateAuthorPassport(dataPassport) {
        appStore.setLoading(true)


        const data = {
            id: pagesStore.patentContent['id'],
            peopleId: '0',
            peopleDate: pagesStore.patentContent['id'],
            surname: '',
            name: '',
            lastname: '',
            birthday: '',
            address: '',
            email: '',
            phone: '',
            work: '',
            position: '',
            department: '',
            series: dataPassport.series,
            number: dataPassport.number,
            whoGave: dataPassport.whoGave,
            date: dataPassport.date,
            citizenship: dataPassport.citizenship,
            contribution: '',
            isCreator: dataPassport.isCreator,
            isLeader: dataPassport.isLeader
        }

        console.log(data.isLeader)

        await axios
            .post(urls.UPD_AUTHORS_PASSPORT, data,)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    data
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))


    },
    async postUpdateAuthorJob(dataJob) {
        appStore.setLoading(true)


        const data = {
            id: pagesStore.patentContent['id'],
            peopleId: '0',
            peopleDate: pagesStore.patentContent['id'],
            surname: '',
            name: '',
            lastname: '',
            birthday: '',
            address: '',
            email: '',
            phone: '',
            work: dataJob.work,
            position: dataJob.position,
            department: dataJob.department,
            series: '',
            number: '',
            whoGave: '',
            date: '',
            citizenship: '',
            contribution: '',
            isCreator: dataJob.isCreator,
            isLeader: dataJob.isLeader
        }

        console.log(data.isLeader)

        await axios
            .post(urls.UPD_AUTHORS_JOB, data,)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    data
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))


    },
    async postCreateApp(name, creationDate, typeFile) {
        appStore.setLoading(true)


        const data = {
            id: 0,
            objType: typeFile,
            name: name,
            owner: '',
            createDate: creationDate,
            pcType: '',
            language: '',
            annotation: '',
            OS: '',
            size: 0,
            addressDemand: '',
            status: 0,
            authors: null,
            existAuths: null,
            createAppDate: creationDate,
            comment: ''
        }


        await axios
            .post(urls.CREATE_APP, data,)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    data
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))


    },
    async postUpdDateRef(pcType, language, OS, annotation, size) {
        appStore.setLoading(true)


        const data = {
            id: pagesStore.patentContent['id'],
            objType: '',
            name: '',
            owner: '',
            createDate: '',
            pcType: pcType,
            language: language,
            annotation: annotation,
            OS: OS,
            size: size,
            addressDemand: '',
            status: pagesStore.patentContent['status'],
            authors: null,
            existAuths: null,
            createAppDate:'',
            comment: ''
        }
        console.log(data.status)


        await axios
            .post(urls.UPD_DATE_REF, data,)
            .then((res) =>
                handlerSuccess(res, (data) => {
                    data
                }),
            )
            .catch(handlerError)
            .then(() => appStore.setLoading(false))


    },

}
