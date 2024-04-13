
let ds = null // new.

// ****** SHOW HASH TABLE MODULOUS INPUT ****** //
const mod_num_show = () => {
    const value = document.getElementById("data").value;
    const mod_display = document.getElementById("mod_num");
    const hash_display = document.getElementById("hash_num");
    if (value === "hash_table"){
        mod_display.style.display = "inline-block";
        hash_display.style.display = "inline-block";
    }
    else {
        mod_display.style.display = "none";
        hash_display.style.display = "none";
    }
    
}
const mod_show = () => {
    //restart_mod_div();
    const mod = document.getElementById("mod_num").value;
    for (i=0;i<mod;i++){
        create_mod_list(i);
    }
}

document.getElementById("data").addEventListener("change", mod_num_show);
//document.getElementById("mod_num").addEventListener("change", mod_show);

// ****** SHOW HASH TABLE MODULOUS INPUT ****** //

// ****** CHECK FOR WRONG INPUTS IN LIST ****** //
const wrong_input = () => {
    let list = document.getElementById("input_list").value;
    const list_delimiter = list.split(",").map(s => Number(s));
    for (i=0;i<list_delimiter.length;i++){
        console.log(list_delimiter[i], typeof(Number('a')))
        if (isNaN(list_delimiter[i])){
            window.alert("Please only input values into the list.")
            return true
        }
    }
}
document.getElementById("input_list").addEventListener("change", wrong_input);

// ****** CHECK FOR WRONG INPUTS IN LIST ****** //


// ****** RESTARTING ENTIRE PAGE ****** //
const restart_all = () => {
    restart_operation();
    // restart_mod_div();
    // restart_board();
    // remove_input();
    // ds = null;
    // document.getElementById("simulate_ops_button").style.display = "inline-block";
    // document.getElementById("restart_ops_button").style.display = "none";
    // to delete, part of restart_opetation function
    
    // input_list.value=""
    document.getElementById("operation_div").style.display = "none";
    document.getElementById("show").style.display = "inline-block";
    document.getElementById("restart_ds").style.display = "none";
    document.getElementById("input_list").disabled = false;
    document.getElementById("data").disabled = false;
    document.getElementById("mod_num").disabled = false;
    document.getElementById("hash_num").disabled = false;
}

const restart_operation = () => {
    restart_board();
    remove_input();
    hide_code();
    restart_hash_equation();
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
    let parent_div = document.getElementById("data_parent");
    while (parent_div.firstChild) {parent_div.removeChild(parent_div.firstChild);}
    document.getElementById("target_num").textContent = ""; // remove inputs
    document.getElementById("ani_number").textContent = ""; // remove inputs
}

const remove_input = () => {
    document.getElementById("ops_input").value = "";
    // remove input of add operation
}

const restart_mod_div = (mod) => { // dont need anymore can delete 280224
    const parent_div = document.getElementById(mod+"_list");
    while (parent_div.firstChild) {
        parent_div.removeChild(parent_div.firstChild);
    }
}

const restart_hash_equation = () => {
    const parent_div = document.getElementById("hash_equation");
    while (parent_div.firstChild) {
        parent_div.removeChild(parent_div.firstChild);
    }
}

// ****** RESTARTING ENTIRE PAGE ****** //


// ****** CREATING DIVS ****** //

const create_div = (ds,id,i,mod,value) => {
    let arrow = "";
    let parent = "data_parent";
    let div = document.createElement("div");
    let div_class = "";
    let txt = id;

    if (ds.data_structure=== "linked_list"){div_class="linked_list_child_data_class"}
    else if (ds.data_structure === "sorted_array"){div_class = "sorted_array_child_data_class"}
    else if (ds.data_structure === "hash_table"){
        parent = mod+"_list";
        div_class = "hash_table_child_data_class";
        //repeated_value = ds.mod_list[mod][id];
        txt = id + "<br> n: " + value;
    }


    div.classList.add(div_class); // div class is data_child
    document.getElementById(parent).appendChild(div);

    div.id = id+"_"+i;
    div.innerHTML = txt;
    div.style.left = (1+i)*100 + "px";
    div.style.textAlign = "center"; // Center-align content

    

    // creating arrow for linked list and hash table
    if (ds.data_structure==="linked_list"){ 
        if (i==0){return;}
        arrow = "arrow_right";
    }
    else if (ds.data_structure === "hash_table"){arrow = "arrow_down";}

    if (arrow){
        div_arrow = document.createElement(arrow);
        div.appendChild(div_arrow);
        div_arrow.classList.add(arrow);
    }
}

