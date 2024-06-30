let myArrycat = []
let wid = $(".nav-tab ").outerWidth()

getmeals()

$(document).ready(
   $(".loading-1").fadeOut(300)
)


// ------------func get dataapi random meals-------------
async function getmeals(cat = "") {
  
   $(".loading").fadeIn(300)
   let response = await fetch(`https:/www.themealdb.com/api/json/v1/1/search.php?s=${cat}`)
   response = await response.json()
   myArrycat = await response.meals

   console.log(myArrycat);

   displayMeals(myArrycat)
   $(".loading").fadeOut(300)
}
// ------------displaymeal Random-------------
function displayMeals(myArrycat) {
   let data = "";


   for (let i = 0; i < myArrycat.length; i++) {
      if (i < 20) {
         data += `
      <div class="col-md-3">
              <div onclick="getmealdetalbyid('${myArrycat[i].idMeal}')" class="mealcont position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${myArrycat[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3 class=" w-100 text-center">${myArrycat[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `

         console.log("hekki");
      }

   }

   document.getElementById("displymealsRow").innerHTML = data
}


// ------------sidnavbtns-------------
$(".nave-menu").css("left", `-${wid}px`)
$(".btt").animate({top: 200}, 500)
function openSide(){

   $(".nave-menu").animate({
      left: 0
   }, 500)

   document.getElementById("openbt").classList.replace("d-block", "d-none")
   document.getElementById("closebt").classList.replace("d-none", "d-block")


   $(".l1").animate({top: 0}, 600)
   $(".l2").animate({top: 0}, 700)
   $(".l3").animate({top: 0}, 800)
   $(".l4").animate({top: 0}, 900)
   $(".l5").animate({top: 0}, 1000)


}
// $("#openbt").click(openSide())
// -----------func close side-------
function closeside(){

   $(".nave-menu").animate({left: -wid}, 500)

   $(".l1").animate({top: 200}, 1000)
   $(".l2").animate({top: 200}, 900)
   $(".l3").animate({top: 200}, 800)
   $(".l4").animate({top: 200}, 700)
   $(".l5").animate({top: 200}, 600)




   document.getElementById("openbt").classList.replace("d-none", "d-block")
   document.getElementById("closebt").classList.replace("d-block", "d-none")




}
// $("#closebt").click(closeside())
// -------------------------------------






// ------------funcget meal detals by id--------
async function getmealdetalbyid(idme) {
   $(".loading").fadeIn(300)
   let mealdetalsrespor = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idme}`);
   mealdetalsrespor = await mealdetalsrespor.json();
   let mealdDetals = await mealdetalsrespor.meals[0]
   console.log(mealdDetals);
   displyMealdetals(mealdDetals)
   $(".loading").fadeOut(300)
}

// -----------------displymealdetals by id----------------
function displyMealdetals(mealdDetals) {
   document.getElementById("displymealsRow").innerHTML = ""


   let Recipes1 = ''
   for (let i = 1; i <= 20; i++) {
      if (mealdDetals[`strIngredient${i}`] != null && mealdDetals[`strIngredient${i}`] != "") {
         Recipes1 += `<li class="alert ssaa alert-info m-2 p-1">${mealdDetals[`strMeasure${i}`]} ${mealdDetals[`strIngredient${i}`]}</li>`
      }

   }

   let tagggs = ``
   let tags = ``
   if (tags != null && tags != "") {
      tags = mealdDetals.strTags.split(",")
      for (let i = 1; i < tags.length; i++) {
         console.log(tags.length);
         tagggs += `<li class="alert alert-danger ssaa m-2 p-1">${tags[i]}</li>`
      }
   }
   let cartoona = `

