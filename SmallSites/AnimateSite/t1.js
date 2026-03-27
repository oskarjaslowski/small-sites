const wrapper = document.getElementById("tiles");
let columns = 0, rows = 0;

const colors = [
    "#ffae24",
    "#e50000",
    "#ee82ee",
    "#00deff",
    "#60e991",
    "#6a5acd",
    "fff"
]

let count = -1;

const handleOnClick = index => {
    count=count+1;
    anime({
        targets: ".tile",
        backgroundColor: colors[count%(colors.length - 1)],
        delay: anime.stagger(10, {
            grid: [columns, rows],
            from: index
        })
    })
}

const createTile = index => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.onclick = e => handleOnClick(index);
    return tile;
}

const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    })
}

const createGrid = () => {
    wrapper.innerHTML = "";
    columns = Math.floor(document.body.clientWidth/25);
    rows = Math.floor(document.body.clientHeight/25);

    wrapper.style.setProperty("--columns",columns);
    wrapper.style.setProperty("--rows",rows);

    createTiles(columns*rows);
}

createGrid();

window.onresize = () => createGrid();