const create_mod_list = (id) => {
    let div_list = document.createElement("div");
    div_list.classList.add("child_hash_table_class"); // where linked list is inserted
    document.getElementById("data_parent").appendChild(div_list);
    div_list.id = id +"_list"
    //div_list.style.top = (20 + i * 120) + "px";
    create_mod(id)
}

const create_mod = (id) => {
    let div = document.createElement("div");
    div.classList.add("child_mod_class"); // mod number
    document.getElementById(id+"_list").appendChild(div);
    div.id = id+"_mod";
    div.textContent = id;
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

    // error checking 
    if (wrong_input()){return;}
    if (document.getElementById("data").value == "hash_table"){
        if(document.getElementById("mod_num").value==0 || document.getElementById("hash_num").value==0){
            window.alert("Modular and Hash number cannot be 0.")
            return;
        }
    }

    ds = new data(list_delimiter);
    document.getElementById("operation_div").style.display = "block";
    document.getElementById("show").style.display = "none";
    document.getElementById("restart_ds").style.display = "inline-block";
    document.getElementById("input_list").disabled = true;
    document.getElementById("data").disabled = true;
    document.getElementById("mod_num").disabled = true;
    document.getElementById("hash_num").disabled = true;
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
    else if (data_structure === "linked_list"){build_ds_linked_list(ds,ds.L);}
    else if (data_structure === "hash_table"){
        build_ds_hash_table(ds);
        document.getElementById("hash_equation").style.display = "inline-block";
    }// add more data structures here
    ds.data_structure = data_structure;

    for (let i=0; i<ds.total_ops+1; i++){
        ds.current_ops++
        execute_operation(i);
        console.log(ds.ani_list);
    }

    animate(ds,'start');
}


const execute_operation = (i) => {
    let total_ops_name = "operation_indiv_div"+i;
    let total_ops = document.getElementById(total_ops_name);
    let ops = total_ops.querySelector("#ops").value;
    let input = Number(total_ops.querySelector("#ops_input").value); // target number
    
    if (ops === "find" && ds.data_structure === "sorted_array"){find_x_binary(ds,input);} 
    else if (ops === "find" && ds.data_structure === "linked_list"){find_x_linear(ds,input);}
    else if (ops === "find" && ds.data_structure === "hash_table"){find_x_linear(ds,input);}
    else if (ops === "delete"){delete_x(ds,input);}
    else if (ops === "insert"){insert_x(ds,input);} // remove insert idx
    
    // disable inputs
    document.getElementById("build_button").disabled = true;
    total_ops.querySelector("#ops").disabled = true;
    total_ops.querySelector("#ops_input").disabled = true;
}

const hide_code = () => {
    let divs = document.querySelectorAll('[id$="_code"');
    divs.forEach(function(div){div.style.display = "none";}) // hides all the div
}

const hash_equation = (x,hash,mod,operation) => {
    // create indiv divs for 4 numbers
    // change CSS


    answer = x*hash%mod;
    let ops = document.createElement("span");
    document.getElementById("hash_equation").appendChild(ops);
    ops.id = operation+"_hash_equation";
    ops.textContent = "Current operation: "+ operation;
    ops.style.color = "black";
    ops.style.backgroundColor = "lightgreen";

    let hash_elem = document.createElement("span");
    document.getElementById("hash_equation").appendChild(hash_elem);
    hash_elem.id = hash+"_hash_equation_number";
    hash_elem.textContent = "Hash function: " + hash ;
    hash_elem.style.color = "blue";
    hash_elem.style.display = "block";

    let mod_elem = document.createElement("span");
    document.getElementById("hash_equation").appendChild(mod_elem);
    mod_elem.id = mod+"_hash_equation_number";
    mod_elem.textContent = "Modular number: " + mod;
    mod_elem.style.color = "green";
    mod_elem.style.display = "block";

    let span_x = document.createElement("span");
    document.getElementById("hash_equation").appendChild(span_x);
    span_x.id = x+"_hash_equation";
    if (typeof(x) == "undefined"){span_x.textContent = 'Item not found'; return;}
    span_x.textContent = "(|" + x + "|";
    span_x.style.color = "black";

    let span_hash = document.createElement("span");
    document.getElementById("hash_equation").appendChild(span_hash);
    span_hash.id = hash+"_hash_equation";
    span_hash.textContent = "*" + hash+")";
    span_hash.style.color = "blue";

    let span_mod = document.createElement("span"); 
    document.getElementById("hash_equation").appendChild(span_mod);
    span_mod.id = mod+"_hash_equation";
    span_mod.textContent = "%" + mod;
    span_mod.style.color = "green";

    let span_answer = document.createElement("span");
    document.getElementById("hash_equation").appendChild(span_answer);
    span_answer.id = answer+"_hash_equation";
    span_answer.textContent = "=" + Math.abs(answer);
    span_answer.style.color = "red";
}
// ****** STARTING SIMULATION ****** //


