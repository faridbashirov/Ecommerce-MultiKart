
const checkBox=document.querySelectorAll(('.c'))
var categoryFilter=(document.getElementsByClassName("colors"))
var apifilter=[]
var price=document.getElementsByClassName("range-slider__input")
for(var i=0;i<price.length;i++){
price[i].addEventListener("change",()=>{
    varminmaxprice=document.getElementsByClassName("range-slider__display")[0]
    var low=(varminmaxprice.dataset.low)
    var max=(varminmaxprice.dataset.high)
    var range=`price__gt=${low}&price__lt=${max}`+"&"
    apifilter.push(range)
    Product(apifilter)
    
})
}


for(var i=0;i<checkBox.length;i++){
    
    console.log(checkBox[i])
    checkBox[i].addEventListener("change",(event)=>{
        
        if (event.currentTarget.checked) {
           
            if(  event.currentTarget.classList.contains("brand")){
                a= "vendor="+event.currentTarget.dataset.id+"&"
                apifilter.push(a)
            }
            else{
                a="value="+event.currentTarget.dataset.id+"&"
                apifilter.push(a)
            }
            
          } 
        else {
           
            if(  event.currentTarget.classList.contains("brand")){
                a= "vendor="+event.currentTarget.dataset.id+"&"
                let  index=apifilter.indexOf(a)
                
                apifilter.splice(index,1)
                console.log(apifilter);

            }
            else{
                a="value="+event.currentTarget.dataset.id+"&"
                let  index=apifilter.indexOf(a)
                
                apifilter.splice(index,1)
            }

          }
          
          
          
              varminmaxprice=document.getElementsByClassName("range-slider__display")[0]
              var low=(varminmaxprice.dataset.low)
              var max=(varminmaxprice.dataset.high)
              var range=`price__gt=${low}&price__lt=${max}`+"&"
              apifilter.push(range)
    

             Product(apifilter)
    
   
    })
}
var categoryFilter=(document.getElementsByClassName("filter"))

