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



function getListProduct() {
  callApi
    .fetchListData()
    .then(function (result) {
      renderListProduct(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}



function addToCart(id) {
  getEle(`btn${id}`).style.display = "flex";
  getEle(`add${id}`).style.display = "none";
  getEle(`btn${id}`).setAttribute('hasCart','true');

  callApi
    .getDetailProduct(id)
    .then((result) => {
      let item = cartList.find((item) => item.product.id === result.data.id);
      if(item == undefined){
        const cartItem = new CartItem(result.data);
        cartItem.id = result.data.id;
        cartList.push(cartItem);
        getQuery(`.quality${id}`).innerHTML = cartItem.quality;
        setLocalStage();
        getLocalStage();
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
    if (quality > 0) {
      if (isPlus) {
        quality += 1;
      } else {
        quality -= 1;
      }
      item.quality = quality;
    } else if (quality == 0) {
      deleteItem(id);
      getEle(`btn${id}`).style.display = "none";
      getEle(`add${id}`).style.display = "block";
    }
    qualityElement.innerHTML = item.quality;
    setLocalStage();
    getLocalStage();
  }
}

function clearAllCart() {
  cartList = [];
  setLocalStage();
  getLocalStage();
}

function deleteItem(cartItemID){
  let index = cartList.findIndex((item) => item.id == cartItemID);
  if(index !== -1) {
    cartList.splice(index,1);
    setLocalStage();
    getLocalStage();
  }
}

function setLocalStage() {
  localStorage.setItem("CartList", JSON.stringify(cartList));
}
function getLocalStage() {
  let dataString = localStorage.getItem("CartList");
  cartList = JSON.parse(dataString);
  renderCartList(cartList);
  totalPayment = cartList.reduce((totalPayment,cartItem) => {
    return totalPayment += parseFloat(cartItem.quality) * parseFloat(cartItem.product.price)
  },0)
  totalAmount = cartList.reduce((totalAmount,cartItem)=>{
    return totalAmount += cartItem.quality
  },0)
  getEle("amount-product").innerHTML = totalAmount;
  getEle("totalCart").innerHTML = `Total: ${totalPayment}`;
}

getListProduct();
