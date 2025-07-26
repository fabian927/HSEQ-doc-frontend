import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { pdfStyles } from './PdfStyles';
import { preguntas } from '../../../assets/infoPertmitionHeights/infoPermHeights';

export const generarPDF = async (rowData) => {
    //console.log("Generando PDF con:", rowData);
    const doc = new jsPDF();

    const capitalizar = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

    const maxWidth = 180; // Ancho máximo en puntos (ajusta según tu PDF)

    const saltoLinea = (doc, text, maxWidth, x, y, lineHeight = 5) => {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line, index) => {
            doc.text(line, x, y + (index * lineHeight));
        });
        return y + (lines.length * lineHeight); // Devuelve la nueva posición Y
    };

    // Titulo
    pdfStyles.titleCenter(doc);
    doc.text('Permiso de Trabajo en Alturas', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Tabla encabezado
    autoTable(doc, {
    startY: 30,
    theme:'grid',
    head: [['Nombre del documento', 'Código', 'Versión', 'Fecha']],
    body: [
        ['Permiso de trabajo en alturas', 'CN-SST-FT-005', '02', '30/09/2024'],
    ],
    styles: pdfStyles.tableStyles,
    headStyles: pdfStyles.tableHeadStyles,
    bodyStyles: pdfStyles.tableBodyStyles,
    });

    //Subtitulo 
    pdfStyles.subtitleCenter(doc);
    doc.text('Generalidades', doc.internal.pageSize.getWidth() / 2, 53, { align: 'center' });

    // Tabla generalidades
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        theme:'grid',
        head: [['Planta o Proyecto', 'Fecha inicio', 'Fecha fin',]],
        body: [[`${rowData.proyecto}`, `${rowData.fecha_inicio}`, `${rowData.fecha_fin}`]],
        styles: pdfStyles.tableStyles,
        headStyles: pdfStyles.tableHeadStyles,
        bodyStyles: pdfStyles.tableBodyStyles,
    });

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY,
        theme:'grid',
        head: [['Nombre del responsable', 'Ejecutor', 'Equipo a intervenir']],
        body: [[`${rowData.responsable}`, `${rowData.ejecutor}`, `${rowData.equipo}`]],
        styles: pdfStyles.tableStyles,
        headStyles: pdfStyles.tableHeadStyles,
        bodyStyles: pdfStyles.tableBodyStyles,
    });

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY,
        theme:'grid',
        head: [['Departamento', 'Municipio', 'Lugar exacto']],
        body: [[`${rowData.departamento}`, `${rowData.municipio}`, `${rowData.lugar_exacto}`]],
        styles: pdfStyles.tableStyles,
        headStyles: pdfStyles.tableHeadStyles,
        bodyStyles: pdfStyles.tableBodyStyles,
    });

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY,
        theme:'grid',
        head: [['Altura de trabajo', 'Altura de caida', 'N° Personas Calificadas']],
        body: [[`${rowData.altura_trabajo}`, `${rowData.altura_caida}`, `${rowData.n_personas}`]],
        styles: pdfStyles.tableStyles,
        headStyles: pdfStyles.tableHeadStyles,
        bodyStyles: pdfStyles.tableBodyStyles,
    });

    //texto 
    pdfStyles.boldText(doc);
    const actividad = `Descripción de la actividad:   ${capitalizar(rowData.actividad)} `;
    let nextY = saltoLinea(doc, actividad, maxWidth, 15, doc.lastAutoTable.finalY+10);

    const tiposAcceso = rowData.access_type
    .filter(item => item.activo)
    .map(item => item.nombre);

    pdfStyles.boldText(doc);
    const textToRender = tiposAcceso.join(', ');
    const texto = `Tipos de acceso para usar en la actividad: ${capitalizar(textToRender)}`;

    nextY = saltoLinea(doc, texto, maxWidth, 15, nextY+5);

    rowData.otro_elemento_protect && (
        nextY = saltoLinea( doc, `Otro elemento de protección: ${rowData.otro_elemento_protect}`, maxWidth, 15, nextY + 5)
    );

    const elementsProtected = rowData.elements_protect
    .filter(item => item.activo)
    .map(item => item.nombre);

    pdfStyles.boldText(doc);
    const elements = elementsProtected.join(', ');
    const textoRender = `Elementos de protección personal: ${capitalizar(elements)}`;

    nextY = saltoLinea(doc, textoRender, maxWidth, 15, nextY+5);

    rowData.otro_elemento_protect && (
        nextY = saltoLinea(doc, `Otro elemeto de protección: ${rowData.otro_elemento_protect}`, maxWidth, 15, nextY+5)
    );
    
    rowData.herramientas && (
        nextY = saltoLinea(doc, `Herramientas a utilizar: ${rowData.herramientas}`, maxWidth, 15, nextY+5)
    );

    //Subtitulo 
    pdfStyles.subtitleCenter(doc);
    doc.text('Planeación y Aseguramiento', doc.internal.pageSize.getWidth() / 2, nextY+5, { align: 'center' });
    doc.text('Espacio para validar por el coordinador de trabajo en alturas', doc.internal.pageSize.getWidth() / 2, nextY+10, { align: 'center' });

    //Tabla de preguntas de verificacion
    const respuestasFormateadas = rowData.ask_permission.map((item) => ({
        pregunta: preguntas[item.numero],
        respuesta: item.respuesta,
    }));

    const tablaPreguntas = respuestasFormateadas.map((item, index) => [
        `${index + 1}. ${item.pregunta}`,
        item.respuesta,
    ]);

    autoTable(doc, {
        startY: nextY+20,
        theme: 'grid',
        head: [['Pregunta', 'Respuesta']],
        body: tablaPreguntas,
        styles: pdfStyles.tableStyles,
        headStyles: pdfStyles.tableHeadStyles,
        bodyStyles: pdfStyles.tableBodyStyles,
        showHead: 'firstPage',
    });

    //TEXT
    pdfStyles.boldText(doc);
    nextY = saltoLinea(doc, `Observaciones: ${rowData.observaciones}`, maxWidth, 15, doc.lastAutoTable.finalY+10);

    //Subtitulo
    pdfStyles.subtitleCenter(doc);
    doc.text('Firma del personal participante', doc.internal.pageSize.getWidth() / 2, nextY+10, { align: 'center' });

    pdfStyles.boldText(doc);
    const partText = "Como trabajador he socializado el análisis de peligros por actividad (APA), comprendo las precauciones que deben ser tomadas y me comprometo a  desarrollar el trabajo cumpliendo las medidas de seguridad establecidas, procurando el autocuidado, cumpliendo procedimientos y evitando actos inseguros, así como reportar cualquier daño de equipos o incidentes y/o accidentes presentados.";
    nextY = saltoLinea(doc, partText, maxWidth, 15, nextY+20);

    // PARTICIPANTES + FIRMAS
    const participantes = rowData.part_permission || [];
    
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
        p.nombre_part,
        p.cedula_part,
        p.cargo_part,
        p.empresa_part,
        '', // Columna vacía para la firma
    ]);
    
    const firmas = participantes.map((p) => p.firma); // Firma base64 por cada participante
    const imagenesFirmas = await cargarFirmas(firmas);
    
    autoTable(doc, {
        startY: nextY+5,
        theme: 'grid',
        head: [['Nombre', 'Cédula', 'Cargo', 'Empresa', 'Firma']],
        body: bodyParticipantes,
        styles: {
        ...pdfStyles.tableStyles,
        cellPadding: 1,
        minCellHeight: 15, // Altura mínima de la celda
        },
        columnStyles: {
        4: { cellWidth: 45 } 
        },
        headStyles: pdfStyles.tableHeadStyles,
        bodyStyles: pdfStyles.tableBodyStyles,
        showHead: 'firstPage',
        didDrawCell: function (data) {
        if (data.section !== 'body') return;
    
        const colIndex = data.column.index;
        const rowIndex = data.row.index;
    
        if (colIndex === 4 && imagenesFirmas[rowIndex]) {
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
            console.warn('Error al renderizar firma para:', participantes[rowIndex].nombre_part);
            }
        }
        },
    });

    doc.addPage();

    //Subtitulo
    pdfStyles.subtitleCenter(doc);
    doc.text('Firma del personal responsable', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    //Texto
    pdfStyles.boldText(doc);
    const respText = "Como coordinador de trabajo en alturas confirmo que he revisado e identificado en sitio, las condiciones de riesgo presentes para el desarrollo del presente trabajo,  he divulgado a los trabajadores y he propuestomedidas de prevención para controlar los factores de riesgo.";
    nextY = saltoLinea(doc, respText, maxWidth, 15, 30);

    const respText2 = "Como responsable de activar el plan de emergencia, he revisado e identificado el sitio, las condicones de riesgos para del desarrollo del presente trabajo, se tien listo los equipos de primeros auxilios y brigadista en caso de realizar rescate de acuerdo al procedimiento a realizar.";
    nextY = saltoLinea(doc, respText2, maxWidth, 15, nextY+5);

    const respText3 = "Como supervisor y ejecutor confirmo que el grupo de trabajo es el adecuado para realizar la labor, conocen los peligros y riesgos a los cuales van a estar expuestos, se les ha explicado las medidas de control y se han implementado las mismas en pro de evitar la ocurrencia de eventos no deseados. Las herramientas han sido inspecciones y se cuentan con los elementos de protección personal requeridos para la labor.";
    nextY = saltoLinea(doc, respText3, maxWidth, 15, nextY+5);   

    const respText4 = "Como ejecutor confirmo que el trabajo/actividad se ha concluido de acuerdo a lo planeado. El área de trabajo ha quedando en optimas condiciones de orden y aseo. Quedan en funcionamiento los sistemas de protección o seguridad de los equipos y/o sistemas intervenidos.";
    nextY = saltoLinea(doc, respText4, maxWidth, 15, nextY+5);

    const respText5 = "Como autoridad de área/interventor, confirmo que el área ha quedado en limpia, ordena y en condiciones seguras de operación/funcionamiento.";
    nextY = saltoLinea(doc, respText5, maxWidth, 15, nextY+5);

    const responsables = rowData.resp_permission || [];
    
    const bodyResponsables = responsables.map((r) => [
        r.nombre_resp,
        r.cedula_resp,
        r.cargo_resp,
        '', // Columna vacía para la firma
    ]);

    const firmasRes = responsables.map((r) => r.firma); 
    const imgFirmasRes = await cargarFirmas(firmasRes);

    autoTable(doc, {
        startY: nextY+10,
        theme: 'grid',
        head: [['Nombre', 'Cédula', 'Cargo', 'Firma']],
        body: bodyResponsables,
        styles: {
            ...pdfStyles.tableStyles,
            cellPadding: 1,
            minCellHeight: 15, // Altura mínima de la celda
        },
        columnStyles: {
            3: { cellWidth: 50 }  // Cambia 50 por el ancho que necesites
        },
        headStyles: pdfStyles.tableHeadStyles,
        bodyStyles: pdfStyles.tableBodyStyles,
        showHead: 'firstPage',
        didDrawCell: function (data) {
            if (data.section !== 'body') return;

            const colIndex = data.column.index;
            const rowIndex = data.row.index;

            if (colIndex === 3 && imgFirmasRes[rowIndex]) {
            const img = imgFirmasRes[rowIndex];
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
                console.warn('Error al renderizar firma para:', responsables[rowIndex].nombre_resp);
            }
            }
        },
    });
    

    // Guardar archivo
    doc.save('Permiso de Alturas.pdf');
}