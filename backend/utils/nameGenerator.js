// utils/nameGenerator.js

const firstNames = [
  "William", "Liam", "Elias", "Hugo", "Charlie", "Oliver", "Axel", "Alexander", "Vincent", "Leo",
"Adam", "Nils", "Arvid", "Noah", "Lucas", "Benjamin", "Oscar", "Alfred", "Emil", "Elliot",
"Leon", "Harry", "Olle", "Sixten", "Anton", "Albin", "Adrian", "Theo", "Melker", "Ludvig",
"Malte", "Ebbe", "Gustav", "Erik", "Edvin", "Gabriel", "Melvin", "Love", "Max", "Filip",
"Isak", "August", "Sam", "Loke", "Noel", "Henry", "Lukas", "Viggo", "Valter", "Sigge",
"Theodor", "Oskar", "Alvin", "Kevin", "Frank", "Viktor", "Vidar", "Milton", "Jack", "Elton",
"Milo", "Felix", "Colin", "Simon", "Samuel", "Casper", "Jonathan", "Otto", "Julian", "Sebastian",
"Philip", "John", "Victor", "Walter", "Elis", "Ivar", "Daniel", "Joel", "Hjalmar", "Tage",
"David", "Wilmer", "Loui", "Carl", "Rasmus", "Kian", "Vilgot", "Algot", "Eddie", "Linus",
"Melwin", "Ludwig", "Ali", "Alex", "Folke", "Maximilian", "Hampus", "Edwin", "Neo",
"Martin", "Andreas", "Aliaksei", "Abraham", "August", "Arne", "Axel", "Algot", "Alfred", 
"Bernhard", "Bertil", "Björn", "Bo", "Bror", "Conrad", "Claes", "Dag", "Erik", "Evert", 
"Esbjörn", "Fritjof", "Folke", "Gunnar", "Gösta", "Harald", "Holger", "Henning", "Inge", 
"Ivar", "Ingemar", "Ingvar", "Jon", "Josef", "Julius", "Jerker", "Karl", "Kenneth", "Kjell", 
"Kurt", "Knut", "Leif", "Lennart", "Mauritz", "Nils", "Nicholas", "Olof", "Otto", "Ove", 
"Per", "Rune", "Roland", "Ralf", "Rikard", "Rolf", "Sten", "Sture", "Sigvard", "Sven", "Stig", 
"Staffan", "Sigbjörn", "Thorsten", "Ture", "Torbjörn", "Tage", "Tor", "Torborg", "Tryggve", 
"Ulf", "Valter", "Vidar", "Vilgot", "Valdemar", "Willhelm", "Yngve", "Zakarias", "Åke", "Örjan", "Usman",
"Mattis", "Erling"


];

