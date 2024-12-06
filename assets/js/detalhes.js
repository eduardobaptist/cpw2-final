const id = new URLSearchParams(window.location.search).get("id");

$(document).ready(() => {
  $.ajax({
    url: `https://dummyjson.com/products/${id}`,
    method: "GET",
    success: (data) => {
      document.title = data.title;
    },
    error: (xhr, status, error) => {
      $("main").html(
        `<div class="w-100 d-flex justify-content-center">
            <p class="text-danger mt-3">Erro ao carregar dados: ${error}</p>
        </div>`
      );
    },
  });
});
