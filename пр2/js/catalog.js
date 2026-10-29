(function () {
  "use strict";

  // Записи переписаны из data/catalog.csv без изменения значений.
  const products = [
    { id: 1, name: "Учебный товар 1", category: "Книги", price: 575, rating: 4.0 },
    { id: 2, name: "Учебный товар 2", category: "Курсы", price: 660, rating: 4.2 },
    { id: 3, name: "Учебный товар 3", category: "Инструменты", price: 745, rating: 4.4 },
    { id: 4, name: "Учебный товар 4", category: "Книги", price: 830, rating: 4.6 },
    { id: 5, name: "Учебный товар 5", category: "Курсы", price: 915, rating: 4.8 },
    { id: 6, name: "Учебный товар 6", category: "Инструменты", price: 1000, rating: 3.8 },
    { id: 7, name: "Учебный товар 7", category: "Книги", price: 1085, rating: 4.0 },
    { id: 8, name: "Учебный товар 8", category: "Курсы", price: 1170, rating: 4.2 },
    { id: 9, name: "Учебный товар 9", category: "Инструменты", price: 1255, rating: 4.4 },
    { id: 10, name: "Учебный товар 10", category: "Книги", price: 1340, rating: 4.6 },
    { id: 11, name: "Учебный товар 11", category: "Курсы", price: 1425, rating: 4.8 },
    { id: 12, name: "Учебный товар 12", category: "Инструменты", price: 1510, rating: 3.8 },
    { id: 13, name: "Учебный товар 13", category: "Книги", price: 1595, rating: 4.0 },
    { id: 14, name: "Учебный товар 14", category: "Курсы", price: 1680, rating: 4.2 },
    { id: 15, name: "Учебный товар 15", category: "Инструменты", price: 1765, rating: 4.4 },
    { id: 16, name: "Учебный товар 16", category: "Книги", price: 1850, rating: 4.6 },
    { id: 17, name: "Учебный товар 17", category: "Курсы", price: 1935, rating: 4.8 },
    { id: 18, name: "Учебный товар 18", category: "Инструменты", price: 2020, rating: 3.8 }
  ];

  const imageByCategory = {
    "Книги": "images/product-01.svg",
    "Курсы": "images/product-02.svg",
    "Инструменты": "images/product-03.svg"
  };
  const grid = document.getElementById("productGrid");
  const search = document.getElementById("search");
  const category = document.getElementById("category");
  const maxPrice = document.getElementById("maxPrice");
  const sort = document.getElementById("sort");
  const emptyState = document.getElementById("emptyState");
  const count = document.getElementById("resultCount");
  const priceOutput = document.getElementById("priceOutput");
  const rubles = new Intl.NumberFormat("ru-RU");

  function render() {
    const query = search.value.trim().toLocaleLowerCase("ru");
    const selectedCategory = category.value;
    const ceiling = Number(maxPrice.value);
    let result = products.filter((item) =>
      item.name.toLocaleLowerCase("ru").includes(query) &&
      (selectedCategory === "all" || item.category === selectedCategory) &&
      item.price <= ceiling
    );
    if (sort.value === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort.value === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort.value === "rating-desc") result.sort((a, b) => b.rating - a.rating || a.id - b.id);

    grid.replaceChildren(...result.map((item) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `<img class="product-card__image" src="${imageByCategory[item.category]}" alt="Иллюстрация категории ${item.category}" width="240" height="125"><p class="product-card__category">${item.category}</p><h3 class="product-card__title">${item.name}</h3><div class="product-card__meta"><span class="product-card__price">${rubles.format(item.price)} ₽</span><span class="product-card__rating" aria-label="Рейтинг ${item.rating} из 5">★ ${item.rating.toFixed(1)}</span></div>`;
      return card;
    }));
    count.textContent = `Показываем ${result.length} ${result.length === 1 ? "позицию" : "позиций"}`;
    emptyState.hidden = result.length !== 0;
    grid.hidden = result.length === 0;
    priceOutput.value = `${rubles.format(ceiling)} ₽`;
  }

  [search, category, maxPrice, sort].forEach((control) => control.addEventListener("input", render));
  document.getElementById("resetFilters").addEventListener("click", () => {
    search.value = "";
    category.value = "all";
    maxPrice.value = "2500";
    sort.value = "default";
    render();
    search.focus();
  });
  render();
})();
