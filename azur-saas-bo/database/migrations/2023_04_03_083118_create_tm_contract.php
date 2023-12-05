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
        Schema::create('tm_contract', function (Blueprint $table) {
            $table->id();
            $table->integer('number')->nullable();
            $table->string('companyRepresentative')->nullable();
            $table->string('companyEmail')->nullable();
            $table->string('companyPhone')->nullable();
            $table->string('representativeFirstName')->nullable();
            $table->string('representativeLstName')->nullable();
            $table->string('representativeAddress')->nullable();
            $table->string('designation')->nullable();
            $table->string('manifacturer')->nullable();
            $table->decimal('price',8,2)->nullable();
            $table->decimal('commision',8,2)->nullable();
            $table->string('deliveryAddress')->nullable();
            $table->string('buyerName')->nullable();
            $table->string('buyerSignature')->nullable();
            $table->string('companyName')->nullable();
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
        Schema::dropIfExists('tm_contract');
    }
};
