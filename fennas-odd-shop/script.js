const goods = [
  { name: "A shoe", cost: "4cp" },
  { name: "Brick", cost: "Restocking" },
  { name: "Cow", cost: "2pp" },
  { name: "Rope (5ft)", cost: "9cp" },
  { name: "A cool rock", cost: "5gp" },
  { name: "Marble", cost: "1cp" },
];

const marble = [{ name: "Marble", cost: "1cp" }];

let shop = document.getElementById("shop");
let pagination = document.getElementById("pagination");
let max_page = 268; // 12, 144, 268
let current_page = 1;

function createGoods() {
  shop.innerText = "";
  for (let i = 0; i < goods.length; i++) {
    let goods_section = document.createElement("section");
    let goods_img = document.createElement("img");
    goods_img.src = "";
    goods_img.alt = "";

    let goods_name = document.createElement("p");
    goods_name.innerText = goods[i].name;

    let goods_cost = document.createElement("p");
    goods_cost.innerText = goods[i].cost;

    goods_section.append(goods_img, goods_name, goods_cost);
    shop.appendChild(goods_section);
  }
}
createGoods();

function createMarbles() {
  shop.innerText = "";
  for (let i = 0; i < 6; i++) {
    let goods_section = document.createElement("section");
    let goods_img = document.createElement("img");
    goods_img.src = "";
    goods_img.alt = "";

    let goods_name = document.createElement("p");
    goods_name.innerText = marble[0].name;

    let goods_cost = document.createElement("p");
    goods_cost.innerText = marble[0].cost;

    goods_section.append(goods_img, goods_name, goods_cost);
    shop.appendChild(goods_section);
  }
}

function loadShop() {
  const lds = document.getElementById("lds-ring-wrapper");
  if (current_page === 1) {
    lds.style.opacity = 1;
    shop.style.opacity = 0;
    shop.style.animation = "";
    setTimeout(() => {
      createGoods();
      lds.style.opacity = 0;
      shop.style.animation = "shop-load 350ms";
      shop.style.opacity = 1;
    }, 650);
  } else {
    lds.style.opacity = 1;
    shop.style.opacity = 0;
    shop.style.animation = "";
    setTimeout(() => {
      createMarbles();
      lds.style.opacity = 0;
      shop.style.animation = "shop-load 350ms";
      shop.style.opacity = 1;
    }, 650);
  }
}

function createPagination() {
  pagination.innerText = "";

  let arrow_left = document.createElement("a");
  arrow_left.classList.add("arrow", "left");
  if (current_page !== 1) {
    arrow_left.onclick = () => {
      current_page -= 1;
      createPagination();
    };
  }
  pagination.appendChild(arrow_left);

  function pageMin() {
    let page_min = document.createElement("a");
    page_min.innerText = 1;
    page_min.onclick = () => {
      current_page = 1;
      createPagination();
    };
    pagination.appendChild(page_min);

    let ellipsis = document.createElement("span");
    ellipsis.classList.add("ellipsis");
    ellipsis.innerText = "...";
    pagination.appendChild(ellipsis);
  }

  function pageMax() {
    let ellipsis = document.createElement("span");
    ellipsis.classList.add("ellipsis");
    ellipsis.innerText = "...";
    pagination.appendChild(ellipsis);

    let page_max = document.createElement("a");
    page_max.innerText = max_page;
    page_max.onclick = () => {
      current_page = max_page;
      createPagination();
    };
    pagination.appendChild(page_max);
  }

  if (current_page <= 3) {
    for (let i = 1; i < current_page + 2; i++) {
      let page_numbers = document.createElement("a");
      page_numbers.innerText = i;
      page_numbers.onclick = () => {
        current_page = i;
        createPagination();
      };
      if (i === current_page) {
        page_numbers.id = "current-page";
      }
      pagination.appendChild(page_numbers);
    }
    pageMax();
  } else if (current_page >= max_page - 3) {
    pageMin();
    for (let i = current_page - 1; i < max_page + 1; i++) {
      let page_numbers = document.createElement("a");
      page_numbers.innerText = i;
      page_numbers.onclick = () => {
        current_page = i;
        createPagination();
      };
      if (i === current_page) {
        page_numbers.id = "current-page";
      }
      pagination.appendChild(page_numbers);
    }
  } else {
    pageMin();
    for (let i = current_page - 1; i < current_page + 2; i++) {
      let page_numbers = document.createElement("a");
      page_numbers.innerText = i;
      page_numbers.onclick = () => {
        current_page = i;
        createPagination();
      };
      if (i === current_page) {
        page_numbers.id = "current-page";
      }
      pagination.appendChild(page_numbers);
    }
    pageMax();
  }

  let arrow_right = document.createElement("a");
  arrow_right.classList.add("arrow", "right");
  if (current_page !== max_page) {
    arrow_right.onclick = () => {
      current_page += 1;
      createPagination();
    };
  }
  pagination.appendChild(arrow_right);

  loadShop();
}
createPagination();

let footer_text = document.querySelector("footer>p");
footer_text.onclick = () => {
  footer_text.style.animation = "aggressive-shake 150ms 5";
  footer_text.innerText = "No refunds!!";
  footer_text.style.color = "#f55";
  setTimeout(() => {
    footer_text.style.animation = "";
    footer_text.style.color = "";
  }, 150 * 6);
};
