function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function updateTable(table, courses) {
        var data = [];
        for (var i = 0; i < courses.length; i++) {
            var row = Titanium.UI.createTableViewRow({
                title: courses[i].get("SIS_COURSE_ID")
            });
            data.push(row);
        }
        console.log(data);
        table.setData([]);
        table.setData(data);
    }
    function changeTerm(e) {
        console.log(e.selectedValue[0]);
        fetchCourse(e.selectedValue[0], deptcode);
    }
    function fetchCourse(term, deptcode) {
        var newCourse = Alloy.createCollection("Course");
        newCourse.setDir(term + "/" + deptcode);
        newCourse.fetch({
            success: function() {
                console.log("fetch from" + newCourse.url() + ":" + newCourse.models.length);
                updateTable($.courseTable, newCourse.models);
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "courseList";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("Course");
    $.__views.courseList = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "courseList"
    });
    $.__views.courseList && $.addTopLevelView($.__views.courseList);
    $.__views.__alloyId2 = Ti.UI.createPicker({
        top: "0dp",
        height: "100dp",
        id: "__alloyId2"
    });
    $.__views.courseList.add($.__views.__alloyId2);
    var __alloyId3 = [];
    $.__views.__alloyId4 = Ti.UI.createPickerRow({
        title: "20151",
        id: "__alloyId4"
    });
    __alloyId3.push($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createPickerRow({
        title: "20143",
        id: "__alloyId5"
    });
    __alloyId3.push($.__views.__alloyId5);
    $.__views.__alloyId2.add(__alloyId3);
    changeTerm ? $.__views.__alloyId2.addEventListener("change", changeTerm) : __defers["$.__views.__alloyId2!change!changeTerm"] = true;
    $.__views.courseTable = Ti.UI.createTableView({
        top: "100dp",
        id: "courseTable"
    });
    $.__views.courseList.add($.__views.courseTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var deptcode = args.deptcode;
    Alloy.Collections.Course;
    var term = "20151";
    fetchCourse(term, deptcode);
    __defers["$.__views.__alloyId2!change!changeTerm"] && $.__views.__alloyId2.addEventListener("change", changeTerm);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;