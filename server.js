const PDFDocument = require("pdfkit");
const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // ---------------- GET requests (serve static files) ----------------
  if (req.method === "GET") {
    let filePath = "";
    if (req.url === "/") filePath = "index.html";
    else if (req.url === "/style.css") filePath = "style.css";
    else if (req.url === "/script.js") filePath = "script.js";
    else if (req.url === "/smu_logo.png") filePath = "smu_logo.png";
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    let contentType = "text/html";
    if (ext === ".css") contentType = "text/css";
    else if (ext === ".js") contentType = "application/javascript";
    else if (ext === ".png") contentType = "image/png";

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Server Error");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  } 

  // ---------------- POST requests (generate PDF) ----------------
  else if (req.method === "POST" && req.url === "/generate-pdf") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const doc = new PDFDocument({ size: "A4", margin: 50 });
        const chunks = [];
        doc.on("data", chunk => chunks.push(chunk));
        doc.on("end", () => {
          const result = Buffer.concat(chunks);
          res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=assignment.pdf",
            "Content-Length": result.length
          });
          res.end(result);
        });

        // ---------------- PDF layout ----------------
        const logoPath = path.join(__dirname, "smu_logo.png");
        const logoWidth = 150;
        const pageWidth = doc.page.width;
        doc.image(logoPath, (pageWidth - logoWidth) / 2, 30, { width: logoWidth });

        doc.moveDown(2);
        

        const startX = 100;
        const labelWidth = 150;

        function addRow(label, value) {
          doc.fontSize(12)
             .text(label, startX, doc.y, { continued: true, width: labelWidth })
             .text(": " + value, startX + labelWidth);
          doc.moveDown(0.8);
        }

        addRow("Experiment No", data.experiment_no);
        addRow("Assignment Title", data.title);
        addRow("Course Code", data.course_code);
        addRow("Course Name", data.course_name);
        addRow("Instructor", data.instructor);
        addRow("Student Name", data.student_name);
        addRow("Student ID", data.student_id);
        addRow("Date", data.date);

        doc.moveDown(2);
        doc.text("Instructor Signature: ____________________", { align: "left" });

        doc.end();
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error generating PDF: " + err.message);
      }
    });
  } 

  // ---------------- any other request ----------------
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}); // <-- closes createServer

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
