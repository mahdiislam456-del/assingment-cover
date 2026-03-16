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

let element = document.getElementById("coverPage");

html2pdf()
.set({
margin:10,
filename:"assignment-cover.pdf",
html2canvas:{scale:2},
jsPDF:{unit:"mm", format:"a4", orientation:"portrait"}
})
.from(element)
.save();

}