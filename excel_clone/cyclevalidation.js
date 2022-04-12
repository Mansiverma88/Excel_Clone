let collectedgraphComponentMatrix=[];
let graphComponentMatrix=[];
/*for(let i=0; i<100; i++)
{
    let row=[];
    for(let j=0; j<26; j++)
    {
        //pushing an array of children cell here
        row.push([]);
    }
    graphComponentMatrix.push(row);
}*/

function isgraphcyclic(graphComponentMatrix)
{
    let visited=[];//these will be 2d matrix as our node is a cell, represente by row and column
    let dfsvisited=[];

    for(let i=0; i<100; i++)
    {
        let visitedrow=[];
        let dfsvisitedrow=[];
        for(let j=0; j<26; j++)
        {
            visitedrow.push(false);
            dfsvisitedrow.push(false);
        }
        visited.push(visitedrow);
        dfsvisited.push(dfsvisitedrow);
    }

    //Loop over all componenets of graph
    for(let i=0; i<100; i++)
    {
        for(let j=0; j<26; j++)
        {
            if(visited[i][j]==false)
            {
                let res=dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsvisited);
                if(res==true) return true;
            }
        }
    }
    return false;

}

//start: makr visted[node]=true; mark dfsvisited[node]=true;
//return: unmark dfsvisted[node]=false;//if node lies in some other path
function dfsCycleDetection(graphComponentMatrix, sr, sc, visited, dfsvisited){
    visited[sr][sc]=true;
    dfsvisited[sr][sc]=true;

    //traverse through all children nodes
    for(let childidx=0; childidx<graphComponentMatrix[sr][sc].length; childidx++)
    {
        let [nr, nc]=graphComponentMatrix[sr][sc][childidx];

        if(visited[nr][nc]===false)
        {   let cyclicchild=dfsCycleDetection(graphComponentMatrix, nr,nc, visited, dfsvisited );
            if(cyclicchild==true) return true;
        }

        else if(visited[nr][nc]===true && dfsvisited[nr][nc]==true) return true;
    }

    dfsvisited[sr][sc]=false;
    return false;
}