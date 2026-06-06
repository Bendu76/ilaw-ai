function downloadDOCX() {

  alert("DOWNLOAD STARTED");

  const isPaid =
    localStorage.getItem("isPaid");

  alert("isPaid = " + isPaid);

  if (isPaid !== "true") {

    alert(
      "Please purchase credits first."
    );

    window.location.href =
      "payment.html";

    return;
  }

  const content =
    document.getElementById("output").innerHTML;

  const blob =
    new Blob(
      [content],
      {
        type: "application/msword"
      }
    );

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    "ILAW_Lesson_Plan.doc";

  link.click();
}

window.downloadDOCX =
  downloadDOCX;


/*
function downloadDOCX() {

  const isPaid =
    localStorage.getItem("isPaid");

  if (isPaid !== "true") {

    alert(
      "Please purchase credits first."
    );

    window.location.href =
      "payment.html";

    return;
  }

  const content =
    document.getElementById("output").innerHTML;

  const blob =
    new Blob(
      [content],
      {
        type:
          "application/msword"
      }
    );

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    "ILAW_Lesson_Plan.doc";

  link.click();
}

window.downloadDOCX =
  downloadDOCX;
  */