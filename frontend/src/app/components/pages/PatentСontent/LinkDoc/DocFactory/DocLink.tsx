import React from 'react'
import {observer} from 'mobx-react-lite'
import {application} from "../Data/Data";
import LinkDocForm from "../LinkDocForm/LinkDocForm";
import pagesStore from "../../../../../lib/store/pages-store";


export default observer(() => {

    return (
        <>
            {
                application.map((d, k) => (
                    <>

                        {
                            pagesStore.authors.map((data) => (
                                <>

                                    <LinkDocForm title={d.title + ' ' + data.surname}
                                                 url={d.link + `${k}&appid=${pagesStore.patentContent['id']}`}/>

                                </>
                            ))
                        }

                    </>
                ))
            }
        </>
    )
})


