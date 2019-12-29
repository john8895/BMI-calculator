//宣告
var calcBtn = document.querySelector('#bmiCalcBtn');
var bodyHeight = document.querySelector('#bodyHeight');
var bodyWeight = document.querySelector('#bodyWeight');
var list = document.querySelector('.bmi-list');
var persRecord = [];
var delAllBtn = document.querySelector('.delAll');
var error = document.querySelector('.error');

//介面
checkRecords();
//讀取資料
function checkRecords(){
    var getData = localStorage.getItem('bmiRecords');
    if(getData == null){
        error.innerHTML = '目前沒有資料';
        list.innerHTML = '';
        return;
    }else{
        error.innerHTML = '';
    };
    // console.log(getData);
    var getDataAry = JSON.parse(getData);
    var len = getDataAry.length || 0;
    var str = '';

    persRecord = getDataAry;
    for(var i=0; len>i; i++){
        str += '<li class="record-item '+ getDataAry[i].class + '"><ul class="sub-list"><li><span>BMI</span>' + getDataAry[i].BMI + '</li><li><span>weight</span>' + getDataAry[i].Weight + 'Kg</li><li><span>height</span>'+ getDataAry[i].Height +'CM</li><li>'+ getDataAry[i].Date +'</li></ul></li>';
        // console.log(getDataAry[i].class);
        // console.log(getDataAry[i].BMI);
        // console.log(getDataAry[i].Weight);
        // console.log(getDataAry[i].Height);
        // console.log(getDataAry[i].Date);
    }
    list.innerHTML = str;
}

//寫入資料
function updateBMI(bmiNum,className){
    var Today = new Date();
    var Minutes = (Today.getMinutes() < 10 ? '0':'') + Today.getMinutes();
    writeDate = Today.getHours() + ':' + Minutes + ' ' + (Today.getMonth()+1) + '-'+ Today.getDate() + '-' + Today.getFullYear();
    
    persRecord.push({
       'class':className,
       'BMI':bmiNum,
        'Weight':bodyWeight.value,
        'Height':bodyHeight.value,
        'Date':writeDate
    });
    var dataString = JSON.stringify(persRecord);
    localStorage.setItem('bmiRecords',dataString);
    checkRecords();
}

//事件
function calcBMI(){
    if(bodyWeight.value == '' || bodyHeight.value == ''){
        alert("你還沒輸入資料喔！"); 
        return;
    };
    var str = 0;
    var w = bodyWeight.value;
    var h = bodyHeight.value / 100;
    var num = w / (h*h);
    var bmiCurrent = '';
    num = num.toFixed(2);
    // console.log(num);
    if(num < 18.5){
        console.log("體重過輕");
        bmiCurrent = 'to-light';
    }else if(num >= 18.5 && num < 24){
        console.log("正常範圍");
        bmiCurrent = 'normal';
    }else if(num >= 24 && num < 27){
        console.log("過重");
        bmiCurrent = 'to-heavy';
    }else if(num >= 27 && num <30){
        console.log("輕度肥胖");
        bmiCurrent = 'light-heavy';
    }else if(num >= 30 && num < 35){
        console.log("中度肥胖");
        bmiCurrent = 'normal-heavy';
    }else if(num >= 35){
        console.log("重度肥胖");
        bmiCurrent = 'hight-heavy';
    }else {
        console.log("例外");
    }
    updateBMI(num,bmiCurrent);
}

function clearRecords(){
    var r = confirm("是否要清除全部資料？");
    if(r == true){
        localStorage.clear();
        checkRecords();
    }
}

delAllBtn.addEventListener('click',clearRecords);
calcBtn.addEventListener('click',calcBMI);