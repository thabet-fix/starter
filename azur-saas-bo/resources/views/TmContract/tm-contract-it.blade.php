<!doctype html>
<html lang="fr">
    <head>
    <meta charset="utf-8">
    <title>MERCHANDISE TRANSFER CONTRACT N°{{$number}}</title>
    </head>
    <style>
        body{
            font-size: 14px;
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
    <h1 class="title-page text-center" >CONTRATTO DI TRASFERIMENTO DI BENI</h1>
    <p class=" text-center">NUMERO {{$number}}</p>
    <p>DATA DI FIRMA DEL CONTRATTO: {{ $date }}</p>
    <h4>I. AZIENDA PAGANTE E PROPRIETARIA DEL BENE (O DEI BENI):</h4>
    <div class="clause">
        <p>
        Azur Aliance JSC, registrata con il numero 206565325, con sede legale nella città di Burgas, Bulgaria, numero di partita IVA
BG2065325.
        </p>
        <p>
        Rappresentata da: <strong>{{ $companyRepresentative }}</strong>
        </p>
        <p>
        E-mail: <strong>{{ $companyEmail }}</strong>
        </p>
        <p>
        Numero di cellulare: <strong>{{ $companyPhone }}</strong>
        </p>
    </div>

    <h4>II. ACQUIRENTE</h4>
    <div class="clause">
        <p>
        Nome: <strong>{{ $representativeFirstName }}</strong>
        </p>
        <p>
        Cognome : <strong>{{ $representativeLastName }}</strong>
        </p>
        <p>
        Indirizzo: <strong>{{ $representativeAddress }}</strong>
        </p>
    </div>

    <h4>III. DESCRIZIONE DEL PRODOTTO, OGGETTO DELLA TRASMISSIONE</h4>
    <div class="clause">
        <p>
        1. Designazione : <strong>{{ $designation }}</strong>
        </p>
        <p>
        2. Produttore : <strong>{{ $manifacturer }}</strong>
        </p>
    </div>

    <h4>IV. PREZZO PAGATO E REGOLE DI COMMISSIONE</h4>
    <div class="clause">
        <p>
        1. Il prezzo del prodotto pagato in negozio, descritto al punto III, è di <strong> {{$price}} </strong> Euros.
        </p>
        <p>
        2. La commissione pagata all&#39;acquirente per la cessione è <strong>{{$commision}}</strong>  Euros.
        </p>
        <p>
        3. Il prezzo descritto comprende la consegna e l&#39;accettazione della merce senza costi aggiuntivi.
        </p>
    </div>

    <h4>V. CONSEGNA, ISPEZIONE, RECLAMI</h4>
    <div class="clause">
        <p>
        1. La merce deve essere consegnata o spedita al seguente indirizzo : Azur-Aliance
JSC
        <br>{{$deliveryAddress}}
        </p>
        <p>
        2. Se la merce viene ricevuta a distanza, l&#39;acquirente deve ispezionarla subito dopo
averla ricevuta e informare il/la manager in caso di problemi.
        </p>
        <p>
        3. Quando la merce viene accettata, viene firmato un protocollo di accettazione.
        </p>
    </div>

    <h4>VI. CONTENZIOSO E RESPONSABILITÀ</h4>
    <div class="clause">
        <p>
        1. Il presente contratto, la sua esecuzione, mancata esecuzione, validità e risoluzione
sono soggetti alle disposizioni del diritto civile della Bulgaria.
        </p>
        <p>
        2. Qualsiasi controversia relativa al presente contratto, alla sua esecuzione, alla sua
mancata esecuzione, alla sua validità ed alla sua risoluzione dovrà essere portata in tribunale.
        </p>
    </div>

    <h4>VII. COMUNICAZIONE E NOTIFICHE</h4>
    <div class="clause">
        <p>
        Ogni e-mail, inviata dall&#39;indirizzo di posta elettronica indicato nel presente contratto, sarà considerata una
notifica debitamente inviata e ricevuta, indipendentemente dal fatto che il destinatario l&#39;abbia aperta o
meno.
        </p>
    </div>

    <p><strong>ACQUIRENTE</strong></p>
    <p>Nome : {{$buyerName}}</p>
    <p>Firma:</p>
    <img src="{{$buyerSignature}}" style="max-height:100px">

    <p><strong>SOCIETÀ PROPRIETARIA DEL BENE (O DEI BENI):</strong></p>
    <p>Nome : {{$companyName}}</p>
    <p>Firma: </p>
    <img src="{{$companySignature}}" style="max-height:100px">
    <p>Rappresentante locale di Azur Aliance</p>

    </body>
</html>


