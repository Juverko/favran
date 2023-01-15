function start(){
  slider('.favor-product .slider','.favor-product .next','.favor-product .prev',460);
  slider('.footer .slider .products','.footer .next','.footer .prev',220,true);
}

function slider(slider,next,prev,sliderSch,bool){
  let slCh = 0;
  let ch = 0;
  sliderSch = (document.querySelector(slider).children[0].offsetLeft*2)+document.querySelector(slider).children[0].offsetWidth;
  if((document.querySelector(slider).children.length*sliderSch>window.screen.width && bool) || !bool){
    let st = setInterval(()=>{
      if(slCh>=document.querySelector(slider).children.length-2 && !bool){
        clearInterval(st);
        slCh=document.querySelector(slider).children.length-2;
      }else if(bool && ch>=document.querySelector(slider).children.length*sliderSch-window.screen.width){ 
        clearInterval(st);
      }else{
        ch+=sliderSch;
        slCh++;
        document.querySelector(slider).style.transform = `translateX(-${ch}px)`;
      }
    },4000)
    document.querySelector(prev).addEventListener("click",function(e){
      e.preventDefault();
      ch-=sliderSch;
      slCh--;
      if(ch<=0){
        ch=0;
        slCh=0;
      }
      console.log(ch);
      document.querySelector(slider).style.transform = `translateX(-${ch}px)`;
    })
    document.querySelector(next).addEventListener("click",function(e){
      e.preventDefault();
      if(slCh>=document.querySelector(slider).children.length-2 && !bool){
        slCh = document.querySelector(slider).children.length-2;
      }else if(bool && ch>=document.querySelector(slider).children.length*sliderSch-window.screen.width){
        return false;
      }else{
        ch+=sliderSch;
        // console.log(ch);
        document.querySelector(slider).style.transform = `translateX(-${ch}px)`;
        slCh++;
      }
    })

  }
  

  

  
}
start();


