function sendEmail() {
    let FIO = document.getElementById('fname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let city = document.getElementById('city').value;
    let zip = document.getElementById('zip').value;
    let columnCounter = document.getElementById('column-email').childElementCount;
    let column = document.getElementById('column-email')
    let nameForCart = []
    let counterForCart = []
    let sizeForCart = []
    for (let i = 0; i < columnCounter; i++){
        if (i%2===0){
            let forloop = column.children[i]
            let forAppend = forloop.children[0].children[1].children[0].innerHTML
            let forSizeForCart = forloop.children[0].children[1].children[2].innerHTML
            let forAppendCountItems = forloop.children[1].children[1].innerHTML


            nameForCart.push(forAppend)
            counterForCart.push(forAppendCountItems)
            sizeForCart.push(forSizeForCart)
        }
    }

    Email.send({
        Host: "smtp.gmail.com",
        Port: "587",
        Username : "smtp@cc-interactive.com",
        Password : "TqRge7Ja2wf4hnuj",
        To : 'shinigamistore.official@gmail.com',
        From : email == null ? email: "shinigamistore.official@gmail.com",
        Subject : "Shinigami",
        Body : " <table style=\"width:50%\ align:left\">\n" +
            "  <tr>\n" +
            "    <td><strong>FIO</strong></td>\n" +
            "    <td>"+FIO+"</td>\n" +
            "  </tr>\n" +
            "  <tr>\n" +
            "    <td><strong>Email</strong></td>\n" +
            "    <td>"+email+"</td>\n" +
            "  </tr>\n" +
            "  <tr>\n" +
            "    <td><strong>Phone</strong></td>\n" +
            "    <td>"+phone+"</td>\n" +
            "  </tr>\n" +
            "  <tr>\n" +
            "    <td><strong>City</strong></td>\n" +
            "    <td>"+city+"</td>\n" +
            "  </tr>\n" +
            "  <tr>\n" +
            "    <td><strong>Zip</strong></td>\n" +
            "    <td>"+zip+"</td>\n" +
            "  </tr>\n" +
            "  <tr>\n" +
            "    <td><strong>Product Name</strong></td>\n" +
            "    <td>"+nameForCart+"</td>\n" +
            "  </tr>\n" +
            "  <tr>\n" +
            "    <td><strong>Quantity</strong></td>\n" +
            "    <td>"+counterForCart+"</td>\n" +
            "  </tr>\n" +
            "  <tr>\n" +
            "    <td><strong>Size</strong></td>\n" +
            "    <td>"+sizeForCart+"</td>\n" +
            "  </tr>\n" +
            "</table> </body>",
    }).then(
        console.log(sizeForCart),
        message => alert('Спасибо за Ваш заказ, наш оператор скоро с Вами свяжется.')
    );

}
