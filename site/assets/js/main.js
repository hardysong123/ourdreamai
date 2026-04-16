(() => {
  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const setBodyOverflow = (locked) => {
    document.body.style.overflow = locked ? "hidden" : "";
  };

  const show = (el) => {
    if (!el) return;
    el.hidden = false;
    el.dataset.state = "open";
  };

  const hide = (el) => {
    if (!el) return;
    el.hidden = true;
    el.dataset.state = "closed";
  };

  const initAgeGate = () => {
    const modal = qs("[data-age-gate]");
    if (!modal) return;
    const verified = localStorage.getItem("ageVerified") === "true";
    if (!verified) {
      show(modal);
      setBodyOverflow(true);
    } else {
      hide(modal);
    }
    qsa("[data-age-accept]").forEach((btn) => {
      btn.addEventListener("click", () => {
        localStorage.setItem("ageVerified", "true");
        hide(modal);
        setBodyOverflow(false);
      });
    });
    qsa("[data-age-reject]").forEach((btn) => {
      btn.addEventListener("click", () => {
        hide(modal);
        setBodyOverflow(false);
        window.location.href = "https://www.google.com";
      });
    });
  };

  const initMobileSidebar = () => {
    const drawer = qs("[data-mobile-drawer]");
    const overlay = qs("[data-mobile-overlay]");
    const openBtn = qs("[data-drawer-open]");
    const closeBtn = qs("[data-drawer-close]");
    if (!drawer || !overlay || !openBtn) return;

    const open = () => {
      drawer.dataset.open = "true";
      overlay.dataset.open = "true";
      setBodyOverflow(true);
    };
    const close = () => {
      drawer.dataset.open = "false";
      overlay.dataset.open = "false";
      setBodyOverflow(false);
    };

    openBtn.addEventListener("click", open);
    overlay.addEventListener("click", close);
    if (closeBtn) closeBtn.addEventListener("click", close);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  };

  const initExploreModal = () => {
    const modal = qs("[data-character-modal]");
    if (!modal) return;
    const overlay = qs("[data-character-modal-overlay]");
    const closeBtn = qs("[data-character-modal-close]");
    const title = qs("[data-modal-title]");
    const age = qs("[data-modal-age]");
    const desc = qs("[data-modal-desc]");
    const img = qs("[data-modal-image]");
    const tags = qs("[data-modal-tags]");
    const chatLink = qs("[data-modal-chat-link]");
    const generateLink = qs("[data-modal-generate-link]");

    const open = (card) => {
      const data = JSON.parse(card.getAttribute("data-character"));
      if (title) title.textContent = data.name;
      if (age) age.textContent = String(data.age);
      if (desc) desc.textContent = data.description;
      if (img) img.src = data.image;
      if (img) img.alt = data.name;
      if (tags) {
        tags.innerHTML = "";
        (data.tags || []).slice(0, 4).forEach((t) => {
          const b = document.createElement("span");
          b.className = "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 overflow-hidden border-transparent bg-secondary text-secondary-foreground bg-[#1a1a1a] text-gray-200 px-2.5 py-1";
          b.textContent = t;
          tags.appendChild(b);
        });
      }
      if (chatLink) chatLink.href = `chat.html?character=${encodeURIComponent(data.id)}`;
      if (generateLink) generateLink.href = `generate.html?character=${encodeURIComponent(data.id)}`;
      show(modal);
      setBodyOverflow(true);
    };

    const close = () => {
      hide(modal);
      setBodyOverflow(false);
    };

    qsa("[data-character-card]").forEach((card) => {
      card.addEventListener("click", () => open(card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(card);
        }
      });
    });
    if (overlay) overlay.addEventListener("click", close);
    if (closeBtn) closeBtn.addEventListener("click", close);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    initAgeGate();
    initMobileSidebar();
    initExploreModal();
  });
})();

