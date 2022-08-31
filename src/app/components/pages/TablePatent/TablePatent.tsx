import './TablePatent.scss'

import React from 'react'
import {observer} from 'mobx-react-lite'
import {TableApp} from "../../../../core/components/TableApp/TableApp";
import pagesStore from "../../../lib/store/pages-store";
import columns from "./extensions/columns/columns";


export default observer(() => {
    console.log(pagesStore.demand)

    return (
        <>
            <TableApp
                id={'patentOutputTable'}
                data={pagesStore.demand}
                columns={columns()}
                hasColumnsExpander={true}
                hasPagination={false}

            />
        </>
    )
})
