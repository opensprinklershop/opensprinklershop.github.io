document.addEventListener("DOMContentLoaded", function () {
  var screenshots = document.querySelectorAll("img.mobile-screenshot");
  if (!screenshots.length) {
    return;
  }

  var lightbox = document.createElement("div");
  lightbox.className = "screenshot-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = '<span class="screenshot-lightbox__close" aria-hidden="true">&times;</span><img alt="">';
  document.body.appendChild(lightbox);

  var fullImage = lightbox.querySelector("img");

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    fullImage.removeAttribute("src");
    fullImage.removeAttribute("alt");
  }

  screenshots.forEach(function (image) {
    image.setAttribute("tabindex", "0");
    image.setAttribute("title", "Open full-size screenshot");

    function openLightbox() {
      fullImage.src = image.currentSrc || image.src;
      fullImage.alt = image.alt || "";
      lightbox.classList.add("is-open");
    }

    image.addEventListener("click", openLightbox);
    image.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox();
      }
    });
  });

  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
});
