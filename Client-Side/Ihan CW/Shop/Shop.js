window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Adjust as needed
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

var listProductHTML = document.getElementsByClassName('listProduct')[0];
var listCartHTML = document.getElementsByClassName('listCart')[0];
var iconCart = document.getElementsByClassName('icon-cart')[0];
var iconCartSpan = document.getElementsByClassName('icon-cart')[0].getElementsByTagName('span')[0];
var body = document.getElementsByTagName('body')[0];
var closeCart = document.getElementsByClassName('close')[0];
var products = [];
var cart = [];

iconCart.addEventListener('click', function() {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', function() {
    body.classList.toggle('showCart');
});

function addDataToHTML() {
    listProductHTML.innerHTML = '';
    if (products.length > 0) {
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            var newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML =
                '<img src="' + product.image + '" alt="">' +
                '<h2>' + product.name + '</h2>' +
                '<div class="price">$' + product.price + '</div>' +
                '<button class="addCart">Add To Cart</button>';
            listProductHTML.appendChild(newProduct);
        }
    }
}
listProductHTML.addEventListener('click', function(event) {
    var positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        var id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

function addToCart(product_id) {
    var positionThisProductInCart = cart.findIndex(function(value) {
        return value.product_id == product_id;
    });
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

function addCartToMemory() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addCartToHTML() {
    listCartHTML.innerHTML = '';
    var totalQuantity = 0;
    if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            totalQuantity = totalQuantity + item.quantity;
            var positionProduct = products.findIndex(function(value) {
                return value.id == item.product_id;
            });
            var info = products[positionProduct];
            var newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
            newItem.innerHTML = '<div class="image">' +
                '<img src="' + info.image + '">' +
                '</div>' + 
                '<div class="name">' + info.name + '</div>' +
                '<div class="totalPrice">$' + (info.price * item.quantity) + '</div>' +
                '<div class="quantity">' +
                '<span class="minus">-</span>' +
                '<span><strong>' + item.quantity + '</strong></span>' +
                '<span class="plus">+</span>' +
                '</div>';
            listCartHTML.appendChild(newItem);
        }
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', function(event) {
    var positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        var product_id = positionClick.parentElement.parentElement.dataset.id;
        var type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
});

function changeQuantityCart(product_id, type) {
    var positionItemInCart = cart.findIndex(function(value) {
        return value.product_id == product_id;
    });
    if (positionItemInCart >= 0) {
        var info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            default:
                var changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

function initApp() {
    products = [{
            "id": 1,
            "name": "Climate Action T-Shirt",
            "price": 100,
            "image": "image/Item_1.jpg"
        },
        {
            "id": 2,
            "name": "Organic SDGs Cap",
            "price": 15,
            "image": "image/Item_2.jpg"
        },
        {
            "id": 3,
            "name": "SDGs Mug",
            "price": 10,
            "image": "image/Item_3.jpg"
        },
        {
            "id": 4,
            "name": "SDGS COTTON Bag",
            "price": 50,
            "image": "image/Item_4.jpg"
        },
        {
            "id": 5,
            "name": "SDGs Umbrella",
            "price": 70,
            "image": "image/Item_5.jpg"
        },
        {
            "id": 6,
            "name": "Bamboo Utensils Set",
            "price": 50,
            "image": "image/Item_6.jpg"
        },
        {
            "id": 7,
            "name": "Wooden Bottle",
            "price": 80,
            "image": "image/Item_7.jpg"
        },
        {
            "id": 8,
            "name": "SDGs Lunch Box",
            "price": 30,
            "image": "image/Item_8.jpg"
        },
    ];

    addDataToHTML();

    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }

    document.getElementsByClassName('checkOut')[0].addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Please add items to your cart before checking out.');
        } else {
            window.location.href = '/Ihan CW/Checkout Form/checkOut.html';
        }
    });

    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
}
initApp();
