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
    <h1 class="title-page text-center" >CONTRACT FOR THE TRANSFER OF GOODS</h1>
    <p class=" text-center">Number {{$number}}</p>
    <p>DATE OF SIGNATURE OF THE CONTRACT : {{ $date }}</p>
    <h4>I. COMPANY OWNER WHO HAS FINANCED THE ACQUISITION OF THE PROPERTY/IES</h4>
    <div class="clause">
        <p>
        SignaPro registered under the number 206565325, having its registered office in the city of Burgas, Bulgaria, VAT
number BG206565325
        </p>
        <p>
        Represented by: <strong>{{ $companyRepresentative }}</strong>
        </p>
        <p>
        E-mail : <strong>{{ $companyEmail }}</strong>
        </p>
        <p>
        Cell phone number: <strong>{{ $companyPhone }}</strong>
        </p>
    </div>

    <h4>II. APPLICANT</h4>
    <div class="clause">
        <p>
        First name: <strong>{{ $representativeFirstName }}</strong>
        </p>
        <p>
        Name : <strong>{{ $representativeLastName }}</strong>
        </p>
        <p>
        Address: <strong>{{ $representativeAddress }}</strong>
        </p>
    </div>

    <h4>III. DESCRIPTION OF THE PRODUCT, OBJECT OF THE TRANSMISSION</h4>
    <div class="clause">
        <p>
        1. Designation : <strong>{{ $designation }}</strong>
        </p>
        <p>
        2. Manufacturer : <strong>{{ $manifacturer }}</strong>
        </p>
    </div>

    <h4>IV. PRICE PAID AND COMMISSION RULES</h4>
    <div class="clause">
        <p>
        1. The price of the product paid in store, described in point III above is <strong> {{$price}} </strong> Euros.
        </p>
        <p>
        2. The commission paid to the buyer for the mission is <strong>{{$commision}}</strong>  Euros.
        </p>
        <p>
        3. The described price includes the delivery and the reception of the goods, without additional costs.
        </p>
    </div>

    <h4>V. DELIVERY, INSPECTION, CLAIMS</h4>
    <div class="clause">
        <p>
        1. The goods must be dropped off or sent to the following Azur-Aliance JSC address <br>
        {{$deliveryAddress}}
        </p>
        <p>
        2. In case of remote reception of the good, the buyer must inspect it immediately after receiving it and inform the seller in
case of any problem.
        </p>
        <p>
        3. Upon acceptance of the goods, an acceptance protocol is signed.
        </p>
    </div>

    <h4>VI. LITIGATION AND LIABILITY</h4>
    <div class="clause">
        <p>
        1. This contract, its execution, non-execution, validity and termination are subject to the provisions of civil legislation.
        </p>
        <p>
        2. Any dispute concerning this contract, its execution, its non-execution, its validity and its termination will be brought
before the court.
        </p>
    </div>

    <h4>VII. COMMUNICATION AND NOTIFICATIONS</h4>
    <div class="clause">
        <p>
        Each e-mail, sent to the e-mail address specified in this Agreement, shall be deemed to be a properly sent and received
notice, whether or not the recipient has opened it.
        </p>
    </div>

    <p><strong>BUYER</strong></p>
    <p>Name : {{$buyerName}}</p>
    <p>Signature:</p>
    <img src="{{$buyerSignature}}" style="max-height:100px">

    <p><strong>COMPANY THAT OWNS THE PROPERTY(IES)</strong></p>
    <p>Name : {{$companyName}}</p>
    <p>Signature:</p>
    <img src="{{$companySignature}}" style="max-height:100px">
    <p>Local representative of Azur Aliance</p>

    </body>
</html>


