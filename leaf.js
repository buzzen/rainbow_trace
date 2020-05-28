var hr_to_color = function (hr) {
    var color = "black";
    if (hr < 114) {
        color = "#3ff";
    } else if (hr < 124) {
        color = "#33f";
    } else if (hr < 143) {
        color = "#3f3";
    } else if (hr < 158) {
        color = "#ff3";
    } else if (hr < 171) {
        color = "#f3f";
    } else {
        color = "#f33";
    }

    return color;
};

// var add_circle = function (pair) {
//     L.circle(pair[0], { 
//                 radius: 80,
//                 stroke: false,
//                 fillColor: hr_to_color(pair[1]),
//                 fillOpacity: 0.2
//             }).addTo(mymap);
// };

var mymap = L.map('map').setView([27.73583, 111.350927], 13);
L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png\
?apikey=30ed08b6749b4fa2a0bbfe8a111078f4', {
    attribution: 'Maps © <a href="https://www.thunderforest.com">\
Thunderforest</a>, Data © \
<a href="https://www.openstreetmap.org/copyright">\
OpenStreetMap contributors</a>',
}).addTo(mymap);

fetch("gpx_hr.json")
.then(response => response.json())
.then(function (pairs) {
    // add circle to the map

    var add_circle = function (pairs, i) {
        if (i === pairs.length) return;

        mymap.setView(pairs[i][0], 14);
        L.circle(pairs[i][0], { 
                    radius: 80,
                    stroke: false,
                    fillColor: hr_to_color(pairs[i][1]),
                    fillOpacity: 0.8
                }).addTo(mymap);
        setTimeout(add_circle, 0, pairs, i+5);
    };

    add_circle(pairs, 0);
});
