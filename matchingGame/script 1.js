const COLORS = ["black","blue","red","yellow","lime","magenta","cyan","orange","Brown","Coral","DarkGreen","DeepPink","DeepSkyBlue","Gold","Navy"];
let colors_use = []
let board = [];
let visible = [];
let active = [];
var count = 1;

const make_div = (x,y,id) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.id = "s"+ id;
    div.style.position = "absolute";
    div.style.width = "90px";
    div.style.height = "90px";
    div.style.left = (1+x)*100 + "px";
    div.style.top = (1+y)*100+"px";
    div.style.background = "white"
    div.textContent = id+1
    div.onclick = () => {update_board(id); /* each div allocated this function */
    };
    
};

const matches = () => {     // assumes (active.length == 2)
    return (board[active[0]] == board[active[1]]);
}

const update_board = (id) => {
    if (active.length == 2) { /* comparing the 2 clicks */
        if (!matches()) {
            visible[active[0]] = false;
            visible[active[1]] = false;
        }
        active = [];
        document.getElementById("countDisplay").innerHTML=count ++;
        
    } else if (!visible[id]) { /* for 1 click */
        visible[id] = true;
        active.push(id);
    }
    var n = document.getElementById("mySelect").textContent;
    console.log(visible)
    update_draw(n);
};

const update_draw = (n) => { 
    for (let id = 0; id<n; id++){
        const div = document.getElementById("s"+id);
        div.style.background = visible[id] ? colors_use[board[id]] : "white";
        div.style.outline = "none";
    }
    if (active.length == 2) {
        const outline = "10px solid " + (matches() ? "gold" : "grey");
        document.getElementById("s" + active[0]).style.outline = outline;
        document.getElementById("s" + active[1]).style.outline = outline;
    }
};

const delete_board = () => {
    var n = colors_use.length*2;
    for (let id = 0; id<n; id++) {
        if (document.getElementById("s"+id)){;
            document.getElementById("s"+id).remove();
            } // at the start cannot delete nothing
    }
}

const slider_func = () => {
    slider.addEventListener("input", function(){
        document.getElementById("mySelect").textContent = slider.value;
      });
};

/*setting up board*/
const reset_board = () => {
    slider_func();
    delete_board(); // delete entire board
    active = [];
    colors_use = [];
    count = 1;
    var n = document.getElementById("mySelect").textContent;
    sq_rt = Math.floor(Math.sqrt(n));


    for (let id = 0; id < n; id++){
        board[id] = (Math.floor(id/2)); 
        visible[id] = false;
    };

    for (let i=0; i<[n/2]; i++) { // add colors to use in this game
        colors_use.push(COLORS[i]);
    };

    for (let id = 0; id<n; id++) {
        make_div(id % sq_rt, Math.floor(id / sq_rt), id);   
    };

    document.getElementById("countDisplay").innerHTML=count;


/*RNG*/
    for (let i=n-1; i>0;i--) {
        const j = Math.floor(Math.random()*(i+1)); // random between 0 and 1
        [board[i],board[j]]= [board[j],board[i]];
    }
    update_draw(n);
}



window.onload = () => { //calls function after windows finish loading
    reset_board();
    document.getElementById("button").onclick = reset_board;
} 

