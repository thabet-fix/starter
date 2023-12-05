<!doctype html>
<html lang="fr">
    <head>
    <meta charset="utf-8">
    <title>ACCORD DE COMMISSION N°{{$number}}</title>
    </head>
    <style>
        body{
            font-size: "12px";
            font-family:"Arial", "sans serif";

        }
        .title-page{
            text-transform:"uppercase"
        }
        .text-center{
            text-align: center;
        }
        .text-right{
            float: right;
        }

        .logo{
            max-height: 50px;
        }
        .signature{
            max-height: 150px;
        }
        .bleu{
            color: #318ba2;
        }
        .signatures{
            display:flex;
        }
        .item-image{
            max-height:80px;
        }
        div,p
        {
            padding: 5px auto;
            margin :5px auto
        }
    </style>
    <body>
    <h1 class="title-page text-center" >ACCORD DE COMMISSION</h1>
    <p class=" text-center">Contrat général de commande et d'achat et de vente</p>
    <p class=" text-center">Numéro {{$number}}</p>
    <p>Date : {{ $date }}</p>
    <p> <strong>Azur-Aliance Jsc,</strong> ci-après dénommée la Société ayant numéro de TVA BG206565325, dont le siège social est à l'adresse de gestion, située à l'adresse 19 rue Mara Gidik, 2ème étage, 8000 Burgas, Bulgarie.</p>
    <p> <strong> Ci-après dénommée « l'Entreprise » ou « la Société » , Et </strong> </p>
    <!-- <p>Nom / Prénom : 
        <strong>{{ $name }}</strong> 
    </p> -->
    @php 
    $template = "<strong>{!!$name!!}</strong>"; 
    @endphp
    <p>Nom / Prénom : 
    {!!$template!!}
    </p>
    <p>ID Passeport : <strong>{{ $passportId }}</strong> </p>
    <p>Nationalité : <strong> {{ $nationality }}</strong> </p>
    <p>Adresse : <strong>{{ $address }}</strong> </p>
    <p>Code Postal : <strong>{{ $zipCode }}</strong> </p>
    <p>Ville : <strong>{{ $city }}</strong> </p>
    <p>Numéro tel : <strong>{{ $phoneNumber }}</strong> </p>
    <p>Email: <strong>{{ $email }}</strong> </p>
    <p><strong>Ci-après désigné « l'Acheteur / le Représentant » ,</strong></p>

    <p>
    Ce contrat est conclu sur la base de l'article 127 de la loi bulgare sur la TVA et de l'art. 14, p.2 de la directive européenne 2006/115 sur la TVA.
    </p>
    <p>
        Les deux parties reconnaissent avoir la capacité juridique nécessaire pour signer le présent contrat, et les deux parties exécutent la présente commande et le contrat d'achat et de transmission dans le respect de la loi du pays membre de l'union Européenne : Bulgarie, conformément aux conditions générales énoncées ci- dessous. Les deux parties déclarent, confirment et acceptent que ce contrat est un contrat de service et ne constitue en aucun cas un contrat de travail, et qu'une telle relation juridique  n'est pas présumée. L'acheteur / Le représentant à la possibilité, mais non l'obligation, de conclure un contrat volontairement et d'être un entrepreneur indépendant sous la forme de services indépendants.
    </p>
    <h4>I-	 Conditions Générales</h4>

    <p> <strong>1.	Conditions générales ,</strong></p>

    <p>
    Le contrat a pour objet de préciser que l'entreprise travaille dans le secteur du luxe et peut acquérir un produit  par l'intermédiaire de l'Acheteur / Représentant.
    </p>
    <p>
    La mission de service de l'Acheteur consiste en l'achat et la remise du/des produits à l'entreprise. Il est considéré comme exécuté s'il est correctement complété dans son intégralité, afin que le produit soit reçu en parfait état.
    </p>
    <p>
    Les communications de l'Entreprise s'effectueront par e- mail, WhatsApp et téléphone, prévus dans le       présent contrat dont toutes les informations concernant la mission attribuée seront partagées.
    </p>
    <p>
    Pour le présent contrat la/les mission(s), les factures d'achats et le/les bon(s) de cession du/des articles qui seront échangés entre les deux parties seront conservés et mis à disposition des parties concernées dans cet accord.
    </p>
    <p>
    Si le service/la commande n'est pas exécuté correctement selon les indications données par l'Entreprise, ce dernier ne paiera pas pour le                  service. L'Acheteur pourra être tenu de lui rembourser le montant correspondant à la perte ou aux dommages sur le/les article(s) acheté(s).
    </p>
    <p>
    En cas de modification des conditions générales, l'Entreprise informera l'Acheteur/Représentant de tout changement. L'Acheteur /Représentant a le droit de résilier le contrat dans les 15 jours suivant la date de réception d'un tel avis. Si l'Acheteur/Représentant ne poursuit pas la résiliation dans le délai de 15 jours, il est considéré qu'il est d'accord avec les dispositions modifiées et entrainera un renouvellement automatique.
    </p>
    <p> <strong>2.	Prix d'Achat / frais de Service / Commande </strong></p>

    <p>
    Les parties conviennent des frais de service pour la démarche d'achat.
    </p>
    <p>
    Le montant des frais de service sera précisé pour chaque achat, vente et commande via les canaux de communication habituels déjà utilisés entre les parties.
    </p>
    <p>
    Les frais de service dépendent des commandes des clients. Ils varieront de 30 € à 600 € (voir tableau des commissions en annexe).
    </p>
    <p> <strong>3.	Propriété des biens achetés  </strong></p>
    <p>
    Seul l'Entreprise est propriétaire des biens achetés par le Mandataire, bien que la facture d'achat soit éditée au nom du Mandataire , ce dernier n'étant jamais propriétaire du bien et ayant pour obligation de le remettre sans délai à son propriétaire, l'Entreprise.
    </p>
    <p>
    Ceci est une condition substantielle du présent contrat.
    </p>
    <p> <strong>4.	Modalités de prestation de services</strong></p>

    <p>
    La méthode de travail consiste à créer un compte client important/préférentiel/VIP pour que le vendeur/le magasin/la marque accepte de vendre à l'Acheteur Représentant l'accès aux produits dit limités/exclusifs.
    </p>
    <h4>II-	Paiement </h4>

    <p> <strong> 1.	Paiement</strong></p>

    <p>
    Lors de l'acquisition des accessoires et produits en magasin par l'Acheteur / Représentant auprès de l'Entreprise, L'Entreprise mettra à disposition de l'Acheteur / Représentant le moyen du paiement pour acquérir le/les article(s) concernés dans la mission. Il est entendu que les fonds et la carte appartiennent à l'Entreprise et que seul l'Acheteur / Représentant est autorisé à l'utiliser  pour la mission confiée.
    </p>
    <p> <strong> 2.	Paiement des services fournis (Service / Commande)</strong></p>

    <p>
    Les paiements des frais de service sont effectués après la réception du produit et après avoir vérifié que tout est correcte. Le règlement sera effectué par virement bancaire sur un compte bancaire fourni par l'acheteur / Représentant.
    </p>
    <p>Numéro de compte bancaire sur lequel l'Acheteur/Représentant souhaite percevoir sa rémunération :</p>
    <p>BANQUE: <strong> {{$bank}} </strong> </p>
    <p>IBAN: <strong> {{$iban}}</strong> </p>
    <p>SWIFT: <strong> {{$swift}}</strong> </p>

    <h4>III-	Résiliation et responsabilité</h4>
    <p>
    L'Entreprise investira du temps et des efforts dans la formation, la création d'un profil VIP, la mise en relation avec un employé/vendeur dans le/les magasins, l'émission d'une carte bancaire dédiée à l'Acheteur/Représentant. Pour ces raisons, si l'Acheteur /Représentant souhaite résilier son contrat                   alors que la Société a investi sur son profil, une pénalité de 150 euros devra être payée pour couvrir  les frais de formation et/ou administratifs.
    </p>
    <p>
    Cette disposition ne s'applique que si l'Acheteur /Représentant profite d'Azur Aliance pour créer son profil VIP sans donner par la suite accès à l'Entreprise aux objets limités qui peuvent être    obtenus avec l'intention de les garder pour son propre usage ou bénéfice, soit pour une autre raison.
    </p>
    <p>
    Cependant une résiliation justifiée de la part l'Acheteur /Représentant indiquant l'intention de résilier le contrat, peut être présentée auprès d'un représentant de la société, suivi de l'envoi d'un avis écrit par courrier recommandé à l'adresse du siège social de la société, à savoir :
    </p>
    <p><strong>19 Mara Gidik street</strong></p>
    <p><strong>8000 Burgas, Burgas</strong></p>
    <p><strong>Bulgarie</strong></p>
    <p>
    REMARQUE : La Société ne tiendra pas l'Acheteur/Représentant responsable s'il omet d'acheter ces articles restreints et ne le pénalisera pas si, après plusieurs tentatives (minimum 2), toujours en suivant les instructions de l'employé, il échoue.
    </p>
    <h4>Loyauté et éthique</h4>
    <p>
    À partir du moment de la signature du contrat et dans les deux années suivant son achèvement / sa résiliation, l'Acheteur /Représentant ne pourra pas effectuer d'achats, de commandes similaires à celles résultant de son travail avec Azur Aliance, pour l'intérêt de sociétés dites concurrentes.
    </p>
    <p>
    La société, en tant que commettant, se réserve le droit d'autoriser l'intermédiaire à effectuer des achats privés sur des produits qui pourraient l'intéresser.
    </p>
    <p>
    En cas de manquement à cette disposition, la Société sera autorisée à réclamer à titre de dédommagement tout montant de profit à la juste valeur marchande qui aurait pu être réalisé par la société après la vente du ou des produits achetés sans le consentement de la société par l'Acheteur / Representant.
    </p>
    <p>Signature</p>
    <div>
        <div style="width:50%; float:left; text-align: center;">
            <img src="{{$buyerSignature}}" style="max-height:100px">
            <p>L'Acheteur / Représentant</p>
        </div>
        <div style="width:50%; float:right; text-align: center;">
            <img src="{{$companySignature}}" style="max-height:100px">
            <p>L'Entreprise</p>
        </div>
    </div>
    </body>
</html>


