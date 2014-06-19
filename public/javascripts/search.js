$(document).ready(function () {
    var txtSearch = $('#txtSearch');
    var ul = $('ul');
    var lblMatches = $('#lblMatches');
        txtSearch.bind('keypress', function (e) {
        if (e.keyCode == 13) {
            $.post('/snippet/search', { search: txtSearch.val() }, function (data) {
                console.log(data);
                if (data.hits && data.hits.hits && data.hits.hits instanceof Array) {
                    ul.empty();
                    var arrHits = data.hits.hits;
                    lblMatches.html('Found ' + arrHits.length + ' matches')
                    arrHits.forEach(function (val) {
                        var source = val._source;
                        var item = '<li class="list-group-item">' +
                           '<h4>' + source.title + '</h4>' +
                           '<a href="' + source.url + '" target="_blank">' + source.url + '</a>' +
                            source.html + '</li>';
                        ul.append(item);
                    })
                }
            });
        }
    });
});