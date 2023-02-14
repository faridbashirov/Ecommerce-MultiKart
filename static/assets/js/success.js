window.addEventListener("load", async (event) => {
    transaction= localStorage.getItem("transaction");
    order=localStorage.getItem("id");
   
    response = await fetch(`${location.origin}/api/orderbasket/${order}`)
    data= await response.json()
 
    // const orderDetail=document.getElementsByClassName('product-order')[0]
    const orderDetail=document.getElementById('leman')
    const total=document.getElementsByClassName('total-sec')[0]
    const orderdetail=document.getElementsByClassName('order-detail')[1]
    orderdetail.innerhtml=`
    Order ID: 5563853658932
    Order Date: October ${Date.now()}
    Order Total: ${data["get_total"]}
    `
    console.log(1)
    total.innerHTML=`
    <ul>
    <li>subtotal <span>$${data["get_total"]}</span></li>
    <li>shipping <span>$12.00</span></li>
    <li>tax(GST) <span>$10.00</span></li>
</ul>`


    const finaltotal=document.getElementsByClassName('final-total')[0]
    finaltotal.innerHTML=`
    <h3>total <span>$${data["get_total"]}</span></h3>`
    console.log(orderDetail)
    for(var i =0;i<data["basket"].length;i++){
        console.log(data["basket"][i]["product"])
        orderDetail.innerHTML+=`
        <div class="row product-order-detail">
                                <div class="col-3"><img src="${data["basket"][i]["product"]["main_img"]}" alt=""
                                        class="img-fluid blur-up lazyload"></div>
                                <div class="col-3 order_detail">
                                    <div>
                                        <h4>name</h4>
                                        <h5>${data["basket"][i]["product"]["title"]}</h5>
                                    </div>
                                </div>
                                <div class="col-3 order_detail">
                                    <div>
                                        <h4>quantity</h4>
                                        <h5>${data["basket"][i]["quantity"]}</h5>
                                    </div>
                                </div>
                                <div class="col-3 order_detail">
                                    <div>
                                        <h4>price</h4>
                                        <h5>$${data["basket"][i]["product"]["price"]}</h5>
                                    </div>
                                </div>
                            </div>
        `
    }
   
  });



