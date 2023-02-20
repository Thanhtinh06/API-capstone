function CallApi(){
    this.fetchListData = function (){
        return axios({
            url:"https://63df6ffb59bccf35dab3447e.mockapi.io/api/api-capstone",
            method:"GET"
        })
    };
    this.getDetailProduct = function(id){
        return axios({
            url:`https://63df6ffb59bccf35dab3447e.mockapi.io/api/api-capstone/${id}`,
            method:"GET"
        })
    }
}

