const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("https://formsubmit.co/ajax/sujataydv32gmail.com", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      alert("Message sent successfully!");
      form.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  });
}