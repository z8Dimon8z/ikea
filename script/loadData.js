
import { getData } from './getData.js';


        const wishList = [ 'idd005', 'idd100', 'idd077', 'idd033' ]; // список желаний

        const cartList = [ // список корзины
            { id: 'idd015', count: 3 }, // айди товара и количество
            { id: 'idd045', count: 1 },
            { id: 'idd095', count: 2 },
        ];

        

export const loadData = () => {
        
    if(location.search) { // обращаемся к location и проверяем search ксть ли он там
        const search = decodeURI(location.search); // добавляем значение поиска в переменную search и декордироем ее
        console.log(search);
        const prop = search.split('=')[0].substring(1); // split разибавет стороку по символу у нас равно и убераем первый символ
        const value = search.split('=')[1];

        if(prop === 's'){ // условия для поиска
            getData.search(value, (data) => console.log(data));
        } else  if ( prop === 'wishlist') {
            getData.wishList(wishList, (data) => console.dir({wishlist: data}));
        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, (data) => console.log(data));
        }

    }

    if(location.hash) { // проверяем location есть ли там hash id товара страница товара
        getData.item(location.hash.substring(1), (data) => console.log(data));

    }

    if(location.pathname.includes('cart')){ // проверяем содержит ли pastname cart страница корзины
        getData.cart(cartList, (data) => console.log(data));

    } 
};