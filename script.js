let turn=document.querySelector(".turns");
// let path=document.querySelectorAll(".redPath1,.redPath2,.redPath3,.redPath4,.redPath5,.redPath6,.redPath7,.redPath8,.redPath9,.redPath10,.redPath11,.redPath12,.redPath13,.redPath14,.redPath15");
// let path = document.querySelectorAll('[class^="redPath"]');
// let path = document.querySelectorAll('[class^="redPath"]');
let pathRed = document.querySelectorAll('[class*="redPath"]');
let pathGreen = document.querySelectorAll('[class*="greenPath"]');
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
  console.dir(sortedGreenPath);
  let RedPlayer=[true,0,0];
  let GreenPlayer=[true,0,0]
let isDiceStop=false;
let isGotiClicked=false;
let redCurr=[0,0,0,0];
let redpush=[0,0,0,0];
let greenCurr=[0,0,0,0];
let greenpush=[0,0,0,0];       
let innerRedball=Array.from(document.querySelectorAll(".innerRedball"));
let innerGreenball=Array.from(document.querySelectorAll(".innerGreenball"));
let redGoti=document.querySelectorAll(".redGoti.red1,.redGoti.red2,.redGoti.red3,.redGoti.red4");
let greenGoti=document.querySelectorAll(".greenGoti.green1,.greenGoti.green2,.greenGoti.green3,.greenGoti.green4");
let mainRed=document.querySelector(".mainRed");
let mainGreen=document.querySelector(".mainGreen");
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
  // restart animation properly
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
function gotiChalo(i,goti,goticurr,sortedPath,push){
   isGotiClicked=true;
   goticurr[i]+=random+push[i];
   sortedPath[goticurr[i]].appendChild(goti[i]);
   push[i]=1;
   isDiceStop=false;
}
function gotiNikalo(main,outer,i,goti,playerArr){
  main.appendChild(goti[i]);
  playerArr[1]+=1;
  goti[i].classList.add(outer);
  isDiceStop=false;
  isGotiClicked=true;
}
function wholeChange(main,outer,goti,sortedPath,push,playerArr,gotiCurr,innerGotiBall,playerTurn){
for(let i=0;i<4;i++){//i use here let si that each listener has its own i
    goti[i].addEventListener("click",()=>{
      if(goti[i].classList.contains(outer)&&isGotiClicked==false&&turn.innerHTML==playerTurn){
        gotiChalo(i,goti,gotiCurr,sortedPath,push);
        playerArr[2]=1;
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
// function wholeChange2(main,outer,playerArr,goti,sortedPath,push,gotiCurr,innerGotiBall,playerTurn){
// for(let i=0;i<4;i++){//i use here let si that each listener has its own i
//     goti[i].addEventListener("click",()=>{
//       if(goti[i].classList.contains(outer)&& playerArr[2]==0 && turn.innerHTML==playerTurn){
//         gotiChalo(i,goti,gotiCurr,sortedPath,push);
//         playerArr[2]=1;
//       }
//     })
//     innerGotiBall[i].addEventListener("click",()=>{
//     if(playerArr[2]==0){      
//         gotiNikalo(main,outer,i,goti,playerArr);
//         playerArr[2]=1;
//     }
//    })
//       }
// }
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
const rollDice=(event)=>{
  if(isDiceStop==false){
    isDiceStop=true;
    random=randNo();
            if(turn.innerHTML=="player1 turn"){    
                RedPlayer[2]=0;   
                isGotiClicked=false; 
                  if(random==5){
                         if(RedPlayer[0]==false){
                         wholeChange(mainRed, "outerRed", redGoti, sortedRedPath, redpush, RedPlayer, redCurr, innerRedball, "player1 turn");
                         }else{
                             RedPlayer[0]=false;
                             mainRed.appendChild(redGoti[0]);
                             redGoti[0].classList.add("outerRed");
                             isDiceStop=false;
                              RedPlayer[1]+=1;
                         }
                             turn.innerHTML="player1 turn"; 
                  }else{
                             if(RedPlayer[1]==1){
                               setTimeout(()=>{
                                   gotiChalo(0,redGoti,redCurr,sortedRedPath,redpush);
                                   RedPlayer[2]=1;
                               },500)
                             }
                             isGotiClicked=false;
                             turn.innerHTML="player2 turn";
                             if(isGotiClicked==true||RedPlayer[0]==true){
                               isDiceStop=false;
                             }else{
                                 isDiceStop=true;
                             }
                  }
              chanceNo1(0,random);
              changeNo2(1,random);
            }
              else if(turn.innerHTML=="player2 turn"){
                  isDiceStop=false;
                  GreenPlayer[2]=0;   
                  isGotiClicked=false; 
                  if(random==5){
                    if(GreenPlayer[0]==false&&isGotiClicked==false){
                      isDiceStop=true;
                      wholeChange(mainGreen, "outerGreen", greenGoti, sortedGreenPath, greenpush, GreenPlayer, greenCurr, innerGreenball, "player2 turn");
                    }else{
                        GreenPlayer[1]+=1;
                        GreenPlayer[0]=false;
                        mainGreen.appendChild(greenGoti[0]);
                        greenGoti[0].classList.add("outerGreen");
                        isDiceStop=false;
                    }
                        turn.innerHTML="player2 turn"; 
                  }else{
                    if(GreenPlayer[1]==1){
                      setTimeout(()=>{
                          gotiChalo(0,greenGoti,greenCurr,sortedGreenPath,greenpush);
                          GreenPlayer[2]=1;
                      },500)
                    }
                    isGotiClicked=false;
                    turn.innerHTML="player3 turn";
                    if(isGotiClicked==true||GreenPlayer[0]==true){
                      isDiceStop=false;
                    }else{
                        isDiceStop=true;
                    }
                  }
                  chanceNo1(1,random);
                  changeNo2(2,random);
            }else if(turn.innerHTML=="player3 turn"){
              isGotiClicked=false;
                isDiceStop=false;
                random==5?turn.innerHTML="player3 turn":turn.innerHTML="player4 turn";
                chanceNo1(2,random);
                changeNo2(3,random);
            }else{
                isDiceStop=false;
              random==5?turn.innerHTML="player4 turn":turn.innerHTML="player1 turn";
              chanceNo1(3,random);
              changeNo2(0,random);           
        }             
      }        
  }
wholeChange(mainRed,"outerRed",redGoti,sortedRedPath,redpush,RedPlayer,redCurr,innerRedball,"player2 turn");
wholeChange(mainGreen,"outerGreen",greenGoti,sortedGreenPath,greenpush,GreenPlayer,greenCurr,innerGreenball,"player3 turn");

diceBox.forEach((el)=>{
    el.addEventListener("click",rollDice);
})

