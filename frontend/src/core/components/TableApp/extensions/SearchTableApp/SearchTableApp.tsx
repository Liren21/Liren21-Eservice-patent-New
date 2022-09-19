

import './SearchTableApp.scss'
import React from 'react'
import { Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { InjectedSearchProps } from 'react-bootstrap-table2-toolkit'

export const SearchTableApp = (props: InjectedSearchProps): JSX.Element => {
    let input

    const handleClick = () => {
        props.onSearch(input.value)
    }

    const handleChange = () => {
        setTimeout(() => {
            if (input !== null) props.onSearch(input.value)
        }, 1000)
    }

    return (
        <div className={'search-table-app'}>
            <Row>
                <Col>
                    <input
                        className={'form-control'}
                        ref={(n) => (input = n)}
                        type={'text'}
                        placeholder={'Введите данные для поиска внутри таблицы...'}
                        onChange={handleChange}
                    />
                </Col>
                <Col sm={2}>
                    <Button variant={'outline-primary'} onClick={handleClick}>
                        <i className={'fa fa-search'} title={'Поиск'} />
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
