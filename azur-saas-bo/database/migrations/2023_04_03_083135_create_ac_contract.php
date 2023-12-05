<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ac_contract', function (Blueprint $table) {
            $table->id();
            $table->integer('number')->nullable();
            $table->string('name')->nullable();
            $table->string('passportId')->nullable();
            $table->string('zipCode')->nullable();
            $table->string('address')->nullable();
            $table->string('nationality')->nullable();
            $table->string('city')->nullable();
            $table->string('phoneNumber')->nullable();
            $table->string('email')->nullable();
            $table->string('bank')->nullable();
            $table->string('iban')->nullable();
            $table->string('swift')->nullable();
            $table->string('companySignature')->nullable();
            $table->string('buyerSignature')->nullable();
            $table->string('lang')->nullable();
            $table->string('pdfUrlLang1')->nullable();
            $table->string('pdfUrlLang2')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ac_contract');
    }
};
