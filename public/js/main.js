$(document).ready(function () {
  $(".modal").modal();

  $("form").submit(function (e) {
    e.preventDefault();

    const name = $("input#name").val();
    const id = $("form").attr("data-id");

    $.ajax({
      method: "put",
      url: "/image/" + id,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        name: name,
      }),
      success: function (response) {
        window.location.href = "/image/" + id;
      },
      error: function (err) {
        console.log(err);
      },
    });
  });

  $('#delete').on('click', function() {
    const id = $("#delete").attr("data-id");
    $.ajax({
      method: 'delete',
      url: "/image/" + id,
      success: function (response) {
        console.log(response);
        window.location.href = "/";
      },
      error: function (err) {
        console.log(err);
      },
    })
  })
});
