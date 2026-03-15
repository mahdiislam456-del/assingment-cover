const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream("test.pdf"));

// Use safe path
const logoPath = path.join(__dirname, "smu_logo.png");
doc.image(logoPath, 100, 100, { width: 100 });

doc.end();
