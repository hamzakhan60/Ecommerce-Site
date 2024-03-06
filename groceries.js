// const data=localStorage.getItem('quantity');
// document.querySelector('.cartQuantity').value=data;
// const total=localStorage.getItem('total');
// document.querySelector('.cartTotal').textContent=total;
const dropDown = document.getElementById('menu');
// let trArray=[document.createElement('tr'),document.createElement('tr'),document.createElement('tr')];
// newTr=document.createElement('tr');
// newTr.style.display='none';
// trArray.push(newTr);
let trArray = Array.from(document.querySelectorAll('.table tr'));
let tdNode = document.querySelectorAll('.table tr td');
let tdArray = Array.from(tdNode);
let length1 = 0;
let length2 = 0;
dropDown.addEventListener('change', function (o) {
    const value = o.target.value;
    if (value == 1) {
        const selector = 'div h4';
        const tdArray = sortTable(selector, value);
        trArr(tdArray);

    }
    else if (value >= 2 && value <= 4) {
        const selector = 'div h4';
        const tdArray = sortTable(selector, value);
        trArr(tdArray);
    }
    else if (value == 5 || value == 6) {
        const selector = 'div h5';
        const tdArray = sortTable(selector, value);
        trArr(tdArray);
    }
})
function sortTable(selector, value) {
    let tdNode = document.querySelectorAll('.table tr td');
    let tArray = Array.from(tdNode);
    tArray.sort(function (a, b) {
        let temp, temp1;
        if (value == 1) {
            temp = a.querySelector(selector).textContent;
            temp1 = b.querySelector(selector).textContent;
        }
        else if (value == 2) {
            temp = a.querySelector(selector).textContent.split(" ")[1];
            temp1 = b.querySelector(selector).textContent.split(" ")[1];
        }
        else if (value == 3) {
            temp = a.querySelector(selector).textContent[2];
            temp1 = b.querySelector(selector).textContent[2];
        }
        else if (value == 4) {
            temp = a.querySelector(selector).textContent[3];
            temp1 = b.querySelector(selector).textContent[3];
        }
        else if (value == 5) {
            temp = a.querySelector(selector).textContent;
            temp1 = b.querySelector(selector).textContent;
        }
        else if (value == 6) {
            temp = b.querySelector(selector).textContent;
            temp1 = a.querySelector(selector).textContent;
        }

        return temp.localeCompare(temp1);
    });
    return tArray;
}

