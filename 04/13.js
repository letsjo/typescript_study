"use strict";
exports.__esModule = true;
function getAuthors(database) {
    var authorRows = database.runQuery("SELECT FIRST, LAST FROM AUTHORS");
    console.log(authorRows);
    return authorRows.map(function (row) { return ({ first: row[0], last: row[1] }); });
}
getAuthors({
    runQuery: function (sql) {
        return [
            ['Toni', 'Morrison'],
            ['Maya', 'Angelou'],
        ];
    }
});
exports["default"] = {};
