<!doctype html>
<html lang="fr">
    <head>
    <meta charset="utf-8">
    <title>MERCHANDISE TRANSFER CONTRACT N°{{$number}}</title>
    </head>
    <style>
        body{
            /* font-size: 12px; */
            font-family:"Arial", "sans serif";

        }
        .title-page{
            text-transform:"uppercase"
        }
        .text-center{
            text-align: center;
        }
        .clause{
            padding: auto 5px;
            border:solid 1px #000
        }
    </style>
    <body>
    <h1 class="title-page text-center" >WARENÜBERGABEVERTRAG</h1>
    <p class=" text-center">NUMMER {{$number}}</p>
    <p>DATUM DER VERTRAGSUNTERZEICHNUNG: {{ $date }}</p>
    <h4>I. EIGENTÜMERUNTERNEHMEN, DAS DEN ERWERB DER IMMOBILIE/N FINANZIERT HAT</h4>
    <div class="clause">
        <p>
        SignaPro registriert unter der Nummer 206565325, mit Sitz in der Stadt Burgas, Bulgarien, Umsatzsteueridentifikationsnummer BG206565325
        </p>
        <p>
        Vertreten durch:<strong>{{ $companyRepresentative }}</strong>
        </p>
        <p>
        E-mail : <strong>{{ $companyEmail }}</strong>
        </p>
        <p>
        Handynummer:<strong>{{ $companyPhone }}</strong>
        </p>
    </div>

    <h4>II. MANDATAIRE</h4>
    <div class="clause">
        <p>
        Vorname :  <strong>{{ $representativeFirstName }}</strong>
        </p>
        <p>
        Name :<strong>{{ $representativeLastName }}</strong>
        </p>
        <p>
        Adresse : <strong>{{ $representativeAddress }}</strong>
        </p>
    </div>

    <h4>III. BESCHREIBUNG DES PRODUKTS, GEGENSTAND DER ÜBERMITTLUNG</h4>
    <div class="clause">
        <p>
        1. Bezeichnung: <strong>{{ $designation }}</strong>
        </p>
        <p>
        2. Hersteller : <strong>{{ $manifacturer }}</strong>
        </p>
    </div>

    <h4>IV. BEZAHLTER PREIS UND PROVISIONSREGELN</h4>
    <div class="clause">
        <p>
        1. Der Preis des im Geschäft bezahlten Produkts, das oben unter Punkt III beschrieben wurde, beträgt <strong> {{$price}} </strong> Euros.
        </p>
        <p>
        2. Die an den Käufer für den Auftrag gezahlte Provision beträgt 2. <strong>{{$commision}}</strong>  Euros.
        </p>
        <p>
        3. Der beschriebene Preis beinhaltet die Lieferung und den Empfang der Ware, ohne zusätzliche Kosten.
        </p>
    </div>

    <h4>V. LIEFERUNG, INSPEKTION, REKLAMATIONEN</h4>
    <div class="clause">
        <p>
        1. Die Ware muss an der folgenden Adresse von Azur-Aliance JSC abgegeben oder versandt werden:
        <br>{{$deliveryAddress}}
        </p>
        <p>
        2. Bei einem Fernabsatzempfang des Gutes muss der Käufer das Gut sofort nach Erhalt untersuchen und den Verkäufer informieren, wenn es Probleme gibt.
        </p>
        <p>
        3. Bei der Annahme der Ware wird ein Annahmeprotokoll unterzeichnet.
        </p>
    </div>

    <h4>VI. RECHTSSTREITIGKEITEN UND HAFTUNG</h4>
    <div class="clause">
        <p>
        1. Dieser Vertrag, seine Erfüllung, Nichterfüllung, Gültigkeit und Beendigung unterliegen den Bestimmungen der
Zivilgesetzgebung.
        </p>
        <p>
        2. Jeder Streit über diesen Vertrag, seine Ausführung, Nichtausführung, Gültigkeit und Beendigung wird vor Gericht
ausgetragen.
        </p>
    </div>

    <h4>VII. KOMMUNIKATION UND BENACHRICHTIGUNGEN</h4>
    <div class="clause">
        <p>
        Jede E-Mail, die an die in diesem Vertrag angegebene E-Mail-Adresse gesendet wird, gilt als ordnungsgemäß gesendete und
empfangene Benachrichtigung, unabhängig davon, ob der Empfänger sie geöffnet hat oder nicht.
        </p>
    </div>

    <p><strong>KÄUFER</strong></p>
    <p>Name : {{$buyerName}}</p>
    <p>Unterschrift:</p>
    <img src="{{$buyerSignature}}" style="max-height:100px">

    <p><strong>UNTERNEHMEN, DAS EIGENTÜMER DER IMMOBILIE(N) IST</strong></p>
    <p>Name : {{$companyName}}</p>
    <p>Unterschrift:</p>
    <img src="{{$companySignature}}" style="max-height:100px">
    <p>Örtliche Vertreterin von Azur Aliance</p>

    </body>
</html>


