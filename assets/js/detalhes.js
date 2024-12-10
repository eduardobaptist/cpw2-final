const id = new URLSearchParams(window.location.search).get("id");

$(document).ready(() => {
  $.ajax({
    url: `https://dummyjson.com/products/${id}`,
    method: "GET",
    success: (product) => {
      document.title = product.title;
      $("#produto-infos").html("");
      $("#produto-imagens").html("");

      // galeria de imagens
      $("#produto-imagens").append(`
        <div class="mb-3">
            <div id="produtoCarrossel" data-bs-ride="carousel">
                <div class="d-flex justify-content-start align-items-center">
                    <div class="d-flex flex-column mx-3" style="max-width: 100px;">
                        ${product.images
                          .map(
                            (imagem, index) => `
                                <div 
                                    class="my-1 thumbnail-wrapper ${
                                      index === 0 ? "active" : ""
                                    }" 
                                    data-index="${index}"
                                    style="width: 80px; height: 80px; cursor: pointer;"
                                >
                                    <img 
                                        src="${imagem}" 
                                        class="img-thumbnail" 
                                        style="width: 100%; height: 100%; object-fit: cover;"
                                        alt="Miniatura ${index + 1}"
                                    >
                                </div>
                            `
                          )
                          .join("")}
                    </div>
                    <div class="d-flex align-items-center">
                        ${product.images
                          .map(
                            (imagem, index) => `
                                <div class="carousel-item ${
                                  index === 0 ? "active" : ""
                                } text-center">
                                    <img src="${imagem}" class="w-50 h-auto mx-auto" alt="Imagem do Produto ${
                              index + 1
                            }">
                                </div>
                            `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        </div>    
    `);

      $(".thumbnail-wrapper").on("click", function () {
        const index = $(this).data("index");

        $(".thumbnail-wrapper").removeClass("active");
        $(".carousel-item").removeClass("active");

        $(this).addClass("active");
        $(`#produtoCarrossel .carousel-item:eq(${index})`).addClass("active");
      });

      // infos do produto
      const formattedPrice = product.price.toString().replace(".", ",");
      const installmentPrice = (product.price / 4)
        .toFixed(2)
        .toString()
        .replace(".", ",");

      const generateStars = (rating) => {
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
          if (rating >= i) {
            starsHTML += '<i class="fa-solid text-primary fa-star"></i>';
          } else if (rating > i - 1 && rating < i) {
            starsHTML +=
              '<i class="fa-regular text-primary fa-star-half-stroke"></i>';
          } else {
            starsHTML += '<i class="fa-regular text-primary fa-star"></i>';
          }
        }
        return starsHTML;
      };

      $("#produto-infos").append(`
        <div class="card w-100 h-100">
          <div class="card-body">
            <h3>${product.title}</h3>
            <span class="me-1">${product.rating.toFixed(1)}</span>
            ${generateStars(product.rating)}
            <span class="ms-1">(${product.reviews.length})</span>
            <div class="d-flex mt-1 align-items-center">
              <h1 class="m-0 display-6">R$ ${formattedPrice}</h1>
              ${
                product.discountPercentage > 0
                  ? `<span class="text-success ms-2 fw-semibold">
                      ${product.discountPercentage
                        .toString()
                        .replace(".", ",")}% OFF
                    </span>`
                  : ""
              }
            </div>
            <p class="card-text text-body-tertiary mt-1">
              em 4x de R$ ${installmentPrice}
            </p>
            <p class="text-sm text-secondary">
              ${product.description}
            </p>
            <strong class="text-success">Estoque disponível: ${product.stock}</strong>
            <button class="btn btn-primary mt-3 py-3 w-100 text-lg">Comprar</button>
          </div>
        </div>
      `);
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
