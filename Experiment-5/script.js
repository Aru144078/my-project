const filterDropdown = document.getElementById("categoryFilter");
const products = document.querySelectorAll(".product");

filterDropdown.addEventListener("change", function () {
  const selectedCategory = this.value;

  products.forEach(product => {
    const productCategory = product.getAttribute("data-category");

    if (selectedCategory === "All" || productCategory === selectedCategory) {
      product.style.display = "block"; // show
    } else {
      product.style.display = "none"; // hide
    }
  });
});
