const id = new URLSearchParams(window.location.search).get("id");

$(document).ready(() => {
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

  //se não tá logado vai pro login
  if (!userEmail) {
    window.location.href = `login.html`;
    return;
  }
  
  $("#user").append(userEmail);
  $("#venda-user").append(userEmail);
  $("#venda-data").append(new Date().toLocaleDateString("pt-BR").toString());

  $.ajax({
    url: `https://dummyjson.com/products/${id}`,
    method: "GET",
    success: (product) => {
        $("#produto-nome").text(product.title);
        $("#produto-unitario").text("R$ "+ product.price.toFixed(2));
        $("#produto-total").text("R$ "+ product.price.toFixed(2));
        $("#total").text("R$ "+ product.price.toFixed(2));
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

$("#imprimir").on("click", () => {
    window.print();
})

function mostrarErro(mensagem) {
  $("#erro-container").html(`
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `);
}