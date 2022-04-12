//creating an array of array for storing cell properties at each cell
let collectedSheetDB=[];
let sheetDB=[];

{
    addsheetbutton=document.querySelector(".add-sheet-cont");
    addsheetbutton.click();
}
/*for(let i=0;i<100;i++)
{
    let sheetrow=[];
    for(let j=0;j<26;j++)
    {   //creating object for each cell
        let cellprop= {
            bold : false,
            italic :false,
            underline : false,
            alignment: "left",
            textColor: "#000000",
            BGcolor: "#000000",
            fontFamily: "monospace",
            fontSize: "14",
            value:"",
            formula:"",
            children:[],
        };
        sheetrow.push(cellprop);
    }
    sheetDB.push(sheetrow);
}*/


//get reference of all properties
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");
let textColor=document.querySelector(".font-color-prop");
let BGcolor=document.querySelector(".BGcolor-prop");
let fontFamily=document.querySelector(".fonttype");
let fontSize=document.querySelector(".fontsize");
let alignment=document.querySelectorAll(".alignment");
let leftalign=alignment[0];
let midalign=alignment[1];
let rightalign=alignment[2];


//attach event listener to properties
bold.addEventListener("click", (e)=>{
    let address=adressbar.value;//we get address of active cell

    //fnc returns active cell and storage cell to modify
    let [cell, cellprop]=activeandstoragecell(address);
    let activeboldoption="#d1d8e0";
    let inactiveboldoption= "whitesmoke";

    //performing modification for bold properties
    cellprop.bold=!cellprop.bold;//toggled value of bold property for the cell in storage
    cell.style.fontWeight= cellprop.bold ?"bold": "normal";//assigning bold property to active cell
    bold.style.backgroundColor= cellprop.bold ? activeboldoption : inactiveboldoption; //making bold option active/inactive


})

italic.addEventListener("click", (e)=>{
    let address=adressbar.value;
    let [cell, cellprop]=activeandstoragecell(address);
    let activeboldoption="#d1d8e0";
    let inactiveboldoption= "whitesmoke";
    cellprop.italic=!cellprop.italic;//toggled value of bold property for the cell in storage
    cell.style.fontStyle= cellprop.italic ?"italic": "normal";//assigning bold property to active cell
    italic.style.backgroundColor= cellprop.italic ? activeboldoption : inactiveboldoption; //making bold option active/inactive
})

underline.addEventListener("click", (e)=>{
    let address=adressbar.value;
    let [cell, cellprop]=activeandstoragecell(address);
    let activeboldoption="#d1d8e0";
    let inactiveboldoption= "whitesmoke";
    cellprop.underline=!cellprop.underline;//toggled value of bold property for the cell in storage
    cell.style.textDecoration= cellprop.italic ?"underline": "none";//assigning bold property to active cell
    underline.style.backgroundColor= cellprop.underline ? activeboldoption : inactiveboldoption; //making bold option active/inactive
})

fontSize.addEventListener("change", (e)=>
{
    let address=adressbar.value;
    let [cell, cellprop]=activeandstoragecell(address);
    cellprop.fontSize=fontSize.value;
    cell.style.fontSize=cellprop.fontSize+ "px";
    fontSize.style.value= cellprop.fontSize;
})

fontFamily.addEventListener("change", (e)=>
{
    let address=adressbar.value;
    let [cell, cellprop]=activeandstoragecell(address);
    cellprop.fontFamily=fontFamily.value;
    cell.style.fontFamily=cellprop.fontFamily;
    fontFamily.value= cellprop.fontFamily;
})

textColor.addEventListener("change", (e)=>
{
    let address=adressbar.value;
    let [cell, cellprop]=activeandstoragecell(address);
    cellprop.textColor=textColor.value;
    cell.style.color=cellprop.textColor;
    textColor.value= cellprop.textColor;
})

BGcolor.addEventListener("change", (e)=>
{
    let address=adressbar.value;
    let [cell, cellprop]=activeandstoragecell(address);
    cellprop.BGcolor=BGcolor.value;
    cell.style.backgroundColor=cellprop.BGcolor;
    BGcolor.value= cellprop.BGcolor;
})

