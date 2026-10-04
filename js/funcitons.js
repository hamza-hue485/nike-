function moveSlide(direction, that){
        if(that.classList.contains("active") ) return ;
        let activeEl = scCarousel.querySelector(".active"),
        currentIndex = Array.from(slides).indexOf(activeEl),
        newIndex = (currentIndex + direction + slides.length) % slides.length,
        imgName = slides[newIndex].dataset.colorName,
        iconEle = document.querySelector("#icon");
    replaceActive(activeEl, slides[newIndex]);
    changeMainColor(imgName);
    updateImg(imgName, navImg, "logo");
    getNikeImg(imgName);
    updateImg(imgName, iconEle, "logo");     
};
function changeMainColor(colorName){
    let html = document.documentElement,
    newColor = getComputedStyle(html).getPropertyValue(`--${colorName}-color`);
    html.style.setProperty("--main-color", newColor);   
};
function updateImg(imgName, element, commonName){
    let tagName = element.tagName.toLowerCase(), 
        attr = (tagName === 'a' || tagName === 'link')? 'href' : 'src',
        arrSrc = element[attr].split("/");
    arrSrc[arrSrc.length - 1] = `${imgName}-${commonName}.png`;
    element[attr] = arrSrc.join("/");
};
function getNikeImg(imgName) {
    nikeImgs.forEach(function(nikeImg){
        updateImg(imgName, nikeImg, "correct");
    }); 
};
function replaceActive(oldActive, newActive){
    oldActive.classList.remove("active");
    newActive.classList.add("active");   
};
function ScrollNav(){
    if( scrollY > 10){
        navEl.classList.add("scrolled");
    }else{
        navEl.classList.remove("scrolled");
    };
};
function scrollToSection(navLink, e){
    e.preventDefault();
    let activeLink = navEl.querySelector(".nav-link.active"),
        currentNameId = navLink.getAttribute("href"),
        currentSection = document.querySelector(currentNameId);
        scrollTo(0, currentSection.offsetTop - navEl.clientHeight + 5);
        replaceActive(activeLink, navLink);
};
function updateNavLink(sectionName){
    let section = document.querySelector(`#${sectionName}`); 
    if(window.scrollY > section.offsetTop - navEl.clientHeight && window.scrollY < section.offsetTop + section.clientHeight){
        let sectionId = section.getAttribute("id"),
            navLinkOfSection = document.querySelector(`a[href="#${sectionId}"]`),
            activeLink = navEl.querySelector(".nav-link.active");
        replaceActive(activeLink, navLinkOfSection);
    };
};
function prepareLatestImg(productsImgs, isProduct = false) {
return productsImgs.map(function(currentImg){
        return `<li class="${(isProduct)? '' : 'mainBorder'} p-2"><img src="./images/products/${currentImg}" alt="product 4" onclick="replaceImages('${currentImg}', this);" class="img-fluid"></li>`;
    }).join("");
};
function prepareProductSize(sizes, isProductAvailable) {
    let service = '';
    sizes.forEach(function(size, i){
        if(isProductAvailable == null){ 
        service += `<li class="mainBtn mainBorder fw-light ${(i == 0)?'active':''} " 
        onclick="replaceActive(this.parentElement.querySelector('.active'), this); updateSize('${size}', this)">${size}</li>`;
            }
        else{
        service += `<li class="mainBtn mainBorder fw-light ${(isProductAvailable.size == size)?'active':''} " 
        onclick="replaceActive(this.parentElement.querySelector('.active'), this); updateSize('${size}', this)">${size}</li>`;
        }
    });
    return service;
};
function prepareProductColor(colors, isProductAvailable) {
    let service = '';
    colors.forEach(function(color, i){
        if(isProductAvailable == null){ 
        service += `<li class="mainBtn mainBorder fw-light ${(i == 0)?'active':''}" onclick="replaceActive(this.parentElement.querySelector('.active'),this);updateColor('${color}', this)" style="background-color: ${color};"></li>`;
            }
        else{
        service += `<li class="mainBtn mainBorder fw-light ${(i == 0)?'active':''}" onclick="replaceActive(this.parentElement.querySelector('.active'),this);updateColor('${color}', this)" style="background-color: ${color};"></li>`;
        }
    });
    return service;
};
function prepareProductPrice(price, discount) {
    return `<span class="fw-medium"> <span class="text-decoration-line-through mainColor">${price}<sup>$</span> </sup> ${(price -(price * discount)).toFixed(2)}<sup>$</sup></span>
              `;
};
function prepareFeaturedImg(productsImgs) {
    return productsImgs.map(function(currentImg, i){
        return `<li class="${(i == 0)?'active':''} mainBtn mainBorder" onclick="replaceImages('${currentImg}', this); replaceActive(this.parentElement.querySelector('.active'),this)"></li>`;             
    }).join("");
};
function replaceImages(NewImgName, el){
    let selectedImg = el.closest(".product").querySelector(".selectedImg img"),
    arrSrc = selectedImg.src.split("/");
    arrSrc[arrSrc.length - 1] = NewImgName;
    selectedImg.src = arrSrc.join("/");
};
function openPopup(popupName){
    let popupEL = document.querySelector(`.popup.${popupName}`);
    popupEL.classList.add("active");
    setTimeout(function(){
        popupEL.classList.add("show");
    },1);
    
};
function closePopup(){
    let popupEL = document.querySelector(`.popup.active`);
    popupEL.classList.remove("show");
    setTimeout(function(){
        popupEL.classList.remove("active");
    },800);
};
function showPopupDetails(productId){
    let product = getProduct(productId)[0],
        popupDetails = document.querySelector(".popup.detail .box"),
        checkProduct = isProductAvailable(productId);
    popupDetails.innerHTML = `
        <div 
            class="row product"
            data-selected-size="${checkProduct?.size ?? product.sizes[0]}"
            data-selected-color="${checkProduct?.colors ?? product.colors[0]}"
            >
          <div class="col-sm-6 part1 mb-4 mb-sm-0">
            <div class="item">
              <div class="selectedImg">
                <img src="./images/products/${product.images[0]}" alt="product" class="img-fluid">
              </div>
              <ul class="list-unstyled d-flex mb-0 d-flex justify-content-center align-items-center column-gap-2">
                ${prepareLatestImg(product.images, true)}
              </ul>
            </div>
          </div>
          <div class="col-sm-6 part2">
            <div class="item">
              <h3 class="fw-bold mb-3">${product.name}</h3>
              <h6 class="price d-flex column-gap-3 align-items-center">
                    <span class="fw-bolder fs-6">Price : </span>
                    ${prepareProductPrice(product.price, product.discount)}
              </h6>
              <hr>
              <p>${product.description}</p>
              <h6 class="size d-flex column-gap-3 align-items-center">
                <span class="fw-bolder fs-6">Size : </span>
                <ul class="list-unstyled d-flex column-gap-2 mb-0">
                    ${prepareProductSize(product.sizes, checkProduct)}  
                </ul>
              </h6>
              <h6 class="color my-3 d-flex column-gap-3 align-items-center">
                <span class="fw-bolder fs-6">Color : </span>
                <ul class="list-unstyled d-flex column-gap-2 mb-0">
                  ${prepareProductColor(product.colors, checkProduct)}
                </ul>
              </h6>
              ${(checkProduct)?
                    `<button class="btn mainBtn mainBorder remove" onclick="removeFromCart(${product.id}, this);">Remove From Cart</button>`
                    :
                    `<button class="btn mainBtn mainBorder" onclick="addToCart(${product.id}, this);">Add To Cart</button>`
                  }
            </div>
          </div>
        </div>`;
        openPopup('detail');

};
function getProduct(productId){
    return products.filter(product =>  product.id == productId );
};

