let answer = Math.floor(Math.random() * 100 + 1);
let count = 0;
let userGuess;
let response = "";

function reset() {
  answer = Math.floor(Math.random() * 100 + 1);
  count = 0;
  userGuess = "";
  response = "";
  document.querySelector("#guessCount").innerHTML = "";
  document.querySelector("#response").innerHTML = "";
  document.querySelector("#userGuess").value = "";
}

function GuessingGame(e) {
  e.preventDefault();
  userGuess = Number(document.querySelector("#userGuess").value);
  count += 1;
  document.querySelector(
    "#guessCount"
  ).innerHTML = `Number of guesses: ${count}`;
  if (userGuess === answer) {
    response = "Congratulations, You guessed the correct Number!";
    document.querySelector("#restart").style.visibility = "visible";
    document.querySelector("#submitBtn").setAttribute("disabled", "");
    document.querySelector("#userGuess").setAttribute("disabled", "");
    document.querySelector("#mainDiv").style.backgroundImage =
      "url('../static/images/carlton.gif')";
  } else {
    document.querySelector("#wrongIcon").className = "show";
    setTimeout(
      () => (document.querySelector("#wrongIcon").className = "hide"),
      2000
    );
    if (userGuess > answer) {
      response = "Too High!";
    } else if (userGuess < answer) {
      response = "Too Low!";
    }
  }
  document.querySelector("#userGuess").value = "";
  document.querySelector("#response").innerHTML = response;
}
