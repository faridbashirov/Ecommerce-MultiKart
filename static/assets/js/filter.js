var categoryFilter=(document.getElementsByClassName("colors"))

async function Product(colorid) {

 let url = `${location.origin}/api/products/`;
 if (colorid) {
     url += `?value=${colorid}`;
     console.log(url)
     
 }
 var response= await fetch(url)
 if (response.ok){
     var data=  await response.json()
     for (let i in data){
         document.getElementById("productlist").innerHTML=`
         <div class="col-xl-3 col-6 col-grid-box">
             <div class="product-box">
                 <div class="img-wrapper">
                     <div class="front">
                         <a href="{% url 'product_page' prod.id %}"><img src="/${i["main_image"]}" class="img-fluid blur-up lazyload bg-img" alt=""></a>
                     </div>
                     <div class="back">
                         {
                         <a href="{% url 'product_page' prod.id %}"><img src="" class="img-fluid blur-up lazyload bg-img" alt=""></a>
                         
                     </div>
                     <div class="cart-info cart-wrap">
                         <button data-toggle="modal" data-target="#addtocart" title="Add to cart"><i
                                 class="ti-shopping-cart"></i></button> <a href="javascript:void(0)" title="Add to Wishlist"><i
                                 class="ti-heart" aria-hidden="true"></i></a> <a href="#" data-toggle="modal" data-target="#quick-view" title="Quick View"><i
                                 class="ti-search" aria-hidden="true"></i></a> <a href="compare.html" title="Compare"><i
                                 class="ti-reload" aria-hidden="true"></i></a>
                     </div>
                 </div>
                 <div class="product-detail">
                     <div>
                         <div class="rating"><i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i></div>
                         <a href="{% url 'product_page' prod.id %}">
                             <h6>${i["title"]}</h6>
                         </a>
                         <p>{{prod.desc}}
                         </p>
                         <h4>${i["price"]}</h4>
                         <ul class="color-variant">
                             
                             <li style="background-color:{{colors.title}}" class="bg-light0"></li>
                             
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
         `
 }
 }

}

for (let i = 0; i < categoryFilter.length; i++) {
categoryFilter[i].addEventListener("click",()=>{
 const colorid= categoryFilter[i].dataset.id;
   Product(colorid);
})

}
