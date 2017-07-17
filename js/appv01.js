// counts controller

var CountsController = (function(){
    
var  itemArr = [];
var totalInc = 0;
var totalDec = 0; 
var profit  = 0;    
   
 return {
  z: function(){
   console.log(itemArr);
  },   
  getItemsFromStorage: function(){
   itemArr = [];   
   var keys = Object.keys(localStorage);
    for(var i = 0; i < keys.length; i++){
     var item = localStorage.getItem(keys[i]);
      var itemObj = JSON.parse(item);
       itemArr.push(itemObj);
   }
     return itemArr;
 },
  addToStorage: function(obj){
   var string = JSON.stringify(obj);
    localStorage.setItem(obj.id, string);
 },
  countTotals: function(Arr){
    totalInc = 0;  
    totalDec = 0; 
    profit  = 0;
     for(i = 0; i < Arr.length; i++ ){
      if(itemArr[i].switch == 'on'){
       totalInc += Arr[i].summ;  
         }else{
       totalDec += Arr[i].summ;  
         }   
     }
      profit = totalInc - totalDec;
      
      var totals = {
          profit: profit,
          sum: totalInc,
          min: totalDec,
          percent: totalInc > 0 ? Math.round((totalDec/totalInc)*100) : '---' 
      };
      
      return totals;
  },
  countPercent: function(total, current ){
     Math.round(current/total) * 100;
      
  }   
       
}
        
})();



// user interface controller
var UIController = (function(){
    
 var nodes = {
  submit:  '.custom-form',
  switch: '#switch-box',
  content: '#cont',
  plus: '.plus',
  minus: '.minus',
  inputDesc: '#exampleInputName2',
  inputSumm: '#summ',
  greenField: '.green h3',
  redField: '.red h3',
  profit: '.profit h3',
  dateDom: '.date'
     
 };
    
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August ', 'September', 'October', 'November', 'December'];    
    
var Item = function(description, val, swState) {
 this.id = (new Date).getTime();
 this.desc = description;
 this.summ = parseFloat(val);
 this.switch = swState;   
}; 

var percent = '---';    
  
  
 return {
    domNodes: function() {
     return nodes;   
    },
    formObj: function() {
     var getSw = document.querySelector(nodes.switch).value; 
     var getDesc = document.querySelector(nodes.inputDesc).value;
     var getSumm = document.querySelector(nodes.inputSumm).value;  
      document.querySelector(nodes.inputDesc).value = '';
       document.querySelector(nodes.inputSumm).value = '';
        document.querySelector(nodes.inputDesc).focus();
      return  new Item(getDesc, getSumm, getSw); 
    },
    displayItems: function(arr, total){
    document.querySelector(nodes.plus).innerHTML = '';
    document.querySelector(nodes.minus).innerHTML = '';
       
       
        
     for(i = 0; i < arr.length; i++){
      percent = '<span class="gr">' + (total > 0? Math.round((arr[i].summ/total)*100) : '---') + '%' +'</span>';
        
      if(arr[i].switch == 'off'){
       document.querySelector(nodes.minus).innerHTML += '<div><span class="text">'+ arr[i].desc +'</span><span class="number">'+ '-'+ arr[i].summ +' '+ percent +'<span id="'+ arr[i].id +'" class="ion-ios-close-outline del"></span></span></div>'  
         }else{
           document.querySelector(nodes.plus).innerHTML += '<div><span class="text">'+ arr[i].desc +'</span><span class="number">'+ arr[i].summ +' '+ percent +'<span id="'+ arr[i].id +'" class="ion-ios-close-outline del"></span></span></div>'  
         }   
     }  
    },
    displayTotals: function(obj){
     document.querySelector(nodes.greenField).innerHTML ='<span class="ion-ios-plus-outline"></span> ' + obj.sum.toFixed(2);
     document.querySelector(nodes.redField).innerHTML ='<span class="ion-ios-minus-outline"></span> ' + parseFloat(obj.min).toFixed(2) + ' ' + obj.percent + '%';
     document.querySelector(nodes.profit).innerHTML ='<span class="ion-ios-checkmark-outline"></span> ' + obj.profit.toFixed(2);
    },
    switchVal: function(){
     if(document.querySelector(nodes.switch).value == 'off'){
      document.querySelector(nodes.switch).value = 'on';
     }else{
      document.querySelector(nodes.switch).value = 'off'
     }
     var inputs = document.getElementsByClassName('custom-input');  
     for( i = 0; i < inputs.length; i++){
        inputs[i].classList.toggle('redout');
    }
    },
    displayDate: function(){
     var month = (new Date).getMonth();
     var year = (new Date).getFullYear();
     var day = (new Date).getDate();
      document.querySelector(nodes.dateDom).textContent = 'Today is '+ day + ' of ' + months[month] + ' ' + year;   
    }

     
 }
    
})();




// application controller
var AppController = (function(counts, ui){
    
 var domNodes = UIController.domNodes();  
    
 document.querySelector(domNodes.submit).addEventListener('submit', function(e){
  
  if( document.querySelector(domNodes.inputDesc).value && document.querySelector(domNodes.inputSumm).value && !isNaN(document.querySelector(domNodes.inputSumm).value) ){
        //recive and add
   var gotObj = UIController.formObj();
    CountsController.addToStorage(gotObj);
     
     //get
     
     getAndCount();    
  }   
      
  e.preventDefault();   
});
    
 document.querySelector(domNodes.switch).addEventListener('click', function(){
  UIController.switchVal();   
});
    
 document.querySelector(domNodes.content).addEventListener('click', function(e){
  if (e.target.classList.contains('del')){
   //console.log(e.target.id); 
     localStorage.removeItem(e.target.id); 
      getAndCount();
  }
});
      
    
    //init get and display function
 var getAndCount = function(){
  var itemsArr = CountsController.getItemsFromStorage();
  
     //count and display total
  var totalsObj = CountsController.countTotals(itemsArr);
  UIController.displayTotals(totalsObj);

     
     //display
  UIController.displayItems(itemsArr,  totalsObj.sum);   
 };   
    
    
    
    
var init = function() {
 document.querySelector(domNodes.plus).innerHTML = '';
 document.querySelector(domNodes.minus).innerHTML = '';
 document.querySelector(domNodes.switch).checked = false;
 document.querySelector(domNodes.switch).value = 'off';   
};   
    
UIController.displayDate();    
//CountsController.z();    
init();
getAndCount();    
})(CountsController, UIController);