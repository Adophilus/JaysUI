if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function ChangeTheme() {
  if (localStorage.theme == "dark") {
    localStorage.theme = "light";
  } else {
    localStorage.theme = "dark";
  }
  location.reload();
}
if (document.getElementById("homeBody")) {
  fetch("/components/categories")
    .then((response) => response.json())
    .then((data) => {
      data.Data = data.Data || [];
      data.Data.forEach((catos) => {
        document.body.innerHTML += `    <div id="${catos}__constructor" class="mb-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-5 px-5 mt-10">\
      <h1 class="capitalize text-gray-100 col-span-4 font-bold text-2xl"> ${catos}</h1>
      </div>`;
        fetch(`/components/all/${catos}`)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              if (data.Data.length > 0) {
                data.Data.forEach((element) => {
                  document.getElementById(
                    `${catos}__constructor`
                  ).innerHTML += `
        <div>
            <a target="_blank" href="/components/iframe/${catos}/${element.replace(
                    ".html",
                    ""
                  )}" style="">
                <div class="border-2 border-bray-300 bg-bray-400 rounded-md">
                    <div class="text-royal-300 py-2 px-2">
                        <h1 class="capitalize">${element.replace(
                          ".html",
                          ""
                        )}</h1>
                    </div>
                    <div>
                        <img src="/components/thumbnail/${catos}/${element.replace(
                    ".html",
                    ""
                  )}" alt="">
                    </div>
                </div>
            </a>
        </div>
        `;
                });
              } else {
                document.getElementById(`${catos}__constructor`).remove();
              }
            }
          });
      });
    });
}
function CopyCode() {
  document.getElementById("copy").value =
    document.getElementById("view").innerHTML;
  var copyText = document.getElementById("copy");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  alert("Copied to clipboard :)");
}
function ViewCode() {
  document.getElementById("copyCode").style.display = "";
  document.getElementById("showCode").style.display = "none";
  document.getElementById("view").style.display = "none";
  document.getElementById("preview").style.display = "";
  document.getElementById("code").style.display = "";
}
function Preview() {
  document.getElementById("view").style.display = "";
  document.getElementById("code").style.display = "none";
  document.getElementById("showCode").style.display = "";
  document.getElementById("copyCode").style.display = "none";
  document.getElementById("preview").style.display = "none";
}
