
let ds = null // new.


// ****** RESTARTING ENTIRE PAGE ****** //
const restart_all = () => {
    restart_operation();
    // restart_board();
    // remove_input();
    // ds = null;
    // document.getElementById("simulate_ops_button").style.display = "inline-block";
    // document.getElementById("restart_ops_button").style.display = "none";
    // to delete, part of restart_opetation function
    
    input_list.value=""
    document.getElementById("operation_div").style.display = "none";
    document.getElementById("show").style.display = "inline-block";
    document.getElementById("restart_ds").style.display = "none";
    document.getElementById("input_list").disabled = false;
    document.getElementById("data").disabled = false;
}

const restart_operation = () => {
    restart_board();
    remove_input();
    hide_explain();
    // start_data(); put in html, repeat function in restart_all
    // need to remove add  operations
    document.getElementById("simulate_ops_button").style.display = "inline-block";
    document.getElementById("next_button").style.display = "none";
    document.getElementById("previous_button").style.display = "none";
    document.getElementById("restart_ops_button").style.display = "none";
    document.getElementById("target_value").style.display = "none";
    document.getElementById("ani_value").style.display = "none";
    document.getElementById("add_operation_button").style.display = "inline-block";
    
    const parent_div = document.getElementById("add_operation"); // remove all added operation
    document.getElementById("operation_indiv_div0").querySelector("#ops").style.background="white";
    document.getElementById("build_button").style.background="white";

    document.getElementById("build_button").disabled = false;
    document.getElementById("operation_indiv_div0").querySelector("#ops").disabled = false;
    document.getElementById("operation_indiv_div0").querySelector("#ops_input").disabled = false;

    while (ds.total_ops>0){ // remove explanation
        child_div = parent_div.querySelector("#operation_indiv_div"+ds.total_ops);
        parent_div.removeChild(child_div);
        ds.total_ops--;
    }
    ds = null;
}

const restart_board = () => { // clear the webpage in animations
    const parent_div = document.getElementById("data_parent");
    while (parent_div.firstChild) {
        parent_div.removeChild(parent_div.firstChild);
    }
    document.getElementById("target_num").textContent = ""; // remove inputs
    document.getElementById("ani_number").textContent = ""; // remove inputs
}

const remove_input = () => {
    document.getElementById("ops_input").value = "";
    // remove input of add operation
}
// ****** RESTARTING ENTIRE PAGE ****** //


// ****** CREATING DIVS ****** //
const create_div = (ds,id,i) => {
    div = document.createElement("div");
    div.classList.add("child_data_class"); // div class is data_child
    document.getElementById("data_parent").appendChild(div);
    div.id = id+"_"+i;
    div.textContent = id;
    div.style.left = (1+i)*100 + "px";
    if (ds.data_structure==="linked_list"){ // creating arrow for linked list
        if(i != ds.ani_list[ds.animate_stage][0].length-1){ // remove last arrow
        div_arrow = document.createElement("arrow");
        div.appendChild(div_arrow);
        div_arrow.classList.add("arrow");
        }
    }
}
// ****** CREATING DIVS ****** //


// ****** ADD OPERATIONS ****** //
const add_operation = () => {
    ds.total_ops++;
    let ops = document.getElementById("operation_indiv_div0");
    let new_operation_indiv_div = ops.cloneNode(true);
    let add_operation = document.getElementById("add_operation");
    add_operation.appendChild(new_operation_indiv_div); // adding new ops as child div
    new_operation_indiv_div.id = "operation_indiv_div" + ds.total_ops;
}
// ****** ADD OPERATIONS ****** //



