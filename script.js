let turn=document.querySelector(".turns");
let pathRed = document.querySelectorAll('[class*="redPath"]');
let pathGreen = document.querySelectorAll('[class*="greenPath"]');
let pathBlue=document.querySelectorAll('[class*="bluePath"]');
let pathYellow=document.querySelectorAll('[class*="yellowPath"]');
let starArea=document.querySelectorAll(".starArea");
let sortedYellowPath=[...pathYellow]
  .filter(el=>/yellowPath\d+/.test(el.className))
  .sort((a,b)=>{
    let aNum=+a.className.match(/yellowPath(\d+)/)[1];
    let bNum=+b.className.match(/yellowPath(\d+)/)[1];
    return aNum-bNum;
  })
let sortedBluePath=[...pathBlue]
  .filter(el=>/bluePath\d+/.test(el.className))
  .sort((a,b)=>{
    let aNum=+a.className.match(/bluePath(\d+)/)[1];
    let bNum=+b.className.match(/bluePath(\d+)/)[1];
    return aNum-bNum;
  })
let sortedRedPath = [...pathRed]
  .filter(el => /redPath\d+/.test(el.className)) // ✅ only valid ones
  .sort((a, b) => {
    let aNum = +a.className.match(/redPath(\d+)/)[1];
    let bNum = +b.className.match(/redPath(\d+)/)[1];
    return aNum - bNum;
  });
  let sortedGreenPath = [...pathGreen]
  .filter(el => /greenPath\d+/.test(el.className)) // ✅ only valid ones
  .sort((a, b) => {
    let aNum = +a.className.match(/greenPath(\d+)/)[1];
    let bNum = +b.className.match(/greenPath(\d+)/)[1];
    return aNum - bNum;
  });
  let yellowFunctionCalled=false;
  let blueFunctionCalled=false;
  let redFunctionCalled=false;
  let greenFunctionCalled=false;
  let BluePlayer=[true,0,0];
  let RedPlayer=[true,0,0];
  let GreenPlayer=[true,0,0]
  let YellowPlayer=[true,0,0];
let isDiceStop=false;
let isGotiClicked=false;

let redCurr=[0,0,0,0];
let redpush=[0,0,0,0];
let greenCurr=[0,0,0,0];
let greenpush=[0,0,0,0]; 
let blueCurr=[0,0,0,0];
let bluepush=[0,0,0,0]; 
let yellowCurr=[0,0,0,0];
let yellowpush=[0,0,0,0];

let innerRedball=Array.from(document.querySelectorAll(".innerRedball"));
let innerGreenball=Array.from(document.querySelectorAll(".innerGreenball"));
let innerBlueball=Array.from(document.querySelectorAll(".innerBlueball"));
let innerYellowball=Array.from(document.querySelectorAll(".innerYellowball"));

let redGoti=document.querySelectorAll(".redGoti.red1,.redGoti.red2,.redGoti.red3,.redGoti.red4");
let greenGoti=document.querySelectorAll(".greenGoti.green1,.greenGoti.green2,.greenGoti.green3,.greenGoti.green4");
let blueGoti=document.querySelectorAll(".blueGoti.blue1,.blueGoti.blue2,.blueGoti.blue3,.blueGoti.blue4");
let yellowGoti=document.querySelectorAll(".yellowGoti.yellow1,.yellowGoti.yellow2,.yellowGoti.yellow3,.yellowGoti.yellow4")

let mainRed=document.querySelector(".mainRed");
let mainGreen=document.querySelector(".mainGreen");
let mainBlue=document.querySelector(".mainBlue");
let mainYellow=document.querySelector(".mainYellow");

