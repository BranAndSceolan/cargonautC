document.addEventListener("DOMContentLoaded", function(/*add events to handle here*/) {
  const challengeElement = document.getElementById("js-challenge");
  if (challengeElement) {
    challengeElement.innerHTML = "working";
    challengeElement.classList.remove("text-red");
    challengeElement.classList.add("text-green");
  }
});
