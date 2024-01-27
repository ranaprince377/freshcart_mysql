const addressType = {
    '1': 'Home',
    '2': 'Office',
    '3': 'Others'
}

const paymentMode = { 
    '1': 'Cash on Delivery',
    '2': 'Credit/ Debit card',
    '3': 'Paypal'
}

const orderStatus = {
    '1': 'Placed',
    '2': 'Confirmed',
    '3': 'Packed',
    '4': 'Dispatched',
    '5': 'Out-for-delivery',
    '6': 'Delivered',
    '7': 'Canceled'
}

trends = {
    '0': 'None',
    '1': 'Hot',
    '2': 'Sale'
}

module.exports = {
    addressType,
    paymentMode,
    orderStatus,
    trends
}