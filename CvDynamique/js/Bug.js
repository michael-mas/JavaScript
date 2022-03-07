var b = document.querySelector("span");
var r = document.getElementById("RepairBtn");
const element = document.getElementById("MagicBtn");
const Rep = document.getElementById("RepairBtn");

element.addEventListener("click", Bug);

function Bug() { 
b.setAttribute("id", "cursor");
r.setAttribute("style","visibility:visible");
}

Rep.addEventListener("click", Repair);

function Repair() { 
    b.removeAttribute("id", "cursor");
    r.setAttribute("style","visibility:hidden");
    }