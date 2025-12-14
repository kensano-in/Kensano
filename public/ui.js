async function goChat() {
  const inputs = document.querySelectorAll("input");
  const username = inputs[0].value;
  const password = inputs[1].value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    alert("Access denied");
    return;
  }

  const data = await res.json();
  localStorage.setItem("kensano_token", data.token);
  window.location.href = "chat.html";
}
