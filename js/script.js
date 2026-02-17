function upDate(previewPic) {
  const display = document.getElementById("image");
  const text = document.getElementById("image-text");

  display.style.backgroundImage = `url('${previewPic.src}')`;
  text.textContent = previewPic.alt;

  // make text readable
  text.style.color = "white";

  // show overlay
  display.style.setProperty("--overlay", "1");
  display.classList.add("active");
}


function unDo() {
  const display = document.getElementById("image");
  const text = document.getElementById("image-text");

  display.style.backgroundImage = "";
  text.textContent = "Hover or focus on an image below to display here.";
  text.style.color = "#333";

  // hide overlay
  display.classList.remove("active");
}


function addTabFocus() {
  const images = document.querySelectorAll(".preview");

  for (let i = 0; i < images.length; i++) {

    // allow keyboard focus
    images[i].setAttribute("tabindex", "0");

    // mouse events
    images[i].addEventListener("mouseover", function () {
      upDate(this);
    });

    images[i].addEventListener("mouseleave", function () {
      unDo();
    });

    // keyboard events
    images[i].addEventListener("focus", function () {
      upDate(this);
    });

    images[i].addEventListener("blur", function () {
      unDo();
    });

    //loop tab focus
    images[i].addEventListener("keydown", function (event) {
      if (event.key === "Tab") {
        const first = images[0];
        const last = images[images.length - 1];

        if (!event.shiftKey && this === last) {
          event.preventDefault();
          first.focus();
        }

        if (event.shiftKey && this === first) {
          event.preventDefault();
          last.focus();
        }
      }
    });
  }
}