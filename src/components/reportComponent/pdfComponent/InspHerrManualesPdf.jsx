import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { pdfStyles } from './PdfStyles';
import { preguntasHerramientas } from '../../../assets/infoInspection/InfoInspection';

export const generarPDF = async (rowData) => {
    console.log('generando pdf con: ', rowData);

    const doc = new jsPDF();
    
    const capitalizar = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

    // Titulo
    pdfStyles.titleCenter(doc);
    doc.text('Inspección de Herramientas Manuales', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Tabla encabezado
    autoTable(doc, {
    startY: 30,
    theme:'grid',
    head: [['Nombre del documento', 'Código', 'Versión', 'Fecha']],
    body: [
        ['Inspección de Herramientas Manuales', 'CN-SST-FT-005', '02', '30/09/2024'],
    ],
    styles: pdfStyles.tableStyles,
    headStyles: pdfStyles.tableHeadStyles,
    bodyStyles: pdfStyles.tableBodyStyles,
    });

    //Subtitulo 
    pdfStyles.subtitleCenter(doc);
    doc.text('Descripción de la actividad', doc.internal.pageSize.getWidth() / 2, 53, { align: 'center' });

    // Tabla descripción de la actividad
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        theme:'grid',
        head: [['Planta o Proyecto', 'Fecha de inicio', 'Actividad a realizar']],
        body: [[`${rowData.proyecto}`, `${rowData.fecha}`, `${rowData.actividad}`]],
        styles: pdfStyles.tableStyles,
        headStyles: pdfStyles.tableHeadStyles,
        bodyStyles: pdfStyles.tableBodyStyles,
    });

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY,
        theme:'grid',
        head: [['Nombre del responsable', 'Quien Ejecuta']],
        body: [[`${rowData.responsable}`, `${rowData.ejecutor}`]],
        styles: pdfStyles.tableStyles,
        headStyles: pdfStyles.tableHeadStyles,
        bodyStyles: pdfStyles.tableBodyStyles,
    });

    //Tabla de preguntas de verificacion

    const respuestasFormateadas = rowData.preguntas_inspection.map((item) => {
    const pregunta = preguntasHerramientas[item.numero];
    return {
        herramienta: pregunta?.Herramienta || '',
        texto: pregunta?.Texto || '',
        respuesta: item.respuesta
    };
    });

    const tablaPreguntas = respuestasFormateadas.map((item, index) => [
    item.herramienta,
    `${index + 1}. ${item.texto}`,
    item.respuesta,
    ]);

    //Subtitulo 
    pdfStyles.subtitleCenter(doc);
    doc.text('Preguntas de estandares de seguridad', doc.internal.pageSize.getWidth() / 2, doc.lastAutoTable.finalY+20, { align: 'center' });

    autoTable(doc, {
    startY: doc.lastAutoTable?.finalY + 30 || 35,
    theme: 'grid',
    head: [['Herramienta','Pregunta', 'Respuesta']],
    body: tablaPreguntas,
    styles: pdfStyles.tableStyles,
    headStyles: pdfStyles.tableHeadStyles,
    bodyStyles: pdfStyles.tableBodyStyles,
    showHead: 'firstPage',
    });

    //Subtitulo 
    pdfStyles.subtitleCenter(doc);
    doc.text('Responsables', doc.internal.pageSize.getWidth() / 2, doc.lastAutoTable.finalY+10, { align: 'center' });

    // PARTICIPANTES + FIRMAS
    const participantes = rowData.participantes_inspection || [];

    const cargarFirmas = async (firmas) => {
        return Promise.all(
            firmas.map((firmaBase64) => {
            return new Promise((resolve) => {
                if (!firmaBase64) return resolve(null);
                const img = new Image();
                img.src = firmaBase64;
                img.onload = () => resolve(img);
                img.onerror = () => resolve(null);
            });
            })
        );
    };

    const bodyParticipantes = participantes.map((p) => [
        p.name_part,
        p.cedula_part,
        p.cargo_part,
        '', // Columna vacía para la firma
    ]);

    const firmas = participantes.map((p) => p.firma); // Firma base64 por cada participante
    console.log('firmas ',firmas);
    const imagenesFirmas = await cargarFirmas(firmas);

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 15,
        theme: 'grid',
        head: [['Nombre', 'Cédula', 'Cargo', 'Firma']],
        body: bodyParticipantes,
        styles: {
            ...pdfStyles.tableStyles,
            cellPadding: 1,
            minCellHeight: 15, // Altura mínima de la celda
    },
    columnStyles: {
        3: { cellWidth: 40 } 
    },
        headStyles: pdfStyles.tableHeadStyles,
        bodyStyles: pdfStyles.tableBodyStyles,
        showHead: 'firstPage',
        didDrawCell: function (data) {
            if (data.section !== 'body') return;

            const colIndex = data.column.index;
            const rowIndex = data.row.index;

            if (colIndex === 3 && imagenesFirmas[rowIndex]) {
            const img = imagenesFirmas[rowIndex];
            const cellWidth = data.cell.width;
            const cellHeight = data.cell.height;

            // Tamaño deseado de la imagen (ajustada a la celda)
            const maxImgWidth = cellWidth - 2; // dejar margen
            const maxImgHeight = cellHeight - 2;

            // Relación de aspecto
            const aspectRatio = img.width / img.height;
            let imgWidth = maxImgWidth;
            let imgHeight = imgWidth / aspectRatio;

            if (imgHeight > maxImgHeight) {
                imgHeight = maxImgHeight;
                imgWidth = imgHeight * aspectRatio;
            }

            const x = data.cell.x + (cellWidth - imgWidth) / 2;
            const y = data.cell.y + (cellHeight - imgHeight) / 2;

            try {
                doc.addImage(img, 'PNG', x, y, imgWidth, imgHeight);
            } catch (err) {
                console.warn('Error al renderizar firma para:', participantes[rowIndex].name_part);
            }
            }
        },
    });

    // Guardar archivo
    doc.save('Inspección de Herramientas Manuales.pdf');
}