<div class="col-md-4 text-black ">
<i id="closeidetals" class="  fa-solid fa-2x fa-x mb-4 ms-4 text-info "></i>
            <img class="w-100 rounded-3" src="${mealdDetals.strMealThumb}"
                alt="">
                <h2 class"text-black">${mealdDetals.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2  class="text-black">Instructions</h2>
            <p  class="text-black ssaa">${mealdDetals.strInstructions}</p>
            <h3  class="text-black"><span class="fw-bolder text-black">Area : </span>${mealdDetals.strArea}</h3>
            <h3  class="text-black"><span class="fw-bolder text-black">Category : </span>${mealdDetals.strCategory}</h3>
            <h3  class="text-black">Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap ssaa">
            ${Recipes1}
              
            </ul>

            <h3  class="text-black">Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
           ${tagggs}
            </ul>

            <a target="_blank" href="${mealdDetals.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${mealdDetals.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`

   document.getElementById("displymealsRow").innerHTML = cartoona
   $("#closeidetals").click(function () {
      document.getElementById("displymealsRow").innerHTML = ""

      getmeals()
   })
}
// ----------fun get by category-------

async function getbyCategory(categ="Seafood") {
   $(".loading").fadeIn(300)
   closeside()
   document.getElementById("displymealsRow").innerHTML = ""
   

   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`)
   response = await response.json()
   let categDatalist = await response.meals

   console.log(categDatalist);
 
    displayMeals(categDatalist)
   $(".loading").fadeOut(300)
}

// ----------func get categori list---------



async function getCategorydata() {
   $(".loading").fadeIn(300)
   closeside()
   document.getElementById("displymealsRow").innerHTML = ""
   

   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
   response = await response.json()
   let categData = await response.categories
   console.log(categData);
   
   displayCategories(categData)
   $(".loading").fadeOut(300)
}



// -------------------func disply by categories---------
function displayCategories(cateeg) {
   let dat = "";
   
   document.getElementById("displymealsRow").classList.remove("d-none")
   document.getElementById("displyContact").classList.add("d-none")

   document.getElementById("searchBtns").classList.replace("d-block", "d-none")
   for (let i = 0; i < cateeg.length; i++) {
      dat += `
       <div class="col-md-3">
               <div onclick="getbyCategory('${cateeg[i].strCategory}')" class="mealcont position-relative overflow-hidden rounded-2 cursor-pointer">
                   <img class="w-100" src="${cateeg[i].strCategoryThumb}" >
                   <div class="meal-layer position-absolute text-center text-black p-2">
                       <h3 class="text-danger w-100 text-center">${cateeg[i].strCategory}</h3>
                       <p class="">${cateeg[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                   </div>
               </div>
       </div>
       `
   }

   document.getElementById("displymealsRow").innerHTML = dat
}


// ---------------func get meal by area-------------
async function getMealsbyArea() {
   
   $(".loading").fadeIn(300)
   closeside()
   document.getElementById("displymealsRow").innerHTML = ""
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
   response = await response.json()
   let areaaList = response.meals
   console.log(response);
   
   displayArea(areaaList)
   $(".loading").fadeOut(300)
}
// ----------------display area list-----------------
function displayArea(aree) {
   let areaList = "";
   
   document.getElementById("displymealsRow").classList.remove("d-none")
   document.getElementById("displyContact").classList.add("d-none")

   document.getElementById("searchBtns").classList.replace("d-block", "d-none")
   for (let i = 0; i < aree.length; i++) {
      areaList += `
       <div class="col-md-3">
               <div onclick="getMealsbycontrry('${aree[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                       <i class="fa-solid text-black fa-house-laptop fa-4x"></i>
                       <h3 class="text-black">${aree[i].strArea}</h3>
               </div>
       </div>
       `
   }

   document.getElementById("displymealsRow").innerHTML = areaList
}

// -------------disply meal by contry-------------

async function getMealsbycontrry(contrry = "Filipino") {
   document.getElementById("displymealsRow").innerHTML = ""


   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${contrry}`)
   response = await response.json()
   arrybycontry = await response.meals
   console.log(response);
   // displayMeals(myArrycat)
   // displayMeals(response.meals.slice(0, 20))
   // $(".inner-loading-screen").fadeOut(300)
   displayMeals(arrybycontry)
}

// ------------------func get ingredins----------

async function getMealsingredientsList(ingredients) {
   $(".loading").fadeIn(300)
   closeside()
   document.getElementById("displymealsRow").innerHTML = ""
  
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
   response = await response.json()
   let ingrdlist = await response.meals

   console.log(ingrdlist);
   displayIngredientsList(ingrdlist)
   $(".loading").fadeOut(300)
}


// ------------------displyingredientsList--------
function displayIngredientsList(ingg) {
   let dataingred = "";
   
   document.getElementById("displymealsRow").classList.remove("d-none")
   document.getElementById("displyContact").classList.add("d-none")

   document.getElementById("searchBtns").classList.replace("d-block", "d-none")
   for (let i = 0; i < 20; i++) {
      // let sp =""
      // splio()
      // async function splio(){
      //    console.log(pp);
      // let pp = await ingg[i].strDescription
      // sp = await pp.split(" ").slice(0,20).join(" ")
      
      // }
      dataingred += `
       <div class="col-md-3 h-25">
               <div onclick="displyFromeingred('${ingg[i].strIngredient}')" class="rounded-2 text-black text-center cursor-pointer">
                       <i class="fa-solid text-black fa-drumstick-bite fa-4x"></i>
                       <h3 class="text-black">${ingg[i].strIngredient}</h3>
                       <p class="text-black qqq">${ingg[i].strDescription?.split(" ").slice(0,20).join(" ")}</p>
               </div>
       </div>
       `
   }
   // .split(" ").slice(0,20).join(" ")
   document.getElementById("displymealsRow").innerHTML = dataingred
}

// ------------------function displyFromeingred-----------

async function displyFromeingred(ingredients) {
   $(".loading").fadeIn(300)
   closeside()
   document.getElementById("displymealsRow").innerHTML = ""

   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
   response = await response.json()
   let listOfresp = response.meals.slice(0, 20)
   displayMeals(listOfresp)
   $(".loading").fadeOut(300)

}

// -------------func search byName---------------

async function searchByName(term) {
   $(".loading").fadeIn(300)
   closeside()
   document.getElementById("displymealsRow").innerHTML = ""
   

   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
   response = await response.json()

   response.meals ? displayMeals(response.meals) : displayMeals([])
   $(".inner-loading-screen").fadeOut(300)
   $(".loading").fadeOut(300)

}

// -------------open search butns-----
function Searchbtns() {
   $(".loading").fadeIn(300)
   closeside()

   document.getElementById("displymealsRow").innerHTML = ""
   document.getElementById("searchBtns").classList.replace("d-none", "d-block")

   document.getElementById("displymealsRow").classList.remove("d-none")
   document.getElementById("displyContact").classList.add("d-none")
   $(".loading").fadeOut(300)

}



// ----------btncloseSearch----------
$("#closeSerach").click(function () {
   $(".loading").fadeIn(300)
   document.getElementById("searchBtns").classList.replace("d-block", "d-none")
   document.getElementById("displymealsRow").classList.remove("d-none")
   document.getElementById("displyContact").classList.add("d-none")

   getmeals()
   $(".loading").fadeOut(300)
})

// ----------------func search by name----------
async function getDatabybyName(Name) {
   $(".loading").fadeIn(300)

   document.getElementById("displymealsRow").innerHTML = ""

  

   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`)
   response = await response.json()
   let dataByname = response.meals
 
   displayMeals(dataByname)
   $(".loading").fadeOut(300)
}


// ----------------func search by chart----------
async function getDatabybychart(chart) {
   $(".loading").fadeIn(300)
   document.getElementById("displymealsRow").innerHTML = ""


   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${chart}`)
   response = await response.json()
   let dataBychart = response.meals
   
   displayMeals(dataBychart)
   $(".loading").fadeOut(300)
}



