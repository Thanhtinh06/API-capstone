function Validation() {
  this.checkEmpty = function (value, id, message) {
    if (value === "") {
      getId(id).style.display = "block";
      getId(id).innerHTML = message;
      return false;
    }
    getId(id).style.display = "none";
    getId(id).innerHTML = "";
    return true;
  };
}
