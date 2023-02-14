
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
      shop.innerHTML=""
      var cartCookie = JSON.parse(getCookie("cart"))
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
  
  if(action == "add"){
    
    function getCookie(name) {
    
        var cookieArr = document .cookie.split(";");
        
        for(var i=0;i<cookieArr.length;i++){
            var cookiePair = cookieArr[i].split("=");
            if(name == cookiePair[0].trim()) {
                return   decodeURIComponent(cookiePair[1])
        }
    }
    
    return null;
    }
    var cart=JSON.parse(getCookie("cart"))
    if(cart[productID] == undefined){
       cart[productID]= {"quantity":parseInt(quantity),"color":color,"size":size}

       
      
       
    }
    else{
        console.log(cart[productID]["quantity"])
        cart[productID]["quantity"]+=1
        console.log(cart[productID]["quantity"])
        
        
    }
    
       
    
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
                "size":size,
            })

        })
        .then((response) => {
            return response.json()
        })
        .then((data)  => {
            console.log("data", data);
            shopping()
            

        })

}
var likeBtn = document.getElementsByClassName('like')


for (var i = 0; i < likeBtn.length; i++) {
    likeBtn[i].addEventListener('click', async function () {
        var productId = this.dataset.product
        var action = this.dataset.action
        

        console.log('productId:', productId, 'action:', action)
        console.log(User);
        console.log(Userid);
    

        if (User === "AnonymousUser") {
            addCookieItemWishlist(productId)
           
        } 
        else {
            console.log(Userid)
             var response= await fetch(`${location.origin}/api/wishlist/?user=${UserId}`)
             var data= await response.json()
             if(data.length>0){
                var arr=data[0]["wishlist"]
                console.log(arr.length)
             }
             else{
                updateUserWishlist(productId, action)
             }
             
             
             var liked=1
            if(arr.length>0){
                
                for( i in arr){
                    console.log(arr[i]["product"]["id"],productId)
                    if(arr[i]["product"]["id"] === productId ){
                     liked = 2
                     break
                        
                    }}
                    console.log(liked)
                if(liked === 1){
                    updateUserWishlist(productId, action)
                }
                else{
                    alert("already liked")
                }
                }
             
            else{
                updateUserWishlist(productId, action)
            }
             
                
            document.cookie='cart='+ JSON.stringify({})+";domain=;path=/"
            console.log(document.cookie)
    }
             
            
        })
    }


async function updateUserWishlist(productId,action){
     
    let url = `${location.origin}/api/wishlistitems/`
    
    postdata={
        "product":productId,

    }
    let response= await fetch(url,{
        headers:{
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
            
        },
        method:"POST",
        body: JSON.stringify(postdata)


    })
    if(response.ok){
        console.log("add olundu")
    }
    

}
function addCookieItemWishlist(productID){
    
    
      
      if(wishlist[productID]== undefined){
         wishlist[productID]= productID
         console.log(1)
      }
      
    
    
    console.log("Cart:",cart)
    document.cookie='wishlist='+ JSON.stringify(wishlist)+";domain=;path=/"
  }

  // document.getElementById('range-picker').addEventListener('click', function(e) {
  //   var sizeList = document.getElementById('range-picker').children;
  //   for (var i = 0; i <= sizeList.length - 1; i++) {
  //     console.log(sizeList[i].classList);
  //     if (sizeList[i].classList.contains('active')) {
  //       sizeList[i].classList.remove('active');
  //     }
  //   }
  //   e.target.classList.add('active');
  // })
  
 

var popup=document.getElementsByClassName("modal-body")[0]
var updateBtn = document.getElementsByClassName('ti-shopping-cart')
console.log(updateBtn)
for(var i=0;i<updateBtn.length;i++){
    updateBtn[i].addEventListener("click",async (event)=>{
      
       var Productid=event.target.dataset.product
       var response= await fetch(`${location.origin}/api/products/${Productid}`)
       var data= await response.json()
       var color=``
       var size=``
       console.log(data["value"])
      for(j in data["value"]){
        if(data["value"][j]["property_id"]==2){
          color+=` <div data-value="${data["value"][j]["name"]}" class="color color-btn  mt-2 mb-4 ml-1" style="width: 40px;height: 40px;border-radius: 50%;background-color:${data["value"][j]["name"]};position:relative;"><i class="fa fa-check check d-none" style="margin-left:6px;margin-top:6px;margin-left: 6px;
          margin-top: 6px;
           top: 21%;
          position: absolute;
          left: 18%;"></i></div>`
        }
        
      }
      for(j in data["value"]){
        if(data["value"][j]["property_id"]==1){
          size+=`<div class="color bg-light size border-1 ml-1 mt-2 d-flex align-items-center justify-content-center" style="width: 40px;height: 40px;border-radius: 50%;border: 1px solid rgb(116, 113, 113);position:relative;">
          ${data["value"][j]["name"]}
          
        </div>`
        }
        
      }

       
       popup.innerHTML=`<div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 d-flex align-items-center justify-content-center bg-white" style=" position: absolute;top: -30px;height: 560px;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
       <img height="500" style="object-fit: cover; width: 80%;" src="${data["main_img"]}" alt="">
   </div>
   <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6" style="position: absolute; right: 0;top: 40px;">
         <h6 class="mb-2" style="font-weight: 600;">MEN T-SHIRT</h6>
         <h2 class="mb-3"  style="font-weight: 700;">${data["title"]}</h2>
         <p class="mt-3">
           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolore animi at facere 
         </p>
         <span class="fw-500">Color</span>
         <div style="" class=d-flex>
         ${color}
         </div>
   <span class="fw-500">Size</span>
        <div class=d-flex>
         ${size}
         </div>
         <button  data-product="${data["id"]}" data-action="add" data-quantity="1" class="btn btn-success mt-4 update-cart">
           Add to cart
         </button>
       `
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
$('.update-cart').on('click', function() {
  $.notify({
      icon: 'fa fa-check',
      title: 'Success!',
      message: 'Item Successfully added to your cart'
  }, {
      element: 'body',
      position: null,
      type: "success",
      allow_dismiss: true,
      newest_on_top: false,
      showProgressbar: true,
      placement: {
          from: "top",
          align: "right"
      },
      offset: 20,
      spacing: 10,
      z_index: 1031,
      delay: 5000,
      animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
      },
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
  });
});
       var updateBtn = document.getElementsByClassName('update-cart')
       for (var i = 0; i < updateBtn.length; i++) {
        updateBtn[i].addEventListener('click', function () {
            var productId = this.dataset.product
            var action = this.dataset.action
            var quantity=this.dataset.quantity
            var active2=document.getElementsByClassName("size");
            var active =document.getElementsByClassName("color-btn");
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
           console.log(color,size)
            console.log('productId:', productId, 'action:', action)
            console.log(User);
    
            if (User === "AnonymousUser") {
               var quantity=1
               addCookieItem(productId,action,quantity,color,size)
               
            } else {
                 
                updateUserOrder(productId, action, quantity,color,size)
               
                document.cookie='cart='+ JSON.stringify({})+";domain=;path=/"
                console.log(document.cookie)
            }
    
        })
    
    }

    })
}