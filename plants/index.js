console.log('Score: 100/100  All items completed' );

const menu = document.querySelector('.header-nav-menu'),
    burger = document.querySelector('.header-burger'),
    burgerItem = document.querySelectorAll('.header-burger-line'),
    serviceHead = document.querySelector('.service-header-buttons'),
    serviceBtns = serviceHead.querySelectorAll('button'),
    serviceArticles= document.querySelectorAll('article'),
    contact = document.querySelector('.contacts'),
    contactBtn = contact.querySelector('.contacts-city'),
    listCities = contact.querySelector('.contacts-box'),
    namesCities = contact.querySelectorAll('.contacts-list-item'),
    cardCity = contact.querySelector('.card-city'),
    callPhone = cardCity.querySelector('#phone'),
    call = contact.querySelector('.contacts-header'),
    rates = document.querySelector('.prices'),
    priceBox = document.querySelector('.prices-item'),
    dropdowns = document.querySelectorAll('.dropdown'),
    ratesItem = document.querySelectorAll('.prices-rates-item');
    
   
    
    const clickBtns = [];
    const addresses =[
        {
            number:0,
            city: 'Canandaigua, NY',
            phone:'+1	585	393 0001',
            address:'151 Charlotte Street'},
        {
            number:1,
            city: 'New York City',
            phone:'+1	212	456 0002',
            address:'9 East 91st Street'
        },
        {
            number:2,
            city: 'Yonkers, NY',
            phone:'+1	914	678 0003',
            address:'511 Warburton Ave'
        },
        {
            number:3,
            city: 'Sherrill, NY',
            phone:'++1	315	908 0004',
            address:'14 WEST Noyes BLVD'
        }
    ];
    const pricesItems =[
        {
            name:'Basics',
            price:'$15'
        },
        {
            name:'Standard',
            price:'$25'
        },
        { 
            name:'Pro care',
            price:'$35'
        }
    ];
    const renderCard = (element, obj)=>{
    element.classList.toggle('open');
    listCities.classList.toggle('active');
    contactBtn.innerHTML =`${obj.city}`;
       element.innerHTML = `
                <div class="wrapper-left">
                <span>City:</span>
                <span>Phone:</span>
                <span>Office address:</span>
                </div>
                <div class="wrapper-right">
                <p>${obj.city}</p>
                <p id='phone'>${obj.phone}</p>
                <p>${obj.address}</p>
                </div>
                <button class="call ${obj.number}">Call us</button>
    `;
 };
    const renderRate =(el, obj) =>{
    el.innerHTML =`
    <div class="prices-open ">
                    <div class="open-header"><span>${obj.name} </span> <img class="dropup" 
                    src="./plants/img/price_btn_arrow.png" alt="arrow-up"></div>
                    <p>Release of Letraset sheets containing Lorem Ipsum passages, and more recently</p>
                    <div class="open-price"><span>${obj.price} </span>/ per hour</div>
                    <button>Order</button>
                </div>
    `;
 };

    const contactDefault = (element)=>{
    element.classList.remove('open');
    listCities.classList.remove('active');
    contactBtn.innerHTML =`City`;
  };

     const oneOrTwo = (el,arr,arrCheck)=>{
        for (let j = 0; j < arr.length; j++){
            if(el.classList[0] == arr[j].classList[0]){
                if(!arrCheck.includes(el.classList[0])) {
                        if(arrCheck.length < 2){
                        arrCheck.push(arr[j].classList[0]);
                        arr[j].classList.toggle('click');
                        }
                        
                }else{
                        if(arrCheck.at(1) == el.classList[0]){
                            arrCheck.pop();
                        } else{arrCheck.shift();} 
                        arr[j].classList.toggle('click');
                }
                    
            }
        }
        console.log(clickBtns);
    };

    const changeClasses = (arrSections,arr) =>{
            arrSections.forEach(item =>{
                for(let j = 0; j < arr.length; j++){
                   if(!item.classList.contains(arr[j]) && arr.length == 1) {
                    item.classList.add('blur');
                   }else if(arr.length == 2 && !item.classList.contains(arr[0])
                      && !item.classList.contains(arr[1])  ){
                    item.classList.add('blur');
                   }else if(arr.length == 0){
                   deleteClass(item, 'blur');
                   }  else{
                    item.classList.remove('blur');
                   }
                }});
            
    };

    const deleteClass = (selector,nameClass)=>{
        selector.classList.remove(nameClass);
    };
    burger.addEventListener('click', (e) =>{
        e.preventDefault();
        menu.classList.toggle('open');
        burgerItem.forEach( item  =>{
            item.classList.toggle('active');
        });
        
    });

    serviceHead.addEventListener('click', (e) =>{
        e.preventDefault();
        const target = e.target;
        if(target.tagName == 'BUTTON'){
            oneOrTwo(target,serviceBtns,clickBtns);
            if(clickBtns.length == 0){
                serviceArticles.forEach(item=>deleteClass(item,'blur'));
            }else{
                changeClasses (serviceArticles, clickBtns);
            }
        }
        
    
    });
    
    rates.addEventListener('click',(e)=>{
        if(e.target.classList[0] == 'dropdown'){
            for(let i =0; i < dropdowns.length; i++){
                if(e.target.classList[1] == dropdowns[i].classList[1]){
                    ratesItem[0].innerHTML = `<span>${pricesItems[i].name}</span>
                    <img class ="dropdown basics" src="./plants/img/price-accordion-btn.png" alt="arrow-down">`;
                    renderRate(priceBox, pricesItems[i]);
                }
            }
        }else if(e.target.tagName == 'BUTTON'){
            contact.scrollIntoView();
        }else if(e.target.className == 'dropup'){
            ratesItem[0].innerHTML = `<span>Basics</span> 
            <img class ="dropdown basics" src="./plants/img/price-accordion-btn.png" alt="arrow-down">`;
            priceBox.innerHTML=` `;
        }
    });


    contact.addEventListener('click', (e) =>{
    e.preventDefault();
    console.log(e.target.classList[0]);
    if(e.target.className == 'contacts-city'){
        listCities.classList.toggle('active');
        contactBtn.innerHTML =`City`;
        call.innerHTML= 'Contact us';
        cardCity.classList.remove('open');
    }else if(e.target.closest('.contacts-list')){
        for(let i = 0; i< namesCities.length; i++){
            if(e.target.classList[0] == namesCities[i].classList[0]){
                renderCard(cardCity, addresses[i]);

            }
        }
    }else if(e.target.classList.contains('call')){
        const callBtn = cardCity.querySelector('.call');
        for(let i=0; i <addresses.length; i++){
            if(addresses[i].number == callBtn.classList[1]){
                call.innerHTML= `
                <div class="call-office">
                        <span>Call</span>
                        <p>${addresses[i].phone}</p>
                      </div>
                    </div>
                `;
            }
        }   
    }
    });
    

