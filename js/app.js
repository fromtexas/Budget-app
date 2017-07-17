var totalSum = 0,
    totalMin = 0,
    totalProfit = 0,
    submin = document.getElementsByClassName('custom-form')[0],
    redValEl = document.querySelector('.red h3'),
    greenValEl = document.querySelector('.green h3'),
    profitValEl = document.querySelector('.profit h3'),
    smthEl = document.getElementById('exampleInputName2'),
    numEl = document.getElementById('summ'),
    switchBox = document.getElementById('switch-box'),
    itemArr = [],
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August ', 'September', 'October', 'November', 'December'],
    dateDom = document.getElementsByClassName('date')[0];

document.getElementsByClassName('plus')[0].innerHTML = '';
document.getElementsByClassName('minus')[0].innerHTML = '';
switchBox.checked = false;
switchBox.value = 'off';

switchBox.addEventListener('click', function(){
    
    if(switchBox.value == 'off'){
        switchBox.value = 'on';
    }else{
        switchBox.value = 'off'
    }   
});

submin.addEventListener('submit', function (event){
    
if(numEl.value && smthEl.value && !isNaN(numEl.value) ){

    
var numVal =  numEl.value,
    smthVal = smthEl.value,
    swichVal = switchBox.value,
    id = new Date().getTime();
    
     
    
 var item = {
     id: id,
     description: smthVal,
     summ:  numVal,
     swichVal: swichVal
 }; 
   
 
addToStorage(id, item);    
    
numEl.value = '';
smthEl.value = '';
    
getSumm();    
getKeys();    

event.preventDefault();
    }
});

function totalSumOrMin(obj){

        
    if(obj.swichVal == 'on'){
    totalSum+=parseFloat(obj.summ);
    } else if(obj.swichVal == 'off'){
    totalMin+=parseFloat(obj.summ);
    }else{
       totalSum = 0;
       totalMin = 0;
    }
     if(totalSum > 0){
        var lost = Math.round((totalMin/totalSum)*100);
        }else{
            var lost = '---';
        }
    totalProfit = totalSum - totalMin;
    
    redValEl.innerHTML ='<span class="ion-ios-minus-outline"></span> ' + totalMin.toFixed(2) +' '+ lost +'%';
    greenValEl.innerHTML ='<span class="ion-ios-plus-outline"></span> ' + totalSum.toFixed(2);
    profitValEl.innerHTML ='<span class="ion-ios-checkmark-outline"></span> ' + totalProfit.toFixed(2) ;
   
   // console.log(totalSum.toFixed(2));
};

function getKeys(){
dateNodeFunction();
document.getElementsByClassName('plus')[0].innerHTML = '';
document.getElementsByClassName('minus')[0].innerHTML = '';
 var keys = Object.keys(localStorage); 
    for(i = 0; i < keys.length; i++){
        var get = localStorage.getItem(keys[i]);
        var someObj = JSON.parse(get);
        //itemArr.push(someObj.summ);
        //totalSumOrMin(someObj);
        prep(someObj);
    }
delItem();     
};

function prep(obj){
        
        if(totalSum > 0 ){
           var percent ='<span class="gr">' + Math.round((parseFloat(obj.summ)/totalSum) *100) + '%</span>';
           }else{
           var percent ='<span class="gr">---%</span>';
           }
        
        
        
  
        if(obj.swichVal == 'on'){
            document.getElementsByClassName('plus')[0].innerHTML += '<div><span class="text">'+ obj.description +'</span><span class="number">'+ obj.summ +' '+ percent +'<span id="'+ obj.id +'" class="ion-ios-close-outline del"></span></span></div>'
        }else{
            document.getElementsByClassName('minus')[0].innerHTML += '<div><span class="text">'+ obj.description +'</span><span class="number">'+ '-'+ obj.summ +' '+ percent +'<span id="'+ obj.id +'" class="ion-ios-close-outline del"></span></span></div>'
        }    
    
};

function addToStorage (key, obj){
    var str = JSON.stringify(obj);
    localStorage.setItem(key, str);
};

function delItem(){
if(document.getElementsByClassName('del'))
{
var  btnDel = document.getElementsByClassName('del'); 
 for(i = 0; i < btnDel.length; i++){
			btnDel[i].addEventListener('click', function(){

				localStorage.removeItem(this.id);
				getSumm();
                getKeys();
			}); 
 }}
};


function dateNodeFunction(){
    var month = (new Date).getMonth();
    var year = (new Date).getFullYear();
    var day = (new Date).getDate();
    dateDom.textContent = 'Today is '+ day + ' of ' + months[month] + ' ' + year;
};

function getSumm(){
 totalMin = 0;
 totalSum = 0; 
 totalProfit = 0;

 redValEl.innerHTML ='<span class="ion-ios-minus-outline"></span> ' + totalMin.toFixed(2) +' %';
    greenValEl.innerHTML ='<span class="ion-ios-plus-outline"></span> ' + totalSum.toFixed(2);
    profitValEl.innerHTML ='<span class="ion-ios-checkmark-outline"></span> ' + totalProfit.toFixed(2);
   
 var keysAgain = Object.keys(localStorage); 
    for(i = 0; i < keysAgain.length; i++){
        var get = localStorage.getItem(keysAgain[i]);
        var someObj = JSON.parse(get);
        totalSumOrMin(someObj);
        
    }
     
};
    
function toggleRed(){  
var sl = document.getElementsByClassName('slider')[0];
    var inputs = document.getElementsByClassName('custom-input');
    
    
    sl.addEventListener('click',function(){
        for( i = 0; i < inputs.length; i++){
        inputs[i].classList.toggle('redout');
    }
        
    })
};
toggleRed();
getSumm();
getKeys();




