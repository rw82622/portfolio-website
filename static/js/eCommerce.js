updateStoreCart()

let addToCartButtons = document.getElementsByClassName('addToCart-button')
for (let i = 0; i < addToCartButtons.length; i++){
    let myButton = addToCartButtons[i]
    myButton.addEventListener('click', updateLocalStorage)
}

function updateLocalStorage(event){
    //the user has clicked the add to cart button. Extract all neccessary data from the selected product
    let clickedButton = event.target
    let myRow = clickedButton.parentElement.parentElement
    let productImage = myRow.getElementsByClassName('productImage')[0].src
    let productName = myRow.getElementsByClassName('card-title')[0].innerText
    let productPrice = myRow.getElementsByClassName('card-text')[0].innerText
    let productId = myRow.getAttribute('data-id')

    let temp = {"id": productId, "name": productName,"imageUrl": productImage,"price": productPrice, 'quantity': 1}
    let currentStorage = JSON.parse(localStorage.getItem('storeCart'))
    //check if the product already exists in local storage
    if (currentStorage) {
        let duplicateFound = false
        for (let index in currentStorage){
            if (currentStorage[index]['imageUrl'] === temp['imageUrl']){
                currentStorage[index]['quantity'] += 1
                duplicateFound = true
                break
            }
        }
        //update product quantity if it already exists in local storage
        if (duplicateFound){
            localStorage.setItem('storeCart', JSON.stringify([...currentStorage]))
        }
        //add product to the list of products 
        else {
            localStorage.setItem('storeCart', JSON.stringify([...currentStorage, temp]))
        }
    }
    //add first item to local Storage
    else {
        localStorage.setItem('storeCart', JSON.stringify([temp]))
    }
    //update user's cart with information from in local storage
    updateStoreCart()
    //notify user that the product has been added to the cart by showing a Toast
    document.querySelector("#myToast").className += " show";
    setTimeout(
      () => (document.querySelector("#myToast").classList.remove('show')),
      2000 );
}

function updateStoreCart(){
    let localCart = localStorage.getItem('storeCart')
    //update user's cart only if there are items stored in local storage
    if (localCart){
        localCart = [...JSON.parse(localCart)]
        //update the number next to the cart button in the navbar with total number of items in user's cart
        document.querySelector("#cartTotal").innerText = localCart.length
        myCartTable = document.querySelector('#cartTable')
        while (myCartTable.firstChild) {
            myCartTable.removeChild(myCartTable.firstChild);
          }
        let cartTotalPrice = 0
        //get every product stored in local Storage and add it to the user's cart
        for (let item of localCart){
            cartTotalPrice += (item.quantity * Number(item.price.replace('$','')))
            addItemToCart(item.imageUrl, item.name, item.price, item.quantity)
        }
        //update price of entire order
        document.querySelector('#cartTotalPrice').innerText = `TOTAL: $${cartTotalPrice.toFixed(2)}`
    }
}
//create rows containing data for each product in local storage and append it to the cart table
function addItemToCart(image, name, price, quantity=1){
        let cartRow = document.createElement('tr')
        let itemName = document.createElement('td')
        itemName.innerText = name
        cartRow.append(itemName)
        let itemPrice = document.createElement('td')
        itemPrice.innerText = price
        cartRow.append(itemPrice)
        let itemQuantity = document.createElement('td')
        itemQuantity.innerText = quantity
        cartRow.append(itemQuantity)
        let subTotal = document.createElement('td')
        subTotal.innerText = `$${(quantity * Number(price.replace('$',''))).toFixed(2)}`
        cartRow.append(subTotal)
        let cartItems = document.querySelector('#cartTable')
        cartItems.append(cartRow)
}