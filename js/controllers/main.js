let callApi = new CallApi();
var cartList = [];
var totalPayment;
var totalAmount;
getLocalStage();

function getEle(id) {
  return document.getElementById(id);
}

function getQuery(seletor) {
  return document.querySelector(seletor);
}

const filterProduct = (data, type = "Samsung") => {
  return data.filter((product) => product.type == type);
};

getEle("filterProduct").style.visibility = "hidden";

getEle("cartMain").addEventListener("click", function () {
  getEle("cartShop").style.visibility = "visible";
});

getEle("closeCart").addEventListener("click", function () {
  getEle("cartShop").style.visibility = "hidden";
});

getEle("btnFilter").addEventListener("click", function () {
  getEle("filterProduct").style.visibility = "visible";
});

getEle("cartShop").addEventListener("onclick", function () {
  getEle("cartShop").style.visibility = "hidden";
});

getEle("closeNoti").addEventListener("click", function () {
  getEle("notiProduct").style.visibility = "hidden";
});

function getListProduct() {
  callApi
    .fetchListData()
    .then(function (result) {
      renderListProduct(result.data);
      showFilterProduct(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function addToCart(id) {
  getEle(`btn${id}`).style.display = "flex";
  getEle(`add${id}`).style.display = "none";

  callApi
    .getDetailProduct(id)
    .then((result) => {
      let item = cartList.find((item) => item.product.id === result.data.id);
      if (item == undefined) {
        const cartItem = new CartItem(result.data);
        cartItem.id = result.data.id;
        cartList.push(cartItem);
        getQuery(`.quality${id}`).innerHTML = cartItem.quality;
        setLocalStage();
        getLocalStage();
      } else {
        let amount = getAmount(id);
        getQuery(`.quality${id}`).innerHTML = amount;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function changeQuality(id, isPlus) {
  let item = cartList.find((item) => item.id == id);
  if (item) {
    let qualityElement = getQuery(`.quality${id}`);
    let quality = parseInt(qualityElement.innerHTML);
    if (quality > 0 && quality < 11) {
      if (isPlus) {
        quality += 1;
      } else {
        quality -= 1;
      }
      item.quality = quality;
    }
    if (quality >= 10) {
      getEle("notiProduct").style.visibility = "visible";
    }
    qualityElement.innerHTML = item.quality;
    if (quality < 1) {
      deleteItem(id);
      getEle(`btn${id}`).style.display = "none";
      getEle(`add${id}`).style.display = "block";
    }
    setLocalStage();
    getLocalStage();
  }
}

function getAmount(id) {
  let hasItem = cartList.find((item) => item.product.id == id);
  return hasItem.quality;
}

function clearAllCart() {
  cartList = [];
  setLocalStage();
  getLocalStage();
  getListProduct();
}

function deleteItem(cartItemID) {
  let index = cartList.findIndex((item) => item.id == cartItemID);
  if (index !== -1) {
    cartList.splice(index, 1);
    setLocalStage();
    getLocalStage();
    getListProduct();
  }
}

function getTotalPayment() {
  totalPayment = cartList.reduce((totalPayment, cartItem) => {
    return (totalPayment +=
      parseFloat(cartItem.quality) * parseFloat(cartItem.product.price));
  }, 0);
  getEle("totalCart").innerHTML = `Total: ${totalPayment}`;
  getEle("pay").innerHTML = `$${totalPayment}`;
  getEle("payed").innerHTML = `$${totalPayment}`;
}

function getTotalAmount() {
  totalAmount = cartList.reduce((totalAmount, cartItem) => {
    return (totalAmount += cartItem.quality);
  }, 0);
  getEle("amount-product").innerHTML = totalAmount;
 
}

function setLocalStage() {
  localStorage.setItem("CartList", JSON.stringify(cartList));
}

function getLocalStage() {
  let dataString = localStorage.getItem("CartList");
  cartList = JSON.parse(dataString);
  renderCartList(cartList);
  getTotalAmount();
  getTotalPayment();
}

function showFilterProduct(data) {
  getEle("btnFilter").addEventListener("click", () => {
    getListProduct();
    getTypeFilter('toggle-on',data);
    getTypeFilter('toggle-off',data);
  });
}

function getTypeFilter(id,data){
  const input = getEle(id);
    input.addEventListener("change", () => {
      let arr = filterProduct(data, input.value);
      renderListProduct(arr);
    });
}

function purchase(){
  getEle('cartShop').style.display = "none";
  getEle('purchase').style.display = "block";
  getEle('shipping-item').innerHTML = renderInvoice(cartList);
  
}

function order(){
  getEle('purchase').style.display = "none";
  getEle('orderSuccess').style.visibility = "visible";
  getEle('closeSucess').addEventListener('click', function(){
    closeSession('orderSuccess');
    clearAllCart();
    getEle('continue').style.visibility = "visible";
    getEle('closeThank').addEventListener('click',function(){
      closeSession('continue');
    })
  })

}

function cancel(){
  getEle('purchase').style.display = "none";
  getEle('cartShop').style.display = "block";
}

function closeSession(id){
  getEle(id).style.visibility = "hidden";
}


getListProduct();
