(function() {
    
    
    var app = angular.module('GemStore', []);
    //連結前台
   
    app.controller('ReviewController',function(){
        this.review = {};
        
        this.addReview = function(product){
            //console.log(this.review);
            //alert("stop0");
            //console.log(product.reviews);
            //alert("stop1");
            product.reviews.push(this.review); 
            this.review = {};                   //clean it!!!!important!!!
            //console.log(product.reviews);
            //alert("stop2");
            localStorage.setItem(product.name,angular.toJson(product.reviews));
        };
    });
    
    //一進入網頁，把local storage裡的打上來
    app.controller('StoreController', function() {
        
        

        this.products = 
        [   
            {
                img: './images/iphone-hero.jpg',
                name: 'iPhone 6S',
                price: 28500,
                description: '玫瑰金',
                reviews: []
                
            },
            {
                img: './images/se.png',
                name: 'iPhone 5S',
                price: 18500,
                description: '粉紅',
                reviews: []
                
            }
        ];
        
        
        this.productsName =[this.products[0].name,this.products[1].name];
        
        localStorage.setItem("productsArray", angular.toJson(this.productsName));
        //initialize products review
        tmp =[];
        
        if(!localStorage[this.products[0].name]){
            //console.log("product0_review_empty");
            localStorage.setItem(this.products[0].name,angular.toJson(tmp));
        }
        if(!localStorage[this.products[1].name]){
            //console.log("product1_review_empty");
            localStorage.setItem(this.products[1].name,angular.toJson(tmp));
        }
            
        var productsArray = getProductsArray();
        //console.log("productsArray");
        //console.log(productsArray);
        for(var productIndex = 0 ; productIndex<productsArray.length; productIndex++){
                var key = productsArray[productIndex];
                var productReview = JSON.parse(localStorage[key]);
               
                for(var reviewIndex = 0 ; reviewIndex<productReview.length; reviewIndex++){
                    this.products[productIndex].reviews.push(productReview[reviewIndex]);         
                }
                
        }
        
        function getProductsArray(){
            var productsArray = localStorage["productsArray"];
            if(!productsArray){
                //如果沒東西, 儲存空物件
                productsArray = [];
                localStorage.setItem("productsArray", angular.toJson(productsArray));
            }else{
                productsArray = JSON.parse(productsArray);
            }
            return productsArray;
        }
    });

    app.controller('PanelController', function() {
        this.tab = 1;
        this.selectTab = function(setTab) {
            this.tab = setTab;
        };
        this.isSelected = function(checkTab) {
            return this.tab === checkTab;
        };
    });
})();
