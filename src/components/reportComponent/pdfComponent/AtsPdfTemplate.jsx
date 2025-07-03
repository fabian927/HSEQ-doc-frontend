import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { pdfStyles } from './PdfStyles';
import { dataAts4, dataAts5, proElements, preguntas } from '../../../assets/infoAts/InfoAts';

export const generarPDF = async (rowData) => {
  console.log("Generando PDF con:", rowData);
  const doc = new jsPDF();

  const capitalizar = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

  // Titulo
  pdfStyles.titleCenter(doc);
  doc.text('Analisis de Trabajo Seguro', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

  // Tabla encabezado
  autoTable(doc, {
    startY: 30,
    theme:'grid',
    head: [['Nombre del documento', 'Código', 'Versión', 'Fecha']],
    body: [
      ['Procedimiento ATS', 'CN-SST-FT-005', '02', '30/09/2024'],
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

  //Subtitulo 
  pdfStyles.subtitleCenter(doc);
  doc.text('Analisis del riesgo', doc.internal.pageSize.getWidth() / 2, 93, { align: 'center' });

  // Tabla analisis del riesgo
  const bodyAts4 = dataAts4.valores.map(row =>
    row.map(cell => cell.replace(/\n/g, '\n')) // para asegurar saltos de línea
  );

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    theme: 'grid',
    head: [dataAts4.encabezados],
    body: bodyAts4,
    styles: pdfStyles.tableStyles,
    headStyles: pdfStyles.tableHeadStyles,
    bodyStyles: pdfStyles.tableBodyStyles,
    margin: { top: 10, bottom: 20 },
    showHead: 'firstPage',
    columnStyles: pdfStyles.columnStyles,
  });

  let nextY = doc.lastAutoTable.finalY + 10;

  //Subtitulo 
  pdfStyles.subtitleCenter(doc);
  doc.text('Peligros', doc.internal.pageSize.getWidth() / 2, nextY, { align: 'center' });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY +15,
    theme:'grid',
    head: [['PELIGROS DEL ENTORNO...', 'PELIGROS DE LA ACTIVIDAD...']],
    styles: pdfStyles.tableStyles,
    headStyles: pdfStyles.tableHeadStyles,
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    theme: 'grid',
    head: [dataAts5.encabezados],
    body: [dataAts5.valores],
    styles: pdfStyles.tableStyles,
    headStyles: pdfStyles.tableHeadStyles,
    bodyStyles: pdfStyles.tableBodyStyles,
    margin: { top: 10, bottom: 20 },
    showHead: 'firstPage',
  });

  //texto 
  pdfStyles.boldText(doc);
  doc.text(`Requiere bloqueo:   ${capitalizar(rowData.requiere_bloqueo)} `, 20, doc.lastAutoTable.finalY+10, );

  const tiposBloqueo = rowData.tipos_bloqueo.map(b => b.tipo).join(', ');
  //texto 
  pdfStyles.boldText(doc);
  doc.text(`Tipo de bloqueo:  ${capitalizar(tiposBloqueo)} `, 20, doc.lastAutoTable.finalY+20, );

  //texto 
  if (rowData.tipos_bloqueo.some(b => b.tipo === 'otro')) {
    pdfStyles.boldText(doc);
    doc.text(`Otro tipo de bloqueo:  ${capitalizar(rowData.detalle_bloqueo)}`, 20, doc.lastAutoTable.finalY + 30);
  }

  //Subtitulo 
  pdfStyles.subtitleCenter(doc);
  doc.text('Elementos de Protección Personal', doc.internal.pageSize.getWidth() / 2, doc.lastAutoTable.finalY+40, { align: 'center' });

  const bodyElementos = rowData.elementos_proteccion.map(el => [
    capitalizar(el.nombre),
    el.activo ? 'Si' : 'No'
  ]);

  //texto 
  if (rowData.elementos_proteccion.some(el => el.nombre === 'otro')) {
    pdfStyles.boldText(doc);
    doc.text(`Otro elemento de protección:  ${capitalizar(rowData.otro_elemento)}`, 20, doc.lastAutoTable.finalY + 50);
  }

  //Tabla elementos de proteccion personal
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY +60,
    head: [['Elemento de Protección', 'En uso']],
    body: bodyElementos,
    theme: 'grid',
    styles: pdfStyles.tableStyles,
    headStyles: pdfStyles.tableHeadStyles,
    bodyStyles: pdfStyles.tableBodyStyles,
    showHead: 'firstPage',
  });

  //Tabla de preguntas de verificacion
  const respuestasFormateadas = rowData.preguntas.map((item) => ({
    pregunta: preguntas[item.numero],
    respuesta: item.respuesta,
  }));

  const tablaPreguntas = respuestasFormateadas.map((item, index) => [
    `${index + 1}. ${item.pregunta}`,
    item.respuesta,
  ]);

  //Subtitulo 
  pdfStyles.subtitleCenter(doc);
  doc.text('Preguntas de verificación antes de iniciar la actividad', doc.internal.pageSize.getWidth() / 2, doc.lastAutoTable.finalY+20, { align: 'center' });

  autoTable(doc, {
    startY: doc.lastAutoTable?.finalY + 30 || 35,
    theme: 'grid',
    head: [['Pregunta', 'Respuesta']],
    body: tablaPreguntas,
    styles: pdfStyles.tableStyles,
    headStyles: pdfStyles.tableHeadStyles,
    bodyStyles: pdfStyles.tableBodyStyles,
    showHead: 'firstPage',
  });

  //Subtitulo 
  pdfStyles.subtitleCenter(doc);
  doc.text('Participantes', doc.internal.pageSize.getWidth() / 2, doc.lastAutoTable.finalY+10, { align: 'center' });

    // PARTICIPANTES + FIRMAS
  const participantes = rowData.participantes_ats || [];

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
    p.empresa_part,
    p.participacion,
    '', // Columna vacía para la firma
  ]);

  const firmas = participantes.map((p) => p.firma); // Firma base64 por cada participante
  const imagenesFirmas = await cargarFirmas(firmas);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    theme: 'grid',
    head: [['Nombre', 'Cédula', 'Cargo', 'Empresa', 'Participación', 'Firma']],
    body: bodyParticipantes,
    styles: {
      ...pdfStyles.tableStyles,
      cellPadding: 1,
      minCellHeight: 15, // Altura mínima de la celda
    },
    columnStyles: {
      5: { cellWidth: 35 } 
    },
    headStyles: pdfStyles.tableHeadStyles,
    bodyStyles: pdfStyles.tableBodyStyles,
    showHead: 'firstPage',
    didDrawCell: function (data) {
      if (data.section !== 'body') return;

      const colIndex = data.column.index;
      const rowIndex = data.row.index;

      if (colIndex === 5 && imagenesFirmas[rowIndex]) {
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

  doc.addPage();

  //Resposables

  //Subtitulo 
  pdfStyles.subtitleCenter(doc);
  doc.text('Responsables', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

  const responsables = rowData.responsables_ats || [];

  const bodyResponsables = responsables.map((r) => [
    r.name_resp,
    r.tipo_responsable,
    '', // Columna vacía para la firma
  ]);

  const firmasRes = responsables.map((r) => r.firma); 
  const imgFirmasRes = await cargarFirmas(firmasRes);

  autoTable(doc, {
    startY: 30,
    theme: 'grid',
    head: [['Nombre', 'Cédula', 'Firma']],
    body: bodyResponsables,
    styles: {
      ...pdfStyles.tableStyles,
      cellPadding: 1,
      minCellHeight: 15, // Altura mínima de la celda
    },
    columnStyles: {
      2: { cellWidth: 50 }  // Cambia 50 por el ancho que necesites
    },
    headStyles: pdfStyles.tableHeadStyles,
    bodyStyles: pdfStyles.tableBodyStyles,
    showHead: 'firstPage',
    didDrawCell: function (data) {
      if (data.section !== 'body') return;

      const colIndex = data.column.index;
      const rowIndex = data.row.index;

      if (colIndex === 2 && imgFirmasRes[rowIndex]) {
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
          console.warn('Error al renderizar firma para:', responsables[rowIndex].name_resp);
        }
      }
    },
  });

  // Guardar archivo
  doc.save('ats.pdf');
};
