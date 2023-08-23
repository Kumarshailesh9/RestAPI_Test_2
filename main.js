function completeOrder(e){
    e.preventDefault();
    const cost = e.target.cost.value;
    const name = e.target.name.value;
    const cat = e.target.cat.value;

    const product = {
        cost,
        name,
        cat
    }
    
    //store data on crudcrud and showinng on screen
    axios.post("https://crudcrud.com/api/6e88ab1d39cd4248bebfb12c39bfbbb9/products",product)
    .then((response) => {
        showProductOnScr(response.data)
        console.log(response.data)

    })
    .catch((err) => console.log(err))
}

//Use of network call for data loss on refreshing browser
window.addEventListener("DOMContentLoaded",() => {
    axios
    .get('https://crudcrud.com/api/6e88ab1d39cd4248bebfb12c39bfbbb9/products')
    .then((response) => {
        for(var i=0;i < response.data.length;i++){
            showProductOnScr(response.data[i])
        }
    })
    .catch((err) => console.log(err))
})

function showProductOnScr(product){
    document.getElementById('cost').value="";
    document.getElementById('name').value ="";
    document.getElementById('cat').value="";
   //Add Items In Eloctronics
   if(product.cat == 'Electronic'){
       const parentNode = document.getElementById('Electro');
 
       const childHTML  = `<li id=${product._id}>${product.cost} - ${product.name} - ${product.cat}
                                       <button onclick=deleteProduct('${product._id}','${product.cat}')> Delete </button>
                                    </li>`
    
       parentNode.innerHTML = parentNode.innerHTML + childHTML;
   }

   //Add Items in Food
   else if(product.cat == 'Food'){
       const parentNode = document.getElementById('food');
 
       const childHTML  =`<li id=${product._id}>${product.cost} - ${product.name} - ${product.cat}
                                       <button onclick=deleteProduct('${product._id}','${product.cat}')> Delete </button>
                                    </li>`
    
       parentNode.innerHTML = parentNode.innerHTML + childHTML;
   }

   //Add Items in SkinCare
   else {
       const parentNode = document.getElementById('skin');
 
       const childHTML  = `<li id=${product._id}>${product.cost} - ${product.name} - ${product.cat}
                                       <button onclick=deleteProduct('${product._id}','${product.cat}')> Delete </button>
                                    </li>`
    
       parentNode.innerHTML = parentNode.innerHTML + childHTML;
   }
     
 }


 //function For Deleting Product From CrudCrud and Screen
function deleteProduct(productID,category){
    axios
    .delete(`https://crudcrud.com/api/6e88ab1d39cd4248bebfb12c39bfbbb9/products/${productID}`)
    .then((res)=>{
        console.log(res);
        removeDataFromScr(productID,category);
    })
    .catch((err)=>console.log(err));
}


// Functon for removing product from Screen
 function removeDataFromScr(productID,cat){
    //Remove Product From Electronic Catagary
    if(cat == "Electronic"){
        const parentNode=document.getElementById('Electro');
        const childNode = document.getElementById(productID);
        
        parentNode.removeChild(childNode)
        
    }

    //Remove Product From Food Catagory
    else if(cat == "Food"){
        const parentNode=document.getElementById('food');
        const childNode = document.getElementById(productID);

        parentNode.removeChild(childNode)
        
    }

    //remove product from skinCare catagory
    else {
        const ptNode = document.getElementById('skin');
        const childNode= document.getElementById(productID);

        ptNode.removeChild(childNode);
    }


  }