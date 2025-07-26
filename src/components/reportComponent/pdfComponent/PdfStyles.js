export const pdfStyles = {
  // TÍTULOS
  titleCenter: (doc) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
  },
  titleLeft: (doc) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
  },

  // SUBTÍTULOS
  subtitleCenter: (doc) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
  },
  subtitleLeft: (doc) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
  },

  // PÁRRAFOS
  paragraph: (doc) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
  },

  // TEXTO EN NEGRITA
  boldText: (doc) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
  },

  // TEXTO 
  boldText: (doc) => {
    doc.setFont('helvetica');
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
  },

  // TEXTO PEQUEÑO/PIE DE PÁGINA
  smallGray: (doc) => {
    doc.setFont('courier', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
  },

  // ESTILOS GENERALES DE TABLAS
  tableStyles: {
    fontSize: 9,
    cellPadding: 2,
    halign: 'left',
    valign: 'top',
    textColor: [0, 0, 0],
    fillColor: [255, 255, 255],
    lineColor: [0, 0, 0],
    lineWidth: 0.1,
    font: 'helvetica',
  },

  tableHeadStyles: {
    fillColor: [255, 255, 255],
    textColor: [0, 0, 0],
    fontStyle: 'bold',
    halign: 'left',
    valign: 'middle',
    lineColor: [0, 0, 0],
    lineWidth: 0.1,
    font: 'helvetica',
  },

  tableBodyStyles: {
    fontStyle: 'normal',
    halign: 'left',
    valign: 'top',
    textColor: [0, 0, 0],
    fillColor: [255, 255, 255],
    font: 'helvetica',
  },

  columnStyles: {
    0: { cellWidth: 20 }, 
    1: { cellWidth: 70 }, 
    2: { cellWidth: 30 }, 
    3: { cellWidth: 60 } 
  },

  //tabla convencional
    tableStylesBlack: {
    fontSize: 10,
    cellPadding: 3,
    halign: 'center',
    valign: 'middle',
    textColor: [0, 0, 0],
    fillColor: [255, 255, 255],
    lineWidth: 0.1,
    lineColor: [0, 0, 0],
    },

    tableHeadStylesBlack: {
    fillColor: [255, 255, 255],
    textColor: [0, 0, 0],
    fontStyle: 'bold',
    lineWidth: 0.1,
    lineColor: [0, 0, 0],
    },
   tableBodyBlack: {
    fillColor: [255, 255, 255],       
    textColor: [0, 0, 0], 
  },
};