// ****** STARTING SIMULATION ****** //
const start_data = () => {
    let list = document.getElementById("input_list").value;
    const list_delimiter = list.split(",").map(s => Number(s));
    ds = new sorted_array(list_delimiter);
  
// ****** showing what was input by user ****** //
//    for (let i=0; i<ds.L.length; i++){
//      create_div(ds,ds.L[i],i) // show the unordered list
//    }
    document.getElementById("operation_div").style.display = "block";
    document.getElementById("show").style.display = "none";
    document.getElementById("restart_ds").style.display = "inline-block";
    document.getElementById("input_list").disabled = true;
    document.getElementById("data").disabled = true;
}


const start_operation = (ds) => {
    // showing and hiding buttons
    document.getElementById("simulate_ops_button").style.display = "none"; // show and hide buttons
    document.getElementById("add_operation_button").style.display = "none";
    document.getElementById("next_button").style.display = "inline-block";
    document.getElementById("previous_button").style.display = "inline-block";
    document.getElementById("restart_ops_button").style.display = "inline-block";
    document.getElementById("target_value").style.display = "inline-block";
    document.getElementById("ani_value").style.display = "inline-block";
    document.getElementById("next_button").disabled = false;
    document.getElementById("previous_button").disabled = true;

    // building data structure
    let data_structure = document.getElementById("data").value; // type of data structure
    if (data_structure === "sorted_array"){build_ds_sorted_arr(ds);}
    else if (data_structure === "linked_list"){build_ds_linked_list(ds);}
    else if (data_structure === "hash_table"){build_ds_hash_table(ds);}// add more data structures here
    ds.data_structure = data_structure;

    for (let i=0; i<ds.total_ops+1; i++){
        ds.current_ops++
        execute_operation(i);
        ds.special = Array(ds.L.legnth).fill(0); // initialise ds.special
        console.log(ds.ani_list)
    }

    animate(ds);
}


const execute_operation = (i) => {
    let total_ops_name = "operation_indiv_div"+i;
    let total_ops = document.getElementById(total_ops_name);
    let ops = total_ops.querySelector("#ops").value;
    let input = Number(total_ops.querySelector("#ops_input").value); // target number
    
    if (ops === "find" && ds.data_structure === "sorted_array"){find_x_binary(ds,input);} 
    else if (ops === "find" && ds.data_structure === "linked_list"){find_x_linear(ds,input);}
    else if (ops === "find_min"){find_min(ds,input);}
    else if (ops === "delete"){delete_x(ds,input);}
    else if (ops === "insert"){insert_x(ds,input);} // remove insert idx
    
    // disable inputs
    document.getElementById("build_button").disabled = true;
    total_ops.querySelector("#ops").disabled = true;
    total_ops.querySelector("#ops_input").disabled = true;
}

const hide_explain = () => {
    let divs = document.querySelectorAll('[id$="_code"');
    divs.forEach(function(div){div.style.display = "none";}) // hides all the div
}
// ****** STARTING SIMULATION ****** //


