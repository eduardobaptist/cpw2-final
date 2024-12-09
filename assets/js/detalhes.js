const id = new URLSearchParams(window.location.search).get("id");

$(document).ready(() => {
  $.ajax({
    url: `https://dummyjson.com/products/${id}`,
    method: "GET",
    success: (product) => {
      document.title = product.title;
      $("#produto-infos").html("");
      $("#produto-imagens").html("");

      //galeria de imagens
      $("#produto-imagens")
        .append(`<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    ${product.images.map(image => 
      `<div class="carousel-item active">
      <img src="${image}" class="d-block w-100">
    </div>`
    ).join("")}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Próximo</span>
  </button>
</div>

<!-- Thumbnails -->
<div class="mt-3 d-flex justify-content-center">  
  ${product.images.map(image => 
    `<button 
    class="btn p-0 border-0 thumbnail mx-2 active" 
    data-bs-target="#carouselExample" 
    data-bs-slide-to="1">
    <img src="${image}" class="img-thumbnail" alt="Thumb 2">
  </button>`
  ).join("")}
</div>`);

      const carousel = document.querySelector("#carouselExample");
      const thumbnails = document.querySelectorAll(".thumbnail");

      carousel.addEventListener("slide.bs.carousel", (event) => {
        thumbnails.forEach((thumb) => thumb.classList.remove("active"));

        thumbnails[activeIndex].classList.add("active");
      });

      thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
          const bootstrapCarousel = bootstrap.Carousel.getInstance(carousel);
          bootstrapCarousel.to(index);
        });
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
        <div class="card w-100">
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
            <strong>Estoque disponível: ${product.stock}</strong>
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