// -------------func show contact------------
function showContact() {
   $(".loading").fadeIn(300)
   $(".nave-menu").animate({
      left: -wid
   }, 300)
   document.getElementById("openbt").classList.replace("d-none", "d-block")
   document.getElementById("closebt").classList.replace("d-block", "d-none")
   // document.getElementById("displymealsRow").innerHTML=""
   document.getElementById("searchBtns").classList.replace("d-block", "d-none")
   document.getElementById("displymealsRow").classList.add("d-none")
   document.getElementById("displyContact").classList.remove("d-none")
   $(".loading").fadeOut(300)
}



// ---------------validations------------
function valdistionss() {
   if (a == 1 && b == 1 && c == 1 && d == 1 && e == 1 && f == 1

   ) {
      document.getElementById("submitBtn").removeAttribute("disabled")
   } else {
      submitBtn.setAttribute("disabled", true)
   }

}
let passwordInput = document.getElementById("passwordInput")
let a = ""
let b = ""
let c = ""
let d = ""
let e = ""
let f = ""

function validName() {

   let nameinp = document.getElementById("nameInput")
   let nameAlertt = document.getElementById("nameAlert")
   let rgexx = /^[a-zA-Z ]+$/
   if (rgexx.test(nameinp.value) == true) {
      nameinp.classList.add("is-valid")
      nameinp.classList.remove("is-invalid")
      nameAlertt.classList.add("d-none")
      nameAlertt.classList.remove("d-block")
      a = 1

   } else {
      nameinp.classList.add("is-invalid")
      nameinp.classList.remove("is-valid")
      nameAlertt.classList.add("d-block")
      nameAlertt.classList.remove("d-none")
      a = 0
   }
   valdistionss()
}

