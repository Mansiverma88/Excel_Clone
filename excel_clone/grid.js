let addresscolcont=document.querySelector(".address-col-cont");
let addressrowcontent=document.querySelector(".address-row-cont");
let cellcont=document.querySelector(".cell-cont");
let adressbar=document.querySelector(".addressbar");

for(let i=0;i<100;i++)
{
    let addresscol=document.createElement("div");//creating a divison for each column
    addresscol.innerText=(i+1);//ading text to column
    addresscol.setAttribute("class", "address-col");//setting classname to each div
    addresscolcont.appendChild(addresscol);
}

for(let i=0;i<26;i++)
{
    let addressrow=document.createElement("div");
    addressrow.innerText=String.fromCharCode(65+i);
    addressrow.setAttribute("class","address-row");
    addressrowcontent.appendChild(addressrow);
}

for(let i=0;i<100;i++)
{
    let rowcell=document.createElement("div");
    rowcell.setAttribute("class", "rowcell");
    for(let j=0;j<26;j++)
    {
        let cell=document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");

        //setting attributes for selection of storage cell and active cell
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);

        addaddress(cell, i, j);//sets address of selected cell on addressbar
        rowcell.append(cell);
    }
    cellcont.appendChild(rowcell);
}

function addaddress(cell, i, j)
{
    cell.addEventListener("click", (e)=>{
        let rowid=i+1;
        let colid=String.fromCharCode(65+j);
        adressbar.value=`${colid}${rowid}`
    })
}

//to automatically select first cell of sheet
let firstcell=document.querySelector(".cell");
firstcell.click();