// ****** ANIMATION ****** //
const build_ds = (arr,special,mod,value_list) => {
    for (let i=0; i<arr.length; i++){ //same as build_ds, create DIVS
        create_div(ds,arr[i],i,mod,value_list[i]);
        if (special[i]==1){
            let id_special = arr[i]+"_"+[i];
            div_special = document.getElementById(id_special);
            div_special.style.background = "grey";
        }
    }
}

const animate = (ds,button) => {
    let animate_stage = ds.animate_stage;
    let ani_list = ds.ani_list;
    let arr = ani_list[animate_stage][0];
    let pointer = ani_list[animate_stage][1];
    let target = ani_list[animate_stage][2];
    let special = ani_list[animate_stage][3];
    let current_ops = ani_list[animate_stage][4];
    let operation =  ani_list[animate_stage][5];
    let value_list = ani_list[animate_stage][6];
    let mod = Math.abs(target * ds.hash % ds.mod);
    let hash_function = ds.hash;
   
    if (ds.data_structure==="hash_table"){ // animate within every linked list in hash table
        if (operation=="build"){
            arr = ani_list[animate_stage][0][0];
            mod = ani_list[animate_stage][0][1];
            target = arr[pointer];
        }
        // create list for previous mod
        if (ds.mod_to_clear>-1){
            restart_mod_div(ds.mod_to_clear);
            create_mod(ds.mod_to_clear);
            if (!(button==="previous" && ds.operation_to_clear ==="build")){ // to solve previous bug 
                build_ds(ds.list_to_clear,special,ds.mod_to_clear,ds.value_list_to_clear);
            }
        }
        if (pointer === arr.length-1){ // reach last element of list
            ds.mod_to_clear = mod;
            ds.list_to_clear = arr;
            ds.value_list_to_clear = structuredClone(value_list);
            if(operation === "insert"){
                idx = ds.list_to_clear.indexOf(target);
                ds.value_list_to_clear.splice(idx,1,value_list[idx]-1);
            }
            ds.operation_to_clear = operation;
        }
        else{ds.mod_to_clear=-1;}
        // create list for current mod
        restart_mod_div(mod); 
        create_mod(mod);
        // equation for hash table
        restart_hash_equation();
        hash_equation(target,hash_function,ds.mod,operation); 
    }
    else {
        if (operation == "build"){target = arr[pointer];}
        restart_board();
    }

    document.getElementById("target_num").textContent = target; // html target value
    document.getElementById("ani_number").textContent = (ds.animate_stage+1) + '/' + ds.ani_list.length; // html animate value
    build_ds(arr,special,mod,value_list);

    for (a=0;a<ds.total_ops+1;a++){ // for pseudocode animation
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
                hide_code();
                if (ds.data_structure === "sorted_array" && now_ops.value === "find"){document.getElementById("find_binary_code").style.display = "block";}
                else if (ds.data_structure === "linked_list" && now_ops.value === "find"){document.getElementById("find_linear_code").style.display = "block";}
                else if (ds.data_structure === "hash_table" && now_ops.value === "find"){document.getElementById("find_linear_code").style.display = "block";}
                else {document.getElementById(now_ops.value+"_code").style.display = "block";} // show only that div 
            }
            else {now_ops.style.background = "white";}    
        }
    }
    
    if (isNaN(pointer)){console.log("stopped animation");return;} // before sort to sort, no pointers
    else{ // where pointer is 
        let id = arr[pointer] + "_" + pointer;  
        div = document.getElementById(id);
        div.style.background = "lightblue";
    }
    
    target = ani_list[animate_stage][2];
    if (arr[pointer]===target){ // highlight gold if elem found
        div.style.borderColor = "gold";
        div.style.height = "70px";
        div.style.width = "70px";
        div.style.fontSize = '200%';
    }
}

