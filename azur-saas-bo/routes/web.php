<?php

use Illuminate\Support\Facades\Route;

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
Route::post('login', 'Account\authController@login');
Route::post('logout', 'Account\authController@logout');
Route::post('refresh', 'Account\authController@refresh');
Route::get('check-token', 'Account\authController@checkToken');
Route::post('register', 'Account\accountController@createUser');
Route::put('{key}-account-activation', 'Account\accountController@firstAccountActivation');
Route::group(['middleware'=>'auth'],function($router)  {
    Route::post('/send-page-link', ['middleware' => 'isSubscribed', 'uses' => 'SendContractLinkController@SendContractLinkByMail']);
    Route::group(['prefix'=>'account'],function($router)  {
        Route::get('/', 'Account\accountController@profile');
        Route::post('/update', 'Account\accountController@updateProfile');
        Route::post('/change-password', 'Account\accountController@changePassword');
    });

    Route::group(['prefix'=>'admin/configuration'],function($router)  {
        Route::get('/', 'Configuration\configurationController@show');
        Route::group(['middleware'=>'isAdmin'],function($router)  {
            Route::post('/', 'Configuration\configurationController@store');
            Route::put('/', 'Configuration\configurationController@update');
        });
    });
    Route::group(['prefix'=>'admin/users', 'middleware'=>'isEmployer'],function($router)  {
        Route::get('/', 'Admin\usersController@usersList');
        Route::post('/create', 'Admin\usersController@createManager');
        $router->group(['middleware' => 'checkResourceOwner:User'], function () use ($router) {
            Route::post('/activate-{id}', 'Admin\usersController@accountActivation');
            Route::post('/remove-{id}', 'Admin\usersController@removeAccount');
            Route::put('/update-{id}', 'Admin\usersController@updateManager');
            Route::get('/{id}', 'Admin\usersController@getManager');
        });
    });

    Route::group(['prefix' => 'admin/language'], function ($router) {
        Route::get('/', 'Language\LanguageController@index');
        Route::get('/listByTemplate/{id}', 'Language\LanguageController@listByTemplate');
        Route::group(['middleware' => 'isAdmin'], function ($router) {
            Route::post('/', 'Language\LanguageController@store');
            Route::get('/{id}', 'Language\LanguageController@show');
            Route::put('/{id}', 'Language\LanguageController@update');
            Route::delete('/{id}', 'Language\LanguageController@destroy');
        });
    });

    Route::group(['prefix' => 'admin/ai-context'], function ($router) {
        Route::get('/', 'OpenAi\AiContextController@index');
        Route::group(['middleware' => 'isAdmin'], function ($router) {
            Route::post('/', 'OpenAi\AiContextController@store');
            Route::get('/{id}', 'OpenAi\AiContextController@show');
            Route::put('/{id}', 'OpenAi\AiContextController@update');
            Route::delete('/{id}', 'OpenAi\AiContextController@destroy');
        });
    });

    Route::group(['prefix'=>'admin/openai'],function($router)  {
        Route::post('/', 'OpenAi\openAiController@index');
    });

    Route::group(['prefix'=>'admin/pack'],function($router)  {
        Route::get('/', 'Packs\PackController@index');
        Route::get('/{userId}-details', 'Packs\PackController@userPackDetails');

        Route::group(['middleware'=>'isAdmin'],function($router)  {
            Route::post('/', 'Packs\PackController@store');
            Route::get('/{id}', 'Packs\PackController@show');
            Route::put('/{id}', 'Packs\PackController@update');
            Route::delete('/{id}', 'Packs\PackController@destroy');
        });
    });

    Route::group(['prefix'=>'admin/company'],function($router)  {
        Route::group(['middleware'=>'isAdmin'],function($router)  {
            Route::get('/', 'Company\companyController@index');
            // Route::delete('/{id}', 'Company\companyController@destroy');
            Route::put('/status/{id}', 'Company\companyController@changeStatus');
        });
        Route::group(['middleware'=>'isEmployer'],function($router)  {
            Route::post('/', 'Company\companyController@store');
            Route::get('/employer', 'Company\companyController@showByEmployer');
            // Route::get('/{id}', 'Company\companyController@show');
            Route::put('/employer', 'Company\companyController@update');
        });
    });

});


