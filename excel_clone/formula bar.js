for(let i=0;i<100;i++)
{
    for(let j=0;j<26;j++)
    {
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);//active cell
        cell.addEventListener("blur",(e)=>{
            let address=adressbar.value;
            let [cell, cellprop]=activeandstoragecell(address);
            let eneteredval=cell.innerText;

            if(eneteredval===cellprop.value) return;
            cellprop.value=eneteredval;
            //update value in cell so updating in kids too
            deleteChildren(cellprop.formula);//remove children
            cellprop.formula="";
            updatechildrencell(address);
            //console.log(cellprop.value);
        })
    }
}

let formulabar=document.querySelector(".formula");
formulabar.addEventListener("keydown", (e)=>{
    let inputformula=formulabar.value;
    if(e.key=="Enter" && inputformula)//eneter key is pressed and there is some formula is formula bar
    {
        let address=adressbar.value;
        let [cell, cellprop]=activeandstoragecell(address);
        if(cellprop.formula!=inputformula)
        {
            deleteChildren(cellprop.formula);
        }

        //whenever we enter a formula we want to check for cycle detection in formula
        addChildtoGraphComponent(inputformula, address)//inputformula: tells abt parents, address tells abt child
        
        //if graph is cyclic , we send an alert. else we evaluate
        let iscyclic=isgraphcyclic(graphComponentMatrix);
        if(iscyclic===true)
            {
                //console.log("Cycle found");
                alert("Your formula has cyclic dependancies."); 
                removeChildFromGraphComponenet(inputformula, address);
                return;
            }
        //evaluate formula
        let evaluatedvalue=evaluateformula(inputformula);
        //update UI //Update storage grid
        setUIvalandcellprop(evaluatedvalue, inputformula, address);
        addChildren(inputformula);
        updatechildrencell(address)//when formula change occurs in formula bar
        //console.log(sheetDB);
    }
    
});

function removeChildFromGraphComponenet(formula, childaddress)
{
    //decode child details
    let [childrid, childcid]=decode(childaddress)

    //decode parents deatils
    let encodedformula=formula.split(" ");//encodedformula=[A1, +, 10]
    for(let i=0;i<encodedformula.length;i++)
    {
        let ascii=encodedformula[i].charCodeAt(0)//"A"=ascill
        if(ascii>=65 && ascii<=90)
        {
            let [parentrid, parentcid]=decode(encodedformula[i]);
            //insert child in graph matric
            graphComponentMatrix[parentrid][parentcid].pop();//removes last added child
        }
    }
}

function addChildtoGraphComponent(formula, childaddress)
{
    //decode child details
    let [childrid, childcid]=decode(childaddress)

    //decode parents deatils
    let encodedformula=formula.split(" ");//encodedformula=[A1, +, 10]
    for(let i=0;i<encodedformula.length;i++)
    {
        let ascii=encodedformula[i].charCodeAt(0)//"A"=ascill
        if(ascii>=65 && ascii<=90)
        {
            let [parentrid, parentcid]=decode(encodedformula[i]);
            //insert child in graph matric
            graphComponentMatrix[parentrid][parentcid].push([childrid, childcid]);
        }
    }
}

function updatechildrencell(parentaddress)
{
    let [parentcell, parentcellprop]=activeandstoragecell(parentaddress);
    let children=parentcellprop.children;
    for(let i=0;i<children.length;i++)
    {
        let childaddress=children[i];
        let [childcell, childcellprop]=activeandstoragecell(childaddress);
        let childformula=childcellprop.formula;
        let evaluatedvalue=evaluateformula(childformula);
        setUIvalandcellprop(evaluatedvalue, childformula, childaddress);
        updatechildrencell(childaddress);
    }
}

function addChildren(formula)
{
    let childaddress=adressbar.value;
    let encodedformula=formula.split(" ");//encodedformula=[A1, +, 10]
    for(let i=0;i<encodedformula.length;i++)
    {
        let ascii=encodedformula[i].charCodeAt(0)//"A"=ascill
        if(ascii>=65 && ascii<=90)
        {
            let [parentcell, parentcellprop]=activeandstoragecell(encodedformula[i]);
            parentcellprop.children.push(childaddress);
        }
    }
}

function deleteChildren(formula)
{
    let childaddress=adressbar.value;
    let encodedformula=formula.split(" ");//encodedformula=[A1, +, 10]
    for(let i=0;i<encodedformula.length;i++)
    {
        let ascii=encodedformula[i].charCodeAt(0)//"A"=ascill
        if(ascii>=65 && ascii<=90)
        {
            let [parentcell, parentcellprop]=activeandstoragecell(encodedformula[i]);
            let idx=parentcellprop.children.indexOf(childaddress);
            parentcellprop.children.splice(idx, 1);

        }
    }
}
function evaluateformula(formula)//formula="A1 + 10"
{
    let encodedformula=formula.split(" ");//encodedformula=[A1, +, 10]
    for(let i=0;i<encodedformula.length;i++)
    {
        let ascii=encodedformula[i].charCodeAt(0)//"A"=ascill
        if(ascii>=65 && ascii<=90)
        {
            let [cell, cellprop]=activeandstoragecell(encodedformula[i]);
            encodedformula[i]=cellprop.value;//collecting value stored at A1
        }
    }

    let decodedvalue=encodedformula.join(" ");
    return eval(decodedvalue);//evaluate the formula
}

function setUIvalandcellprop(evaluatedvalue, inputformula, address)
{
   // let address=adressbar.value;
    let [cell, cellprop]=activeandstoragecell(address);
    //updating UI
    cell.innerText=evaluatedvalue;

    //updating storage grid
    cellprop.value=evaluatedvalue;
    cellprop.formula=inputformula;
}