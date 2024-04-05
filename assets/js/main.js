document.addEventListener('DOMContentLoaded' ,() => {
 const grid = document.querySelector(".grid");
 const width=8;
 let score=0; 
 const candies = [];

const candyImages = [
  "url(assets/images/red.jpg)",
  "url(assets/images/black.jpg)",
  "url(assets/images/blue.jpg)",
  "url(assets/images/pink.jpg)",
  "url(assets/images/yellow.jpg)" 
  
]

 function createBoard(){
    for(let i = 0; i < width * width; i++){
        let square = document.createElement('div');
        
        square.setAttribute("draggable",true); 
        square.setAttribute("id",i);

        let randomColorIndex = Math.floor(Math.random() * candyImages.length);
        square.style.backgroundImage = candyImages[randomColorIndex];
        grid.appendChild(square);
        candies.push(square)

        
    }
 }
  

 createBoard();

 let colorBeingDragged;
 let candyBeingDragged;
 let colorBeingReplaced;
 let candyBeingReplaced;

 candies.forEach(candy =>candy.addEventListener("dragstart",dragStart));
 candies.forEach(candy =>candy.addEventListener("dragend",dragEnd));
 candies.forEach(candy =>candy.addEventListener("dragleave",dragLeave));
 candies.forEach(candy =>candy.addEventListener("drop",dragDrop));
 candies.forEach(candy =>candy.addEventListener("dragover",function(e){
    e.preventDefault();
 }));
 candies.forEach(candy =>candy.addEventListener("dragenter",function(e){
    e.preventDefault();
 }));
 
function dragStart(){
    colorBeingDragged = this.style.backgroundImage;
    candyBeingDragged = parseInt(this.id);
}

function dragLeave(){
    console.log(this.id, "dragLeave");
}

function dragDrop(){
    colorBeingReplaced = this.style.backgroundImage;
    candyBeingReplaced = parseInt(this.id);
  
    this.style.backgroundImage = colorBeingDragged
    candies[candyBeingDragged].style.backgroundImage=colorBeingReplaced;

}

function dragEnd(){
    //what is the valid move we can swipe two adject candies only
    
    let validMoves = [
        candyBeingDragged + 1,
        candyBeingDragged - 1,
        candyBeingDragged + width,
        candyBeingDragged - width
    ]

    console.log(candyBeingReplaced,"In drag End")

    const isValidMove=validMoves.includes(candyBeingReplaced)

    if(candyBeingReplaced && isValidMove){
       // checkingRowforThree();

       candyBeingReplaced=null;
       candyBeingDragged=null;
       colorBeingReplaced=null;
       colorBeingDragged=null;
    }else if(candyBeingReplaced && !isValidMove){
       
        candies[candyBeingDragged].style.backgroundImage=colorBeingDragged;
        candies[candyBeingReplaced].style.backgroundImage=colorBeingReplaced;
    }
}

function generateRandomCandies(){
    let len = width * (width-1);
    for(let i=0; i<len; i++){
        if(candies[i + width].style.backgroundImage === ''){
            candies[i + width].style.backgroundImage = candies[i].style.backgroundImage;
            candies[i].style.backgroundImage = ''
            
            //candy in first row has no background
            if(i < width && candies[i].style.backgroundImage == ''){
                   candies[i].style.backgroundImage = candyImages[
                    Math.floor(Math.random() * candyImages.length)
                ];
            }
         }
    }
}


function checkingRowforFive(){
    let invalidIndex=[];
    const len=width*width-4;

    for(let i = width-4; i<len; i+=width){
        invalidIndex.push(i,i+1,i+2,i+3);
    }


    for(let i=0; i<len; i++){
      let fivecandies = [i, i+1, i+2, i+3,i+4];
      let desiredImage = candies[i].style.backgroundImage;
      
      // if i present in invalidIndex array forget it;
       if(invalidIndex.includes(i)) continue;
      //M2)if i present in last two column then forget it
      //if((i > width-2) && (width-(i % width)==1 || width-(i % width)==2)) continue;

      let match= fivecandies.every(index => desiredImage!= "" && candies[index].style.backgroundImage == desiredImage);
      if(match){
        score += 5;
        // console.log(score);
        fivecandies.forEach(index => candies[index].style.backgroundImage = "")

      }
    
   }
} 

function checkingColumnforFive(){
    let len = width*(width - 4);
   
    for(let i=0; i<len; i++){

      let fivecandies = [i,i+width,i+width*2,i+width*3,i+width*4];
      let desiredImage = candies[i].style.backgroundImage;
      
      // if i present in invalidIndex array forget it;
      //if(invalidIndex.includes(i)) continue;
      //M2)if i present in last two column then forget it
      //if((i > width-2) && (width-(i % width)==1 || width-(i % width)==2)) continue;

      let match= fivecandies.every(index => desiredImage!= "" && candies[index].style.backgroundImage == desiredImage);
      if(match){
        score += 5;
        console.log(score);
        fivecandies.forEach(index => candies[index].style.backgroundImage = "")

      }
     
   }
} 


function checkingRowforFour(){
    let invalidIndex=[];
    const len=width*width-3;

    for(let i = width-3; i<len; i+=width){
        invalidIndex.push(i,i+1,i+2);
    }


    for(let i=0; i<len; i++){
      let fourcandies = [i, i+1, i+2, i+3];
      let desiredImage = candies[i].style.backgroundImage;
      
      // if i present in invalidIndex array forget it;
       if(invalidIndex.includes(i)) continue;
      //M2)if i present in last two column then forget it
      //if((i > width-2) && (width-(i % width)==1 || width-(i % width)==2)) continue;

      let match= fourcandies.every(index => desiredImage!= "" && candies[index].style.backgroundImage == desiredImage);
      if(match){
        score += 4;
        // console.log(score);
        fourcandies.forEach(index => candies[index].style.backgroundImage = "")

      }
    
   }
} 


function checkingColumnforFour(){
    let len = width*(width - 3);
   
    for(let i=0; i<len; i++){

      let fourcandies = [i,i+width,i+width*2,i+width*3];
      let desiredImage = candies[i].style.backgroundImage;
      
      // if i present in invalidIndex array forget it;
      //if(invalidIndex.includes(i)) continue;
      //M2)if i present in last two column then forget it
      //if((i > width-2) && (width-(i % width)==1 || width-(i % width)==2)) continue;

      let match= fourcandies.every(index => desiredImage!= "" && candies[index].style.backgroundImage == desiredImage);
      if(match){
        score += 4;
        console.log(score);
        fourcandies.forEach(index => candies[index].style.backgroundImage = "")

      }
     
   }
} 


 function checkingRowforThree(){
    // M-1)
    let invalidIndex=[];
    const len=width*width-2;
    for(let i = width-2;i<len;i+=width){
        invalidIndex.push(i,i+1);
    }


    for(let i=0;i<len;i++){
      let threecandies = [i,i+1,i+2];
      let desiredImage = candies[i].style.backgroundImage;
      
      // if i present in invalidIndex array forget it;
       if(invalidIndex.includes(i)) continue;
      //M2)if i present in last two column then forget it
      //if((i > width-2) && (width-(i % width)==1 || width-(i % width)==2)) continue;

      let match= threecandies.every(index => desiredImage!= "" && candies[index].style.backgroundImage == desiredImage);
      if(match){
        score += 3;
         console.log(score);
        threecandies.forEach(index => candies[index].style.backgroundImage = "")

      }
    
   }
 } 


function checkingColumnforThree(){
    let len = width*(width - 2);
   
    for(let i=0; i<len; i++){

      let threecandies = [i,i+width,i+width*2];
      let desiredImage = candies[i].style.backgroundImage;
      
      // if i present in invalidIndex array forget it;
      //if(invalidIndex.includes(i)) continue;
      //M2)if i present in last two column then forget it
      //if((i > width-2) && (width-(i % width)==1 || width-(i % width)==2)) continue;

      let match= threecandies.every(index => desiredImage!= "" && candies[index].style.backgroundImage == desiredImage);
      if(match){
        score += 3;
        console.log(score);
        threecandies.forEach(index => candies[index].style.backgroundImage = "")

      }
     
   }
} 



function init(){
     checkingRowforFive();
     checkingColumnforFive();
     checkingRowforFour();
     checkingColumnforFour();
     checkingColumnforThree();
     checkingRowforThree();
     generateRandomCandies();
}
init();



window.setInterval(function() {
    init()
  
},500);


});

