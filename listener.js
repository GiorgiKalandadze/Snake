document.addEventListener("keydown", (e)=>{
    console.log(e.key);
    if(e.key === 'ArrowUp'){
        direction = 'Up';
   
    } else if(e.key === 'ArrowRight'){
        direction = 'Right';
        // move('Right', 10);
    } else if(e.key === 'ArrowDown'){
        direction = 'Down';
        // move('Down', 10);
    } else if(e.key === 'ArrowLeft'){
        direction = 'Left';
        // move('Left', 10);
    } 
});
