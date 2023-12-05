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
    <h1 class="title-page text-center" >CONTRAT DE TRANSFERT DES MARCHANDISES</h1>
    <p class=" text-center">NUMERO {{$number}}</p>
    <p>DATE DE SIGNATURE DU CONTRAT: {{ $date }}</p>
    <h4>I. ENTREPRISE PROPRIETAIRE QUI A FINANCER L’AQUISITIONS DU/DES BIENS</h4>
    <div class="clause">
        <p>
        SignaPro enregistrée sous le numéro 206565325, ayant son siège social dans la ville de Burgas, Bulgarie, numéro de TVA BG206565325
        </p>
        <p>
        Représenté par: <strong>{{ $companyRepresentative }}</strong>
        </p>
        <p>
        E-mail : <strong>{{ $companyEmail }}</strong>
        </p>
        <p>
        Numéro de portable : <strong>{{ $companyPhone }}</strong>
        </p>
    </div>

    <h4>II. MANDATAIRE</h4>
    <div class="clause">
        <p>
        Prénom: <strong>{{ $representativeFirstName }}</strong>
        </p>
        <p>
        Nom : <strong>{{ $representativeLastName }}</strong>
        </p>
        <p>
        Adresse: <strong>{{ $representativeAddress }}</strong>
        </p>
    </div>

    <h4>III. DESCRIPTION DU PRODUIT, OBJET DE LA TRANSMISSION</h4>
    <div class="clause">
        <p>
        1. Désignation : <strong>{{ $designation }}</strong>
        </p>
        <p>
        2. Fabricant : <strong>{{ $manifacturer }}</strong>
        </p>
    </div>

    <h4>IV. PRIX PAYÉ ET RÈGLES DE COMMISSION</h4>
    <div class="clause">
        <p>
        1. Le prix du produit payé en magasin, décrit au point III ci-dessus est de <strong> {{$price}} </strong> Euros.
        </p>
        <p>
        2. La commission versée à l'acquéreur pour la mission est de <strong>{{$commision}}</strong>  Euros.
        </p>
        <p>
        3. Le prix décrit comprend la livraison et la réception de la marchandise, sans frais supplémentaires.
        </p>
    </div>

    <h4>V. LIVRAISON, INSPECTION, RÉCLAMATIONS</h4>
    <div class="clause">
        <p>
        1. Le bien doit être déposé ou expédié à l'adresse d'Azur-Aliance JSC suivante
        <br>{{$deliveryAddress}}
        </p>
        <p>
        2. En cas de réception à distance du bien, l'acheteur doit l'inspecter immédiatement après l'avoir reçu et informé le vendeur en cas de problème.
        </p>
        <p>
        3. Lors de l'acceptation de la marchandise est signé un protocole d'acceptation.
        </p>
    </div>

    <h4>VI. LITIGES ET RESPONSABILITÉS</h4>
    <div class="clause">
        <p>
        1. Le présent contrat, son exécution, sa non-exécution, sa validité et sa résiliation sont soumis aux dispositions de la législation civile.
        </p>
        <p>
        2. Chaque litige concernant ce contrat, son exécution, sa non-exécution, sa validité et sa résiliation sera porté devant le tribunal.
        </p>
    </div>

    <h4>VII. COMMUNCATION ET NOTIFICATIONS</h4>
    <div class="clause">
        <p>
        Chaque e-mail, envoyé à l'adresse e-mail indiquée dans le présent contrat, sera considéré comme une notification dûment envoyée et reçue, que le destinataire l'ait ouvert ou non.
         </p>
    </div>

    <p><strong>ACHETEUR</strong></p>
    <p>Nom : {{$buyerName}}</p>
    <p>Signature:</p>
    <img src="{{$buyerSignature}}" style="max-height:100px">

    <p><strong>ENTREPRISE PROPRIÉTAIRE DU OU DES BIEN(S)</strong></p>
    <p>Nom : {{$companyName}}</p>
    <p>Signature:</p>
    <img src="{{$companySignature}}" style="max-height:100px">
    <p>Représentant local d’Azur Aliance</p>

    </body>
</html>


