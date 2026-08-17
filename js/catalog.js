/* ============================================================
   Каталог продукции Atomy
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "HemoHIM",
    category: "health",
    catLabel: "Здоровье",
    price: "1 900 ₽",
    oldPrice: "2 800 ₽",
    badge: "Хит продаж",
    emoji: "🌿",
    desc: "Запатентованная корейская формула для укрепления иммунитета, энергии и восстановления сил."
  },
  {
    id: 2,
    name: "Полный набор косметики 6 System",
    category: "cosmetics",
    catLabel: "Косметика",
    price: "5 400 ₽",
    oldPrice: "9 800 ₽",
    badge: "Выбор №1",
    emoji: "💄",
    desc: "Полный уход за кожей лица: очищение, тонизирование, увлажнение и питание на натуральной основе."
  },
  {
    id: 3,
    name: "Зубная паста Atomy",
    category: "care",
    catLabel: "Гигиена",
    price: "490 ₽",
    oldPrice: "750 ₽",
    badge: "Бестселлер",
    emoji: "🦷",
    desc: "Без фтора. Бережно очищает зубы и дёсны, подходит всей семье, приятный мягкий вкус."
  },
  {
    id: 4,
    name: "Пробиотики для кишечника",
    category: "health",
    catLabel: "Здоровье",
    price: "2 300 ₽",
    oldPrice: "3 500 ₽",
    badge: "Для иммунитета",
    emoji: "🦠",
    desc: "10 штаммов полезных бактерий для здорового пищеварения и поддержки иммунитета."
  },
  {
    id: 5,
    name: "Средство для мытья посуды",
    category: "home",
    catLabel: "Дом",
    price: "320 ₽",
    oldPrice: "500 ₽",
    badge: "Экономия",
    emoji: "🧼",
    desc: "Концентрат натурального состава: 1 флакон заменяет 3 обычных. Безопасно для кожи рук."
  },
  {
    id: 6,
    name: "Шампунь против выпадения волос",
    category: "care",
    catLabel: "Гигиена",
    price: "690 ₽",
    oldPrice: "1 200 ₽",
    badge: "Новинка",
    emoji: "🧴",
    desc: "Натуральные корейские травы укрепляют волосы от корней и стимулируют их рост."
  },
  {
    id: 7,
    name: "Витамины для детей",
    category: "health",
    catLabel: "Здоровье",
    price: "1 700 ₽",
    oldPrice: "2 600 ₽",
    badge: "Для всей семьи",
    emoji: "🍊",
    desc: "Жевательные витамины с приятным вкусом: 12 витаминов и минералов для роста и развития."
  },
  {
    id: 8,
    name: "Крем для лица с пептидами",
    category: "cosmetics",
    catLabel: "Косметика",
    price: "1 250 ₽",
    oldPrice: "2 100 ₽",
    badge: "Антивозрастной",
    emoji: "✨",
    desc: "Разглаживает морщины и подтягивает кожу. Пептиды морского коллагена глубоко увлажняют."
  },
  {
    id: 9,
    name: "Стиральный порошок-концентрат",
    category: "home",
    catLabel: "Дом",
    price: "580 ₽",
    oldPrice: "950 ₽",
    badge: "Эко",
    emoji: "🧺",
    desc: "Экологичный состав, отстирывает даже в холодной воде. Безопасен для детской одежды."
  },
  {
    id: 10,
    name: "Полифенол плюс (антиоксиданты)",
    category: "health",
    catLabel: "Здоровье",
    price: "2 100 ₽",
    oldPrice: "3 200 ₽",
    badge: "Для молодости",
    emoji: "🍇",
    desc: "Мощный антиоксидантный комплекс из зелёного чая и винограда для защиты клеток."
  },
  {
    id: 11,
    name: "Набор ухода за телом",
    category: "cosmetics",
    catLabel: "Косметика",
    price: "2 800 ₽",
    oldPrice: "4 600 ₽",
    badge: "Подарочный",
    emoji: "🌸",
    desc: "Гель для душа, скраб и увлажняющий лосьон с натуральными маслами. Идеальный подарок."
  },
  {
    id: 12,
    name: "Очищающие салфетки для дома",
    category: "home",
    catLabel: "Дом",
    price: "290 ₽",
    oldPrice: "450 ₽",
    badge: "Универсальные",
    emoji: "🧽",
    desc: "Многоразовые салфетки из микрофибры: чистят любые поверхности без химии и запахов."
  }
];

function renderCatalog(filter) {
  const grid = document.getElementById("catalogGrid");
  const items = PRODUCTS.filter(p => filter === "all" || p.category === filter);
  grid.innerHTML = items.map(p => `
    <article class="product reveal visible">
      <div class="product__img">
        <span>${p.emoji}</span>
        <span class="product__badge${p.badge === "Новинка" ? " product__badge--orange" : ""}">${p.badge}</span>
      </div>
      <div class="product__body">
        <span class="product__cat">${p.catLabel}</span>
        <h3 class="product__name">${p.name}</h3>
        <p class="product__desc">${p.desc}</p>
        <div class="product__bottom">
          <div>
            ${p.oldPrice ? `<span class="product__old">${p.oldPrice}</span>` : ""}
            <span class="product__price">${p.price}</span>
          </div>
          <a href="#contact" class="btn btn--primary btn--sm">Заказать</a>
        </div>
      </div>
    </article>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog("all");

  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog(btn.dataset.filter);
    });
  });
});