async function Product(apifilter) {

var pathname= location.pathname.split("/")
console.log(pathname)
let url = `${location.origin}/api/products/?`
if( pathname.includes("men-s-fashion")){
    
    url+='category_name=men-s-fashion'+"&"
}
else if( pathname.includes("women-s-fashion")){
    url+='category_name=women-s-fashion'+"&"
}
  
   for(var i=0;i<apifilter.length;i++){
        url+=apifilter[i]
    }
var apifilter=[]

var response= await fetch(url)
if (response.ok){
var data=  await response.json()

document.getElementById("productlist").innerHTML=''

for (let i in data){
   
   if(data[i]["star"] < 1){
   var star=`<i class="fa fa-star-o empty"></i> <i class="fa fa-star-o empty"></i> <i class="fa fa-star-o empty"></i> <i class="fa fa-star-o empty"></i><i class="fa fa-star-o empty"></i></div>`
   }
   else if(data[i]["star"] < 2){
   var star= `<i class="fa fa-star"></i> <i class="fa fa-star-o empty"></i> <i class="fa fa-star-o empty"></i> <i class="fa fa-star-o empty"></i><i class="fa fa-star-o empty"></i></div>`
   }
   else if(data[i]["star"] < 3){
   var star= `<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-o empty"></i> <i class="fa fa-star-o empty"></i><i class="fa fa-star-o empty"></i></div>`
   }
   else if(data[i]["star"] < 4){
   var star= `<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-o empty"></i><i class="fa fa-star-o empty"></i></div>`
   }
   else if(data[i]["star"] < 5){
   var star= `<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i><i class="fa fa-star-o empty"></i></div>`
   }
   else{
   var star= `<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i><i class="fa fa-star"></i></div>`
   }

   var color=``
   for(j in data[i]["value"]){
      if( data[i]["value"][j]["property_id"]==2){
        
        color+=`<li style="background-color:${data[i]["value"][j]["name"]}" class="bg-light0"></li>`

      }
    
    
   }
   
   
   
document.getElementById("productlist").innerHTML+=`
<div  class="col-xl-3 col-6 col-grid-box">
    <div class="product-box">
        <div class="img-wrapper">
            <div class="front">
                <a href="${location.origin}/${data[i]["get_absolute_url"]}"><img src="${data[i]["main_img"]}" class="img-fluid blur-up lazyload bg-img" alt=""></a>
            </div>
            <div class="back">
                
                <a href="${location.origin}/${data[i]["get_absolute_url"]}"><img src="${data[i]["img"][0]["image"]}" class="img-fluid blur-up lazyload bg-img" alt=""></a>
                
            </div>
            <div class="cart-info cart-wrap">
                <button class="" data-product=${data[i]["id"]} data-action="add" data-quantity="1" data-toggle="modal" data-target="#addtocart" title="Add to cart"><i
                        class="ti-shopping-cart" data-product=${data[i]["id"]} data-bs-toggle="modal" data-bs-target="#cartModal"></i></button> <a class="like" data-product="${data[i]["id"]}" data-action="add" href="javascript:void(0)" title="Add to Wishlist"><i
                        class="ti-heart" aria-hidden="true"></i></a> <a href="#" data-toggle="modal" data-target="#quick-view" title="Quick View"><i
                        class="ti-search" aria-hidden="true"></i></a> <a href="compare.html" title="Compare"><i
                        class="ti-reload" aria-hidden="true"></i></a>
            </div>
        </div>
        <div class="product-detail">
            <div>
                <div class="rating">
                ${star}</div>
                <a href="${location.origin}/product_page/${data[i]["get_absolute_url"]}">
                    <h6>${data[i]["title"]}</h6>
                </a>
                <p>{{prod.desc}}
                </p>
                <h4>$${data[i]["price"]}</h4>
                <ul class="color-variant">
                    
                   ${color}
                    
                </ul>
            </div>
        </div>
    </div>
</div>
`
$('.product-box a .ti-heart , .product-box a .fa-heart').on('click', function() {

    $.notify({
        icon: 'fa fa-check',
        title: 'Success!',
        message: 'Item Successfully added in wishlist'
    }, {
        element: 'body',
        position: null,
        type: "info",
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
}

var popup=document.getElementsByClassName("modal-body")[0]
var updateBtn = document.getElementsByClassName('ti-shopping-cart')
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
var updateBtn = document.getElementsByClassName('update-cart')
 async function shopping(){
 var shop= document.querySelector(".shopping-carts")
 var baskettotal=document.querySelector(".baskettotal")
 console.log(baskettotal)
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
            if (active[i].classList.contains("actives")){
                color=active[i].dataset.value
            }

        }
           for(i=0;i<active2.length;i++){
            if (active2[i].classList.contains("active")){
                size=active2[i].innerText
            }

        }
        console.log('productId:', productId, 'action:', action)
        console.log(User);

        if (User === "AnonymousUser") {
           var quantity=1
           addCookieItem(productId,action,quantity,color,size)
        } else {
             
            updateUserOrder(productId, action, quantity,color,size)
            shopping()
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
  
  if(action == "add"){
    console.log(cart[productID])
    if(cart[productID] == undefined){
       cart[productID]= {"quantity":parseInt(quantity),"color":color,"size":size}
       console.log(1)
    }
    else{
        cart[productID]["quantity"]+=1
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
                "size":size
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

        if (User === "AnonymousUser") {
            addCookieItemWishlist(productId)
           
        } 
        else {
             var response= await fetch(`${location.origin}/api/wishlist/?user=${Userid}`)
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

}

}


   




// if (colorid) {
// url += `?value=${colorid}`;
// console.log(url)

// }
// var response= await fetch(url)
// if (response.ok){
// var data=  await response.json()

// document.getElementById("productlist").innerHTML=''

// for (let i in data){
   
// document.getElementById("productlist").innerHTML+=`
// <div class="col-xl-3 col-6 col-grid-box">
//     <div class="product-box">
//         <div class="img-wrapper">
//             <div class="front">
//                 <a href="${location.origin}/product_page/${data[i]["id"]}"><img src="${data[i]["main_img"]}" class="img-fluid blur-up lazyload bg-img" alt=""></a>
//             </div>
//             <div class="back">
                
//                 <a href=""><img src="${data[i]["img"][0]["image"]}" class="img-fluid blur-up lazyload bg-img" alt=""></a>
                
//             </div>
//             <div class="cart-info cart-wrap">
//                 <button data-toggle="modal" data-target="#addtocart" title="Add to cart"><i
//                         class="ti-shopping-cart"></i></button> <a href="javascript:void(0)" title="Add to Wishlist"><i
//                         class="ti-heart" aria-hidden="true"></i></a> <a href="#" data-toggle="modal" data-target="#quick-view" title="Quick View"><i
//                         class="ti-search" aria-hidden="true"></i></a> <a href="compare.html" title="Compare"><i
//                         class="ti-reload" aria-hidden="true"></i></a>
//             </div>
//         </div>
//         <div class="product-detail">
//             <div>
//                 <div class="rating"><i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i></div>
//                 <a href="">
//                     <h6>${data[i]["title"]}</h6>
//                 </a>
//                 <p>{{prod.desc}}
//                 </p>
//                 <h4>${data[i]["price"]}</h4>
//                 <ul class="color-variant">
                    
                   
                    
//                 </ul>
//             </div>
//         </div>
//     </div>
// </div>
// `
// }
// }

// }

// // // for (let i = 0; i < categoryFilter.length; i++) {
// // // categoryFilter[i].addEventListener("click",()=>{
// // // // const colorid= categoryFilter[i].dataset.id;
// // // // Product(colorid);
// // // checkBox.forEach(element  => {
    
// // //     if (element.classList.contains("active")){
// // //         if(element.classList.contains("brand")){
// // //            var id=element.dataset.id
// // //             apifilter+=`?vendor=${id}`
            
// // //         }
// // //         else{
// // //            var color=element.dataset.id
// // //             apifilter+=`?value=${color}`
// // //         }
// // //     }
   
// // // });
// // // console.log( typeof apifilter)


// // // })

// // // }







