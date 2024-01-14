/*
data.addEventListener("change",update_ops_options); //event listener to update ops


const update_ops_options = () => { // to be deleted
    const selected_item = data.value;
    const options = ops.options;

    while (options.length > 0){
        options[0].remove(); // remove all options from ops
    }

    if (selected_item === "Array"){
        add_option("permutation_sort", "permutation sort");
        add_option("selection_sort", "selection sort");
        add_option("insertion_sort", "insertion sort");
        add_option("merge_sort", "merge sort");
        add_option("tuple_sort", "tuple sort");
        add_option("counting_sort", "counting sort");
        add_option("radix_sort", "radix sort");
    }
}
*/

// add enter to submit the inputs
// explain part colour codes

const restart_board = () => { // clear the webpage 
    const parent_div = document.getElementById("data_parent");
    while (parent_div.firstChild) {
        parent_div.removeChild(parent_div.firstChild);
    }
    document.getElementById("target_num").textContent = ""; // remove inputs
}

const remove_input = () => {
    document.getElementById("ops_input").value = "";
    document.getElementById("ops_input2").value = "";
    document.getElementById("input_list").value = "";
}

const create_div = (id,i) => {
    div = document.createElement("div");
    document.getElementById("data_parent").appendChild(div);
    div.id = id+"_"+i;
    div.textContent = id;
    div.style.left = (1+i)*100 + "px";
}

const update_input = () => {
    restart_board();
    let data = document.getElementById("data").value; // which data structure
    let list = document.getElementById("input_list").value;
    const list_delimiter = list.split(",").map(s => Number(s));
    
    let ds = new sorted_array(list_delimiter) // more efficient way of doing 
    ds.build(); // change to when windows start
    return ds
}

const start_data = () => {
    let ops = document.getElementById("ops").value;
    let input = document.getElementById("ops_input").value; // target number
    let idx = document.getElementById("ops_input2").value;
    
    ds = update_input();
    if (ops === "find"){ds.find(input);ds.find_animate();} // change to oop
    else if (ops === "find_min"){ds.find_min(input);ds.find_animate();}
    else if (ops === "find_max"){ds.find_max(input);ds.find_animate();}
    else if (ops === "delete"){ds.delete(input);}
    else if (ops === "insert"){ds.insert(input,idx);}
}

function sorted_array(L) {
    this.L = L;
    this.ani_list = [];
    this.number = false; // target number
    this.idx = false; // target index
    this.explain = false;
    this.animate_stage = 0;
}

sorted_array.prototype.build = function () {
    this.L = this.L.sort(function(a,b){return a-b;});
    for (let i=0; i<this.L.length; i++){
      create_div(this.L[i],i)
    }
}

sorted_array.prototype.find_animate = function () {
    let animate_stage = this.animate_stage;
    let ani_list = this.ani_list;
    txt = ani_list[animate_stage][1];
    document.getElementById("target_num").textContent = txt;
    let id = String(ani_list[animate_stage][0] + "_" + (animate_stage));
    let div = document.getElementById(id);
    if (ani_list[animate_stage][0]===txt){div.style.outline = "3px solid gold"} // if equal to target value
    else {div.style.outline = "3px solid blue"}
}

sorted_array.prototype.next_step = function (){
    this.animate_stage++;
    console.log(this.animate_stage, this.ani_list.length);
    if (this.animate_stage >= this.ani_list.length){
        let answer = window.confirm("No more next step. \n\n restart?")
        if (answer){
            restart_board();
            remove_input();
        }
    else{this.animate_stage--;} // return to same animate_stage
    }
    else{this.find_animate();}
}
  
sorted_array.prototype.previous_step = function (){
    console.log(this.animate_stage, this.ani_list.length);
    if (this.animate_stage < 0){
        let answer = window.confirm("No more previous step. \n\n restart?");
    if (answer){
        restart_board();
        remove_input();
        }
    else{this.animate_stage++;} // return to same animate_stage
    }

    else{
        let id = String(this.ani_list[this.animate_stage][0] + "_" + (this.animate_stage));
        let div = document.getElementById(id);
        div.style.outline = "3px solid grey";
        this.animate_stage--;
        }
}

sorted_array.prototype.find = function(x) {
    const input = Number(x)
    this.number = input
    for (let i=0; i<this.L.length; i++){
        id = this.L[i];      
      
        this.ani_list.push([id,input]);
        if (id === input){
            // this.ani_list.push([String(id),input]); dont need this to end 
            break;
        }
    }
}

sorted_array.prototype.find_min = function(){
    let min = this.L[0];
    for (i=0; i<this.L.length; i++){
        id = this.L[i];   
        this.ani_list.push([id,min]);
    }
}

sorted_array.prototype.find_max = function(){
    let max = this.L[this.L.length-1];
    for (i=0; i<this.L.length; i++){
        id = this.L[i];     
        this.ani_list.push([id,max]);
    }
}

sorted_array.prototype.delete = function(x){
    // find the item first
    // delete div
    const input = Number(x)
    this.number = input;
  
    if (this.L.includes(input)){
        let id = input + "_" + this.L.indexOf(input);
        document.getElementById(id).remove();
        document.getElementById("target_num").textContent = input;
        this.L.pop(input);
    }
    else {
        let answer = window.confirm("Value not found. \n\n restart?");
        if (answer){
          restart_board();
          remove_input();
        }
    }
}

sorted_array.prototype.insert = function(x,i){
    const input = Number(x);
    this.number = input;
    const idx = Number(i);
    this.idx = idx;
    // see if possible to add the find method
    this.L.splice(idx,0,input); // add new input into array
    restart_board();
    
    for (let i=0; i<this.L.length; i++){
      loop2(this.L[i],i);
    }
    function loop2(lst,idx){
      setTimeout(function(){
        create_div(lst,idx)
      }, 1000*idx)
    }
    
    document.getElementById(input+"_"+idx).style.outline = "3px Solid Red"; // how to delay this line until above code is run
}


const input = document.querySelector("input");
input.addEventListener("input",update_input); // make sure input refers to first input, not operation input




// chagne this.number to compare all the things required



//data.addEventListener("change",start_data);