const next_step = (ds) => {
    ds.animate_stage++;
    animate(ds,'next');
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
    animate(ds,'previous');
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
    for (let i=1; i<ds.L.length+1;i++){ // Unsorted array
        current_list = ds.L.slice(0,i);
        ds.ani_list.push([current_list,i-1,NaN,NaN,ds.current_ops,"build",[]]);
    }
    ds.L.sort(function(a,b){return a-b;}); 
    ds.ani_list.push([structuredClone(ds.L),NaN,NaN,NaN,ds.current_ops,"build",[]]); // ordered list
}

const build_ds_linked_list = (ds,L) => {
    if (L.length === 0){ds.ani_list.push([structuredClone(L),NaN,NaN,NaN,ds.current_ops,"build",[]]);}
    for (let i=1; i<L.length+1;i++){
        let current_list = L.slice(0,i);
        ds.ani_list.push([current_list,i-1,NaN,NaN,ds.current_ops,"build",[]]);
    }
    //ds.ani_list.push([structuredClone(L),NaN,NaN,NaN,ds.current_ops]);
}

const build_ds_hash_table = (ds) => {
    ds.mod = document.getElementById("mod_num").value;
    ds.hash = document.getElementById("hash_num").value;
    alpha = Math.round((ds.L.length / ds.mod),2); // alpha less than 0.5 is good performance of hash table
    // find where element belongs to which mod
    // insert into that mod
    // create linked list for each of the element
    for (let i=0; i<ds.mod; i++){ds.mod_list.push([]);} // initialise main list
    for (let i=0; i<ds.L.length; i++){ // create all sub list
        let key = ds.L[i];
        let mod_idx = Math.abs(key * ds.hash % ds.mod); // index for the elem in hash table
        if (!(key in ds.mod_list[mod_idx])){ds.mod_list[mod_idx][key]=1;} // dictionary
        else {ds.mod_list[mod_idx][key]++;}
    }

    // animation for building hash_table
    for (mod_idx=0; mod_idx<ds.mod; mod_idx++){ // create linked list
        let mod_list_indiv = Object.keys(ds.mod_list[mod_idx]).map(key=> parseInt(key));
        let value_list_indiv = Object.values(ds.mod_list[mod_idx]).map(value=> parseInt(value));
        for (let i=1; i<mod_list_indiv.length+1;i++){ // loop inside each list
            let current_list = mod_list_indiv.slice(0,i);
            let value_list = value_list_indiv.slice(0,i);
            
            ds.ani_list.push([[current_list,mod_idx],i-1,NaN,NaN,ds.current_ops,"build",value_list]);
        } 
    }
    mod_show();
}


const find_x_linear = (ds,x) => {
    const input = Number(x);
    ds.number = input;
    find_list = ds.L;
    value_list = [];
    if (ds.data_structure==="hash_table"){
        mod_idx = Math.abs(x * ds.hash % ds.mod);
        find_list = Object.keys(ds.mod_list[mod_idx]).map(key=> parseInt(key));
        value_list = Object.values(ds.mod_list[mod_idx]).map(value=> parseInt(value));
        if (find_list.length == 0){ds.ani_list.push([ds.list_to_clear,NaN,input,ds.special,ds.current_ops,"find",value_list]);return;}
        ds.special = Array(Object.keys(ds.mod_list[mod_idx]).length).fill(0);
    }
    else {ds.special = Array(ds.L.length).fill(0);}
    
    for (let i=0; i<find_list.length; i++){
        let not_array = structuredClone(ds.special)
        id = find_list[i];
        ds.ani_list.push([structuredClone(find_list),i,input,not_array,ds.current_ops,"find",value_list]); // [array,pointer,target,special]
        console.log(find_list)
        if (id === input){break;}
        else{ds.special[i]=1;}
    }
    if ( !(ds.L.includes(x))){ds.ani_list.push([structuredClone(find_list),NaN,input,ds.special,ds.current_ops,"find",value_list]);}
}

const find_x_binary = (ds,x) =>{
    const input = x;
    let end = ds.L.length - 1;  
    let start = 0;
    
    while (start<=end){
        let not_array = structuredClone(ds.special);
        let pointer = Math.floor((start + end)/2);
        ds.ani_list.push([structuredClone(ds.L),pointer,input,not_array,ds.current_ops,"find",[]]);// insert into animation
      
        if (ds.L[pointer] > input) { // left hand side
            for (i=pointer;i<end+1;i++){ds.special[i]=1}
            not_array = structuredClone(ds.special);
            ds.ani_list.push([structuredClone(ds.L),NaN,input,not_array,ds.current_ops,"find",[]]);
            end = pointer - 1;    
        }   
        else if (ds.L[pointer] < input){ // right hand side
            for (i=start;i<pointer+1;i++){ds.special[i]=1};
            not_array = structuredClone(ds.special);
            ds.ani_list.push([structuredClone(ds.L),NaN,input,not_array,ds.current_ops,"find",[]]);
            start = pointer + 1;
        } 
        else if (ds.L[pointer] === input) {return;}
    }
    console.log(ds.ani_list)
}


