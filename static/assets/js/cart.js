const card=document.getElementsByClassName("cart-table")[0]
const cardTitle=document.getElementsByClassName("carttitle")[0].getElementsByTagName('tbody').length

              

async function shopping(){
    var shop= document.querySelector(".shopping-carts")
      var response=await  fetch(`${location.origin}/api/orderbasket/?user=${UserId}&complete=false`)
      shop.innerHTML=""
      var baskettotal=document.querySelector(".baskettotal")
      
      var data=await response.json()
      baskettotal.innerHTML=`$${data[0]["get_total"]}`
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
        var baskettotal=document.querySelector(".baskettotal")
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
window.addEventListener("load", async () => {
   

    
    if (User === "AnonymousUser"){
       
        var cartCookie = JSON.parse(getCookie("cart"))
        let carts = Object.entries(cartCookie);

        var totalend=document.getElementById("total")
        var full=0
        if (carts.length>0){
            for(i in carts){
                (carts[i][1]["quantity"])
                 var response = await fetch(`${location.origin}/api/products/${carts[i][0]}`)
                 var data = await response.json()
                 var total=parseInt(carts[i][1]["quantity"])*parseInt(data["price"])
    
                 
                 
                 
                 
                 if (data["get_discount"]== null){
                    var discountprice=data["price"]
                 }
                 else{
                    var discountprice=data["get_discount"]
                    total=parseInt(carts[i][1]["quantity"])*parseInt(data["get_discount"])
    
                 }
                 full+=total
    
                 
                 card.innerHTML+=`  <tbody>
                 <tr>
                     <td>
                         <a href="#"><img src="${data["main_img"]}" alt=""></a>
                     </td>
                     <td><a href="#">${data["title"]}</a>
                         <div class="mobile-cart-content row">
                             <div class="col-xs-3">
                                 <div class="qty-box">
                                     <div class="input-group">
                                         <input type="text" name="quantity" class="form-control input-number"
                                             value="1">
                                     </div>
                                 </div>
                             </div>
                             <div class="col-xs-3">
                                 <h2 class="td-color">$63.00</h2>
                             </div>
                             <div class="col-xs-3">
                                 <h2 class="td-color"><a href="#" class="icon"><i class="ti-close"></i></a>
                                 </h2>
                             </div>
                         </div>
                     </td>
                     <td class="price">
                     <h2 style="position: absolute;
                     margin-left: 64px;">$</h2>
                         <h2 id="${data["price"]}">${discountprice}</h2>
                         
                     </td>
                     <td>
                         <div class="qty-box">
                             <div class="input-group">
                                 
                                 <input type="text" name="quantity" class="form-control "
                                     value="${carts[i][1]["quantity"]}">
                                      <div style="height:50px"   class="arrows d-flex flex-column ml-2 justify-content-between">
                                        <i data-quantity=${carts[i][1]["quantity"]} data-action="add" data-product=${data["id"]} class="fa-solid fa-arrow-up update-cart"></i>
                                         <i data-quantity=${carts[i][1]["quantity"]}  data-action="remove" data-product=${data["id"]} class="fa-solid fa-arrow-down mt-2 update-cart"></i>
                                      </div>
                                     
                             </div>
                         </div>
                         
                         
                     </td>
                     <td>
                    <h5>${carts[i][1]["color"]} / ${carts[i][1]["size"]}</h5>
                        </td>
                     <td><a data-quantity=${carts[i][1]["quantity"]}  data-action="delete" data-product=${data["id"]}  href="" class="icon update-cart"><i class="ti-close"></i></a></td>
                     <td id="totalprice">
                         <h2  class="td-color">$${total}</h2>
                     </td>
    
                 </tr>
             </tbody>`
            }
            totalend.innerHTML=`$ ${full}`

        }
        else{
            var tfoot=document.querySelector("tfoot")
            tfoot.style.display="none"
            card.innerHTML=`<h2>You Don't have any products</h2>`
            var checkBtn=document.getElementsByClassName("checkout")[0]
            checkBtn.classList.add(".disabled")
        }
        
    
        const cardTitle=document.getElementsByClassName("carttitle")[0].getElementsByTagName('tbody').length
        
     
       
        var updateBtn = document.getElementsByClassName('update-cart')
        
        for (var i=0; i<updateBtn.length; i++){
            
            updateBtn[i].addEventListener('click', function(event){
              event.preventDefault()
              console.log(1)
              var productId = this.dataset.product
              var action = this.dataset.action
              var quantity=parseInt(event.target.parentNode.parentNode.firstElementChild.value)
            //   console.log(quantity)
              if (action == "add"){
                console.log(quantity)
                cartCookie[productId]["quantity"]+=1
                
                event.target.parentNode.parentNode.firstElementChild.value=parseInt(event.target.parentNode.parentNode.firstElementChild.value)+1
                
                var totalprice=parseInt(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".price").children[1].innerText)*(quantity+1)
                full+=parseInt(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".price").children[1].innerText)
                totalend.innerHTML=`$ ${full}`
                
                event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("#totalprice").children[0].innerHTML=`$${totalprice}`
                document.cookie='cart='+ JSON.stringify(cartCookie)+";domain=;path=/"
                AnonymousUserbasket()
                var shop= document.querySelector(".shopping-carts")
                shop.innerHTML= ""
                
                
              }
              else if(action=="remove"){
                cartCookie[productId]["quantity"]-=1
                var removedquantity=quantity-1
                if(removedquantity<=0){
                    delete cartCookie[productId]
                    var drop=event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                    event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(drop)
                    
                   
                }
                event.target.parentNode.parentNode.firstElementChild.value=parseInt(event.target.parentNode.parentNode.firstElementChild.value)-1
                var totalprice=parseInt(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".price").children[1].innerText)*(quantity-1)
                full-=parseInt(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".price").children[1].innerText)
                totalend.innerHTML=`$ ${full}`
                event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("#totalprice").children[0].innerHTML=`$${totalprice}`
                document.cookie='cart='+ JSON.stringify(cartCookie)+";domain=;path=/"
                AnonymousUserbasket()
                const cardTitle=document.getElementsByClassName("carttitle")[0].getElementsByTagName('tbody').length
                var shop= document.querySelector(".shopping-carts")
                
                if(cardTitle<=0){
                    card.innerHTML=`<h2>You Don't have any products</h2>`
                    shop.innerHTML="<h3>Your Basket is Empty</h3>"
                    var baskettotal=document.querySelector(".baskettotal")
                    baskettotal.innerHTML='$0'
                    tfoot.style.display="none"

                }
              }
              
              else if(action =="delete"){
               
                delete  cartCookie[productId]
                var drop=event.target.parentNode.parentNode.parentNode.parentNode
                console.log(drop)
                event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(drop)
                var a= event.target.parentNode.parentNode.parentNode.querySelector("#totalprice").children[0].innerText
                var b=""
                 for(i=0;i<a.length;i++) {
                    if (i!=0){
                        b+=a[i]
                    }
                 }
                
                
                full-=parseInt(b)
                totalend.innerHTML=`$ ${full}`
                document.cookie='cart='+ JSON.stringify(cartCookie)+";domain=;path=/"
                AnonymousUserbasket()
                const cardTitle=document.getElementsByClassName("carttitle")[0].getElementsByTagName('tbody').length
                var shop= document.querySelector(".shopping-carts")
                var tfoot=document.querySelector("tfoot")
                tfoot.style.display="none"
                if(cardTitle<=0){
                    card.innerHTML=`<h2>You Don't have any products</h2>`
                    shop.innerHTML="<h3>Your Basket is Empty</h3>"
                    var baskettotal=document.querySelector(".baskettotal")
                    baskettotal.innerHTML='$0'
                    tfoot.style.display="none"

                }
                
              }
              document.cookie='cart='+ JSON.stringify(cartCookie)+";domain=;path=/"

             
           })
        }
        
    }

    else{
        var response= await fetch(`${location.origin}/api/orderbasket/?user=${UserId}&complete=false`)
   
    var  data= await response.json()
    console.log(data[0]["basket"].length)
    if (data[0]["basket"].length==0){
        card.innerHTML=`<h2>You Don't have any products</h2>`
        var tfoot=document.querySelector("tfoot")
        tfoot.style.display="none"
        
       
    }
    else{
        total=document.getElementById("total")
    
    total.innerHTML=`$ ${data[0]["get_total"]}`
    for(var i=0;i<data[0]["basket"].length;i++){
        (data[0]["basket"][0]["id"])
        var totalprice=parseInt(data[0]["basket"][i]["product"]["price"]) * parseInt(data[0]["basket"][i]["quantity"])
        

        card.innerHTML+=`  <tbody>
        <tr>
            <td>
                <a href="#"><img src="${data[0]["basket"][i]["product"]["main_img"]}" alt=""></a>
            </td>
            <td><a href="#">${data[0]["basket"][i]["product"]["title"]}</a>
                <div class="mobile-cart-content row">
                    <div class="col-xs-3">
                        <div class="qty-box">
                            <div class="input-group">
                                <input type="text" name="quantity" class="form-control input-number"
                                    value="1">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <h2 class="td-color">$63.00</h2>
                    </div>
                    <div class="col-xs-3">
                        <h2 class="td-color"><a href="#" class="icon"><i class="ti-close"></i></a>
                        </h2>
                    </div>
                </div>
            </td>
            <td class="price">
               <h2 style="position: absolute;
               margin-left: 64px;">$</h2>
                <h2> ${data[0]["basket"][i]["product"]["price"]}</h2>
                
            </td>
            <td>
                <div class="qty-box">
                    <div class="input-group">
                        
                        <input type="text" name="quantity" class="form-control "
                            value="${data[0]["basket"][i]["quantity"]}">
                             <div style="height:50px"   class="arrows d-flex flex-column ml-2 justify-content-between">
                               <i data-quantity=${data[0]["basket"][i]["quantity"]} data-order=${data[0]["basket"][i]["id"]} data-action="add" data-product=${data[0]["basket"][i]["product"]["id"]} class="fa-solid fa-arrow-up update-cart"></i>
                                <i data-quantity=${data[0]["basket"][i]["quantity"]} data-order=${data[0]["basket"][i]["id"]} data-action="remove" data-product=${data[0]["basket"][i]["product"]["id"]} class="fa-solid fa-arrow-down mt-2 update-cart"></i>
                             </div>
                            
                    </div>
                </div>
            </td>
            <td>
                <h5>${data[0]["basket"][i]["color"]} / ${data[0]["basket"][i]["size"]}</h5>
                    </td>
            <td><a data-quantity=${data[0]["basket"][i]["quantity"]} data-order=${data[0]["basket"][i]["id"]} data-action="delete" data-product=${data[0]["basket"][i]["product"]["id"]}  href="" class="icon update-cart"><i class="ti-close"></i></a></td>
            <td id="totalprice" >
                <h2  class="td-color">$${totalprice}</h2>
            </td>
        </tr>
    </tbody>`
    }
    const cardTitle=document.getElementsByClassName("carttitle")[0].getElementsByTagName('tbody').length
    
    var updateBtn = document.getElementsByClassName('update-cart')
    for (var i=0; i<updateBtn.length; i++){
        
        updateBtn[i].addEventListener('click', async function(event){
          event.preventDefault()
          
          var productId = this.dataset.product
          var action = this.dataset.action
          var quantity=parseInt(event.target.parentNode.parentNode.firstElementChild.value)
          var orderId=this.dataset.order
          var url=`${location.origin}/api/orderitems/${orderId}`
          if ((action=="add") && (quantity!=0)) {
             var quantity= quantity + 1
             event.target.parentNode.parentNode.firstElementChild.value=parseInt(event.target.parentNode.parentNode.firstElementChild.value)+1
             
              fetch(url,{
                    method:"PATCH",
                    headers:{
                     "Content-Type": "application/json",
                     "X-CSRFToken":csrftoken
                
                   },
                   body:JSON.stringify({"quantity":quantity})
                
               })
                  .then((response)=>{
                     return response.json()
                  })
                 .then( async (data)=>{
                     ("data",data);
                     var response= await fetch(`${location.origin}/api/orderbasket/?user=${UserId}&complete=false`)
                     var  updatedata= await response.json()
                     console.log(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".price").children[1].innerText)
                     var x=parseInt(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".price").children[1].innerText)*quantity
                     event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("#totalprice").children[0].innerHTML=`$${x}`
                     total=document.getElementById("total")
                     
                     total.innerHTML=`$${updatedata[0]["get_total"]}`
                     shopping()
                    
                 })
          }
          else if((action=="remove") && (quantity!=0)){
            quantity-=1
            event.target.parentNode.parentNode.firstElementChild.value=parseInt(event.target.parentNode.parentNode.firstElementChild.value)-1
            if(quantity==0){
                fetch(url,{
                    method:"DELETE",
                    headers:{
                          "Content_Type": "application/json",
                          "X-CSRFToken":csrftoken
                 
                    },
                    body:JSON.stringify({"quantity":quantity})
                 
                })
                .then( async (data)=>{
                     var response= await fetch(`${location.origin}/api/orderbasket/?user=${UserId}&complete=false`)
                     var  updatedata= await response.json()
                    
                     total.innerHTML=`$ ${updatedata[0]["get_total"]}`
                     shopping()
                })
                event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)
                const cardTitle=document.getElementsByClassName("carttitle")[0].getElementsByTagName('tbody').length
                var shop= document.querySelector(".shopping-carts")
                var tfoot=document.querySelector("tfoot")
                if(cardTitle<=0){
                    card.innerHTML=`<h2>You Don't have any products</h2>`
                    
                    tfoot.style.display="none"
                    shop.innerHTML="<h3>Your Basket is Empty</h3>"

                }

            }
            else{
                fetch(url,{
                    method:"PATCH",
                     headers:{
                    "Content-Type": "application/json",
                    "X-CSRFToken":csrftoken
                 
                    },
                    body:JSON.stringify({"quantity":quantity})
                 
                })
                   .then((response)=>{
                      return response.json()
                   })
                  .then( async (data)=>{
                      
                      var response= await fetch(`${location.origin}/api/orderbasket/?user=${UserId}&complete=false`)
                      var  updatedata= await response.json()
                      var x=parseInt(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".price").children[1].innerText)*quantity
                      event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("#totalprice").children[0].innerHTML=`$${x}`
                      total.innerHTML=`$ ${updatedata[0]["get_total"]}`
                      shopping()
                     
                  })
             }
            }
          else if (action=="delete"){
            fetch(url,{
                method:"DELETE",
                headers:{
                      "Content_Type": "application/json",
                      "X-CSRFToken":csrftoken
             
                },
                body:JSON.stringify({"quantity":quantity})
             
            })
            .then( async (data)=>{
                 var response= await fetch(`${location.origin}/api/orderbasket/?user=${UserId}&complete=false`)
                 var  updatedata= await response.json()
                 total.innerHTML=`$ ${updatedata[0]["get_total"]}`
                 shopping()
            })
            event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode.parentNode)
            const cardTitle=document.getElementsByClassName("carttitle")[0].getElementsByTagName('tbody').length
            var shop= document.querySelector(".shopping-carts")
            var tfoot=document.querySelector("tfoot")
            
                if(cardTitle<=0){
                    card.innerHTML=`<h2>You Don't have any products</h2>`
                    shop.innerHTML="<h3>Your Basket is Empty</h3>"
                    tfoot.style.display="none"
                    
                    
                }

          }
            

        })}

    }
    

    }
    
    
    
})

