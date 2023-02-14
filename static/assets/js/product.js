var quantity = document.getElementsByClassName("input-number")[0].value
var updateBtn = document.getElementsByClassName('update-cart')

async function shopping(){
    var shop= document.querySelector(".shopping-carts")
    var baskettotal=document.querySelector(".baskettotal")
      var response=await  fetch(`${location.origin}/api/orderbasket/?user=${UserId}&complete=false`)
      shop.innerText=""
      
      var data=await response.json()
      baskettotal.innerText=`$${data[0]["get_total"]}`
      for(i=0;i<data[0]["basket"].length;i++){
       shop.innerHTML+=`
       <li>
           <div class="media">
               <a href="#"><img alt="" class="mr-3"
                       src="${data[0]["basket"][i]["product"]["main_img"]}"></a>
               <div class="media-body">
                   <a href="#">
                       <h4>${data[0]["basket"][i]["product"]["title"]}</h4>
                   </a>
                   <h4><span>${data[0]["basket"][i]["quantity"]} x $ ${data[0]["basket"][i]["product"]["title"]}</span></h4>
               </div>
           </div>
           <div class="close-circle"><a href="#"><i class="fa fa-times"
                       aria-hidden="true"></i></a></div>
       </li>
   
       
       `
      }
   
      }
async function AnonymousUserbasket(){ 
    var shop= document.querySelector(".shopping-carts")
        shop.innerHTML= ""
        console.log(shop)
       
        


        shop.innerHTML=""
        
        var cartCookie = JSON.parse(getCookie("cart"))
        document.cookie='cart='+ JSON.stringify(cartCookie)+";domain=;path=/"
        
          let carts = Object.entries(cartCookie);
          var full=0
          for(i in carts){
              
               var response = await fetch(`${location.origin}/api/products/${carts[i][0]}`)
               
               var data = await response.json()
               var total=parseInt(carts[i][1]["quantity"])*parseInt(data["price"])
               var baskettotal=document.querySelector(".baskettotal")
               if (data["get_discount"]== null){
                var discountprice=data["price"]
             }
             else{
                var discountprice=data["get_discount"]
                total=parseInt(carts[i][1]["quantity"])*parseInt(data["get_discount"])

             }
               full+=total
               shop.innerHTML+=`
               <li>
                   <div class="media">
                       <a href="#"><img alt="" class="mr-3"
                               src="${data["main_img"]}"></a>
                       <div class="media-body">
                           <a href="#">
                               <h4>${data["title"]}</h4>
                           </a>
                           <h4><span>${carts[i][1]["quantity"]} x $ ${data["title"]}</span></h4>
                       </div>
                   </div>
                   <div class="close-circle"><a href="#"><i class="fa fa-times"
                               aria-hidden="true"></i></a></div>
               </li>
           
               
               `
               baskettotal.innerHTML=`$${full}`
               
    
    }
    }

for (var i = 0; i < updateBtn.length; i++) {
    updateBtn[i].addEventListener('click', function () {
        var productId = this.dataset.product
        var action = this.dataset.action
        var quantity = document.getElementsByClassName("input-number")[0].value
        var active =document.getElementsByClassName("color-btn");
        var active2=document.getElementsByClassName("size");
        var color=""
        var size=""
        for(i=0;i<active.length;i++){
            if (active[i].classList.contains("active")){
                color=active[i].dataset.value
            }

        }
        for(i=0;i<active2.length;i++){
            if (active2[i].classList.contains("actives")){
                size=active2[i].innerText
            }

        }
        

        console.log('productId:', productId, 'action:', action)
        console.log(User);

        if (User === "AnonymousUser") {
           addCookieItem(productId,action,quantity,color,size)
        } else {
             
            updateUserOrder(productId, action, quantity,color,size)
            document.cookie='cart='+ JSON.stringify({})+";domain=;path=/"
            console.log(document.cookie)
        }

    })

}

function getToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getToken('csrftoken');

function addCookieItem(productID,action,quantity,color,size){
  
  if(action == "first_add"){
    console.log(cart[productID])
    
    if(cart[productID] == undefined){
       cart[productID]= {"quantity":parseInt(quantity),"color":color,"size":size}
       console.log(1)
      

    }
    else{

        cart[productID]["quantity"]+=parseInt(quantity)
       
    }
  }
  if(action == "add"){
    cart[productID]["quantity"]+=1 
    
 }
  if(action =="remove"){
    cart[productID]["quantity"]-=1
    
    if(cart[productID]["quantity"]<=0){
        delete cart[productID]
        
    }
  }
  console.log("Cart:",cart)
  document.cookie='cart='+ JSON.stringify(cart)+";domain=;path=/"
  AnonymousUserbasket()
  
}



function updateUserOrder(productID, action, quantity,color,size) {
    var url = "/update/"
    if(location.pathname.startsWith("/en")){
        url="/en/update/"
    }
    else{
        url="/az/update/"
    }
    fetch(url, {
            method: "POST",
            headers: {
                "Content_Type": "application/jsonn",
                "X-CSRFToken": csrftoken

            },
            body: JSON.stringify({
                "productID": productID,
                "action": action,
                "quantity": quantity,
                "color":color,
                "size":size
            })

        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log("data", data);
            shopping()

        })

}


//Color//

var colorbtns = document.getElementsByClassName("color-btn");
var check = document.getElementsByClassName("check");

for (var i=0; i<check.length; i++){
    check[i].style.display="none"
}

for(let i=0;i<colorbtns.length;i++){
    colorbtns[i].addEventListener('click', function () {
        console.log("1")
        const active = document.getElementsByClassName("color-btn active");
        const active2=document.getElementsByClassName("check d-block")
        // check for the button that has active class and remove it
        if (active) {
          for(let i=0;i<active.length;i++){
            active[i].classList.remove("active");
            
          }
          
          
        }
        if(active2){
            for(let i=0;i<active2.length;i++){
                active2[i].classList.add("d-none");

                active2[i].classList.remove("d-block");
                
              }
          }
        // add active class to the clicked element 
       
        
    colorbtns[i].classList.add("active")
    check[i].classList.remove("d-none")
        check[i].classList.add("d-block")
    
        
    
    

    });
}

var sizes = document.getElementsByClassName("size");

sizes[0].classList.add("actives")

for(let i=0;i<sizes.length;i++){
    sizes[i].addEventListener('click', function () {
        console.log("1")
        const active = document.getElementsByClassName("size actives");
        // check for the button that has active class and remove it
        if (active) {
          for(let i=0;i<active.length;i++){
            active[i].classList.remove("actives");
            
          }
          
          
        }
        
        // add active class to the clicked element 
       
        
    sizes[i].classList.add("actives")
   
    
        
    
    

    });
}
