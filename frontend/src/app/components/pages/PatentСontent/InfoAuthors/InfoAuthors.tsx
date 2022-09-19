import React from 'react'

import {observer} from 'mobx-react-lite'
import { Card} from "react-bootstrap";
import pagesStore from "../../../../lib/store/pages-store";
import {TableApp} from "../../../../../core/components/TableApp/TableApp";
import columns from "./columns/columns";
import CustomModal from "../../../general/CustomModal/CustomModal";


export default observer(() => {

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title><strong><i className="fa fa-users" aria-hidden="true"/> Сведения об авторах</strong> <CustomModal/></Card.Title>
                    <br/><br/>
                    <Card.Text>
                        <TableApp
                            id={'authorsOutputTable'}
                            data={pagesStore.authors}
                            columns={columns()}
                            hasPagination={false}
                            hasColumnsExpander={true}
                        />
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
})
