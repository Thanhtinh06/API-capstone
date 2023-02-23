// DOM utility functions
const getEle = (id) => document.getElementById(id);
const getQuery = (selector) => document.querySelector(selector);

// Element visibility manipulation functions
const show = (ele) => (ele.style.visibility = "visible");
const hide = (ele) => (ele.style.visibility = "hidden");

// Element display manipulation functions
const showBlock = (ele) => (ele.style.display = "block");
const hideBlock = (ele) => (ele.style.display = "none");
const showBlockFlex = (ele) => (ele.style.display = "flex");

// Element innerHTML

const showText = (ele, content) => (ele.textContent = content);

// Event listeners
getEle("cartMain").addEventListener("click", () => {
  show(getEle("cartShop"));
});
getEle("closeCart").addEventListener("click", () => hide(getEle("cartShop")));
getEle("btnFilter").addEventListener("click", () =>
  show(getEle("filterProduct"))
);
getEle("cartShop").addEventListener("onclick", () => hide(getEle("cartShop")));
getEle("closeNoti").addEventListener("click", () =>
  hide(getEle("notiProduct"))
);
hideBlock(getEle("filterProduct"));

//filter product
const filterProduct = (data, type = "Samsung") => {
  return data.filter((product) => product.type == type);
};

//get amount
const getAmount = (id) => {
  let item = cartList.find((item) => item.product.id == id);
  return item.quality;
};

// get Total payment
const getTotalPayment = () => {
  if(cartList !== null){
    totalPayment = cartList.reduce((totalPayment, cartItem) => {
      return (totalPayment +=
        parseFloat(cartItem.quality) * parseFloat(cartItem.product.price));
    }, 0);
    showText(getEle("totalCart"), `Total: ${totalPayment}`);
    showText(getEle("pay"), `$${totalPayment}`);
    showText(getEle("payed"), `$${totalPayment}`);
  }
};

//get total amout => show in shopCart
const getTotalAmount = () => {
  if(cartList !== null){
  totalAmount = cartList.reduce((totalAmount, cartItem) => {
    return (totalAmount += cartItem.quality);
  }, 0);
  showText(getEle("amount-product"), totalAmount);
}
};

//cancel order => close block
const cancel = () => {
  hideBlock(getEle("purchase"));
  showBlock(getEle("cartShop"));
};

const setLocalStage = () => {
  localStorage.setItem("CartList", JSON.stringify(cartList));
};

//getLocal => get data from local => call 2 function amount & payment => update data when cartList change
const getLocalStage = () => {
  let dataString = localStorage.getItem("CartList");
  cartList = JSON.parse(dataString);
  renderCartList(cartList);
  getTotalAmount();
  getTotalPayment();
};

const callFnLocal = () => {
  setLocalStage();
  getLocalStage();
};

let callApi = new CallApi();
var cartList = [];
var totalPayment;
var totalAmount;
getLocalStage();


const getListProduct = () => {
  callApi
    .fetchListData()
    .then(function (result) {
      renderListProduct(result.data);
      showFilterProduct(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};


const addToCart = (id) => {
  
  showBlockFlex(getEle(`btn${id}`));
  hideBlock(getEle(`add${id}`));

  callApi
    .getDetailProduct(id)
    .then((result) => {
      let item = cartList.find((item) => item.product.id === result.data.id);
      if (item == undefined) {
        const cartItem = new CartItem(result.data);
        cartItem.id = result.data.id;
        cartList.push(cartItem);
        showText(getQuery(`.quality${id}`), cartItem.quality);
        callFnLocal();
      } else {
        let amount = getAmount(id);
        showText(getQuery(`.quality${id}`), amount);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};


const changeQuality = (id, isPlus) => {
  let item = cartList.find((item) => item.id == id);
  if (item) {
    let qualityElement = getQuery(`.quality${id}`);
    let quality = parseInt(qualityElement.textContent);
    if (quality > 0 && quality < 11) {
      if (isPlus) {
        quality += 1;
      } else {
        quality -= 1;
      }
      item.quality = quality;
    }
    if (quality >= 10) {
      show(getEle("notiProduct"));
    }
    qualityElement.textContent = item.quality;
    if (quality < 1) {
      deleteItem(id);
      hideBlock(getEle(`btn${id}`));
      showBlock(getEle(`add${id}`));
    }
    callFnLocal();
  }
};
const clearAllCart = () => {
  cartList = [];
  callFnLocal();
  getListProduct();

};

const deleteItem = (cartItemID) => {
  let index = cartList.findIndex((item) => item.id == cartItemID);
  if (index !== -1) {
    cartList.splice(index, 1);
    callFnLocal();
    getListProduct();
  }
};

const showFilterProduct = (data) => {
  getEle("btnFilter").addEventListener("click", () => {
    getListProduct();
    getTypeFilter("toggle-on", data);
    getTypeFilter("toggle-off", data);
  });
};

const getTypeFilter = (id, data) => {
  const input = getEle(id);
  input.addEventListener("change", () => {
    let arr = filterProduct(data, input.value);
    renderListProduct(arr);
  });
};

const purchase = () => {
  if(cartList.length > 0){
    showBlock(getEle("purchase"));
    hideBlock(getEle("cartShop"));
    getEle("shipping-item").innerHTML = renderInvoice(cartList);
  }
};

/**
 * onclick order => hide session purchase and show noti order successful =>
 * onclick okay => hide noti & clear cart => show noti thank
 * onlick continue => hide noti continue
 */
const order = () => {
  hideBlock(getEle("purchase"));
  show(getEle("orderSuccess"));
  getEle("closeSucess").addEventListener("click", function () {
    hide(getEle("orderSuccess"));
    clearAllCart();
    show(getEle("continue"));
    getEle("closeThank").addEventListener("click", function () {
      hide(getEle("continue"));
    });
  });
};

getListProduct();
