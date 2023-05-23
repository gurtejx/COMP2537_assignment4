const setup = () => {
  let firstCard = undefined
  let secondCard = undefined
  let matchedCount = 0;
  const totalCards = $(".card").length;

  $(".card").on(("click"), function () {

    // Corner case 1: Check if same card is double clicked
    if ($(this).hasClass("flip") || $(this).hasClass("matched") ) {
      return;
      // Do nothing if card is already flipped or matched
    }

    // Corner case 3: Check if 2 cards are already flipped
    if (firstCard && secondCard) {
      if (!$(firstCard).parent().hasClass("matched")  && !$(secondCard).parent().hasClass("matched")) {
        return;
      }
    }

    $(this).toggleClass("flip");

    if (!firstCard)
      firstCard = $(this).find(".front_face")[0]
    else {
      secondCard = $(this).find(".front_face")[0]
      console.log(firstCard, secondCard);

      if ( firstCard.src == secondCard.src ) {
        console.log("match")
        // add 'matched' class to both cards
        $(`#${firstCard.id}`).parent().addClass("matched");
        $(`#${secondCard.id}`).parent().addClass("matched");

        matchedCount = matchedCount + 2;
        if (matchedCount == totalCards) {
          setTimeout(() => {
            // Display a pop-up alert as the winning message
          alert("Congratulations! You have won the game!");
          console.log("You win!");
          }, 1000)
        }

        // turn off click functionality
        $(`#${firstCard.id}`).parent().off("click")
        $(`#${secondCard.id}`).parent().off("click")

        firstCard = undefined;
        secondCard = undefined;
      } else {
        console.log("no match")
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip")
          $(`#${secondCard.id}`).parent().toggleClass("flip")
        }, 1000)
      }
    }
  });
}

$(document).ready(setup)