let diceBox=document.querySelectorAll("div.diceBox");
let diceboxes=document.querySelectorAll(".dicebox1,.dicebox2,.dicebox3,.dicebox4");
let rolldiceArr=["rolldice1","rolldice2","rolldice3","rolldice4","rolldice5","rolldice6"];
let randNo=()=>{
   return Math.floor(Math.random()*6);
}
let random;
for(let i=1;i<diceboxes.length;i++){
    diceboxes[i].style.visibility="hidden";
}
function chanceNo1(i,random) {
   diceboxes[i].style.animation = "none";
  diceboxes[i].offsetHeight;
  diceboxes[i].style.animation = "moveBox 0.3s ease-in-out 1";
  // show correct dice face
     Array.from(diceboxes[i].children).forEach(el => {
    el.style.display = "none";
    if (el.classList.contains(rolldiceArr[random])) {
      el.style.display = "flex";
    }
  });
  if(random!==5 ){
  setTimeout(() => {
    diceboxes[i].style.visibility = "hidden";
  }, 600); // match animation duration
 }
 
  // hide AFTER animation ends
}
function gotiChalo(i,goti,goticurr,sortedPath,push,playerArr){
   isGotiClicked=true;
   goticurr[i]+=random+push[i];
   sortedPath[goticurr[i]].appendChild(goti[i]);
   push[i]=1;
   isDiceStop=false;
    playerArr[2]=1;
   if(sortedPath[goticurr[i]].classList.contains("starArea")){
      sortedPath[goticurr[i]].style.display="inlineBlock"
   } 
   if(!(sortedPath[goticurr[i]].classList.contains("starArea"))){
   checkKills( sortedPath[goticurr[i]],i);
   }
}
function gotiNikalo(main,outer,i,goti,playerArr){
  main.appendChild(goti[i]);
  playerArr[1]+=1;
  goti[i].classList.add(outer);
  isDiceStop=false;
  isGotiClicked=true;
}
function releaseFirstGoti(playerArr,main,goti,outer){
   playerArr[0]=false;
   main.appendChild(goti[0]);
   goti[0].classList.add(outer);
   isDiceStop=false;
    playerArr[1]+=1;
}
function starter(playerArr){
  isDiceStop=true;   
  playerArr[2]=0;   
  isGotiClicked=false; 
}
function otherThan5(playerArr,NextPlayer,goti,goticurr,sortedPath,push,outer){
    if(playerArr[1]==1){
         setTimeout(()=>{
           let goti2=Array.from(goti).find((el)=>{
               return el.classList.contains(outer);
            })
            let i=Array.from(goti).indexOf(goti2);
             gotiChalo(i,goti,goticurr,sortedPath,push,playerArr);
         },500)
       }
       isGotiClicked=false;
       turn.innerHTML=NextPlayer;
       if(isGotiClicked==true||playerArr[0]==true){
         isDiceStop=false;
       }else{
           isDiceStop=true;
       }
}

function wholeChange(main,outer,goti,sortedPath,push,playerArr,gotiCurr,innerGotiBall,playerTurn,targetClass){
for(let i=0;i<4;i++){//i use here let si that each listener has its own i'''
  
    goti[i].addEventListener("click",()=>{
      if(goti[i].classList.contains(outer)&&isGotiClicked==false){
        if(turn.innerHTML==playerTurn){
      playerArr[2]=0;
          if(event.target.classList.contains(targetClass)&&playerArr[2]==0){
            gotiChalo(i,goti,gotiCurr,sortedPath,push,playerArr);
          }       
        }                                   
      }
    })
    innerGotiBall[i].addEventListener("click",()=>{
    if(playerArr[2]==0&&random==5&&turn.innerHTML==playerTurn){      
        gotiNikalo(main,outer,i,goti,playerArr);
        playerArr[2]=1;
    }
   })
      }
}
function changeNo2(i,random){
   if(random!==5){
     setTimeout(()=>{
        diceboxes[i].style.visibility="visible";
        Array.from(diceboxes[i].children).forEach(el => {
        el.style.display = "none";
    if (el.classList.contains(rolldiceArr[random])) {
      el.style.display = "flex";
      }
  });
    },600)
   }
}
function reInsertGoti(className){
let color = className.slice(0, -1);   // red
let index = parseInt(className.slice(-1)) - 1;  // 2 (for red3)
switch(color) {

  case "red":
    innerRedball[index].appendChild(redGoti[index]);
    redGoti[index].classList.remove("outerRed");
    redCurr[index] = 0;
    redpush[index]=0;
    RedPlayer[1] -= 1;
    if(RedPlayer[1]==0){
    RedPlayer[0]=true;
}   break;

  case "blue":
    innerBlueball[index].appendChild(blueGoti[index]);
    blueGoti[index].classList.remove("outerBlue");
    blueCurr[index] = 0;
    bluepush[index]=0;
    BluePlayer[1] -= 1;
    if(BluePlayer[1]==0){
    BluePlayer[0]=true;
}   break;


  case "green":
    innerGreenball[index].appendChild(greenGoti[index]);
    greenGoti[index].classList.remove("outerGreen");
    greenCurr[index] = 0;
    greenpush[index]=0;
    GreenPlayer[1] -= 1;
    if(GreenPlayer[1]==0){
    GreenPlayer[0]=true;
}   break;


  case "yellow":
    innerYellowball[index].appendChild(yellowGoti[index]);
    yellowGoti[index].classList.remove("outerYellow");
    yellowCurr[index] = 0;
    yellowpush[index]=0;
    YellowPlayer[1] -= 1;
    if(YellowPlayer[1]==0){
    YellowPlayer[0]=true;
}   break;

}
}
function checkChance(){
  for(i=0;i>4;i++){
    redGoti[i].style.zIndex=0;
    blueGoti[i].style.zIndex=0;
    greenGoti[i].style.zIndex=0;
    yellowGoti[i].style.zIndex=0;
  }
}
function checkKills(el,i){
    if(el.children.length>=2){
      let elem=Array.from(el.children);
      let condition1=elem[0].classList[0]==elem[1].classList[0];
      if(el.children.length>2){
          let condition2=elem[1].classList[0]==elem[2].classList[0];
          if(condition2==false){
            console.log("removed child: ",(el.children[0].classList[0]));
            let className=el.children[0].classList[1];
            reInsertGoti(className);
          }
      }
      if(condition1==false){
            console.log("removed child: ",(el.children[0].classList[0]));
        let className=el.children[0].classList[1];
            reInsertGoti(className);
      }
    }
}
const rollDice=(event)=>{
  if(isDiceStop==false){
    isDiceStop=true;
    random=randNo();

            if(turn.innerHTML=="player1 turn"){ 
                  checkChance();
                          RedPlayer[2]=0;
              redGoti.forEach((el)=>{
                el.style.zIndex=1000;
              })
              starter(RedPlayer);
                  if(random==5){
                         if(RedPlayer[0]==false){
                          console.log("this is not first goti");
                         }else{
                             releaseFirstGoti(RedPlayer,mainRed,redGoti,"outerRed");
                         }
                             turn.innerHTML="player1 turn"; 
                  }else{
                      otherThan5(RedPlayer,"player2 turn",redGoti,redCurr,sortedRedPath,redpush,"outerRed");
                  }
              chanceNo1(0,random);
              changeNo2(1,random);
            }
              else if(turn.innerHTML=="player2 turn"){
                    checkChance();
                greenGoti.forEach((el)=>{
                el.style.zIndex=1000;
              })
                  starter(GreenPlayer);
                  GreenPlayer[2]=0;
                  if(random==5){
                          
                         if(GreenPlayer[0]==false){
                           isDiceStop=true;
                           
                         }else{
                             releaseFirstGoti(GreenPlayer,mainGreen,greenGoti,"outerGreen");
                         }
                        turn.innerHTML="player2 turn"; 
                  }else{
                      otherThan5(GreenPlayer,"player3 turn",greenGoti,greenCurr,sortedGreenPath,greenpush, "outerGreen");
                  }
                  chanceNo1(1,random);
                  changeNo2(2,random);
            }else if(turn.innerHTML=="player3 turn"){
                  checkChance();
              blueGoti.forEach((el)=>{
                el.style.zIndex=1000;
              })
              BluePlayer[2]=0;
                  starter(BluePlayer); 
                  if(random==5){
                    
                    if(BluePlayer[0]==false){
                        isDiceStop=true;
                    }else{
                      releaseFirstGoti(BluePlayer,mainBlue,blueGoti,"outerBlue");
                    }
                        turn.innerHTML="player3 turn"; 
                  }else{
                      otherThan5(BluePlayer,"player4 turn",blueGoti,blueCurr,sortedBluePath,bluepush, "outerBlue");
                  }
                  chanceNo1(2,random);
                  changeNo2(3,random);
            }else{
                  checkChance();
              yellowGoti.forEach((el)=>{
                el.style.zIndex=1000;
              })
                 YellowPlayer[2]=0;
                  starter(YellowPlayer); 
                  if(random==5){
                    
                    if(YellowPlayer[0]==false){
                     
                        isDiceStop=true;
                    }else{
                      releaseFirstGoti(YellowPlayer,mainYellow,yellowGoti,"outerYellow");
                    }
                        turn.innerHTML="player4 turn"; 
                  }else{
                      otherThan5(YellowPlayer,"player1 turn",yellowGoti,yellowCurr,sortedYellowPath,yellowpush, "outerYellow");
                  }
              chanceNo1(3,random);
              changeNo2(0,random);           
        }             
      }        
  }

