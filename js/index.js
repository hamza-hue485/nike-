let scCarousel = document.getElementById("SC-carousel"),
    slides = scCarousel.querySelectorAll(".SC-innerCarousel"),
    nextBtn = scCarousel.querySelector("button.next"),
    prevBtn = scCarousel.querySelector("button.prev"),
    navEl = document.querySelector("nav.navbar"),
    navImg = navEl.querySelector("#Logo"),
    nikeImgs = document.querySelectorAll(".nikeImg"),
    navLinks = navEl.querySelectorAll(".nav-link"),
    sections = document.querySelectorAll("section, header"),
    loadingEl = document.querySelector(".loading"),
    latestContent = document.querySelector("#Latest .content"),
    featuredContent = document.querySelector("#Featured .content .row"),
    popupBoxes = document.querySelectorAll('.popup .box'),
    cartProducts = [];
  if (localStorage.getItem("cartProducts") == null){
    updateLocalStorage();
  }else{
    cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  }; 
 ScrollNav();
 nextBtn.addEventListener("click",function(){
  moveSlide(1, this)
 });
 prevBtn.addEventListener("click",function(){
  moveSlide(-1, this)
 });
 navLinks.forEach(function(navLink){
    navLink.addEventListener("click", function(e){
       scrollToSection(navLink, e);
    });
 });
 window.addEventListener("scroll", function(){
    ScrollNav();
    sections.forEach(function (section){
        updateNavLink(section.id);
    });
});
window.addEventListener("load", function(){
   loadingEl.classList.add("hide");
   setTimeout(function(){
     loadingEl.classList.add("d-none");

   }, 900);
});

latest.forEach(function(product){
  let checkProduct = isProductAvailable(product.id);
    latestContent.innerHTML += `
          <div class="product mainBorder p-3 bg-light mb-4"
            data-product-id = "${product.id}"
            data-selected-size = "${checkProduct?.size ?? product.sizes[0]}"
            data-selected-color = "${checkProduct?.colors ?? product.colors[0]}"
            >
            <div class="row">
              <div class="col-md-6 part1">
                <div class="item h-100">
                  <div class="row h-100">
                    <div class="col-lg-2">
                      <div class="item1 h-100 d-flex justify-content-center align-items-center">
                        <ul class="list-unstyled d-flex flex-row column-gap-2 flex-lg-column row-gap-lg-2 column-gap-lg-0">
                           ${prepareLatestImg(product.images)}
                        </ul>
                      </div>
                    </div>
                    <div class="col-lg-10">
                      <div class="item2 h-100 d-flex justify-content-center align-items-center">
                        <div class="selectedImg">
                          <img src="./images/products/${product.images[0]}" alt="Selected Product" class="img-fluid">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 part2">
                <div class="item">
                  <h2 class="mainColor fw-semibold">${product.name}</h2>
                  <p>${product.description}</p>
                  <h6 class="price d-flex column-gap-3 align-items-center">
                    <span class="fw-bolder">Price : </span>
                    ${prepareProductPrice(product.price, product.discount)}
                  </h6>
                  <h6 class="size d-flex column-gap-3 align-items-center">
                    <span class="fw-bolder">Size : </span>
                    <ul class="list-unstyled d-flex column-gap-2 mb-0">
                     ${prepareProductSize(product.sizes, checkProduct)}
                    </ul>
                  </h6>
                  ${(checkProduct)?
                    `<button class="btn mainBtn mainBorder remove" onclick="removeFromCart(${product.id}, this);">Remove From Cart</button>`
                    :
                    `<button class="btn mainBtn mainBorder" onclick="addToCart(${product.id}, this);">Add To Cart</button>`
                  }
                </div>
              </div>
            </div>
          </div>`;
});
features.forEach(function(product){
    featuredContent.innerHTML += ` <div class="col-lg-3 col-sm-6 mb-4 ">
              <div class="product bg-light p-3 text-center rounded-3">
                <p class="fw-light ${(product.discount == 0)?'d-none':''} ">-${product.discount * 100}%</p>
                <div class="head text-center">
                  <div class="selectedImg">
                    <img src="./images/products/${product.images[0]}" alt="product image" class="img-fluid">
                  </div>
                  <i class="fas fa-search key" data-key-popup="product" data-product-id="1" onclick="showPopupDetails(${product.id})"></i>
                  <ul class="list-unstyled mb-0 d-flex justify-content-center align-items-center column-gap-2">
                   ${prepareFeaturedImg(product.images)}
                  </ul>
                </div>
                <div class="body">
                  <h6>${product.name}</h6>
                  <h6 class="price d-flex column-gap-3 justify-content-center align-items-center">
                    ${prepareProductPrice(product.price, product.discount)}
                  </h6>
                </div>
              </div>
            </div>`;
});
popupBoxes.forEach(function(box){
  box.addEventListener("click", function(e){
    e.stopPropagation();
  });
});