const delete_x = (ds,x) => { // find elem, then delete
    const input = Number(x)
    ds.number = input;
    value_list = [];
    let list = structuredClone(ds.L);
    if (ds.data_structure === "sorted_array"){find_x_binary(ds,input);}
    else {find_x_linear(ds,input);}
    if (ds.L.includes(input)){
        if (ds.data_structure === "hash_table"){
            mod_idx = Math.abs(x * ds.hash % ds.mod);
            ds.mod_list[mod_idx][input]--;
            value_list = Object.values(ds.mod_list[mod_idx]).map(value=> parseInt(value));
            list = Object.keys(ds.mod_list[mod_idx]).map(key=> parseInt(key));
            if(!(ds.mod_list[mod_idx][input]==0)){
                // elem NOT removed from list, reduce number by 1
                ds.ani_list.push([list,NaN,input,NaN,ds.current_ops,"delete",value_list]);
                return;
            }
        }
        
        idx = list.indexOf(input); 
        ds.L.splice(idx,1); // remove 1 elem at idx for future reference
        remove_ds_L = structuredClone(list);
        remove_ds_L.splice(idx,1," "); // replace 1 elem at idx to empty string
        list.splice(idx,1); // remove 1 elem at idx
        new_list = structuredClone(list);

        ds.ani_list.push([remove_ds_L,NaN,input,NaN,ds.current_ops,"delete",value_list]); // show empty div for delete
        ds.ani_list.push([new_list,NaN,input,NaN,ds.current_ops,"delete",value_list]); // show the new ds list
    }
}

const insert_x = (ds,x) => {
    // input list to hash table, change ds.L to list general
    const input = Number(x);
    ds.number = input;
    value_list = [];

    if (ds.data_structure === "hash_table"){
        mod_idx = Math.abs(x * ds.hash % ds.mod);
        
        if(ds.L.includes(input)){ // increase number by 1 
            ds.mod_list[mod_idx][input]++;
            new_list = Object.keys(ds.mod_list[mod_idx]).map(key=> parseInt(key));
            value_list = Object.values(ds.mod_list[mod_idx]).map(value=> parseInt(value));
            ds.ani_list.push([new_list,0,input,NaN,ds.current_ops,"insert",value_list]);
            ds.ani_list.push([new_list,NaN,input,NaN,ds.current_ops,"insert",value_list]);
            return;
        }
        else{
            new_list = Object.keys(ds.mod_list[mod_idx]).map(key=> parseInt(key));
            ds.mod_list[mod_idx][input]=1;
            value_list = Object.values(ds.mod_list[mod_idx]).map(value=> parseInt(value));
        }        
    }
    else {new_list = structuredClone(ds.L);}
    ds.L.splice(0,0,input); // final list in ds after insert

    new_list.splice(0,0,""); // empty div into array
    ds.ani_list.push([structuredClone(new_list),NaN,input,structuredClone(ds.special),ds.current_ops,"insert",value_list]); // build left side with empty div
    new_list[0] = input; // final list in ds after insert for animation
    ds.ani_list.push([structuredClone(new_list),0,input,NaN,ds.current_ops,"insert",value_list]);
    if (ds.data_structure == "sorted_array"){
        ds.L.sort(function(a,b){return a-b;});
        new_list.sort(function(a,b){return a-b;});
    }
    ds.ani_list.push([structuredClone(new_list),NaN,input,NaN,ds.current_ops,"insert",value_list]);
}



// ****** DATA STRUCTURES ****** //
function data(L) {
    this.L = L;
    this.data_structure = "";
    this.ani_list = []; // [list, pointer, target, special,current_ops, value_list]
    this.ani_explain = [];
    this.number = false; // target number
    this.animate_stage = 0;
    this.special = []; // background colour binary search
    this.total_ops = 0; // for explanation and which operation
    this.current_ops = -1;
    this.mod = 0;
    this.hash = 0;
    this.mod_list = [];
    this.mod_to_clear = -1; // for build hash table to restart mod in that list
    this.list_to_clear = []; // for build hash table to restart mod in that list
    this.value_list_to_clear = [];
    this.operation_to_clear = "";
}



// ****** DATA STRUCTURES ****** //

