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
        r-=1
        r = (r===-1) ? 0 : r
    }else if (btn==="amarillo"){
        c=1-c
    }else if (btn==="azul"){
        r+=1
        r = (r===3) ? 2 : r
    }else if (btn==="verde"){
        c=1-c
    }
    console.log(`r:${r} - c:${c}`)

    document.querySelectorAll(".caja").forEach(e=>{
        e.classList.remove("selected")
    })
    document.querySelector(`.c${c}.r${r}`).classList.add("selected")
})