Route::group(['prefix' => 'admin/template',], function ($router) {
    //$router->group(['middleware' => 'checkResourceOwner:Template'], function () use ($router) {
        Route::get('/{id}', 'Template\templateController@show');
    //});
    Route::group(['middleware' => 'auth'], function ($router) {
        Route::get('/', 'Template\templateController@index');
        Route::post('/', 'Template\templateController@store');
        $router->group(['middleware' => 'checkResourceOwner:Template'], function () use ($router) {
            Route::put('/{id}', 'Template\templateController@update');
            Route::delete('/{id}', 'Template\templateController@destroyTemplate');
        });
        Route::delete('/content/{id}', 'Template\templateController@destroyContent');

    });
});
Route::group(['prefix' => 'ac-contract'], function ($router) {
    Route::post('/create', ['middleware' => 'isPageValid', 'uses' => 'Contract\acContractController@createAcContract']);
    Route::group(['middleware' => 'auth'], function ($router) {
        Route::get('/', 'Contract\acContractController@getList');
        Route::get('/{id}', 'Contract\acContractController@getContract');
        Route::post('/{id}-validate', 'Contract\acContractController@validateAcContract');
    });
});
Route::group(['prefix' => 'tm-contract'], function ($router) {
    Route::post('/create', ['middleware' => 'isPageValid', 'uses' => 'Contract\tmContractController@createTmContract']);
    Route::group(['middleware' => 'auth'], function ($router) {
        Route::get('/', 'Contract\tmContractController@getList');
        Route::get('/{id}', 'Contract\tmContractController@getContract');
        Route::post('/{id}-validate', 'Contract\tmContractController@validateTmContract');
    });
});

Route::group(['prefix'=>'sd-contract'],function($router)  {
    Route::post('/create',['middleware' => ['isPageValid', 'isSubscribed'], 'uses' => 'Contract\sdContractController@createSdContract'] );
    Route::group(['middleware'=>'auth'],function($router)  {
        Route::get('/', 'Contract\sdContractController@getList');
        Route::post('/generate-pdf', 'Contract\sdContractController@generateNewPdfLanguage');
        $router->group(['middleware' => 'checkResourceOwner:SdContract,createdBy'], function () use ($router) {
            Route::get('/{id}', 'Contract\sdContractController@getContract');
            Route::post('/{id}-validate', 'Contract\sdContractController@validateSdContract');
        });
    });
});

Route::group(['prefix'=>'payment'],function($router)  {
    Route::group(['prefix'=>'subscription','middleware'=>'isEmployer'],function($router)  {
        Route::post('/', 'Payments\StripeSubscriptionController@subscription');
        Route::post('/cancel', 'Payments\StripeSubscriptionController@cancelSubscription');
        Route::post('/reccurent', 'Payments\StripeSubscriptionController@reccurentSubscriptionPayment');
    });
    // Route::get('/billing', 'Payments\StripeBillingController@getBillingDetails');
    Route::get('/billing', 'Payments\StripeBillingController@getBillingPortal');
    Route::post('/url-token', 'Payments\StripePaymentController@paymentUrlToken');
    Route::post('/subscription-url', 'Payments\StripePaymentController@subscriptionUrl');
    Route::get('/success', 'Payments\StripePaymentController@successPayment');
    Route::get('/success-subscription', 'Payments\StripePaymentController@successSubscription');
    Route::get('/success-token', 'Payments\StripePaymentController@successPaymentToken');
    Route::post('/webhook', 'Payments\StripePaymentController@webhook');

});

