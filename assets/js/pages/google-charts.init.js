! function(c) {
    "use strict";
    var e = function() {
        this.$body = c("body")
    };
    e.prototype.createLineChart = function(e, t, a, o) {
        var r = {
                fontName: "Montserrat",
                height: 340,
                curveType: "function",
                fontSize: 12,
                chartArea: {
                    left: "5%",
                    width: "90%",
                    height: 300
                },
                backgroundColor: {
                    fill: "transparent"
                },
                hAxis: {
                    textStyle: {
                        color: "#98a6ad"
                    }
                },
                pointSize: 4,
                tooltip: {
                    textStyle: {
                        fontName: "Montserrat",
                        fontSize: 13
                    }
                },
                vAxis: {
                    title: a,
                    titleTextStyle: {
                        fontSize: 14,
                        italic: !1,
                        color: "#98a6ad"
                    },
                    gridlines: {
                        color: "transparent",
                        count: 10
                    },
                    baselineColor: "#98a6ad",
                    textStyle: {
                        color: "#98a6ad"
                    }
                },
                legend: {
                    position: "top",
                    alignment: "center",
                    textStyle: {
                        fontSize: 13,
                        color: "#98a6ad"
                    }
                },
                lineWidth: 3,
                colors: o
            },
            n = google.visualization.arrayToDataTable(t),
            i = new google.visualization.LineChart(e);
        return i.draw(n, r), i
    }, e.prototype.createAreaChart = function(e, t, a, o) {
        var r = {
                fontName: "Montserrat",
                height: 340,
                curveType: "function",
                fontSize: 14,
                chartArea: {
                    left: "5%",
                    width: "90%",
                    height: 300
                },
                backgroundColor: {
                    fill: "transparent"
                },
                hAxis: {
                    textStyle: {
                        color: "#98a6ad"
                    }
                },
                pointSize: 4,
                tooltip: {
                    textStyle: {
                        fontName: "Montserrat",
                        fontSize: 14
                    }
                },
                vAxis: {
                    title: a,
                    titleTextStyle: {
                        fontSize: 14,
                        italic: !1,
                        color: "#98a6ad"
                    },
                    gridarea: {
                        color: "#f5f5f5",
                        count: 10
                    },
                    gridlines: {
                        color: "transparent"
                    },
                    baselineColor: "#98a6ad",
                    textStyle: {
                        color: "#98a6ad"
                    },
                    minValue: 0
                },
                legend: {
                    position: "top",
                    alignment: "end",
                    textStyle: {
                        fontSize: 13,
                        color: "#98a6ad"
                    }
                },
                lineWidth: 2,
                colors: o
            },
            n = google.visualization.arrayToDataTable(t),
            i = new google.visualization.AreaChart(e);
        return i.draw(n, r), i
    }, e.prototype.createColumnChart = function(e, t, a, o) {
        var r = {
                fontName: "Montserrat",
                height: 400,
                backgroundColor: {
                    fill: "transparent"
                },
                fontSize: 13,
                chartArea: {
                    left: "5%",
                    width: "90%",
                    height: 350
                },
                tooltip: {
                    textStyle: {
                        fontName: "Montserrat",
                        fontSize: 14
                    }
                },
                hAxis: {
                    textStyle: {
                        color: "#98a6ad"
                    }
                },
                vAxis: {
                    title: a,
                    titleTextStyle: {
                        fontSize: 14,
                        italic: !1,
                        color: "#98a6ad"
                    },
                    gridlines: {
                        color: "transparent",
                        count: 10
                    },
                    baselineColor: "#98a6ad",
                    minValue: 0
                },
                legend: {
                    position: "top",
                    alignment: "center",
                    textStyle: {
                        fontSize: 13,
                        color: "#98a6ad"
                    }
                },
                colors: o
            },
            n = google.visualization.arrayToDataTable(t),
            i = new google.visualization.ColumnChart(e);
        return i.draw(n, r), i
    }, e.prototype.createBarChart = function(e, t, a) {
        var o = {
                fontName: "Montserrat",
                height: 400,
                backgroundColor: {
                    fill: "transparent"
                },
                fontSize: 14,
                chartArea: {
                    left: "5%",
                    width: "90%",
                    height: 350
                },
                tooltip: {
                    textStyle: {
                        fontName: "Montserrat",
                        fontSize: 14
                    }
                },
                hAxis: {
                    textStyle: {
                        color: "#98a6ad"
                    },
                    baselineColor: "#98a6ad",
                    gridlines: {
                        color: "transparent",
                        count: 10
                    }
                },
                vAxis: {
                    textStyle: {
                        color: "#98a6ad"
                    },
                    minValue: 0
                },
                legend: {
                    position: "top",
                    alignment: "center",
                    textStyle: {
                        fontSize: 13,
                        color: "#98a6ad"
                    }
                },
                colors: a
            },
            r = google.visualization.arrayToDataTable(t),
            n = new google.visualization.BarChart(e);
        return n.draw(r, o), n
    }, e.prototype.createColumnStackChart = function(e, t, a, o) {
        var r = {
                fontName: "Montserrat",
                height: 400,
                backgroundColor: {
                    fill: "transparent"
                },
                fontSize: 13,
                chartArea: {
                    left: "5%",
                    width: "90%",
                    height: 350
                },
                isStacked: !0,
                tooltip: {
                    textStyle: {
                        fontName: "Montserrat",
                        fontSize: 14
                    }
                },
                hAxis: {
                    textStyle: {
                        color: "#98a6ad"
                    }
                },
                vAxis: {
                    title: a,
                    textStyle: {
                        color: "#98a6ad"
                    },
                    titleTextStyle: {
                        fontSize: 14,
                        italic: !1,
                        color: "#98a6ad"
                    },
                    gridlines: {
                        color: "transparent",
                        count: 10
                    },
                    baselineColor: "#98a6ad",
                    minValue: 0
                },
                legend: {
                    position: "top",
                    alignment: "center",
                    textStyle: {
                        fontSize: 13,
                        color: "#98a6ad"
                    }
                },
                colors: o
            },
            n = google.visualization.arrayToDataTable(t),
            i = new google.visualization.ColumnChart(e);
        return i.draw(n, r), i
    }, e.prototype.createBarStackChart = function(e, t, a) {
        var o = {
                fontName: "Montserrat",
                height: 400,
                backgroundColor: {
                    fill: "transparent"
                },
                fontSize: 13,
                chartArea: {
                    left: "5%",
                    width: "90%",
                    height: 350
                },
                isStacked: !0,
                tooltip: {
                    textStyle: {
                        fontName: "Montserrat",
                        fontSize: 14
                    }
                },
                hAxis: {
                    textStyle: {
                        color: "#98a6ad"
                    },
                    baselineColor: "#98a6ad",
                    gridlines: {
                        color: "transparent",
                        count: 10
                    }
                },
                vAxis: {
                    textStyle: {
                        color: "#98a6ad"
                    }
                },
                legend: {
                    position: "top",
                    alignment: "center",
                    textStyle: {
                        fontSize: 13,
                        color: "#98a6ad"
                    }
                },
                colors: a
            },
            r = google.visualization.arrayToDataTable(t),
            n = new google.visualization.BarChart(e);
        return n.draw(r, o), n
    }, e.prototype.createPieChart = function(e, t, a, o, r) {
        var n = {
            fontName: "Montserrat",
            fontSize: 13,
            height: 300,
            backgroundColor: {
                fill: "transparent"
            },
            chartArea: {
                left: 50,
                width: "90%",
                height: "90%"
            },
            legend: {
                textStyle: {
                    fontSize: 13,
                    color: "#98a6ad"
                }
            },
            colors: a
        };
        o && (n.is3D = !0), r && (n.is3D = !0, n.pieSliceText = "label", n.slices = {
            2: {
                offset: .15
            },
            5: {
                offset: .1
            }
        });
        var i = google.visualization.arrayToDataTable(t),
            l = new google.visualization.PieChart(e);
        return l.draw(i, n), l
    }, e.prototype.createDonutChart = function(e, t, a) {
        var o = {
                fontName: "Montserrat",
                fontSize: 13,
                height: 300,
                backgroundColor: {
                    fill: "transparent"
                },
                pieHole: .55,
                chartArea: {
                    left: 50,
                    width: "90%",
                    height: "90%"
                },
                legend: {
                    textStyle: {
                        fontSize: 13,
                        color: "#98a6ad"
                    }
                },
                colors: a
            },
            r = google.visualization.arrayToDataTable(t),
            n = new google.visualization.PieChart(e);
        return n.draw(r, o), n
    }, e.prototype.init = function() {
        var e = this,
        i = [
            ["Category", "Pieces"],
            ["Rings", 1100],
            ["Earings", 225],
            ["Pendents", 235],
            ["necklase", 568],
            ["Others", 758]
        ];
        e.createPieChart(c("#pie-3d-chart")[0], i, ["#5553ce", "#297ef6", "#e52b4c", "#ffa91c", "#32c861"], !0, !1);
        var l = [
            ["Category", "Pieces"],
            ["Rings", 25],
            ["Earings", 56],
            ["Pendents", 58],
            ["necklase", 47],
            ["Others", 96]
        ];
        e.createPieChart(c("#3d-exploded-chart")[0], l, ["#5553ce", "#297ef6", "#e52b4c", "#ffa91c", "#32c861"], !0, !1),
        
        c(window).on("resize", function() {
            e.createPieChart(c("#pie-3d-chart")[0], i, ["#5553ce", "#297ef6", "#e52b4c", "#ffa91c", "#32c861"], !0, !1),
            e.createPieChart(c("#3d-exploded-chart")[0], l, ["#5553ce", "#297ef6", "#e52b4c", "#ffa91c", "#32c861"], !0, !1)
        })
    }, c.GoogleChart = new e, c.GoogleChart.Constructor = e
}(window.jQuery),
function(e) {
    "use strict";
    google.load("visualization", "1", {
        packages: ["corechart"]
    }), google.setOnLoadCallback(function() {
        e.GoogleChart.init()
    })
}(window.jQuery);