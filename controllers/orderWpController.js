const Order = require('../models/orderModel.js');
const User = require('../models/userModel.js');

const createWpOrder = async(req, res) =>{

    const apiData = req.body;
    const data = {};

    const id = req.params.id;

    const user  = await User.findById(id);
    //const user  = await User.findOne({ _id: id, status: 'active' });
    
    if(!user){
        return res.status(404).json({message: "User not found"})
    }

    const requiredProperties = [
        'id', 'status', 'currency', 'shipping_total', 'total', 'billing',
        'payment_method_title', 'customer_note',
        'meta_data', 'line_items', 'shipping_lines',
        'payment_url'
    ];

    const billingRequiredProperties = [
    'first_name', 'address_1', 'city', 'state', 'country', 'email', 'phone'
    ];

    const hasAllRequiredProperties = requiredProperties.every(prop => apiData.hasOwnProperty(prop));
    const hasAllBillingProperties = billingRequiredProperties.every(prop => apiData.billing && apiData.billing.hasOwnProperty(prop));
    const hasNonEmptyLineItems = Array.isArray(apiData.line_items) && apiData.line_items.length > 0;

    const hasNonEmptyBillingFields = apiData.billing.first_name && apiData.billing.phone && apiData.billing.address_1;

    if (!hasAllRequiredProperties || !hasAllBillingProperties || !hasNonEmptyLineItems || !hasNonEmptyBillingFields) {
      //console.error('Missing required properties or line_items is empty or billing fields are empty in apiData');
      return res.status(400).json({ message: "Invalid data" });
    }

    if (id) data.user = id;
    if (apiData.id) data.external_id = apiData.id;
    if (apiData.status) data.status = apiData.status;
    if (apiData.currency) data.currency = apiData.currency;
    if (apiData.shipping_total) data.shipping_total = apiData.shipping_total;
    if (apiData.total) data.total_amount = apiData.total;
    if (apiData.billing.first_name) data.first_name = apiData.billing.first_name;
    if (apiData.billing.address_1) data.address_1 = apiData.billing.address_1;
    if (apiData.billing.city) data.city = apiData.billing.city;
    if (apiData.billing.state) data.state = apiData.billing.state;
    if (apiData.billing.country) data.country = apiData.billing.country;
    if (apiData.billing.email) data.email = apiData.billing.email;
    if (apiData.billing.phone) data.phone = apiData.billing.phone;
    if (apiData.payment_method_title) data.payment_method = apiData.payment_method_title;
    if (apiData.customer_note) data.customer_note = apiData.customer_note;
    if (apiData.payment_url) data.source = apiData.payment_url;

    let products = [];
    apiData.line_items.forEach((item, index) => {
        products[index] = {};
        products[index].name = item.name;
        products[index].quantity = item.quantity;
        products[index].sku = item.sku;
        products[index].total = item.total;
    });
    data.products = products;

    if(Array.isArray(apiData.shipping_lines) && apiData.shipping_lines.length > 0){
        data.shipping_method_title = apiData.shipping_lines[0].method_title;
    }

    if(apiData.status === 'deposit'  && Array.isArray(apiData.meta_data) && apiData.meta_data.length > 0){
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
}

module.exports = { createWpOrder };