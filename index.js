const button = document.getElementById('button');
const product = document.getElementById('product');
const price = document.getElementById('price');
const productList = document.getElementById('productList');
const TotalPrice = document.getElementById('totalprice'); 
let totalPrice = 0;

button.addEventListener('click', function() {
    const listItem = document.createElement('li');
    const productPrice = parseFloat(price.value);
    listItem.textContent = `Product: ${product.value}, Selling Price: ${price.value}`;
    const deletebutton = document.createElement('button');
    deletebutton.textContent = 'Remove';
    listItem.appendChild(deletebutton);

    productList.appendChild(listItem);
    deletebutton.addEventListener('click', function() {
        deleteProduct(listItem, productPrice);
    });
    totalPrice += productPrice;
    currprice();
});

function deleteProduct(item, productPrice) {
    productList.removeChild(item);
    totalPrice -= productPrice;
    currprice();
}

function currprice() {
    TotalPrice.textContent = totalPrice; 
}

function createProduct(product, price) {
    axios.post('https://crudcrud.com/api/a467c3d125bb4370820389ccaf01ced2/products', {
        product: product,
        price: price
    })
        .then(function (response) {
            console.log('Product created:', response.data);

            // This part has been modified to update the dataset attribute
            var productEntry = productList.lastChild;
            productEntry.dataset.productId = response.data._id;
        })
        .catch(function (error) {
            console.error('Error creating product:', error);
        });
}

function deleteProductById(productId) {
    axios.delete(`https://crudcrud.com/api/a467c3d125bb4370820389ccaf01ced2/products/${productId}`)
        .then(function (response) {
            console.log('Product deleted:', response.data);
        })
        .catch(function (error) {
            console.error('Error deleting product:', error);
        });
}