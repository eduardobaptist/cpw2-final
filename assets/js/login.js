$("#login-form").on("submit", function (e) {
  e.preventDefault();

  const email = $("#email").value;
  const senha = $("#senha").value;

  if (email === "teste@teste.com" && senha == "123456") {
    user = {
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(user));
  } else {
    $("#erro-container").html(`
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Usuário ou senha incorretos.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `);
  }
});
