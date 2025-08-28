connect2Server();

let r=0
let c=0

receive("boton", (btn)=>{
    if(btn==="ok"){
        if(r===0){
            (c===0) ? window.location.href="../JUEGO 1/expli1.html" : window.location.href="../JUEGO 4/expli4.html"
        }else if(r===1){
            (c===0) ? window.location.href="../JUEGO 2/expli2.html" : window.location.href="../JUEGO 5/expli5.html"
        }else if(r===2){
            (c===0) ? window.location.href="../JUEGO 3/expli3.html" : window.location.href="../JUEGO 6/expli6.html" 
        }
    }else if(btn==="rojo"){
        row-=1
        row = (row===-1) ? 0 : row
    }else if (btn==="amarillo"){
        col=1-col
    }else if (btn==="azul"){
        row+=1
        row = (row===3) ? 2 : row
    }else if (btn==="verde"){
        col=1-col
    }

    document.querySelectorAll(".caja").forEach(e=>{
        e.classList.remove("selected")
    })
    document.querySelector(`.c${col}.r${row}`)
})