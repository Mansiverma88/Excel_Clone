let addsheetbutton= document.querySelector(".add-sheet-cont");
let sheetfoldercontainer=document.querySelector(".sheet-folder-cont");

addsheetbutton.addEventListener("click", (e)=>{
    console.log("clicked");
    let sheet=document.createElement("div");
    sheet.setAttribute("class","sheet-folder");

    let allsheetfolder=document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allsheetfolder.length);
    sheet.innerHTML=`<div class="sheet-content">Sheet ${allsheetfolder.length+1}</div>`

    sheetfoldercontainer.appendChild(sheet);
    sheet.scrollIntoView();
    createsheetDb(sheet);
    createGraphComponenetMatrix(sheet);
    handleactivesheet(sheet);
    handlesheetremoval(sheet);
    sheet.click();
})

function handlesheetremoval(sheet){
    sheet.addEventListener("mousedown", (e)=>
    {
        console.log("inside removing");
        if(e.button!==0) return;
        console.log("inside removing2");
        let allsheetfolder=document.querySelectorAll(".sheet-folder");
        if(allsheetfolder.length==1)
        {
            alert('At least one sheet is required'); return;
        }

        let response=confirm("This action will permanently delete sheet data. Are you sure?");
        if (response===false) return;

        let sheetidx=Number(sheet.getAttribute("id"));

        //Database se removing sheet
        collectedSheetDB.splice(sheetidx, 1);
        collectedgraphComponentMatrix.splice(sheetidx,1);

        //ui
        handlesheetUIremoval(sheet);
        sheetDB=collectedSheetDB[0];
        graphComponentMatrix=collectedgraphComponentMatrix[0];
        handlesheetprop();
    })
}

function handlesheetUIremoval(sheet){
    sheet.remove();
    let activesheetcolour="#d1d8e0";
    let allsheetfolder=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allsheetfolder.length;i++)
    {
        allsheetfolder[i].setAttribute("id", i);
        let sheetcontent=allsheetfolder[i].querySelector(".sheet-content");
        sheetcontent.innerText=`Sheet${i+1}`;
        allsheetfolder[i].style.backgroundColor="transparent";
    }
    allsheetfolder[0].style.backgroundColor=activesheetcolour;
}
function createsheetDb(sheet)
{
    sheetDB=[]
    for(let i=0;i<100;i++)
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
    }
    collectedSheetDB.push(sheetDB);
    
}



function handleactivesheet(sheet)
{
    sheet.addEventListener("click",(e)=>{
        let sheetidx=sheet.getAttribute("id");
        handlesheetDB(sheetidx);//get attribute of sheet from collected sheet db
        handlesheetprop();
        handlesheetUI(sheet);
    })
}

function handlesheetDB(sheetidx){
    sheetDB=collectedSheetDB[sheetidx];
    graphComponentMatrix=collectedgraphComponentMatrix[sheetidx];
}
function handlesheetUI(sheet){
    let activesheetcolour="#d1d8e0";
    let allsheetfolder=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allsheetfolder.length;i++)
    {
        allsheetfolder[i].style.backgroundColor="transparent";
    }
    sheet.style.backgroundColor=activesheetcolour;
}

function handlesheetprop()
{
    for(let i=0;i<100;i++)
    {
        for(let j=0;j<26;j++)
        {
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`)
            cell.click();
        }
    }
    let firstcell=document.querySelector(".cell");
    firstcell.click();
}
function createGraphComponenetMatrix(sheet)
{
    graphComponentMatrix=[];
    for(let i=0; i<100; i++)
    {
    let row=[];
    for(let j=0; j<26; j++)
    {
        //pushing an array of children cell here
        row.push([]);
    }
    graphComponentMatrix.push(row);
    }
    collectedgraphComponentMatrix.push(graphComponentMatrix);
}