function addToCart(productId, that){
    let productEl = that.closest(".product"),
    newOrder = {
        id : productId,
        size : productEl.dataset.selectedSize,
        color : productEl.dataset.selectedColor,  
    };
    cartProducts.push(newOrder);
    updateLocalStorage()
    that.classList.add('remove');
    that.textContent = 'Remove From Cart';
    that.setAttribute("onclick", `removeFromCart(${productId}, this)`) /*Well be this in Html */
};
function removeFromCart(productId, that){
    cartProducts = cartProducts.filter(function(product){
        return product.id != productId;
    });
    updateLocalStorage()
    if(that != null){
        that.classList.remove('remove');
        that.textContent = 'Add To Cart';
        that.setAttribute("onclick", `addToCart(${productId}, this)`) /*Well be this in Html */
    };
};
function updateSize(size, that){
    let productEl = that.closest(".product");
        productEl.dataset.selectedSize = size ;    
};
function updateColor(color, that){
    let productEl = that.closest(".product");
        productEl.dataset.selectedColor = color ;    
};

function updateLocalStorage(){
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));/*Copy */
};
function isProductAvailable(productId){
    let result = cartProducts.filter(function(product){
        return product.id == productId;
    });
   return  (result.length == 0) ? null : result[0] ;
};
function showProductShop(){
    let shopRow = document.querySelector('.popup.shop .box .row'),
        showBtn = false;
    if(cartProducts.length == 0){
        shopRow.innerHTML = `
        <p class="alert alert-warning fw-bold mainColor">There are no products</p>
        `;
    }else {
        shopRow.innerHTML = "";
        showBtn = true ;
    };

cartProducts.forEach(function(cartProduct){
    let product = getProduct(cartProduct.id)[0];
        shopRow.innerHTML += `
            <div class="col-lg-4 mb-3">
                <div class="item bg-light p-3 rounded-3">
                    <img src="./images/products/${product.images[0]}" alt="Selected Product" class="img-fluid">
                    <h5 class="mb-3">${product.name.slice(0, 15)}...</h5>
                    <h6 class="price d-flex column-gap-3 align-items-center">
                        <span class="fw-bolder">Price : </span>
                        ${prepareProductPrice(product.price, product.discount)}
                    </h6>
                    <h6 class="size d-flex column-gap-3 align-items-center my-2">
                        <span class="fw-bolder">Size : </span>
                        <ul class="list-unstyled d-flex column-gap-2 mb-0">
                            ${prepareProductSize([cartProduct.size], null)}
                        </ul>
                    </h6>
                    <h6 class="color my-3 d-flex column-gap-3 align-items-center">
                        <span class="fw-bolder fs-6">Color : </span>
                        <ul class="list-unstyled d-flex column-gap-2 mb-0">
                            ${prepareProductColor([cartProduct.color], null)}
                        </ul>
                    </h6>
                    <button class="btn mainBtn w-100 mx-auto" onclick="removeProductFromShop(${product.id}, this)">Remove</button>
                </div>
            </div>
            ${(cartProduct == cartProducts[cartProducts.length - 1] && showBtn )?
            `<button class="btn mainBtn w-75 mx-auto ">BUY NOW</button>`
                :``}
            `;
    });
    openPopup('shop');
};
function removeProductFromShop(productId, that){
    that.parentElement.parentElement.remove();
    let btnOfLatestPro = document.querySelector(`#Latest .product[data-product-id="${productId}"] button`);
    removeFromCart(productId, btnOfLatestPro);
    if(cartProducts.length == 0){
        let shopRow = document.querySelector('.popup.shop .box .row');
        shopRow.innerHTML = `<p class="alert alert-warning fs-5 fw-bold mainColor">There are no products</p>`;
    }       
};