wholeChange(mainRed, "outerRed", redGoti, sortedRedPath, redpush, RedPlayer, redCurr, innerRedball, "player1 turn","redGoti");
wholeChange(mainGreen, "outerGreen", greenGoti, sortedGreenPath, greenpush, GreenPlayer,   greenCurr, innerGreenball,"player2 turn","greenGoti");
wholeChange(mainBlue, "outerBlue", blueGoti, sortedBluePath, bluepush, BluePlayer, blueCurr, innerBlueball, "player3 turn","blueGoti");
wholeChange(mainYellow, "outerYellow", yellowGoti, sortedYellowPath, yellowpush, YellowPlayer,   yellowCurr, innerYellowball,"player4 turn","yellowGoti");
wholeChange(mainRed,"outerRed",redGoti,sortedRedPath,redpush,RedPlayer,redCurr,innerRedball,"player2 turn","redGoti");
wholeChange(mainGreen,"outerGreen",greenGoti,sortedGreenPath,greenpush,GreenPlayer,greenCurr,innerGreenball,"player3 turn","greenGoti");
wholeChange(mainBlue, "outerBlue", blueGoti, sortedBluePath, bluepush, BluePlayer, blueCurr, innerBlueball, "player4 turn","blueGoti");
wholeChange(mainYellow, "outerYellow", yellowGoti, sortedYellowPath, yellowpush, YellowPlayer, yellowCurr, innerYellowball, "player1 turn","yellowGoti");

diceBox.forEach((el)=>{
    el.addEventListener("click",rollDice);
});

let ting=new Audio("ting.mp3");
let diceRollsound=new Audio("diceroll.mp3");
