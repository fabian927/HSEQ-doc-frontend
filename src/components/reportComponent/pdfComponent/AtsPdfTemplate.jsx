import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { pdfStyles } from './PdfStyles';
import { dataAts4, dataAts5, proElements, preguntas } from '../../../assets/infoAts/InfoAts';

export const generarPDF = (rowData) => {
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

  //texto 
  pdfStyles.boldText(doc);
  doc.text(`Tipo de bloqueo: ${capitalizar(rowData.tipos_bloqueo)} `, 20, doc.lastAutoTable.finalY+20, );

  //Subtitulo 
  pdfStyles.subtitleCenter(doc);
  doc.text('Elementos de Protección Personal', doc.internal.pageSize.getWidth() / 2, doc.lastAutoTable.finalY+30, { align: 'center' });

  // Guardar archivo
  doc.save('ats.pdf');
};
