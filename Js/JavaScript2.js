


const BuyBtn=document.querySelector(".buy_Section")
const Basket =document.querySelector(".Basket_section")
var T_Price=0

const NumBasket=document.querySelector(".num")
const Payment_section =document.querySelector(".Payment_section")
let listOfProduct=localStorage.getItem("Products")?JSON.parse(localStorage.getItem("Products")):[]
Basket.addEventListener("click",(e)=>{
   e.stopPropagation() 
})
if(listOfProduct.length!==0){
    
    ShowItems(listOfProduct)
    ShowPayment(listOfProduct)
    console.log("not")
    NumBasket.style.display="block";
    NumBasket.textContent=listOfProduct.length
    
}else{ 
NumBasket.style.display="none";
NumBasket.textContent=""
}


BuyBtn.addEventListener("click",(e)=>{
    
   
    
    Basket.classList.toggle("Active")
})

const PriceBtn=document.querySelectorAll(".Price");
PriceBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        
        console.log("add:",listOfProduct)
        const {Id,key,imgSrc,Name,Price}=initialThings(e)
        Checking (Id,key,imgSrc,Name,Price)
        Basket.innerHTML="";
        ShowItems(listOfProduct)
        
        DeleteItems()
        NumBasket.style.display="block";
        NumBasket.textContent=listOfProduct.length
       
        
    })
})


function initialThings(e){
        let ParentElm=e.currentTarget.parentNode
        let Id=ParentElm.dataset.id
        let key=new Date().getTime()
        let imgSrc=ParentElm.querySelector(".Image_product img").src
        let Name=ParentElm.querySelector(".product_name h2").textContent
        let Price=ParentElm.querySelector(".Price span").textContent
        return {Id,key,imgSrc,Name,Price}
}
function Checking (Id,key,imgSrc,Name,Price){
   
    console.log("Checking",listOfProduct)
    const item =listOfProduct.find(elm=>elm.id===Id)
   
    if(item){
        item.Quantity++
        let CardItems=document.querySelectorAll(".Basket_item")
        CardItems.forEach(elms=>{
            if(elms.dataset.j===Id){
                elms.querySelector(".quintati_product").textContent=item.Quantity
            }
        })
        
        console.log("after item:",listOfProduct)
        listOfProduct.map(items=>items.id===item.id?item:null)
        localStorage.setItem("Products",JSON.stringify(listOfProduct))
        }else {
            let Data={key:key,id:Id,Name:Name,Price:Price,img:imgSrc,Quantity:1}
            listOfProduct.push(Data)
            localStorage.setItem("Products",JSON.stringify(listOfProduct))
        }
}
function BuilItems(id,img,name,price,quantity){
    return ` <div class="Basket_item" data-j=${id}>
    <img src=${img} class="image_basket"></img>
    <div class="text_basket">
        <p class="name_product">${name}</p>
        <span class="price_product"><span>${price}</span> تومان </span>
    </br>
        <span class="quintati_product"><span>${quantity}</span> عدد</span>
    </div>
    <button class="delete_basket">x</button>
</div>`
}
function TotalShowPrice () {
    const PriceNum=Basket.querySelectorAll(".Basket_item")
    let total=0
    PriceNum.forEach(elm=>{
    let price=parseInt(elm.querySelector(".price_product span").textContent)
    let quantity=parseInt(elm.querySelector(".quintati_product span").textContent)
    let TotalPrice=price*quantity
    
    total+=TotalPrice
    
    
})
if(total===0){
    Basket.querySelector(".Total").style.display="none"
}else {
    Basket.querySelector(".Total").style.display="block"
    Basket.querySelector(".Total_price").textContent=total.toString()
}

}


function ShowItems(list){
    list.forEach(elm=>{
       let Item= BuilItems(elm.id,elm.img,elm.Name,elm.Price,elm.Quantity)
       Basket.innerHTML+=Item
    })
    console.log()
    Basket.innerHTML+=` <div class="Total">
    <div class="Total_text">
    <h3 class="Total_price">0</h3><span>جمع کل</span></div>
    <a class="payment" href="Final_Payment.html">پرداخت نهایی</a>
</div>`
TotalShowPrice()
}


function DeleteItems(){
    const BasketDelete=Basket.querySelectorAll(".delete_basket")
    BasketDelete.forEach(btn=>{
        btn.addEventListener("click",(e)=>{
            e.currentTarget.parentNode.remove()
            let idElm=e.currentTarget.parentNode.dataset.j
            listOfProduct=listOfProduct.filter(elm=>elm.id!==idElm?elm:null)
            localStorage.setItem("Products",JSON.stringify(listOfProduct))
            console.log("deletSection",listOfProduct)
            NumBasket.textContent=listOfProduct.length
            TotalShowPrice()
            
        })
    })
}

DeleteItems()



function BuidPayment(id,img,name,price,quantity){
    return `<div class="Payment_item" data-ID=${id}>
    <div class="Payment_img">
        <img src=${img} alt="">
    </div>
    <div class="Payment_text">
        <h2 class="Payment_Name">${name}</h2>
    </div>
    <div class="Payment_Numbers"> 
      <input type="number" class="Payment_Input" value=${quantity} min="0">
   </div>
   <div class="Payment_Price">
        <h4>${price}</h4>
       <h2>${(parseInt(price)*parseInt(quantity)).toString()}</h2>
   </div>
   <div class="Payment_delete">
       <span>x</span>
   </div>
</div>`
}

function ShowPayment (list) {
    list.forEach(elm=>{
        let Item= BuidPayment(elm.id,elm.img,elm.Name,elm.Price,elm.Quantity)
        Payment_section.innerHTML+=Item
     })
     DeletePayment()
     QuantityPayment()
}


function DeletePayment(){
    let Delete=document.querySelectorAll(".Payment_delete")
     Delete.forEach(btn=>{
         btn.addEventListener("click",(e)=>{
              console.log(e.currentTarget.parentNode)
               e.currentTarget.parentNode.remove()
               let idElm=e.currentTarget.parentNode.dataset.id
               listOfProduct=listOfProduct.filter(elm=>elm.id!==idElm?elm:null)
               localStorage.setItem("Products",JSON.stringify(listOfProduct))
         })
     })
}

function QuantityPayment() {
    let Input=document.querySelectorAll(".Payment_Input")
    Input.forEach(elm=>{
        elm.addEventListener("input",(e)=>{
            console.log(e.currentTarget.value)
            console.log(e.currentTarget.closest(".Payment_item").dataset.id)
            let Value =e.currentTarget.value;
            let ID=e.currentTarget.closest(".Payment_item").dataset.id
            let item =listOfProduct.find(elm=>elm.id===ID)
            item.Quantity=Value;
            listOfProduct.map(items=>items.id===item.id?item:null)
            localStorage.setItem("Products",JSON.stringify(listOfProduct))
        })
    })
}