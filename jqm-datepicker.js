/* 
    MonthPicker extension for JQueryMobile
    Version 1.0
 */

(function ($) {
    $monthpicker_header_class = "monthpicker-header";
    $monthpicker_content_class = "monthpicker-content";
    $datepicker_header_class = "datepicker-header";
    $datepicker_content_class = "datepicker-content";

    $very_short_day_name = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    $short_day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    $day_name = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $short_month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    $.fn.generateID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    $.fn.monthpicker = function () {
        var id = this.attr('id');
        if (!id) {
            id = $.fn.generateID();
            $(this).attr('id', id);
        }
        var input_wrapper_id = id + "-a-wrapper";
        var monthpicker_id = id + "-monthpicker";

        var current_year_id = monthpicker_id + "-header-currentyear";
        var current_month_id = monthpicker_id + "-content-currentmonth";

        $(this).wrap("<a data-rel='popup' href='#" + monthpicker_id + "' id='" + input_wrapper_id + "' class='monthpicker-input-a-wrapper'></a>");
        var monthpicker_html = "<div data-role='popup' data-position-to='window' data-overlay-theme='b' id='" + monthpicker_id + "' class='monthpicker-container'>" +
            "<div data-role='header' class='" + $monthpicker_header_class + "'></div>" +
            "<div data-role='main' class='" + $monthpicker_content_class + "'></div>" +
            "</div>";
        $("#" + input_wrapper_id).after(monthpicker_html).trigger('create');
        

        // Initialize Header (Year)
        var dateNow = new Date();
        var header_html = "";
        header_html += "<span class='monthpicker-header-decrementyear monthpicker-header-btn' onclick=\"$('#" + current_year_id + "').decrementYear();\"><i class='fa fa-caret-left'></i></span>";
        header_html += "<span id='" + current_year_id + "' class='monthpicker-header-currentyear'>" + dateNow.getFullYear() + "</span>";
        header_html += "<span class='monthpicker-header-incrementyear monthpicker-header-btn' onclick=\"$('#" + current_year_id + "').incrementYear();\"><i class='fa fa-caret-right'></i></span>";
        $('#' + monthpicker_id + ' .' + $monthpicker_header_class).html(header_html);
        

        // Initialize Content (Months)
        var content_html = "";
        var itemInRow = 0;
        $short_month_name.forEach(function (value, i) {
            if (itemInRow == 0) { content_html += "<tr class='monthpicker-content-month-row'>"; }
            content_html += "<td class='monthpicker-content-month' id='" + monthpicker_id + "-month-" + (i + 1) + "' onclick=\"" +
                "$('#" + current_month_id + "').val(" + (i + 1) + ");" +
                "$(this).addClass('monthpicker-content-month-selected');" +
                "$('#" + monthpicker_id + "').popup('close');" +
                "\">" + value + "</td>";
            itemInRow++;
            if (itemInRow == 3) {
                content_html += "</tr>";
                itemInRow = 0;
            }
        });
        content_html = "<input type='hidden' id='" + current_month_id + "'/><table class='monthpicker-content-table'>" + content_html + "</table>";
        $('#' + monthpicker_id + ' .' + $monthpicker_content_class).html(content_html);

        $('#' + monthpicker_id).popup({
            afterclose: function (event, ui) {
                //var id = event.target.id;

                var year = parseInt($('#' + current_year_id).html());
                var month = $('#' + current_month_id).val();

                if (month && parseInt(month) < 10)
                    month = '0' + month.toString();

                if (month && year) {
                    var prevSelected = $("#" + id).val();
                    if (prevSelected) {
                        var prevMonth = parseInt(prevSelected.split('-')[1]);
                        $('#' + monthpicker_id + '-month-' + prevMonth.toString()).removeClass('monthpicker-content-month-selected');
                    }
                    var newSelected = year + '-' + month;
                    $("#" + id).val(newSelected);

                    if (newSelected != prevSelected) {
                        $("#" + id).trigger('change');
                    }
                } else {
                    $("#" + id).val('');
                }

            }
        });
        
    };

    $.fn.incrementYear = function () {
        var id = this.attr('id');
        var curYear = parseInt($('#' + id).html());

        $('#' + id).html(curYear + 1);
    };

    $.fn.decrementYear = function () {
        var id = this.attr('id');
        var curYear = parseInt($('#' + id).html());

        $('#' + id).html(curYear - 1);
    };

    $.fn.getDaysInMonth = function (month, year) {
        // month ranges [1-12]
        return new Date(year, month, 0).getDate();
    };

    $.fn.updateDays = function (month, year, datepicker_id, current_day_id) {
        var content_html = "";
        var days = $.fn.getDaysInMonth(month + 1, year);

        // Initialize Week header
        content_html += "<tr class='datepicker-content-day-row'>";
        $very_short_day_name.forEach(function (value, i) {
            content_html += "<td class='datepicker-content-day-header'>" + value + "</td>"
        });
        content_html += "</tr>";

        var itemInRow = new Date(year, month, 1).getDay();
        console.log('days:' + days + ', month:' + month + ', year:' + year + ', itemInRow:' + itemInRow);
        var firstDay = 1;
        for (var i = 1; i <= days ; i++) {
            if (firstDay == 1) {
                content_html += "<tr class='datepicker-content-day-row'>";
                if (itemInRow != 0) {
                    var daysPrev = $.fn.getDaysInMonth(month, year);
                    for (var j = itemInRow; j > 0; j--) {
                        content_html += "<td class='datepicker-content-notcurrent'>" + (daysPrev - j + 1) + "</td>"
                    }
                }
                firstDay = 0;
            }
            content_html += "<td class='datepicker-content-day' id='" + datepicker_id + "-day-" + i + "' onclick=\"" +
                "$('#" + current_day_id + "').val(" + i + ");" +
                "$(this).addClass('datepicker-content-day-selected');" +
                "$('#" + datepicker_id + "').popup('close');" +
                "\">" + i + "</td>";
            itemInRow++;
            if (i == days && itemInRow < 7) {
                for (var k = 1; k <= 7 - itemInRow; k++) {
                    content_html += "<td class='datepicker-content-notcurrent'>" + k + "</td>";
                }
            }
            if (itemInRow == 7) {
                content_html += "</tr>";
                firstDay = 1;
                itemInRow = 0;
            }
        }
        content_html = "<input type='hidden' id='" + current_day_id + "'/><table class='datepicker-content-table'>" + content_html + "</table>";
        $('#' + datepicker_id + ' .' + $datepicker_content_class).html(content_html);
    };

    $.fn.datepicker = function () {
        var id = this.attr('id');
        if (!id) {
            id = $.fn.generateID();
            $(this).attr('id', id);
        }
        var input_wrapper_id = id + "-a-wrapper";
        var datepicker_id = id + "-datepicker";

        var current_year_id = datepicker_id + "-header-current-year";
        var current_month_id = datepicker_id + "-header-current-month";
        var current_day_id = datepicker_id + "-content-currentday";

        $(this).wrap("<a data-rel='popup' href='#" + datepicker_id + "' id='" + input_wrapper_id + "' class='datepicker-input-a-wrapper'></a>");
        var datepicker_html = "<div data-role='popup' data-position-to='window' data-overlay-theme='b' id='" + datepicker_id + "' class='datepicker-container'>" +
            "<div data-role='header' class='" + $datepicker_header_class + "'></div>" +
            "<div data-role='main' class='" + $datepicker_content_class + "'></div>" +
            "</div>";
        $("#" + input_wrapper_id).after(datepicker_html).trigger('create');


        // Initialize Header (Year)
        var dateNow = new Date();
        var header_html = "";
        header_html += "<span class='datepicker-header-decrementmonth datepicker-header-btn' " +
            "onclick=\"$('#" + current_month_id + "').decrementMonth('" + datepicker_id + "','" + current_year_id + "','" + current_day_id + "');\"><i class='fa fa-caret-left'></i></span>";
        header_html += "<span id='" + current_month_id + "' class='datepicker-header-currentmonth'>" + $month_name[dateNow.getMonth()] + "</span>";
        header_html += "<span id='" + current_year_id + "' class='datepicker-header-currentyear'>" + dateNow.getFullYear() + "</span>";
        header_html += "<span class='datepicker-header-incrementmonth datepicker-header-btn' " +
            "onclick=\"$('#" + current_month_id + "').incrementMonth('" + datepicker_id + "','" + current_year_id + "','" + current_day_id + "');\"><i class='fa fa-caret-right'></i></span>";
        $('#' + datepicker_id + ' .' + $datepicker_header_class).html(header_html);


        // Initialize Content (Months)
        $.fn.updateDays(dateNow.getMonth(), dateNow.getFullYear(), datepicker_id, current_day_id);

        $('#' + datepicker_id).popup({
            afterclose: function (event, ui) {
                //var id = event.target.id;

                var year = parseInt($('#' + current_year_id).html());
                var month = $('#' + current_month_id).html();
                var month_i
                for (var i = 0; i < $month_name.length; i++) {
                    if ($month_name[i] == month) {
                        month_i = i;
                        break;
                    }
                }
                month_i++;
                var day = $('#' + current_day_id).val();

                if (month_i && parseInt(month_i) < 10)
                    month_i = '0' + month_i.toString();

                if (day && day < 10)
                    day = '0' + day.toString();

                if (day && month_i && year) {
                    var prevSelected = $("#" + id).val();
                    if (prevSelected) {
                        var prevDay = parseInt(prevSelected.split('-')[2]);
                        $('#' + datepicker_id + '-day-' + prevDay).removeClass('datepicker-content-day-selected');
                    }
                    var newSelected = year + '-' + month_i + '-' + day;
                    $("#" + id).val(newSelected);

                    if (newSelected != prevSelected) {
                        $("#" + id).trigger('change');
                    }
                } else {
                    $("#" + id).val('');
                }

            }
        });

        $.fn.incrementMonth = function (datepicker_id, current_year_id, current_day_id) {
            var current_month_id = $(this).attr('id');
            var curMonth = $('#' + current_month_id).html();
            var curMonthIndex;
            for (var i = 0; i < $month_name.length; i++) {
                if ($month_name[i] == curMonth) {
                    curMonthIndex = i;
                    break;
                }
            }
            curMonthIndex++;
            var curYear = parseInt($('#' + current_year_id).html());
            if (curMonthIndex > 11) {
                curMonthIndex = 0;
                $('#' + current_year_id).html(curYear + 1);
                curYear++;
            }
            $(this).html($month_name[curMonthIndex]);
            $.fn.updateDays(curMonthIndex, curYear, datepicker_id, current_day_id);
        };

        $.fn.decrementMonth = function (datepicker_id, current_year_id, current_day_id) {
            var current_month_id = $(this).attr('id');
            var curMonth = $('#' + current_month_id).html();
            var curMonthIndex;
            for (var i = 0; i < $month_name.length; i++) {
                if ($month_name[i] == curMonth) {
                    curMonthIndex = i;
                    break;
                }
            }
            curMonthIndex--;
            var curYear = parseInt($('#' + current_year_id).html());
            if (curMonthIndex < 0) {
                curMonthIndex = 11;
                $('#' + current_year_id).html(curYear - 1);
                curYear--;
            }
            $(this).html($month_name[curMonthIndex]);
            $.fn.updateDays(curMonthIndex, curYear, datepicker_id, current_day_id);
        };

        
    };
})(jQuery);