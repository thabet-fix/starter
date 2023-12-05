<!doctype html>
<html lang="bg">
    <head>
    <meta charset="utf-8">
    <title>MERCHANDISE TRANSFER CONTRACT N°{{$number}}</title>
    </head>
    <style>
        body{
            font-size: 12px;
            font-family:"sans serif";
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
    <h1 class="title-page text-center" >ДОГОВОР ЗА ПРЕХВЪРЛЯНЕ НА СТОКИ</h1>
    <p class=" text-center">НОМЕР {{$number}}</p>
    <p>ДАТА НА ПОДПИСВАНЕ НА ДОГОВОРА: {{ $date }}</p>
    <h4>I. СОБСТВЕНИК НА ДРУЖЕСТВОТО, КОЕТО Е ФИНАНСИРАЛО ПРИДОБИВАНЕТО НА ПРОДУКТА(ИТЕ)</h4>
    <div class="clause">
        <p>
        "Азур Алианс" АД, регистрирано под номер 206565325, със седалище в град Бургас, България, ДДС номер
BG206565325
        </p>
        <p>
        Представлявано от:  <strong>{{ $companyRepresentative }}</strong>
        </p>
        <p>
        Електронна поща: <strong>{{ $companyEmail }}</strong>
        </p>
        <p>
        Номер на мобилен телефон:  <strong>{{ $companyPhone }}</strong>
        </p>
    </div>

    <h4>II. УПРАВИТЕЛ</h4>
    <div class="clause">
        <p>
        Първо име: <strong>{{ $representativeFirstName }}</strong>
        </p>
        <p>
        име : <strong>{{ $representativeLastName }}</strong>
        </p>
        <p>
        Адрес: <strong>{{ $representativeAddress }}</strong>
        </p>
    </div>

    <h4>III. ОПИСАНИЕ НА ПРОДУКТА, ПРЕДМЕТ НА ПРЕДАВАНЕТО</h4>
    <div class="clause">
        <p>
        1. Наименование : <strong>{{ $designation }}</strong>
        </p>
        <p>
        2. Производител: <strong>{{ $manifacturer }}</strong>
        </p>
    </div>
    <h4>IV. ПРАВИЛА ЗА ПЛАТЕНА ЦЕНА И КОМИСИОНА</h4>
    <div class="clause">
        <p>
        1.Цената на продукта, платена в магазина, описан в точка III по-горе, е <strong> {{$price}} </strong> евро.
        </p>
        <p>
        2. Комисионата, платена на купувача за прехвърлянето, е<strong>{{$commision}}</strong>  евро.
        </p>
        <p>
        3.Описаната цена включва доставката и приемането на стоките без допълнителни разходи.
        </p>
    </div>

    <h4>V. ДОСТАВКА, ПРОВЕРКА, РЕКЛАМАЦИИ</h4>
    <div class="clause">
        <p>
        1.Стоките трябва да бъдат доставени или изпратени на следния адрес на "Азур-Алианс" АД
        {{$deliveryAddress}}
        </p>
        <p>
        2. Ако стоките са получени от разстояние, купувачът трябва да ги провери веднага след получаването им и да
информира продавача, ако има някакви проблеми.
        </p>
        <p>
        3. Когато стоките бъдат приети, се подписва приемо-предавателен протокол.
        </p>
    </div>

    <h4>VI. СЪДЕБНИ СПОРОВЕ И ОТГОВОРНОСТ</h4>
    <div class="clause">
        <p>
        1. Този договор, неговото изпълнение, неизпълнение, валидност и прекратяване се подчиняват на разпоредбите на
гражданското право .
       </p>
        <p>
        2. Всеки спор относно този договор, неговото изпълнение, неизпълнение, валидност и прекратяване се отнася до
съда.
        </p>
    </div>

    <h4>VII. КОМУНИКАЦИЯ И ИЗВЕСТИЯ:</h4>
    <div class="clause">
        <p>
        Всяко електронно писмо, изпратено на посочения в настоящия договор адрес на електронна поща, ще се счита за
надлежно изпратено и получено уведомление, независимо дали получателят го е отворил или не.
        </p>
    </div>

    <p><strong>КУПУВАЧ</strong></p>
    <p>Име:{{$buyerName}}</p>
    <p>Подпис: </p>
    <img src="{{$buyerSignature}}" style="max-height:100px">

    <p><strong>ДРУЖЕСТВО, КОЕТО ПРИТЕЖАВА ПРОДУКТА(ИТЕ)</strong></p>
    <p>ИМЕ: {{$companyName}}</p>
    <p>ПОДПИС: </p>
    <img src="{{$companySignature}}" style="max-height:100px">

    <p>Местен представител на Azur Aliance</p>

    </body>
</html>


