const classUtility={
    "p":"padding",
    "pt":"paddingTop",
    "pb":"paddingBottom",
    "pr":"paddingRight",
    "pl":"paddingLeft",
    "px": "paddingInline",   
    "py": "paddingBlock",

    "m":"margin",
    "mt":"marginTop",
    "mb":"marginBottom",
    "mr":"marginRight",
    "ml":"marginLeft",
    "mx": "marginInline",   
    "my": "marginBlock",

    // Sizing
    "w": "width",            
    "h": "height",           
    "minW": "minWidth",
    "minH": "minHeight",
    "maxW": "maxWidth",
    "maxH": "maxHeight",
   

    // Typography
    "fontSize": "fontSize",
    "fontWeight": "fontWeight",
    "borderWidth": "borderWidth",   
    "leading": "lineHeight",         
    "tracking": "letterSpacing",  

    "bg":"backgroundColor",
    "opacity": "opacity", 
    "rounded": "borderRadius",


    // Layout / Spacing
    "gap": "gap",                    
    "z": "zIndex",                   
    "top": "top",                    
    "left": "left",                  
    "right": "right",                
    "bottom": "bottom",       
    
    "justify": "justifyContent",
    "items": "alignItems",
    "self": "alignSelf",
}


const elements =document.querySelectorAll("*")


// Filter all the elements that has class

const filteredClass=Array.from(elements).filter(ele=>ele.hasAttribute('class'))
console.log(filteredClass)


//Function which validate s type
function isTypeValid(type){
if(!type || typeof type!=="string" || classUtility[type]===undefined ) return false
return true
}
//Function which validate s value
function isValueValid(value){
if(!value || Number.isNaN(Number(value)) || !Number.isFinite(Number(value))) return false
return true
}

// Function which takes an element and apply styles

function ApplyStyle(ele){

    // Step 1:  Get the class List value 
    // Step 2:  loop
    // Step 3:  filter the splited values which contains chai- at start
    // Step 4:  Loop to this filtered class and then parse it to type and value 
    // Step 5:  Apply styling

    // Lets gooo

    const classNames=ele.classList.value.split(" ")

    const classStartsWithChai=classNames.filter(cl=>cl.startsWith("chai-"))

    classStartsWithChai.forEach(individualClass => {
        const  splitIndividualClass =individualClass.split("-") //This is an array ["chai","type","value"]

        //check for layouts
        const layouts = ['flex', 'block', 'hidden', 'inline', 'inline-flex', 'grid', 'inline-block'];
        if(layouts.includes(splitIndividualClass[1]) && !splitIndividualClass[2]){
            if(splitIndividualClass[1]==='hidden') ele.style.display='none'
            else ele.style.display=splitIndividualClass[1];
        }
        else if (splitIndividualClass[1] === "flex" && splitIndividualClass[2]) {
                const flexValues = ['row', 'col'];
                if (flexValues.includes(splitIndividualClass[2])) {
                    ele.style.flexDirection = `${splitIndividualClass[2] === 'col' ? 'column' : 'row'}${splitIndividualClass[3] === 'reverse' ? '-reverse' : ''}`;
                }
        }

        //Check the case for text
        else if(splitIndividualClass[1]==="border"){
            //If the value is number then apply border 1px solid black
            const value = splitIndividualClass[2]

            if(isValueValid(value)){
                ele.style.border=value+"px solid black";
            }
        }
        else if(splitIndividualClass[1]==="text"){
            //case 1-> aligment
            //case 2-> text-color
            //case 3-> font size
            if(!splitIndividualClass[2]) return

            const alligment=['left','right','center','justify','start','end']
            const value=splitIndividualClass[2]
            if(alligment.includes(value)){
                ele.style.textAlign=value
            }else if(isValueValid(value)){
                ele.style.fontSize=value+"px"
            } 
            else{
                ele.style.color=value
            }
        } 
        else if(isTypeValid(splitIndividualClass[1])){
    const rawType = splitIndividualClass[1]
    const property = classUtility[rawType]
    let value = splitIndividualClass[2]

    const valueMap = {
        "between": "space-between",
        "around": "space-around",
        "evenly": "space-evenly"
    }
    value = valueMap[value] || value

    if(isValueValid(value)){
        ele.style[property]=value+"px"
    }else{
        ele.style[property] = value
    }
}
    });


    

}

filteredClass.forEach(ele=> ApplyStyle(ele))

