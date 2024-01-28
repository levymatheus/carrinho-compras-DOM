let products = []

function addUser() {


    const product = document.getElementById('product').value
    const quantity = document.getElementById('quantity').value

    if (product === "" || quantity === "") {
        alert("Por favor, digite o nome do produto e a quantidade")
        return
    }

    let productsExists = false
    products.forEach(function (item) {
        if (item.productName === product) {
            productsExists = true
        }
    })

    if (productsExists) {
        alert('Este produto já está no carrinho. Por favor, escolha outro ou apenas remova e adicione novamente aumentando sua quantidade.')
        return
    }

    const confirmation = confirm('Deseja adicionar ' + product + ' ao carrinho?')


    if (confirmation) {
        const productList = document.getElementById('userList')
        const newP = document.createElement('p')
        newP.id = 'product - ' + product

        newP.innerHTML = `
        <button onclick="toggleChecked(this)" class="btn btn-link checklist-button"><i class="far fa-square"></i></button><button onclick="removeUser('${product}')" class="btn btn-link remove-button"><i class="far fa-trash-alt"></i></button>
        ${product} - Quantidade: ${quantity}
      `
        newP.querySelector('.remove-button').style.color = 'inherit'
        productList.appendChild(newP)

        document.getElementById('product').value = ''
        document.getElementById('quantity').value = ''

        products.push(
            {
                productName: product,
                quantity: quantity,
                checked: false
            }
        )

    }

    document.getElementById('emptyListMessage').style.display = 'none'

    counterItens()
}

function removeUser(product) {
    const remove = document.getElementById('product - ' + product)
    const confirmation = confirm('Você quer mesmo remover o produto ' + product + '?')
    if (confirmation) {
        remove.parentNode.removeChild(remove)
    }
    const productIndex = products.findIndex(nameProduct => nameProduct.productName === product)
    if (productIndex !== -1) {
        products.splice(productIndex, 1)
    }


    if (products.length === 0) {
        document.getElementById('emptyListMessage').style.display = 'block' // Exibe a mensagem de lista vazia novamente
    }

    counterItens()
}


function toggleChecked(button) {
    const listItem = button.parentNode
    const product = listItem.textContent.trim().split(' - ')[0]
    const productIndex = products.findIndex(item => item.productName === product)
  

    if (productIndex !== -1) {
        const checked = !products[productIndex].checked
        products[productIndex].checked = checked

        if (checked) {
            listItem.classList.add('checked-item')
            button.innerHTML = '<i class="far fa-check-square"></i>'
        } else {
            listItem.classList.remove('checked-item')
            button.innerHTML = '<i class="far fa-square"></i>'
        }
    }
}

function counterItens() {
    let totalItens = 0

    products.forEach(item => {
        totalItens += parseInt(item.quantity)
    })

    let counterP = document.getElementById('totalItens')
    counterP.textContent = 'A quantidade de itens no carrinho é de ' + totalItens + ' itens.'

}
