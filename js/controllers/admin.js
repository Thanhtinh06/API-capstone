let callApi = new CallApi();
let img = "";
let validation = new Validation();

const getId = (id) => document.getElementById(id);
const getClass = (clazz) => document.getElementsByClassName(clazz);

getId("btnAddNew").addEventListener("click", () => {
  getClass("modal-title")[0].innerHTML = "Add new";
  const btnAdd =
    "<button class='btn btn-success' onclick='btnAdd()'>Add</button>";
  getClass("modal-footer")[0].innerHTML = btnAdd;
  getId("name").value = "";
  getId("price").value = "";
  getId("screen").value = "";
  getId("back").value = "";
  getId("front").value = "";
  getId("desc").value = "";
});

const getListProduct = () => {
  callApi
    .fetchListData()
    .then((result) => renderData(result.data))
    .catch((error) => console.error(error));
};

getListProduct();

const renderData = (data) => {
  let content = "";
  data.forEach((product) => {
    content += `
    <tr>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.screen}</td>
      <td>${product.backCamera}</td>
      <td>${product.frontCamera}</td>
      <td>
        <img src='./../../images/${product.img}' width='100' alt='${product.img}'/>
      </td>
      <td>${product.type}</td>
      <td>${product.status}</td>
      <td>${product.logo}</td>
      <td>
        <button type='button' class='btn btn-primary' onclick='btnEdit("${product.id}")' 
        data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
        <button type='button' class='btn btn-danger' onclick='btnDelete("${product.id}")'>Delete</button>
      </td>
    </tr>
    `;
  });
  document.querySelector("tbody").innerHTML = content;
};

const btnDelete = (id) => {
  callApi
    .deleteProduct(id)
    .then(() => getListProduct())
    .catch((error) => console.log(error));
};

const btnAdd = () => {
  let name = getId("name").value;
  let price = getId("price").value;
  let screen = getId("screen").value;
  let back = getId("back").value;
  let front = getId("front").value;
  let desc = getId("desc").value;
  let type = getId("type").value;
  let status = getId("status").value;
  let logo = getId("logo").value;
  let image = "";
  if (getId("image").files.length > 0) {
    image = getId("image").files[0].name;
  }
  var isValid = true;
  isValid &= validation.checkEmpty(name, "validName", "Please input name");
  isValid &=
    validation.checkEmpty(price, "validPrice", "Please input price") &&
    validation.checkPositive(price, "validPrice", "Price must be positive");
  isValid &= validation.checkEmpty(
    screen,
    "validScreen",
    "Please input screen"
  );
  isValid &= validation.checkEmpty(
    back,
    "validBack",
    "Please input back camera"
  );
  isValid &= validation.checkEmpty(
    front,
    "validFront",
    "Please input front camera"
  );
  isValid &= validation.checkEmpty(
    image,
    "validImage",
    "Please choose an image"
  );
  if (!isValid) return null;
  const product = new Product(
    "",
    name,
    price,
    screen,
    back,
    front,
    image,
    desc,
    type,
    status,
    logo
  );
  callApi
    .addProduct(product)
    .then(() => {
      getListProduct();
      getClass("btn-close")[0].click();
      image = "";
    })
    .catch((error) => console.log(error));
};

const btnEdit = (id) => {
  getClass("modal-title")[0].innerHTML = "Update";
  const btnUpdate = `<button class='btn btn-success' onclick='btnUpdate("${id}")'>Update</button>`;
  getClass("modal-footer")[0].innerHTML = btnUpdate;
  callApi
    .getDetailProduct(id)
    .then((result) => {
      const product = result.data;
      getId("name").value = product.name;
      getId("price").value = product.price;
      getId("screen").value = product.screen;
      getId("back").value = product.backCamera;
      getId("front").value = product.frontCamera;
      getId("desc").value = product.desc;
      getId("type").value = product.type;
      getId("status").value = product.status;
      getId("logo").value = product.logo;
      img = product.img;
    })
    .catch((error) => console.error(error));
};

const btnUpdate = (id) => {
  let name = getId("name").value;
  let price = getId("price").value;
  let screen = getId("screen").value;
  let back = getId("back").value;
  let front = getId("front").value;
  let desc = getId("desc").value;
  let type = getId("type").value;
  let status = getId("status").value;
  let logo = getId("logo").value;
  let image = "";
  if (getId("image").files.length > 0) {
    image = getId("image").files[0].name;
  }
  if (image === "") {
    image = img;
  }
  let isValid = true;
  isValid &= validation.checkEmpty(name, "validName", "Please input name");
  isValid &=
    validation.checkEmpty(price, "validPrice", "Please input price") &&
    validation.checkPositive(price, "validPrice", "Price must be positive");
  isValid &= validation.checkEmpty(
    screen,
    "validScreen",
    "Please input screen"
  );
  isValid &= validation.checkEmpty(
    back,
    "validBack",
    "Please input back camera"
  );
  isValid &= validation.checkEmpty(
    front,
    "validFront",
    "Please input front camera"
  );
  if (!isValid) return null;
  const product = new Product(
    id,
    name,
    price,
    screen,
    back,
    front,
    image,
    desc,
    type,
    status,
    logo
  );
  callApi
    .editProduct(product)
    .then(() => {
      getListProduct();
      getClass("btn-close")[0].click();
    })
    .catch((error) => console.log(error));
};
