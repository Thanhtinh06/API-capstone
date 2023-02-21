function renderListProduct(data) {
  let contentHTML = "";
  for (let product of data) {
    contentHTML += `
        <div class="cart">
            <div class="title">
                <i class="fa-brands ${product.logo}"></i>
                <p class="product-status">${product.status}</p>
            </div>
            <div class="img-container">
                <img src="${product.img}"
                    alt="" />
            </div>
            <div class="product-detail">
                <div class="name-product">
                    <p>${product.name}</p>
                    <button class="btn heart">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
                <div class="describe-product">
                    <ul>
                        <li>Type: ${product.type}</li>
                        <li>Screen: ${product.screen}</li>
                        <li>Back Camera: ${product.backCamera}</li>
                        <li>Front Camera: ${product.frontCamera}</li>
                        <li>Desc: ${product.desc}</li>
                    </ul>
                </div>
                <div class="price-add">
                    <span>$ ${product.price}</span>
                    <button onclick="addToCart(${product.id})" class="btn addItem" id="add${product.id}">
                        <span>Add</span><i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <div class="buttons-add" id='btn${product.id}'>
                        <button class="btn minus" id="minus${product.id}" onclick="changeQuality(${product.id},false)">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <span class="quality${product.id}">1</span>
                        <button class="btn plus" id="plus${product.id}" onclick="changeQuality(${product.id},true)">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div> 
        `;
  }
  getEle("mainCart").innerHTML = contentHTML;
}

function renderCartList(data) {
  let contentHTML = "";
  for (let cartItem of data) {
    contentHTML += `
        <div class="cartItem">
            <img src="${cartItem.product.img}"
                alt="" />
            <p>${cartItem.product.name}</p>
            
            <div class="buttons-add">
                <button class="btn minus" onclick="changeQuality(${cartItem.product.id},false)">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <span class="quality${cartItem.product.id}"> ${cartItem.quality} </span>
                <button class="btn plus" onclick="changeQuality(${cartItem.product.id},true)">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
            <p>${cartItem.product.price}</p>
            <button class="trashItem" onclick="deleteItem(${cartItem.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
          
          `;
  }
  getEle("cartList").innerHTML = contentHTML;
}