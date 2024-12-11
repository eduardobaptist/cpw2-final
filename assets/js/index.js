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

        $("#produtos-cards").append(`
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
              <a class="text-decoration-none" href="detalhes.html?id=${
                product.id
              }">
                <div class="card card-produto cursor-pointer w-100 h-100">
                  <div 
                    class="card-img-container d-flex justify-content-center align-items-center" 
                    style="width: 100%; height: 200px"
                  >
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
                        product.brand?.length > 0
                          ? `<br><span class="text-secondary small">por ${product.brand}</span>`
                          : ""
                      }
                      <br>
                    </p>
                    <span class="me-1">${product.rating.toFixed(1)}</span>
                    ${generateStars(product.rating)}
                    <span class="ms-1">(${product.reviews.length})</span>
                    <div class="d-flex mt-1 align-items-center">
                      <h3 class="m-0">R$ ${formattedPrice}</h3>
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
                    <p class="card-text">
                      <span class="text-success"><strong>Frete grátis</strong></span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          `);
      });
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
