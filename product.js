async function start(){
  // slider('.favor-product .slider','.favor-product .next','.favor-product .prev',460);
  await fetch(`https://favran-client-service-backend.000webhostapp.com/v1/categories`).then(async data=>{
    let categories = await data.json();
    categories = categories.response;
    // console.log(categories);
    let ul = document.createElement('ul');
    ul.classList.add('menu');
    console.log(categories);
    categories.forEach(categ=>{
      ul.innerHTML+=`<li>
        <a href="" data-id="${categ.slug}">${categ.name}</a>
      </li>`;
    })
    document.querySelector('.burger').appendChild(ul);
    let moreCategory = document.createElement("div");
    moreCategory.classList.add("more-category");
    ul.childNodes.forEach(a=>{
      a = a.children[0];
      a.addEventListener("mouseover",function(){
        let ul = document.createElement("ul");
        // console.log(this);
        categories.forEach(categ=>{
          if(categ.slug==this.getAttribute("data-id")){
            categ.children.forEach(cat1=>{
              let li2 = ``;
              // console.log(cat1);
              cat1.children_recursive.forEach(cat2=>{
                li2+=`<a href="" data-id="${cat2.slug}">${cat2.name}</a>`;
              })
              
              ul.innerHTML+=`
              <li>
                <a href="" data-id="${cat1.slug}">${cat1.name}</a>
                ${li2}
              </li>`;
            })
            // ul.innerHTML+=`
            // <li>
            //   <a data-id="${categ.slug}">${categ.name}1</a>
            //   <a data-id="${categ.slug}">${categ.name}1</a>
            //   <a data-id="${categ.slug}">${categ.name}1</a>
            // </li>
            // <li>
            //   <a>${categ.name}2</a>
            //   <a>${categ.name}2</a>
            // </li>
            // <li><a>${categ.name}3</a></li>
            // <li>
            //   <a>${categ.name}4</a>
            //   <a>${categ.name}4</a>
            //   <a>${categ.name}4</a>
            // </li>`;
          }
        })
        moreCategory.innerHTML='';
        moreCategory.appendChild(ul);
      })
    })
    document.querySelector('.burger').appendChild(moreCategory);
    document.querySelector(".category-burger").addEventListener("click",async function(e){
      e.preventDefault();
      document.querySelector('.burger #close').addEventListener("click",function(ee){
        ee.preventDefault();
        document.querySelector('.burger').style.left ="-100%";
      })
      document.querySelector('.burger').style.left = 0;
    })
  })
}




async function createBlocks(fetchURL,header,parentBlock){
  let blocks = document.createElement('div');
  blocks.classList.add('category-block');
  blocks.innerHTML = `
  <div class="category-header">
    <p>${header}</p>
  </div>
  <div class="slider"> 
    <a href="" class="buttons prev"><</a>
    <a href="" class="buttons next">></a>
    <div class="products">
      
    </div>
  </div>
  
  `;
  let res = await fetch(fetchURL).then(async res=>{
    console.log(res.status);
    if(res.status!=200){
      alert("УУУУПС а вот и пиздец!!!");
      window.location='';
    }
    return await res.json()
  });
  res.response.forEach(product => {
    // console.log(product);
    let block = document.createElement("div");
    block.classList.add('product');
    block.innerHTML=`
      
    `;
    blocks.children[1].children[2].innerHTML+=`
      <div class='product'>
        <div class="discont">35%</div>
        <img src="${product.image}" alt="">
        <div class="prod-name">${product.name}</div>
        <div class="coast">
          <div class="prod-coast">${product.price}TJS</div>
          <div class="prod-old-coast">${product.price}TJS</div>
        </div>
        <div class="prod-market">Магазин: ${product.shop}</div>
        <a href="" class="buy">заказать</a>
      </div>
      
    `
  });
  
  parentBlock.appendChild(blocks);
  slider('.footer .slider .products','.footer .next','.footer .prev',220,true);
}

async function salom(){
  let res = await fetch(`https://favran-client-service-backend.000webhostapp.com/v1/products/may-carter`).then(async res=>{
    return await res.json();
  })
  console.log(res);  
}



async function addBannerTop(){
  await fetch(`https://favran-client-service-backend.000webhostapp.com/v1/banners`).then(async res=>{
    let banner = await res.json();
    banner = banner.response.image;
    document.querySelector('.reklama img').src = banner;
  });
}


async function superSale(){
  await fetch(`https://favran-client-service-backend.000webhostapp.com/v1/superSale`).then(async data=>{
    let products = await data.json();
    products = products.response;
    // console.log(products);
    let sliderBlock = document.querySelector('.favor-product .slider');
    products.forEach(product=>{
      // console.log(product);
      sliderBlock.innerHTML += `
      <div class="product">
      <img src="img/30065649b.webp" alt="">
      <div class="product-info">
        <div class="discont">
          <p>Скидка</p>
          <p>${Math.round(product.discount*100/product.final_price)}%</p>
        </div>
        <div class="coast">
          <div class="prod-coast">${product.final_price}TJS</div>
          <div class="prod-old-coast">${product.final_price-product.discount}TJS</div>
        </div>
        <div class="prod-name">${product.brand} ${product.name}</div>
        <div class="prod-market">Магазин:${product.shop}</div>
        <a href="" class="buy">заказать</a>
      </div>
    `;
    })
    slider('.favor-product .slider','.favor-product .next','.favor-product .prev',460);
  })
}


createBlocks(`https://favran-client-service-backend.000webhostapp.com/v1/randomCategory`,'Топ продукты',document.querySelector('.footer'));

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

async function getStatrted(){
  await addBannerTop();
  await superSale();
  await salom();
  await start();
}
getStatrted();

