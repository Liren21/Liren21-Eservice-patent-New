

declare type NumberAttr = number | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
declare type ColOrder = 'first' | 'last' | NumberAttr
declare type ColSize = boolean | 'auto' | NumberAttr
declare type ColSpec = ColSize | { span?: ColSize; offset?: NumberAttr; order?: ColOrder }

export interface IColAppProps {
    classes?: string
    xs?: ColSpec
    sm?: ColSpec
    md?: ColSpec
    lg?: ColSpec
    body?: JSX.IntrinsicAttributes & IColAppProps
}

export const init = (props: IColAppProps): IColAppProps => {
    let classes = props.classes ? props.classes : ''
    classes += ' col-app-small'

    const emptyState: IColAppProps = {
        xs: '12',
        sm: '12',
        md: '3',
        lg: '3',
    }

    return Object.assign(emptyState, props, { classes: classes })
}
