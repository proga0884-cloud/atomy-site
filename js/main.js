/* ============================================================
   ATOMY — интерактив сайта
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Липкая шапка ---------- */
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ---------- Мобильное меню ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      nav.classList.remove("open");
    });
  });

  /* ---------- Анимация появления при скролле ---------- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  /* ---------- Счётчики цифр ---------- */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      counterObserver.unobserve(el);
      const target = parseInt(el.dataset.counter, 10);
      const duration = 1500;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-counter]").forEach(el => counterObserver.observe(el));

  /* ---------- FAQ аккордеон ---------- */
  document.querySelectorAll(".faq__q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const answer = item.querySelector(".faq__a");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq__item.open").forEach(openItem => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq__a").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------- Плавающая кнопка ---------- */
  const floating = document.getElementById("floatingCta");
  floating.style.opacity = "0";
  floating.style.pointerEvents = "none";
  floating.style.transition = "opacity 0.3s";
  window.addEventListener("scroll", () => {
    const show = window.scrollY > 600;
    floating.style.opacity = show ? "1" : "0";
    floating.style.pointerEvents = show ? "auto" : "none";
  });

  /* ---------- Форма захвата ---------- */
  const form = document.getElementById("leadForm");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");

  const phoneMask = e => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);
    let out = "";
    if (value.length > 0) out = "+7";
    if (value.length > 1) out += " (" + value.slice(1, 4);
    if (value.length >= 4) out += ") " + value.slice(4, 7);
    if (value.length >= 7) out += "-" + value.slice(7, 9);
    if (value.length >= 9) out += "-" + value.slice(9, 11);
    e.target.value = out;
  };
  phoneInput.addEventListener("input", phoneMask);

  const validate = input => {
    const field = input.closest(".field");
    const nameOk = nameInput.value.trim().length >= 2;
    const phoneOk = phoneInput.value.replace(/\D/g, "").length >= 11;
    if (input === nameInput) {
      field.classList.toggle("invalid", !nameOk);
      return nameOk;
    }
    if (input === phoneInput) {
      field.classList.toggle("invalid", !phoneOk);
      return phoneOk;
    }
    return true;
  };
  nameInput.addEventListener("blur", () => validate(nameInput));
  phoneInput.addEventListener("blur", () => validate(phoneInput));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const okName = validate(nameInput);
    const okPhone = validate(phoneInput);
    if (!okName || !okPhone) return;

    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Отправка...";

    setTimeout(() => {
      form.querySelector(".form-success").classList.add("show");
      form.querySelectorAll(".field").forEach(f => f.classList.remove("invalid"));
      form.reset();
      btn.disabled = false;
      btn.textContent = "Получить консультацию";
    }, 900);
  });
});