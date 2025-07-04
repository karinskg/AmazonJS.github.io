export const delivaryOptions = [{
    id: '1',
    delivaryDays: 7,
    priceCents: 0
},{
    id: '2',
    delivaryDays: 3,
    priceCents: 499
},{
    id: '3',
    delivaryDays: 1,
    priceCents: 999
}]

export function getDeliveryItem(deliveryOptionId){
    let currentDate

    delivaryOptions.forEach((option) =>{
        if(option.id === deliveryOptionId){
            currentDate= option
        }
    })
    return currentDate || delivaryOptions[0]
}