alignment.forEach((alignelement)=>{
    alignelement.addEventListener("click", (e)=>{
        let address=adressbar.value;
        let [cell, cellprop]=activeandstoragecell(address);

        let alignvalue=e.target.classList[0];//class left/right/center??
        cell.style.textAlign=alignvalue;//ui part 1
        cellprop.alignment=alignvalue;//storage updated
        
        //ui part 2
        let activeboldoption="#d1d8e0";
        let inactiveboldoption= "whitesmoke";
        switch(alignvalue)
        {
            case "left":
                leftalign.style.backgroundColor=activeboldoption;
                rightalign.style.backgroundColor=inactiveboldoption;
                midalign.style.backgroundColor=inactiveboldoption;
                break;
            case "center":
                midalign.style.backgroundColor=activeboldoption;
                rightalign.style.backgroundColor=inactiveboldoption;
                leftalign.style.backgroundColor=inactiveboldoption;
                break;
            case "right":
                rightalign.style.backgroundColor=activeboldoption;
                leftalign.style.backgroundColor=inactiveboldoption;
                midalign.style.backgroundColor=inactiveboldoption;
                break;
        }

        
    })
});

let activeboldoption="#d1d8e0";
let inactiveboldoption= "whitesmoke";
let allcells=document.querySelectorAll(".cell");
allcells.forEach((cell)=>{
    cell.addEventListener("click",(e)=>{
        //Task Area , need address of cell
        let address=adressbar.value;
        let [rid, cid]=decode(address);
        let cellprop=sheetDB[rid][cid];

        //Task at cell
        cell.style.fontWeight= cellprop.bold ?"bold": "normal";
        cell.style.fontStyle= cellprop.italic?"italic": "normal";
        cell.style.textDecoration= cellprop.italic ?"underline": "none";
        cell.style.fontSize=cellprop.fontSize+ "px";
        cell.style.fontFamily=cellprop.fontFamily;
        cell.style.color=cellprop.textColor;
        cell.style.backgroundColor=cellprop.BGcolor==="#000000"? "transparent": cellprop.BGcolor;
        cell.style.textAlign=cellprop.alignment;//ui part 1


        //Task at property-bar
        bold.style.backgroundColor= cellprop.bold ? activeboldoption : inactiveboldoption; 
        italic.style.backgroundColor= cellprop.italic ? activeboldoption : inactiveboldoption;
        underline.style.backgroundColor= cellprop.underline ? activeboldoption : inactiveboldoption; 
        fontSize.style.value= cellprop.fontSize;
        fontFamily.value= cellprop.fontFamily;
        textColor.value= cellprop.textColor;
        BGcolor.value= cellprop.BGcolor;
        switch(cellprop.alignment)
        {
            case "left":
                leftalign.style.backgroundColor=activeboldoption;
                rightalign.style.backgroundColor=inactiveboldoption;
                midalign.style.backgroundColor=inactiveboldoption;
                break;
            case "center":
                midalign.style.backgroundColor=activeboldoption;
                rightalign.style.backgroundColor=inactiveboldoption;
                leftalign.style.backgroundColor=inactiveboldoption;
                break;
            case "right":
                rightalign.style.backgroundColor=activeboldoption;
                leftalign.style.backgroundColor=inactiveboldoption;
                midalign.style.backgroundColor=inactiveboldoption;
                break;
        }

        let formulabar=document.querySelector(".formula");
        formulabar.value=cellprop.formula;
        cell.innerText=cellprop.value;
    })
})
//Storage and UI Cell
function activeandstoragecell(address)
{
    let [rid,cid]=decode(address);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)//selecting active cell from document
    let cellprop=sheetDB[rid][cid];//selecting storage cell from sheet db
    return [cell, cellprop];

}

function decode(address)//A1
{
    let rid=Number(address.slice(1))-1;
    let cid=Number(address.charCodeAt(0))-65;
    return [rid, cid];//return active cell address
}