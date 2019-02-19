# ASK CLI -komentorivityökalun asennus ja bussiaikataulusovelluksen käyttöönotto

1. Luo tili Amazonin AWS-pilvipalveluun. 
2. Luo tili Alexa developer consolen käyttöä varten osoitteessa https://developer.amazon.com.
3. Kirjaudu AWS-developer consoleen ja valitse IAM (identity and account management).
4. Luo komentorivityökalua varten uusi käyttöoikeuspolitiikka valitsemalla Policies -> Create policy. Valitse JSON-välilehti ja liitä siihen osoitteesta https://raw.githubusercontent.com/Mikrobitti/alexa-bitti/master/setup/policy.json löytyvä tiedosto. Mene eteenpäin painamalla Review policy.
5. Anna käyttöoikeuspolitiikalle nimi ask-cli-policy ja lopuksi paina Create policy
6. Aloita uuden käyttäjätunnuksen luonti komentorivityökalua varten valitsemalla IAM palvelusta Users -> Add user. Anna käyttäjälle nimi ask-cli. Laita rasti ruutuun kohtaan Programmatic access. Valitse tämän jälkeen Next: Permissions
7. Liitä luotu ask-cli-policy käyttäjään.  Paina Next: Tags ja jatka läpi seuraavien ruutujen tekemättä muutoksia valitsemalla Next: Review ja tämän jälkeen Create user. Pysähdy Success-ruudussa.
8. Ota Succeess ruudulla näkyvät käyttöoikeusavaimet talteen.
9. Asenna komentorivityökalu komennolla npm install -g ask-cli. Mikäli node ja npm ei ole asennettuna sen voi voi asentaa komennolla: “curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash”, tai lataamalla sen https://nodejs.org/en/ sivujen kautta.
10. Komentorivityökalu otetaan käyttöön komennolla ask init --aws-setup. Tämän jälkeen aja komento ask init, joka avaa selainikkunan, johon kirjautumalla yhdistetään kohdassa 2 luotu developer tili ask-komentorivityökaluun.
11. Luo uusi Alexa kyky komennolla ask new --template "Helsinki Bus Timetables" --url https://raw.githubusercontent.com/Mikrobitti/alexa-bitti/master/setup/templates.json ja siirry sen luomaan hakemistoon. Aja komento ask deploy.
12. Testaa kykyä kysymällä Alexalta “Alexa, ask bus driver for timetables”. Komentoriviltä kysely onnistuu esimerkiksi komennolla ask simulate -t "ask bus driver for timetables" --locale "en-Us". Osoitteen https://developer.amazon.com kautta löytyy myös kätevä testausalusta.
13. Mikäli haluat ottaa sovelluksen tarkempaan käyttöön, käy muokkaamassa oma bussipysäkkisi getTimetable.js-tiedostoon riville 11. Pysäkkien numeroita voi tarkistaa sivun https://www.hsl.fi/reitit-ja-aikataulut pysäkit valikon kautta.
