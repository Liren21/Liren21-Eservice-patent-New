import pagesStore from "../../../../../lib/store/pages-store";

export const dataLink = [
    {
        title: 'Заявление',
        link: `document.docx?demandId=${pagesStore.patentContent['id']}`,

    },
    {
        title: 'Обратная стороная заявления',
        link: `documentRev.docx?id=${pagesStore.patentContent['id']}`,
    },
    {
        title: 'Реферат',
        link: `report.docx?id=${pagesStore.patentContent['id']}`,
    },
]