// ****** ANIMATION ****** //
const animate = (ds) => {
    restart_board();
    let animate_stage = ds.animate_stage;
    let ani_list = ds.ani_list;
    let arr = ani_list[animate_stage][0];
    let pointer = ani_list[animate_stage][1];
    let target = ani_list[animate_stage][2];
    let special = ani_list[animate_stage][3];
    let current_ops = ani_list[animate_stage][4];
    document.getElementById("target_num").textContent = target; // html target value
    document.getElementById("ani_number").textContent = (ds.animate_stage+1) + '/' + ds.ani_list.length; // html animate value
    console.log(pointer);
    for (let i=0; i<arr.length; i++){ //same as build_ds, create DIVS
        create_div(ds,arr[i],i);
        if (special[i]==1){
            let id_special = arr[i]+"_"+[i];
            div_special = document.getElementById(id_special);
            div.style.background = "grey";
        }
    }
    
    for (a=0;a<ds.total_ops+1;a++){ // for pseudocode animation
        console.log(a,ds.total_ops+1)
        now_ops = document.getElementById("operation_indiv_div"+a).querySelector("#ops");
        if(current_ops === -1){ // for build function
            document.getElementById("build_button").style.background="lightgreen";
            document.getElementById("build_code").style.display = "block";
            now_ops.style.background = "white";
        }
        else{
            document.getElementById("build_button").style.background="white";
            if (a === current_ops){
                now_ops.style.background = "lightgreen";
                console.log(now_ops.value);
                hide_explain();
                if (ds.data_structure === "sorted_array" && now_ops.value === "find"){document.getElementById("find_binary_code").style.display = "block";}
                else if (ds.data_structure === "linked_list" && now_ops.value === "find"){document.getElementById("find_linear_code").style.display = "block";}
                else {document.getElementById(now_ops.value+"_code").style.display = "block";} // show only that div 
            }
            else {now_ops.style.background = "white";}    
        }
    }


    if (isNaN(pointer) || isNaN(target)){console.log("stopped animation");return;} // before sort to sort, no pointers
    else{ // where pointer is 
        let id = arr[pointer] + "_" + pointer;
        div = document.getElementById(id);
        div.style.background = "lightblue";
    }
    if (arr[pointer]===target){ // highlight gold if elem found
        div.style.borderColor = "gold";
        div.style.height = "70px";
        div.style.width = "70px";
        div.style.fontSize = '200%';
    }
}

const next_step = (ds) => {
    ds.animate_stage++;
    animate(ds);
    if (ds.animate_stage == ds.ani_list.length-1){
        document.getElementById("next_button").disabled = true;
        document.getElementById("previous_button").disabled = false;
    }
    else{
        document.getElementById("next_button").disabled = false;
        document.getElementById("previous_button").disabled = false;
    }
}   
  
const previous_step = (ds) => {
    ds.animate_stage--;
    animate(ds);
    if (ds.animate_stage == 0){
        document.getElementById("next_button").disabled = false;
        document.getElementById("previous_button").disabled = true;
    }
    else{
        document.getElementById("next_button").disabled = false;
        document.getElementById("previous_button").disabled = false;
    }
}
// ****** ANIMATION ****** //


// ****** METHODS/FUNCTIONS ****** //
const build_ds_sorted_arr = (ds) => { 
    for (let i=0; i<ds.L.length;i++){ // Unsorted array
        current_list = ds.L.slice(0,i);
        ds.ani_list.push([current_list,NaN,NaN,NaN,ds.current_ops]);
    }
    ds.ani_list.push([structuredClone(ds.L),NaN,NaN,NaN,ds.current_ops]);
    ds.L = ds.L.sort(function(a,b){return a-b;}); 
    ds.ani_list.push([structuredClone(ds.L),NaN,NaN,NaN,ds.current_ops]); // ordered list
}

const build_ds_linked_list = (ds) => {
    //ds.ani_list.push([structuredClone(ds.L),NaN,NaN,NaN,ds.current_ops]); // ordered list
    if (ds.L.length === 0){ds.ani_list.push([structuredClone(ds.L),NaN,NaN,NaN,ds.current_ops]);}
    for (let i=0; i<ds.L.length;i++){
        current_list = ds.L.slice(0,i);
        ds.ani_list.push([current_list,NaN,NaN,NaN,ds.current_ops]);
    }
    ds.ani_list.push([structuredClone(ds.L),NaN,NaN,NaN,ds.current_ops]);
}

const build_ds_hash_table = (ds) => {
    // put building hash table algo here
//    ds.ani_list.push([ds.L,NaN,NaN,NaN]); // ordered list
//    for (let i=0; i<ds.L.length; i++){
//      create_div(ds,ds.L[i],i)
//    }
    
}


const find_x_linear = (ds,x) => {
    const input = Number(x);
    ds.number = input;
    
    for (let i=0; i<ds.L.length; i++){
        let not_array = structuredClone(ds.special)
        id = ds.L[i];
        ds.ani_list.push([structuredClone(ds.L),i,input,not_array,ds.current_ops]); // [array,pointer,target,special]
        if (id === input){break;}
        else{ds.special[i]=1;}
    }
}

