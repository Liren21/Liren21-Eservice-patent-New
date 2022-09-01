import React from 'react'

import {observer} from 'mobx-react-lite'
import {Button, Card} from "react-bootstrap";
import FormControlApp from "../../../../../core/components/FormControlApp/FormControlApp";
import pagesStore from "../../../../lib/store/pages-store";


export default observer(() => {


    return (
        <>
            <Card >
                <Card.Body>
                    <Card.Title><strong>Информация о РИД</strong> <Button variant={'outline-primary'} style={{float:"right"}}>Редактировать</Button></Card.Title>
                    <br/><br/>
                    <Card.Text>
                        <FormControlApp
                            classes={'home-from-control'}
                            id={'nameObject'}
                            label={'Название объекта'}
                            value={pagesStore.name} //написать Liren21
                            onChange={(val) => pagesStore.setName(val)} //написать Liren21
                            placeholder={pagesStore.patentContent['name']}
                        />
                        <br/>
                        <FormControlApp
                            classes={'home-from-control'}
                            id={'viewObject'}
                            label={'Вид объекта'}
                            value={pagesStore.name} //написать Liren21
                            onChange={(val) => pagesStore.setName(val)} //написать Liren21
                            placeholder={pagesStore.patentContent['objType']}
                        />
                        <br/>
                        <FormControlApp
                            classes={'home-from-control'}
                            id={'createAppDate'}
                            label={'Дата создания РИД'}
                            value={pagesStore.name} //написать Liren21
                            onChange={(val) => pagesStore.setName(val)} //написать Liren21
                            placeholder={pagesStore.patentContent['createAppDate']}
                        />
                        <br/>
                        <FormControlApp

                            classes={'home-from-control'}
                            id={'applicant'}
                            label={'Заявитель'}
                            value={pagesStore.name} //написать Liren21
                            onChange={(val) => pagesStore.setName(val)} //написать Liren21
                            placeholder={pagesStore.patentContent['owner']}
                            as={'textarea'}
                        />
                        <br/>
                        <FormControlApp
                            classes={'home-from-control'}
                            id={'addressDemand'}
                            label={'Адрес заявителя'}
                            value={pagesStore.name} //написать Liren21
                            onChange={(val) => pagesStore.setName(val)} //написать Liren21
                            placeholder={pagesStore.patentContent['addressDemand']}
                        />
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
})
