// ========================
// GENERATE LESSON PLAN
// ========================

async function generateLessonPlan() {

  try {

    document.getElementById(
      "output"
    ).innerHTML =
      "<h2>Generating ILAW Lesson Plan...</h2>";

    const grade =
      document.getElementById(
        "grade"
      ).value;

    const subject =
      document.getElementById(
        "subject"
      ).value;

    const topic =
      document.getElementById(
        "topic"
      ).value;

    const sessions =
      document.getElementById(
        "sessions"
      ).value;

    const response =
      await fetch(
        "https://ilaw-ai.onrender.com/generate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            grade,
            subject,
            topic,
            sessions
          })
        }
      );

    const data =
      await response.json();

    if (!data.result) {

      document.getElementById(
        "output"
      ).innerHTML =
        "<h2>Generation Failed.</h2>";

      return;

    }

    document.getElementById(
      "output"
    ).innerHTML =
      data.result;

  } catch (error) {

    console.log(error);

    document.getElementById(
      "output"
    ).innerHTML =
      "<h2>Server Error.</h2>";

  }

}