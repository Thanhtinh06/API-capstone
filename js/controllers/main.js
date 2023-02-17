//call API 

let callApi = new CallApi();


//DOM ID

function getEle(id){
    return document.getElementById(id);
}

getEle("filterProduct").style.visibility = "hidden";

getEle("cartMain").addEventListener("click",function(){
    getEle("cartShop").style.visibility = "visible";
})

getEle("closeCart").addEventListener("click",function(){
    getEle("cartShop").style.visibility = "hidden";
})

getEle("btnFilter").addEventListener("click",function(){
    getEle("filterProduct").style.visibility = "visible";
})




function renderListProduct(data){
    let contentHTML = "";
    data.forEach(function(product){
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
                            <button class="btn addItem">
                                <span>Add</span><i class="fa-solid fa-chevron-right"></i>
                            </button>
                            <div class="buttons-add">
                                <button class="btn minus">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </button>
                                <span>1</span>
                                <button class="btn plus">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
        `
    })
    getEle("mainCart").innerHTML = contentHTML;
}

function getListProdcut(){
    callApi
        .fetchListData()
        .then(function(result){
            renderListProduct(result.data);
        })
        .catch(function(error){
            console.log(error);
        })
}


getListProdcut();

