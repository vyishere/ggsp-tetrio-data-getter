// data getter MKII (version 1.1)
// (c) 2024-2025 JackComas, VNSC
// tournament requirements: RD <= 80; TL > 100; A: 21000-X; B: D-21000

function GetRating() {
  let sheet = SpreadsheetApp.getActiveSheet();
  for (let i = 1; i < sheet.getLastRow(); i++) {
    var query = sheet.getRange(i+1,2).getValue();
    query = query.toLowerCase();
    console.log(query)
    var url = 'https://ch.tetr.io/api/users/'
      + encodeURIComponent(query)
      + '/summaries/league';

    var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
    console.log(response.getContentText());
    data = JSON.parse(response);
    if (data.success == false){
      sheet.getRange(i+1,2).setBackgroundRGB(255, 0, 0);
      sheet.getRange(i+1,2).setFontColor('#ffffff');
      console.log(query + " Error");
      }
    else{
      console.log(query + " Success");

      // Requirements check
      var rank = data.data.rank.toUpperCase();
      if (rank == "Z"){rank="?"};

      console.log(data.data)
      if (data.data.hasOwnProperty("bestrank")) {
        var bestrank = data.data.bestrank.toUpperCase();
      }
      else {bestrank = "None"}
    
    var games_played = data.data.gamesplayed;
    if (games_played < 100){
      sheet.getRange(i+1,2).setBackgroundRGB(255, 0, 0);
      sheet.getRange(i+1,7).setBackgroundRGB(255, 0, 0);
    }

    var rating = data.data.tr;
    var glicko = data.data.glicko;
    var rd = data.data.rd;
    if (rd >= 80){
      sheet.getRange(i+1,2).setBackgroundRGB(255, 0, 0);
      sheet.getRange(i+1,9).setBackgroundRGB(255, 0, 0);
    }

    var tier = 0
    if (bestrank == "X" || rating > 21000) {tier = "1"}
    else {tier = "2"}

    var apm = data.data.apm
    var pps = data.data.pps
    var vsc = data.data.vs
    var app = Math.round(apm/pps/60*100)/100

    // Writing stuff
    sheet.getRange(1,5).setValue('Rank')
    sheet.getRange(1,6).setValue('Best rank')
    sheet.getRange(1,7).setValue('Games played')
    sheet.getRange(1,8).setValue('TR')
    sheet.getRange(1,9).setValue('RD')
    sheet.getRange(1,10).setValue('Tier')
    sheet.getRange(1,11).setValue('APM')
    sheet.getRange(1,12).setValue('PPS')
    sheet.getRange(1,13).setValue('VS')
    sheet.getRange(1,14).setValue('APP')

    // Save data into sheet
    sheet.getRange(i+1,5).setValue(rank);
    sheet.getRange(i+1,6).setValue(bestrank);
    sheet.getRange(i+1,7).setValue(games_played);
    sheet.getRange(i+1,8).setValue(rating);
    sheet.getRange(i+1,9).setValue(rd);
    sheet.getRange(i+1,10).setValue(tier)
    sheet.getRange(i+1,11).setValue(apm)
    sheet.getRange(i+1,12).setValue(pps)
    sheet.getRange(i+1,13).setValue(vsc)
    sheet.getRange(i+1,14).setValue(app)
    }
  }
}
