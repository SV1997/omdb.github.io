//variable decleration
const dropdownBtn = document.getElementById("btn");
const dropdownMenu = document.getElementById("dropdown");
const toggleArrow = document.getElementById("arrow");
const topdrawyer = document.getElementById("toggle");
const menu = document.getElementById("menu");
const closemenu = document.getElementById("closeshow");
const OMDB_URL = "https://www.omdbapi.com/?apikey=9dea3e84";
const parameters = document.querySelectorAll(".dropdown span");
const toggleleft = document.querySelector("#toggleleft");
const toggleright = document.querySelector("#toggleright");
const find=document.getElementById("search");
const searchResult=document.getElementById('searchResult');
let presentslide=0;
let currentslide = 0;
let currentpos=0;
let urls=[];
let ids=[];
let ids1=[];
let favdiv=document.getElementById("fav");
const img = document.getElementById("poster");
// Toggle dropdown function
const toggleDropdown = function () {
  dropdownMenu.classList.toggle("show");
  toggleArrow.classList.toggle("arrow");
};
let obj = {
  params: "",
  type: "",
};
// Toggle dropdown open/close when dropdown button is clicked and choose the type of search
function dropdownValue (e) {
  e.stopPropagation();
  toggleDropdown();
  for (let i = 0; i < parameters.length; i++) {
    parameters[i].addEventListener("click", function (e) {
      // e.stopPropagation();
      let value = e.target.id;
      if (value === "titles") {
        obj.params = "t";
        obj.type = "m";
      } else if (value === "episode") {
        obj.params = "t";
        obj.type = "episode";
      } else if (value === "series") {
        obj.params = "t";
        obj.type = "series";
      } else if (value === "imdbs") {
        obj.params = "i";
        obj.type = "";
      } else {
        obj.params = "s";
        obj.type = "";
      }
      console.log(obj);
    });
  }}
