const id = new URLSearchParams(window.location.search).get("id");

$(document).ready(() => {
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;
  
  if (!userEmail) {
    window.location.href = `login.html?redirect=checkout.html?id=${id}`;
    return;
  }

  $("#user").append(userEmail);

  $.ajax({
    url: `https://dummyjson.com/products/${id}`,
    method: "GET",
    success: (product) => {},
    error: (xhr, status, error) => {
      $("main").html(
        `<div class="w-100 d-flex justify-content-center">
            <p class="text-danger mt-3">Erro ao carregar dados: ${error}</p>
          </div>`
      );
    },
  });
});

//steps
var form = $("#example-form");
form.children("div").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
});