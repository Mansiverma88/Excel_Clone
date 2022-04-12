let downloadbtn=document.querySelector(".download");
let uploadbtn=document.querySelector(".upload");

downloadbtn.addEventListener("click",(e)=>{
    let jsondata=JSON.stringify([sheetDB, graphComponentMatrix]);
    let file=new Blob([jsondata],{type:"application/json"});

    let a=document.createElement("a");
    a.href=URL.createObjectURL(file);
    a.download="SheetData.json";
    a.click();
})

uploadbtn.addEventListener("click",(e)=>{
    //open file explorer
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let fr=new FileReader();
        let files=input.files;
        let fileobj=files[0];

        fr.readAsText(fileobj);
        fr.addEventListener("load",(e)=>{
            let readSheetData=JSON.parse(fr.result);

            //create sheet
            addsheetbutton.click();
            sheetDB=readSheetData[0];
            graphComponentMatrix=readSheetData[1];

            collectedSheetDB[collectedSheetDB.length-1]=sheetDB;
            collectedgraphComponentMatrix[collectedgraphComponentMatrix.length-1]=graphComponentMatrix;

            //UI
            handlesheetprop();
        })
    })
})