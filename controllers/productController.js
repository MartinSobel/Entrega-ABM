const fs = require('fs');
var products = JSON.parse(fs.readFileSync(__dirname + "/../database/products.json"));

const productController = {
    renderCreate: function(req, res, next){
        res.render('alta');
    },
    create: function(req, res, next){
        products.push(req.body);
        let productsJSON = JSON.stringify(products);
        fs.writeFileSync(__dirname + "/../database/products.json", productsJSON);
        res.send('Producto creado');
    },
    renderEdit: function(req, res, next){
        let idProduct = req.params.id;
        let productFound;
        for(var i = 0 ; i < products.length ; i++){
            if(products[i].id == idProduct){
                productFound = products[i];
                break;
            }
        }
        if(productFound){
            res.render("edit", {productFound} )
        }else{
            res.send("Producto invalido");
        }
    },
    edit: function(req, res, next){
        let idProduct = req.params.id;

        var editProduct = products.map(function(product){
            if(product.id == idProduct){
                let productEditado = req.body;
                productEditado.id = idProduct;
                return productEditado;
            }
            return product;
        });

        editProductJSON = JSON.stringify(editProduct);
        fs.writeFileSync(__dirname + "/../database/products.json",editProductJSON);
        res.redirect("/edit");
    },
    delete : function(req,res,next){
        var idProduct = req.params.id;
        var productDelete = products.filter(function(product){
            if (product.id == idProduct){
                return product.id != idProduct;
            } else {
                res.send("No existe ese producto");
            }
        });
        productDeleteJSON = JSON.stringify(productDelete);
        fs.writeFileSync(__dirname + "/../database/products.json",productDeleteJSON);
        res.send("Producto eliminado");
    },
}

module.exports = productController;