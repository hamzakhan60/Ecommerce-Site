const button=document.querySelectorAll('.button');
button.forEach(e=>{
    e.addEventListener('click',function(){
        window.location.href="index.html";
    })
})


var cartTotal=document.querySelector('.cartTotal');
var cartQuantity=document.querySelector('.cartQuantity');
var cartBoxParent=document.querySelector('.cartBoxProducts');
var cartBoxArray=[];
window.addEventListener('load', function () {
    var localCart = localStorage.getItem('cartTotal');
    var localQuantity = localStorage.getItem('cartQuantity');
    var localCartBox = localStorage.getItem('cartBoxArray');
    var tempDiv=document.createElement('div');
    tempDiv.innerHTML=localCartBox;
    cartBoxArray1 = Array.from(tempDiv.querySelectorAll('.cartBoxProductsChild'));
    cartBoxArray=cartBoxArray1;
    
    console.log(cartBoxArray);

    if (localCart != null && localQuantity != null) {
        cartTotal.textContent = localCart;
        cartQuantity.value = localQuantity;
        if(cartBoxArray.length!=0){
            document.querySelector('.cartBoxChild2').style.display = 'block';
            document.querySelector('.continueShoopintButton').style.display = 'none';
            document.querySelector('.noPrdouctInCart').style.display = 'none';
            cartBoxParent.innerHTML = " ";
            cartBoxArray.forEach(p=>{
                cartBoxParent.appendChild(p);
            })
            cartBoxParent.style.display = 'flex';
            const subTotal = document.querySelector('.subTotal');
            subTotal.textContent = localCart;
            if(cartBoxArray.length>3)
            {
                document.querySelector('.cartBoxChild1').style.overflowY='scroll'
            }
   
 
        
            for(let p of cartBoxArray){
        const close = p.querySelector('div .fa-xmark');
        
        close.addEventListener('click', function () {
            
            
            if(cartBoxArray.includes(p)){
                var qnty=p.querySelector(".catBoxProductQuantity").textContent;
                console.log(`qnty${qnty}`);
                var rate=p.querySelector('.catBoxProductTotal').textContent.split("$");
                const totalRate=parseInt(qnty)*parseInt(rate[1]);
                console.log(`totalRate${totalRate}`);
                const tempTotal=subTotal.textContent.split("$");
                const update=(parseInt(tempTotal[1]))-totalRate;
                console.log(`update${update}`);
                console.log(cartBoxArray.length);
                subTotal.textContent=`$${update}.00`;
                cartTotal.textContent=subTotal.textContent;
                cartQuantity.value=cartQuantity.value-qnty;
                   
            }
            cartBoxArray = cartBoxArray.filter(item => item !== p);
            console.log(`after ${cartBoxArray.length}`);
            if (cartBoxArray.length == 0) {
                document.querySelector('.cartBoxChild2').style.display = 'none';
                document.querySelector('.continueShoopintButton').style.display = 'block';
                document.querySelector('.noPrdouctInCart').style.display = 'block';
                cartBoxParent.style.display = 'none';
                cartBoxParent.innerHTML = "";
            }
            else{
                cartBoxParent.innerHTML = "";
                cartBoxArray.forEach(p => {
                cartBoxParent.appendChild(p);

                    })
                }
                localStorage.setItem('cartBoxArray', cartBoxParent.innerHTML);
                localStorage.setItem('cartQuantity', cartQuantity.value);
                localStorage.setItem('cartTotal', cartTotal.textContent);
                
           
            
            })
           
           
            
    }
            
        }
        else
        {
            document.querySelector('.cartBoxChild2').style.display = 'none';
            document.querySelector('.continueShoopintButton').style.display = 'block';
            document.querySelector('.noPrdouctInCart').style.display = 'block';
            cartBoxParent.style.display = 'none';
        }




    }
    else {
        cartTotal.textContent = '$0.00';
        cartQuantity.value = 0;
    }
});

    








var cartBox=document.querySelector('.cartBox');
var cartBucket=document.querySelector('.cartBucket');
cartTotal.addEventListener('click',function(){
    cartBox.style.display='flex';
    cartBucket.style.display='none';
    document.querySelector('.cartBox').style.position='fixed';
})
cartBucket.addEventListener('click',function(){
    cartBox.style.display='flex';
    cartBucket.style.display='none';
    document.querySelector('.cartBox').style.position='fixed';
})

const closeCartBox=document.querySelector('.cartBoxChild1 .fa-xmark');
closeCartBox.addEventListener('click',function(){
    cartBox.style.display='none';
    cartBucket.style.display='block';
    document.querySelector('.cartBox').style.position='relative';
});
cartTotal.addEventListener('dblclick',function(){
    cartPage();
})
cartBucket.addEventListener('dblclick',function(){
    window.location.href="cart.html";
})

function cartPage(){
    window.location.href="cart.html";
}




const menu=document.querySelector('.fa-bars');
menu.addEventListener('click',function(){
    document.querySelector('.menu').style.display="flex";
    cartBucket.style.display='none';
   
    document.querySelector('.menu').style.position='fixed';
})
const cross=document.querySelector('.head1 .fa-xmark ');
cross.addEventListener('click',function(){
    document.querySelector('.menu').style.display="none";
    cartBucket.style.display='block';
    document.querySelector('.menu').style.position='relative';
})