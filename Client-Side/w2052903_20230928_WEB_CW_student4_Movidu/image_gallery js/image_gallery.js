var parent = document.getElementById("main"),
    aside = document.getElementById("aside"),
    asideTarget = aside.querySelector(".aside--details"),
    asideClose = aside.querySelector(".close"),
    tilesParent = document.querySelectorAll(".tiles-a"),
    tiles = Array.from(tilesParent).flatMap(function (parent) {
        return Array.from(parent.querySelectorAll("a"));
    }),
    slideClass = "show-detail";

// Tile click
tiles.forEach(function (tile) {
    tile.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!document.documentElement.classList.contains(slideClass)) {
            tiles.forEach(function (t) { return t.classList.remove("active"); });
            tile.classList.add("active");
            tile.setAttribute("aria-expanded", "true");
            loadTileData(tile);
        }
        else {
            killAside();
            tile.setAttribute("aria-expanded", "false");
        }
    });
});

// Kill aside
asideClose.addEventListener("click", function (e) {
    e.preventDefault();
    killAside();
});

// Load data to aside
function loadTileData(target) {
    var itemHtml = target.querySelector(".details").innerHTML;
    asideTarget.innerHTML = itemHtml;
    showAside();
}

// Show/hide aside
function showAside() {
    if (!document.documentElement.classList.contains(slideClass)) { 
        document.documentElement.classList.toggle(slideClass);
        aside.setAttribute("aria-hidden", "false");
        focusCloseButton();
    }
}

// Handle ESC key
window.addEventListener("keyup", function (e) {
    // grab key pressed
    var code = e.keyCode ? e.keyCode : e.which;
    // escape
    if (code === 27) {
        killAside();
    }
});

// Kill aside
function killAside() {
    if (document.documentElement.classList.contains(slideClass)) {
        document.documentElement.classList.remove(slideClass);
        sendFocusBack();
        aside.setAttribute("aria-hidden", "true");
        tiles.forEach(function (t) { return t.setAttribute("aria-expanded", "false"); });
    }
}

// Send focus to close button
function focusCloseButton() {
    asideClose.focus();
}

// Send focus back to item that triggered event
function sendFocusBack() {
    document.querySelector(".active").focus();
}

// Handle body click to close off-canvas
parent.addEventListener("click", function (e) {
    if (document.documentElement.classList.contains(slideClass)) {
        killAside();
    }
});