;
// insert Random images in the application 
function insertImages(imageData) {
    currentslide++;
  let div = document.createElement("div");
  div.innerHTML = `
<img src="${imageData.Poster}" class="postersize" alt="">
<div class="shadowmain"><i class="fa-solid fa-play fa-6x playrandom" style="color: white;"></i>
<div class="imagedata">
<div>Title:${imageData.Title}</div>
<div>Year:${imageData.Year}</div>
<div>Rating:${imageData.Rated}</div>
<div>Runtime:${imageData.Runtime}</div>
</div>
</div>
`;
  console.log(div);
  div.classList.add("slides");
  div.id = "slide" + currentslide;
  document.getElementById("innershow").append(div);
  aside();
  return currentslide;
  
}
// help in right slide of Random images
function sliderabc(){
    console.log(currentpos);
    let current = document.querySelectorAll(".slides");
    let currentslider=document.getElementById("slide"+currentslide);
    let px=currentpos;
    let movement = setInterval(function () {
      px++;
      for (let i = 0; i < current.length; i++) {
        current[i].style.right = px + "px";
      }
      if (px >= currentpos) {
        clearInterval(movement);
      }
    }, 1);
    currentpos=currentpos+800;
    aside();
}
// shift the images to left side
function shiftleft(){
    // console.log(currentslide);
    let current = document.querySelectorAll(".slides");
    let currentslider=document.getElementById("slide"+currentslide);
    let px = currentpos;
    console.log(px);
    let movement = setInterval(function () {
      px--;
      for (let i = 0; i < current.length; i++) {
        current[i].style.right = px + "px";
      }
      if (px <=currentpos) {
        clearInterval(movement);
      }
    }, 1);
    currentpos=currentpos-800;
}
// Close dropdown when dom element is clicked
document.documentElement.addEventListener("click", function () {
  if (dropdownMenu.classList.contains("show")) {
    toggleDropdown();
  }
});
// open and show the menu part
menu.addEventListener("click", function () {
  topdrawyer.classList.add("show");
});
//close menu
closemenu.addEventListener("click", function () {
  topdrawyer.classList.remove("show");
});
// console.log(parameterSelector);
// generate random url
function parameterSelector() {}
function createrandomurl() {
  const randomID = `tt${Math.floor(Math.random() * 10000000)}`;
  return `${OMDB_URL}&i=${randomID}`;
}
// create random images it takes time as some urls produced in createrandomurl function are invalid  
function Randomimages() {
  let ret = 0;
  const randomURL = createrandomurl();
  fetch(randomURL)
    .then((response) => {
      if (response) {
        return response.json();
      } else {
       ret= Randomimages();
      }
    })
    .then((user) => {
      if (user.Poster != "N/A" && user.Response != "False") {
        console.log(user);
        let run = insertImages(user);
        if(run!=1){
        sliderabc();
        }
        console.log("in");
      } else {
        ret = Randomimages();
      }
      console.log(user);
      console.log(user.Poster === "N/A");
    });
  return ret;
}
// show the result of search
function inputresult(address,index){
  let div=document.createElement('div');
  div.innerHTML=`
  <img class="resultsimage" id="searchPoster${index}" src='${address.Poster}'>
  <i class="fa-regular fa-heart" id="fav${index}" data-id="searchPoster${index}" style="color: #dc182c;"></i>
  <div class="searchimagedata">
<div>Title:${address.Title}</div>
<div>Year:${address.Year}</div>
<div>Rating:${address.Rated}</div>
<div>Runtime:${address.Runtime}</div>
<a id="senddata" data-id="searchPoster${index}">Read More</a>
</div>
</div>`;
  ids1.push({id:"searchPoster"+index,
              data:address})
  div.classList.add("inputresult")
  searchResult.append(div);
}
// add favourite movie to storage
function addTostorage(id){
  let id1=ids1.filter(function(id1){
    return id===id1.id;
  })
  let imageid=document.getElementById(id);
  let imgad=id1[0].data.Poster;
  console.log(imageid);
  urls.push(id1[0]);
  ids.push(id);
  console.log(id1[0]);
  localStorage.setItem(id,JSON.stringify(id1[0]));
  displayfav();
}
// add fav movie from local storage to DOM
function addToFav(){
let keys=Object.keys(localStorage);
for(let i=0;i<keys.length-1;i++){
  let url=localStorage.getItem(keys[i+1]); 
  console.log(url);
  urls.push(JSON.parse(url));
  ids.push(keys[i+1]);
}
displayfav();
}
// show favourite movie on DOM
function displayfav(){
  favdiv.innerHTML="";
  console.log(urls)
  for(let i=0;i<ids.length;i++){
    console.log(urls[i], ids[i]);
  let setfav=document.createElement("img");
  let del=document.createElement('span');
  del.innerHTML=`
  <i class="fa-solid fa-trash" data-id="${ids[i]}" style="color: #ffffff;"></i>`;
  setfav.setAttribute('src',urls[i].data.Poster);
  setfav.id="favimg"+i;
  favdiv.append(setfav);
  favdiv.append(del);
  }
}
// search movie entered and fetch data using API
function searchSpecific(){
  if(obj.params==""&&obj.type==""){
    alert("Select type first")
  }
  else{
    let value=(find.value)
    value=value.split(" ").join("+");
 let realurl=`${OMDB_URL}&${obj.params}=${value}`
    fetch(realurl).then((response)=>{
     return response.json();
    }).then((user)=>{
      console.log(user)
      let div=document.createElement('div');
      searchResult.innerHTML="";
      div.innerHTML=`Total number of results found ${user.totalResults}`;
      searchResult.append(div);
      div.classList.add("results");
      if(obj.params=='s'){
      let arr=user.Search;
      for(let i=0;i<arr.length;i++){
        inputresult(arr[i],i);
      }
      }
      else{
        inputresult(user,1)
      }
    })
  }
}
// delete movie from fav list 
function deletefav(id,url){
  var str = id;
  var c = '0123456789'
      function check(x) {
                        return c.includes(x)  ? true : false;
                    }
            var matches = [...str].reduce((x, y) => check(y) ? x+y : x, '')
matches=parseInt(matches);
            let url1=urls.filter(function(url1){
  return url1!=url;
})
console.log(url1)
let id1=ids.filter(function(id1){
  return id1!=id;
})
if(document.getElementById("fav"+matches)!=null){
document.getElementById("fav"+matches).classList.remove("fa-solid");
}
urls=url1;
ids=id1;
displayfav();
}

