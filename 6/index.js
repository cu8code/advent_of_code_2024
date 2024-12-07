const fs = require("fs/promises")
const grid = []
const main = async () => {
    try {
        const bdata = await fs.readFile('./input')
        const sdata = bdata.toString()
        console.log("Raw data:", sdata)
        
        for (const line of sdata.split('\n')){
            if (line.trim() !== ""){
                grid.push(line.split(''))
            }
        }
        console.log("Grid:", grid)
        
        let target = findTarget(grid)
        console.log("Initial target:", target)
        
        if (!target) {
            console.error("No target ('^') found in the grid!")
            return
        }
        
      	let dir = [-1, 0]
				let cpos = [target]
        
        while (true) {
            const next = merge(target, dir)
            console.log("Current state:", { target, next, dir, nextCell: pain(next) })
            
            if (outofbound(next)) {
                console.log("Reached out of bounds")
                break
            }
            
            const nextCell = pain(next)
            if (nextCell === ".") {
                update(next, target)
                target = next
                if (!cpos.some(pos => pos[0] === target[0] && pos[1] === target[1])) {
                    cpos.push(target)
                }
            } else if (nextCell === "#") {
                dir = turn90degree(dir) 
            } else {
                console.log("Unexpected cell type:", nextCell)
                break
            }
        }
        
        console.log("Path length:", cpos.length)
    } catch (error) {
        console.error("Error:", error)
    }
}

const findTarget = (grid) => {
    for(let y = 0; y < grid.length; y++){
        for(let x = 0; x < grid[0].length; x++){
            if (grid[y][x] === '^')
                return [y, x]
        }
    }
    return null
}

const outofbound = (a) => {
    return a[0] < 0 || a[0] >= grid.length || 
           a[1] < 0 || a[1] >= grid[0].length
}

const merge = (a, b) => {
    return [a[0] + b[0], a[1] + b[1]]
}

const pain = (a) => {
    if (outofbound(a)) {
        console.error("Attempting to access out of bounds:", a)
        return null
    }
    return grid[a[0]][a[1]]
}

const turn90degree = (dir) => {
    if (dir[0] === -1 && dir[1] === 0) {
        return [0, 1];
    } else if (dir[0] === 0 && dir[1] === 1) {
        return [1, 0];
    } else if (dir[0] === 1 && dir[1] === 0) {
        return [0, -1];
    } else if (dir[0] === 0 && dir[1] === -1) {
        return [-1, 0];
    }
    return dir;
}

const update = (a, b) => {
    grid[a[0]][a[1]] = '^'
    grid[b[0]][b[1]] = '.'
}

main()
