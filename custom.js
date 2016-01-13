

    var JSONData = {};
    var data ;
    
    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);

    }
    function init() {
        loadJSON(function(response) {
            JSONData = JSON.parse(response);
            console.log(JSONData)
            renderList(JSONData.results);
        });

    }
    init();
    function renderList(data){
        var html = '<ul id="listItem">';
        for(var i = 0; i < data.length; i++){
            html += '<li><a onclick="showDetail('+ i +')">' +
                '<img class="thumbnail" src="'+ data[i].image.tbUrl +'"  alt=""/>' +
                ' <span> '+ data[i].title +'</span></a></li>';
        }
        html += '</ul>';
        document.getElementById('list').innerHTML = html;
        document.getElementById('relatedStories').innerHTML = '';
    }

    function showDetail (i){
         data = JSONData.results[i];

        var html = '<h3 id="title">'+ data.title +'</h3>' +
            '<div id="detail"><h5>'+ data.publisher +'</h5>'+
            '<h5>'+ localDateToString(new Date(data.publishedDate)) +'</h5></div>'+
            '<img id="mainImg" src="'+ data.image.url +'"  alt=""/><br>' +
            '<article>'+ data.content +'</article>';
        if(data.relatedStories && data.relatedStories.length){
            html += ' <a href="#relatedItem" id="readMore" onclick="relatedStories(data.relatedStories)" >read more ... </a>'
        }

        document.getElementById('list').innerHTML = html;
    }

    function filterData(){
        var d = document.getElementById('inputData').value;
      var filterDoc =  JSONData.results.filter(function(e){
            return e.title.match(d) || e.content.match(d) || e.publishedDate.match(d)
        });
        renderList(filterDoc);
    }

    function relatedStories(rs){

        var html = '<div id="relatedItem" ><ul>';
            rs.forEach(function(e){
                html += '<li><a href="'+ e.unescapedUrl +'"> ' +
                    '<h3>'+ e.title +'</h3>' +
                    '<h5>'+ e.publisher +'</h5>' +
                    '<h5>'+ localDateToString(new Date(e.publishedDate)) +'</h5>' +
                    '</a></li>';
            });
            html += '</ul></div>';
        document.getElementById('relatedStories').innerHTML = html;
    }

    function localDateToString(date){
        var mm = date.getMonth() + 1;  mm = (mm < 10) ? '0' + mm : mm;

        var dd = date.getDate();   dd = (dd < 10) ? '0' + dd : dd;
        var yyyy = date.getFullYear();
        var dateInString = dd + '/' + mm + '/' + yyyy;
        return dateInString;
    }

















