var u = require('./utils');
var style = require('../css/table.css');
var Table = function(id, data, option) {
    this.parent = document.getElementById(id) || null;
    this.create(data);
    this.init();
};
Table.prototype.init = function() {
    var thead, spans, i, len, span;
    var table = this.table || null;
    if (table) {
        thead = table.getElementsByTagName('thead')[0];
        spans = thead.getElementsByClassName('sort');
        for (i = 0, len = spans.length; i < len; i++) {
            span = spans[i];
            u.addEvent(span, 'click', sort_handler.bind(this));
        }
    }
};
Table.prototype.sort_by = function(criteria_arr, sort_mode_arr) {
    // 预处理criteria_arr 和 sort_mode_arr,如果不存在，则设为空数组，如果为字符串，则包装为数组
    !criteria_arr && (criteria_arr = []);
    typeof criteria_arr == 'string' && (criteria_arr = [criteria_arr]);
    !sort_mode_arr && (sort_mode_arr = []);
    typeof sort_mode_arr == 'string' && (sort_mode_arr = [sort_mode_arr]);
    var data, title, body;
    if (u.isArray(criteria_arr) && u.isArray(sort_mode_arr)) {
        data = this.data;
        title = data.title;
        body = data.body;
        sort(body, criteria_arr, sort_mode_arr);
        delete_tbody.call(this);
        update_tbody.call(this);
    }
};
Table.prototype.create = function(data) {
    if (typeof data === 'object' && !!data) {
        var title = data.title,
            sortable_title = data.sortable_title,
            sort_mode = data.sort_mode,
            body = data.body,
            criteria_arr = data.sortable_title,
            sort_mode_arr = data.sort_mode;
        var thead = create_thead(title, sortable_title, sort_mode);
        sort(body, criteria_arr, sort_mode_arr);
        var tbody = create_tbody(title, body);
        var table = create_table(thead, tbody);
        this.data = data;
        this.table = table;
        this.parent && this.parent.appendChild(table);
    }
    return this;
};
// help function
function create_thead(title, sortable_title, sort_mode) {
    var thead, tr, th, i, len, key, span, idx,
        keys = u.keys(title);
    !sortable_title && (sortable_title = []);
    var sortable_keys = u.keys(sortable_title);
    !sort_mode && (sort_mode = []);
    thead = document.createElement('thead');
    tr = document.createElement('tr');
    thead.appendChild(tr);
    for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        th = document.createElement('th');
        th.className = key;
        tr.appendChild(th);
        th.appendChild(document.createTextNode(title[key]));
        idx = sortable_title.indexOf(key);
        if (idx > -1) {
            span = document.createElement('span');
            span.className = 'sort ' + sort_mode[idx];
            th.appendChild(span);
        }
    }
    return thead;
}

function create_tbody(title, body) {
    var tbody, tr, td, i, j, len_tr, len_td, tr_data, keys = u.keys(title);
    if (u.isArray(body)) {
        tbody = document.createElement('tbody');
        for (i = 0, len_tr = body.length; i < len_tr; i++) {
            tr = document.createElement('tr');
            // tr.className = 'body'
            tbody.appendChild(tr);
            tr_data = body[i];
            for (j = 0, len_td = keys.length; j < len_td; j++) {
                td = document.createElement('td');
                tr.appendChild(td);
                td.appendChild(document.createTextNode(tr_data[keys[j]]));
            }
        }
        return tbody;
    }
}

function create_table(thead, tbody) {
    var table = document.createElement('table');
    table.className = 'z-table';
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

function delete_tbody() {
    var table = this.table,
        tbody = table.getElementsByTagName('tbody')[0];
    table.removeChild(tbody);
}

function update_tbody() {
    var table = this.table,
        data = this.data;
    var tbody = create_tbody(data.title, data.body);
    table.appendChild(tbody);
}

function sort(data, criteria_arr, sort_mode_arr) {
    !criteria_arr && (criteria_arr = []);
    !sort_mode_arr && (sort_mode_arr = []);
    var criteria_arr_len = criteria_arr.length;
    var compare = function(left, right, criteria_arr, sort_mode_arr, index, len) {
        var flag,
            criteria = criteria_arr[index],
            type = sort_mode_arr[index] || 'asc',
            a = left[criteria],
            b = right[criteria];
        if (a > b || a === void 0) flag = 1;
        else if (a < b || b === void 0) flag = -1;
        else flag = 0;
        if (type == 'desc') flag = -flag;
        if (flag != 0 || index >= len - 1) return flag;
        else return compare(left, right, criteria_arr, sort_mode_arr, index + 1, len);
    }
    criteria_arr_len && data.sort(function(left, right) {
        return compare(left, right, criteria_arr, sort_mode_arr, 0, criteria_arr.length);
    });
}

function sort_handler(e) {
    var table = this.table,
        span = e.target,
        th = span.parentNode,
        criteria = th.getAttribute('class'),
        sort_mode = span.getAttribute('class').replace(/sort/ig, '').replace(/(^\s*)|(\s*$)/ig, '');
    if (sort_mode == 'asc') sort_mode = 'desc';
    else sort_mode = 'asc';
    span.className = 'sort ' + sort_mode;
    this.sort_by(criteria, sort_mode);
}
module.exports = Table;