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
    {!!$content!!}
    
    <p>Signatures:</p>
    <div>
        <div style="width:50%; float:left; text-align: center;">
            <img src="{{$buyerSignature}}" style="max-height:100px">
            <p>{{$labelSign1}}</p>
        </div>
        <div style="width:50%; float:right; text-align: center;">
            <img src="{{$companySignature}}" style="max-height:100px">
            <p>{{$labelSign2}}</p>
        </div>
    </div>
    </body>
</html>


