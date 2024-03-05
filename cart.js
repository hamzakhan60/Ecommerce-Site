const cartBucket = document.querySelector('.cartBucket');
cartBucket.addEventListener('click', function () {

    window.location.href = "cart.html";

});
const cartTotal = document.querySelector('.cartTotal');
cartTotal.addEventListener('click', function () {
    window.location.href = "cart.html";
});
window.addEventListener('load',function(){
    var localCart = localStorage.getItem('cartTotal');
    var localQuantity = localStorage.getItem('cartQuantity');
    var cartQuantity = document.querySelector('.cartQuantity');
    var cartTotal = document.querySelector('.cartTotal');
    if (localCart != null && localQuantity != null) {
        cartTotal.textContent = localCart;
        cartQuantity.value = localQuantity;
    }
});
var localCartBox = localStorage.getItem('cartBoxArray');
var tempDiv = document.createElement('div');
tempDiv.innerHTML = localCartBox;
var cartBoxArray = Array.from(tempDiv.querySelectorAll('.cartBoxProductsChild'));
const template=document.querySelector('.productTr');
var cartArray=[];
if(cartBoxArray.length==0)
{
    const noProduct=document.querySelector('.noProduct').style.display="flex";
    document.querySelector('.tableDiv').style.display="none";
    document.querySelector('.table2Div').style.display="none";
    document.querySelector('.noProduct .button').addEventListener('click',function(){
        window.location.href="everything.html";
    })
}
else if(cartBoxArray.length>0)
{
    
    if(cartArray!=null){
        cartBoxArray.forEach(element => {
            var flag=false;
            const e1=element.querySelector('.productNameInCartBoxChild p').textContent;
            cartArray.forEach(element2=>{
                const e2=element2.querySelector('.productName').textContent;
                if(e1==e2)
                {
                    const price=element2.querySelector('.price').textContent.split("$");
                   const qnty2=element2.querySelector('.quantity input');
                   const qnty1=element.querySelector('.catBoxProductQuantity');
                   qnty2.value=parseInt(qnty1.textContent)+parseInt(qnty2.value);
                   const calculation=parseInt(price[1])*parseInt(qnty2.value);
                   const subTotal=element2.querySelector('.subTotalInCart');
                   subTotal.textContent=`$${calculation}.00`;
                   flag=true;

                }
            });
            if(flag==false){
                const clone =template.cloneNode(true);
                clone.querySelector('.productName').textContent=e1;
                clone.querySelector('.imageDiv img').src=element.querySelector('.productImageDiv img').src;
              const price=  clone.querySelector('.price').textContent=element.querySelector('.catBoxProductTotal').textContent;
               const qnty2= clone.querySelector('.quantity input').value=element.querySelector('.catBoxProductQuantity').textContent;
               const priceText=price.split("$");
               console.log(priceText[1]);
               const calculation=parseInt(priceText[1])*parseInt(qnty2);
               const subTotal=clone.querySelector('.subTotalInCart');
               subTotal.textContent=`$${calculation}.00`;
               cartArray.push(clone);
               console.log("hi");

                
            }
    
    });
    cartArray.forEach(p=>{
        const closeBtn=p.querySelector('.fa-xmark');
        closeBtn.addEventListener('click',function(){
            const name=p.querySelector('.productName').textContent;
            const subTotal=p.querySelector('.subTotalInCart').textContent.split("$");
            const qnty=p.querySelector('.quantity input').value;
            cartArray=cartArray.filter(del=>del!=p);
            cartBoxArray.forEach(c=>{
                const name1=c.querySelector('.productNameInCartBoxChild p').textContent;
                if(name==name1)
                {
                    cartBoxArray = cartBoxArray.filter(item => item !== c);
                    console.log(cartBoxArray);
                    var localCart = localStorage.getItem('cartTotal').split("$");
                    var localQuantity = localStorage.getItem('cartQuantity');
                    var cartTotal=`$${parseInt(localCart[1])-parseInt(subTotal[1])}.00`;
                    var cartQuantity=localQuantity-qnty;
                    tempDiv.innerHTML="";
                    cartBoxArray.forEach(product=>{
                        tempDiv.appendChild(product);
                    })
                    localStorage.setItem('cartBoxArray',tempDiv.innerHTML);
                    localStorage.setItem('cartTotal',cartTotal);
                    localStorage.setItem('cartQuantity',cartQuantity);
                    document.querySelector('.subTotal1').textContent= localStorage.getItem('cartTotal');
                    document.querySelector('.total1').textContent= localStorage.getItem('cartTotal');
                    document.querySelector('.cartQuantity').value=cartQuantity;
                    document.querySelector('.cartTotal').textContent=cartTotal;
                    const tbody=document.querySelector(".tbody");
                    tbody.innerHTML="";
                    cartArray.forEach(e=>{
                        tbody.appendChild(e);
                    })
                }
            })
        })
    })

}
document.querySelector('.subTotal1').textContent= localStorage.getItem('cartTotal');
document.querySelector('.total1').textContent= localStorage.getItem('cartTotal')
const tbody=document.querySelector(".tbody");
tbody.innerHTML="";
cartArray.forEach(e=>{
    tbody.appendChild(e);
})
}




const menuBars=document.querySelector('.fa-bars');
menuBars.addEventListener('click',function(){
    const menu=document.querySelector('.menu');
    menu.style.display="flex";
    document.querySelector('.cartBucket').style.display = 'none';
    document.querySelector('body').style.overflowY='hidden';
    
})
const cross=document.querySelector('.head1 .fa-xmark ');
cross.addEventListener('click',function(){
    document.querySelector('.menu').style.display="none";
    document.querySelector('.cartBucket').style.display = 'block';
    document.querySelector('body').style.overflowY='scroll';
})