function trArr(tdArray) {
    trArray.forEach(function (tr) {
        tr.innerHTML = "";
    });
    //console.log(trArray);
    tdArray.forEach(function (td, index) {
        if (index <= 2)
            trArray[0].appendChild(td);
        else if (index > 2 && index <= 5)
            trArray[1].appendChild(td);
        else if (index <= 8)
            trArray[2].appendChild(td);
        else if (index >= 9) {
            trArray[3].appendChild(td);
        }
    });

    const table = document.querySelector('.table');
    document.querySelector('.table tbody').innerHTML = "";
    length1 = 0;
    length2 = 0;
    trArray.forEach((tr, index) => {
        table.appendChild(tr);
        if (index < 3)
            length1 += tr.querySelectorAll('td').length;
        if (index >= 3)
            length2 += tr.querySelectorAll('td').length;
    });
    const showingResult = document.querySelector('.result');
    showingResult.innerText = `Showing  ${length1} of ${tdArray.length} Results`;

}
function changePage2Event() {
    changePage2.style.backgroundColor = " #8bc34a";
    changePage2.style.color = "white";
    changePage1.style.backgroundColor = " transparent";
    changePage1.style.color = "#8bc34a";
    const showingResult = document.querySelector('.result');
    showingResult.innerText = `Showing  ${length2} of ${tdArray.length} Results`;
    trArray.forEach(function (tr, index) {
        if (index >= 0 && index <= 2)
            tr.style.display = 'none';
        else
            tr.style.display = 'flex';
    });
}
const changePage2 = document.getElementById('changePage2');
changePage2.addEventListener('click', changePage2Event);
const changePage3 = document.getElementById('changePage3');
changePage3.addEventListener('click', changePage2Event);
const changePage1 = document.getElementById('changePage1');
changePage1.addEventListener('click', function () {
    const showingResult = document.querySelector('.result');
    showingResult.innerText = `Showing  ${length1} of ${tdArray.length} Results`;
    changePage1.style.backgroundColor = " #8bc34a";
    changePage1.style.color = "white";
    changePage2.style.backgroundColor = " transparent";
    changePage2.style.color = "#8bc34a";
    trArray.forEach(function (tr, index) {
        if (index >= 0 && index <= 2)
            tr.style.display = 'block';
        else
            tr.style.display = 'none';
    })
});
const resetButton = document.querySelector('.buttonDiv');
const lowerRange = document.querySelector('#lower');
const upperRange = document.querySelector('#upper');
lowerRange.oninput = function (event) {
    dropDown.value = 1;
    if (parseInt(lowerRange.value) + 3 > upperRange.value) {
        upperRange.value = parseInt(upperRange.value) + 1;
        console.log(parseInt(upperRange.value) + 2);
        if (upperRange.value == upperRange.max) {
            lowerRange.value = parseInt(37);
        }

    }
    resetButton.style.display = "flex";
    // resetButton.addEventListener('click',function(event){
    //     lowerRange.value=0;
    //     upperRange.value=40;
    //     resetButton.style.display='none';
    //     lowerRange.oninput();
    // })
    const value1 = document.querySelector('#minOutput');
    value1.value = `$${lowerRange.value}`;
    const value2 = document.querySelector('#maxOutput');
    value2.value = `$${upperRange.value}`;
    const filter = tdArray.filter(function (a) {
        const rate = parseInt(a.querySelector('div h5').textContent[1].concat(a.querySelector('div h5').textContent[2]));
        return (rate >= lowerRange.value && rate <= upperRange.value);

    });
    trArr(filter);
}
upperRange.oninput = function (event) {
    dropDown.value = 1;
    if (parseInt(upperRange.value) - 3 < lowerRange.value) {
        lowerRange.value = parseInt(lowerRange.value) - 1;
        console.log(parseInt(upperRange.value) + 2);

        if (lowerRange.value == lowerRange.min) {
            upperRange.value = parseInt(3);
        }
    }
    resetButton.style.display = "flex";
    const value1 = document.querySelector('#minOutput');
    value1.value = `$${lowerRange.value}`;
    const value2 = document.querySelector('#maxOutput');
    value2.value = `$${upperRange.value}`;
    const filter = tdArray.filter(function (a) {
        const rate = parseInt(a.querySelector('div h5').textContent[1].concat(a.querySelector('div h5').textContent[2]));
        return (rate >= lowerRange.value && rate <= upperRange.value);

    });
    trArr(filter);
}
resetButton.addEventListener('click', function (event) {
    lowerRange.value = 0;
    upperRange.value = 40;
    lowerRange.oninput();
    upperRange.oninput();
    resetButton.style.display = 'none';
}, false)
tdArray.forEach((td) => {
    td.addEventListener('click', function (event) {
        productPage(td);
    })
});
function productPage(td) {
    const src = td.querySelector('img').getAttribute('src');
    const productName = td.querySelector('div h4').textContent;
    console.log(productName);
    const coast = td.querySelector('div h5 span').textContent;
    console.log(coast);
    const del = td.querySelector('div h5 del');
    const imgtag = document.querySelector('.child1 img');
    imgtag.src = src;
    const productNameTag = document.querySelector('.child2 h1');
    productNameTag.textContent = productName;
    const costPtag = document.querySelector('.child2 div p span');
    const delCost = document.querySelector('.child2 div p del');
    if (del != null)
        delCost.textContent = del.textContent;
    else
        delCost.style.display = 'none';
    console.log(costPtag);
    costPtag.textContent = coast;
    document.querySelector('.groceries').style.display = 'none';
    document.querySelector('.groceries2').style.display = 'block';
    const reviewButton = document.querySelector('#reviewbtn');
    const descriptionButton = document.querySelector('#descriptionbtn');
    console.log(reviewButton);
    console.log(descriptionButton);
    reviewButton.addEventListener('click', function () {
        document.querySelector('.descriptionbtnAction').style.display = 'none';
        document.querySelector('.reviewButtonAction').style.display = 'block';
        reviewButton.style.borderTop = '3px solid #8bc34a';
        reviewButton.style.borderRight = '1px dotted black';
        descriptionButton.style.border = 'transparent';
    });
    descriptionButton.addEventListener('click', function () {
        document.querySelector('.descriptionbtnAction').style.display = 'block';
        document.querySelector('.reviewButtonAction').style.display = 'none';
        descriptionButton.style.borderTop = '3px solid #8bc34a';
        descriptionButton.style.borderRight = '1px dotted black';
        reviewButton.style.border = 'transparent';
    });
    const td1 = (Array.from(tdArray)).slice(0, 3);
    const a = document.querySelector('.relatedProductsDiv table tr');
    a.innerHTML = "";
    td1.forEach(td => {

        a.appendChild(td);
    })
}