const lastNames = [
  "Andersson", "Johansson", "Karlsson", "Nilsson", "Eriksson", "Larsson", "Olsson", "Persson", "Maxe",
"Svensson", "Gustafsson", "Pettersson", "Jonsson", "Jansson", "Hansson", "Carlsson", "Bengtsson", 
"Lindberg", "Jönsson", "Petersson", "Magnusson", "Lindström", "Lindgren", "Gustavsson", "Olofsson", 
"Axelsson", "Bergström", "Lundberg", "Berg", "Lundgren", "Berglund", "Jakobsson", "Sandberg", 
"Fredriksson", "Mattsson", "Forsberg", "Sjöberg", "Lind", "Henriksson", "Lindqvist", "Engström", "Eklund", 
"Lundin", "Holm", "Danielsson", "Bergman", "Håkansson", "Wallin", "Gunnarsson", "Björk", "Samuelsson", 
"Nyström", "Holmberg", "Lundqvist", "Fransson", "Ahmed", "Söderberg", "Nyberg", "Johnsson", "Arvidsson", 
"Isaksson", "Nordström", "Lundström", "Björklund", "Mårtensson", "Berggren", "Eliasson", "Sandström", 
"Nordin", "Ström", "Ekström", "Åberg", "Holmgren", "Hermansson", "Hedlund", "Sjögren", "Sundberg", 
"Dahlberg", "Falk", "Ek", "Blom", "Öberg", "Hellström", "Strömberg", "Martinsson", "Lindholm", "Dahl", 
"Månsson", "Blomqvist", "Löfgren", "Hassan", "Jensen", "Abrahamsson", "Norberg", "Åström", 
"Sundström", "Åkesson", "Nyman", "Söderström", "Palm", "Hansen", "Lund", "Bergqvist", "Jonasson", "Borg", 
"Rosén", "Ivarsson", "Möller", "Andreasson", "Englund", "Lindblom", "Ekman", "Hallberg", "Göransson", 
"Sjöström", "Strand", "Lindahl", "Stenberg", "Davidsson", "Josefsson", "Friberg", "Bäckström", "Lilja", 
"Söderlund", "Hedberg", "Boström", "Ottosson", "Skoglund", "Nygren", "Holmström", "Strandberg", "Roos", 
"Wikström", "Höglund", "Björkman", "Adolfsson", "Malm", "Nielsen", "Lindén", "Börjesson", "Erlandsson", 
"Edlund", "Franzén", "Moberg", "Norén", "Melin", "Haglund", "Claesson", "Hussein", "Aronsson", "Nguyen", 
"Ericsson", "Dahlgren", "Johannesson", "Dahlström", "Östlund", "Alm", "Blomberg", "Lindell", "Viklund", 
"Holmqvist", "Sundqvist", "Öhman", "Knutsson", "Högberg", "Vikström", "Nord", "Wiklund", "Sundin", "Hedman", 
"Sköld", "Lindh", "Ståhl", "Lundmark", "Linder", "Molin", "Svärd", "Hedström", "Pålsson", "Olausson", 
"Sjödin", "Lindblad", "Ljung", "Ljungberg", "Hagström", "Jacobsson", "Oskarsson", "Ekberg", "Boman", 
"Malmberg", "Pedersen", "Ohlsson", "Hellberg", "Paulsson", "Brandt", "Dahlin", "Wahlström", "Asplund", "Wiberg", 
"Törnqvist", "Näslund", "Norman", "Hedin", "Ågren", "Westerlund", "Andersen", "Fors", "Khan", "Lindkvist", 
"Hjalmarsson", "Westerberg", "Ahlström", "Forslund", "Levin", "Lundkvist", "Edström", "Grahn", "Westman", 
"Hall", "Frisk", "Österberg", "Berntsson", "Hägglund", "Augustsson", "Marklund", "Lindvall", "Backman", "Dahlqvist", 
"Hjelm", "Nordqvist", "Sjöstrand", "Bäckman", "Alfredsson", "Forsman", "Nordlund", "Lövgren", "Larsen", 
"Westin", "Hagberg", "Byström", "Ljunggren", "Torstensson", "Alexandersson", "Lantz", "Kristiansson", 
"Malmström", "Hagman", "Niklasson", "Bertilsson", "Backlund", "Sjöblom", "Wall", "Lennartsson", "Karlström", "Rydberg", 
"Granberg", "Sjöholm", "Hellman", "Ahlberg", "Simonsson", "Rosengren", "Almqvist", "Edvardsson", "Ahlgren", "Bäck", 
"Östman", "Hammar", "Krantz", "Bergkvist", "Skog", "Kjellberg", "Hallgren", "Ericson", "Ekholm", "Svedberg", "Wahlberg", 
"Sandin", "Lundell", "Palmqvist", "Hanna", "Westberg", "Thorén", "Sahlin", "Emanuelsson", "Engman", 
"Åkerlund", "Rydén", "Svanberg", "Hellgren", "Holgersson", "Broberg", "Hult", "Singh", "Hägg", "Lindmark", "Andrén", 
"Malmqvist", "Salomonsson", "Hasan", "Nordgren", "Svahn", "Ekstrand", "Antonsson", "Christensen", "Strid", "Engdahl", "Klasson", "Hultman", "Malmgren", "Broman", "Green", "Sjölund", "Asp", "Issa", "Hultgren", 
"Engberg", "Eklöf", "Stark", "Wang", "Blomgren", "Bodin", "Karlberg", "Hallin", "Hammarström", "Ekelund", 
"Sandgren", "Sandell", "Blixt", "Henningsson", "Skoog", "Gabrielsson", "Nordberg", "Mustafa", "Söderqvist", "Lidén", 
"Frank", "Jeppsson", "Linde", "Melander", "Östberg", "Brännström", "Olsen", "Granath", "Ekdahl", "Lundh", "Wester", 
"Bohlin", "Kvist", "Johnson", "Sjöstedt", "Lindskog", "Burman", "Norling", "Granström", "Saleh", "Söderholm", "Wennberg", 
"Warneryd", "Helgesson", "Haraldsson", "Borgström", "Werner", "Wilhelmsson", "Lindfors", "Smith", "Granlund", "Holst", 
"Israelsson", "Einarsson", "Edin", "Kristensson", "Ahlqvist", "Widén", "Forsgren", "Brodin", "Edman", "Bolin", "Sjölander", 
"Ahlin", "Vesterlund", "Landin", "Schmidt", "Storm", "Bylund", "Sjölin", "Forsell", "Kristoffersson", "Rosenqvist", 
"Vilhelmsson", "Norrman", "Robertsson", "Thulin", "Zhang", "Liljegren", "Sörensen", "Stenström", "Lundblad", "Häggström", 
"Carlson", "Bergsten", "Norgren", "Lindquist", "Almgren", "Källström", "Pihl", "Halvarsson", "Westlund", "Rosenberg", 
"Kling", "Elofsson", "Viberg", "Östling", "Söderman", "Folkesson", "Sundell", "Landström", "Lundquist", "Palmgren", 
"Löf", "Rasmussen", "Wallgren", "Chen", "Åslund", "Hosseini", "Wahlgren", "Södergren", "Brolin", "Vallin", 
"Edberg", "Bergvall", "Nordlander", "Anderberg", "Wallén", "Lidström", "Turesson", "Zetterberg", "Ljungqvist", "Steen", 
"Bergstrand", "Juhlin", "Gren", "Roth", "Ferm", "Engvall", "Johansen", "Dahlén", "Farah", "Svantesson", "Lönn", "Grönlund", 
"Frid", "Vestin", "Olander", "Jarl", "Carlberg", "Nylén", "Norlin", "Flink", "Modig", "Winberg", "Åsberg", "Lundholm", 
"Gashi", "Jörgensen", "Ingvarsson", "Bohman", "Hjort", "Brink", "Åkerman", "Rask", "Rehn", "Selin", "Blomkvist", "Stenlund", 
"Petersen", "Fagerström", "Jafari", "Thor", "Emilsson", "Bergdahl", "Gullberg",
"Nylander", "Major", "Wankowicz", "Sundvall", "Enbom", "Kempe", "Ekman-Larsson", "Landeskog", "Forsling", "Janmark", 
"Bratt", "Klingberg", "Eriksson Ek", "Boqvist", "Järnkrok", "Nyquist", "Nykvist", "Zetterlund", "Rakell", "Holtz", "Kronvall",
"Kronkvist", "Östlund", "Kanerva"
];

function getRandomName() {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}

module.exports = getRandomName;