import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export const pdf = (head, body, fileName, pdfOptions) => {
    const doc = new jsPDF(pdfOptions);

    doc.autoTable({
        head: [head],
        body: body
    });

    doc.save(fileName);
}

export const defaultPdf = {
    orientation: 'landscape',
    unit: 'in',
}