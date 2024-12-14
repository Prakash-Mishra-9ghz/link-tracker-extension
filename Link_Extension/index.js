let myleads = []
const inputBtn = document.getElementById("input-btn")
const inputEL = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads"))
if(leadsfromlocalstorage){
    myleads = leadsfromlocalstorage
    render(myleads)
}

// const tabs = [
//     {url: "https://google.com"}
// ]

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        render(myleads)
    })

})

function render(leads){
    let listItems = ""
    for(let i = 0;i<leads.length;i++){
        // listItems += "<li> <a target='_blank' href='"+ myleads[i] +"'>" + myleads[i] + "</a></li>"
        listItems += `
            <li> 
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <button class="remove-btn" data-index="(${i})">Remove</button>
            </li>
            `
    }
    ulEl.innerHTML = listItems

    const removeButtons = document.querySelectorAll('.remove-btn')
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index')
            removeLead(index)
        })
    })
}

function removeLead(index){
    myleads.splice(index,1)
    localStorage.setItem("myleads",JSON.stringify(myleads))
    render(myleads)
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myleads = []
    render(myleads)
})

inputBtn.addEventListener("click",function(){
    myleads.push(inputEL.value)
    inputEL.value = ''
    localStorage.setItem("myleads",JSON.stringify(myleads))
    render(myleads) 
    
})


