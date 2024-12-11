const redirect = new URLSearchParams(window.location.search).get("redirect");

$("#login-form").on("submit", function (e) {
  e.preventDefault();

  const email = $("#email").val();
  const senha = $("#senha").val();

  if (email === "teste@teste.com" && senha == "123456") {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: email,
      })
    );

    if (redirect) {
      window.location.href = redirect;
    }
  } else {
    $("#erro-container").html(`
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Usuário ou senha incorretos.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `);
  }
});
