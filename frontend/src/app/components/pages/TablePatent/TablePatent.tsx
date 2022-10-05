import './TablePatent.scss'

import React, {useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {TableApp} from "../../../../core/components/TableApp/TableApp";
import pagesStore from "../../../lib/store/pages-store";
import columns from "./extensions/columns/columns";


export default observer(() => {
    useEffect(() => {
        console.log(1223555555)
    }, [])

    return (
        <>
            <TableApp
                id={'patentOutputTable'}
                data={pagesStore.demand}
                columns={columns()}
                hasPagination={false}
                hasColumnsExpander={true}
            />

        </>
    )
})
