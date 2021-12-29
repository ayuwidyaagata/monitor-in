var reloadData = 30; 
var timer;

function formatNumber(n){
    if (n.indexOf('.') > -1)
        return parseFloat(n).toFixed(8)
    else
        return parseInt(n).toLocaleString("id-ID")
}
function updateTimer() {
  a = parseInt($('#timer').html())
  $('#timer').html(a - 1)
  if (a > 0)
    timer = setTimeout(updateTimer, 1000)
}

function updatePrices() {

    $.ajax({
      url: 'https://indodax.com/api/summaries',
      success: function(data) {


        var row=Date(data.tickers.btc_idr.server_time);

        $("#date-time").html(row);
        

        var no=1;
        var row;

        //Fungsi autocomplete
        $('#tag').keyup(function(){

          var tag = $(this).val();
          var no_key=1;

          $('#coins').html('<tr><th>No</th><th>Nama</th><th>High</th> <th>Low</th><th>Last</th> <th>Buy</th> <th>Sell</th></tr>')
          for (var key in data.tickers) {

            if (data.tickers[key].name.toLowerCase().startsWith(tag.toLowerCase()))
            {
              row = `<tr>
              <td>` + no_key++ + `</td>
              <td>` + data.tickers[key].name.toUpperCase() + `</td>
              <td>` + formatNumber(data.tickers[key].high) + `</td>
              <td>` + formatNumber(data.tickers[key].low) + `</td>
              
              <td>` + formatNumber(data.tickers[key].last) + `</td>
              <td>` + formatNumber(data.tickers[key].buy) + `</td>
              <td>` + formatNumber(data.tickers[key].sell) + `</td>
                </tr>`
    
            $('#coins tr:last').after(row);
            }
          }

        });
        //End Fungsi Autocomplete  
  
        $('#coins').html('<tr><th>No</th><th>Nama</th><th>High</th> <th>Low</th><th>Last</th> <th>Buy</th> <th>Sell</th></tr>')
        for (var key in data.tickers) {

          row = `<tr>
                <td>` + no++ + `</td>
                <td>` + data.tickers[key].name.toUpperCase() + `</td>
                <td> Rp.` + formatNumber(data.tickers[key].high) + `</td>
                <td> Rp.` + formatNumber(data.tickers[key].low) + `</td>
                
                <td> Rp.` + formatNumber(data.tickers[key].last) + `</td>
                <td> Rp.` + formatNumber(data.tickers[key].buy) + `</td>
                <td> Rp.` + formatNumber(data.tickers[key].sell) + `</td>
              </tr>`
  
          $('#coins tr:last').after(row);
          
        }
  
        clearTimeout(timer)
        $('#timer').html(reloadData)
        setTimeout(updatePrices, reloadData * 1000)
        updateTimer()
  
      },
      error: function(err) {
        alert("Tidak bisa mengambil data API")
      }
  
    })
  
}

updatePrices()