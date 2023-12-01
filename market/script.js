
const goods = [
    { name: "Lorem ipsum", price: "150", img: "", alt: "img" },
    { name: "Lorem ipsum", price: "3.95", img: "", alt: "img" },
    { name: "Lorem ipsum", price: "10", img: "", alt: "img" },
    { name: "Lorem ipsum", price: "8.95", img: "", alt: "img" },
    { name: "Lorem ipsum", price: "4", img: "", alt: "img" },
    { name: "Lorem ipsum", price: "19.95", img: "", alt: "img" },
    { name: "Lorem ipsum", price: "50", img: "", alt: "img" },
    { name: "Lorem ipsum", price: "30", img: "", alt: "img" },
    { name: "Lorem ipsum", price: "10", img: "", alt: "img" },
    { name: "Lorem ipsum", price: "2.50", img: "", alt: "img" },
    { name: "Lorem ipsum", price: "12", img: "", alt: "img" }
]

let goods_section = document.getElementById("goods");
for (const good of goods) {
    let container = document.createElement("section");
    container.classList.add("hidden", "left", "display");
    let img = document.createElement("img");
    img.src = good.img;
    img.alt = good.alt;
    container.appendChild(img);
    let text_box = document.createElement("div");
    let name = document.createElement("p");
    name.innerText = good.name;
    let price = document.createElement("p");
    price.innerText = `$${good.price}`;
    text_box.appendChild(name);
    text_box.appendChild(price);
    container.appendChild(text_box);
    goods_section.appendChild(container);
}

/* REVEAL PANEL */
let dropdown_btns = document.querySelectorAll(".select");

for (const btn of dropdown_btns) {
    let panel = btn.nextElementSibling;
    btn.addEventListener("click", () => {
        panel.style.display = "block";

        window.addEventListener("click", (e) => {
            if (e.target != btn) {
                panel.style.display = "";
            }
        })
    })
    const panel_name = panel.querySelector("input").name;
    dropdownSelection(panel, btn, panel_name);
}

function dropdownSelection(panel, btn, name) {
    panel.addEventListener("change", () => {
        let selected = document.querySelector(`input[type="radio"][name="${name}"]:checked`).value;
        btn.innerText = selected;
    })
}

/* SAVE CHECKBOX OPTIONS */
let checkboxes = document.querySelectorAll("input[type='checkbox']:not(#blur-btn)");
checkboxes.forEach(checkbox => {
    console.log(checkbox.id);
    let checked = localStorage.getItem(checkbox.id);
    if (checked == "true") { checkbox.checked = true }
    else if (checked == "false") { checkbox.checked = false }
    checkbox.addEventListener("click", () => {
        if (checkbox.checked === true){
            localStorage.setItem(checkbox.id, "true");
        } else {
            localStorage.setItem(checkbox.id, "false");
        }
    })
})

/* INTERSECTION OBSERVER */
let options = {
    root: document.querySelector(".hidden")[0],
    rootMargin: '0px',
    threshold: 0.25
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, options);

const hidden_elements = document.querySelectorAll(".hidden");
hidden_elements.forEach((el) => observer.observe(el));

/* TWO HANDLE SLIDER */
let sliders = document.getElementById("range-slider")
let slider_1 = document.querySelector("#from-slider");
let slider_2 = document.querySelector("#to-slider");
let range_colour = document.getElementById("range-colour");
let label_1 = document.querySelector("label[for=from-slider]");
let label_2 = document.querySelector("label[for=to-slider]");
let slider_width = document.querySelector("#options").clientWidth - 12;

sliders.addEventListener("input", () => {
    const ratio_1 = (slider_1.value - slider_1.min) / (slider_1.max - slider_1.min)
    let position_1 = ratio_1 * slider_width;

    const ratio_2 = (slider_2.value - slider_2.min) / (slider_2.max - slider_2.min)
    let position_2 = ratio_2 * slider_width;

    // left slider
    range_colour.style.marginLeft = `${position_1}px`;
    label_1.style.left = `calc(${position_1}px / 1.1)`;
    label_1.innerText = `$${slider_1.value}`;

    // right slider
    range_colour.style.width = `calc(${position_2}px - ${position_1}px)`;
    label_2.style.left = `calc(${position_2}px / 1.1)`;
    label_2.innerText = `$${slider_2.value * 12}`;
})