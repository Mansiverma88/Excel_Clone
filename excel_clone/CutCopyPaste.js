let ctrlKey;//stores wheteher ctrl key is pressed or not
console.log("inside cop");
let copybtn=document.querySelector(".copy");
let cutbtn=document.querySelector(".cut");
let pastebtn=document.querySelector(".paste");
let rowdiff=0;
let coldiff=0;
//check if ctrl key is selected or not
document.addEventListener("keydown", (e)=>
{
    console.log("inside cop2");
    ctrlKey=e.ctrlKey;
})
document.addEventListener("keyup", (e)=>
{
    ctrlKey=e.ctrlKey;
})

for(let i=0;i<100;i++)
{
    for(let j=0; j<26;j++)
    {
        let selectedcell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleselectedcell(selectedcell);
    }
}

let rangestorage=[];
function handleselectedcell(cell)
{
    cell.addEventListener("click",(e)=>{
        if(!ctrlKey)
        {
            for(let i=rangestorage.length-1;i>=0;i--)
            {
                let prevcell=document.querySelector(`.cell[rid="${rangestorage[i][0]}"][cid="${rangestorage[i][1]}"]`);
                prevcell.style.border="rgb(207, 205, 205) .5mm solid";

                rangestorage.pop();
            }
            return;
        }

        if(rangestorage.length==2) {
            let prevcell=document.querySelector(`.cell[rid="${rangestorage[1][0]}"][cid="${rangestorage[1][1]}"]`);
            prevcell.style.border="rgb(207, 205, 205) .5mm solid";

            rangestorage.pop();
            cell.style.border="solid 3px #2187c4";
            let rid=Number(cell.getAttribute("rid"));
            let cid=Number(cell.getAttribute("cid"));
            rangestorage.push([rid, cid]);
            console.log(rangestorage[0], rangestorage[1]);
            rowdiff=Math.abs(rangestorage[0][0]-rangestorage[1][0]);
            coldiff=Math.abs(rangestorage[0][1]-rangestorage[1][1]);
            return;
        }

        cell.style.border="solid 3px #2187c4";
        let rid=Number(cell.getAttribute("rid"));
        let cid=Number(cell.getAttribute("cid"));
        rangestorage.push([rid, cid]);
        console.log(rangestorage[0], rangestorage[1]);
        if(rangestorage.length==2)
        {
            rowdiff=Math.abs(rangestorage[0][0]-rangestorage[1][0]);
            coldiff=Math.abs(rangestorage[0][1]-rangestorage[1][1]);
        }
    })
}

//to store data we wil use an array of objects
let clipboard=[];
copybtn.addEventListener("click", (e)=>{
    let srow=rangestorage[0][0];
    let scol=rangestorage[0][1];
    let erow=rangestorage[1][0];
    let ecol=rangestorage[1][1];

    for(let i=Math.min(srow, erow);i<=Math.max(srow,erow);i++)
    {
        let copyrow=[];
        for(let j=Math.min(ecol, scol);j<=Math.max(ecol, scol);j++)
        {
            let cellprop=sheetDB[i][j];
            copyrow.push(cellprop);
        }
        clipboard.push(copyrow);
    }
    //removing border form cells
    for(let i=rangestorage.length-1;i>=0;i--)
            {
                let prevcell=document.querySelector(`.cell[rid="${rangestorage[i][0]}"][cid="${rangestorage[i][1]}"]`);
                prevcell.style.border="rgb(207, 205, 205) .5mm solid";
            }
    console.log(clipboard);
})

pastebtn.addEventListener("click",(e)=>{
    let pivot=adressbar.value;
    let [targetrow, targetcol]=decode(pivot);

    for(let i=targetrow,cliprow=0;i<=targetrow+rowdiff;i++,cliprow++)
    {
        for(let j=targetcol, clipcol=0; j<=targetcol+coldiff; j++, clipcol++)
        {
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

            if(!cell)
            {
                alert('Not viable cell option');
                continue;
            }

            let copiedcellprop=clipboard[cliprow][clipcol];
            let cellprop=sheetDB[i][j];

            //DB
            cellprop.bold=copiedcellprop.bold;
            cellprop.italic=copiedcellprop.italic;
            cellprop.underline=copiedcellprop.underline;
            cellprop.alignment=copiedcellprop.alignment;
            cellprop.BGcolor=copiedcellprop.BGcolor;
            cellprop.fontColor=copiedcellprop.fontColor;
            cellprop.fontFamily=copiedcellprop.fontFamily;
            cellprop.fontSize=copiedcellprop.fontSize;
            cellprop.value=copiedcellprop.value;

            //UI
            cell.click();
        }
    }
})

cutbtn.addEventListener("click", (e)=>{
    let srow=rangestorage[0][0];
    let scol=rangestorage[0][1];
    let erow=rangestorage[1][0];
    let ecol=rangestorage[1][1];

    for(let i=Math.min(srow, erow);i<=Math.max(srow,erow);i++)
    {
        for(let j=Math.min(ecol, scol);j<=Math.max(ecol, scol);j++)
        {
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            let cellprop=sheetDB[i][j];

            //DB
            cellprop.bold=false;
            cellprop.italic=false;
            cellprop.underline=false;
            cellprop.alignment="left";
            cellprop.BGcolor="#000000";
            cellprop.fontColor="#000000";
            cellprop.fontFamily="monospace";
            cellprop.fontSize=14;
            cellprop.value="";

            //UI
            cell.click();
        }
        
    }
    //removing border form cells
    for(let i=rangestorage.length-1;i>=0;i--)
            {
                let prevcell=document.querySelector(`.cell[rid="${rangestorage[i][0]}"][cid="${rangestorage[i][1]}"]`);
                prevcell.style.border="rgb(207, 205, 205) .5mm solid";
            }
    
})
