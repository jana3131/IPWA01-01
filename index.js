function isRTLLanguage() {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'ps', 'sd', 'ku'];
    const userLanguage = navigator.language || navigator.userLanguage;
    return rtlLanguages.some(lang => userLanguage.startsWith(lang));
}

document.addEventListener('DOMContentLoaded', function() {
    if (isRTLLanguage()) {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
});

var co2Daten = [
    { land: "Saudi Arabien", unternehmen: "Saudi Aramco", co2: 1.839 },
    { land: "Indien", unternehmen: "Coal India", co2: 1.548 },
    { land: "China", unternehmen: "CHN Energy", co2: 1.533 },
    { land: "Iran", unternehmen: "NIOC", co2: 1.262 },
    { land: "China", unternehmen: "Jinneng Group", co2: 1.228 },
    { land: "USA", unternehmen: "Exxon Mobil", co2: 562 },
    { land: "USA", unternehmen: "Chevron", co2: 487 },
    { land: "UK", unternehmen: "Shell", co2: 418 },
    { land: "China", unternehmen: "Huaneng Power International", co2: 416 },
    { land: "Frankreich", unternehmen: "TotalEnergies", co2: 359 },
    { land: "UK", unternehmen: "BP", co2: 347 },
    { land: "Südafrika", unternehmen: "Eskom", co2: 215 },
    { land: "Deutschland", unternehmen: "E. ON", co2: 120 },
    { land: "Russland", unternehmen: "Gazprom", co2: 110 },
    { land: "USA", unternehmen: "AES Corporation", co2: 86 }
];

var currentSort = {
    column: null, 
    direction: "asc"
};

function renderTable(data) {
    var newContent = " ";
    for (i in data) {
        var newLand = data[i]["land"];
        var newUnternehmen = data[i]["unternehmen"];
        var newCo2 = data[i]["co2"];
        var newRow = "<tr><td>" + newLand + "</td>" + "<td>" + newUnternehmen + "</td>" + "<td>" + newCo2 + "</td></tr>";
        newContent = newContent + newRow;
    }

    $("#tContent").html(newContent);
    $("th span.sort-icon").html('');
    if (currentSort.column) {
        $("th#" + currentSort.column + " span.sort-icon").html(
            currentSort.direction === "asc" ? " ↑" : " ↓"
        );
    }
}

function sortTable(column) {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
    } else {
        currentSort.column = column;
        currentSort.direction = "asc";
    }
    
    co2Daten.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];
        
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();
        
        if (valA < valB) {
            return currentSort.direction === "asc" ? -1 : 1;
        }
        if (valA > valB) {
            return currentSort.direction === "asc" ? 1 : -1;
        }
        return 0;
    });
    
    renderTable(co2Daten);
}

function performSearch() {
    const searchTerm = $("#search-input").val().toLowerCase();
    
    if (!searchTerm) {
        renderTable(co2Daten);
        return;
    }

    const filteredData = co2Daten.filter(item => 
        item.land.toLowerCase().includes(searchTerm) ||
        item.unternehmen.toLowerCase().includes(searchTerm)
    );

    renderTable(filteredData);
}

$("#search-button").click(performSearch);

$("#search-input").keydown(function(event) {
    if (event.key === "Enter") {
        performSearch();
    }
});

renderTable(co2Daten);

$("th#land").click(() => sortTable("land"));
$("th#unternehmen").click(() => sortTable("unternehmen"));

// Mobile menu functionality
document.getElementById('mobile-menu-button')?.addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.classList.toggle('show');
    }
    
    const sideMenu = document.getElementById('menu');
    if (sideMenu) {
        sideMenu.classList.toggle('show');
    }
});

// Close menu when clicking outside on mobile
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        const mobileButton = document.getElementById('mobile-menu-button');
        const navLinks = document.getElementById('nav-links');
        const sideMenu = document.getElementById('menu');
        
        if (mobileButton && navLinks && sideMenu && 
            !mobileButton.contains(event.target) && 
            !navLinks.contains(event.target) &&
            !sideMenu.contains(event.target)) {
            navLinks.classList.remove('show');
            sideMenu.classList.remove('show');
        }
    }
});