const searchButton = document.querySelector("#searchButton");
console.log(searchButton);
searchButton.addEventListener('click', function () {
    searchResultProduct();
});



function searchResultProduct() {
    const searchProducts=document.querySelector('.SearchProductInput');
    const searchProduct = searchProducts.value.toLowerCase();
    tdArray.forEach(td => {
        const splitProductName = td.querySelector('div h4').textContent.toLowerCase();
        const splitSearch = searchProduct.split(" ");
        if (splitProductName == searchProduct)
            productPage(td);
        else if (splitProductName.split(" ").includes(searchProduct)) {
            productPage(td);
            console.log('splitProduct Name');
        }
        else if (splitProductName.split(" ").includes(splitSearch))
            productPage(td);
        else {
            const noProductFound = document.querySelector(".noProductFound h1");
            noProductFound.textContent = `Search result: "${searchProduct}"`;
            document.querySelector(".noProductFound").style.display = 'block';
            document.querySelector(".tableContent").style.display = 'none';
        }
    })
}
var cartQuantity = document.querySelector('.cartQuantity');
var cartTotal = document.querySelector('.cartTotal');
const cartBoxParent = document.querySelector('.cartBoxProducts');
const addCartButton = document.querySelector('#cartButton');
const temporary = document.querySelector('.cartBoxProductsChild');
var cartBoxArray;
addCartButton.addEventListener('click', function () {
    const info = document.querySelector('.infoAddCart');
    info.style.display = 'flex';
    const productName = document.querySelector('.child2 h1');
    info.querySelector('div p').textContent = `"${productName.textContent}" has been added to your cart. `
    const quantity = document.querySelector('#productQuantity').value;
    cartQuantity.value = parseInt(quantity) + parseInt(cartQuantity.value);
    const cost = document.querySelector('.h2Div p span').textContent.split("$");
    const cartTotalSplit = cartTotal.textContent.split("$");
    cartTotal.textContent = `$${parseFloat(cartTotalSplit[1]) + (parseFloat(cost[1]) * parseInt(quantity))}.00`;
    const cartBoxButton = document.querySelector('.cartBoxChild2').style.display = 'block';
    document.querySelector('.continueShoopintButton').style.display = 'none';
    document.querySelector('.noPrdouctInCart').style.display = 'none';
    

    const productImage = document.querySelector('.child1 img').src;
    var flag = true;
    cartBoxArray.forEach(product => {
        const cartBoxProcuctName = product.querySelector('.productNameInCartBoxChild p').textContent;
        if (cartBoxProcuctName == productName.textContent) {
            const cartBoxProcuctQuantity = product.querySelector('.catBoxProductQuantity');
            cartBoxProcuctQuantity.textContent = parseInt(cartBoxProcuctQuantity.textContent) + parseInt(quantity);
            product.querySelector('.catBoxProductTotal').textContent = `$${cost[1]}`;
            product.querySelector('.productNameInCartBoxChild p').textContent = productName.textContent;
            product.querySelector('.productImageDiv img').src = productImage;
            console.log(cartBoxProcuctQuantity.textContent);
            flag = false;
        }
    });
    if (flag == true) {
        //clone and append child
        var cloneNode = temporary.cloneNode(true);
        cartBoxArray.push(cloneNode);
        cartBoxArray[(cartBoxArray.length) - 1].querySelector('.productNameInCartBoxChild p').textContent = productName.textContent;
        cartBoxArray[(cartBoxArray.length) - 1].querySelector('.catBoxProductQuantity').textContent = quantity;
        cartBoxArray[(cartBoxArray.length) - 1].querySelector('.catBoxProductTotal').textContent = `$${cost[1]}`;
        cartBoxArray[(cartBoxArray.length) - 1].querySelector('.productImageDiv img').src = productImage;
    }

    const subTotal = document.querySelector('.subTotal');
    subTotal.textContent = cartTotal.textContent;
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


    cartBoxParent.innerHTML = "";
    cartBoxArray.forEach(p => {
        cartBoxParent.appendChild(p);

    })
    cartBoxParent.style.display = 'flex';




    
    localStorage.setItem('cartBoxArray', cartBoxParent.innerHTML);
    localStorage.setItem('cartQuantity', cartQuantity.value);
    localStorage.setItem('cartTotal', cartTotal.textContent)

});
const viewCart=document.querySelector('.viewCart');
viewCart.addEventListener('click',function(){
    window.location.href="cart.html";
})
window.addEventListener('load', function () {
    var localCart = localStorage.getItem('cartTotal');
    var localQuantity = localStorage.getItem('cartQuantity');
    var localCartBox = localStorage.getItem('cartBoxArray');
    var tempDiv=document.createElement('div');
    tempDiv.innerHTML=localCartBox;
    const cartBoxArray1 = Array.from(tempDiv.querySelectorAll('.cartBoxProductsChild'));
    cartBoxArray=cartBoxArray1;
    console.log(cartBoxArray);

    if (localCart != null && localQuantity != null) {
        cartTotal.textContent = localCart;
        cartQuantity.value = localQuantity;
        if(cartBoxArray.length!=0){
            document.querySelector('.cartBoxChild2').style.display = 'block';
            document.querySelector('.continueShoopintButton').style.display = 'none';
            document.querySelector('.noPrdouctInCart').style.display = 'none';
            cartBoxParent.innerHTML = "";
            cartBoxArray.forEach(p=>{
                cartBoxParent.appendChild(p);
            });
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






            cartBoxParent.style.display = 'flex';
            const subTotal = document.querySelector('.subTotal');
            subTotal.textContent = localCart;
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

cartTotal.addEventListener('click', function () {
    cartBox();
});
const cartBucket = document.querySelector('.fa-bucket');
cartBucket.addEventListener('click', function () {
    cartBox();
});
function cartBox() {
    document.querySelector('.cartBox').style.display = 'flex';
    document.querySelector('.cartBucket').style.display = 'none';
    document.querySelector('.cartBox').style.position='fixed';
    const close = document.querySelector('.head .fa-xmark');
    document.querySelector('.infoAddCart').style.display = 'none';
    close.addEventListener('click', function () {
        document.querySelector('.cartBox').style.display = 'none';
        document.querySelector('.cartBucket').style.display = 'block';
        document.querySelector('.cartBox').style.position='relative';
    })

}
cartTotal.addEventListener('dblclick',function(){
    cartPage();
})
cartQuantity.addEventListener('dblclick',function(){
    window.location.href="cart.html";
})

function cartPage(){
    window.location.href="cart.html";
}

const menuBars=document.querySelector('.fa-bars');
menuBars.addEventListener('click',function(){
    const menu=document.querySelector('.menu');
    menu.style.display="flex";
    document.querySelector('.cartBucket').style.display = 'none';
    document.querySelector('.menu').style.position='fixed';
    
})
const cross=document.querySelector('.head1 .fa-xmark ');
cross.addEventListener('click',function(){
    document.querySelector('.menu').style.display="none";
    document.querySelector('.cartBucket').style.display = 'block';
    document.querySelector('.menu').style.position='relative';
})











