import React from 'react'
import {observer} from 'mobx-react-lite'
import {anAdditStatement} from "../Data/Data";
import LinkDocForm from "../LinkDocForm/LinkDocForm";
import pagesStore from "../../../../../lib/store/pages-store";


export default observer(() => {

    return (
        <>
            {
                anAdditStatement.map((d, k) => (
                    <>
                        {
                            d.title ?
                                <LinkDocForm title={d.title + ` № ${k + 1}`}
                                             url={d.link + pagesStore.patentContent['id'] + `&authorId=2`}/>
                                :
                                null
                        }
                    </>))
            }
        </>
    )
})


