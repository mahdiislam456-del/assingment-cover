function generateCover(){

    
    let assignmentNo=document.getElementById("assignmentNo").value;
    let assignmentTitle=document.getElementById("assignmentTitle").value;
    let courseTitle=document.getElementById("courseTitle").value;
    let courseCode=document.getElementById("courseCode").value;

    let teacherName=document.getElementById("teacherName").value;
    let designation=document.getElementById("designation").value;

    let studentName=document.getElementById("studentName").value;
    let studentId=document.getElementById("studentId").value;
    let batch=document.getElementById("batch").value;
    let section=document.getElementById("section").value;
    let date=document.getElementById("date").value;

    document.getElementById("content").innerHTML=`
        <p><b>Assignment No:</b> ${assignmentNo}</p>
        <p><b>Assignment Title:</b> ${assignmentTitle}</p>
        <p><b>Course Title:</b> ${courseTitle}</p>
        <p><b>Course Code:</b> ${courseCode}</p>
        
        
        

        <h3><u>Submitted To</u></h3>
        <p>${teacherName}</p>
        <p>${designation}</p>

        <h3><u>Submitted By</u></h3>
        <p>${studentName}</p>
        <p>ID: ${studentId}</p>
        <p>Batch: ${batch}</p>
        <p>Section: ${section}</p>

        <p><b>Date:</b> ${date}</p>
    `;
}

function downloadPDF(){

// scroll to top before generating PDF
window.scrollTo(0,0);

const element = document.getElementById("coverPage");

const opt = {
  margin: 0,
  filename: "assignment_cover.pdf",
  image: { type: "jpeg", quality: 1 },
  html2canvas: { scale: 2, scrollY: 0 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
};

html2pdf().set(opt).from(element).save();

}