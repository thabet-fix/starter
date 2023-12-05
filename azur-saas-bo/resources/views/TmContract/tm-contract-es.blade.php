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
    <h1 class="title-page text-center" >CONTRATO DE CESIÓN DE BIENES</h1>
    <p class=" text-center">NÚMERO {{$number}}</p>
    <p>FECHA DE LA FIRMA DEL CONTRATO: {{ $date }}</p>
    <h4>I. PROPIETARIO DE LA EMPRESA QUE HA FINANCIADO LA ADQUISICIÓN DE LA(S) PROPIEDAD(ES)</h4>
    <div class="clause">
        <p>
        SignaPro registrada con el número 206565325, con domicilio social en la ciudad de Burgas, Bulgaria, número de IVA BG206565325
        </p>
        <p>
        Representado por :<strong>{{ $companyRepresentative }}</strong>
        </p>
        <p>
        Correo electrónico: <strong>{{ $companyEmail }}</strong>
        </p>
        <p>
        Número de teléfono móvil:  <strong>{{ $companyPhone }}</strong>
        </p>
    </div>

    <h4>II. Comprador</h4>
    <div class="clause">
        <p>
        Nombre : <strong>{{ $representativeFirstName }}</strong>
        </p>
        <p>
        Nombre : <strong>{{ $representativeLastName }}</strong>
        </p>
        <p>
        Dirección : <strong>{{ $representativeAddress }}</strong>
        </p>
    </div>

    <h4>III. DESCRIPCIÓN DEL PRODUCTO</h4>
    <div class="clause">
        <p>
        1. Designación : <strong>{{ $designation }}</strong>
        </p>
        <p>
        2. Fabricante : <strong>{{ $manifacturer }}</strong>
        </p>
    </div>

    <h4>IV. IMPORTE Y COMISIONES</h4>
    <div class="clause">
        <p>
        1. El precio del producto pagado en tienda, descrito en el punto III anterior, es<strong> {{$price}} </strong> Euros.
        </p>
        <p>
        2. La comisión pagada al comprador por la cesión es de <strong>{{$commision}}</strong>  Euros.
        </p>
        <p>
        3. El precio descrito incluye la entrega y aceptación de la mercancía sin costes adicionales.
        </p>
    </div>

    <h4>V. ENTREGA, INSPECCIÓN Y RECLAMACIONES</h4>
    <div class="clause">
        <p>
        1. La mercancía deberá entregarse o enviarse a la siguiente dirección de Azur-Aliance JSC
        <br>{{$deliveryAddress}}
        </p>
        <p>
        2. Si la mercancía se recibe a distancia, el comprador deberá inspeccionarla inmediatamente después de recibirla e informar al vendedor si hay algún problema.
        </p>
        <p>
        3. Una vez aceptada la mercancía, se firma un documento de aceptación.
        </p>
    </div>

    <h4>VI. LITIGIOS Y RESPONSABILIDAD</h4>
    <div class="clause">
        <p>
        1.El presente contrato, su ejecución, no ejecución, validez y rescisión están sujetos a las disposiciones del derecho civil de .
        </p>
        <p>
        2. Cualquier litigio relativo al presente contrato, su ejecución, su no ejecución, su validez y su rescisión se someterá a los tribunales.
        </p>
    </div>

    <h4>VII. COMUNICACIÓN Y NOTIFICACIONES</h4>
    <div class="clause">
        <p>
        Cada correo electrónico, enviado a la dirección de correo electrónico indicada en este contrato, se considerará como una notificación debidamente enviada y recibida, tanto si el destinatario la ha abierto como si no.
        </p>
    </div>

    <p><strong>COMPRADOR</strong></p>
    <p>Nombre : {{$buyerName}}</p>
    <p>Firma:</p>
    <img src="{{$buyerSignature}}" style="max-height:100px">

    <p><strong>EMPRESA PROPIETARIA DE LA(S) PROPIEDAD(ES)</strong></p>
    <p>Nombre : {{$companyName}}</p>
    <p>Firma:</p>
    <img src="{{$companySignature}}" style="max-height:100px">
    <p>Representante local de Azur Aliance</p>

    </body>
</html>


