const Order = require('../models/orderModel.js');
const User = require('../models/userModel.js');

const createWpOrder = async(req, res) =>{

    const apiData = req.body;
    const data = {};

    headerSig = req.headers['x-wc-webhook-signature'];
    console.log(headerSig);

    const id = req.params.id;
    const user  = await User.findById(id);
    
    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    if(apiData.hasOwnProperty('id' && 'status' && 'currency' && 'shipping_total' && 'total' && 'billing') &&
       apiData.billing.hasOwnProperty('first_name' && 'address_1' && 'city' && 'state' && 'country' && 'email' && 'phone') &&
       apiData.hasOwnProperty('payment_method_title' && 'customer_note') &&
       apiData.hasOwnProperty('meta_data' && 'line_items' && 'shipping_lines') && 
       apiData.hasOwnProperty('payment_url')
    ){
        data.user = id;
        data.external_id = apiData.id;
        data.status = apiData.status;
        data.currency = apiData.currency;
        data.shipping_total = apiData.shipping_total;
        data.total_amount = apiData.total;
        data.first_name = apiData.billing.first_name;
        data.address_1 = apiData.billing.address_1;
        data.city = apiData.billing.city;
        data.state = apiData.billing.state;
        data.country = apiData.billing.country;
        data.email = apiData.billing.email;
        data.phone = apiData.billing.phone;
        data.payment_method = apiData.payment_method_title;
        data.customer_note = apiData.customer_note;
        data.source = apiData.payment_url;

        let products = [];
        apiData.line_items.forEach((item, index) => {
            products[index] = {};
            products[index].name = item.name;
            products[index].quantity = item.quantity;
            products[index].sku = item.sku;
            products[index].total = item.total;
        });
        data.products = products;

        if(apiData.shipping_lines.length > 0){
            data.shipping_method_title = apiData.shipping_lines[0].method_title;
        }

        if(apiData.status === 'deposit'){
            apiData.meta_data.forEach((item) => {
                if(item.key === '_deposit_value'){
                    data.paid_amount = item.value;
                }
            });
        }

        try{
            const newOrder = new Order(data);
    
            const saveData = await newOrder.save();
            res.status(200).json(saveData);
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }else{
        res.status(400).json({message: "Invalid data"})
    }
}

module.exports = { createWpOrder };