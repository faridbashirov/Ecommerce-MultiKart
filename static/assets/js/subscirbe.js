if (User==="AnonymousUser"){
     var u=1
  }
  else{
      document.cookie='cart='+ JSON.stringify({})+";domain=;path=/"
      console.log(1)
  }


const form= document.getElementById("mc-embedded-subscribe-form")
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
console.log(location.pathname.startsWith("/az"))
const csrftoken = getToken('csrftoken');
form.addEventListener("submit",(event)=>{
    event.preventDefault()
    var data=form.email.value
    
    console.log( form.email.value)
    if(location.pathname.startsWith("/en")){
        url="/en/subscribe/"
    }
    else{
        url="/az/subscribe/"
    }
      
    
    fetch(url, {
        method: "POST",
        headers: {
            "Content_Type": "application/json",
            "X-CSRFToken": csrftoken

        },
        body: JSON.stringify({
            "email":data
        })

    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log("data", data);

    })
   
})