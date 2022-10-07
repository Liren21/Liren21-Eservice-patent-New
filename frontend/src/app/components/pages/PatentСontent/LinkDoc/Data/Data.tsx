import pagesStore from "../../../../../lib/store/pages-store";
console.log(pagesStore.patentContent['id'])
export const dataLink = [
    {
        title: 'Заявление',
        link: `document.docx?demandId=`,

    },
    {
        title: 'Обратная стороная заявления',
        link: `documentRev.docx?id=`,
    },
    {
        title: 'Реферат',
        link: `report.docx?id=`,
    },
]
export const application = [
    {
        title: 'Согласие',
        link: `agreementInfo.docx?id=`,
    },
]
export const applicationReverse = [
    {
        title: 'Согласие на обработку сведений',
        link: `agreement.docx?id=`,
    },
]
export const anAdditStatement = [
    {
        title: 'Дополнительное заявление',
        link: `documentDop.docx?id=`,
    },
]
export const anAdditStatementReverse = [
    {
        title: 'Дополнительное заявление (Обратная сторона)',
        link: `documentDopRev.docx?id=`,
    },
]