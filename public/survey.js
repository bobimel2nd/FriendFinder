$( document ).ready(function() {
  var questions = [
      "Your mind is always buzzing with unexplored ideas and plans.",
      "Generally speaking, you rely more on your experience than your imagination.",
      "You find it easy to stay relaxed and focused even when there is some pressure.",
      "You rarely do something just out of sheer curiosity.",
      "People can rarely upset you.",
      "It is often difficult for you to relate to other people’s feelings.",
      "In a discussion, truth should be more important than people’s sensitivities.",
      "You rarely get carried away by fantasies and ideas.",
      "You think that everyone’s views should be respected regardless of whether they are supported by facts or not.",
      "You feel more energetic after spending time with a group of people."
  ]

  // Add Questions to Form
  for(i=0; i<questions.length; i++) {
    $('#Questions').append($('<h3>').text("Question " + (i+1)));
    $('#Questions').append($('<h4>').text(questions[i]));
    $('#Questions').append("(Strongly Disagree)&nbsp;&nbsp;&nbsp;");
    for(j=0; j<5; j++) {
      $('#Questions').append($('<input/>').attr({ type: 'radio', name:'r'+i, value:(j+1)}));
      $('#Questions').append("" + (j+1) + "&nbsp;&nbsp;");
    }
    $('#Questions').append("&nbsp;(Strongly Agree)");
  }

  // Capture the form inputs
  $("#submit").on("click", function(event) {
    event.preventDefault();

    if (isFormValid() === false) {
      alert("Please fill out all fields before submitting!");
      return;
    }

    // everything there ... create data to send
    var userData = {
      name: $("#name").val(),
      photo: $("#photo").val(),
      scores: [
        $("input[name='r0']:checked").val(),
        $("input[name='r1']:checked").val(),
        $("input[name='r2']:checked").val(),
        $("input[name='r3']:checked").val(),
        $("input[name='r4']:checked").val(),
        $("input[name='r5']:checked").val(),
        $("input[name='r6']:checked").val(),
        $("input[name='r7']:checked").val(),
        $("input[name='r8']:checked").val(),
        $("input[name='r9']:checked").val()
      ]
    };

    // post the data to server
    $.post("/api/friends", userData, function(data) {
      $("#match-name").text(data.name);
      $("#match-img").attr("src", data.photo);
      $("#results-modal").modal("toggle");
    });
  });

  // Form validation
  function isFormValid() {
    var isValid = true;
    $(".form-control").each(function() {
      if ($(this).val() === "") {
        isValid = false;
      }
    });
    for(var i=0; i<10; i++) {
      if(!$("input[name='r"+i+"']:checked").val()){
        isValid = false;
      }
    }
    return isValid;
  }
});

