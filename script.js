const list = document.querySelector("#starred");

if (!list) {
  throw new Error("The starred repositories list element was not found.");
}

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  })
  .then((events) => {
    if (!Array.isArray(events)) {
      throw new Error("Unexpected data format.");
    }

    list.innerHTML = "";

    events.forEach((event) => {
      const item = document.createElement("li");

      const repoLink = document.createElement("a");
      repoLink.href = `https://github.com/${event.name}`;
      repoLink.textContent = event.name;
      repoLink.target = "_blank";
      repoLink.rel = "noreferrer";

      item.appendChild(repoLink);
      item.appendChild(document.createTextNode(` — starred ${event.starred}`));
      list.appendChild(item);
    });
  })
  .catch((error) => {
    list.innerHTML =
      '<li role="alert">Unable to load starred repositories.</li>';
    console.error(error);
  });
