(function () {
  "use strict";

  function getFocusable(container) {
    return Array.prototype.slice.call(container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
    )).filter(function (element) {
      return !element.hasAttribute("hidden") && element.getClientRects().length > 0;
    });
  }

  function setupCvDialog() {
    var dialog = document.querySelector("#cv-dialog");
    var opener = document.querySelector("[data-open-cv]");
    if (!dialog || !opener) return;

    var lastFocused = null;
    var closeButtons = dialog.querySelectorAll("[data-close-cv]");

    function openDialog() {
      lastFocused = document.activeElement;
      document.body.classList.add("dialog-open");
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      var focusable = getFocusable(dialog);
      if (focusable.length) focusable[0].focus();
    }

    function closeDialog() {
      document.body.classList.remove("dialog-open");
      if (typeof dialog.close === "function" && dialog.open) dialog.close();
      else dialog.removeAttribute("open");
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    opener.addEventListener("click", openDialog);
    closeButtons.forEach(function (button) { button.addEventListener("click", closeDialog); });

    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeDialog();
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeDialog();
    });

    dialog.addEventListener("keydown", function (event) {
      if (event.key !== "Tab") return;
      var focusable = getFocusable(dialog);
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function setupEmailComposer() {
    var form = document.querySelector("[data-email-form]");
    if (!form) return;

    var status = form.querySelector("[data-email-status]");
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = "Please complete the fields above.";
        return;
      }

      var data = new FormData(form);
      // NOTE TO USER: Replace 'YOUR_ACCESS_KEY_HERE' with your real key from web3forms.com
      data.append("access_key", "YOUR_ACCESS_KEY_HERE");
      
      if (status) status.textContent = "Sending message...";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          if (status) status.textContent = "Message sent successfully!";
          form.reset();
        } else {
          console.log(response);
          if (status) status.textContent = json.message || "Something went wrong!";
        }
      })
      .catch((error) => {
        console.log(error);
        if (status) status.textContent = "Something went wrong! Check the console.";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (window.SiteComponents) window.SiteComponents.init();
    setupCvDialog();
    setupEmailComposer();
  });
}());
