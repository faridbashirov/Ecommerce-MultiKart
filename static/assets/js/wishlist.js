const wishtable = document.getElementsByClassName("table")[0]

async function Callback(){
    var response = await fetch(`${location.origin}/api/wishlist/?user=${Userid}`)
    var data = await response.json()
    

    var arr = data[0]["wishlist"]
    
    wishtable.innerHTML=""
    wishtable.innerHTML+=`<thead>
    <tr class="table-head">
        <th scope="col">image</th>
        <th scope="col">product name</th>
        <th scope="col">price</th>
        <th scope="col">availability</th>
        <th scope="col">action</th>
    </tr>
</thead>`
    for (i in arr) {


        wishtable.innerHTML += `
        
        <tbody>
                                    <tr>
                                        <td>
                                            <a href="#"><img src="${arr[i]["product"]["main_img"]}" alt=""></a>
                                        </td>
                                        <td><a href="#">cotton shirt</a>
                                            <div class="mobile-cart-content row">
                                                <div class="col-xs-3">
                                                    <p>in stock</p>
                                                </div>
                                                <div class="col-xs-3">
                                                    <h2 class="td-color"></h2>
                                                </div>
                                                <div class="col-xs-3">
                                                    <h2 class="td-color"><a href="#" class="icon mr-1"><i class="ti-close"></i>
                                                        </a><a href="#" class="cart"><i class="ti-shopping-cart"></i></a></h2>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h2>$${arr[i]["product"]["price"]}</h2>
                                        </td>
                                        <td>
                                            <p>in stock</p>
                                        </td>
                                        <td><a   class="icon mr-3 delete" data-order=${arr[i]["id"]} ><i class="ti-close  " data-order=${arr[i]["id"]}  ></i> </a><a 
                                                class="cart"><i class="ti-shopping-cart"></i></a></td>
                                    </tr>
                                </tbody>`
                                

    }
    
}



async function Wishlist(){
    if (User == "AnonymousUser") {
        function getCookie(name) {

            var cookieArr = document.cookie.split(";");

            for (var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split("=");
                if (name == cookiePair[0].trim()) {
                    return decodeURIComponent(cookiePair[1])
                }
            }

            return null;
        }
        var wishlist = JSON.parse(getCookie("wishlist"))
        for (i in wishlist) {
            var response = await fetch(`${location.origin}/api/products/${i}`)
            var data = await response.json()
            wishtable.innerHTML += `
            <tbody>
                                        <tr>
                                            <td>
                                                <a href="#"><img src="${data["main_img"]}" alt=""></a>
                                            </td>
                                            <td><a href="#">${data["title"]}</a>
                                                <div class="mobile-cart-content row">
                                                    <div class="col-xs-3">
                                                        <p>in stock</p>
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <h2 class="td-color"></h2>
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <h2 class="td-color"><a href="#" class="icon mr-1"><i class="ti-close"></i>
                                                            </a><a href="#" class="cart"><i class="ti-shopping-cart"></i></a></h2>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h2>$${data["price"]}</h2>
                                            </td>
                                            <td>
                                                <p>in stock</p>
                                            </td>
                                            <td><a style="cursor:pointer;" class="icon mr-3 delete" data-order=${data["id"]}><i  class="ti-close"  data-order=${data["id"]}></i> </a><a href="#"
                                                    class="cart"><i class="ti-shopping-cart"></i></a></td>
                                        </tr>
                                    </tbody>`
        }
        var updateicon=document.getElementsByClassName("delete")
        for(var i=0;i<updateicon.length;i++){
              
            updateicon[i].addEventListener("click",async (event)=>{
              
               
            var  DeleteId=event.target.dataset.order
            console.log(DeleteId)
            delete wishlist[`${DeleteId}`]
             document.cookie='wishlist='+ JSON.stringify(wishlist)+";domain=;path=/"
             event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode.parentNode)
            
          
        
          })
        }
    } else {
        console.log(Userid)
        var response = await fetch(`${location.origin}/api/wishlist/?user=${Userid}`)
        var data = await response.json()
        

        var arr = data[0]["wishlist"]
        

        for (i in arr) {


            wishtable.innerHTML += `
            <tbody>
                                        <tr>
                                            <td>
                                                <a href="#"><img src="${arr[i]["product"]["main_img"]}" alt=""></a>
                                            </td>
                                            <td><a href="#">cotton shirt</a>
                                                <div class="mobile-cart-content row">
                                                    <div class="col-xs-3">
                                                        <p>in stock</p>
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <h2 class="td-color"></h2>
                                                    </div>
                                                    <div class="col-xs-3">
                                                        <h2 class="td-color"><a href="#" class="icon mr-1"><i class="ti-close"></i>
                                                            </a><a href="#" class="cart"><i class="ti-shopping-cart"></i></a></h2>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h2>$${arr[i]["product"]["price"]}</h2>
                                            </td>
                                            <td>
                                                <p>in stock</p>
                                            </td>
                                            <td><a style="cursor:pointer;"  class="icon mr-3 delete" data-order=${arr[i]["id"]} ><i class="ti-close  " data-order=${arr[i]["id"]}  ></i> </a><a 
                                                    class="cart"><i class="ti-shopping-cart"></i></a></td>
                                        </tr>
                                    </tbody>`
        }

        var updateicon=document.getElementsByClassName("delete")
for(var i=0;i<updateicon.length;i++){
      
    updateicon[i].addEventListener("click",async (event)=>{
      
       
    var  DeleteId=event.target.dataset.order
    fetch(`${location.origin}/api/wishlistitems/${DeleteId}`,{
      method:"Delete",
      headers:{
         "Content-Type": "application/json",
         "X-CSRFToken":csrftoken
          },
      
    })
    .then(async ()=>{
     event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode.parentNode)
        

    })
  

  })
}




    }

    
}
Wishlist()