const find_x_binary = (ds,x) =>{
    if (ds.data_structure==="linked_list"){
        window.alert("Linked_list has no option for binary search\nLinear search will be executed")
        find_x_linear(ds,x);
        return;
    }
    const input = x;
    let end = ds.L.length - 1;  
    let start = 0;
    
    while (start<=end){
        let not_array = structuredClone(ds.special);
        let pointer = Math.floor((start + end)/2);
        ds.ani_list.push([structuredClone(ds.L),pointer,input,not_array,ds.current_ops]);// insert into animation
      
        if (ds.L[pointer] > input) { // left hand side
            for (i=pointer;i<end+1;i++){ds.special[i]=1}
            not_array = structuredClone(ds.special);
            ds.ani_list.push([structuredClone(ds.L),NaN,input,not_array,ds.current_ops]);
            end = pointer - 1;    
        }   
        else if (ds.L[pointer] < input){ // right hand side
            for (i=start;i<pointer+1;i++){ds.special[i]=1};
            not_array = structuredClone(ds.special);
            ds.ani_list.push([structuredClone(ds.L),NaN,input,not_array,ds.current_ops]);
            start = pointer + 1;
        } 
        else if (ds.L[pointer] === input) {return;}
    }
    console.log(ds.ani_list)
}

const find_min = (ds) => {
    let min = ds.L[0];
    find_x_linear(ds,min);
}

const delete_x = (ds,x) => { // find elem, then delete
    const input = Number(x)
    ds.number = input;
    find_x_linear(ds,input);
    if (ds.L.includes(input)){
        let idx = ds.L.indexOf(input); // check ds.L does not have input GOT ISSUE HERE
        let remove_ds_L = structuredClone(ds.L);
        remove_ds_L.splice(idx,1," "); // replace 1 elem at idx to empty string
        ds.L.splice(idx,1); // remove 1 elem at idx
        ds.ani_list.push([remove_ds_L,NaN,input,NaN,ds.current_ops]); // show empty div for delete
        ds.ani_list.push([structuredClone(ds.L),NaN,input,NaN,ds.current_ops]); // show the new ds list
    }
    else {
        // window.alert("Value not found");
        //if (answer){
        //  restart_board();
        //  remove_input();
        //}
    }
}

const insert_x = (ds,x) => {
    const input = Number(x);
    ds.number = input;
    let new_list = structuredClone(ds.L);
    new_list.splice(0,0,""); // empty div into array
    ds.L.splice(0,0,input); // final list in ds after insert
    ds.ani_list.push([new_list,NaN,input,structuredClone(ds.special),ds.current_ops]); // build left side with empty div
    ds.ani_list.push([structuredClone(ds.L),0,input,NaN,ds.current_ops]);
    if (ds.data_structure == "sorted_array"){build_ds_sorted_arr(ds);}
}



// ****** DATA STRUCTURES ****** //
function sorted_array(L) {
    this.L = L;
    this.data_structure = "";
    this.ani_list = []; // [list, pointer, target, special,current_ops]
    this.ani_explain = [];
    this.number = false; // target number
    this.animate_stage = 0;
    this.special = []; // background colour binary search
    this.total_ops = 0; // for explanation and which operation
    this.current_ops = -1;
}

function linked_list(head = null) {
    this.head = head;   
    this.data_structure = "";
    
    this.L = L;
    this.ani_list = []; // [list, pointer, target, special,current_ops]
    this.ani_explain = [];
    this.number = false; // target number
    this.animate_stage = 0;
    this.special = []; // background colour binary search
    this.total_ops = 0;
    this.current_ops = -1;
}

function linked_list_node(data){
    this.data = data;
    this.next = null;
}

// ****** DATA STRUCTURES ****** //


// chagne this.number to compare all the things required



//data.addEventListener("change",start_data);
