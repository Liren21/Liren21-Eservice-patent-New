import React from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Card} from "react-bootstrap";
import pagesStore from "../../../../lib/store/pages-store";
import ridStore from "../../../../lib/store/rid-store";
import {TableApp} from "../../../../../core/components/TableApp/TableApp";
import columns from "../InfoRID/columns/columns";


export default observer(() => {

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title><strong>Сведения об авторах</strong> <Button
                        onClick={() => ridStore.PostUpdInfoRid()}
                        variant={'outline-primary'}
                        style={{float: "right"}}><i
                        className="fa fa-plus" aria-hidden="true"/>Добавить автора</Button></Card.Title>
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
