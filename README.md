# Biopeli 

Travis: [![Build Status](https://travis-ci.org/tkt-biopeli/Biopeli.svg?branch=master)](https://travis-ci.org/tkt-biopeli/Biopeli)
Coveralls: [![Coverage Status](https://coveralls.io/repos/github/tkt-biopeli/Biopeli/badge.svg?branch=master)](https://coveralls.io/github/tkt-biopeli/Biopeli?branch=master)

### Pelin idea

Kyseessä on biotalouteen perustuva construction & management simulation -tyyppinen peli. Pelaaja pyrkii täyttämään lähialueen kaupungin tarpeet.

Pelimaailma on jaettu ruutuihin, joihin pelaaja voi rakentaa erilaisia tuotantolaitoksia. Pelaaja saa pisteitä tekemistään valinnoista perustuen sekä niiden ekologisuuteen että taloudellisuuteen. Pelin kulkuun vaikuttavat myös satunnaiset tapahtumat, joilla voi olla positiivisia tai negatiivisia vaikutuksia. Pelaajan hallittavana on ainakin aluksi kaksi resurssia - nauriit ja raha. Kaupunki tuottaa rahaa ja kuluttaa nauriita suhteessa kokoonsa.

### Demo

https://tkt-biopeli.github.io/Biopeli/

### Dokumentaatio
Product Backlog, Definition of Done, Sprinttien burndown-käyrät ja tuntikirjanpito [Google Docsissa](https://docs.google.com/spreadsheets/d/1jGGEMFrbdNQ7DfI0Ranoajh7EyWghUSOJsJR0W0MmUg/edit?usp=sharing).

[Dokumentaatio JSON-tiedostojen käytöstä](https://github.com/tkt-biopeli/Biopeli/tree/master/documentation)

### Asennusohjeet
Pelin ajaminen paikallisesti:
- asenna [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), jos se ei ole jo asennettuna
- asenna [Node.js](https://nodejs.org/en/download/package-manager/), jos se ei ole jo asennettuna
- kloonaa repositorio koneellesi: `git clone git@github.com:tkt-biopeli/Biopeli.git`
- hae projektiin liittyvät moduulit ajamalla kloonin hakemistossa komento: `npm install`
- käynnistä paikallinen palvelin komennolla: `npm run dev`

Pelin pitäisi nyt näkyä selaimellasi; mikäli näin ei käy, kirjoita selaimeesi osoite: http://localhost:3000/ .

Pelin upottaminen olemassa olevalle sivulle:
- lisää seuraava rivi haluamaasi paikkaan sivullasi
```
<iframe src="https://tkt-biopeli.github.io/Biopeli/" height="700" width="1000" allowfullscreen>game not available</iframe>
```
- teksti "game not available" näytetään, mikäli upottaminen epäonnistui

### Käyttöohjeet
Kontrollit:
- liiku kartalla nuolinäppämillä tai hiirellä raahaamalla
- valitse ruutuja kartalta hiirellä ja rakenna niihin rakennuksia sivuvalikon valikoimasta
- tarkastele jo rakentamiesi rakennuksien tietoja valitsemalla ruutu hiirellä

Pelinäkymä rajautuu kartan lisäksi kahteen erilliseen alueeseen:
- Yläreunan infopalkista näet peliajan etenemisen, keräämäsi pisteet ja rahan sekä turnipsituotannnon riittävyysasteen. Riittävyysaste on rakennuksiesi turnipsituotannon määrän suhde kaupungin vuosittaiseen turnipsien kysyntään..
- Sivuvalikosta näet kaupunkisi tiedot, valitun ruudun rakennusmahdollisuudet tai rakennuksesi tiedot.
- Sivuvalikon alareunasta löytyy toiminnot maaperän kukkasten, kosteuden ja ravinteikkuuden tarkkailuun, sekä lisäksi pääsy pelin asetusvalikkoon.

### Highscore-serveri
- on Ruby on Rails -sovellus ja pyörii Herokussa
- Lähdekoodin repositorio: https://github.com/emlai/ivan-hall-of-fame
- tietokannan nollaus:
  	- asenna Heroku
	- kloonaa sovellus Herokusta: https://devcenter.heroku.com/articles/git-clone-heroku-app
	- pyyhi tietokanta: $ heroku pg:reset DATABASE
	- muodosta tietokanta uudestaan: $ heroku run rake db:migrate 

### Tekijätiimi
Hossein Bahmanpour, Ilja Häkkinen, Jarkko Karttunen, Jon-Erik Klint, Ilkka Koskinen, Miia Rämö

Grafiikka: Iina Nokelainen

Musiikki: Pauli Ondruska

### Lisenssi
[MIT](https://opensource.org/licenses/MIT)
