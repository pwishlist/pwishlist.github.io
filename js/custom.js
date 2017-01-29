$(function() {

    $(".js-nicescroll").niceScroll({
        cursorcolor: "#8c8c8c",
        cursorwidth: "6px",
        background: "rgba(144, 144, 144, 0.4)",
        cursorborder: "2px",
        cursorborderradius: 2,
        autohidemode: false,
        cursorfixedheight: 130,
        horizrailenabled: false,
        railpadding: { top: 0, right: 2, left: 0, bottom: 5 },
    });
    
    

});


var d = document,
    itemBox = d.querySelectorAll('.item_box'), 
    cartCont = d.getElementById('cart_content'); 

function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}

function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o){
	localStorage.setItem('cart', JSON.stringify(o));
	return false;
}

// Добавление в корзину
function addToCart(e){
	this.disabled = true; 
	var cartData = getCartData() || {}, 
			parentBox = this.parentNode, 
			itemId = this.getAttribute('data-id'), 
            itemImg = parentBox.querySelector('.item_img').src, 
			itemTitle = parentBox.querySelector('.item_title').innerHTML, 
			itemPrice = parentBox.querySelector('.item_price').innerHTML; 
	if(cartData.hasOwnProperty(itemId)){ 
		cartData[itemId][2] += 1;
	} else { 
		cartData[itemId] = [itemImg, itemTitle, itemPrice, 1];
	}
	
	if(!setCartData(cartData)){ 
		openCart();
	}
	return false;
}

for(var i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}
// Формирование корзины
function openCart(e){
	
	var cartData = getCartData(), 
			totalItems = '';
	console.log(JSON.stringify(cartData));
	
	if(cartData !== null){
		
        
        
        for(var items in cartData){   
        
        totalItems += '<div class="item-wrapper"><div class="select-wish-item"><div class="sidebar-brackets2"><img src="./img/brackets2.png" alt=""></div><div class="select-wish-photo">';
        
        totalItems += '<img src="' + cartData[items][0] + '" alt="">';      
        totalItems += '</div><div class="select-wish-content">';
        totalItems += '<h4 class="select-wish-title">' + cartData[items][1] + '</h4>';
        totalItems += '<div class="select-wish-price">' + cartData[items][2] + '</div>';
        totalItems += '<div class="select-wish-by">By: <img src="img/by.png" class="by-pic" alt=""></div></div></div>';
            
            
        totalItems += ' <div class="view-item"><div class="view-item-space">';
        totalItems += '<a href="#" class="btn-view-item" data-id="' + cartData[items][2] + '"><img src="./img/search_icon_2.png" alt=""> View item</a>';
        totalItems += '</div><div class="dropdown-space"><ul class="dropdown"><li class="dropdown-top ">';
        totalItems += '<a class="btn-more-options" href="/">More options<img src="./img/more_icon_1.png" alt=""></a>';
        totalItems += '<ul class="dropdown-inside"><li>';
        totalItems += '<a href="/" class="btn-dropdown"><img class="icon_x" src="./img/x_icon.png" alt="">Remove item</a>';
        totalItems += '</li><li>';
        totalItems += '<a href="/" class="btn-dropdown"><img src="./img/arrow_icon.png" alt="">Re-assign item</a>';
        totalItems += '</li></ul></li></ul></div></div></div>';
         }                  
                       
        
		cartCont.innerHTML = totalItems;
	} else {
		
		cartCont.innerHTML = 'В корзине пусто!';
	}
	return false;
}
// Удаление из корзины определённого элемента
addEvent(d.body, 'click', function(e){
	if(e.target.className === 'del_item') {
		var itemId = e.target.getAttribute('data-id'),
		cartData = getCartData();
		if(cartData.hasOwnProperty(itemId)){
        delete cartData[itemId]; // удаляем товар из объекта
        setCartData(cartData); // перезаписываем измененные данные в localStorage
        cartCont.innerHTML = 'Элемент удалён.';    
		}
	}
}, false);

// Очистка всей корзины
addEvent(d.getElementById('clear_cart'), 'click', function(e){
	localStorage.removeItem('cart');
	cartCont.innerHTML = 'Корзина очищена.';	
});