// shor random images generated on aside
function aside(){
  let aside1=new Array(3);
  for(let i=0;i<3;i++){
    aside1[i]=document.querySelector("#slide"+(currentslide-2+i)+" img");
  }
  console.log(aside1);
  console.log(document.getElementById("slide"+currentslide))
  console.log(currentslide)
  if(aside1[0]){
    let source1=aside1[0].getAttribute("src");
    console.log(source1);
    document.getElementById("aside1").setAttribute("src",source1);
  }
  if(aside1[1]){
    let source1=aside1[1].getAttribute("src");
    console.log(source1);
    document.getElementById("aside2").setAttribute("src",source1);
  }
  if(aside1[2]){
    let source1=aside1[2].getAttribute("src");
    console.log(source1);
    document.getElementById("aside3").setAttribute("src",source1);
  }
}
// show information when selected
function extendedinfo(info){
  let ext=document.getElementById("extended");
  let det=document.getElementById("details");
  det.innerHTML="";
  let div1=document.createElement('div');
  console.log(info[0])
  div1.innerHTML=`
  <div><img class="resultsimage" src="${info[0].data.Poster}"/></div>
  <div>Title:${info[0].data.Title}</div>
  <div>Year:${info[0].data.Year}</div>
  <div>Rating:${info[0].data.Rated}</div>
  <div>Runtime:${info[0].data.Runtime}</div>
  <div>Plot:${info[0].data.Plot}</div>
  <span class="close">X</span>`
  // console.log(div1);
  det.append(div1);
  let px=0;
  ext.style.left=-100+"%";
  let movement=setInterval(function(){
    px=parseInt(ext.style.left);
    px++;
    console.log(ext.style.left);
    ext.style.left=px+"%"
    if(px>=0){
      clearInterval(movement);
    }
  },1);
}
// collapse information div 
function collapseinfo(){
  let ext=document.getElementById("extended");
  let px=0;
  let movement=setInterval(function(){
    px=parseInt(ext.style.left);
    px--;
    console.log(ext.style.left);
    ext.style.left=px+"%"
    if(px<=-100){
      clearInterval(movement);
    }
  },10);
}
// event listener for start of file
document.addEventListener("DOMContentLoaded", function () {
  Randomimages();
  addToFav();
});
// catch click event
document.addEventListener("click", function (e) {
  console.log(e.target.className);
  if (e.target.className == "fa-solid fa-chevron-right fa-4x") {
  console.log(presentslide, currentslide)
    presentslide++;
    if(presentslide<currentslide){
      console.log("current")
      sliderabc();
    }
    else{
      console.log("random")
      Randomimages();
    }
  }
  if(e.target.id==="senddata"){
    let idsend=e.target.dataset.id;
    let info=ids1.filter(function(obj){
      if(obj.id===idsend){
        return obj.data;
      }
    })
    extendedinfo(info);
  }
  if(e.target.className==="fa-solid fa-chevron-left fa-4x"){
    presentslide--;
    shiftleft();
  }
  if(e.target.id=='find'){
    console.log("search")
    searchSpecific();
  }
  if(e.target.id=='btn'){
    console.log("dropdown")
    dropdownValue(e);
  }
  if(e.target.className=="fa-regular fa-heart"){
      document.getElementById(e.target.id).classList.add("fa-solid");
    addTostorage(e.target.dataset.id);
  }
  if(e.target.className=="fa-solid fa-trash"){
    let id=e.target.dataset.id;
    let url=document.getElementById(id);
    console.log(url);
    deletefav(id,url);
    localStorage.removeItem(e.target.dataset.id);
  }
  if(e.target.className=="close"){
    collapseinfo();
  }
});
// mouseover event catch
document.addEventListener('mouseover',function(e){
  // console.log(e.target.className);
  if(e.target.className==="fa-solid fa-play fa-6x playrandom"){
    document.querySelector(".shadowmain i").style.color="yellow";
  }
})
// mouseout event catch
document.addEventListener('mouseout',function(e){
  // console.log(e.target.className);
  if(e.target.className==="fa-solid fa-play fa-6x playrandom"){
    document.querySelector(".shadowmain i").style.color="white";
  }
})
// generate and move random images 
setInterval(function(){
Randomimages();
},20000)
