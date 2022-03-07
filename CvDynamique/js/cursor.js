var cursor = document.getElementById("cursor");
cursor.style.transition = "linear 0.1s";
document.onmousedown = () => {
    cursor.style.transform = "scale(0.4)";
};

document.onmouseup = () => {
    cursor.style.transform = "scale(1)";
};

document.onmousemove = (e) => {
    cursor.style.top = ((e.clientY - 15) + "px");
    cursor.style.left = ((e.clientX) + "px");
};