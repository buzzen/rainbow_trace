var hr_to_color = function (hr) {
    var color = "#333";
    if (hr < 114) {
        color = "#3cc";
    } else if (hr < 124) {
        color = "#33c";
    } else if (hr < 143) {
        color = "#3c3";
    } else if (hr < 158) {
        color = "#dd3";
    } else if (hr < 171) {
        color = "#c3c";
    } else {
        color = "#c33";
    }

    return color;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var add_circle = function (pair) {
    L.circle(pair[0], { 
                radius: 80,
                stroke: false,
                fillColor: hr_to_color(pair[1]),
                fillOpacity: 0.2
            }).addTo(mymap);
};

var mymap = L.map('map').setView([27.73583, 111.350927], 14);
L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png\
?apikey=30ed08b6749b4fa2a0bbfe8a111078f4', {
    attribution: 'Maps © <a href="https://www.thunderforest.com">\
Thunderforest</a>, Data © \
<a href="https://www.openstreetmap.org/copyright">\
OpenStreetMap contributors</a>',
}).addTo(mymap);

fetch("gpx_hr.json")
.then(response => response.json())
.then(async function (pairs) {
    // add circle to the map

    for (var i = 0; i < pairs.length; i++) {
        if (i % 50 == 0) {
            mymap.setView(pairs[i][0], 14);
        }

        add_circle(pairs[i]);
        await sleep(1);
    }
});