function validEmail() {

   let emailInput = document.getElementById("emailInput")
   let emailAlert = document.getElementById("emailAlert")
   let rgexx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   if (rgexx.test(emailInput.value) == true) {
      emailInput.classList.add("is-valid")
      emailInput.classList.remove("is-invalid")
      emailAlert.classList.add("d-none")
      emailAlert.classList.remove("d-block")
      b = 1
   } else {
      emailInput.classList.add("is-invalid")
      emailInput.classList.remove("is-valid")
      emailAlert.classList.add("d-block")
      emailAlert.classList.remove("d-none")
      b = 0
   }
   valdistionss()
}

function validPhone() {

   let phoneInput = document.getElementById("phoneInput")
   let phoneAlert = document.getElementById("phoneAlert")
   let rgexx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
   if (rgexx.test(phoneInput.value) == true) {
      phoneInput.classList.add("is-valid")
      phoneInput.classList.remove("is-invalid")
      phoneAlert.classList.add("d-none")
      phoneAlert.classList.remove("d-block")
      c = 1
   } else {
      phoneInput.classList.add("is-invalid")
      phoneInput.classList.remove("is-valid")
      phoneAlert.classList.add("d-block")
      phoneAlert.classList.remove("d-none")
      c = 0
   }
   valdistionss()
}

function validAge() {

   let ageInput = document.getElementById("ageInput")
   let ageAlert = document.getElementById("ageAlert")
   let rgexx = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
   if (rgexx.test(ageInput.value) == true) {
      ageInput.classList.add("is-valid")
      ageInput.classList.remove("is-invalid")
      ageAlert.classList.add("d-none")
      ageAlert.classList.remove("d-block")
      d = 1
   } else {
      ageInput.classList.add("is-invalid")
      ageInput.classList.remove("is-valid")
      ageAlert.classList.add("d-block")
      ageAlert.classList.remove("d-none")
      d = 0
   }
   valdistionss()
}

function validPassword() {

   let passwordInput = document.getElementById("passwordInput")
   let passwordAlert = document.getElementById("passwordAlert")
   let rgexx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
   if (rgexx.test(passwordInput.value) == true) {
      passwordInput.classList.add("is-valid")
      passwordInput.classList.remove("is-invalid")
      passwordAlert.classList.add("d-none")
      passwordAlert.classList.remove("d-block")
      e = 1
   } else {
      passwordInput.classList.add("is-invalid")
      ageInput.classList.remove("is-valid")
      passwordAlert.classList.add("d-block")
      passwordAlert.classList.remove("d-none")
      e = 0
   }
   valdistionss()
}

function validRepatpassword() {

   let repasswordInput = document.getElementById("repasswordInput")
   let repasswordAlert = document.getElementById("repasswordAlert")
   let rgexx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
   if (rgexx.test(repasswordInput.value) == true && repasswordInput.value == passwordInput.value) {
      repasswordInput.classList.add("is-valid")
      repasswordInput.classList.remove("is-invalid")
      repasswordAlert.classList.add("d-none")
      repasswordAlert.classList.remove("d-block")
      f = 1
   } else {
      repasswordInput.classList.add("is-invalid")
      ageInput.classList.remove("is-valid")
      repasswordAlert.classList.add("d-block")
      repasswordAlert.classList.remove("d-none")
      f = 0
   }
   valdistionss()
}