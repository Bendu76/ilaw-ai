const isPaid =
  localStorage.getItem(
    "isPaid"
  );

if (isPaid !== "true") {

  alert(
    "Please purchase credits first."
  );

  window.location.href =
    "payment.html";

  return;

}

function downloadDOCX() {

  const content =
    document.getElementById("output").innerText;

  const blob = new Blob(
    [content],
    {
      type:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    }
  );

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    "ILAW_Lesson_Plan.docx";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

}