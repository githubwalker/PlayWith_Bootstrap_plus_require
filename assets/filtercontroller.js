// https://www.anujgakhar.com/2012/11/23/loading-bootstrap-with-requirejs/


requirejs.config({
    paths: {
        "jquery" : "js/jquery.min",
        "bootstrap" :  "js/bootstrap.min"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    }
});

require(['jquery', 'bootstrap'], function($){
    // DOM ready
    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".dropdown-menu li").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });

        $("#filter_menu_items").each(function (filtermenuindex, filterMenu) {
            $("#table2filter > tbody > tr").each(function (index, tableElement) {
                $.extend(tableElement, {
                    wholeText: function () {
                        let result = '';
                        $(this).find("td").each(function (elindex, el) {
                            let str = el.innerHTML.toString();
                            result += " " + str;
                        });
                        return result.trim();
                    }
                });

                $(filterMenu).append(function () {
                    return $("<li><a href=\"#\">" + tableElement.wholeText() + "</a></li>").click(function () {
                        let filterMenuElSelected = $(this).get(0);
                        $("#table2filter > tbody > tr").each(function (index, tableElement) {
                            let bEq = (tableElement.wholeText() ===  filterMenuElSelected.innerText);

                            if (bEq)
                                $(tableElement).show();
                            else
                                $(tableElement).hide();
                            // console.log('on click ' + filterMenuElSelected.innerText);
                        })
                    });
                });

                console.log('111');
            });

            $(filterMenu).append(function () {
                return $("<li class='divider'></li>");
            });

            $(filterMenu).append(function () {
                return $("<li><a href=\"#\"> All </a></li>").click(function () {
                    let filterMenuElSelected = $(this).get(0);
                    $("#table2filter > tbody > tr").each(function (index, tableElement) {
                        $(tableElement).show();
                    })
                })
            });
        });
    });
});

