$("#resetPage").click(function() {
    location.reload();
});


//Date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = dd + '/' + mm + '/' + yyyy;
document.getElementById("invoicedate").value= today;




//Add New input Field
$(document).ready(function(){
    var count = 6;  
    $("#btnInsert").click(function(){
        $("#row-insert").append("<tr><td> <input type='text' class='input-form islno' value='"+ (count++) +"' readonly></td> <td> <input type='text' class='input-form idesc'></td> <td><input type='text' class='input-form nkey iqnty' value='1'></td> <td><input type='text' class='input-form nkey urate' value=''></td> <td><input type='text' class='input-form nkey price' readonly> </td></tr>");
    });
});


// Allow only number from input field 
$(".nkey").on("keypress keyup blur",function (event) {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
     $(this).val($(this).val().replace(/[^0-9\.]/g,''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
});


//prevent max _min value
$(document.body).on('input', '.iqnty', function () {
    var value = $(this).val();
    if ((value !== '') && (value.indexOf('.') === -1)) {
        
        $(this).val(Math.max(Math.min(value, 15), 1));
    }
});

$(document.body).on('keyup', '.urate', function () {
    var maxLength = $(this).val().length;
    if (maxLength >= 7) {
        alert('OOPS! Your Limit Is Max 6 Digits');
        $(this).val('');
        return false;
    }
});


$(document).ready(function(){
    $(document.body).on('keyup', ".iqnty, .urate", function(){
        var tr = $(this).closest('tr'),
            qn = $(tr).find(".iqnty").val(),
            rt = $(tr).find(".urate").val(),
            total = qn * rt;

        $(tr).find('.price').val(total);
    });
});


//Total price sum with quantity 
$("#btnCalc").click(function() {
    var sum = 0;
    $(".price").each(function(){
        sum += +$(this).val();
    });
    document.getElementById("total-price").value=sum;

    //Add Sub Total With Discount
    var dsc = $(".discount").val()/100;
    var st = sum - (sum * dsc);
    var subTotal = st.toFixed(0);
    document.getElementById("sub-total").innerHTML=subTotal;
});


//jQuery Numeric To Inwords convert
    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    $('#btnCalc').on('click', function () {
        inWords($('#sub-total').text());
    });

    function inWords(num) {
        if ((num = num.toString()).length > 9) return 'overflow';
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return;
        var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '-taka only ' : '';
        $('.inwords').text(str);
    }

$( document ).ready(function() {
    $("#getYear").text( (new Date).getFullYear());
});