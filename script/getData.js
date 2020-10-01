const PARAM = {
    cat: 'category',
    subcat: 'subcategory',
    search: ['name', 'description', 'category', 'subcategory']
}

export const getData = {
    url: 'database/dataBase.json', // путь до сервера в нашем случае до базы данных
    get(process) {  
        fetch(this.url) // Api feth для запросов по url на сервер(делаем запрос в базу данных) this это контекст вызова
        .then((response) => response.json()) 
        //  получаем ответ с сервера
        .then(process)
        // получаем масив данных
    },
    wishList(list, callback) {
        this.get((data) => {
            const result = data.filter((item) => list.includes(item.id)); // фильтруем масив данных получаем елементы
            callback(result);
        })
    },

    item(value, callback) {
        this.get((data) => {
            const result = data.find((item) => item.id === value);
            callback(result);
        })
    },

    cart(list, callback) {
        this.get((data) => {
            const result = data.filter((item) => list.some(obj => obj.id === item.id));
            callback(result);
        })
    },

    category(prop, value, callback) {
        this.get((data) => {
            const result = data.filter((item) => item[PARAM[prop]].toLowerCase() === value.toLowerCase());
            callback(result);
        })
    },

    search(value, callback) {
        this.get((data) => {
            const result = data.filter((item) => {
                for (const prop in item) {
                    if (PARAM.search.includes(prop) && item[prop].toLowerCase().includes(value.toLowerCase())) {
                       return true
                    }
                }
            })
            callback(result);
        })
    },

}
