$(document).ready(() => {
  $.ajax({
    url: "https://dummyjson.com/products",
    method: "GET",
    success: (data) => {
      $("#produtos-cards").html("");
      data.products.slice(0, 20).forEach((product) => {
        const formattedPrice = product.price.toString().replace(".", ",");
        const installmentPrice = (product.price / 4)
          .toFixed(2)
          .toString()
          .replace(".", ",");

        $("#produtos-cards").append(`
            <div class="col-12 col-md-4 col-lg-3 m-2">
              <div class="card shadow-sm hover-shadow w-100">
                <div class="card-img-container d-flex justify-content-center align-items-center" style="width: 100%; height: 200px">
                  <img 
                    src="${product.thumbnail}" 
                    class="img-fluid" 
                    style="object-fit: contain; max-height: 100%; max-width: 100%" 
                    alt="Imagem do produto"
                  />
                </div>
                <hr />
                <div class="card-body">
                  <p class="card-text">
                    ${product.title}
                    ${
                      product.brand.length > 0
                        ? `<br><span class="text-secondary small">por ${product.brand}</span>`
                        : ""
                    }
                  </p>
                  <div class="d-flex align-items-center">
                    <h3 class="m-0">R$ ${formattedPrice}</h3>
                    ${
                      product.discountPercentage > 0
                        ? `<span class="text-success ms-2">
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
                  <p class="card-text">
                    <span class="text-success"><strong>Frete grátis</strong></span>
                  </p>
                </div>
              </div>
            </div>
          `);
      });
    },
    error: (xhr, status, error) => {
      $("#produtos-container").html(
        `<p class="text-danger mt-3">Erro ao carregar dados: ${error}</p>`
      );
    },
  });
});
