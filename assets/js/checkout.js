const id = new URLSearchParams(window.location.search).get("id");

$(document).ready(() => {
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

  //se não tá logado vai pro login
  if (!userEmail) {
    window.location.href = `login.html`;
    return;
  }

  $("#user").append(userEmail);

  //steps
  $(".next-step").click(function () {
    const modoPagamento = $('input[name="payment"]:checked').val();

    if (modoPagamento) {
      $("#step1").removeClass("active");
      $("#erro-container").html("");
      if (modoPagamento === "pix") {
        $("#step2-pix").addClass("active");
        
        //gerando código do pix
        $("#pix-code").val(gerarCodigoPix());
        
        //aguardando os 10 segundos do PIX
        setTimeout(() => {
          window.location.href = `compraFinalizada.html?id=${id}`;
        }, "10000");
      } else {
        $("#step2-cartao").addClass("active");
      }
    } else {
      mostrarErro("O método de pagamento é obrigatório.");
    }
  });

  $("#form-cartao").on("submit", function (e) {
    e.preventDefault();

    //validando o número do cartão
    const cartoesRegex = {
      "american-express": /^(?:3[47][0-9]{13})$/,
      visa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
      mastercard: /^(?:5[1-5][0-9]{14})$/,
      discover: /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/,
      "diners-club": /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/,
      jcb: /^(?:(?:2131|1800|35\d{3})\d{11})$/,
    };

    let bandeira = $("#tipo").val();
    let numero = $("#numero").val();
    if (numero.match(cartoesRegex[bandeira])) {
      window.location.href = `compraFinalizada.html?id=${id}`;
    } else {
      mostrarErro("Número do cartão inválido");
    }
  });
});

function mostrarErro(mensagem) {
  $("#erro-container").html(`
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `);
}

function gerarCodigoPix() {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let codigo = "";

  for (let i = 0; i < 32; i++) {
    codigo += caracteres[Math.floor(Math.random() * caracteres.length)];
  }

  return codigo;
}
