<!doctype html>
<html lang="fr">
    <head>
    <meta charset="utf-8">
    <title>SignaPro</title>
    </head>
    <body style="  font-size: '12px';font-family:'Arial', 'sans serif';">
        <h1 style="text-align:center;color: #318ba2;">SignaPro</h1>
        <div>
            <p> Dear Customer, </p>
            <p>SignaPro wanted to share with you a link so that you can complete your contract of  " {{$contractType}} ".</p>
            <p>The link leads to our app which provides more information about the contract.</p>
            <div style="text-align:center;padding: 20px;">
            <a style="padding: 20px; background: #318ba2; color: #fff;margin: 20px; border-radius: 20px; text-decoration: none;" href="{!! $link !!}">
            Sign the contract
            </a>
            </div>
            <p><strong>Nb:</strong></p>
            <p>
                <br> - This link will automatically expire after 24 hours. After this date, you can no longer validate your contract.
                <br> - This link will expire after the validation of the contract.
            </p>
            <p>If you have any questions or comments, please do not hesitate to contact us.</p>
            <p>Cordially,</p>
            <p>SignaProteam</p>
        </div>
    </body>
</html>
